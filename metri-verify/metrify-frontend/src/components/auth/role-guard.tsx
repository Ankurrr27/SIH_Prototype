'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/types/user';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (typeof window !== 'undefined' && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (user && user.roles) {
    const hasPermission = user.roles.some((r) => allowedRoles.includes(r as UserRole));
    if (!hasPermission) {
      router.push('/forbidden');
      return null;
    }
  }

  return <>{children}</>;
}
