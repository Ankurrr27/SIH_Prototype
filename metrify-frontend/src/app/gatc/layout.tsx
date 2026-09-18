'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { PortalShell } from '@/components/layout/portal-shell';
import { UserRole } from '@/types/user';

export default function GATCLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[UserRole.GATC, UserRole.ADMIN]}>
      <PortalShell role={UserRole.GATC} title="GATC Testing Portal">
        {children}
      </PortalShell>
    </RoleGuard>
  );
}
