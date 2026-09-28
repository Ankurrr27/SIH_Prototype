'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, UserPlus, LogIn } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 text-white">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          Start Your Digital Verification Journey
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
          Join businesses, manufacturers, testing laboratories, and inspection officers managing Legal Metrology verification on a modern digital platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-md bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-xl shadow-white/10"
          >
            <UserPlus className="h-4 w-4" />
            <span>Create an Account</span>
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-md border border-slate-700 bg-[#050505] px-8 py-3.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <LogIn className="h-4 w-4 text-slate-400" />
            <span>Login to Dashboard</span>
          </Link>
        </div>
      </div>
    </section>
  );
}


