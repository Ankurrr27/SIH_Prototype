'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FilePlus, Upload, Calendar, TestTube2, Award, QrCode, CheckCircle2 } from 'lucide-react';

export function SolutionSection() {
  const workflowSteps = [
    {
      step: '01',
      title: 'Register Instrument',
      desc: 'Log technical specifications, capacity, and serial number in digital registry.',
      icon: Scale,
    },
    {
      step: '02',
      title: 'Submit Application',
      desc: 'Select verification type (initial, re-stamping) and auto-calculate regulatory fee.',
      icon: FilePlus,
    },
    {
      step: '03',
      title: 'Upload Documents',
      desc: 'Attach manufacturer test certificates, calibration proofs, and invoice records.',
      icon: Upload,
    },
    {
      step: '04',
      title: 'Schedule Inspection',
      desc: 'Automated inspector allocation (LMO) or GATC test laboratory scheduling.',
      icon: Calendar,
    },
    {
      step: '05',
      title: 'Record Test Readings',
      desc: 'Conduct MPE accuracy checks and digitally log field/lab test parameters.',
      icon: TestTube2,
    },
    {
      step: '06',
      title: 'Generate Certificate',
      desc: 'Automated cryptographic PDF stamping certificate issuance.',
      icon: Award,
    },
    {
      step: '07',
      title: 'Verify via QR Code',
      desc: 'Instant public validation through scannable QR code on physical instrument.',
      icon: QrCode,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            One Platform. Complete Lifecycle.
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            A seamless, end-to-end digital journey from initial instrument registration to final QR-based public verification.
          </p>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative w-full overflow-hidden">
          {/* Fading edges for scroll indication */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-slate-50 dark:from-[#050505] to-transparent md:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-50 dark:from-[#050505] to-transparent md:w-24" />

          <div className="overflow-x-auto pb-12 pt-4 hide-scrollbar snap-x snap-mandatory flex">
            <div className="relative flex px-8 md:px-24 min-w-max">
              {/* Connecting Horizontal Line */}
              <div className="absolute top-[28px] left-8 right-8 h-px bg-slate-200 dark:bg-slate-800 md:left-24 md:right-24" />

              {workflowSteps.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.step}
                    className="relative flex flex-col items-center w-[260px] sm:w-[300px] shrink-0 snap-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    {/* Node / Icon on the line */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800/60 shadow-sm text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Step Number Badge */}
                    <div className="mt-6 mb-3">
                      <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                        STEP {item.step}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


