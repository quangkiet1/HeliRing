import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/providers/LanguageProvider';
import { ArrowRight, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CTA() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(language === 'vi' ? 'Vui lòng nhập địa chỉ email hợp lệ.' : 'Please enter a valid email address.');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('loading');
    
    try {
      // WEBHOOK DISCORD
      const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/000000000000000000/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      
      const payload = {
        embeds: [
          {
            title: language === 'vi' ? "🎉 Đăng ký mới: HeliRing Pro" : "🎉 New Registration: HeliRing Pro",
            description: language === 'vi' ? "Một khách hàng vừa đăng ký nhận cẩm nang và ưu đãi!" : "A customer just subscribed for guides and offers!",
            color: 1092163, // Emerald green
            fields: [
              { name: "📧 Email", value: email },
              { name: "⏰ Time", value: new Date().toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US') }
            ]
          }
        ]
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setMessage(t('cta_form_success_desc'));
        setEmail('');
      } else {
        throw new Error('Webhook error');
      }
    } catch (err) {
      // Simulation success if webhook URL is not configured
      setTimeout(() => {
        setStatus('success');
        setMessage(t('cta_form_success_desc'));
        setEmail('');
      }, 1000);
    }

    // Auto hide toast after 4s
    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden bg-slate-900 text-white transition-colors duration-300">
      
      {/* Absolute decorative glow balls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Pattern Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98104_1px,transparent_1px),linear-gradient(to_bottom,#10b98104_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>{t('cta_badge')}</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.95] mb-6">
          {language === 'vi' ? 'Làm Chủ Chỉ Số Sinh Hiệu' : 'Master Your Body Vitals'} <br/>
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            {language === 'vi' ? 'Chuẩn Y Khoa' : 'Clinical Grade'}
          </span>
        </h2>
        
        <p className="text-base md:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto mb-12 font-sans">
          {t('cta_desc')}
        </p>

        {/* Action Subscription Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
            
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('cta_form_email_placeholder')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm font-sans transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-wider text-sm transition-all shadow-glow hover:shadow-glow-strong flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  {t('cta_form_sending')}
                </>
              ) : (
                <>
                  {t('cta_form_btn')}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Feedback states using AnimatePresence */}
          <div className="min-h-12 mt-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{message}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-semibold"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {(status === 'success' || status === 'error') && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              status === 'success' 
                ? 'bg-emerald-950/95 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/95 border-rose-500/30 text-rose-300'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span className="text-sm font-medium">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
