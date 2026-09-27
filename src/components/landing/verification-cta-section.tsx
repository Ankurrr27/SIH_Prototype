'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, QrCode, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function VerificationCtaSection() {
  const router = useRouter();
  const [certNo, setCertNo] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certNo.trim()) {
      router.push(`/verify?cert=${encodeURIComponent(certNo.trim())}`);
    } else {
      router.push('/verify');
    }
  };

  return (
    <section className="py-16 bg-white scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#1D4ED8] p-6 sm:p-10 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Large Detailed QR Code Visual with Sweep Animation */}
            <div className="flex justify-center lg:justify-center order-2 lg:order-1 mt-6 lg:mt-0 relative">
              <style>{`
                @keyframes scanner {
                  0% { top: -50%; opacity: 0; }
                  15% { opacity: 1; }
                  85% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
                .animate-scanner {
                  animation: scanner 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
              `}</style>
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-square rounded-3xl bg-white p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center transform transition-transform hover:scale-105 duration-500">
                <div className="absolute inset-0 bg-white rounded-3xl z-0" />
                
                {/* 21x21 Detailed Pseudo-QR Code Grid */}
                <div className="relative z-10 w-full h-full bg-transparent">
                  <div 
                    className="absolute inset-1.5 grid gap-[1.5%]"
                    style={{ gridTemplateColumns: 'repeat(21, 1fr)', gridTemplateRows: 'repeat(21, 1fr)' }}
                  >
                    {Array.from({ length: 441 }).map((_, i) => {
                      const row = Math.floor(i / 21);
                      const col = i % 21;
                      const isTopLeft = row < 7 && col < 7;
                      const isTopRight = row < 7 && col > 13;
                      const isBottomLeft = row > 13 && col < 7;
                      if (isTopLeft || isTopRight || isBottomLeft) return <div key={i} />;
                      
                      const isActive = (i * 13 + row * 7 + col * 3) % 10 > 4;
                      return <div key={i} className={`w-full h-full rounded-[1px] ${isActive ? 'bg-[#1D4ED8]' : 'bg-transparent'}`} />;
                    })}
                  </div>
                  
                  {/* Corner Markers */}
                  <div className="absolute top-1.5 left-1.5 w-[31%] h-[31%] bg-transparent border-[5px] sm:border-[6px] border-[#1D4ED8] rounded-xl flex items-center justify-center z-10">
                    <div className="w-1/2 h-1/2 bg-[#1D4ED8] rounded-md" />
                  </div>
                  <div className="absolute top-1.5 right-1.5 w-[31%] h-[31%] bg-transparent border-[5px] sm:border-[6px] border-[#1D4ED8] rounded-xl flex items-center justify-center z-10">
                    <div className="w-1/2 h-1/2 bg-[#1D4ED8] rounded-md" />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 w-[31%] h-[31%] bg-transparent border-[5px] sm:border-[6px] border-[#1D4ED8] rounded-xl flex items-center justify-center z-10">
                    <div className="w-1/2 h-1/2 bg-[#1D4ED8] rounded-md" />
                  </div>
                </div>

                {/* Animated Scanner Box */}
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-blue-500/20 border-b-[3px] border-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.5)] animate-scanner" />
                </div>
                
                {/* Scanner Decorative Elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-blue-400 rounded-tl-xl z-20" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-[3px] border-r-[3px] border-blue-400 rounded-tr-xl z-20" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-[3px] border-l-[3px] border-blue-400 rounded-bl-xl z-20" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-blue-400 rounded-br-xl z-20" />
              </div>
            </div>

            {/* Right Column: Content and Form */}
            <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
              <div className="space-y-3">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
                  Verify a Certificate Instantly
                </h2>
              </div>

              <form onSubmit={handleVerify} className="space-y-3 bg-white p-5 rounded-2xl shadow-xl text-left max-w-md mx-auto lg:mx-0">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  Enter Certificate Number or QR Code
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={certNo}
                    onChange={(e) => setCertNo(e.target.value)}
                    placeholder="e.g. CERT-2026-DEL-0419"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#1D4ED8] px-4 py-3 text-sm font-bold text-white hover:bg-blue-800 transition shadow-md shadow-blue-900/20"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify Certificate</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="pt-1 flex justify-center lg:justify-start">
                <Link
                  href="/verify"
                  className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-blue-200 hover:text-white underline underline-offset-4 transition-colors"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>How certificate verification works</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


