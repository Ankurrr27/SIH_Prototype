'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    try {
      await login({ email, password });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password@123');
    try {
      await login({ email: demoEmail, password: 'Password@123' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Demo login failed');
    }
  };

  const demoAccounts = [
    { label: 'Admin', email: 'admin@legalmetrology.gov.in' },
    { label: 'LMO Inspector', email: 'lmo.delhi@legalmetrology.gov.in' },
    { label: 'GATC Lab', email: 'gatc.north@testing.org.in' },
    { label: 'Applicant', email: 'applicant.business@example.com' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Log in</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Welcome back. Enter your credentials to continue.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-600/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-600/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-900/10 dark:focus:ring-white/20 disabled:opacity-50 transition-all"
        >
          {isLoading ? 'Signing in...' : 'Log in'}
        </button>
      </form>

      {/* Demo Quick Access */}
      <div className="mt-8">
        <div className="relative flex items-center">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          <span className="px-3 text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-medium">Demo Accounts</span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {demoAccounts.map(({ label, email: demoEmail }) => (
            <button
              key={demoEmail}
              type="button"
              onClick={() => handleDemoLogin(demoEmail)}
              disabled={isLoading}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0A0A] px-3 py-2 text-left hover:border-blue-500 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-black transition-colors disabled:opacity-50"
            >
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-500 truncate">{demoEmail}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
          Sign up
        </Link>
      </p>
    </div>
  );
}
