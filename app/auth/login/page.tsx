"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleOAuthLogin = async () => {
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-[-1]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[380px]"
      >
        <Card className="bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden group rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          <CardHeader className="space-y-4 text-center relative z-10 pt-8">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:border-indigo-500/30 transition-colors">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <CardTitle className="text-xl font-medium tracking-tight text-white/90">Sign in to VibeCode</CardTitle>
              <CardDescription className="text-white/40 mt-1">Enter your details to continue.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <form onSubmit={handleEmailLogin} className="space-y-4 relative z-10">
              <div className="space-y-2.5">
                <label className="text-[13px] font-medium text-white/70" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" className="h-10 bg-white/[0.03] border-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-white placeholder:text-white/20 rounded-xl" required />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-white/70" htmlFor="password">
                    Password
                  </label>
                  <Link href="#" className="text-[12px] text-white/40 hover:text-white/80 transition-colors">Forgot password?</Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 bg-white/[0.03] border-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-white rounded-xl" required />
              </div>
              
              {error && <div className="text-red-400 text-xs text-center">{error}</div>}

              <Button type="submit" disabled={isLoading} className="w-full h-10 mt-2 bg-white text-black hover:bg-white/90 font-medium rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="relative my-6 pt-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-semibold">
                <span className="bg-black px-3 text-white/30">Or continue with</span>
              </div>
            </div>
            
            <Button onClick={handleOAuthLogin} variant="outline" type="button" className="w-full h-10 bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:text-white text-white/80 transition-colors rounded-xl font-medium">
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4 text-white/80" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.64 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c6.873 0 11.4-4.827 11.4-11.533 0-.787-.067-1.547-.187-2.333H12.48z" />
              </svg>
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center relative z-10 border-t border-white/5 pt-6 mt-4 bg-white/[0.01]">
            <div className="text-[13px] text-white/50">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-white hover:text-indigo-300 font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
