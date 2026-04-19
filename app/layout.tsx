import './globals.css';
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-neutral-900 text-slate-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
