import React from 'react';
import { Button } from '../../../components/Button';
import { submitChallenge } from '../../actions/challenge';

export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    formData.append('challengeId', params.id);
    const result = await submitChallenge(formData);
    console.log(result);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Challenge Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-slate-800 rounded text-xs">Prompt Battles</span>
            <span className="text-amber-400 text-xs font-bold">Medium</span>
            <span className="text-slate-400 text-xs flex items-center">
              ⏱ 15 min limit
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Summarize & Optimize</h1>
          <p className="text-slate-400">
            Given a messy, overly complex prompt about building a React component,
            refactor it to be concise, clear, and easy for an AI to understand.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h3 className="font-bold text-lg">Objective</h3>
          <ul className="list-disc pl-5 text-slate-300 space-y-2">
            <li>Read the provided bad prompt.</li>
            <li>Write a single concise prompt that gets the identical final UI.</li>
            <li>Submit your optimized prompt below.</li>
          </ul>
        </div>
      </div>

      {/* Right: Submission Form */}
      <div className="bg-slate-800 rounded-xl p-6 flex flex-col">
        <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
          <span>Your Submission</span>
          <span className="text-emerald-400 font-mono text-xl">15:00</span>
        </h3>
        
        <form action={handleSubmit} className="flex-1 flex flex-col space-y-4">
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-slate-300 mb-1">Optimized Prompt</label>
            <textarea 
              name="prompt"
              className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 font-mono resize-none focus:ring-emerald-500 focus:border-emerald-500" 
              placeholder="Paste your prompt here..."
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1">Generated Output URL (optional)</label>
            <input 
              type="url" 
              name="url"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" 
              placeholder="https://..."
            />
          </div>

          <Button className="w-full mt-4" variant="primary" type="submit">Submit Challenge</Button>
        </form>
      </div>
    </div>
  );
}
