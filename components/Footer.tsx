import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} VibeCode Arena</span>
        <span>Made for AI builders — Dark mode optimized</span>
      </div>
    </footer>
  );
}
