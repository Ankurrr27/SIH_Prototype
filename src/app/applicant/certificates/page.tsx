'use client';

import React from 'react';
import { Search, Download, Award } from 'lucide-react';
import { StatusBadge } from '@/components/common/status-badge';

export default function CertificatesPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Digital Certificates
          </h2>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            View and download your valid verification certificates.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800/60 dark:bg-[#0A0A0A]">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/60">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by certificate number..."
              className="w-full rounded-md border border-slate-200 bg-transparent pl-9 pr-3 py-1.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 text-slate-500 font-medium dark:bg-slate-900/50 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
              <tr>
                <th className="px-4 py-2.5 font-medium">Certificate No.</th>
                <th className="px-4 py-2.5 font-medium">Instrument</th>
                <th className="px-4 py-2.5 font-medium">Issue Date</th>
                <th className="px-4 py-2.5 font-medium">Valid Until</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-500" />
                  CERT-8812-990
                </td>
                <td className="px-4 py-2.5">MassMeter X1</td>
                <td className="px-4 py-2.5">Sep 15, 2023</td>
                <td className="px-4 py-2.5">Sep 14, 2024</td>
                <td className="px-4 py-2.5">
                  <StatusBadge status="ACTIVE" />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400">
                    <Download className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
