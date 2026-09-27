'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Menu, X, ArrowRight } from 'lucide-react';

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#problem' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Stakeholders', href: '#roles' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1D4ED8] shadow-sm transition group-hover:scale-105">
            <Scale className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#1D4ED8]">
            Metri<span className="text-[#2563EB]">Verify</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/login"
            className="rounded-lg border border-slate-200 px-3.5 py-1.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center space-x-1 rounded-lg bg-[#1D4ED8] px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-[#2563EB] transition group"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 shadow-sm space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-lg bg-[#1D4ED8] py-2 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}



