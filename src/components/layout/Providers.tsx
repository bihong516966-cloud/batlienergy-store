'use client';

import { CartProvider } from '@/lib/cart/cart-context';
import { ChatProvider } from '@/components/ai/ChatContext';
import AIChatbot from '@/components/ai/AIChatbot';

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <CartProvider>
      <ChatProvider>
        {children}
        <AIChatbot locale={locale} />
      </ChatProvider>
    </CartProvider>
  );
}
