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
    },
  ];

  return (
    <section id="problem" className="py-24 bg-white dark:bg-[#050505] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            The Challenges of Traditional Verification
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Legacy systems rely heavily on manual processes, leading to bottlenecks, lack of transparency, and security risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#0A0A0A] p-8 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{prob.title}</h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {prob.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800/60">
                    {prob.points.map((pt) => (
                      <li key={pt} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                        <XCircle className="mr-3 mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                        <span className="leading-snug">{pt}</span>
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


