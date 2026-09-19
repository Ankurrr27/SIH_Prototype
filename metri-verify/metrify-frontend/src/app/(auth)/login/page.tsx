'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-400">Sign in to your MetriVerify portal account</p>
      </div>

      {/* Quick Demo Login Cards */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-950/30 p-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2.5">
          <Sparkles className="h-4 w-4" />
          <span>One-Click Demo Logins (Password: Password@123)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleDemoLogin('admin@legalmetrology.gov.in')}
            disabled={isLoading}
            className="flex flex-col rounded-lg bg-slate-900 p-2.5 border border-slate-800 text-left hover:border-blue-500 transition hover:bg-slate-800"
          >
            <span className="font-bold text-slate-200">Admin</span>
            <span className="text-[10px] text-slate-400 truncate">admin@legalmetrology.gov.in</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('lmo.delhi@legalmetrology.gov.in')}
            disabled={isLoading}
            className="flex flex-col rounded-lg bg-slate-900 p-2.5 border border-slate-800 text-left hover:border-blue-500 transition hover:bg-slate-800"
          >
            <span className="font-bold text-slate-200">LMO Inspector</span>
            <span className="text-[10px] text-slate-400 truncate">lmo.delhi@legalmetrology.gov.in</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('gatc.north@testing.org.in')}
            disabled={isLoading}
            className="flex flex-col rounded-lg bg-slate-900 p-2.5 border border-slate-800 text-left hover:border-blue-500 transition hover:bg-slate-800"
          >
            <span className="font-bold text-slate-200">GATC Lab</span>
            <span className="text-[10px] text-slate-400 truncate">gatc.north@testing.org.in</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('applicant.business@example.com')}
            disabled={isLoading}
            className="flex flex-col rounded-lg bg-slate-900 p-2.5 border border-slate-800 text-left hover:border-blue-500 transition hover:bg-slate-800"
          >
            <span className="font-bold text-slate-200">Applicant Business</span>
            <span className="text-[10px] text-slate-400 truncate">applicant.business@...</span>
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-slate-800" />
        <span className="absolute bg-slate-950 px-3 text-xs text-slate-500 uppercase tracking-wider">
          Or standard login
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Portal</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
          Register new applicant account
        </Link>
      </p>
    </div>
  );
}
