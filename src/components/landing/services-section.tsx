'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, RefreshCw, Calendar, Award, QrCode, SearchCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function ServicesSection() {
  const services = [
    {
      icon: Scale,
      title: 'Instrument Registration',
      description: 'Comprehensive digital profiling for commercial weighing scales, weighbridges, flow meters, and measuring instruments.',
      link: '/register',
    },
    {
      icon: RefreshCw,
      title: 'Verification & Re-verification',
      description: 'Streamlined initial verification filing and scheduled annual re-stamping renewal under Legal Metrology regulations.',
      link: '/register',
    },
    {
      icon: Calendar,
      title: 'Inspection Scheduling',
      description: 'Automated field inspector assignment (LMO) and GATC laboratory testing appointment management.',
      link: '/login',
    },
    {
      icon: Award,
      title: 'Digital Certificates',
      description: 'Instant cryptographic PDF stamping certificate generation with digital signature validation and seal details.',
      link: '/verify',
    },
    {
      icon: QrCode,
      title: 'QR Code Verification',
      description: 'Public mobile-scannable QR verification lookup enabling instant authenticity checks anywhere.',
      link: '/verify',
    },
    {
      icon: SearchCheck,
      title: 'Application Tracking',
      description: 'Real-time status updates, document verification logs, and milestone alerts from submission to certificate issuance.',
      link: '/login',
    },
  ];

  return (
    <section id="services" className="py-10 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Everything You Need for Digital Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#1D4ED8] group-hover:text-blue-400 transition-colors dark:bg-blue-950 dark:text-blue-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <Link
                    href={svc.link}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] dark:text-blue-400 dark:hover:text-blue-300 transition"
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="h-4 w-4" />
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


