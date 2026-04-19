import React from 'react';
import { Button } from '../components/Button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/challenges">
          <Button>Find a Challenge</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-slate-400 text-sm mb-1">Total XP</div>
          <div className="text-3xl font-bold text-emerald-400">1,280</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-slate-400 text-sm mb-1">Current Rank</div>
          <div className="text-3xl font-bold text-amber-400">Gold</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-slate-400 text-sm mb-1">Day Streak</div>
          <div className="text-3xl font-bold text-orange-400">12 🔥</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-slate-400 text-sm mb-1">Completed</div>
          <div className="text-3xl font-bold text-blue-400">24</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
              <span>Prompt Battle: Summarize</span>
              <span className="text-emerald-400 font-medium">94/100</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
              <span>Debug: React Hooks</span>
              <span className="text-emerald-400 font-medium">88/100</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
              <span>UI Clone: Stripe Nav</span>
              <span className="text-amber-400 font-medium">72/100</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Skill Graph</h2>
          <div className="h-48 flex items-center justify-center text-slate-500 bg-slate-900 rounded">
            [ Radar Chart Placeholder ]
          </div>
        </div>
      </div>
    </div>
  );
}
