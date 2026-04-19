import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`mb-4 border-b border-slate-700 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: CardProps) {
  return (
    <h3 className={`text-xl font-bold text-white ${className}`} {...props}>
      {children}
    </h3>
  );
}
