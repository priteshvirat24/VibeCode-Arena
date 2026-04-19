import '../styles/globals.css';
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'VibeCode Arena',
  description: 'Become Dangerous with AI Coding — VibeCode Arena'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body className="bg-black text-foreground antialiased min-h-screen">
        
        {/* Vercel/Linear Premium Background */}
        <div className="fixed inset-0 z-[-1] bg-black">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          {/* Top Edge Aurora Glow */}
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-[0.15] blur-[100px]"></div>
          {/* Secondary ambient glow */}
          <div className="absolute left-[20%] top-[10%] -z-10 h-[200px] w-[200px] rounded-full bg-purple-500 opacity-[0.1] blur-[80px]"></div>
        </div>

        <div className="min-h-screen flex flex-col relative z-0">
          <Header />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
