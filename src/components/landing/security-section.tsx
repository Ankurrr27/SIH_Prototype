'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck2, History } from 'lucide-react';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      desc: 'Enforces strict privilege boundaries for applicants, field officers, GATC testing centers, and system administrators.',
      colorClass: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
    },
    {
      icon: Lock,
      title: 'Secure Document Handling',
      desc: 'Encrypted document repository for technical specifications, calibration proofs, and verification invoice receipts.',
      colorClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
    {
      icon: FileCheck2,
      title: 'Application Activity Tracking',
      desc: 'Live timestamped milestone logs tracking every status transition, inspector assignment, and test parameter edit.',
      colorClass: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      icon: History,
      title: 'Audit-Ready Records',
      desc: 'Comprehensive digital ledger designed for statutory compliance reporting, state audits, and public registry transparency.',
      colorClass: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Trust & Compliance
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Built for Secure Workflows
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Engineered with robust security controls, audit trails, and strict data governance principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#050505] p-6 shadow-sm hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${item.colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[17px] font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


