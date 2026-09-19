'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { StatsCard } from '@/components/common/stats-card';
import { StatusBadge } from '@/components/common/status-badge';
import { TableSkeleton } from '@/components/common/loading-skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { Building2, TestTube, Award, CheckCircle, FileCheck2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function GATCDashboard() {
  const { data: schedRes, isLoading: schedLoading } = useQuery({
    queryKey: ['gatc', 'schedules'],
    queryFn: async () => {
      return api.get<any[]>('/scheduling/schedules');
    },
  });

  const schedules = schedRes?.data || [];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            GATC Laboratory Testing Portal
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Government Approved Testing Centre calibration logs and verification certificate dispatch
          </p>
        </div>
        <div className="inline-flex items-center space-x-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
          <Building2 className="h-4 w-4" />
          <span>Lab License: GATC-NORTH-001</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Assigned Lab Tests"
          value={schedules.length}
          icon={TestTube}
          description="Instruments received for testing"
        />
        <StatsCard
          title="In-Testing Queue"
          value={schedules.filter((s: any) => s.status === 'SCHEDULED' || s.status === 'IN_PROGRESS').length}
          icon={FileCheck2}
          description="Standard weight calibration"
        />
        <StatsCard
          title="Certificates Issued"
          value={schedules.filter((s: any) => s.status === 'COMPLETED').length}
          icon={Award}
          description="GATC verified test reports"
        />
        <StatsCard
          title="Quality Pass Rate"
          value="98.4%"
          icon={CheckCircle}
          description="Compliant with Legal Metrology MPE"
          trend="ISO/IEC 17025"
          trendType="up"
        />
      </div>

      {/* Testing Queue */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-white">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">GATC Laboratory Test Queue</h3>
            <p className="text-xs text-slate-500 font-normal">Record accuracy test parameters and repeatability error limits</p>
          </div>
        </div>

        {schedLoading ? (
          <div className="pt-4">
            <TableSkeleton rows={4} />
          </div>
        ) : schedules.length === 0 ? (
          <div className="pt-6">
            <EmptyState
              title="No Pending Laboratory Tests"
              description="All assigned GATC instrument calibration testing has been completed."
            />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-white text-xs uppercase font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Test ID</th>
                  <th className="px-4 py-3">Scheduled Date</th>
                  <th className="px-4 py-3">Instrument Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {schedules.map((item: any) => (
                  <tr key={item.id} className="hover:bg-white dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3.5 font-medium text-slate-900 dark:text-slate-100">
                      {item.id.substring(0, 8)}
                    </td>
                    <td className="px-4 py-3.5">{formatDate(item.scheduledDate || new Date())}</td>
                    <td className="px-4 py-3.5">Standard Class E2 / F1 Weight</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => alert(`Enter GATC test results for ${item.id}`)}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                      >
                        Record Test Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

