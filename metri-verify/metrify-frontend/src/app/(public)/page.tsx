'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/landing/announcement-bar';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { StatsSection } from '@/components/landing/stats-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { ServicesSection } from '@/components/landing/services-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { RolesSection } from '@/components/landing/roles-section';
import { VerificationCtaSection } from '@/components/landing/verification-cta-section';
import { SecuritySection } from '@/components/landing/security-section';
import { FinalCtaSection } from '@/components/landing/final-cta-section';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 scroll-smooth">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

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

        {/* 5. Core Services Section */}
        <ServicesSection />

        {/* 6. Step-by-step How It Works Timeline */}
        <HowItWorksSection />

        {/* 7. Stakeholder Roles Section */}
        <RolesSection />

        {/* 8. Certificate Verification Search Bar CTA */}
        <VerificationCtaSection />

        {/* 9. Security & Transparency Section */}
        <SecuritySection />

        {/* 10. Final Call to Action Section */}
        <FinalCtaSection />
      </main>

      {/* Main Landing Footer */}
      <LandingFooter />
    </div>
  );
}
