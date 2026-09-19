'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ApplicationStatus } from '@/types/application';
import { CertificateStatus } from '@/types/certificate';

type StatusType = ApplicationStatus | CertificateStatus | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
  // Application statuses
  DRAFT: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', label: 'Draft' },
  SUBMITTED: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Submitted' },
  UNDER_REVIEW: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Under Review' },
  DOCUMENT_VERIFICATION: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', label: 'Doc Verification' },
  INSPECTION_SCHEDULED: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'Scheduled' },
  INSPECTION_IN_PROGRESS: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', label: 'Inspecting' },
  APPROVED: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Approved' },
  REJECTED: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Rejected' },
  CERTIFICATE_ISSUED: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', label: 'Certified' },
  EXPIRED: { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-300', label: 'Expired' },

  // Inspection / Test statuses
  SCHEDULED: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Scheduled' },
  COMPLETED: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Completed' },
  CANCELLED: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Cancelled' },
  PASSED: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Passed' },
  FAILED: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Failed' },

  // Certificate statuses
  ACTIVE: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Active' },
  REVOKED: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Revoked' },
  SUSPENDED: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Suspended' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedKey = (status || '').toUpperCase().replace(/\s+/g, '_');
  const style = statusStyles[normalizedKey] || {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    label: status || 'Unknown',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        style.bg,
        style.text,
        style.border,
        className
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {style.label}
    </span>
  );
}

