import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, User, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  source?: string;
}

export const AIChatbotWidget: React.FC = () => {
  const { courses } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am SHEK\'sLMS Intelligence Bot. Ask me anything about our enterprise courses, syllabus, live industrial projects, batch timings, or certifications.',
      source: "SHEK'sLMS Knowledge Base",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Which courses offer hands-on projects?',
    'What is the Full-Stack TS schedule?',
    'Who developed SHEK\'sLMS?',
    'How do mock interviews work?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let source = '';

      const lower = query.toLowerCase();

      if (lower.includes('project') || lower.includes('capstone') || lower.includes('teach')) {
        reply =
          'Every course at SHEK\'sLMS includes an intensive 4-6 week Industrial Capstone Project. We teach via real-world scenarios: students design architecture, commit code to GitHub, attend 1-on-1 mentor code reviews, and defend their implementation in a live presentation.';
        source = 'Curriculum & Project Pedagogy Framework';
      } else if (lower.includes('shekanna') || lower.includes('develop') || lower.includes('who') || lower.includes('phone') || lower.includes('contact')) {
        reply =
          'SHEK\'sLMS was designed and architected by Shekanna H, Founder & Lead Architect based in Bengaluru. For platform questions or enterprise deployments, contact Shekanna H at +91 7022615394 or email shekanna@shekslms.com.';
        source = 'Platform Leadership & Architecture Registry';
      } else if (lower.includes('fullstack') || lower.includes('typescript') || lower.includes('react') || lower.includes('schedule') || lower.includes('timing')) {
        reply =
          'Our "Full-Stack TypeScript & Enterprise React 19" course is led by Shekanna H. Batches run Tue, Thu, Sat from 8:00 PM - 9:30 PM IST, starting November 15, 2026. It includes a full Real-Time Multi-Tenant Collaboration Platform capstone project.';
        source = 'Course Catalog: Full-Stack TypeScript 2026';
      } else if (lower.includes('interview') || lower.includes('placement')) {
        reply =
          'SHEK\'sLMS includes a built-in Technical Mock & Placement Interview schedule. Learners are paired with senior architects for live 1-on-1 mock interviews, scoring rubrics, and detailed feedback to guarantee job readiness.';
        source = 'Placement & Interview Preparation Module';
      } else if (lower.includes('cyber') || lower.includes('security')) {
        reply =
          'The "Enterprise Cybersecurity Essentials 2026" course is instructed by Ananya Iyer (Mon-Fri 7:30 PM IST, starting Nov 10, 2026). It covers threat hygiene, FIDO2 MFA, and includes the "Multi-Cloud Zero-Trust SecOps Pipeline" capstone.';
        source = 'Course Catalog: Cybersecurity Essentials';
      } else {
        reply = `We offer ${courses.length} comprehensive enterprise tracks spanning Cybersecurity, Full-Stack TypeScript, and Generative AI. You can explore full syllabus modules and enroll from the Courses tab.`;
        source = 'SHEK\'sLMS Course Directory';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          source,
        },
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-blue-500/30 hover:scale-105 transition-all group"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <span>Ask SHEK's AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 flex flex-col h-[480px] overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">SHEK's AI Advisor</h4>
                <p className="text-[10px] text-blue-100">Live Course & Project Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${
                  m.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border border-slate-200'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  {m.source && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[9px] text-blue-600 font-semibold">
                      <BookOpen className="w-3 h-3 shrink-0" />
                      <span className="truncate">Source: {m.source}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Bot className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                <span>SHEK's AI is researching...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-medium text-slate-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-slate-100">
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
                placeholder="Ask about syllabus, projects, timings..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
