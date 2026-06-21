'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { tx } from '@/lib/i18n/display';

export default function FloatingContact({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Buttons */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 pointer-events-none opacity-0'
        }`}
      >
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/8613800138000"
          target="_blank"
          rel="noopener noreferrer"
          title={tx(locale, "WhatsApp Chat", "WhatsApp 聯絡")}
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          style={{ backgroundColor: '#25D366' }}
        >
          <Phone className="h-5 w-5 text-white" />
        </a>

        {/* Email Button */}
        <a
          href="mailto:julian@batelithium.com"
          title={tx(locale, "Email Us", "電郵聯絡")}
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          style={{ backgroundColor: '#111816' }}
        >
          <Mail className="h-5 w-5 text-white" />
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? tx(locale, 'Close', '關閉') : tx(locale, 'Contact Us', '聯絡我們')}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
        style={{
          backgroundColor: '#168C5A',
          boxShadow: isOpen
            ? '0 4px 20px rgba(22, 140, 90, 0.34)'
            : '0 4px 20px rgba(22, 140, 90, 0.26)',
        }}
        aria-label={isOpen ? tx(locale, 'Close contact menu', '關閉聯絡選單') : tx(locale, 'Open contact menu', '開啟聯絡選單')}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
