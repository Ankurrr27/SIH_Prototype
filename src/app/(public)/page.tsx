'use client';

import React from 'react';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { StatsSection } from '@/components/landing/stats-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { RolesSection } from '@/components/landing/roles-section';
import { SecuritySection } from '@/components/landing/security-section';
import { FinalCtaSection } from '@/components/landing/final-cta-section';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-[#050505] dark:text-slate-100 scroll-smooth">
      {/* Sticky Main Navigation */}
      <LandingNavbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Trust & Key Stats Bar */}
        <StatsSection />

        {/* 3. Problem Statement Section */}
        <ProblemSection />

        {/* 4. Connected Solution Workflow */}
        <SolutionSection />

        {/* 5. Stakeholder Roles Section */}
        <RolesSection />

        {/* 6. Security & Transparency Section */}
        <SecuritySection />

        {/* 7. Final Call to Action Section */}
        <FinalCtaSection />
      </main>

      {/* Main Landing Footer */}
      <LandingFooter />
    </div>
  );
}

