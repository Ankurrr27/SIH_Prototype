'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Check, ShieldCheck, TestTube, UserCheck } from 'lucide-react';
import Link from 'next/link';

export function RolesSection() {
  const roles = [
    {
      role: 'Applicants & Businesses',
      badge: 'Instrument Owners & Dealers',
      icon: Building2,
      desc: 'Streamlined online filing for manufacturers, traders, and commercial instrument owners.',
      features: [
        'Register instrument specs & serial numbers',
        'Auto-computed verification fee processing',
        'Real-time application progress dashboard',
        'Instant QR digital certificate download',
      ],
      cta: 'Applicant Portal',
      link: '/login',
      accent: 'border-blue-200 bg-blue-50/30 dark:border-blue-900/40 dark:bg-blue-950/20',
      badgeStyle: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
    },
    {
      role: 'Legal Metrology Officers (LMO)',
      badge: 'Field Inspection Officers',
      icon: ShieldCheck,
      desc: 'Mobile-friendly inspection tool for field inspectors conducting MPE accuracy tests.',
      features: [
        'Assigned field inspection schedule queue',
        'Log accuracy error test parameters',
        'Verify physical seal integrity & location',
        'Digitally approve and trigger PDF certificates',
      ],
      cta: 'Inspector Portal',
      link: '/login',
      accent: 'border-blue-200 bg-blue-50/30 dark:border-blue-900/40 dark:bg-blue-950/20',
      badgeStyle: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
    },
    {
      role: 'Government Approved Test Centres (GATC)',
      badge: 'Authorized Calibration Labs',
      icon: TestTube,
      desc: 'Dedicated laboratory interface for accredited GATC testing centers.',
      features: [
        'Lab calibration testing queue',
        'Record standard weight repeatability tests',
        'Upload ISO/IEC accredited test reports',
        'Verify certificate dispatch ledger',
      ],
      cta: 'GATC Lab Portal',
      link: '/login',
      accent: 'border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/40 dark:bg-indigo-950/20',
      badgeStyle: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
    },
    {
      role: 'Department Administrators',
      badge: 'State System Governance',
      icon: UserCheck,
      desc: 'Centralized administration for state directors, nodal officers, and registry managers.',
      features: [
        'Manage statewide user permissions & RBAC',
        'Configure instrument fee rules & MPE limits',
        'Statewide inspection throughput analytics',
        'Tamper-proof system audit log feeds',
      ],
      cta: 'Admin Portal',
      link: '/login',
      accent: 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20',
      badgeStyle: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
    },
  ];

  return (
    <section id="roles" className="py-10 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Designed for Every Stakeholder
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.role}
                className={`rounded-xl border ${item.accent} p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badgeStyle}`}>
                      {item.badge}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{item.role}</h3>

                  <ul className="space-y-1.5 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                    {item.features.map((feat) => (
                      <li key={feat} className="flex items-start space-x-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-700">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-blue-600" aria-hidden="true" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-slate-800">
                  <Link
                    href={item.link}
                    className="inline-flex items-center justify-between w-full rounded-lg bg-[#1D4ED8] px-3 py-2 text-[11px] font-bold text-white shadow hover:bg-[#2563EB] transition"
                  >
                    <span>Access {item.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white/80" />
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


