'use client';

import React, { useState } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#0F2A5F] via-[#1E3A8A] to-[#2563EB] px-4 py-2 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-xs sm:text-sm">
        <div className="flex flex-1 items-center justify-center space-x-2 text-center sm:justify-start">
          <span className="hidden sm:inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-400/30">
            <Sparkles className="mr-1 h-3 w-3" /> Digital Metrology
          </span>
          <span className="font-medium text-slate-100">
            Digitize your instrument verification and certification process.
          </span>
          <a
            href="#how-it-works"
            className="inline-flex items-center font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 transition ml-1"
          >
            <span>Explore the platform</span>
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 rounded-md p-1 text-slate-300 hover:bg-white/10 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
