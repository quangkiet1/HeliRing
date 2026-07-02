import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Mail, Phone, MapPin, Activity } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-100 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/60 py-16 md:py-24 overflow-hidden transition-colors duration-300">
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-display font-black text-lg tracking-wider text-slate-900 dark:text-white uppercase">
                HELICORP
              </span>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-sm mb-6">
              {t('footer_desc')}
            </p>

            <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block uppercase tracking-wider">
              &copy; {currentYear} HELICORP JSC. {language === 'vi' ? 'Tất cả quyền được bảo lưu.' : 'All Rights Reserved.'}
            </span>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-4">
              {language === 'vi' ? 'Điều hướng' : 'Navigation'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#problem" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  {t('nav_status')}
                </a>
              </li>
              <li>
                <a href="#tech-showcase" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  {t('nav_sensor')}
                </a>
              </li>
              <li>
                <a href="#portability" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  {t('nav_portability')}
                </a>
              </li>
              <li>
                <a href="#specs" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  {t('nav_specs')}
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate info */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-4">
              {language === 'vi' ? 'Liên hệ' : 'Contact'}
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {language === 'vi' 
                    ? 'Tòa nhà HELI-Tech, Khu công nghệ cao, TP. Thủ Đức, TP. Hồ Chí Minh' 
                    : 'HELI-Tech Building, High-Tech Park, Thu Duc City, Ho Chi Minh City'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span>1900 88 99 00 {language === 'vi' ? '(Phím 2)' : '(Ext 2)'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span>contact@helicorp.vn</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
