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
    <section id="process" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
            Simplified Timeline
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            From Application to Certificate in Simple Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Clear, transparent workflow ensuring regulatory compliance without unnecessary delays.
          </p>
        </div>

        {/* 5-Step Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.num}
                className="relative z-10 flex flex-col items-center text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Numbered Circle */}
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0F2A5F] text-white shadow-xl border-4 border-white dark:border-slate-900 relative group transition-transform hover:scale-110">
                  <Icon className="h-8 w-8 text-[#ffa502]" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#ffa502] text-xs font-extrabold text-slate-950 shadow">
                    {st.num}
                  </span>
                </div>

                <div className="space-y-2 max-w-xs">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{st.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.description}
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
