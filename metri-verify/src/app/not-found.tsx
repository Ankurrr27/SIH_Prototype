'use client';

import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-white">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <SearchX className="h-7 w-7" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          This address does not match a page in the MetriVerify portal.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Return home
        </Link>
      </div>
    </main>
  );
}

