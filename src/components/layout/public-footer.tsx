import React from 'react';
import Link from 'next/link';
import { Scale, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 bg-[#1D4ED8] text-white dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                <Scale className="h-5 w-5 text-[#2563EB]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Metri<span className="text-[#2563EB]">Verify</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Online Verification & Digital Certification Platform for Weighing and Measuring Instruments under Legal Metrology Regulations in India.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>Tamper-Evident QR Verification</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About MetriVerify
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Verification Services
                </Link>
              </li>
              <li>
                <Link href="/verification-process" className="hover:text-white transition-colors">
                  Process Workflow
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white transition-colors">
                  Verify QR Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* User Portals */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300">User Portals</h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Applicant Business Login
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Legal Metrology Officer (LMO)
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  GATC Test Centre Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Department Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300">Help & Support</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Department of Legal Metrology, Vikas Bhawan, New Delhi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Toll-Free Helpline: 1800-11-2026</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>support@metriverify.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          <p>Â© {new Date().getFullYear()} MetriVerify. Fictional Legal Metrology Prototype. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


