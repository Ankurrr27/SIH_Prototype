'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Activity, QrCode, ShieldCheck } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: FileCheck,
      title: 'Digital Applications',
      value: '100% Digital Workflow',
      description: 'End-to-end paperless submission, specification validation, and fee calculation.',
      colorClass: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      icon: Activity,
      title: 'Verification Tracking',
      value: 'Real-time Status',
      description: 'Live milestone progress tracking from submission to field inspection & stamping.',
      colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
      icon: QrCode,
      title: 'QR Certificates',
      value: 'Secure Verification',
      description: 'Tamper-proof digital certificates embed cryptographic QR codes for instant lookup.',
      colorClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
      icon: ShieldCheck,
      title: 'Role-based Access',
      value: 'Multi-role Platform',
      description: 'Dedicated portals for Applicants, Inspectors, GATC labs, and System Admins.',
      colorClass: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    },
  ];

  return (
    <section className="relative z-20 py-12 border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </h3>
                  <p className="text-[15px] font-semibold text-slate-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


