import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Wind, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

// Sub-component for individual indicator dots to satisfy the Rules of Hooks
interface IndicatorDotProps {
  progress: any;
  threshold: number;
  key?: any;
}

function IndicatorDot({ progress, threshold }: IndicatorDotProps) {
  const opacity = useTransform(
    progress,
    [threshold - 0.15, threshold, threshold + 0.15],
    [0, 1, 0]
  );

  return (
    <div className="relative w-2 h-2 rounded-full border border-slate-700 bg-slate-900 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cyan-400"
        style={{ opacity }}
      />
    </div>
  );
}

export default function AirParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Track scroll progress of the component container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out scroll progress for buttery animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Generate particles only on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const generated: Particle[] = [];
    const colors = [
      'rgba(148, 163, 184, 0.5)', // Gray dust
      'rgba(245, 158, 11, 0.4)',  // Amber PM2.5
      'rgba(100, 116, 139, 0.4)', // Slate allergen
      'rgba(239, 68, 68, 0.3)',   // Red micro-pollutants
    ];

    for (let i = 0; i < 45; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(generated);
  }, []);

  // Map scroll progress to animations
  // Dust particles fade out and shrink
  const particleOpacity = useTransform(smoothProgress, [0, 0.3, 0.6], [1, 0.8, 0]);
  const particleScale = useTransform(smoothProgress, [0, 0.4, 0.65], [1, 0.6, 0]);
  
  // Clean air waves fade in
  const cleanAirOpacity = useTransform(smoothProgress, [0.35, 0.55, 1], [0, 1, 1]);
  const cleanAirScale = useTransform(smoothProgress, [0.35, 0.6], [0.8, 1]);

  // Smog background overlay fades out
  const smogOpacity = useTransform(smoothProgress, [0.2, 0.65], [0.6, 0]);

  // Clean glow background overlay fades in
  const cleanGlowOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 0.45]);

  // Text block opacities and vertical shifts
  const text1Opacity = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.25, 0.35], [0, 0, -30]);

  const text2Opacity = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.68], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.68], [30, 0, 0, -30]);

  const text3Opacity = useTransform(smoothProgress, [0.62, 0.75, 1], [0, 1, 1]);
  const text3Y = useTransform(smoothProgress, [0.62, 0.75, 1], [30, 0, 0]);

  // Scroll instruction banner opacity
  const instructionOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.8, 0.8, 0]);

  if (!mounted) {
    return (
      <div className="h-[200vh] bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-xs">
        Khởi tạo hệ thống Scrollytelling...
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-slate-950 overflow-visible">
      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND LAYERS */}
        
        {/* Layer 1: Polluted Air Smog (Base dark slate with warm gray tint) */}
        <div className="absolute inset-0 bg-slate-950 z-0" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-amber-950/10 via-slate-900 to-red-950/10 pointer-events-none z-[1]"
          style={{ opacity: smogOpacity }}
        />

        {/* Layer 2: Clean clinical cyan glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-cyan-950/30 pointer-events-none z-[2]"
          style={{ opacity: cleanGlowOpacity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none z-[2]"
          style={{ opacity: cleanGlowOpacity }}
        />

        {/* DUST PARTICLES (Dissolves on scroll) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: particleOpacity, scale: particleScale }}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full filter blur-[1px]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: p.size > 5 ? '0 0 8px rgba(245, 158, 11, 0.2)' : 'none',
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* CLINICAL PURIFICATION FLOW (Waves + Plasma sparkles, Appears on scroll) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
          style={{ opacity: cleanAirOpacity, scale: cleanAirScale }}
        >
          {/* Cyan Airflow Waves (SVG Lines) */}
          <svg className="absolute w-full h-full stroke-cyan-500/20 stroke-[1.5] fill-none" viewBox="0 0 1440 800">
            <motion.path 
              d="M-100,300 C300,200 600,450 1000,350 C1200,300 1300,400 1640,300" 
              animate={{ strokeDashoffset: [1000, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              strokeDasharray="100 200"
            />
            <motion.path 
              d="M-100,500 C400,600 700,350 1100,450 C1300,500 1400,420 1640,500" 
              animate={{ strokeDashoffset: [-1000, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              strokeDasharray="80 180"
            />
            <motion.path 
              d="M-100,400 C200,300 800,500 1200,400 C1400,350 1500,450 1640,400" 
              animate={{ strokeDashoffset: [800, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              strokeDasharray="120 220"
            />
          </svg>

          {/* Plasma Active Ions (Glowing Cyan Sparkles) */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{
                  left: `${(i * 17) % 100}%`,
                  top: `${(i * 23) % 100}%`,
                  boxShadow: '0 0 8px #22d3ee, 0 0 15px #06b6d4',
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* TEXT CONTENT SWITCHER (z-30) */}
        <div className="relative w-full max-w-4xl mx-auto px-6 text-center z-30 select-none">
          
          {/* Phase 1: Polluted Air */}
          <motion.div 
            className="absolute w-full max-w-2xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            style={{ opacity: text1Opacity, y: text1Y }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider mb-6">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Thực Trạng Khí Thở</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-100 uppercase tracking-tighter leading-[1.5] md:leading-[1.5] mb-6">
              Không Khí Ô Nhiễm <br/>
              <span className="text-amber-500">Đang Bủa Vây Bạn</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Bụi mịn PM2.5, khói xe độc hại, nấm mốc và vi khuẩn lơ lửng vô hình trong không gian hẹp tàn phá trực tiếp lá phổi của bạn mỗi giây.
            </p>
          </motion.div>

          {/* Phase 2: Active Purification */}
          <motion.div 
            className="absolute w-full max-w-2xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            style={{ opacity: text2Opacity, y: text2Y }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-6">
              <Wind className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Hệ Thống Kích Hoạt</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-100 uppercase tracking-tighter leading-[1.5] md:leading-[1.5] mb-6">
              Khởi Động Dòng <br/>
              <span className="text-cyan-300">Thanh Lọc Chủ Động</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Màng lọc HEPA H13 cùng dòng phóng 10 triệu Plasma Ion/cm³ lập tức bao vây, làm lắng các hạt bụi lơ lửng và phá hủy màng tế bào của vi khuẩn độc hại.
            </p>
          </motion.div>

          {/* Phase 3: Pure Clean Air Bubble */}
          <motion.div 
            className="absolute w-full max-w-2xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            style={{ opacity: text3Opacity, y: text3Y }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Thanh Lọc Hoàn Tất</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-100 uppercase tracking-tighter leading-[1.5] md:leading-[1.5] mb-6">
              Trả Lại Sự <br/>
              <span className="text-cyan-400">Tinh Khiết Tuyệt Đối</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Không khí sạch chuẩn lâm sàng y khoa được thiết lập. AirPure X tạo ra một bong bóng khí thở tinh khiết 99.97% di động bên bạn mọi nơi.
            </p>
          </motion.div>

        </div>

        {/* PROGRESS INDICATOR DOTS */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          {[0.15, 0.5, 0.85].map((threshold, idx) => (
            <IndicatorDot
              key={idx}
              progress={smoothProgress}
              threshold={threshold}
            />
          ))}
        </div>

        {/* SCROLL INSTRUCTION BANNER AT THE BOTTOM */}
        <div className="absolute bottom-10 left-0 right-0 text-center z-30 pointer-events-none">
          <motion.div 
            className="inline-flex flex-col items-center gap-2"
            style={{ 
              opacity: instructionOpacity 
            }}
          >
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Cuộn xuống để lọc sạch khí thở</span>
            <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center p-1">
              <motion.div 
                className="w-1 h-1.5 rounded-full bg-cyan-400"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
