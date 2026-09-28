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
      accentColor: 'blue',
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
      accentColor: 'indigo',
    },
    {
      role: 'Government Approved Test Centres',
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
      accentColor: 'violet',
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
      accentColor: 'emerald',
    },
  ];

  return (
    <section id="roles" className="py-20 bg-slate-50 scroll-mt-20 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Designed for Every Stakeholder
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Dedicated portals with specialized tools built specifically for your role in the legal metrology ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.role}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {/* Subtle top color bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-${item.accentColor}-500/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600`}>
                      {item.badge}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-hover:bg-${item.accentColor}-50 group-hover:text-${item.accentColor}-600 transition-colors`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.role}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>

                  <ul className="space-y-2.5 pt-4">
                    {item.features.map((feat) => (
                      <li key={feat} className="flex items-start text-[13px] text-slate-700">
                        <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6">
                  <Link
                    href={item.link}
                    className="group/btn relative inline-flex items-center justify-center w-full rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-colors overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-between w-full">
                      <span>Access {item.cta}</span>
                      <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
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


