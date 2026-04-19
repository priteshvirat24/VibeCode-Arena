import React from 'react';
import { Button } from '../../components/Button';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-slate-800 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Join the Arena</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
          <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" placeholder="vibecoder99" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" placeholder="••••••••" />
        </div>
        <Button className="w-full" variant="primary">Create Account</Button>
        <div className="text-center text-sm text-slate-400 mt-4">
          Or <a href="#" className="text-emerald-400 hover:text-emerald-300">Sign in with Google</a>
        </div>
        <div className="text-center text-sm text-slate-400 mt-6">
          Already have an account? <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300">Log In</Link>
        </div>
      </div>
    </div>
  );
}
