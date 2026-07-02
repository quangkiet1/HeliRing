import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Brain, Heart, Moon } from 'lucide-react';

export default function ProblemContext() {
  const { t } = useLanguage();

  const threats = [
    {
      id: 1,
      title: t('threat_1_title'),
      subtitle: t('threat_1_sub'),
      desc: t('threat_1_desc'),
      impact: t('threat_1_impact'),
      icon: <Brain className="w-5 h-5 text-rose-500" />
    },
    {
      id: 2,
      title: t('threat_2_title'),
      subtitle: t('threat_2_sub'),
      desc: t('threat_2_desc'),
      impact: t('threat_2_impact'),
      icon: <Moon className="w-5 h-5 text-rose-500" />
    },
    {
      id: 3,
      title: t('threat_3_title'),
      subtitle: t('threat_3_sub'),
      desc: t('threat_3_desc'),
      impact: t('threat_3_impact'),
      icon: <Heart className="w-5 h-5 text-rose-500" />
    }
  ];

  return (
    <section id="problem" className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      
      {/* Absolute design decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header content explaining problem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 md:mb-24">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-bold mb-4">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
              <span>{t('problem_badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] mb-6">
              {t('problem_title_1')} <br/>
              <span className="text-rose-500 dark:text-rose-400">
                {t('problem_title_2')}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-sans text-base md:text-lg">
              {t('problem_desc')}
            </p>
          </div>

        </div>

        {/* Visual Bento Grid of Threats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {threats.map((tItem, idx) => (
            <motion.div
              key={tItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Header of card */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-rose-500">
                    {tItem.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-rose-500 transition-colors font-bold">
                    {t('problem_threat_label')} 0{tItem.id}
                  </span>
                </div>

                {/* Subtitle */}
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 block mb-1">
                  {tItem.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-3">
                  {tItem.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-sans">
                  {tItem.desc}
                </p>
              </div>

              {/* Biological Impact bottom bar */}
              <div className="border-t border-slate-100 dark:border-slate-900 pt-4 mt-auto">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1">{t('problem_threat_impact')}</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                  {tItem.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual tracker prompt */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            &darr; {t('problem_scroll')} &darr;
          </p>
        </div>

      </div>
    </section>
  );
}
