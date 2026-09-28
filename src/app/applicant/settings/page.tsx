'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h2>
        <p className="text-[13px] text-slate-500 dark:text-slate-400">
          Manage your account preferences and notifications.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800/60 dark:bg-[#0A0A0A] divide-y divide-slate-100 dark:divide-slate-800/60">
        
        <div className="p-6 flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-slate-900 dark:text-white">Email Notifications</h3>
            <p className="text-[13px] text-slate-500 mt-1">Receive email alerts for application status changes.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="p-6 flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-slate-900 dark:text-white">SMS Alerts</h3>
            <p className="text-[13px] text-slate-500 mt-1">Receive text messages for critical alerts and OTPs.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="p-6 flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-rose-600 dark:text-rose-500">Delete Account</h3>
            <p className="text-[13px] text-slate-500 mt-1">Permanently remove your account and all associated data.</p>
          </div>
          <button className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-[13px] font-medium text-rose-600 hover:bg-rose-100 transition dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}
