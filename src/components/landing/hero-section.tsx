'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Search, QrCode } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-24 text-slate-900 lg:pt-16 lg:pb-32">
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
            <div className="inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Digital Legal Metrology Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Simplifying Instrument Verification Through{' '}
              <span className="text-blue-600">
                Digital Innovation
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Streamlining commercial weighing and measuring instrument registration, field inspection scheduling, GATC lab calibration, and instant QR-enabled digital certificate issuance.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#2563EB] px-7 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-blue-500/25 hover:bg-blue-400 transition hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-900 hover:border-blue-300 hover:bg-blue-50 transition"
              >
                <Search className="h-4 w-4 text-blue-400" />
                <span>Verify a Certificate</span>
              </Link>
            </div>

            {/* Small Trust Text */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-2 text-xs font-semibold text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span>Paperless workflows â€¢ Secure access â€¢ QR-enabled certificates</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dashboard Mockup Preview */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between border-b border-slate-800 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Verification record</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-950">Digital Certificate</h2>
                  <p className="mt-1 text-sm text-slate-500">CERT-2026-DEL-0419</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <QrCode className="h-7 w-7" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-5 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Instrument</p>
                  <p className="mt-1 font-semibold text-slate-900">Commercial weighing scale</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Class</p>
                  <p className="mt-1 font-semibold text-slate-900">Class III</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Owner</p>
                  <p className="mt-1 font-semibold text-slate-900">Sharma Retail Traders</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Valid until</p>
                  <p className="mt-1 font-semibold text-slate-900">01 October 2026</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-sm">
                <span className="font-semibold text-emerald-800">Certificate status</span>
                <span className="font-bold text-emerald-700">Valid</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}


