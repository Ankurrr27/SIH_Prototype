'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { PortalShell } from '@/components/layout/portal-shell';
import { UserRole } from '@/types/user';

export default function ApplicantLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[UserRole.APPLICANT, UserRole.ADMIN]}>
      <PortalShell role={UserRole.APPLICANT} title="Applicant Portal">
        {children}
      </PortalShell>
    </RoleGuard>
  );
}
