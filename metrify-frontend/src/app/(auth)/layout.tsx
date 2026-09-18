import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 transition group-hover:scale-105">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-white tracking-tight">
                Metri<span className="text-blue-400">Verify</span>
              </span>
              <span className="block text-xs font-medium text-slate-400">
                Government Legal Metrology System
              </span>
            </div>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
          {children}
        </div>

        <p className="text-center text-xs text-slate-500">
          Official Legal Metrology Portal &copy; {new Date().getFullYear()} Ministry of Consumer Affairs, India.
        </p>
      </div>
    </div>
  );
}
