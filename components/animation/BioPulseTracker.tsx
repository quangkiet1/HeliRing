import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Activity, Heart, ChevronUp, ChevronDown } from 'lucide-react';

interface SensorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

export default function BioPulseTracker() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<SensorParticle[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Map scroll state to organic physiological parameters
  const heartRate = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [65, 114, 82, 68]);
  const spo2 = useTransform(scrollYProgress, [0, 0.5, 1], [99, 98, 99]);
  const stress = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [22, 64, 38, 14]);

  const [bpmVal, setBpmVal] = useState(65);
  const [spo2Val, setSpo2Val] = useState(99);
  const [stressVal, setStressVal] = useState(22);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState('text-emerald-500 border-emerald-500/20 bg-emerald-500/5');

  useEffect(() => {
    // Generate organic biological glow cells (PPG sensor rays representation)
    const generated: SensorParticle[] = Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2, // 2px to 8px
      speed: Math.random() * 10 + 5,
      delay: Math.random() * -8,
    }));
    setParticles(generated);

    // Keep state values updated based on scroll smoothly
    const unsubHr = heartRate.on('change', (val) => setBpmVal(Math.round(val)));
    const unsubSp = spo2.on('change', (val) => setSpo2Val(Math.round(val)));
    const unsubSt = stress.on('change', (val) => setStressVal(Math.round(val)));

    // Dynamic medical alert indicator update based on scrolling depth
    const unsubStatus = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) {
        setStatusMessage(language === 'vi' ? 'Trạng thái: Tỉnh táo / Làm việc' : 'Status: Awake / Active');
        setStatusColor('text-sky-500 border-sky-500/20 bg-sky-500/5 dark:bg-sky-950/15');
      } else if (latest < 0.6) {
        setStatusMessage(language === 'vi' ? 'Phát hiện: Đang vận động mạnh' : 'Detected: Active Workout');
        setStatusColor('text-amber-500 border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/15 animate-pulse');
      } else if (latest < 0.85) {
        setStatusMessage(language === 'vi' ? 'Trạng thái: Phục hồi / Thư giãn' : 'Status: Relaxing / Recovery');
        setStatusColor('text-emerald-500 border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/15');
      } else {
        setStatusMessage(language === 'vi' ? 'Giai đoạn: Giấc ngủ sâu (REM)' : 'Stage: Deep Sleep (REM)');
        setStatusColor('text-purple-500 border-purple-500/20 bg-purple-500/5 dark:bg-purple-950/15');
      }
    });

    // Run once at start to populate message
    if (scrollYProgress.get() < 0.25) {
      setStatusMessage(language === 'vi' ? 'Trạng thái: Tỉnh táo / Làm việc' : 'Status: Awake / Active');
    }

    return () => {
      unsubHr();
      unsubSp();
      unsubSt();
      unsubStatus();
    };
  }, [scrollYProgress, language]);

  // Dashoffset calculation to simulate blood pulse wave motion
  const dashoffset = useTransform(scrollYProgress, [0, 1], [600, 0]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Medical Waveforms (Electrocardiogram EKG lines on the left & right margins) */}
      <div className="absolute top-0 bottom-0 left-0 w-8 md:w-20 opacity-15 dark:opacity-25">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
          <motion.path
            d="M 20 0 L 20 150 L 35 155 L 20 160 L 20 280 L 10 285 L 45 275 L 5 295 L 20 300 L 20 520 L 35 525 L 20 530 L 20 650 L 10 655 L 45 645 L 5 665 L 20 670 L 20 1000"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            style={{ strokeDasharray: '300', strokeDashoffset: dashoffset }}
          />
        </svg>
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-8 md:w-20 opacity-15 dark:opacity-25">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
          <motion.path
            d="M 80 0 L 80 200 L 95 205 L 80 210 L 80 400 L 70 405 L 105 395 L 65 415 L 80 420 L 80 700 L 95 705 L 80 710 L 80 850 L 70 855 L 105 845 L 65 865 L 80 870 L 80 1000"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2.5"
            style={{ strokeDasharray: '400', strokeDashoffset: dashoffset }}
          />
        </svg>
      </div>

      {/* 2. Floating PPG Biometric Rays / Glow Elements */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={`cell-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 2 === 0 
                ? 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0) 70%)'
                : 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, rgba(14,165,233,0) 70%)',
              boxShadow: p.id % 2 === 0 
                ? '0 0 8px rgba(16,185,129,0.3)' 
                : '0 0 8px rgba(14,165,233,0.3)',
            }}
            animate={{
              y: [0, -250],
              x: [0, Math.cos(p.id) * 40],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.speed,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* 3. Real-time Biometric Monitor HUD (Bottom-Left Card/Pill) */}
      <div 
        className={`absolute bottom-6 left-6 hidden max-w-sm rounded-[2rem] border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-500 overflow-hidden pointer-events-auto dark:border-slate-800 dark:bg-slate-900/95 xl:block xl:left-12 ${
          isExpanded ? 'p-5 w-[280px] sm:w-[320px]' : 'p-2.5 w-[210px] sm:w-[230px]'
        }`}
      >
        {isExpanded ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 block">HeliLink BioSync</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {language === 'vi' ? 'Bản thử nghiệm sinh hiệu' : 'Clinical Sandbox Mode'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                title={language === 'vi' ? 'Thu nhỏ' : 'Minimize'}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Smart Bio Vitals Metrics */}
            <div className="grid grid-cols-3 gap-2.5 mb-3 border-t border-b border-slate-100 dark:border-slate-800/60 py-3">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-1 justify-center md:justify-start mb-0.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse animate-duration-1000" />
                  <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                    {t('sim_hr_label')}
                  </p>
                </div>
                <p className="text-sm sm:text-base font-mono font-bold text-slate-800 dark:text-slate-100">
                  {bpmVal} <span className="text-[10px] font-sans font-medium text-slate-400">BPM</span>
                </p>
              </div>

              <div className="text-center md:text-left border-l border-r border-slate-100 dark:border-slate-800/50 px-1.5">
                <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">
                  {t('sim_spo2_label')}
                </p>
                <p className="text-sm sm:text-base font-mono font-bold text-sky-500">
                  {spo2Val}%
                </p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">
                  {t('sim_stress_label')}
                </p>
                <p className="text-sm sm:text-base font-mono font-bold text-amber-500">
                  {stressVal}%
                </p>
              </div>
            </div>

            {/* Diagnostic notification bar */}
            <div className={`px-3 py-2 rounded-full border text-[11px] font-bold uppercase tracking-wider text-center transition-all duration-300 ${statusColor}`}>
              {statusMessage}
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-between gap-2.5 text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 shrink-0">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse animate-duration-1000" />
              </div>
              <div>
                <span className="text-[8px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">LIVE VITALS</span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100">
                  {bpmVal} BPM / {spo2Val}% SpO2
                </span>
              </div>
            </div>
            <div className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
              <ChevronUp className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
