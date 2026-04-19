"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full border-b border-white/[0.08] bg-black/50 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg flex items-center gap-2 group relative">
          <div className="absolute inset-0 bg-indigo-500/10 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <Terminal className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors z-10" />
          <span className="tracking-tight z-10 text-white/90 group-hover:text-white transition-colors">VibeCode<span className="text-white/40 font-normal">Arena</span></span>
        </Link>
        <nav className="flex items-center gap-6 text-[13px] font-medium text-white/60">
          {['Challenges', 'Leaderboard', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className="hover:text-white transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
          <Link href="/auth/login">
            <Button variant="secondary" size="sm" className="h-8 px-4 text-[13px] font-medium bg-white text-black hover:bg-white/90 rounded-full transition-all">
              Log in
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
