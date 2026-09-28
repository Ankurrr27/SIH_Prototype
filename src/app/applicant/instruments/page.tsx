'use client';

import React from 'react';
import { Plus, Search, Scale } from 'lucide-react';

export default function MyInstrumentsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            My Instruments
          </h2>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Manage your registered measuring instruments and commercial scales.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center space-x-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Instrument</span>
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800/60 dark:bg-[#0A0A0A]">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search instruments..."
              className="w-full rounded-md border border-slate-200 bg-transparent pl-9 pr-3 py-1.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 text-slate-500 font-medium dark:bg-slate-900/50 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
              <tr>
                <th className="px-4 py-2.5 font-medium">Model / Type</th>
                <th className="px-4 py-2.5 font-medium">Serial Number</th>
                <th className="px-4 py-2.5 font-medium">Class</th>
                <th className="px-4 py-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-2.5 flex items-center gap-3 text-slate-900 dark:text-slate-200">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 dark:bg-slate-800">
                    <Scale className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">DigiWeigh Pro</p>
                    <p className="text-[11px] text-slate-500">Electronic Scale</p>
                  </div>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">SN-82910384</td>
                <td className="px-4 py-2.5">Class III</td>
                <td className="px-4 py-2.5 text-right">
                  <button className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400">Edit</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-2.5 flex items-center gap-3 text-slate-900 dark:text-slate-200">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 dark:bg-slate-800">
                    <Scale className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">MassMeter X1</p>
                    <p className="text-[11px] text-slate-500">Weighbridge</p>
                  </div>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">WB-991283</td>
                <td className="px-4 py-2.5">Class II</td>
                <td className="px-4 py-2.5 text-right">
                  <button className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
