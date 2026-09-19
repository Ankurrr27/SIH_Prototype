'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Search, ShieldCheck, CheckCircle2, XCircle, Calendar, Award, Building, Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function VerifyContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const certParam = searchParams.get('cert') || searchParams.get('qr');
    if (certParam) {
      setQuery(certParam);
      performSearch(certParam);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // First try cert lookup endpoint
      let res = await api.get<any>(`/public/certificates/${encodeURIComponent(searchQuery.trim())}`);
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        // Fallback to QR hash lookup
        res = await api.get<any>(`/public/verify/${encodeURIComponent(searchQuery.trim())}`);
        if (res.success && res.data) {
          setResult(res.data);
        } else {
          setError('Certificate or QR record not found in official registry.');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Certificate verification failed or invalid code.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Digital Certificate Verification
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Official Legal Metrology Registry Public Lookup Tool
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleFormSubmit} className="relative shadow-md rounded-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Certificate Number (e.g. CERT-2026-...) or QR Code Hash"
          className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-5 pr-32 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 flex h-11 items-center space-x-2 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Search className="h-4 w-4" />
          <span>{loading ? 'Verifying...' : 'Verify'}</span>
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-3 py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Querying National Metrology Ledger...
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
          <XCircle className="mx-auto h-12 w-12 text-rose-500 mb-2" />
          <h3 className="text-lg font-bold">Verification Failed</h3>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {/* Certificate Verification Card Result */}
      {result && !loading && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-white">
          <div
            className={`p-6 text-white ${
              result.status === 'ACTIVE' || result.status === 'ISSUED'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                : 'bg-gradient-to-r from-amber-600 to-rose-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-8 w-8" />
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold opacity-80">
                    Official Status
                  </span>
                  <h2 className="text-xl font-bold">{result.status || 'VERIFIED VALID'}</h2>
                </div>
              </div>
              <Award className="h-10 w-10 opacity-60" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Certificate Number
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {result.certificateNumber || result.certNumber || query}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Instrument Type
                </span>
                <p className="text-base font-medium text-slate-900 dark:text-slate-100">
                  {result.instrumentType || result.instrument?.type || 'Standard Measuring Instrument'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-slate-400">Issued To</span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {result.organizationName || result.applicantName || 'Registered Applicant'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-slate-400">Valid Period</span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {result.validFrom ? new Date(result.validFrom).toLocaleDateString() : 'N/A'} â€”{' '}
                    {result.validUntil ? new Date(result.validUntil).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 dark:bg-slate-800/50">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <Scale className="h-4 w-4" />
                <span>Issuing Authority</span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {result.issuedBy || 'Department of Legal Metrology, Government Approved Test Centre'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicVerifyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 dark:bg-white sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center space-y-3 py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading search page...</p>
          </div>
        }
      >
        <VerifyContent />
      </Suspense>
    </div>
  );
}

