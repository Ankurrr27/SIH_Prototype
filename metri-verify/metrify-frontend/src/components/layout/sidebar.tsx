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
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-slate-200 bg-white text-slate-800 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-[#ffa502]">
            <Scale className="h-5 w-5 text-[#ffa502]" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              Metri<span className="text-[#ffa502]">Verify</span>
            </span>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-[#ffa502] hover:text-white transition-colors dark:bg-slate-800 dark:text-slate-400"
          title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Badge */}
      {sidebarOpen && (
        <div className="mx-4 mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-center text-xs font-bold text-[#ffa502] uppercase tracking-wider">
          {role} PORTAL
        </div>
      )}

      {/* Nav Menu */}
      <nav className="mt-4 flex-1 space-y-1.5 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#ffa502] text-white shadow-md shadow-amber-500/25'
                  : 'text-slate-700 hover:bg-[#ffa502] hover:text-white dark:text-slate-200'
              }`}
              title={!sidebarOpen ? item.title : undefined}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-white dark:text-slate-400'
                }`}
              />
              {sidebarOpen && <span className="truncate tracking-wide">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Logout */}
      <div className="border-t border-slate-100 p-3 dark:border-slate-800">
        <button
          onClick={logout}
          className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-rose-600 hover:bg-[#ffa502] hover:text-white transition-all duration-200 dark:text-rose-400"
          title={!sidebarOpen ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0 text-rose-500 group-hover:text-white transition-colors" />
          {sidebarOpen && <span className="truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
