import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Cpu, ShieldAlert, Wifi, RefreshCw, Feather, Award } from 'lucide-react';

export default function Specs() {
  const { t } = useLanguage();

  const specItems = [
    {
      id: 1,
      title: t('spec_1_title'),
      subtitle: t('spec_1_sub'),
      value: t('spec_1_val'),
      desc: t('spec_1_desc'),
      icon: <Award className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 2,
      title: t('spec_2_title'),
      subtitle: t('spec_2_sub'),
      value: t('spec_2_val'),
      desc: t('spec_2_desc'),
      icon: <ShieldAlert className="w-5 h-5 text-sky-500" />
    },
    {
      id: 3,
      title: t('spec_3_title'),
      subtitle: t('spec_3_sub'),
      value: t('spec_3_val'),
      desc: t('spec_3_desc'),
      icon: <RefreshCw className="w-5 h-5 text-amber-500" />
    },
    {
      id: 4,
      title: t('spec_4_title'),
      subtitle: t('spec_4_sub'),
      value: t('spec_4_val'),
      desc: t('spec_4_desc'),
      icon: <Wifi className="w-5 h-5 text-purple-500" />
    },
    {
      id: 5,
      title: t('spec_5_title'),
      subtitle: t('spec_5_sub'),
      value: t('spec_5_val'),
      desc: t('spec_5_desc'),
      icon: <Feather className="w-5 h-5 text-teal-500" />
    },
    {
      id: 6,
      title: t('spec_6_title'),
      subtitle: t('spec_6_sub'),
      value: t('spec_6_val'),
      desc: t('spec_6_desc'),
      icon: <Cpu className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <section id="specs" className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      
      {/* Decorative lines & elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>{t('specs_badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] mb-6">
            {t('specs_title_1')} <br/>
            <span className="text-emerald-500 dark:text-emerald-300">
              {t('specs_title_2')}
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('specs_desc')}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Header of Item card */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-slate-700 dark:text-slate-300">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 transition-colors">
                    {t('specs_label')} 0{item.id}
                  </span>
                </div>

                {/* Subtitle / Unit label */}
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  {item.subtitle}
                </span>

                {/* Large main value display */}
                <h3 className="text-2xl md:text-3xl font-display font-black text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {item.value}
                </h3>
              </div>

              {/* Description body footer */}
              <div className="border-t border-slate-100 dark:border-slate-900 pt-5 mt-6">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">{item.title}</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
