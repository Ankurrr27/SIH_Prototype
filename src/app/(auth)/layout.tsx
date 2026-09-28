'use client';

import React from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left — Form Side */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-28 bg-white dark:bg-[#050505]">
        <div className="w-full max-w-[420px] mx-auto">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-10 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white transition-transform group-hover:scale-105">
              <Scale className="h-5 w-5 text-white dark:text-slate-900" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Metri<span className="text-blue-600">Verify</span>
            </span>
          </Link>

          {children}
        </div>
      </div>

      {/* Right — Branding Side */}
      <div className="relative hidden w-[48%] lg:flex lg:flex-col lg:items-center lg:justify-center overflow-hidden bg-[#0A0A0A]">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Large Logo Mark */}
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-2xl">
            <Scale className="h-10 w-10 text-white/90" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white xl:text-4xl">
            MetriVerify
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xs leading-relaxed">
            Digital verification & certification platform for Legal Metrology, Government of India.
          </p>
        </div>

        {/* Bottom attribution */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Ministry of Consumer Affairs, Food & Public Distribution
          </p>
        </div>
      </div>
    </div>
  );
}
