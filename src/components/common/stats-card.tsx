import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down';
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/50 dark:bg-[#0A0A0A]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      </div>
      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        {description && <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500">{description}</p>}
      </div>
    </div>
  );
}

