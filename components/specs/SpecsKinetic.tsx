import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { animate, utils } from 'animejs';
import { useLanguage } from '@/providers/LanguageProvider';
import { Cpu, ShieldAlert, Wifi, RefreshCw, Feather, Award, Activity, Gauge } from 'lucide-react';

export default function SpecsKinetic() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [42, -36]);
  const haloY = useTransform(scrollYProgress, [0, 1], [72, -54]);

  const specItems = [
    {
      id: 1,
      title: t('spec_1_title'),
      subtitle: t('spec_1_sub'),
      value: t('spec_1_val'),
      desc: t('spec_1_desc'),
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: 2,
      title: t('spec_2_title'),
      subtitle: t('spec_2_sub'),
      value: t('spec_2_val'),
      desc: t('spec_2_desc'),
      icon: <ShieldAlert className="h-5 w-5" />,
    },
    {
      id: 3,
      title: t('spec_3_title'),
      subtitle: t('spec_3_sub'),
      value: t('spec_3_val'),
      desc: t('spec_3_desc'),
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      id: 4,
      title: t('spec_4_title'),
      subtitle: t('spec_4_sub'),
      value: t('spec_4_val'),
      desc: t('spec_4_desc'),
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      id: 5,
      title: t('spec_5_title'),
      subtitle: t('spec_5_sub'),
      value: t('spec_5_val'),
      desc: t('spec_5_desc'),
      icon: <Feather className="h-5 w-5" />,
    },
    {
      id: 6,
      title: t('spec_6_title'),
      subtitle: t('spec_6_sub'),
      value: t('spec_6_val'),
      desc: t('spec_6_desc'),
      icon: <Cpu className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        if (reduceMotion) return;

        const cards = section.querySelectorAll('.square');
        animate(cards, {
          x: ($el) => ($el as HTMLElement).getAttribute('data-x') || 0,
          y: (_, i) => 18 + -10 * i,
          scale: (_, i, t) => 0.96 + (t.length - i) * 0.012,
          rotate: () => utils.random(-2, 2),
          borderRadius: () => `+=${utils.random(0, 8)}`,
          duration: () => utils.random(1200, 1800),
          delay: () => utils.random(0, 400),
          ease: 'outElastic(1, .5)',
        });
      },
      { threshold: 0.24 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative overflow-hidden bg-slate-50 py-24 transition-colors duration-500 dark:bg-slate-900 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
      <motion.div
        style={{ y: haloY }}
        className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <motion.div
        style={{ y: panelY }}
        className="pointer-events-none absolute bottom-10 right-[6%] h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <motion.div
          style={{ y: panelY }}
          className="lg:sticky lg:top-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{t('specs_badge')}</span>
          </div>

          <h2 className="mb-6 text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-white md:text-6xl">
            {t('specs_title_1')} <br />
            <span className="text-emerald-500">{t('specs_title_2')}</span>
          </h2>

          <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            {t('specs_desc')}
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <Gauge className="mb-4 h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-black text-slate-950 dark:text-white">6</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{t('specs_label')}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <Activity className="mb-4 h-5 w-5 text-sky-500" />
              <p className="text-2xl font-black text-slate-950 dark:text-white">24/7</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">Bio telemetry</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {specItems.map((item, idx) => (
            <article
              key={item.id}
              data-x={idx % 2 === 0 ? '-10' : '10'}
              className="square group relative min-h-[17rem] overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-slate-900/80 dark:bg-white/80" />
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-emerald-500 transition-colors group-hover:border-emerald-400 dark:border-slate-800">
                  {item.icon}
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  {t('specs_label')} 0{item.id}
                </span>
              </div>

              <div className="mt-8">
                <p className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                <h3 className="text-2xl font-black leading-tight text-slate-950 transition-colors group-hover:text-emerald-500 dark:text-white md:text-3xl">
                  {item.value}
                </h3>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-5 dark:border-slate-900">
                <p className="mb-2 text-sm font-bold text-slate-900 dark:text-slate-100">{item.title}</p>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
