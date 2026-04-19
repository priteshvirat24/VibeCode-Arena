"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LeaderboardPreview } from '../components/LeaderboardPreview';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Code, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-32 py-16 pb-24 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen mix-blend-plus-lighter" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/15 blur-[100px] rounded-full mix-blend-screen mix-blend-plus-lighter" />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-10 relative z-10 pt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[13px] font-medium text-white/80 hover:bg-white/10 transition-colors cursor-default shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          VibeCode Arena v3.0 Early Access
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-[80px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 leading-[1.1] max-w-4xl"
        >
          Become dangerous with <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300">AI Coding</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed font-light"
        >
          Level up your product skills through real-world challenges. Build, debug, prototype and ship — fast. Compete on the global leaderboard.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
        >
          <Link href="/auth/signup">
            <Button size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-white/90 font-medium text-[15px] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all">
              Start Building Free <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
            </Button>
          </Link>
          <Link href="/challenges">
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-[15px] backdrop-blur-md transition-all">
              View Challenges
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Floating 3D Leaderboard Preview */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto perspective-1000"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,1),0_0_40px_-10px_rgba(99,102,241,0.2)] transform-gpu rotate-x-12 scale-[0.98] hover:rotate-x-0 hover:scale-100 transition-all duration-700 ease-out preserve-3d">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <h3 className="font-semibold text-lg text-white/90 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
              Live Arena Leaderboard
            </h3>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-white/20"></span>
              <span className="h-2 w-2 rounded-full bg-white/20"></span>
              <span className="h-2 w-2 rounded-full bg-white/20"></span>
            </div>
          </div>
          <LeaderboardPreview />
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-16">
        {[
          { title: "Prompt Battles", desc: "Compete in short rounds optimizing complex AI prompts for precision.", icon: <Zap className="w-5 h-5 text-indigo-400" /> },
          { title: "Build From Idea", desc: "Ship small, fully functional applications that demonstrate real product thinking.", icon: <Code className="w-5 h-5 text-purple-400" /> },
          { title: "Debug AI Code", desc: "Identify and resolve subtle bugs in AI-generated codebases under time pressure.", icon: <Shield className="w-5 h-5 text-blue-400" /> }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-colors backdrop-blur-md shadow-none relative group overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <CardTitle className="text-lg font-medium text-white/90">{feature.title}</CardTitle>
                  <CardDescription className="text-white/50 text-[14px] leading-relaxed mt-2">{feature.desc}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="pt-24 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Simple, transparent pricing</h2>
          <p className="text-white/50 text-lg">Start for free, upgrade when you need extreme scale.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <Card className="bg-black border-white/10 backdrop-blur-md shadow-none p-2 relative overflow-hidden h-[90%]">
            <div className="absolute top-0 right-0 p-32 bg-white/[0.02] rounded-full blur-[50px] -m-16 z-0" />
            <CardHeader className="relative z-10 border-b border-white/5 pb-8">
              <CardTitle className="text-xl font-medium text-white/90">Hobby</CardTitle>
              <div className="mt-4 flex items-baseline text-4xl font-semibold text-white">
                $0<span className="ml-1 text-base font-normal text-white/50">/mo</span>
              </div>
              <CardDescription className="text-white/50 mt-2">Perfect to get started and learn.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-8">
              <ul className="space-y-4 text-[14px] text-white/70 mb-8">
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-white/30" /> 3 challenges per day</li>
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-white/30" /> Community access</li>
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-white/30" /> Global leaderboard ranking</li>
              </ul>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 relative mt-auto">Current Plan</Button>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden bg-black border-[1.5px] border-indigo-500/30 p-2 shadow-[0_0_50px_rgba(99,102,241,0.1)] h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
            
            <CardHeader className="relative z-10 border-b border-white/10 pb-8">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-medium text-white">Pro</CardTitle>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">Popular</span>
              </div>
              <div className="mt-4 flex items-baseline text-4xl font-semibold text-white">
                $19<span className="ml-1 text-base font-normal text-indigo-300/70">/mo</span>
              </div>
              <CardDescription className="text-indigo-200/50 mt-2">For serious builders shipping real apps.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-8 flex flex-col justify-between">
              <ul className="space-y-4 text-[14px] text-white/80 mb-8">
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-indigo-400" /> Unlimited daily challenges</li>
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-indigo-400" /> Advanced AI logic feedback</li>
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-indigo-400" /> Verified profile badge</li>
                <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-indigo-400" /> Priority sandbox execution</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-white/90 font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-auto">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
