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
  trend,
  trendType = 'up',
  variant = 'primary',
}: StatsCardProps) {
  const variantStyles = {
    primary: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    error: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
          {title}
        </span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${variantStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                trendType === 'up'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
    </div>
  );
}
