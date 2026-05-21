'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ShoppingCart,
  FileText,
  Trash2,
  ChevronDown,
  Package,
  Phone,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChat } from './ChatContext';
import {
  generateAIResponse,
  welcomeMessage,
  quickReplies,
  ChatMessage,
} from '@/lib/chatbot/knowledge';

// 深色主题颜色配置
const theme = {
  bg: '#0A1628',
  card: '#111D2E',
  border: '#1E3A5F',
  accent: '#00E676',
  accentHover: '#00C853',
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  userBubble: '#00E676',
  aiBubble: '#1E3A5F',
};

// 消息气泡组件
interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div className="flex gap-3 max-w-[85%]">
        {/* AI头像 */}
        {!isUser && (
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.accent }}
          >
            <Bot className="w-4 h-4" style={{ color: theme.bg }} />
          </div>
        )}

        {/* 消息内容 */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser ? 'rounded-br-sm' : 'rounded-bl-sm'
          }`}
          style={{
            backgroundColor: isUser ? theme.userBubble : theme.aiBubble,
            color: isUser ? theme.bg : theme.text,
          }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <p
            className="text-xs mt-2 opacity-70"
            style={{ color: isUser ? theme.bg : theme.textSecondary }}
          >
            {message.timestamp.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* 用户头像 */}
        {isUser && (
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.aiBubble }}
          >
            <User className="w-4 h-4" style={{ color: theme.text }} />
          </div>
        )}
      </div>
    </div>
  );
}

// 打字指示器
function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex gap-3 max-w-[85%]">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.accent }}
        >
          <Bot className="w-4 h-4" style={{ color: theme.bg }} />
        </div>
        <div
          className="rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2"
          style={{ backgroundColor: theme.aiBubble }}
        >
          <span className="flex gap-1">
            <span
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: theme.textSecondary,
                animationDelay: '0s',
              }}
            />
            <span
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: theme.textSecondary,
                animationDelay: '0.2s',
              }}
            />
            <span
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: theme.textSecondary,
                animationDelay: '0.4s',
              }}
            />
          </span>
          <span className="text-sm" style={{ color: theme.textSecondary }}>
            AI正在输入...
          </span>
        </div>
      </div>
    </div>
  );
}

// 快捷操作按钮
interface QuickActionsProps {
  onAction: (action: string) => void;
}

function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      id: 'product',
      icon: Package,
      label: '产品咨询',
      color: '#3B82F6',
    },
    {
      id: 'quote',
      icon: FileText,
      label: '获取报价',
      color: theme.accent,
    },
    {
      id: 'contact',
      icon: Phone,
      label: '联系客服',
      color: '#8B5CF6',
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:scale-105"
          style={{
            backgroundColor: `${action.color}20`,
            color: action.color,
            border: `1px solid ${action.color}40`,
          }}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </button>
      ))}
    </div>
  );
}

// 消息列表组件
interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: `${theme.accent}20` }}
        >
          <Sparkles className="w-8 h-8" style={{ color: theme.accent }} />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>
          AI智能助手
        </h3>
        <p className="text-sm mb-6" style={{ color: theme.textSecondary }}>
          我可以帮您解答锂电池产品相关问题
        </p>
        <QuickActions onAction={() => {}} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}

// 聊天输入组件
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="p-4 border-t flex gap-2"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.card,
      }}
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="输入您的问题..."
        disabled={disabled}
        className="flex-1"
        style={{
          backgroundColor: theme.bg,
          borderColor: theme.border,
          color: theme.text,
        }}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        className="px-4"
        style={{
          backgroundColor: theme.accent,
          color: theme.bg,
        }}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}

// 聊天头部组件
interface ChatHeaderProps {
  onClose: () => void;
  onClear: () => void;
}

function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  return (
    <div
      className="p-4 border-b flex items-center justify-between"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.accent }}
        >
          <Sparkles className="w-5 h-5" style={{ color: theme.bg }} />
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: theme.text }}>
            AI智能助手
          </h3>
          <p className="text-xs" style={{ color: theme.accent }}>
            BatlieEnergy · 在线
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
          style={{ color: theme.textSecondary }}
          title="清除聊天记录"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-lg transition-colors"
          style={{
            color: theme.textSecondary,
            backgroundColor: 'transparent',
          }}
          title="关闭"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// 侧边栏头部组件（用于FloatingContact按钮）
interface ChatSidebarHeaderProps {
  onClose: () => void;
  onOpenChat: () => void;
}

function ChatSidebarHeader({ onClose, onOpenChat }: ChatSidebarHeaderProps) {
  return (
    <div
      className="p-3 border-b flex items-center justify-between"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.accent }}
        >
          <Sparkles className="w-4 h-4" style={{ color: theme.bg }} />
        </div>
        <span className="font-medium text-sm" style={{ color: theme.text }}>
          AI助手
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenChat}
          className="p-1.5 rounded transition-colors"
          style={{
            color: theme.accent,
            backgroundColor: 'transparent',
          }}
          title="展开聊天"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="p-1.5 rounded transition-colors"
          style={{
            color: theme.textSecondary,
            backgroundColor: 'transparent',
          }}
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 主聊天机器人组件
export default function AIChatbot() {
  const {
    messages,
    addMessage,
    clearMessages,
    isOpen,
    toggleChat,
    closeChat,
    openChat,
    isTyping,
    setIsTyping,
  } = useChat();

  // 发送消息处理
  const handleSendMessage = async (userMessage: string) => {
    // 添加用户消息
    addMessage('user', userMessage);
    setIsTyping(true);

    // 模拟AI响应延迟
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    // 生成AI回复
    const aiResponse = generateAIResponse(userMessage);
    addMessage('assistant', aiResponse);
    setIsTyping(false);
  };

  // 快捷操作处理
  const handleQuickAction = async (action: string) => {
    let message = '';

    switch (action) {
      case 'product':
        message = '我想了解一下你们的锂电池产品';
        break;
      case 'quote':
        message = '请给我一份详细的产品报价';
        break;
      case 'contact':
        message = '我想和人工客服沟通';
        break;
      default:
        message = '你好，我想了解一下你们的产品';
    }

    await handleSendMessage(message);
  };

  // 侧边栏按钮组件（从FloatingContact调用）
  const ChatSidebarButton = () => (
    <button
      onClick={openChat}
      title="AI智能助手"
      className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      style={{
        backgroundColor: theme.accent,
        boxShadow: `0 4px 20px rgba(0, 230, 118, 0.3)`,
      }}
    >
      <Sparkles className="w-5 h-5" style={{ color: theme.bg }} />
      <span className="text-sm font-medium" style={{ color: theme.bg }}>
        AI助手
      </span>
    </button>
  );

  // 如果聊天窗口未打开，返回侧边栏按钮
  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-6 z-50">
        <ChatSidebarButton />
      </div>
    );
  }

  return (
    <>
      {/* 全屏背景遮罩（移动端） */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={closeChat}
      />

      {/* 聊天面板 */}
      <div
        className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[600px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: theme.bg,
          border: `1px solid ${theme.border}`,
        }}
      >
        <ChatHeader onClose={closeChat} onClear={clearMessages} />

        <MessageList messages={messages} isTyping={isTyping} />

        {messages.length === 0 && (
          <div
            className="p-4 border-t"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.card,
            }}
          >
            <p className="text-xs text-center mb-3" style={{ color: theme.textSecondary }}>
              选择快捷操作或直接输入您的问题
            </p>
            <QuickActions onAction={handleQuickAction} />
          </div>
        )}

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </>
  );
}
