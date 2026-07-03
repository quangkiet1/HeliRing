'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';

const Chatbot = lazy(() => import('@/components/layout/Chatbot'));
const ProblemContext = lazy(() => import('@/components/features/ProblemContext'));
const BioPulseTracker = lazy(() => import('@/components/animation/BioPulseTracker'));
const StoryProgress = lazy(() => import('@/components/animation/StoryProgress'));
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

function useNearViewport<T extends HTMLElement>(rootMargin = '250px') {
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isNear) return;

    if (!('IntersectionObserver' in window)) {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return { ref, isNear };
}

function LazyStorySection({
  id,
  children,
  minHeight = 'min-h-[32rem]',
}: {
  id?: string;
  children: React.ReactNode;
  minHeight?: string;
}) {
  const { ref, isNear } = useNearViewport<HTMLElement>();

  return (
    <section id={id} ref={ref} className={`story-panel relative ${!isNear ? minHeight : ''}`}>
      {isNear ? <Suspense fallback={<SectionFallback />}>{children}</Suspense> : <SectionFallback />}
    </section>
  );
}

function LazyPlainSection({ children }: { children: React.ReactNode }) {
  const { ref, isNear } = useNearViewport<HTMLDivElement>();

  return (
    <div ref={ref} className={!isNear ? 'min-h-[32rem]' : undefined}>
      {isNear ? <Suspense fallback={<SectionFallback />}>{children}</Suspense> : <SectionFallback />}
    </div>
  );
}

function useIdleDesktopDecorations() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    if (!media.matches) return;

    const scheduler = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (scheduler.requestIdleCallback && scheduler.cancelIdleCallback) {
      const idleId = scheduler.requestIdleCallback(() => setEnabled(true), { timeout: 1800 });
      return () => scheduler.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => setEnabled(true), 900);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return enabled;
}

export default function Home() {
  const loadDecorations = useIdleDesktopDecorations();
  const [chatbotEnabled, setChatbotEnabled] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Signature Hardware-Accelerated BioPulse Tracker & Vitals HUD */}
      {loadDecorations && (
        <Suspense fallback={null}>
          <BioPulseTracker />
        </Suspense>
      )}

      {/* Global Fixed Navigation Header */}
      <Header />

      {/* Floating AI Chatbot Assistant */}
      {chatbotEnabled ? (
        <Suspense fallback={null}>
          <Chatbot initiallyOpen />
        </Suspense>
      ) : (
        <button
          type="button"
          onClick={() => setChatbotEnabled(true)}
          className="fixed bottom-4 right-4 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 hover:bg-emerald-600 sm:bottom-6 sm:right-6 sm:flex sm:h-14 sm:w-14"
          aria-label="Open AI assistant"
        >
          <span className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping" />
          <span className="relative h-5 w-5 rounded-md border-2 border-white">
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-white bg-amber-500" />
          </span>
        </button>
      )}

      {/* Scrollytelling progress rail */}
      {loadDecorations && (
        <Suspense fallback={null}>
          <StoryProgress />
        </Suspense>
      )}

      {/* Structured Long-form Storytelling Flow */}
      <main>
        
        {/* Section 1: Hero - Powerful introduction */}
        <section id="hero" className="story-panel relative">
          <Hero />
        </section>

        {/* Section 2: Problem Context - The invisible threat (PM2.5, dust) */}
        <LazyStorySection id="problem-context">
          <ProblemContext />
        </LazyStorySection>

        {/* Section 2.5: Interactive Vitals Simulation & Live ECG HUD */}
        <LazyPlainSection>
          <VitalsSimulator />
        </LazyPlainSection>

        {/* Section 3: Deep Dive Features & Clinical filtration tech */}
        <LazyStorySection id="technology">
          <TechShowcase />
        </LazyStorySection>

        {/* Section 4: Portability Showcase - fits in car cup holders & backpacks */}
        <LazyStorySection id="portability-showcase">
          <Portability />
        </LazyStorySection>

        {/* Section 5: Bento Box Specs Section - Technical indicators */}
        <LazyStorySection id="specifications">
          <Specs />
        </LazyStorySection>

        {/* Section 6: Use Cases - Car, Office, Bedroom scenarios */}
        <LazyStorySection id="lifestyle-use-cases">
          <UseCases />
        </LazyStorySection>

        {/* Section 7: Final Conversion Point - Gmail discount email submission */}
        <LazyStorySection id="newsletter-conversion">
          <CTA />
        </LazyStorySection>

      </main>

      {/* Corporate Info Footer */}
      <Footer />

    </div>
  );
}
