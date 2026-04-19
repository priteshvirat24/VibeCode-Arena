import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, ChevronUp, ChevronDown, Award } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Find user's DB ID to highlight them exactly
  let activeUserId = null;
  if (user && user.email) {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email }});
    activeUserId = dbUser?.id;
  }

  // Fetch top players sorted by XP
  const topUsers = await prisma.user.findMany({
    orderBy: { xp: 'desc' },
    take: 50,
  });

  const globalLeaders = topUsers.map((u, i) => ({
    id: u.id,
    rank: i + 1,
    name: u.name || 'Anonymous',
    xp: u.xp,
    tier: u.rank,
    streak: u.streak,
    change: 0, // Mock change direction
    isUser: u.id === activeUserId
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-12 pt-4">
      <div className="text-center space-y-4 py-8 border-b border-white/5">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
          <Award className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white/90">Global Leaderboard</h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
          See how you stack up against the best AI builders. Submissions are instantly evaluated.
        </p>
      </div>

      {globalLeaders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
           {globalLeaders.slice(0,3).map((u, i) => (
              <div key={u.id} className={`flex flex-col items-center p-6 rounded-2xl border ${i===0 ? 'bg-indigo-500/5 border-indigo-500/30 sm:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'bg-white/[0.02] border-white/5'} relative`}>
                {i === 0 && <div className="absolute -top-3 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Rank 1</div>}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-3 ${i===0 ? 'bg-indigo-500 text-white' : i===1 ? 'bg-white/10 text-white/90' : 'bg-white/5 text-white/70'}`}>
                  {u.rank}
                </div>
                <div className="font-medium text-white/90 flex items-center gap-2">
                  {u.name} {u.isUser && <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-indigo-500/50 text-indigo-300 pb-0.5">YOU</Badge>}
                </div>
                <div className="text-[13px] text-white/40">{u.tier}</div>
                <div className="text-xl font-semibold font-mono tracking-tight mt-2 text-white">{u.xp.toLocaleString()}</div>
              </div>
           ))}
        </div>
      )}

      <Card className="bg-white/[0.01] backdrop-blur-md border border-white/10 shadow-none rounded-2xl">
        <CardHeader className="border-b border-white/5 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-white/90">The Rankings</CardTitle>
            <div className="text-xs text-white/40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span> Live
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-4 pb-3 mb-2 border-b border-white/5 text-[11px] font-semibold text-white/40 uppercase tracking-widest px-4">
              <div className="col-span-2 sm:col-span-1 text-center">Rnk</div>
              <div className="col-span-5 sm:col-span-4">Builder</div>
              <div className="col-span-3 hidden sm:block">Tier</div>
              <div className="col-span-2 hidden sm:block text-right">Streak</div>
              <div className="col-span-5 sm:col-span-2 text-right">Total XP</div>
            </div>

            {globalLeaders.slice(3).map((u) => (
              <div key={u.id} className={`grid grid-cols-12 gap-4 py-3 items-center rounded-xl px-4 transition-colors group ${u.isUser ? 'bg-indigo-500/10 border border-indigo-500/30' : 'hover:bg-white/[0.03] border border-transparent'}`}>
                <div className="col-span-2 sm:col-span-1 text-center">
                  <span className={`text-[13px] font-mono ${u.isUser ? 'text-indigo-400 font-bold' : 'text-white/40'}`}>
                    {u.rank}
                  </span>
                </div>
                
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                  <div className={`font-medium text-[14px] flex items-center gap-2 ${u.isUser ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {u.name} {u.isUser && <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-indigo-500/50 text-indigo-300 ml-1 pb-0.5">YOU</Badge>}
                  </div>
                </div>
                
                <div className="col-span-3 hidden sm:flex items-center gap-2">
                  <span className="text-[13px] text-white/50">{u.tier}</span>
                </div>
                
                <div className="col-span-2 hidden sm:flex items-center justify-end text-[13px] text-white/40 gap-1 font-mono">
                  {u.streak}d
                </div>
                
                <div className="col-span-5 sm:col-span-2 flex items-center justify-end gap-2 text-right font-medium text-[15px] font-mono text-white/90">
                  {u.xp.toLocaleString()}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 flex items-center justify-center"><div className="w-1.5 h-px bg-white/20"></div></div>
                  </div>
                </div>
              </div>
            ))}
            
            {globalLeaders.length === 0 && (
              <div className="text-center py-10 text-white/30 text-sm">No builders in the arena yet. Be the first!</div>
            )}
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
