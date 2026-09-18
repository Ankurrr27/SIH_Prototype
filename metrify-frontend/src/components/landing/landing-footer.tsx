'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-950 text-slate-400 py-16 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2A5F] text-amber-400 border border-blue-900">
                <Scale className="h-5 w-5 text-[#ffa502]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Metri<span className="text-[#ffa502]">Verify</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wide">
                  Digital Verification & Certification
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An online digital verification and certification platform for weighing and measuring instruments under Legal Metrology regulations in India.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="h-4 w-4 text-[#ffa502]" />
                <span>support@metriverify.gov.in</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="h-4 w-4 text-[#ffa502]" />
                <span>+91 (011) 2345-6789 (Toll-Free Helpline)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="h-4 w-4 text-[#ffa502]" />
                <span>Department of Legal Metrology, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition">Instrument Registration</a>
              </li>
              <li>
                <a href="#process" className="hover:text-amber-400 transition">Verification Workflow</a>
              </li>
              <li>
                <Link href="/verify" className="hover:text-amber-400 transition">Public QR Certificate Verification</Link>
              </li>
              <li>
                <a href="#roles" className="hover:text-amber-400 transition">Stakeholder Portals</a>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition">Field Inspector Tools</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#problem" className="hover:text-amber-400 transition">Platform Overview</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition">GATC Lab Testing Rules</a>
              </li>
              <li>
                <a href="#process" className="hover:text-amber-400 transition">Permissible Error (MPE) Limits</a>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition">Officer Login Portal</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-amber-400 transition">Applicant Business Registration</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Governance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-amber-400 transition">Legal Metrology Rules 2011</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">Security & Audit Compliance</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} MetriVerify Platform. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Digital Metrology SaaS Prototype</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
