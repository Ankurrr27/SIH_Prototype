'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Search, QrCode } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-24 lg:pt-24 min-h-[90vh] flex items-center lg:pb-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Simplifying Instrument Verification Through{' '}
              <span className="text-blue-600">
                Digital Innovation
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
              A unified portal for businesses, LMOs, and GATCs to manage the entire lifecycle of legal metrology certification.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-md border border-slate-200 bg-transparent px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <Search className="h-4 w-4" />
                <span>Verify Certificate</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dashboard Mockup Preview */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600">Digital Certificate</p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">CERT-2026-DEL-0419</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <QrCode className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6 py-6 text-sm">
                <div>
                  <p className="text-[12px] text-slate-500">Instrument</p>
                  <p className="mt-1 font-medium text-slate-900">Commercial weighing scale</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-500">Class</p>
                  <p className="mt-1 font-medium text-slate-900">Class III</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-500">Owner</p>
                  <p className="mt-1 font-medium text-slate-900">Sharma Retail Traders</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-500">Valid until</p>
                  <p className="mt-1 font-medium text-slate-900">01 October 2026</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md bg-emerald-50 px-4 py-2.5 text-[13px]">
                <span className="font-medium text-emerald-800">Status</span>
                <span className="font-semibold text-emerald-700">Valid & Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


