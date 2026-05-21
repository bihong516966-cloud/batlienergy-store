'use client';

import { CartProvider } from '@/lib/cart/cart-context';
import { ChatProvider } from '@/components/ai/ChatContext';
import AIChatbot from '@/components/ai/AIChatbot';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ChatProvider>
        {children}
        <AIChatbot />
      </ChatProvider>
    </CartProvider>
  );
}
