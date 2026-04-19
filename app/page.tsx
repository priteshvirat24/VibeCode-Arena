import React from 'react';
import { Button } from '../components/Button';
import { LeaderboardPreview } from '../components/LeaderboardPreview';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Become Dangerous with AI Coding</h1>
          <p className="text-slate-300 max-w-xl">VibeCode Arena helps AI builders level up through hands-on challenges: build, debug, prototype and ship — fast. Track XP, streaks, and climb the leaderboard.</p>
          <div className="flex gap-4">
            <Button variant="primary">Start Free</Button>
            <Button variant="ghost">View Challenges</Button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Leaderboard Preview</h3>
          <LeaderboardPreview />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800 rounded-lg">
          <h4 className="font-semibold">Prompt Battles</h4>
          <p className="text-slate-300 mt-2">Compete in short rounds optimizing prompts and outputs.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-lg">
          <h4 className="font-semibold">Build From Idea</h4>
          <p className="text-slate-300 mt-2">Ship small apps that show real product thinking.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-lg">
          <h4 className="font-semibold">Debug AI Code</h4>
          <p className="text-slate-300 mt-2">Given broken AI-generated code, fix it under time pressure.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="text-slate-300 mt-2">3 challenges/day · Community access</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-amber-600 to-orange-500 rounded-lg">
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="text-slate-900 mt-2">Unlimited challenges · AI feedback · Hiring badge</p>
          </div>
        </div>
      </section>
    </div>
  );
}
