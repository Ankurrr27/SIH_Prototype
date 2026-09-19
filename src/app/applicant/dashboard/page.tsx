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
      return api.get<any>('/dashboard/summary');
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
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Applicant Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your instrument verification applications and digital certificates
          </p>
        </div>
        <button
          onClick={() => alert('New Application Modal/Flow: Select instrument type and upload specification document.')}
          className="inline-flex items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-500 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Apply for Verification</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Applications"
          value={summary.totalApplications || applications.length}
          icon={FileText}
          description="Submitted verification requests"
          trend="+2 this month"
          trendType="up"
        />
        <StatsCard
          title="Pending Review / Inspection"
          value={summary.pending || applications.filter((a: any) => a.status !== 'CERTIFICATE_ISSUED').length}
          icon={Clock}
          description="In review or testing queue"
        />
        <StatsCard
          title="Active Digital Certificates"
          value={summary.certified || applications.filter((a: any) => a.status === 'CERTIFICATE_ISSUED').length}
          icon={Award}
          description="Verified valid certificates"
        />
        <StatsCard
          title="Expiring Soon (< 30 days)"
          value={summary.expiringSoon || 0}
          icon={ShieldAlert}
          description="Requires re-stamping renewal"
        />
      </div>

      {/* Recent Applications Table */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-white">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Verification Applications</h3>
            <p className="text-xs text-slate-500">Track application status, assigned inspector, and certificates</p>
          </div>
        </div>

        {appsLoading ? (
          <div className="pt-4">
            <TableSkeleton rows={4} />
          </div>
        ) : applications.length === 0 ? (
          <div className="pt-6">
            <EmptyState
              title="No Applications Found"
              description="You have not submitted any instrument verification requests yet."
              actionLabel="Submit First Application"
              onAction={() => alert('New Application Flow triggered!')}
            />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-white text-xs uppercase font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Application ID</th>
                  <th className="px-4 py-3">Instrument Category</th>
                  <th className="px-4 py-3">Submission Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {applications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-white dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3.5 font-medium text-slate-900 dark:text-slate-100">
                      {app.applicationNumber || app.id.substring(0, 8)}
                    </td>
                    <td className="px-4 py-3.5">{app.instrument?.modelName || app.instrumentType || 'Commercial Scale'}</td>
                    <td className="px-4 py-3.5">{formatDate(app.createdAt || new Date())}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => alert(`View details for application ${app.id}`)}
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        <span>Details</span>
                        <ExternalLink className="h-3.5 w-3.5" />
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

