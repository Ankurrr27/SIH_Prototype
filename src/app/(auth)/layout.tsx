import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-5">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition group-hover:scale-105">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-slate-950 tracking-tight dark:text-slate-950">
                Metri<span className="text-blue-600 dark:text-blue-400">Verify</span>
              </span>
              <span className="block text-xs font-medium text-slate-400">
                Government Legal Metrology System
              </span>
            </div>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
          {children}
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Official Legal Metrology Portal &copy; {new Date().getFullYear()} Ministry of Consumer Affairs, India.
        </p>
      </div>
    </div>
  );
}

