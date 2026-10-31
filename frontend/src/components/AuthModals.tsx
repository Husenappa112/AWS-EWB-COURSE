import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, Building, Briefcase, GraduationCap, Lock, Mail, User, Phone } from 'lucide-react';
import type { UserRole } from '../types';

export const AuthModals: React.FC = () => {
  const { authModalType, setAuthModalType, loginAs } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('LEARNER');

  if (!authModalType) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Account created successfully for ${name}! Logging you in as ${role}.`);
    loginAs(role);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 animate-in fade-in zoom-in-95">
        <button
          onClick={() => setAuthModalType(null)}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {authModalType === 'login' ? (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Sign in to SHEK'sLMS</h3>
              <p className="text-xs text-slate-500 mt-1">Enterprise Cloud Learning Management System</p>
            </div>

            {/* 1-Click Quick Demo Access */}
            <div className="mb-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-900 mb-2">
                1-Click Quick Demo Sign-in:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAs('SUPER_ADMIN')}
                  className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-purple-500 text-left transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">Shekanna H</p>
                    <p className="text-[9px] text-purple-600 font-semibold">Super Admin</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAs('LEARNER')}
                  className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-500 text-left transition-all"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">Arjun Verma</p>
                    <p className="text-[9px] text-amber-600 font-semibold">Learner</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAs('TRAINER')}
                  className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-left transition-all"
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">Ananya Iyer</p>
                    <p className="text-[9px] text-emerald-600 font-semibold">Trainer</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAs('ORG_ADMIN')}
                  className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-left transition-all"
                >
                  <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">Vikram Rao</p>
                    <p className="text-[9px] text-blue-600 font-semibold">Org Admin</p>
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@cloudscale.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password@123"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
              >
                Sign In with Credentials
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthModalType('signup')}
                className="font-bold text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Create SHEK'sLMS Account</h3>
              <p className="text-xs text-slate-500 mt-1">Join corporate training & industrial projects</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh K"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@cloudscale.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7022615394"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LEARNER">Learner / Corporate Employee</option>
                  <option value="TRAINER">Trainer / Technical Instructor</option>
                  <option value="ORG_ADMIN">Organization / Department Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create secure password"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all mt-2"
              >
                Create Account & Join
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button
                onClick={() => setAuthModalType('login')}
                className="font-bold text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
