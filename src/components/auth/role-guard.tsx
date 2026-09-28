'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/types/user';
import { useRouter } from 'next/navigation';
import { Scale } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for zustand persist hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (user && user.roles) {
      const hasPermission = user.roles.some((r) => allowedRoles.includes(r as UserRole));
      if (!hasPermission) {
        router.replace('/login');
      }
    }
  }, [isHydrated, isAuthenticated, user, allowedRoles, router]);

  // Show loading screen until hydrated and auth is confirmed
  if (!isHydrated || !isAuthenticated) {
    return (
      <main className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-6 animate-pulse">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white shadow-xl">
            <Scale className="h-8 w-8 text-white dark:text-slate-900" />
          </div>
          <div className="text-sm font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400">
            Verifying access...
          </div>
        </div>
      </main>
    );
  }

  // Check role permission after hydration
  if (user && user.roles) {
    const hasPermission = user.roles.some((r) => allowedRoles.includes(r as UserRole));
    if (!hasPermission) {
      return null; // Will redirect via useEffect
    }
  }

  return <>{children}</>;
}
