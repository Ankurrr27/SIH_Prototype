'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FilePlus, Upload, Calendar, TestTube2, Award, QrCode } from 'lucide-react';

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workflowSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, workflowSteps.length]);

  const handleClick = useCallback((idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);
    // Resume auto-cycling after 6 seconds of inactivity
    setTimeout(() => setIsPaused(false), 6000);
  }, []);

  return (
    <section className="py-12 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white">
            One Platform. Complete Lifecycle.
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            End-to-end digital journey from registration to QR-verified certification.
          </p>
        </div>

        {/* Full-width horizontal step indicators */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Steps Row */}
          <div className="flex items-start justify-between gap-0 w-full">
            {workflowSteps.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => handleClick(idx)}
                  className="group relative flex flex-col items-center flex-1 min-w-0 cursor-pointer focus:outline-none"
                >
                  {/* Connecting line */}
                  {idx > 0 && (
                    <div className="absolute top-5 right-1/2 w-full h-px">
                      <div
                        className={`h-full transition-colors duration-500 ${
                          isPast || isActive
                            ? 'bg-blue-500 dark:bg-blue-500'
                            : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                      />
                    </div>
                  )}

                  {/* Node */}
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-xl border transition-all duration-500 ${
                      isActive
                        ? 'h-12 w-12 bg-blue-600 dark:bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25 scale-110'
                        : isPast
                        ? 'h-10 w-10 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                        : 'h-10 w-10 bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <Icon className={`${isActive ? 'h-5 w-5' : 'h-4 w-4'} transition-all duration-300`} />
                  </div>

                  {/* Step label */}
                  <span
                    className={`mt-3 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {item.step}
                  </span>

                  {/* Title */}
                  <span
                    className={`mt-1 text-xs font-semibold text-center leading-tight transition-colors duration-300 px-1 ${
                      isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-500'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Card */}
          <div className="mt-5 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full max-w-xl rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0A0A0A] p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                    {React.createElement(workflowSteps[activeIndex].icon, { className: 'h-5 w-5' })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                        STEP {workflowSteps[activeIndex].step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {workflowSteps[activeIndex].title}
                    </h3>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-13">
                  {workflowSteps[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex justify-center">
            <div className="flex gap-1.5">
              {workflowSteps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleClick(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === activeIndex
                      ? 'w-6 bg-blue-600 dark:bg-blue-500'
                      : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
