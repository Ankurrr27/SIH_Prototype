'use client';

import React from 'react';
import { FileX, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-[13px] font-medium text-white transition hover:bg-blue-700 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

