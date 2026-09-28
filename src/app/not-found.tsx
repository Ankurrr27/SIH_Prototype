'use client';

import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-[#050505]">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 shadow-sm border border-amber-200 dark:border-amber-500/20">
          <SearchX className="h-8 w-8" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">404 Error</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">
          The verification document or portal page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-5 py-3 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-900/10 dark:focus:ring-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}

