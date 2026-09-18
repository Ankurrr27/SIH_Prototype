'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Search, CheckCircle2, Award, QrCode, Clock, BarChart3 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0F2A5F] to-slate-900 pt-12 pb-24 text-white lg:pt-16 lg:pb-32">
      {/* Subtle Background Pattern & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Platform Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-[#ffa502]" />
              <span>Digital Legal Metrology Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Simplifying Instrument Verification Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Digital Innovation
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Streamlining commercial weighing and measuring instrument registration, field inspection scheduling, GATC lab calibration, and instant QR-enabled digital certificate issuance.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#ffa502] px-7 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-800/80 px-7 py-3.5 text-base font-semibold text-white hover:bg-slate-700 transition"
              >
                <Search className="h-4 w-4 text-amber-400" />
                <span>Verify a Certificate</span>
              </Link>
            </div>

            {/* Small Trust Text */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-2 text-xs font-semibold text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span>Paperless workflows • Secure access • QR-enabled certificates</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dashboard Mockup Preview */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main Mockup Card Container */}
            <div className="relative rounded-3xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl space-y-6">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs font-mono text-slate-400">metriverify.gov.in/dashboard</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                  Live Ledger Active
                </span>
              </div>

              {/* 4 Dummy Metric Chips */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Instruments</span>
                  <p className="text-xl font-extrabold text-white mt-0.5">1,248</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Pending Applications</span>
                  <p className="text-xl font-extrabold text-amber-400 mt-0.5">18</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Verified Certificates</span>
                  <p className="text-xl font-extrabold text-emerald-400 mt-0.5">1,180</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Upcoming Inspections</span>
                  <p className="text-xl font-extrabold text-blue-400 mt-0.5">12</p>
                </div>
              </div>

              {/* Application Status Workflow Tracker Mockup */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Application #LM-2026-8842 Status</span>
                  <span className="text-emerald-400 font-semibold">90% Complete</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-emerald-400">✓ Submitted</span>
                  <span className="text-emerald-400">✓ Reviewed</span>
                  <span className="text-emerald-400">✓ Inspected</span>
                  <span className="text-amber-400 font-bold">Certifying</span>
                </div>
              </div>

              {/* QR Digital Certificate Mini Preview */}
              <div className="flex items-center justify-between rounded-2xl border border-blue-500/30 bg-blue-950/30 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                    <QrCode className="h-7 w-7 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      Digital Stamping Certificate
                    </span>
                    <h4 className="text-sm font-bold text-white">CERT-2026-DEL-0419</h4>
                    <p className="text-[11px] text-slate-400">Class III Commercial Weighbridge</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  VALID
                </span>
              </div>
            </div>

            {/* Floating Badges using Framer Motion */}
            <motion.div
              className="absolute -top-4 -right-4 hidden sm:flex items-center space-x-2 rounded-2xl border border-emerald-400/40 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-emerald-300 shadow-xl backdrop-blur"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Certificate Verified ✅</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-4 hidden sm:flex items-center space-x-2 rounded-2xl border border-amber-400/40 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-amber-300 shadow-xl backdrop-blur"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              <Award className="h-4 w-4 text-amber-400" />
              <span>MPE Test Passed 🎯</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
