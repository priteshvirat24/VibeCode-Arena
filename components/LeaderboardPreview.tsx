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
        <div key={p.name} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border border-border/50">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50' : i === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/50' : i === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/50' : 'bg-muted text-muted-foreground'}`}>
              {i + 1}
            </div>
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">XP {p.xp}</div>
            </div>
          </div>
          <div className="text-sm font-semibold text-emerald-400">🔥 Streak</div>
        </div>
      ))}
    </div>
  );
}
