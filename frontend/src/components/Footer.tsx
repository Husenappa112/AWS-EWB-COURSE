import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code2,
} from 'lucide-react';

interface FooterProps {
  onOpenDemoInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoInfo }) => {
  const { setActiveNavTab, setAuthModalType, isLoggedIn } = useApp();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Developer Column */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setActiveNavTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">
                SHEK's<span className="text-blue-400">LMS</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The next-generation cloud-native Learning Management System built for corporate upskilling, automated AI assessment generation, and industrial capstone mentorship.
            </p>

            {/* Prominent Developer Attribution Box */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Principal Architect
                </span>
                <span className="text-xs font-bold text-white">Shekanna H</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href="tel:+917022615394" className="hover:text-white transition-colors">
                    +91 7022615394
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:shekanna@shekslms.com" className="hover:text-white transition-colors">
                    shekanna@shekslms.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveNavTab('home')}
                  className="hover:text-white transition-colors"
                >
                  Overview & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('courses')}
                  className="hover:text-white transition-colors"
                >
                  Courses & Full Syllabus
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('projects')}
                  className="hover:text-white transition-colors"
                >
                  Industrial Capstone Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('about')}
                  className="hover:text-white transition-colors"
                >
                  Architecture & Developer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNavTab('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Role Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              User Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenDemoInfo}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Super Admin Portal</span>
                  <span className="text-[10px] text-purple-400">(Shekanna H)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDemoInfo}
                  className="hover:text-white transition-colors"
                >
                  Organization Admin Portal
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDemoInfo}
                  className="hover:text-white transition-colors"
                >
                  Trainer & Grading Studio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDemoInfo}
                  className="hover:text-white transition-colors"
                >
                  Learner & Quiz Dashboard
                </button>
              </li>
              {!isLoggedIn && (
                <li className="pt-2">
                  <button
                    onClick={() => setAuthModalType('login')}
                    className="text-blue-400 font-bold hover:underline"
                  >
                    Quick Sign In &rarr;
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* 2026 Tech Stack Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Technology Stack
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>React 19 & TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Node.js, Express & Prisma</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Google Gemini AI Engine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Multi-Tenant Data Isolation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Gamification & Streaks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SHEK'sLMS. All rights reserved. Architected by Shekanna H.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveNavTab('about')}
              className="hover:text-slate-400 transition-colors"
            >
              System Overview
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveNavTab('contact')}
              className="hover:text-slate-400 transition-colors"
            >
              Direct Contact (+91 7022615394)
            </button>
            <span>·</span>
            <button
              onClick={onOpenDemoInfo}
              className="hover:text-slate-400 transition-colors"
            >
              Evaluation Demo Guide
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
