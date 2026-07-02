import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { createLayout, utils } from 'animejs';
import { useLanguage } from '@/providers/LanguageProvider';
import { Brain, Moon, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function UseCasesModal() {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalLayout = useRef<ReturnType<typeof createLayout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const railY = useTransform(scrollYProgress, [0, 1], [50, -46]);

  const cases = [
    {
      id: 1,
      title: t('case_1_title'),
      subtitle: t('case_1_sub'),
      desc: t('case_1_desc'),
      metric: t('case_1_val'),
      duration: 620,
      tone: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10',
      icon: <Brain className="h-6 w-6" />,
    },
    {
      id: 2,
      title: t('case_2_title'),
      subtitle: t('case_2_sub'),
      desc: t('case_2_desc'),
      metric: t('case_2_val'),
      duration: 760,
      tone: 'text-sky-500 border-sky-400/20 bg-sky-500/10',
      icon: <Zap className="h-6 w-6" />,
    },
    {
      id: 3,
      title: t('case_3_title'),
      subtitle: t('case_3_sub'),
      desc: t('case_3_desc'),
      metric: t('case_3_val'),
      duration: 900,
      tone: 'text-indigo-500 border-indigo-400/20 bg-indigo-500/10',
      icon: <Moon className="h-6 w-6" />,
    },
  ];

  useEffect(() => {
    const $dialog = dialogRef.current;
    if (!$dialog) return;

    modalLayout.current = createLayout($dialog, {
      children: ['.item', 'h2', 'h3', 'p', '.usecase-pill', '.usecase-metric'],
      properties: ['--overlay-alpha'],
      duration: 620,
      ease: 'outExpo',
      enterFrom: {
        opacity: 0,
        scale: 0.96,
      },
      leaveTo: {
        opacity: 0,
        scale: 0.98,
      },
    });

    const closeModal = (event?: Event) => {
      event?.preventDefault();
      const layout = modalLayout.current;
      if (!$dialog.open || !layout) return;

      layout.update(() => {
        $dialog.close();
        const buttons = utils.$('.usecase-dialog-trigger') as HTMLButtonElement[];
        const $item = buttons.find((item) => item.classList.contains('is-open'));
        $item?.classList.remove('is-open');
        $item?.focus();
      }, {
        duration: 420,
        ease: 'outExpo',
      });

      window.setTimeout(() => {
        if (!$dialog.open) $dialog.innerHTML = '';
      }, 440);
    };

    $dialog.addEventListener('cancel', closeModal);
    $dialog.addEventListener('click', closeModal);

    return () => {
      $dialog.removeEventListener('cancel', closeModal);
      $dialog.removeEventListener('click', closeModal);
      modalLayout.current?.revert();
    };
  }, []);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const $dialog = dialogRef.current;
    const layout = modalLayout.current;
    const $item = event.currentTarget.closest('.item') as HTMLElement | null;
    if (!$dialog || !layout || !$item) return;

    const $clone = $item.cloneNode(true) as HTMLElement;
    $clone.classList.add('is-modal');
    $clone.classList.remove('hover:-translate-y-1');
    $clone.removeAttribute('data-duration');
    $clone.removeAttribute('aria-label');
    $clone.setAttribute('tabindex', '-1');

    $dialog.innerHTML = '';
    $dialog.appendChild($clone);
    layout.update(() => {
      $dialog.showModal();
      $item.classList.add('is-open');
    }, {
      duration: Number($item.dataset.duration) || 680,
      ease: 'outExpo',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative overflow-hidden bg-white py-24 transition-colors duration-500 dark:bg-slate-950 md:py-32"
    >
      <motion.div
        style={{ y: railY }}
        className="pointer-events-none absolute left-6 top-28 hidden h-[68%] w-px bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent lg:block"
      />
      <motion.div
        style={{ y: railY }}
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{t('cases_badge')}</span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-white md:text-6xl">
              {t('cases_title_1')} <br />
              <span className="text-emerald-500">{t('cases_title_2')}</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg lg:justify-self-end">
            {t('cases_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {cases.map((c, idx) => (
            <motion.button
              key={c.id}
              type="button"
              data-duration={c.duration}
              onClick={openModal}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: 'easeOut' }}
              className="item usecase-dialog-trigger usecase-card group relative min-h-[26rem] overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-emerald-400/40"
              aria-label={c.title}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`usecase-pill grid h-12 w-12 place-items-center rounded-lg border ${c.tone}`}>
                  {c.icon}
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
              </div>

              <div className="mt-14">
                <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">{c.subtitle}</h3>
                <h2 className="mb-5 text-2xl font-black leading-tight text-slate-950 dark:text-white">
                  {c.title}
                </h2>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                  {c.desc}
                </p>
              </div>

              <div className="usecase-metric absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400">{t('cases_metric_label')}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {c.metric}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="layout-dialog"
        className="usecase-layout-dialog m-auto w-[min(42rem,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-slate-950 outline-none dark:text-white"
        aria-label="Use case detail"
      />
    </section>
  );
}
