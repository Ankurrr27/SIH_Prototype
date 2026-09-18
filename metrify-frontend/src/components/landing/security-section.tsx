'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck2, History } from 'lucide-react';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Enforces strict privilege boundaries for applicants, field officers, GATC testing centers, and system administrators.',
      accent: 'text-[#2563EB]',
    },
    {
      icon: Lock,
      title: 'Secure Document Handling',
      desc: 'Encrypted document repository for technical specifications, calibration proofs, and verification invoice receipts.',
      accent: 'text-[#ffa502]',
    },
    {
      icon: FileCheck2,
      title: 'Application Activity Tracking',
      desc: 'Live timestamped milestone logs tracking every status transition, inspector assignment, and test parameter edit.',
      accent: 'text-emerald-500',
    },
    {
      icon: History,
      title: 'Audit-Ready Records',
      desc: 'Comprehensive digital ledger designed for statutory compliance reporting, state audits, and public registry transparency.',
      accent: 'text-indigo-500',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
            Trust & Compliance
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Built for Secure and Transparent Workflows
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Engineered with robust security controls, audit trails, and strict data governance principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-7 shadow-sm hover:shadow-lg transition dark:border-slate-800 dark:bg-slate-850"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md border border-slate-200 dark:bg-slate-800 dark:border-slate-700 ${item.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
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
