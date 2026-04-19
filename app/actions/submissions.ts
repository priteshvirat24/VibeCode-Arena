"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';

export async function submitChallenge(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error('Not authenticated');
  }

  const challengeId = formData.get('challengeId') as string;
  const promptText = formData.get('prompt') as string;
  const code = formData.get('code') as string;
  const timeSeconds = parseInt(formData.get('timeSeconds') as string || '0', 10);

  // Sync / verify user exists in Prisma
  let dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.user_metadata?.username || user.email.split('@')[0],
        xp: 0,
        streak: 0,
        rank: 'Bronze'
      }
    });
  }

  // Get Challenge Data for Context
  const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) throw new Error('Challenge not found');

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  let scoreData;

  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is missing! Using fallback mock evaluation.");
    // Fallback Mock Logic
    scoreData = {
      promptClarity: 70,
      outputQuality: 75,
      speed: Math.max(10, 100 - Math.floor(timeSeconds / 10)),
      creativity: 80,
      completion: 100,
      total: 82
    };
  } else {
    // Live Gemini Evaluation
    const systemInstruction = `You are the VibeCode AI Judge. Evalaute the provided prompt and code against the objective. 
    Return a STRICT JSON object representing the score out of 100 for these exact 5 keys: {"promptClarity": number, "outputQuality": number, "creativity": number, "completion": number}. 
    Objective: "${challenge.objective}". Do not wrap in markdown or any other text.`;
    
    const userMessage = `User's Prompt: ${promptText}\nUser's Output Code: ${code}\nAnalyze this and return the JSON score integers (0-100).`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
        })
      });

      if (!response.ok) throw new Error('Failed connecting to Gemini API');

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      const parsedScores = JSON.parse(aiResponse);

      const speedScore = Math.max(10, 100 - Math.floor(timeSeconds / 10)); // Speed is algorithmic
      const totalScore = Math.floor((parsedScores.promptClarity * 0.25) + (parsedScores.outputQuality * 0.35) + (speedScore * 0.15) + (parsedScores.creativity * 0.1) + (parsedScores.completion * 0.15));

      scoreData = {
        promptClarity: parsedScores.promptClarity,
        outputQuality: parsedScores.outputQuality,
        speed: speedScore,
        creativity: parsedScores.creativity,
        completion: parsedScores.completion,
        total: totalScore
      };
    } catch (e: any) {
      console.error("Gemini Evaluation Failed: ", e.message);
      // Fallback
      scoreData = { promptClarity: 60, outputQuality: 60, speed: Math.max(10, 100 - Math.floor(timeSeconds / 10)), creativity: 60, completion: 50, total: 60 };
    }
  }

  // Save Submission
  await prisma.submission.create({
    data: {
      userId: dbUser.id,
      challengeId,
      promptText,
      code,
      score: {
        create: {
          promptClarity: scoreData.promptClarity,
          outputQuality: scoreData.outputQuality,
          speed: scoreData.speed,
          creativity: scoreData.creativity,
          completion: scoreData.completion,
          total: scoreData.total
        }
      }
    }
  });

  // Calculate XP granted
  const xpGained = scoreData.total * 2; // Simple math, max 200 XP per challenge

  // Update User XP & Streak
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      xp: { increment: xpGained },
      streak: { increment: 1 } 
    }
  });

  revalidatePath('/dashboard');
  revalidatePath('/leaderboard');
  revalidatePath(`/challenges`);
  revalidatePath(`/challenges/${challengeId}`);

  return {
    success: true,
    score: scoreData
  };
}
