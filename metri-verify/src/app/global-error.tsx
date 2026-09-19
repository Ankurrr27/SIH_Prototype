'use client';

import { useEffect } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-900">
        <main className="w-full max-w-md text-center">
          <AlertOctagon className="mx-auto h-10 w-10 text-amber-400" />
          <h1 className="mt-5 text-2xl font-bold">MetriVerify is temporarily unavailable</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Reload the application to try again.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-200"
          >
            <RotateCcw className="h-4 w-4" />
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}

