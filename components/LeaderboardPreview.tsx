import React from 'react';

const demo = [
  { name: 'Ava', xp: 1280 },
  { name: 'Kai', xp: 1120 },
  { name: 'Rin', xp: 980 }
];

export function LeaderboardPreview() {
  return (
    <div className="space-y-3">
      {demo.map((p, i) => (
        <div key={p.name} className="flex items-center justify-between bg-slate-900 p-3 rounded">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">{i + 1}</div>
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-slate-400">XP {p.xp}</div>
            </div>
          </div>
          <div className="text-slate-300">{Math.floor(Math.random() * 100)} pts</div>
        </div>
      ))}
    </div>
  );
}
