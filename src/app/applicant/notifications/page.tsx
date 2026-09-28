'use client';

import React from 'react';
import { Bell, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Notifications
          </h2>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Updates on your applications, inspections, and certificates.
          </p>
        </div>
        <button className="text-[13px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Mark all as read
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800/60 dark:bg-[#0A0A0A] divide-y divide-slate-100 dark:divide-slate-800/60">
        
        {/* Unread Notification */}
        <div className="p-4 flex gap-4 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mt-1">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-[14px] font-medium text-slate-900 dark:text-slate-100">Certificate Issued</h4>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">
              Your certificate for Application APP-2023-7742 has been successfully issued.
            </p>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" /> 2 hours ago
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
        </div>

        {/* Read Notification */}
        <div className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mt-1">
            <Bell className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-[14px] font-medium text-slate-900 dark:text-slate-100">Inspection Scheduled</h4>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">
              An inspection has been scheduled for Oct 24, 2023 for APP-2023-8910.
            </p>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" /> 1 day ago
            </p>
          </div>
        </div>

        {/* Alert Notification */}
        <div className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 mt-1">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-[14px] font-medium text-slate-900 dark:text-slate-100">Action Required</h4>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">
              Additional documentation is required for your recent application.
            </p>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" /> 3 days ago
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
