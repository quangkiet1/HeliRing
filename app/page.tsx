'use client';

import React, { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import ProblemContext from '@/components/features/ProblemContext';
import BioPulseTracker from '@/components/animation/BioPulseTracker';
import StoryProgress from '@/components/animation/StoryProgress';

const Chatbot = lazy(() => import('@/components/layout/Chatbot'));
const VitalsSimulator = lazy(() => import('@/components/features/VitalsSimulator'));
const TechShowcase = lazy(() => import('@/components/features/TechShowcase'));
const Portability = lazy(() => import('@/components/features/Portability'));
const Specs = lazy(() => import('@/components/specs/SpecsKinetic'));
const UseCases = lazy(() => import('@/components/features/UseCasesModal'));
const CTA = lazy(() => import('@/components/cta/CTA'));

function SectionFallback() {
  return (
    <div className="mx-auto flex min-h-[28rem] max-w-7xl items-center justify-center px-6 py-24 md:px-12">
      <div className="h-32 w-full max-w-4xl animate-pulse rounded-[2rem] border border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/60" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Signature Hardware-Accelerated BioPulse Tracker & Vitals HUD */}
      <BioPulseTracker />

      {/* Global Fixed Navigation Header */}
      <Header />

      {/* Floating AI Chatbot Assistant */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

      {/* Scrollytelling progress rail */}
      <StoryProgress />

      {/* Structured Long-form Storytelling Flow */}
      <main>
        
        {/* Section 1: Hero - Powerful introduction */}
        <section id="hero" className="story-panel relative">
          <Hero />
        </section>

        {/* Section 2: Problem Context - The invisible threat (PM2.5, dust) */}
        <section id="problem-context" className="story-panel relative">
          <ProblemContext />
        </section>

        {/* Section 2.5: Interactive Vitals Simulation & Live ECG HUD */}
        <Suspense fallback={<SectionFallback />}>
          <VitalsSimulator />
        </Suspense>

        {/* Section 3: Deep Dive Features & Clinical filtration tech */}
        <section id="technology" className="story-panel relative">
          <Suspense fallback={<SectionFallback />}>
            <TechShowcase />
          </Suspense>
        </section>

        {/* Section 4: Portability Showcase - fits in car cup holders & backpacks */}
        <section id="portability-showcase" className="story-panel relative">
          <Suspense fallback={<SectionFallback />}>
            <Portability />
          </Suspense>
        </section>

        {/* Section 5: Bento Box Specs Section - Technical indicators */}
        <section id="specifications" className="story-panel relative">
          <Suspense fallback={<SectionFallback />}>
            <Specs />
          </Suspense>
        </section>

        {/* Section 6: Use Cases - Car, Office, Bedroom scenarios */}
        <section id="lifestyle-use-cases" className="story-panel relative">
          <Suspense fallback={<SectionFallback />}>
            <UseCases />
          </Suspense>
        </section>

        {/* Section 7: Final Conversion Point - Gmail discount email submission */}
        <section id="newsletter-conversion" className="story-panel relative">
          <Suspense fallback={<SectionFallback />}>
            <CTA />
          </Suspense>
        </section>

      </main>

      {/* Corporate Info Footer */}
      <Footer />

    </div>
  );
}
