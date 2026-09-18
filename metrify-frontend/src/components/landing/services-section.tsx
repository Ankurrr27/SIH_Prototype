'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, RefreshCw, Calendar, Award, QrCode, SearchCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function ServicesSection() {
  const services = [
    {
      icon: Scale,
      title: 'Instrument Registration',
      description: 'Comprehensive digital profiling for commercial weighing scales, weighbridges, flow meters, and measuring instruments.',
      link: '/register',
    },
    {
      icon: RefreshCw,
      title: 'Verification & Re-verification',
      description: 'Streamlined initial verification filing and scheduled annual re-stamping renewal under Legal Metrology regulations.',
      link: '/register',
    },
    {
      icon: Calendar,
      title: 'Inspection Scheduling',
      description: 'Automated field inspector assignment (LMO) and GATC laboratory testing appointment management.',
      link: '/login',
    },
    {
      icon: Award,
      title: 'Digital Certificates',
      description: 'Instant cryptographic PDF stamping certificate generation with digital signature validation and seal details.',
      link: '/verify',
    },
    {
      icon: QrCode,
      title: 'QR Code Verification',
      description: 'Public mobile-scannable QR verification lookup enabling instant authenticity checks anywhere.',
      link: '/verify',
    },
    {
      icon: SearchCheck,
      title: 'Application Tracking',
      description: 'Real-time status updates, document verification logs, and milestone alerts from submission to certificate issuance.',
      link: '/login',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
            Platform Modules
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Everything You Need for Digital Verification
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Modular tools built specifically for Legal Metrology compliance, lab testing workflows, and public verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                className="group rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm hover:border-[#2563EB] hover:bg-white hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-850 dark:hover:border-blue-500 dark:hover:bg-slate-800 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] group-hover:bg-[#0F2A5F] group-hover:text-amber-400 transition-colors dark:bg-blue-950 dark:text-blue-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <Link
                    href={svc.link}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#2563EB] hover:text-[#0F2A5F] dark:text-blue-400 dark:hover:text-blue-300 transition"
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
