import React from 'react';
import Link from 'next/link';

// Mock data
const categories = [
  'All', 'Prompt Battles', 'Build from Idea', 'Debug Broken AI Code', 'UI Clone Sprint'
];

const challenges = [
  { id: '1', title: 'Summarize & Optimize', category: 'Prompt Battles', diff: 'Medium', time: '15m' },
  { id: '2', title: 'Broken React Auth', category: 'Debug Broken AI Code', diff: 'Hard', time: '30m' },
  { id: '3', title: 'Stripe Nav Menu', category: 'UI Clone Sprint', diff: 'Medium', time: '45m' },
  { id: '4', title: 'Todo App in 5 mins', category: 'Build from Idea', diff: 'Easy', time: '5m' },
];

export default function ChallengesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Challenge Arena</h1>
        <p className="text-slate-400">Select a challenge to test your AI building skills.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4">
        {categories.map((c) => (
          <button key={c} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-medium whitespace-nowrap">
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((ch) => (
          <Link key={ch.id} href={`/challenges/${ch.id}`}>
            <div className="bg-slate-800 border border-slate-700 hover:border-emerald-500 transition-colors rounded-xl p-6 h-full flex flex-col cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-300">{ch.category}</span>
                <span className={`text-xs font-bold ${ch.diff === 'Hard' ? 'text-red-400' : ch.diff === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {ch.diff}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{ch.title}</h3>
              <div className="mt-auto pt-4 flex items-center text-sm text-slate-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {ch.time}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
