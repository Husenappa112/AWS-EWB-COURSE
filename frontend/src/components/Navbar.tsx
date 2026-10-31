import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import {
  GraduationCap,
  Shield,
  Briefcase,
  Flame,
  Award,
  ChevronDown,
  Info,
  Building,
} from 'lucide-react';

interface NavbarProps {
  onOpenDemoInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoInfo }) => {
  const { currentUser, currentRole, switchRole, gamification } = useApp();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: any; color: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin', icon: Shield, color: 'text-purple-600 bg-purple-50' },
    { role: 'ORG_ADMIN', label: 'Org Admin', icon: Building, color: 'text-blue-600 bg-blue-50' },
    { role: 'TRAINER', label: 'Trainer', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { role: 'LEARNER', label: 'Learner', icon: GraduationCap, color: 'text-amber-600 bg-amber-50' },
  ];

  const currentRoleConfig = roles.find((r) => r.role === currentRole) || roles[3];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  SHEK's<span className="text-blue-600">LMS</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {currentUser?.organizationName || 'Cloud LMS Platform'}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Role Switcher, Gamification, and Profile */}
          <div className="flex items-center gap-3">
            {/* Gamification Streak & Points (Only shown for Learner) */}
            {currentRole === 'LEARNER' && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200/60 text-amber-900 text-xs font-semibold">
                <span className="flex items-center gap-1 text-amber-600">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {gamification.currentStreak}d Streak
                </span>
                <span className="w-1 h-1 rounded-full bg-amber-300" />
                <span className="flex items-center gap-1 text-amber-700">
                  <Award className="w-4 h-4 text-amber-600" />
                  {gamification.points} pts
                </span>
              </div>
            )}

            {/* Quick 1-Click Role Switcher for Portfolio Demonstration */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${currentRoleConfig.color} border-slate-300 hover:border-slate-400`}
                title="Switch Evaluation Role"
              >
                <currentRoleConfig.icon className="w-4 h-4" />
                <span>{currentRoleConfig.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Role Portal
                    </p>
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isActive = r.role === currentRole;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-1 rounded-md ${r.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left flex-1">
                          <p>{r.label}</p>
                          <p className="text-[10px] text-slate-400 font-normal">
                            {r.role === 'SUPER_ADMIN' && 'Global platform governance'}
                            {r.role === 'ORG_ADMIN' && 'Tenant administration'}
                            {r.role === 'TRAINER' && 'Course authoring & grading'}
                            {r.role === 'LEARNER' && 'Course player & quizzes'}
                          </p>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Demo Credentials Info Button */}
            <button
              onClick={onOpenDemoInfo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="View Demo Credentials & Architecture"
            >
              <Info className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Demo Guide</span>
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser?.avatarUrl}
                alt={currentUser?.firstName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
