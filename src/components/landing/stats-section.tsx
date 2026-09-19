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
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Activity,
      title: 'Verification Tracking',
      value: 'Real-time Status',
      description: 'Live milestone progress tracking from submission to field inspection & stamping.',
      color: 'from-blue-500 to-orange-600',
    },
    {
      icon: QrCode,
      title: 'QR-enabled Certificates',
      value: 'Secure Verification',
      description: 'Tamper-proof digital certificates embed cryptographic QR codes for instant lookup.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: ShieldCheck,
      title: 'Role-based Access',
      value: 'Multi-role Platform',
      description: 'Dedicated portals for Applicants, Inspectors, GATC labs, and System Admins.',
      color: 'from-[#1D4ED8] to-blue-900',
    },
  ];

  return (
    <section className="relative -mt-12 z-20 bg-slate-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:border-blue-500/50 hover:shadow-lg transition duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-tr ${stat.color} text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.title}
              </h3>
              <p className="text-lg font-extrabold text-slate-900 mt-1">
                {stat.value}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}


