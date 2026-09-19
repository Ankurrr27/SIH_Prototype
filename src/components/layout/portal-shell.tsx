'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { TopHeader } from '@/components/layout/top-header';
import { useUIStore } from '@/store/ui-store';
import { UserRole } from '@/types/user';

interface PortalShellProps {
  role: UserRole;
  title?: string;
  children: React.ReactNode;
}

export function PortalShell({ role, title, children }: PortalShellProps) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Sidebar role={role} />
      <div className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'pl-60' : 'pl-16'}`}>
        <TopHeader title={title} />
        <main className="flex-1 p-4 lg:p-5">{children}</main>
      </div>
    </div>
  );
}


