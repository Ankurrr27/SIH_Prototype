'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, EyeOff, AlertOctagon, XCircle } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: FileText,
      title: 'Manual Paperwork & Processing Delays',
      description: 'Physical application forms, manual document verification, and physical office visits cause extended processing timelines.',
      points: [
        'Prone to document loss or missing attachments',
        'In-person office visits for submission & fee receipts',
        'Slower communication between applicant and officer',
      ],
      accent: 'border-rose-200 bg-rose-50/50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-400',
    },
    {
      icon: EyeOff,
      title: 'Limited Application & Inspection Visibility',
      description: 'Applicants and stakeholders lack real-time visibility into inspection scheduling, assigned LMOs, or testing status.',
      points: [
        'Unpredictable field inspector scheduling',
        'No centralized milestone tracking dashboard',
        'Unclear rejection or resubmission feedback',
      ],
      accent: 'border-blue-200 bg-blue-50/50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-400',
    },
    {
      icon: AlertOctagon,
      title: 'Certificate Fraud & Loss Risk',
      description: 'Paper certificates are vulnerable to physical damage, forgery, loss, and laborious manual authenticity verification.',
      points: [
        'High risk of counterfeit physical stamping certificates',
        'Laborious manual register lookups for public verification',
        'Difficult re-issuance upon loss of paper document',
      ],
      accent: 'border-orange-200 bg-orange-50/50 text-orange-700 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-400',
    },
  ];

  return (
    <section id="problem" className="py-20 bg-black text-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Traditional Verification Processes Can Be Complex
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-7 shadow-sm hover:border-blue-500/50 hover:shadow-lg transition flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="space-y-4">
                  <div className={`inline-flex items-center justify-center rounded-lg p-3 ${prob.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{prob.title}</h3>
                  <ul className="space-y-2 pt-2 border-t border-slate-700">
                    {prob.points.map((pt) => (
                      <li key={pt} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">&bull;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


