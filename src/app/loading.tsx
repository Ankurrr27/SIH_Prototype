import { Scale } from 'lucide-react';

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-white dark:bg-[#050505]">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white shadow-xl">
          <Scale className="h-8 w-8 text-white dark:text-slate-900" />
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400">
          Loading MetriVerify
        </div>
      </div>
    </main>
  );
}

