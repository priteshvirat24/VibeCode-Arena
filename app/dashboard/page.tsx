import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Code2, Clock, CheckCircle2, ChevronRight, Activity, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect('/auth/login');
  }

  // JIT Provisioning (Sync Supabase Auth to Prisma User)
  const dbUser = await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: { 
      email: user.email, 
      name: user.user_metadata?.username || user.email.split('@')[0],
      xp: 0,
      streak: 0,
      rank: 'Bronze'
    },
    include: {
      subscription: true,
      submissions: {
        include: { challenge: true, score: true },
        orderBy: { createdAt: 'desc' },
        take: 3
      }
    }
  });

  const submissionsCount = await prisma.submission.count({ where: { userId: dbUser.id } });
  const isPro = dbUser.subscription?.active && dbUser.subscription?.tier === 'Pro';

  return (
    <div className="space-y-8 pb-12 pt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white/90">Welcome back, {dbUser.name}</h1>
          <p className="text-white/50 text-sm mt-1">Here is your progress in the Arena.</p>
        </div>
        <Link href="/challenges">
          <Button className="bg-white text-black hover:bg-white/90 font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-full px-6 h-9 transition-all">
            Enter Arena <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <Card className="bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.04] transition-all shadow-none relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-white/50">Total XP</CardTitle>
              <Trophy className="w-4 h-4 text-indigo-400 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white/90 font-sans tracking-tight">{dbUser.xp.toLocaleString()}</div>
              <p className="text-[11px] font-medium text-indigo-300/70 mt-1 flex items-center gap-1">Top 5% this week</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <Card className="bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.04] transition-all shadow-none relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-white/50">Current Streak</CardTitle>
              <Flame className="w-4 h-4 text-purple-400 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white/90 font-sans tracking-tight">{dbUser.streak} <span className="text-base text-white/40 font-normal">days</span></div>
              <p className="text-[11px] font-medium text-white/40 mt-1">Personal best: {Math.max(dbUser.streak, 14)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <Card className="bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.04] transition-all shadow-none relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-white/50">Challenges Won</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-blue-400 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white/90 font-sans tracking-tight">{submissionsCount}</div>
              <p className="text-[11px] font-medium text-blue-300/70 mt-1">+3 since last login</p>
            </CardContent>
          </Card>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <Card className={`bg-black/40 backdrop-blur-md border shadow-[0_0_30px_rgba(99,102,241,0.05)] relative overflow-hidden ${isPro ? 'border-indigo-500/40' : 'border-white/10'}`}>
            <div className="absolute top-0 right-0 py-[2px] px-2 bg-indigo-500/10 border-b border-l border-indigo-500/20 text-indigo-300 text-[9px] uppercase font-bold tracking-wider rounded-bl-lg">
              Live
            </div>
            {isPro && (
               <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
            )}
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <CardTitle className="text-xs font-medium text-white/50">Global Rank</CardTitle>
              <Activity className="w-4 h-4 text-indigo-400" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-semibold text-white tracking-tight">{dbUser.rank}</div>
              <div className="flex items-center gap-2 mt-1">
                {isPro ? (
                  <Badge variant="outline" className="text-[10px] font-semibold border-indigo-500/30 bg-indigo-500/10 text-indigo-300 uppercase tracking-widest px-2 py-0">Pro Tier</Badge>
                ) : (
                  <Link href="/pricing" className="text-[10px] uppercase font-semibold text-indigo-400/80 hover:text-indigo-300 transition-colors tracking-widest mt-0.5">Upgrade to Pro &rarr;</Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-white/[0.01] border-white/5 backdrop-blur-sm shadow-none">
          <CardHeader className="border-b border-white/5 pb-4 mb-4">
            <CardTitle className="text-lg font-medium text-white/90">Recent Submissions</CardTitle>
            <CardDescription className="text-white/40">Your latest challenge attempts and scores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dbUser.submissions.length > 0 ? (
              dbUser.submissions.map((sub, i) => (
                <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                      {i === 0 ? <Zap className="w-4 h-4 text-indigo-400" /> : <Clock className="w-4 h-4 text-white/30" />}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white/80 group-hover:text-white transition-colors">{sub.challenge.title}</div>
                      <div className="text-xs text-white/40 flex items-center gap-2 mt-1">
                        <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                        {sub.score && (
                          <>
                            <span>•</span>
                            <span className={i === 0 ? 'text-indigo-300 font-medium' : ''}>Score: {sub.score.total}/100</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-white/30 text-sm">No submissions yet. Enter the arena to start ranking!</div>
            )}
          </CardContent>
        </Card>

        {/* Skill Graph Placeholder */}
        <Card className="bg-white/[0.01] border-white/5 backdrop-blur-sm shadow-none">
          <CardHeader className="border-b border-white/5 pb-4 mb-4">
            <CardTitle className="text-lg font-medium text-white/90">Skill Profile</CardTitle>
            <CardDescription className="text-white/40">Areas you excel in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-white/60">Prompting</span>
                  <span className="font-medium text-white/90">92%</span>
                </div>
                <Progress value={92} className="h-1.5 bg-white/10 [&>div]:bg-indigo-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-white/60">Debugging</span>
                  <span className="font-medium text-white/90">85%</span>
                </div>
                <Progress value={85} className="h-1.5 bg-white/10 [&>div]:bg-purple-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-white/60">Product Strategy</span>
                  <span className="font-medium text-white/90">78%</span>
                </div>
                <Progress value={78} className="h-1.5 bg-white/10 [&>div]:bg-blue-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-white/60">Speed</span>
                  <span className="font-medium text-white/90">65%</span>
                </div>
                <Progress value={65} className="h-1.5 bg-white/10 [&>div]:bg-white/40" />
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 text-center space-y-2">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Pro Tip</div>
                <div className="text-[13px] text-white/50 leading-relaxed">
                  Focus on speed challenges to bump your overall rating to Platinum level!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
