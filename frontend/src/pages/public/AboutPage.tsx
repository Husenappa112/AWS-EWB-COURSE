import React from 'react';
import { DEVELOPER_INFO } from '../../data/mockData';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  GitBranch,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
          About SHEK'sLMS Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Next-Generation Enterprise Learning & Engineering Training
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          SHEK'sLMS was founded with a clear objective: eliminate the gap between passive video tutorials and the high-rigor engineering demands of modern software and security organizations.
        </p>
      </div>

      {/* Developer Profile Spotlight */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt={DEVELOPER_INFO.name}
            className="w-32 h-32 rounded-3xl object-cover ring-4 ring-blue-500/40 shadow-xl shrink-0"
          />
          <div className="space-y-3 text-center sm:text-left flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Lead Architect & Platform Creator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {DEVELOPER_INFO.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Full-Stack Architect specializing in scalable multi-tenant SaaS systems, React 19, Node.js microservices, and applied Google Gemini AI workflows. Based in {DEVELOPER_INFO.location}.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
              <a
                href={`tel:${DEVELOPER_INFO.phone}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-600/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: {DEVELOPER_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{DEVELOPER_INFO.email}</span>
              </a>

              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{DEVELOPER_INFO.location}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm">Multi-Tenant Isolation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Data security enforced with organizationId scoping across Prisma ORM and database entities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <GitBranch className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">Hands-on Capstones</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every learner builds and delivers an end-to-end industrial software or security project with 1-on-1 code reviews.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-slate-900 text-sm">2026 AI Intelligence</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            AI course creator, assessment generator, and contextual learning assistant with source references.
          </p>
        </div>
      </div>
    </div>
  );
};
