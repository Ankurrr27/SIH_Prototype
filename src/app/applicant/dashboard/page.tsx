'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { StatsCard } from '@/components/common/stats-card';
import { StatusBadge } from '@/components/common/status-badge';
import { TableSkeleton } from '@/components/common/loading-skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { FileText, Clock, Award, ShieldAlert, Plus, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function ApplicantDashboard() {
  // Query summary stats from backend
  const { data: summaryRes, isLoading: summaryLoading } = useQuery({
    queryKey: ['applicant', 'dashboard', 'summary'],
    queryFn: async () => {
      return api.get<any>('/dashboard/applicant');
    },
  });

  // Query recent applications
  const { data: appsRes, isLoading: appsLoading } = useQuery({
    queryKey: ['applicant', 'applications'],
    queryFn: async () => {
      return api.get<any[]>('/applications');
    },
  });

  const summary = summaryRes?.data || {
    totalApplications: 0,
    pending: 0,
    certified: 0,
    expiringSoon: 0,
  };

  const applications = appsRes?.data || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Applicant Overview
          </h2>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Manage your verification applications and digital certificates.
          </p>
        </div>
        <button
          onClick={() => alert('New Application Modal')}
          className="inline-flex items-center justify-center space-x-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Apply for Verification</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Applications"
          value={summary.totalApplications || applications.length}
          icon={FileText}
        />
        <StatsCard
          title="Pending Review"
          value={summary.pending || applications.filter((a: any) => a.status !== 'CERTIFICATE_ISSUED').length}
          icon={Clock}
        />
        <StatsCard
          title="Active Certificates"
          value={summary.certified || applications.filter((a: any) => a.status === 'CERTIFICATE_ISSUED').length}
          icon={Award}
        />
        <StatsCard
          title="Expiring (< 30 days)"
          value={summary.expiringSoon || 0}
          icon={ShieldAlert}
        />
      </div>

      {/* Recent Applications Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800/60 dark:bg-[#0A0A0A]">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/60">
          <h3 className="text-[14px] font-medium text-slate-900 dark:text-white">Recent Applications</h3>
        </div>

        {appsLoading ? (
          <div className="p-4">
            <TableSkeleton rows={4} />
          </div>
        ) : applications.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No applications found"
              description="Submit your first instrument verification request."
              actionLabel="Apply now"
              onAction={() => alert('New Application Flow triggered!')}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 text-slate-500 font-medium dark:bg-slate-900/50 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                <tr>
                  <th className="px-4 py-2.5 font-medium">ID</th>
                  <th className="px-4 py-2.5 font-medium">Instrument</th>
                  <th className="px-4 py-2.5 font-medium">Date</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {applications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-2.5 text-slate-900 dark:text-slate-200">
                      {app.applicationNumber || app.id.substring(0, 8)}
                    </td>
                    <td className="px-4 py-2.5">{app.instrument?.modelName || app.instrumentType || 'Commercial Scale'}</td>
                    <td className="px-4 py-2.5">{formatDate(app.createdAt || new Date())}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => alert(`View details for application ${app.id}`)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Details
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

