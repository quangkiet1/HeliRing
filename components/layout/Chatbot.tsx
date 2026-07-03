import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/providers/LanguageProvider';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export default function Chatbot({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Synchronize initial greeting when language toggles
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: t('chat_greeting'),
        timestamp: new Date()
      }
    ]);
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    t('chat_quick_1'),
    t('chat_quick_2'),
    t('chat_quick_3'),
    t('chat_quick_4')
  ];

  // Local knowledge base for fast, bulletproof fallback responses
  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    const isEn = language === 'en';

    if (q.includes('pin') || q.includes('sạc') || q.includes('năng lượng') || q.includes('charge') || q.includes('battery') || q.includes('power')) {
      return isEn 
        ? 'HeliRing Pro boasts an ultra-durable battery life of up to 7 days of continuous tracking on a single charge. The included wireless charger provides a full quick charge within 1.5 hours.'
        : 'HeliRing Pro sở hữu thời lượng pin cực kỳ bền bỉ lên đến 7 ngày hoạt động liên tục chỉ với một lần sạc nhờ tích hợp pin sạc micro-density siêu mỏng. Đế sạc không dây đi kèm giúp sạc đầy nhanh chóng trong vòng 1.5 giờ.';
    }
    if (q.includes('nặng') || q.includes('nhe') || q.includes('trọng lượng') || q.includes('gam') || q.includes('size') || q.includes('weight') || q.includes('gram')) {
      return isEn
        ? 'The HeliRing Pro smart ring is ultra-lightweight, weighing starting from just 2.8g (depending on the ring size) with a sleek thickness of 2.5mm. We offer 8 sizes from US 6 to US 13, and include a free home sizing kit.'
        : 'Nhẫn thông minh HeliRing Pro có trọng lượng siêu nhẹ chỉ từ 2.8g (tùy thuộc vào size nhẫn) và độ mỏng kinh ngạc 2.5mm. Chúng tôi cung cấp đầy đủ 8 kích cỡ từ size US 6 đến US 13 và có tặng kèm bộ Kit đo ngón tay miễn phí tại nhà để bạn chọn size chuẩn nhất.';
    }
    if (q.includes('chất liệu') || q.includes('titan') || q.includes('vật liệu') || q.includes('material') || q.includes('titanium')) {
      return isEn
        ? 'The ring is crafted from aerospace-grade Titanium alloy (Grade 5), coated with a medical-grade hypoallergenic resin on the inner shell to prevent allergies, ensuring premium skin safety and a natural 24/7 feel.'
        : 'Nhẫn được chế tác từ hợp kim Titanium cấp hàng không vũ trụ (Grade 5), phủ lớp nhựa sinh học y tế (Hypoallergenic Resin) ở mặt trong giúp chống dị ứng 100%, bảo vệ da tay và mang lại cảm giác đeo vô cùng tự nhiên 24/7.';
    }
    if (q.includes('chống nước') || q.includes('nước') || q.includes('bơi') || q.includes('tắm') || q.includes('waterproof') || q.includes('swim') || q.includes('water')) {
      return isEn
        ? 'HeliRing Pro supports IP68 water/dust resistance and holds a water pressure rating of 10ATM. You can wear it confidently while washing hands, showering, swimming, or sweating during intense workouts.'
        : 'HeliRing Pro hỗ trợ chuẩn kháng nước kháng bụi IP68 và chịu áp lực nước lên tới 10ATM. Bạn hoàn toàn có thể đeo nhẫn khi rửa tay, tắm, bơi lội hoặc vận động thể thao ra mồ hôi mà không lo hư hỏng.';
    }
    if (q.includes('cảm biến') || q.includes('đo') || q.includes('sức khỏe') || q.includes('tim') || q.includes('spo2') || q.includes('giấc ngủ') || q.includes('sensor') || q.includes('heart') || q.includes('sleep') || q.includes('stress')) {
      return isEn
        ? 'HeliRing Pro is equipped with a clinical-grade PPG optical sensor array v4, tracking 24/7 key biological parameters: Heart Rate (HR), blood oxygen (SpO2), Heart Rate Variability (HRV), sleep cycles (Light/Deep/REM), skin temp, and Stress levels.'
        : 'HeliRing Pro được trang bị hệ thống cảm biến quang học PPG Array v4 lâm sàng, theo dõi liên tục 24/7 các chỉ số: Nhịp tim (HR), Nồng độ oxy máu (SpO2), Biến thiên nhịp tim (HRV), Chu kỳ giấc ngủ (nông/sâu/REM), Nhiệt độ da và Chỉ số Stress.';
    }
    if (q.includes('giá') || q.includes('mua') || q.includes('bao nhiêu tiền') || q.includes('đặt') || q.includes('price') || q.includes('buy') || q.includes('order') || q.includes('cost')) {
      return isEn
        ? 'HeliRing Pro is currently available for Pre-order with an exclusive privilege of 25% off. Please leave your email address in the registration form at the bottom of the page to receive your discount!'
        : 'Hiện tại HeliRing Pro đang có chương trình đặt mua trước (Pre-order) với ưu đãi đặc quyền giảm ngay 25% kèm quà tặng sách cẩm nang điện tử. Bạn hãy để lại thông tin email ở form đăng ký cuối trang để nhận mã giảm giá và hướng dẫn đặt hàng sớm nhất!';
    }
    return isEn
      ? 'HeliRing Pro is a next-generation smart health ring, lightweight at 2.8g and crafted from Titanium. It monitors 24/7 heart rate, sleep, SpO2, and stress via the HeliHealth companion app. Do you have any other questions regarding specs or orders?'
      : 'HeliRing Pro là nhẫn sức khỏe thông minh thế hệ mới, mỏng nhẹ 2.8g chế tác từ Titanium. Nhẫn giúp bạn theo dõi 24/7 nhịp tim, giấc ngủ, SpO2, stress thông qua ứng dụng HeliHealth trên điện thoại. Bạn cần thêm thông tin gì về cấu tạo, tính năng hay chính sách giao hàng của sản phẩm không?';
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { sender: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        // Send actual API request to Gemini
        const systemPrompt = language === 'vi'
          ? `Bạn là trợ lý AI chuyên nghiệp và thân thiện của thương hiệu HeliCorp, tư vấn bán hàng và giải đáp thắc mắc về chiếc nhẫn sức khỏe thông minh HeliRing Pro. 
            Thông số sản phẩm: nặng 2.8g, mỏng 2.5mm, chất liệu Titanium cao cấp chống xước, chống nước IP68/10ATM, pin dùng 7 ngày, có cảm biến PPG đo nhịp tim, SpO2, HRV, chất lượng giấc ngủ và stress liên tục 24/7. Có tặng kèm bộ đo size ngón tay.
            Yêu cầu trả lời: Ngắn gọn (dưới 4 câu), lịch sự, tiếng Việt tự nhiên, thuyết phục khách hàng mua sản phẩm hoặc đăng ký nhận cẩm nang ở cuối trang.
            Câu hỏi của khách hàng: "${text}"`
          : `You are a professional and friendly AI assistant for HeliCorp, consulting and answering queries about the HeliRing Pro smart health ring.
            Product specs: weight 2.8g, thickness 2.5mm, premium scratch-resistant Titanium, IP68/10ATM water resistance, 7-day battery life, clinical PPG sensor measuring HR, SpO2, HRV, sleep quality, and stress 24/7. Free finger sizing kit included.
            Response requirements: Concise (under 4 sentences), polite, natural English, persuade customer to buy or register for the guide at the bottom of the page.
            Customer question: "${text}"`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt
                    }
                  ]
                }
              ]
            })
          }
        );

        if (!response.ok) {
          throw new Error('Gemini API Error');
        }

        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || getLocalResponse(text);
        
        setMessages(prev => [...prev, { sender: 'bot', text: replyText, timestamp: new Date() }]);
      } else {
        // Fallback simulation mode
        setTimeout(() => {
          const replyText = getLocalResponse(text);
          setMessages(prev => [...prev, { sender: 'bot', text: replyText, timestamp: new Date() }]);
        }, 800);
      }
    } catch (error) {
      // Fallback on error
      setTimeout(() => {
        const replyText = getLocalResponse(text);
        setMessages(prev => [...prev, { sender: 'bot', text: replyText, timestamp: new Date() }]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden flex-col items-end sm:flex sm:bottom-6 sm:right-6">
      
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mb-4 flex h-[min(500px,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 sm:h-[500px] sm:w-[380px]"
          >
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    HeliHealth AI
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">{t('chat_online')}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={language === 'vi' ? 'Đóng trợ lý AI' : 'Close AI assistant'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-3.5 rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-[10px] font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-slate-500 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2"
            >
              <label htmlFor="chatbot-message" className="sr-only">
                {t('chat_placeholder')}
              </label>
              <input
                id="chatbot-message"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('chat_placeholder')}
                autoComplete="off"
                className="flex-1 bg-slate-100 dark:bg-slate-900 border-none outline-none focus:ring-1 focus:ring-emerald-500/50 px-4 py-2.5 rounded-2xl text-xs text-slate-800 dark:text-slate-200"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-2xl bg-emerald-500 disabled:bg-emerald-200 dark:disabled:bg-emerald-900 disabled:text-white text-white flex items-center justify-center hover:bg-emerald-600 transition-all shrink-0 cursor-pointer"
                aria-label={language === 'vi' ? 'Gửi tin nhắn cho trợ lý AI' : 'Send message to AI assistant'}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:h-14 sm:w-14"
        aria-label={isOpen ? (language === 'vi' ? 'Đóng trợ lý AI' : 'Close AI assistant') : (language === 'vi' ? 'Mở trợ lý AI' : 'Open AI assistant')}
        aria-expanded={isOpen}
      >
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping pointer-events-none" />
        
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white dark:border-slate-950 animate-pulse" />
          </div>
        )}

        {/* Hover label tooltip */}
        <div className="absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {language === 'vi' ? 'Hỏi trợ lý AI ⚡' : 'Ask AI Assistant ⚡'}
        </div>
      </motion.button>

    </div>
  );
}
