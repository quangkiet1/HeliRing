'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import ProblemContext from '@/components/features/ProblemContext';
import BioPulseTracker from '@/components/animation/BioPulseTracker';
import VitalsSimulator from '@/components/features/VitalsSimulator';
import TechShowcase from '@/components/features/TechShowcase';
import Portability from '@/components/features/Portability';
import Specs from '@/components/specs/Specs';
import UseCases from '@/components/features/UseCases';
import CTA from '@/components/cta/CTA';
import Chatbot from '@/components/layout/Chatbot';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Signature Hardware-Accelerated BioPulse Tracker & Vitals HUD */}
      <BioPulseTracker />

      {/* Global Fixed Navigation Header */}
      <Header />

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />

      {/* Structured Long-form Storytelling Flow */}
      <main>
        
        {/* Section 1: Hero - Powerful introduction */}
        <section id="hero" className="relative">
          <Hero />
        </section>

        {/* Section 2: Problem Context - The invisible threat (PM2.5, dust) */}
        <section id="problem-context" className="relative">
          <ProblemContext />
        </section>

        {/* Section 2.5: Interactive Vitals Simulation & Live ECG HUD */}
        <VitalsSimulator />

        {/* Section 3: Deep Dive Features & Clinical filtration tech */}
        <section id="technology" className="relative">
          <TechShowcase />
        </section>

        {/* Section 4: Portability Showcase - fits in car cup holders & backpacks */}
        <section id="portability-showcase" className="relative">
          <Portability />
        </section>

        {/* Section 5: Bento Box Specs Section - Technical indicators */}
        <section id="specifications" className="relative">
          <Specs />
        </section>

        {/* Section 6: Use Cases - Car, Office, Bedroom scenarios */}
        <section id="lifestyle-use-cases" className="relative">
          <UseCases />
        </section>

        {/* Section 7: Final Conversion Point - Newsletter & Webhook submission */}
        <section id="newsletter-conversion" className="relative">
          <CTA />
        </section>

      </main>

      {/* Corporate Info Footer */}
      <Footer />

    </div>
  );
}
