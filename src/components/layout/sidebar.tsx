'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { useAuthStore } from '@/store/auth-store';
import { navigationConfig } from '@/config/navigation';
import { UserRole } from '@/types/user';

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();

  const navItems = navigationConfig[role] || [];

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-[#0A0A0A] ${
        sidebarOpen ? 'w-56' : 'w-16'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-12 items-center justify-between border-b border-slate-100 px-3 dark:border-slate-800/50">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-600 text-white">
            <Scale className="h-4 w-4" />
          </div>
          {sidebarOpen && (
            <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
              MetriVerify
            </span>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="mt-4 flex-1 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800/50 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/30 dark:hover:text-slate-200'
              }`}
              title={!sidebarOpen ? item.title : undefined}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                }`}
              />
              {sidebarOpen && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Logout */}
      <div className="border-t border-slate-100 p-2 dark:border-slate-800/50">
        <button
          onClick={logout}
          className="group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          title={!sidebarOpen ? 'Logout' : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-rose-500 dark:text-slate-500 dark:group-hover:text-rose-400" />
          {sidebarOpen && <span className="truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}


