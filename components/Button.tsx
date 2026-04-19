"use client";
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium';
  const variants: Record<string, string> = {
    primary: 'bg-emerald-500 text-black hover:bg-emerald-600',
    ghost: 'bg-transparent border border-slate-700 text-slate-200 hover:bg-slate-800'
  };
  return <button className={[base, variants[variant], className].join(' ')} {...props} />;
}
