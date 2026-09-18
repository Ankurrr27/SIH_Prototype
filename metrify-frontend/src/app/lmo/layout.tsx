'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { PortalShell } from '@/components/layout/portal-shell';
import { UserRole } from '@/types/user';

export default function LMOLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[UserRole.LMO, UserRole.ADMIN]}>
      <PortalShell role={UserRole.LMO} title="Inspector (LMO) Portal">
        {children}
      </PortalShell>
    </RoleGuard>
  );
}
