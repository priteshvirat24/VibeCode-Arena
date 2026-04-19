"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Clock, Play, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { submitChallenge } from '@/app/actions/submissions';
import { motion } from 'framer-motion';

export default function ChallengeClient({ challenge }: { challenge: any }) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = () => setIsRunning(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRunning(false);
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitChallenge(formData);
    
    if (result.success) {
      setScore(result.score);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pt-4 pb-12 animate-in fade-in duration-500">
      <Link href="/challenges" className="inline-flex items-center text-[13px] font-medium text-white/40 hover:text-white/90 transition-colors mb-6">
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Arena
      </Link>

      {score ? (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
           <Card className="bg-black border border-indigo-500/30 relative overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)] rounded-2xl">
            <div className="absolute top-0 right-0 p-8 space-y-4 opacity-5 pointer-events-none">
              <TrophyIcon className="w-64 h-64 text-indigo-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            
            <CardHeader className="relative z-10 border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">Challenge Completed</CardTitle>
                  <CardDescription className="text-white/50 text-[15px] mt-1">Excellent work. The AI Judge has evaluated your submission.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-8">
              <motion.div 
                initial="hidden" 
                animate="show" 
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-5 gap-4"
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="col-span-2 sm:col-span-1">
                  <ScoreCard label="Total Score" value={score.total} isTotal />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <ScoreCard label="Clarity" value={score.promptClarity} />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <ScoreCard label="Quality" value={score.outputQuality} />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <ScoreCard label="Speed" value={score.speed} />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <ScoreCard label="Creativity" value={score.creativity} />
                </motion.div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 flex justify-center"
              >
                <Link href="/dashboard">
                  <Button className="h-10 rounded-full bg-white text-black hover:bg-white/90 font-medium px-8 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all">
                    Return to command center
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-none sticky top-24 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0 border-purple-500/30 bg-purple-500/10 text-purple-300">
                    {challenge.difficulty}
                  </Badge>
                  <div className="flex items-center text-white/70 font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-[13px]">
                    <Clock className="w-3.5 h-3.5 mr-2 opacity-50" />
                    {formatTime(timer)}
                  </div>
                </div>
                <CardTitle className="text-xl font-medium text-white/90">{challenge.title}</CardTitle>
                <CardDescription className="mt-2 text-white/50 leading-relaxed">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-2 border-t border-white/5">
                <div className="space-y-3">
                  <h4 className="font-medium text-[13px] flex items-center gap-2 text-white/60 uppercase tracking-widest">
                    <Brain className="w-4 h-4 text-indigo-400" /> Objective
                  </h4>
                  <p className="text-[14px] text-white/70 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed font-light">
                    {challenge.objective}
                  </p>
                </div>
                {!isRunning && (
                  <Button onClick={handleStart} className="w-full h-10 rounded-xl bg-white text-black hover:bg-white/90 font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                    <Play className="w-4 h-4 mr-2" /> Start Timer
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-none h-full rounded-2xl">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-white/90">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Submission Flow
                </CardTitle>
                <CardDescription className="text-white/40">Paste your prompt and generated output here.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="challengeId" value={challenge.id} />
                  <input type="hidden" name="timeSeconds" value={timer} />
                  
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-medium text-white/60 uppercase tracking-wide" htmlFor="prompt">The Prompt You Used</label>
                    <textarea 
                      id="prompt" 
                      name="prompt" 
                      rows={4} 
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-[14px] resize-y focus:outline-none focus:ring-1 focus:ring-indigo-500/50 disabled:opacity-50 text-white/80 placeholder:text-white/20 transition-all shadow-inner"
                      placeholder="e.g. You are an expert summarizer. Extract the following..."
                      disabled={!isRunning || isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[13px] font-medium text-white/60 uppercase tracking-wide" htmlFor="code">AI Generated Code/Output</label>
                    <textarea 
                      id="code" 
                      name="code" 
                      rows={6} 
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-[13px] font-mono resize-y focus:outline-none focus:ring-1 focus:ring-indigo-500/50 disabled:opacity-50 text-white/80 placeholder:text-white/20 transition-all shadow-inner"
                      placeholder="Paste the final output you got..."
                      disabled={!isRunning || isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[13px] font-medium text-white/60 uppercase tracking-wide" htmlFor="notes">Strategy Notes <span className="text-white/30 lowercase normal-case text-[11px]">(Optional)</span></label>
                    <Input id="notes" name="notes" placeholder="How did you arrive at this prompt?" className="bg-black border-white/10 h-11 text-[14px] rounded-xl focus-visible:ring-indigo-500/50 disabled:opacity-50 placeholder:text-white/20" disabled={!isRunning || isSubmitting} />
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <Button 
                      type="submit" 
                      disabled={!isRunning || isSubmitting}
                      className="w-full h-11 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 font-medium transition-all"
                    >
                      {isSubmitting ? 'Evaluating...' : (
                        <><Send className="w-4 h-4 mr-2" /> Submit to AI Judge</>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, value, isTotal }: { label: string, value: number, isTotal?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-1 ${isTotal ? 'bg-indigo-500/10 border-indigo-500/30 gap-2 col-span-2 sm:col-span-1 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'bg-white/[0.02] border-white/5'}`}>
      <span className={`text-[10px] font-semibold uppercase tracking-widest ${isTotal ? 'text-indigo-300' : 'text-white/40'}`}>{label}</span>
      <span className={`font-sans font-semibold tracking-tight ${isTotal ? 'text-4xl text-indigo-400' : 'text-2xl text-white/90'}`}>{value}</span>
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7c0 6 6 8 6 8s6-2 6-8V2Z" />
    </svg>
  );
}
