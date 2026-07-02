import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Heart, Activity, ShieldCheck, Zap, Thermometer, Brain, RefreshCw, ChevronRight } from 'lucide-react';

interface VitalsProfile {
  name: string;
  label: string;
  heartRate: number;
  spo2: number;
  temp: number;
  stress: number;
  hrv: number;
  status: string;
  color: string;
  description: string;
}

export default function VitalsSimulator() {
  const { t } = useLanguage();
  const [activeProfile, setActiveProfile] = useState<string>('resting');
  const [liveHr, setLiveHr] = useState<number>(68);
  const [pulseArray, setPulseArray] = useState<number[]>([60, 62, 61, 65, 68, 64, 62, 63, 67, 65, 68, 70]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [diagnosticResult, setDiagnosticResult] = useState<string>('');

  const profiles: Record<string, VitalsProfile> = {
    resting: {
      name: t('profile_resting_name'),
      label: t('profile_resting_lbl'),
      heartRate: 64,
      spo2: 99,
      temp: 36.6,
      stress: 15,
      hrv: 82,
      status: t('profile_resting_status'),
      color: 'emerald',
      description: t('profile_resting_desc')
    },
    workout: {
      name: t('profile_workout_name'),
      label: t('profile_workout_lbl'),
      heartRate: 135,
      spo2: 97,
      temp: 37.2,
      stress: 55,
      hrv: 45,
      status: t('profile_workout_status'),
      color: 'amber',
      description: t('profile_workout_desc')
    },
    stress: {
      name: t('profile_stress_name'),
      label: t('profile_stress_lbl'),
      heartRate: 98,
      spo2: 98,
      temp: 36.8,
      stress: 78,
      hrv: 28,
      status: t('profile_stress_status'),
      color: 'rose',
      description: t('profile_stress_desc')
    },
    sleep: {
      name: t('profile_sleep_name'),
      label: t('profile_sleep_lbl'),
      heartRate: 52,
      spo2: 99,
      temp: 36.2,
      stress: 8,
      hrv: 95,
      status: t('profile_sleep_status'),
      color: 'purple',
      description: t('profile_sleep_desc')
    }
  };

  const current = profiles[activeProfile];

  // Smoothly transition vitals values
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Smoothly animate the heart rate toward the profile target with organic micro-fluctuations
    interval = setInterval(() => {
      setLiveHr((prev) => {
        const diff = current.heartRate - prev;
        const step = diff > 0 ? Math.ceil(diff * 0.15) : Math.floor(diff * 0.15);
        const noise = Math.floor(Math.random() * 3) - 1; // Organic heartbeat fluctuation (-1, 0, 1)
        const next = prev + step + noise;
        
        // Append to history array for graph path representation
        setPulseArray((arr) => {
          const updated = [...arr.slice(1), next];
          return updated;
        });

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeProfile, current.heartRate]);

  // Handle ECG Scan Simulator
  const handleStartScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setDiagnosticResult('');

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
          
          // Generate customized clinical statement based on profile
          if (activeProfile === 'resting') {
            setDiagnosticResult(t('diag_resting'));
          } else if (activeProfile === 'workout') {
            setDiagnosticResult(t('diag_workout'));
          } else if (activeProfile === 'stress') {
            setDiagnosticResult(t('diag_stress'));
          } else {
            setDiagnosticResult(t('diag_sleep'));
          }
          return 100;
        }
        return prev + 4;
      });
    }, 120);
  };

  // Generate SVG path for the real-time glowing vitals chart
  const generateSvgPath = () => {
    const width = 500;
    const height = 120;
    const padding = 10;
    const activeHeight = height - padding * 2;
    const stepX = width / (pulseArray.length - 1);
    
    // Find min and max for scaling
    const minVal = Math.min(...pulseArray) - 5;
    const maxVal = Math.max(...pulseArray) + 5;
    const valRange = maxVal - minVal || 1;

    return pulseArray.map((val, idx) => {
      const x = idx * stepX;
      // Invert Y axis because SVG (0,0) is top-left
      const y = padding + activeHeight - ((val - minVal) / valRange) * activeHeight;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <section id="vitals-playground" className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      
      {/* Visual Ambient Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>{t('sim_badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] mb-6">
            {t('sim_title_1')} <br/>
            <span className="bg-gradient-to-r from-emerald-500 to-sky-400 bg-clip-text text-transparent">
              {t('sim_title_2')}
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('sim_desc')}
          </p>
        </div>

        {/* 2-Column interactive dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Controller panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 shadow-xl transition-all duration-300">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 block mb-2">{t('sim_control')}</span>
              <h3 className="text-2xl font-display font-black text-slate-800 dark:text-white mb-2">{t('sim_choose')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mb-8">
                {t('sim_mode_desc')}
              </p>

              {/* Grid of Profile Buttons */}
              <div className="space-y-3.5 mb-8">
                {Object.entries(profiles).map(([key, prof]) => {
                  const isActive = activeProfile === key;
                  let btnColor = 'hover:bg-slate-50 dark:hover:bg-slate-900/50 border-transparent text-slate-800 dark:text-slate-200';
                  if (isActive) {
                    if (key === 'resting') btnColor = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
                    if (key === 'workout') btnColor = 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400';
                    if (key === 'stress') btnColor = 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400';
                    if (key === 'sleep') btnColor = 'border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400';
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveProfile(key);
                        setDiagnosticResult('');
                      }}
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${btnColor}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 flex items-center justify-center ${
                          key === 'resting' ? 'text-emerald-500' :
                          key === 'workout' ? 'text-amber-500' :
                          key === 'stress' ? 'text-rose-500' :
                          'text-purple-500'
                        }`}>
                          {key === 'resting' ? <Heart className="w-4.5 h-4.5" /> :
                           key === 'workout' ? <Zap className="w-4.5 h-4.5" /> :
                           key === 'stress' ? <Brain className="w-4.5 h-4.5" /> :
                           <Thermometer className="w-4.5 h-4.5" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800 dark:text-white">{prof.name}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{prof.label}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono font-bold">{prof.heartRate} BPM</span>
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 mt-4">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block mb-3">{t('sim_ecg_desc')}</span>
              <button
                onClick={handleStartScan}
                disabled={isScanning}
                className="w-full py-4 px-6 rounded-2xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                    {t('sim_ecg_btn_scanning')} ({scanProgress}%)
                  </>
                ) : (
                  <>
                    <Activity className="w-4.5 h-4.5 animate-pulse" />
                    {t('sim_ecg_btn')}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Column 2: Dashboard Visualization */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Heart rate metric */}
              <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
                <div className="flex items-center gap-1.5 text-rose-500 mb-2">
                  <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold">{t('sim_hr_label')}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-mono font-black text-slate-800 dark:text-white">
                    {liveHr}
                  </span>
                  <span className="text-xs text-slate-400">BPM</span>
                </div>
              </div>

              {/* SpO2 oxygen level */}
              <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
                <div className="flex items-center gap-1.5 text-sky-500 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">{t('sim_spo2_label')}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-mono font-black text-slate-800 dark:text-white">
                    {current.spo2}%
                  </span>
                  <span className="text-xs text-emerald-500 font-bold">{t('profile_resting_lbl')}</span>
                </div>
              </div>

              {/* Stress metric */}
              <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
                <div className="flex items-center gap-1.5 text-amber-500 mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">{t('sim_stress_label')}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-mono font-black text-slate-800 dark:text-white">
                    {current.stress}%
                  </span>
                  <span className="text-xs text-slate-400">Index</span>
                </div>
              </div>

              {/* Skin temperature */}
              <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
                <div className="flex items-center gap-1.5 text-emerald-500 mb-2">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">{t('sim_temp_label')}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-mono font-black text-slate-800 dark:text-white">
                    {current.temp}
                  </span>
                  <span className="text-xs text-slate-400">°C</span>
                </div>
              </div>
            </div>

            {/* Realtime Waveform Chart Visual Card */}
            <div className="p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{t('sim_hrv_label')}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-400 dark:text-slate-500">Live Feedback</span>
                </div>

                {/* SVG glowing graph path */}
                <div className="w-full bg-slate-950 rounded-2xl p-4 overflow-hidden relative h-36 flex items-center justify-center">
                  {/* Grid lines behind */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                  
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={generateSvgPath()}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    />
                    <motion.path
                      d={`${generateSvgPath()} L 500 120 L 0 120 Z`}
                      fill="url(#wave-gradient)"
                      initial={false}
                    />
                  </svg>
                </div>
              </div>

              {/* Diagnosis box */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 mt-6 min-h-[100px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 text-sm text-slate-500"
                    >
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <span>{t('sim_live_desc')}</span>
                    </motion.div>
                  ) : diagnosticResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-700 dark:text-emerald-400 text-sm font-semibold flex items-start gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-mono text-emerald-600 dark:text-emerald-500 mb-0.5">{t('sim_ecg_result')}</span>
                        <p className="font-medium leading-relaxed">{diagnosticResult}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center md:text-left"
                    >
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1">{t('sim_live_title')}</span>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {current.status}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
