'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'APPLICANT',
    organizationName: '',
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      await register(formData);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Register as a manufacturer, dealer, or instrument owner.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Full name
          </label>
          <input
            id="reg-name"
            type="text"
            value={formData.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Rajesh Kumar"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-600/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-600/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="reg-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Phone number <span className="text-slate-400 dark:text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            id="reg-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-600/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="reg-org" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Organization <span className="text-slate-400 dark:text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            id="reg-org"
            type="text"
            value={formData.organizationName}
            onChange={(e) => update('organizationName', e.target.value)}
            placeholder="Apex Instruments Pvt Ltd"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-600/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="Min. 6 characters"
              required
              minLength={6}
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
          className="w-full rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-900/10 dark:focus:ring-white/20 disabled:opacity-50 transition-all mt-2"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
          Log in
        </Link>
      </p>
    </div>
  );
}
