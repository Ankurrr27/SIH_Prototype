'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { StatsCard } from '@/components/common/stats-card';
import { StatusBadge } from '@/components/common/status-badge';
import { TableSkeleton } from '@/components/common/loading-skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { Calendar, CheckCircle2, ClipboardCheck, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function LMODashboard() {
  // Query schedules / assigned tasks
  const { data: schedRes, isLoading: schedLoading } = useQuery({
    queryKey: ['lmo', 'schedules'],
    queryFn: async () => {
      return api.get<any[]>('/scheduling/schedules');
    },
  });

  const { data: inspRes, isLoading: inspLoading } = useQuery({
    queryKey: ['lmo', 'inspections'],
    queryFn: async () => {
      return api.get<any[]>('/verification/inspections');
    },
  });

  const schedules = schedRes?.data || [];
  const inspections = inspRes?.data || [];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Inspector Field Portal (LMO)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Conduct verification tests, inspect physical seals, and issue digital stamping certificates
          </p>
        </div>
        <div className="inline-flex items-center space-x-2 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
          <ShieldCheck className="h-4 w-4" />
          <span>Jurisdiction: Delhi North District</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Assigned Schedules"
          value={schedules.length}
          icon={Calendar}
          description="Total active inspection assignments"
        />
        <StatsCard
          title="Pending Inspections"
          value={schedules.filter((s: any) => s.status === 'SCHEDULED').length}
          icon={ClipboardCheck}
          description="Awaiting field verification"
          trend="Action required"
        />
        <StatsCard
          title="Completed Verification"
          value={inspections.filter((i: any) => i.status === 'COMPLETED' || i.result === 'PASSED').length}
          icon={CheckCircle2}
          description="Tests passed & certificates issued"
        />
        <StatsCard
          title="Non-Compliant / Rejected"
          value={inspections.filter((i: any) => i.result === 'FAILED').length}
          icon={AlertTriangle}
          description="Exceeds Maximum Permissible Error (MPE)"
        />
      </div>

      {/* Inspection Schedule Queue */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-white">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Assigned Inspection Schedule</h3>
            <p className="text-xs text-slate-500">Field inspection queue and verification locations</p>
          </div>
        </div>

        {schedLoading ? (
          <div className="pt-4">
            <TableSkeleton rows={4} />
          </div>
        ) : schedules.length === 0 ? (
          <div className="pt-6">
            <EmptyState
              title="No Inspection Assignments"
              description="You have no pending verification tasks scheduled for today."
            />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-white text-xs uppercase font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Schedule ID</th>
                  <th className="px-4 py-3">Scheduled Date</th>
                  <th className="px-4 py-3">Location / Address</th>
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
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        {item.location || 'Applicant On-Site Premises'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => alert(`Conducting inspection for schedule ${item.id}`)}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition"
                      >
                        Start Test & Stamp
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

