"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "./ChatContext";
import { ChatMessage, generateAIResponse } from "@/lib/chatbot/knowledge";
import { tx } from "@/lib/i18n/display";

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[86%] gap-3">
        {!isUser && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F4EE]">
            <Bot className="h-4 w-4 text-[#168C5A]" />
          </div>
        )}
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser ? "bg-[#111816] text-white" : "border border-[#D7DDD9] bg-[#F8FAF9] text-[#111816]"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
          <p className={isUser ? "mt-2 text-xs text-white/60" : "mt-2 text-xs text-[#5E6A65]"}>
            {message.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        {isUser && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8ECEA]">
            <User className="h-4 w-4 text-[#36423E]" />
          </div>
        )}
      </div>
    </div>
  );
}

function QuickActions({ locale, onAction }: { locale: string; onAction: (message: string) => void }) {
  const actions = [
    tx(locale, "I need a bulk quote", "我需要批發報價"),
    tx(locale, "Which battery fits my application?", "哪種電池適合我的用途？"),
    tx(locale, "What certificates are available?", "可以提供哪些認證文件？"),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action}
          onClick={() => onAction(action)}
          className="rounded-md border border-[#D7DDD9] bg-white px-3 py-2 text-xs font-medium text-[#36423E] hover:border-[#168C5A] hover:text-[#168C5A]"
        >
          {action}
        </button>
      ))}
    </div>
  );
}

function MessageList({ locale, messages, isTyping }: { locale: string; messages: ChatMessage[]; isTyping: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col justify-center p-5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#E7F4EE]">
          <Sparkles className="h-6 w-6 text-[#168C5A]" />
        </div>
        <h3 className="text-lg font-semibold text-[#111816]">
          {tx(locale, "Batlienergy RFQ Assistant", "Batlienergy 詢價助手")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5E6A65]">
          {tx(locale, "Ask about battery models, MOQ, certificates, shipping, or quote preparation.", "可詢問電池型號、起訂量、認證、運輸或報價準備。")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isTyping && (
        <div className="flex items-center gap-2 text-sm text-[#5E6A65]">
          <Bot className="h-4 w-4 text-[#168C5A]" />
          {tx(locale, "Preparing a reply...", "正在整理回覆...")}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default function AIChatbot({ locale }: { locale: string }) {
  const { messages, addMessage, clearMessages, isOpen, closeChat, openChat, isTyping, setIsTyping } = useChat();
  const [input, setInput] = useState("");

  const sendMessage = async (text: string) => {
    const clean = text.trim();
    if (!clean || isTyping) return;

    addMessage("user", clean);
    setInput("");
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    addMessage("assistant", generateAIResponse(clean));
    setIsTyping(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(input);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={openChat}
          className="flex items-center gap-2 rounded-full border border-[#D7DDD9] bg-white px-4 py-3 text-sm font-semibold text-[#111816] shadow-lg hover:border-[#168C5A] hover:text-[#168C5A]"
        >
          <MessageCircle className="h-5 w-5" />
          {tx(locale, "RFQ Assistant", "詢價助手")}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={closeChat} />
      <div className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[80vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-[#D7DDD9] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#D7DDD9] bg-[#F8FAF9] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111816]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#111816]">{tx(locale, "RFQ Assistant", "詢價助手")}</h3>
              <p className="text-xs text-[#5E6A65]">{tx(locale, "Battery sourcing support", "電池採購支援")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={clearMessages} className="rounded-md p-2 text-[#5E6A65] hover:bg-[#E8ECEA]" title="Clear chat">
              <Trash2 className="h-4 w-4" />
            </button>
            <button onClick={closeChat} className="rounded-md p-2 text-[#5E6A65] hover:bg-[#E8ECEA]" title="Close chat">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        <MessageList locale={locale} messages={messages} isTyping={isTyping} />

        {!messages.length && (
          <div className="border-t border-[#D7DDD9] bg-[#F8FAF9] p-4">
            <QuickActions locale={locale} onAction={sendMessage} />
          </div>
        )}

        <div className="flex gap-2 border-t border-[#D7DDD9] bg-white p-4">
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tx(locale, "Ask about products, MOQ, shipping...", "詢問產品、起訂量、運輸...")}
            disabled={isTyping}
            className="border-[#C9D2CE] bg-white text-[#111816]"
          />
          <Button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping} className="bg-[#111816] text-white hover:bg-[#2A3330]">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
