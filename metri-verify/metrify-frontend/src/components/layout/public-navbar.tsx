'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Search, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

export function PublicNavbar() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      {/* Government / Platform Announcement Bar */}
      <div className="bg-[#0F2A5F] px-4 py-1.5 text-center text-xs font-medium text-white">
        Official Prototype • Online Verification & Digital Certification Platform (Legal Metrology Rules)
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F2A5F] text-white shadow-md transition-transform group-hover:scale-105">
            <Scale className="h-6 w-6 text-[#2563EB]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#0F2A5F] dark:text-white">
              Metri<span className="text-[#2563EB]">Verify</span>
            </span>
            <p className="text-[10px] font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Legal Metrology Portal
            </p>
          </div>
        </Link>

        {/* Public Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link href="/" className="transition-colors hover:text-[#2563EB]">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-[#2563EB]">
            About Us
          </Link>
          <Link href="/services" className="transition-colors hover:text-[#2563EB]">
            Services
          </Link>
          <Link href="/verification-process" className="transition-colors hover:text-[#2563EB]">
            Verification Process
          </Link>
          <Link href="/verify" className="flex items-center gap-1.5 font-semibold text-[#2563EB] transition-colors hover:underline">
            <Search className="h-4 w-4" />
            Verify Certificate
          </Link>
          <Link href="/contact" className="transition-colors hover:text-[#2563EB]">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <Link
              href={`/${user.roles[0]?.toLowerCase()}/dashboard`}
              className="inline-flex items-center justify-center rounded-lg bg-[#0F2A5F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#173B80] shadow"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-1.5 text-sm font-medium text-white hover:bg-blue-700 shadow"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
