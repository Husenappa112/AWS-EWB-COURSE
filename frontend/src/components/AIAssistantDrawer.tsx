import React, { useState } from 'react';
import { X, Sparkles, Send, BookOpen, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  sourceReference?: string;
  timestamp: string;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  currentLessonTitle?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  courseTitle,
  currentLessonTitle,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello Arjun! I am your AI Learning Assistant for "${courseTitle}". Ask me any conceptual question or policy clarification about your training material, and I will cite the exact course section.`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'How do I identify spear phishing in 2026?',
    'Why is FIDO2 more secure than SMS codes?',
    'What is the SOP if the CEO asks for a wire transfer?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Intelligent contextual response with source citation
    setTimeout(() => {
      let reply = '';
      let source = '';

      const lower = query.toLowerCase();
      if (lower.includes('spear') || lower.includes('phishing')) {
        reply =
          'In 2026, spear phishing leverages synthetic voice cloning and executive pretexting. Top indicators include unusual urgency, subtle domain misspellings, and unexpected QR codes (quishing) in invoices.';
        source = 'Lesson 1.1 — Recognizing Spear Phishing & AI Spoofs (Threat Hygiene SOP)';
      } else if (lower.includes('fido') || lower.includes('mfa') || lower.includes('sms')) {
        reply =
          'Hardware Security Keys (FIDO2 / WebAuthn) are immune to adversary-in-the-middle attacks because they are cryptographically bound to the authentic domain URL. SMS OTPs can be intercepted via SIM-swapping or reverse proxies.';
        source = 'Lesson 1.2 — Multi-Factor Authentication & Device Hygiene';
      } else if (lower.includes('ceo') || lower.includes('wire') || lower.includes('transfer')) {
        reply =
          'Never execute financial requests received via chat or external messaging. Corporate security compliance mandates out-of-band verification through internal enterprise communication channels and standard approvals.';
        source = 'Module 2 — Corporate Incident & Financial Verification Standard';
      } else {
        reply = `Based on "${courseTitle}", always ensure you apply strict verification protocols, keep software updated, and complete continuous module assessments to retain security compliance.`;
        source = `Course Syllabus — ${currentLessonTitle || 'Core Curriculum'}`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        sourceReference: source,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>AI Learning Assistant</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                2026 Engine
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 truncate max-w-[240px]">
              {currentLessonTitle || courseTitle}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-blue-400 border border-slate-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 text-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-750'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {msg.sourceReference && (
                <div className="mt-2.5 pt-2 border-t border-slate-700/80 flex items-center gap-1.5 text-[10px] text-blue-300 font-medium">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Ref: {msg.sourceReference}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Bot className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Analyzing course materials...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <p className="text-[10px] font-semibold uppercase text-slate-500 mb-2">Suggested Inquiries:</p>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-750 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this course..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
