import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} VibeCode Arena</span>
        <div className="flex items-center gap-1.5">
          <span>Made for AI builders</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>
    </footer>
  );
}
