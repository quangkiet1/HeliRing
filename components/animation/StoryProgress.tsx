import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

const chapters = [
  { id: 'hero', label: 'Hero' },
  { id: 'problem-context', label: 'Tension' },
  { id: 'technology', label: 'Sensors' },
  { id: 'specifications', label: 'Specs' },
  { id: 'lifestyle-use-cases', label: 'Use' },
  { id: 'newsletter-conversion', label: 'Join' },
];

export default function StoryProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="relative flex min-h-80 flex-col items-center justify-between rounded-full border border-slate-200/70 bg-white/80 px-2 py-4 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
        <div className="absolute left-1/2 top-5 h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-800" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-1/2 top-5 h-[calc(100%-2.5rem)] w-px origin-top -translate-x-1/2 bg-emerald-500"
        />

        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => jumpTo(chapter.id)}
            className="pointer-events-auto group relative grid h-8 w-8 place-items-center rounded-full text-slate-400 transition-colors hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            aria-label={`Go to ${chapter.label}`}
          >
            <span className="relative z-10 h-2.5 w-2.5 rounded-full border border-current bg-white transition-transform group-hover:scale-125 dark:bg-slate-950" />
            <span className="absolute right-9 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 opacity-0 shadow-sm transition-all group-hover:translate-x-0 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              {chapter.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
