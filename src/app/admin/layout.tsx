'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { PortalShell } from '@/components/layout/portal-shell';
import { UserRole } from '@/types/user';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <PortalShell role={UserRole.ADMIN} title="System Admin Portal">
        {children}
      </PortalShell>
    </RoleGuard>
  );
}

