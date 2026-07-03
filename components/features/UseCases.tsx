import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Brain, Moon, Zap, CheckCircle2 } from 'lucide-react';

export default function UseCases() {
  const { t } = useLanguage();

  const cases = [
    {
      id: 1,
      title: t('case_1_title'),
      subtitle: t('case_1_sub'),
      desc: t('case_1_desc'),
      metric: t('case_1_val'),
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: 2,
      title: t('case_2_title'),
      subtitle: t('case_2_sub'),
      desc: t('case_2_desc'),
      metric: t('case_2_val'),
      color: 'bg-sky-500/10 text-sky-500 border-sky-400/20',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 3,
      title: t('case_3_title'),
      subtitle: t('case_3_sub'),
      desc: t('case_3_desc'),
      metric: t('case_3_val'),
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      icon: <Moon className="w-6 h-6" />
    }
  ];

  return (
    <section id="use-cases" className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* Absolute decorative gradient layout */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>{t('cases_badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] mb-6">
            {t('cases_title_1')} <br/>
            <span className="text-emerald-500 dark:text-emerald-300">
              {t('cases_title_2')}
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('cases_desc')}
          </p>
        </div>

        {/* 3 Columns Use Cases Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between group transition-colors"
            >
              <div>
                {/* Icon display */}
                <div className={`mb-8 ${
                  c.id === 1 ? 'text-emerald-500' :
                  c.id === 2 ? 'text-sky-500' :
                  'text-purple-500'
                }`}>
                  {c.icon}
                </div>

                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 block mb-2">
                  {c.subtitle}
                </span>

                <h3 className="text-xl md:text-2xl font-display font-black text-slate-800 dark:text-white leading-tight mb-4">
                  {c.title}
                </h3>

                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-8">
                  {c.desc}
                </p>
              </div>

              {/* Indicator bottom bar */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 mt-auto flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t('cases_metric_label')}</span>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {c.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
