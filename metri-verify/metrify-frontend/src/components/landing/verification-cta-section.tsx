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
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F2A5F] via-[#1E3A8A] to-[#0F2A5F] p-8 sm:p-12 text-white shadow-2xl border border-slate-700">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300">
                <QrCode className="h-4 w-4 text-[#ffa502]" />
                <span>Public Verification Ledger</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Verify a Certificate Instantly
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto lg:mx-0">
                Validate any official Legal Metrology Stamping Certificate using its unique Certificate Number or cryptographic QR hash.
              </p>
              <div className="pt-1">
                <Link
                  href="/verify"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>How certificate verification works</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleVerify} className="space-y-3 bg-slate-900/90 p-6 rounded-2xl border border-slate-700 backdrop-blur-xl shadow-xl">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Enter Certificate Number or QR Code
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={certNo}
                    onChange={(e) => setCertNo(e.target.value)}
                    placeholder="e.g. CERT-2026-DEL-0419"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ffa502] focus:outline-none focus:ring-1 focus:ring-[#ffa502]"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#ffa502] px-4 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify Certificate</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
