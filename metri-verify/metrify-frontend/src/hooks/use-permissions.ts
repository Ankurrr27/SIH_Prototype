'use client';

import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/types/user';

export function usePermissions() {
  const { user } = useAuthStore();

  const hasRole = (...allowedRoles: UserRole[]): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.some((r) => allowedRoles.includes(r as UserRole));
  };

  const isAdmin = (): boolean => hasRole(UserRole.ADMIN);
  const isLMO = (): boolean => hasRole(UserRole.LMO);
  const isGATC = (): boolean => hasRole(UserRole.GATC);
  const isApplicant = (): boolean => hasRole(UserRole.APPLICANT);

  return {
    user,
    hasRole,
    isAdmin,
    isLMO,
    isGATC,
    isApplicant,
  };
}
