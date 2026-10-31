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
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Bell,
  CheckCheck,
} from 'lucide-react';

interface NavbarProps {
  onOpenDemoInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoInfo }) => {
  const {
    activeNavTab,
    setActiveNavTab,
    isLoggedIn,
    currentUser,
    currentRole,
    switchRole,
    logout,
    gamification,
    setAuthModalType,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const roles: { role: UserRole; label: string; icon: any; color: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin (Shekanna H)', icon: Shield, color: 'text-purple-600 bg-purple-50' },
    { role: 'ORG_ADMIN', label: 'Org Admin', icon: Building, color: 'text-blue-600 bg-blue-50' },
    { role: 'TRAINER', label: 'Trainer (Ananya)', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { role: 'LEARNER', label: 'Learner (Arjun)', icon: GraduationCap, color: 'text-amber-600 bg-amber-50' },
  ];

  const currentRoleConfig = roles.find((r) => r.role === currentRole) || roles[3];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses & Syllabus' },
    { id: 'projects', label: 'Projects & Labs' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white text-[11px] py-1.5 px-4 text-center font-medium">
        <span>🚀 Winter 2026 Enterprise Batches Now Open with Guaranteed Industrial Projects. </span>
        <span className="font-semibold underline ml-1">Architected by Shekanna H (Call: 7022615394)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div
            onClick={() => setActiveNavTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  SHEK's<span className="text-blue-600">LMS</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Enterprise
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Dev: Shekanna H · +91 7022615394
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveNavTab(link.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeNavTab === link.id
                    ? 'text-blue-600 bg-blue-50/70 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {isLoggedIn && (
              <button
                onClick={() => setActiveNavTab('portal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeNavTab === 'portal'
                    ? 'text-white bg-blue-600 shadow-sm'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>My Portal ({currentRoleConfig.label.split(' ')[0]})</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls: Role Switcher, Auth Buttons, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gamification Streak & Points (Only shown for Learner in portal view) */}
            {isLoggedIn && currentRole === 'LEARNER' && (
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

            {/* Quick 1-Click Role Switcher */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${currentRoleConfig.color} border-slate-300 hover:border-slate-400`}
                  title="Switch Role Portal"
                >
                  <currentRoleConfig.icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{currentRoleConfig.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Active Persona
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
                            <p className="font-bold">{r.label}</p>
                            <p className="text-[10px] text-slate-400 font-normal">
                              {r.role === 'SUPER_ADMIN' && 'Managed by Shekanna H'}
                              {r.role === 'ORG_ADMIN' && 'CloudScale Technologies'}
                              {r.role === 'TRAINER' && 'Course author & grading'}
                              {r.role === 'LEARNER' && 'Interviews, exams & player'}
                            </p>
                          </div>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Notification Bell */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Notifications & Alerts"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse ring-2 ring-white" />
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (isLoggedIn && currentRole === 'LEARNER') {
                              setActiveNavTab('portal');
                            }
                            setNotifDropdownOpen(false);
                          }}
                          className={`p-3.5 text-xs cursor-pointer transition-colors ${
                            n.isRead ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/50 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold text-slate-900 leading-snug">{n.title}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Demo Credentials Info Button */}
            <button
              onClick={onOpenDemoInfo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="View Architecture & All Demo Accounts"
            >
              <Info className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Demo Guide</span>
            </button>

            {/* Logged in vs Logged out controls */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.firstName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                />
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModalType('login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthModalType('signup')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveNavTab(link.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activeNavTab === link.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            {isLoggedIn && (
              <button
                onClick={() => {
                  setActiveNavTab('portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-blue-600 bg-blue-50"
              >
                My Portal ({currentRoleConfig.label})
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
