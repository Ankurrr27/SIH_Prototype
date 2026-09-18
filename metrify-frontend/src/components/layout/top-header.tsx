'use client';

import React from 'react';
import { Bell, User as UserIcon, Moon, Sun, Search } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useNotificationStore } from '@/store/notification-store';
import { useTheme } from 'next-themes';

interface TopHeaderProps {
  title?: string;
}

export function TopHeader({ title = 'Dashboard' }: TopHeaderProps) {
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/90 px-6 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
      {/* Title / Search */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Toggle Dark/Light Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Info Avatar */}
        <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 p-1.5 px-3 dark:border-gray-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F2A5F] text-xs font-bold text-white">
            {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-gray-900 dark:text-white">{user?.fullName || 'User Account'}</p>
            <p className="text-[10px] text-gray-500 capitalize">{user?.roles[0]?.toLowerCase() || 'Applicant'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
