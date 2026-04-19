import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <input
        className={`bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${className}`}
        {...props}
      />
    </div>
  );
}
