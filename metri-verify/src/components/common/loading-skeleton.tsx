'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-800/80',
            className || 'h-6 w-full'
          )}
        />
      ))}
    </>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-white">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <LoadingSkeleton className="h-6 w-48" />
        <LoadingSkeleton className="h-8 w-24 rounded-lg" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-2">
          <LoadingSkeleton className="h-4 w-1/4" />
          <LoadingSkeleton className="h-4 w-1/4" />
          <LoadingSkeleton className="h-4 w-1/6" />
          <LoadingSkeleton className="h-4 w-1/6" />
          <LoadingSkeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

