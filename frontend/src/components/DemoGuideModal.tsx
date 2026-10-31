import React from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { X, CheckCircle2, Shield, Building, Briefcase, GraduationCap, Phone, Sparkles } from 'lucide-react';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({ isOpen, onClose }) => {
  const { switchRole } = useApp();

  if (!isOpen) return null;

  const credentials: {
    role: UserRole;
    title: string;
    person: string;
    email: string;
    pass: string;
    org: string;
    icon: any;
    color: string;
  }[] = [
    {
      role: 'SUPER_ADMIN',
      title: 'Super Admin',
      person: 'Shekanna H (Creator)',
      email: 'shekanna@shekslms.com',
      pass: 'Password@123',
      org: 'Global Platform Control (Phone: 7022615394)',
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      role: 'ORG_ADMIN',
      title: 'Organization Admin',
      person: 'CloudScale Org Administrator',
      email: 'admin@cloudscale.com',
      pass: 'Password@123',
      org: 'CloudScale Technologies',
      icon: Building,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      role: 'TRAINER',
      title: 'Trainer / Instructor',
      person: 'Ananya Iyer (L&D Lead)',
      email: 'ananya@cloudscale.com',
      pass: 'Password@123',
      org: 'CloudScale Technologies',
      icon: Briefcase,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      role: 'LEARNER',
      title: 'Learner / Employee',
      person: 'Arjun Verma (Engineer)',
      email: 'arjun@cloudscale.com',
      pass: 'Password@123',
      org: 'CloudScale Technologies',
      icon: GraduationCap,
      color: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                SHEK's<span className="text-blue-600">LMS</span> Evaluation Guide
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Live Demo
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enterprise Portfolio Showcase · Designed & Built by Shekanna H (Bengaluru)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {/* Developer Callout */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Architected & Developed by Shekanna H</span>
              </div>
              <p className="text-xs text-blue-700 mt-0.5">
                Full-Stack Cloud & Multi-Tenant LMS Architecture. Questions or hiring inquiry?
              </p>
            </div>
            <a
              href="tel:+917022615394"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm shrink-0 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>7022615394</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {credentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div
                  key={cred.role}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all group shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${cred.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{cred.title}</h4>
                        <p className="text-[11px] font-medium text-slate-600">{cred.person}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        switchRole(cred.role);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all shrink-0"
                    >
                      Login
                    </button>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-200/70 text-[11px] text-slate-500 space-y-0.5 font-mono">
                    <p className="truncate text-slate-700 font-semibold">{cred.org}</p>
                    <p className="truncate">Email: {cred.email}</p>
                    <p>Password: {cred.pass}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Verified Production Capabilities:
            </h4>
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Multi-tenant isolation & data partitioning</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Google Gemini AI course & quiz generation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Full-Stack capstone project mentorship</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Mock interview scheduling & calendar links</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
