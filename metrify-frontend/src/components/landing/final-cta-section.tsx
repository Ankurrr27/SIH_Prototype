'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, UserPlus, LogIn } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F2A5F] via-[#1E3A8A] to-[#0F2A5F] py-20 text-white border-t border-slate-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
          Start Your Digital Verification Journey
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Join businesses, manufacturers, testing laboratories, and inspection officers managing Legal Metrology verification on a modern digital platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#ffa502] px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition hover:scale-105"
          >
            <UserPlus className="h-5 w-5" />
            <span>Create an Account</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-600 bg-slate-900/80 px-8 py-4 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            <LogIn className="h-5 w-5 text-amber-400" />
            <span>Login to Dashboard</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
