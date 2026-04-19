'use server';

import { revalidatePath } from 'next/cache';

export async function submitChallenge(formData: FormData) {
  // Simulate AI Judge evaluating the submission
  const attempt = {
    userId: 'dummy_user_id', // In a real app we'd get from auth context
    challengeId: formData.get('challengeId') as string,
    promptText: formData.get('prompt') as string,
    code: formData.get('code') as string,
    outputUrl: formData.get('url') as string,
  };

  // Mock scoring logic (out of 100)
  const promptClarity = Math.floor(Math.random() * 20) + 80;
  const outputQuality = Math.floor(Math.random() * 20) + 80;
  const speed = 90;
  const creativity = 85;
  const completion = 100;
  
  const totalScore = Math.floor((promptClarity + outputQuality + speed + creativity + completion) / 5);

  // In real app, save to Prisma:
  // await prisma.submission.create({ data: { ... }})

  return {
    success: true,
    score: {
      promptClarity,
      outputQuality,
      speed,
      creativity,
      completion,
      totalScore
    }
  };
}
