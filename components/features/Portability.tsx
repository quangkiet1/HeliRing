import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Feather, Battery, Compass, Zap, Heart } from 'lucide-react';
import Ring3D from '@/components/animation/Ring3D';

export default function Portability() {
  const { t } = useLanguage();

  const features = [
    {
      id: 1,
      label: t('port_feat_1_lbl'),
      value: t('port_feat_1_val'),
      desc: t('feat_port_1_desc'),
      icon: <Feather className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 2,
      label: t('port_feat_2_lbl'),
      value: t('port_feat_2_val'),
      desc: t('feat_port_2_desc'),
      icon: <Battery className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 3,
      label: t('port_feat_3_lbl'),
      value: t('port_feat_3_val'),
      desc: t('feat_port_3_desc'),
      icon: <Compass className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <section id="portability" className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* Absolute decorative background layout */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Interactive 3D Ring Background */}
        <Ring3D />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Companion App HUD Simulation */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
            <div className="relative w-full max-w-[320px] min-h-[520px] rounded-[44px] border-[10px] border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between overflow-hidden group transition-all duration-300">
              
              {/* App Status Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">HeliHealth App</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Battery className="w-3.5 h-3.5 text-emerald-500" />
                  <span>82%</span>
                </div>
              </div>

              {/* Bio Vitals Dashboard Sync View */}
              <div className="flex-1 my-4 flex flex-col gap-4">
                
                {/* Readiness Circular Chart */}
                <div className="relative w-28 h-28 mx-auto rounded-full border-4 border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center bg-white dark:bg-slate-950/60 shadow-inner">
                  <span className="text-3xl font-mono font-black text-emerald-500">92</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Readiness</span>
                  
                  {/* Decorative glowing semi-circle indicator */}
                  <div className="absolute inset-0 rounded-full border-t-4 border-l-4 border-emerald-500 -m-1" />
                </div>

                {/* Vitals Feed Items */}
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/40 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('sim_hr_label')}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100">64 BPM</span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/40 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Active Burn</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100">385 Kcal</span>
                  </div>
                </div>

              </div>
              
              {/* Sync status at bottom */}
              <div className="text-center bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 py-2 rounded-2xl">
                <p className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{t('port_hud_sys_ok')}</p>
              </div>

            </div>
          </div>

          {/* Right Column: Key Comfort Vectors */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>{t('port_badge')}</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] mb-6">
              {t('port_title_1')} <br/>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {t('port_title_2')}
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-sans text-base md:text-lg mb-10">
              {t('port_desc')}
            </p>

            {/* List of features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono font-black text-emerald-500 tracking-wider leading-none mb-1">{s.label}</span>
                      <span className="text-base font-display font-bold text-slate-800 dark:text-white leading-tight">{s.value}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
