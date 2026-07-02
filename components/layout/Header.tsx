import React, { useState, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Sun, Moon, Activity, Menu, X } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 py-4 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-display font-black text-xl tracking-tight uppercase text-slate-900 dark:text-white">
            HELICORP
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
          <a href="#problem" className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t('nav_status')}
          </a>
          <a href="#tech-showcase" className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t('nav_sensor')}
          </a>
          <a href="#portability" className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t('nav_portability')}
          </a>
          <a href="#specs" className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t('nav_specs')}
          </a>
          <a href="#use-cases" className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t('nav_usecases')}
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="h-10 px-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1.5 text-[10px] font-black cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all select-none"
            aria-label="Toggle Language"
          >
            <span className={language === 'vi' ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}>VI</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className={language === 'en' ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}>EN</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* CTA Header Button */}
          <a 
            href="#cta"
            className="px-6 py-2.5 bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-full text-sm font-bold uppercase hover:bg-slate-800 dark:hover:bg-emerald-400 transition-colors shadow-lg shadow-slate-200 dark:shadow-none tracking-wider"
          >
            {t('cta_now')}
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="h-9 px-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1 text-[9px] font-black select-none"
            aria-label="Toggle Language"
          >
            <span className={language === 'vi' ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}>VI</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className={language === 'en' ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}>EN</span>
          </button>

          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-yellow-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-600 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-6 px-6 flex flex-col gap-5 shadow-xl animate-fade-in z-45">
          <a 
            href="#problem" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            {t('nav_status')}
          </a>
          <a 
            href="#tech-showcase" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            {t('nav_sensor')}
          </a>
          <a 
            href="#portability" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            {t('nav_portability')}
          </a>
          <a 
            href="#specs" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            {t('nav_specs')}
          </a>
          <a 
            href="#use-cases" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            {t('nav_usecases')}
          </a>
          <a 
            href="#cta"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center uppercase tracking-wider text-sm shadow-lg shadow-emerald-500/10"
          >
            {t('cta_now')}
          </a>
        </div>
      )}
    </header>
  );
}
