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
    <section className="py-24 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 rounded-full border border-blue-400/40 bg-blue-50 px-4 py-1 text-xs font-bold text-blue-700">
            <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
            <span>End-to-End Digital Solution</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-950">
            One Platform. Complete Verification Lifecycle.
          </h2>
          <p className="text-slate-700 text-base sm:text-lg">
            A unified digital governance framework connecting applicants, field officers, GATC testing centers, and the public.
          </p>
        </div>

        {/* Connected Step Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="relative rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-400/60 transition duration-300 flex flex-col justify-between group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-[#2563EB] font-mono">{item.step}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                  <span>Stage {idx + 1} of 7</span>
                  <span className="text-blue-600">Automated</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


