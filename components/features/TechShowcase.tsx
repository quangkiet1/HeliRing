import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { ShieldCheck, Award, Layers, Heart, Thermometer, Brain, Shield } from 'lucide-react';
import { animate, scrambleText } from 'animejs';

interface TechLayer {
  id: number;
  name: string;
  shortName: string;
  efficiency: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}

export default function TechShowcase() {
  const { t, language } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<number>(0);

  // Anime.js Entrance Animation for the 3D Layer Stack
  useEffect(() => {
    animate('.tech-layer-btn', {
      x: ['-6rem', '0rem'],
      opacity: [0, 1],
      rotateX: [0, 28],
      rotateY: [0, -8],
      delay: (el, i) => i * 120,
      duration: 900,
      ease: 'outBack'
    });
  }, []);

  const layers: TechLayer[] = [
    {
      id: 0,
      name: t('layer_0_name'),
      shortName: t('layer_0_sub'),
      efficiency: t('layer_0_eff'),
      desc: t('layer_0_desc'),
      color: 'from-emerald-500 to-teal-600',
      icon: <Heart className="w-5 h-5 text-white animate-pulse" />
    },
    {
      id: 1,
      name: t('layer_1_name'),
      shortName: t('layer_1_sub'),
      efficiency: t('layer_1_eff'),
      desc: t('layer_1_desc'),
      color: 'from-amber-400 to-orange-500',
      icon: <Thermometer className="w-5 h-5 text-white" />
    },
    {
      id: 2,
      name: t('layer_2_name'),
      shortName: t('layer_2_sub'),
      efficiency: t('layer_2_eff'),
      desc: t('layer_2_desc'),
      color: 'from-sky-500 to-cyan-600',
      icon: <Brain className="w-5 h-5 text-white" />
    },
    {
      id: 3,
      name: t('layer_3_name'),
      shortName: t('layer_3_sub'),
      efficiency: t('layer_3_eff'),
      desc: t('layer_3_desc'),
      color: 'from-slate-700 to-slate-900',
      icon: <Shield className="w-5 h-5 text-white" />
    },
  ];

  // Anime.js Scramble Text Effect on layer change
  useEffect(() => {
    const layer = layers.find(l => l.id === activeLayer);
    if (layer) {
      // Scramble Title with technical digits
      animate('.tech-layer-title', {
        innerHTML: scrambleText({
          text: layer.name,
          chars: '010101',
          revealRate: 70,
          settleRate: 24,
        }),
        duration: 700,
        ease: 'linear'
      });

      // Scramble Description
      animate('.tech-layer-desc', {
        innerHTML: scrambleText({
          text: layer.desc,
          chars: '010101',
          revealRate: 42,
          settleRate: 18,
        }),
        duration: 1100,
        ease: 'linear'
      });
    }
  }, [activeLayer, language]);

  return (
    <section id="tech-showcase" className="relative py-24 md:py-32 overflow-hidden bg-brand-light-bg dark:bg-brand-dark-bg transition-colors duration-500">
      
      {/* Visual background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>{t('tech_badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] mb-6">
            {t('tech_title_1')} <br/>
            <span className="text-emerald-500 dark:text-emerald-300">
              {t('tech_title_2')}
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            {t('tech_desc')}
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Interactive Layer Visualizer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[400px]">
            {/* 3D Stack Simulation */}
            <div className="relative w-full max-w-[340px] aspect-[4/5] flex flex-col justify-between py-10">
              {layers.map((layer, index) => {
                const isActive = activeLayer === layer.id;
                const offset = index * -15; // overlap factor
                
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setActiveLayer(layer.id);
                      // Custom tactile click animation on the button itself using anime.js
                      animate(`.tech-layer-card-${layer.id}`, {
                        x: [0, 16, 0],
                        scale: [1, 1.03, 1],
                        duration: 350,
                        ease: 'outQuad'
                      });
                    }}
                    className="tech-layer-btn w-full text-left focus:outline-none group relative transition-all duration-500 cursor-pointer"
                    style={{
                      transform: `perspective(1000px) rotateX(28deg) rotateY(-8deg) translateY(${offset}px)`,
                      zIndex: isActive ? 40 : 10 + index,
                    }}
                  >
                    {/* Layer Outline / Glow */}
                    <div className={`absolute -inset-1 rounded-xl transition-all duration-300 blur-md ${
                      isActive ? 'bg-emerald-500/40 opacity-100' : 'bg-transparent opacity-0 group-hover:opacity-40 group-hover:bg-emerald-500/20'
                    }`} />

                    {/* Actual Layer Body */}
                    <div className={`tech-layer-card-${layer.id} relative h-20 rounded-xl border p-4 flex items-center justify-between transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-950 border-emerald-500 shadow-glow text-white' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-md`}>
                          {layer.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">{t('nav_sensor')} 0{index + 1}</p>
                          <p className="font-display font-semibold text-sm md:text-base leading-snug">{layer.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {layer.shortName}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Instruction tooltip */}
            <p className="mt-8 text-xs font-mono text-slate-600 dark:text-slate-400 animate-pulse text-center">
              {t('tech_instructions')}
            </p>
          </div>

          {/* Description Detail Pane */}
          <div className="lg:col-span-6">
            <div className="p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl min-h-[320px] flex flex-col justify-between transition-colors">
              {/* Description Detail Pane with Anime.js scrambleText */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${layers[activeLayer].color} flex items-center justify-center shadow-sm`}>
                      {layers[activeLayer].icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 font-bold">
                      {t('nav_sensor')} 0{layers[activeLayer].id + 1}
                    </span>
                  </div>

                  <h3 className="tech-layer-title text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white mb-3 min-h-[3.5rem] lg:min-h-[5rem]">
                    {layers[activeLayer].name}
                  </h3>
                  
                  <div className="mb-4 inline-block bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold">
                    {t('nav_sensor')} efficiency: {layers[activeLayer].efficiency}
                  </div>

                  <p className="tech-layer-desc text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans min-h-[6.5rem]">
                    {layers[activeLayer].desc}
                  </p>
                </div>
              </div>

              {/* Certifications and credentials - flattened */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex flex-col items-center text-center">
                  <Award className="w-5 h-5 text-emerald-500 mb-2" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block">{t('tech_cert_label_1')}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{t('tech_cert_val_1')}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="w-5 h-5 text-teal-500 mb-2" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block">{t('tech_cert_label_2')}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{t('tech_cert_val_2')}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Layers className="w-5 h-5 text-emerald-500 mb-2" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block">{t('tech_cert_label_3')}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{t('tech_cert_val_3')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
