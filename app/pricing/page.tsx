import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { createCheckoutSession } from '@/app/actions/stripe';

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-in fade-in duration-700">
      <div className="text-center space-y-4 mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-[100%] blur-[100px] pointer-events-none -z-10" />
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
          Level up your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI workflow</span>
        </h1>
        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Unlock maximum speed, unlimited evaluations, and premium architecture challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Bronze Tier (Free) */}
        <Card className="bg-white/[0.01] backdrop-blur-md border border-white/5 shadow-none relative overflow-hidden flex flex-col pt-4">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white/50" />
            </div>
            <CardTitle className="text-2xl font-medium text-white">Bronze</CardTitle>
            <CardDescription className="text-white/40 mt-2 text-[15px]">Perfect for builders getting started with AI-assisted coding.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            <div className="flex items-baseline mb-8">
              <span className="text-4xl font-bold tracking-tight text-white">Free</span>
            </div>
            <ul className="space-y-4">
              {[
                'Access to 5 Prompt Battles per day',
                'Standard Google Gemini feedback',
                'Basic community leaderboard',
                'Standard UI Clone challenges'
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-[14px] text-white/70">
                  <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-8 border-t border-white/5 pt-6">
            <Button disabled variant="outline" className="w-full h-11 bg-white/5 border-white/5 text-white/50 font-medium cursor-not-allowed">
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Tier */}
        <Card className="bg-black/60 backdrop-blur-md border border-indigo-500/30 relative overflow-hidden group flex flex-col pt-4 shadow-[0_0_80px_rgba(99,102,241,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Crown className="w-48 h-48 text-indigo-400" />
          </div>
          
          <div className="absolute -top-[1px] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-80" />
          
          <CardHeader className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-medium text-white">Pro Builder</CardTitle>
              <Badge variant="outline" className="border-indigo-500/50 text-indigo-300 bg-indigo-500/10 text-[10px] uppercase tracking-widest px-2 py-0">Recommended</Badge>
            </div>
            <CardDescription className="text-indigo-200/50 mt-2 text-[15px]">For professionals scaling advanced architectures.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 mt-4 relative z-10">
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-bold tracking-tight text-white">$15</span>
              <span className="text-white/40 ml-2">/month</span>
            </div>
            <ul className="space-y-4 border-t border-white/5 pt-6">
              {[
                'Unlimited executions & challenges',
                'Advanced GPT-4 / Opus integration access',
                'Highlight "Pro Tier" badge on global leaderboards',
                'Premium private system architecture builds',
                'Instant priority ranking updates'
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-[14px] text-white/90">
                  <div className="mt-0.5 p-1 bg-indigo-500/20 rounded-full mr-3 shrink-0">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-8 border-t border-indigo-500/20 pt-6 relative z-10 bg-indigo-500/5">
            {user ? (
              <form action={createCheckoutSession} className="w-full">
                <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 font-medium text-md transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl">
                  Upgrade to Pro
                </Button>
              </form>
            ) : (
              <Link href="/auth/signup" className="w-full">
                <Button className="w-full h-12 bg-indigo-600 text-white hover:bg-indigo-500 font-medium text-md transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] rounded-xl">
                  Create account to upgrade
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Trust Badges */}
      <div className="mt-24 text-center">
        <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.2em] mb-6">Secured by industry leaders</p>
        <div className="flex justify-center items-center gap-12 opacity-40 grayscale">
          <div className="flex items-center gap-2 font-bold font-sans text-xl"><Shield className="w-6 h-6"/> stripe</div>
        </div>
      </div>
    </div>
  );
}
