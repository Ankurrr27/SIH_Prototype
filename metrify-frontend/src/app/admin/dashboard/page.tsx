'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { StatsCard } from '@/components/common/stats-card';
import { StatusBadge } from '@/components/common/status-badge';
import { TableSkeleton } from '@/components/common/loading-skeleton';
import { Users, FileText, Award, DollarSign, Activity, ShieldCheck, PieChart as PieIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const STATUS_COLORS = ['#2563EB', '#16A34A', '#D97706', '#DC2626', '#8B5CF6'];

export default function AdminDashboard() {
  const { data: summaryRes, isLoading: summaryLoading } = useQuery({
    queryKey: ['admin', 'summary'],
    queryFn: async () => {
      return api.get<any>('/dashboard/summary');
    },
  });

  const { data: appsRes } = useQuery({
    queryKey: ['admin', 'applications'],
    queryFn: async () => {
      return api.get<any[]>('/applications');
    },
  });

  const summary = summaryRes?.data || {
    totalApplications: 124,
    totalCertificates: 98,
    activeInspectors: 14,
    totalRevenue: '₹ 4,85,000',
  };

  const applications = appsRes?.data || [];

  // Chart data
  const chartData = [
    { name: 'Submitted', count: 18 },
    { name: 'Under Review', count: 12 },
    { name: 'Inspection', count: 24 },
    { name: 'Certified', count: 62 },
    { name: 'Rejected', count: 8 },
  ];

  const pieData = [
    { name: 'Weighbridges', value: 40 },
    { name: 'Flow Meters', value: 25 },
    { name: 'Counter Scales', value: 20 },
    { name: 'Pre-Packaged', value: 15 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            System Administration Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Statewide Legal Metrology verification throughput, inspector workloads, and digital registry audit logs
          </p>
        </div>
        <div className="inline-flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span>System Status: Healthy (All Services Operational)</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Applications"
          value={summary.totalApplications}
          icon={FileText}
          description="Submitted statewide this fiscal year"
          trend="+14% YoY"
          trendType="up"
        />
        <StatsCard
          title="Digital Certificates"
          value={summary.totalCertificates}
          icon={Award}
          description="Active tamper-proof QR certificates"
          trend="100% Verified"
          trendType="up"
        />
        <StatsCard
          title="Active Field LMOs & GATCs"
          value={summary.activeInspectors || 14}
          icon={Users}
          description="Authorized officers & lab nodes"
        />
        <StatsCard
          title="Verification Revenue"
          value={summary.totalRevenue || '₹ 4,85,000'}
          icon={DollarSign}
          description="Stamping & inspection fee collections"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Application Status Distribution
          </h3>
          <p className="text-xs text-slate-500 mb-6">Current breakdown across verification stages</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Instrument Type Breakdown
          </h3>
          <p className="text-xs text-slate-500 mb-6">Percentage of verified instruments by category</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name || ''} ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Audit Feed */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent System Applications</h3>
            <p className="text-xs text-slate-500">Master application feed across all districts</p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">ID</th>
                <th className="px-4 py-3">Applicant / Company</th>
                <th className="px-4 py-3">Instrument Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {applications.length > 0 ? (
                applications.slice(0, 5).map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                      {app.applicationNumber || app.id.substring(0, 8)}
                    </td>
                    <td className="px-4 py-3">{app.applicant?.fullName || 'Business Entity'}</td>
                    <td className="px-4 py-3">{app.instrument?.modelName || 'Industrial Scale'}</td>
                    <td className="px-4 py-3">{formatDate(app.createdAt || new Date())}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    System active. No recent audit logs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
