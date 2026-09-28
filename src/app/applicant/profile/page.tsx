'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth-store';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          My Profile
        </h2>
        <p className="text-[13px] text-slate-500 dark:text-slate-400">
          Manage your personal and organizational details.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800/60 dark:bg-[#0A0A0A]">
        <div className="p-6">
          <h3 className="text-[14px] font-medium text-slate-900 dark:text-white mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                defaultValue={user?.fullName || ''}
                className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:text-white"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                disabled
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-500 dark:border-slate-800 dark:bg-slate-900/50"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="tel"
                defaultValue="+91 9876543210"
                className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800/60 p-6">
          <h3 className="text-[14px] font-medium text-slate-900 dark:text-white mb-4">Organization Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Organization Name</label>
              <input
                type="text"
                defaultValue="Apex Instruments Pvt Ltd"
                className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:text-white"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Registration Number (CIN)</label>
              <input
                type="text"
                defaultValue="U74999DL2023PTC123456"
                className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800/60 p-4 flex justify-end">
          <button className="rounded-md bg-blue-600 px-4 py-1.5 text-[13px] font-medium text-white hover:bg-blue-700 transition shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
