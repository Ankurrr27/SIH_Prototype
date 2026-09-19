import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/providers/app-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MetriVerify — Legal Metrology Digital Verification & Certification System',
  description: 'Online verification, GATC testing, and digital QR certificate issuance portal for Legal Metrology in India.',
  keywords: ['Legal Metrology', 'Verification', 'Stamping Certificate', 'Weights and Measures', 'GATC', 'LMO', 'Digital Certification'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
