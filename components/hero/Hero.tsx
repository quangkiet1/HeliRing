import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { ChevronRight, CheckCircle2, Zap } from 'lucide-react';

const Ring3D = lazy(() => import('@/components/animation/Ring3D'));

function Ring3DFallback() {
  return (
    <div className="relative z-10 mx-auto flex h-[22rem] w-full max-w-[38rem] items-center justify-center md:h-[30rem] lg:h-[36rem]">
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.22)_0%,rgba(6,182,212,0.1)_38%,transparent_70%)] blur-3xl" />
      <div className="relative h-48 w-48 rotate-[-16deg] rounded-full border-[26px] border-slate-300/80 bg-transparent shadow-[inset_18px_0_30px_rgba(255,255,255,0.9),inset_-18px_0_26px_rgba(15,23,42,0.12),0_34px_90px_rgba(16,185,129,0.22)] dark:border-slate-500/70 md:h-64 md:w-64 md:border-[34px]">
        <div className="absolute inset-[-30px] rounded-full border border-white/70 dark:border-white/10" />
        <div className="absolute inset-[-18px] rounded-full bg-[conic-gradient(from_120deg,rgba(255,255,255,0.82),rgba(148,163,184,0.1),rgba(16,185,129,0.2),rgba(255,255,255,0.62))] opacity-70 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-[32%] rounded-full bg-emerald-300/80 blur-[4px] shadow-[0_0_36px_rgba(16,185,129,0.8)]" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const { t } = useLanguage();
  const [shouldLoadRing, setShouldLoadRing] = useState(false);

  // Scroll translations for Parallax scrollytelling depth
  const glowY1 = useTransform(scrollY, [0, 800], [0, 120]);
  const glowY2 = useTransform(scrollY, [0, 800], [0, -80]);
  const textY = useTransform(scrollY, [0, 600], [0, 45]);
  const mockupY = useTransform(scrollY, [0, 600], [0, -25]);

  useEffect(() => {
    const loadRing = () => setShouldLoadRing(true);
    const scheduler = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (scheduler.requestIdleCallback && scheduler.cancelIdleCallback) {
      const idleId = scheduler.requestIdleCallback(loadRing, { timeout: 1200 });
      return () => scheduler.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(loadRing, 450);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 md:pt-36 pb-16 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* Decorative ambient backdrop glows - Parallax-enhanced */}
      <motion.div style={{ y: glowY1 }} className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 to-sky-400/5 rounded-full blur-[140px] pointer-events-none" />
      <motion.div style={{ y: glowY2 }} className="absolute bottom-1/4 left-1/10 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Dynamic Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#030712_100%)] pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Hero Left Content - Parallax shifted */}
          <motion.div style={{ y: textY }} className="order-2 flex flex-col items-start lg:order-none lg:col-span-7">
            
            {/* Dynamic Intro Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>{t('hero_badge')}</span>
            </motion.div>
 
            {/* Typography paired Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-[5.5rem] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tight mb-6 uppercase"
            >
              {t('hero_title_1')}<br/>
              <span className="text-emerald-500">
                {t('hero_title_2')} {t('hero_title_3')}
              </span>
            </motion.h1>
 
            {/* Structured Copywriting */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mb-8 pr-14 sm:pr-0"
            >
              {t('hero_desc')}
            </motion.p>
 
            {/* Highlighted Value Props */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 w-full max-w-lg mb-10"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{t('hero_feat_ppg')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{t('hero_feat_material')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{t('hero_feat_temp')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{t('hero_feat_battery')}</span>
              </div>
            </motion.div>
 
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full"
            >
              <a 
                href="#cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-white font-bold text-lg shadow-xl shadow-emerald-200 dark:shadow-none uppercase tracking-wide transition-all hover:-translate-y-0.5 text-center cursor-pointer select-none"
              >
                {t('hero_cta_guide')}
                <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="#tech-showcase"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-900 dark:text-white text-center cursor-pointer select-none"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-slate-900 dark:border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                </div>
                <span>{t('hero_cta_structure')}</span>
              </a>
            </motion.div>

          </motion.div>
 
          {/* Hero Right Wearable Ring Mockup Simulation - Parallax shifted */}
          <motion.div style={{ y: mockupY }} className="order-1 relative flex items-center justify-center lg:order-none lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 flex min-h-[19rem] w-full max-w-[32rem] items-center justify-center md:min-h-[32rem] md:max-w-[38rem] lg:min-h-[38rem]"
            >
              {shouldLoadRing ? (
                <Suspense fallback={<Ring3DFallback />}>
                  <Ring3D variant="hero" className="mx-auto" />
                </Suspense>
              ) : (
                <Ring3DFallback />
              )}

              <div className="pointer-events-none absolute left-[12%] top-[22%] hidden h-px w-20 bg-gradient-to-r from-transparent via-emerald-300/25 to-emerald-300/0 md:block" />
              <div className="pointer-events-none absolute bottom-[22%] right-[16%] hidden h-px w-24 bg-gradient-to-l from-transparent via-cyan-300/20 to-cyan-300/0 md:block" />

              {/* Floating micro-badges around the ring */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-2 top-8 z-20 max-w-[140px] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm transition-colors dark:border-emerald-300/10 dark:bg-slate-900/80 md:right-6 lg:top-12"
              >
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-white">{t('hero_hud_recovery')}</span>
                </div>
                <p className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">94%</p>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 font-sans leading-none">{t('hero_hud_recovery_desc')}</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 left-2 z-20 max-w-[150px] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm transition-colors dark:border-cyan-300/10 dark:bg-slate-900/80 md:left-8 lg:bottom-10"
              >
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-black block uppercase tracking-wider">{t('hero_hud_sleep')}</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">8h 15m</p>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">{t('hero_hud_sleep_desc')}</p>
              </motion.div>

             </motion.div>
          </motion.div>
 
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 pointer-events-none">
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{t('hero_scroll_down')}</span>
        <div className="w-5 h-9 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-emerald-500"
          />
        </div>
      </div>

    </section>
  );
}
