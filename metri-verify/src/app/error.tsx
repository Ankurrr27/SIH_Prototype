'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-white">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">The page could not load</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          The issue was recorded. Try the request again or return to the portal.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}

