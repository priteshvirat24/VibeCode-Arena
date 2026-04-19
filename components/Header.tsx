"use client";
import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">VibeCode Arena</Link>
        <nav className="flex items-center gap-4">
          <Link href="/challenges" className="text-slate-300 hover:text-white">Challenges</Link>
          <Link href="/leaderboard" className="text-slate-300 hover:text-white">Leaderboard</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white">Pricing</Link>
          <Link href="/auth/login" className="px-3 py-1 rounded bg-slate-700 text-slate-100">Login</Link>
        </nav>
      </div>
    </header>
  );
}
