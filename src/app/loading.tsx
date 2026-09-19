export default function Loading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-white dark:bg-white">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
        Loading MetriVerify
      </div>
    </main>
  );
}

