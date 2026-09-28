'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer id="contact" className="border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#050505] text-slate-600 dark:text-slate-400 py-16 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm transition-transform group-hover:scale-105">
                <Scale className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Metri<span className="text-blue-600 dark:text-blue-500">Verify</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                  Digital Verification & Certification
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An online digital verification and certification platform for weighing and measuring instruments under Legal Metrology regulations in India.
            </p>

            <div className="pt-2 space-y-3 text-sm">
              <div className="font-semibold text-slate-900 dark:text-white mb-2">Developed by Ankur Singh</div>
              <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <a href="mailto:ankurp22singh@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  ankurp22singh@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <a href="tel:8878856888" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  8878856888
                </a>
              </div>

            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Platform Features</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Instrument Registration</a>
              </li>
              <li>
                <a href="#process" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Verification Workflow</a>
              </li>
              <li>
                <Link href="/verify" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Public QR Certificate Verification</Link>
              </li>
              <li>
                <a href="#roles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stakeholder Portals</a>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Field Inspector Tools</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#problem" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Platform Overview</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GATC Lab Testing Rules</a>
              </li>
              <li>
                <a href="#process" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Permissible Error (MPE) Limits</a>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Officer Login Portal</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Applicant Business Registration</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Legal & Governance</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Legal Metrology Rules 2011</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security & Audit Compliance</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} MetriVerify by Ankur Singh. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span>Digital Metrology SaaS Prototype</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


