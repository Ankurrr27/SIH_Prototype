'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Scale, Send, ClipboardCheck, Award } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: 'Create Account',
      description: 'Register as an applicant, manufacturer, dealer, or business entity on MetriVerify.',
      icon: UserPlus,
    },
    {
      num: 2,
      title: 'Register Instrument',
      description: 'Input instrument specifications, model capacity, manufacturer serials, and site location.',
      icon: Scale,
    },
    {
      num: 3,
      title: 'Submit Application',
      description: 'Select initial verification or re-stamping, upload docs, and complete fee calculation.',
      icon: Send,
    },
    {
      num: 4,
      title: 'Inspection & Testing',
      description: 'Authorized LMO officer or GATC laboratory executes MPE accuracy checks and stamps instrument.',
      icon: ClipboardCheck,
    },
    {
      num: 5,
      title: 'Receive Digital Certificate',
      description: 'Download cryptographic PDF certificate with embedded QR code for instant public verification.',
      icon: Award,
    },
  ];

  return (
    <section id="process" className="border-y border-slate-200 bg-white py-10 text-slate-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            From Application to Certificate in Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.num}
                className="group relative flex min-h-52 flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-blue-600">{String(st.num).padStart(2, '0')}</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="sr-only">
                    {st.num}
                  </span>
                </div>

                <div className="mt-auto space-y-2">
                  <h3 className="text-sm font-bold text-slate-950">{st.title}</h3>
                  <p className="text-xs leading-5 text-slate-950">
                    {st.description}
                  </p>
                  <div className="border-t border-slate-300 pt-3 text-[11px] font-semibold text-slate-950">
                    Stage {st.num} of {steps.length}
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


