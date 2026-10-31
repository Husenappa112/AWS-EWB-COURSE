import React from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { X, CheckCircle2, Shield, Building, Briefcase, GraduationCap } from 'lucide-react';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({ isOpen, onClose }) => {
  const { switchRole } = useApp();

  if (!isOpen) return null;

  const credentials: { role: UserRole; title: string; email: string; pass: string; org: string; icon: any }[] = [
    {
      role: 'SUPER_ADMIN',
      title: 'Super Admin',
      email: 'superadmin@shekslms.com',
      pass: 'Password@123',
      org: 'Global Platform',
      icon: Shield,
    },
    {
      role: 'ORG_ADMIN',
      title: 'Organization Admin',
      email: 'admin@acme.com',
      pass: 'Password@123',
      org: 'Acme Corporation',
      icon: Building,
    },
    {
      role: 'TRAINER',
      title: 'Trainer / Instructor',
      email: 'trainer@acme.com',
      pass: 'Password@123',
      org: 'Acme Corporation',
      icon: Briefcase,
    },
    {
      role: 'LEARNER',
      title: 'Learner / Employee',
      email: 'learner@acme.com',
      pass: 'Password@123',
      org: 'Acme Corporation',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">SHEK'sLMS Evaluation & Demo Guide</h3>
            <p className="text-xs text-slate-500">Portfolio Demonstration for E2E Management (Bengaluru)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              1-Click Role Exploration
            </h4>
            <p className="text-xs text-blue-700 mt-0.5">
              Select any role below to switch portals instantly and inspect the tailored workflow:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {credentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div
                  key={cred.role}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{cred.title}</h5>
                        <p className="text-[10px] text-slate-500">{cred.org}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        switchRole(cred.role);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
                    >
                      Login as Role
                    </button>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 font-mono">
                    <p className="truncate">Email: {cred.email}</p>
                    <p>Password: {cred.pass}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h5 className="text-xs font-bold text-slate-800">Verified System Architecture:</h5>
            <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Multi-tenant data isolation via Prisma ORM and scoped database entities</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cryptographic password hashing with bcrypt & stateless JWT token validation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Assessment quiz engine with automated grading and pass/fail thresholds</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Gamification engine tracking streaks, level calculation, and milestone badges</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
