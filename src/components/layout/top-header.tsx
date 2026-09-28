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
    <header className="sticky top-0 z-20 flex h-12 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800/50 dark:bg-[#0A0A0A]/95">
      {/* Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-[14px] w-[14px]" /> : <Moon className="h-[14px] w-[14px]" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 transition-colors">
            <Bell className="h-[14px] w-[14px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            )}
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* User Info Avatar */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer group">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-700 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
            {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
          </div>
          <div className="hidden md:block text-left leading-none">
            <p className="text-[13px] font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {user?.fullName || 'User'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}


