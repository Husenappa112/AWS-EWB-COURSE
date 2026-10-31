import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Building,
  User,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    phone: '',
    topic: 'Enterprise Training License',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Get In Touch With The Architecture Team
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Connect With SHEK's<span className="text-blue-600">LMS</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Have questions regarding enterprise onboarding, custom AI course generation, industrial capstone integration, or corporate multi-tenant deployment? Reach out directly to the principal creator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Creator & Super Admin Contact Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Principal Architect & Super Admin
                </span>
                <h2 className="text-2xl font-black mt-2">Shekanna H</h2>
                <p className="text-xs text-blue-200 font-medium">
                  Full-Stack Cloud Architect & Creator of SHEK'sLMS
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Direct Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+917022615394"
                      className="text-sm font-bold text-white hover:text-blue-300 transition-colors"
                    >
                      +91 7022615394
                    </a>
                    <p className="text-[11px] text-slate-400">Available Mon-Sat 9:00 AM - 8:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Email Address
                    </p>
                    <a
                      href="mailto:shekanna@shekslms.com"
                      className="text-sm font-bold text-white hover:text-blue-300 transition-colors"
                    >
                      shekanna@shekslms.com
                    </a>
                    <p className="text-[11px] text-slate-400">Prompt responses within 2 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Location & Innovation Hub
                    </p>
                    <p className="text-sm font-bold text-white">Bengaluru, Karnataka, India</p>
                    <p className="text-[11px] text-slate-400">Silicon Valley of India</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise SLA with dedicated multi-tenant isolation</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-slate-800">Can our company host our own LMS instance?</p>
                <p className="text-slate-500 mt-0.5">
                  Yes. SHEK'sLMS supports single-tenant private cloud VPC deployments or isolated multi-tenant schemas.
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-800">How are student capstone projects evaluated?</p>
                <p className="text-slate-500 mt-0.5">
                  Learners submit GitHub repos and live deployments. Trainers and AI reviewers conduct static code analysis and live video defense sessions.
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-800">Are training batch timings flexible?</p>
                <p className="text-slate-500 mt-0.5">
                  Weekday evening (7:30 PM - 9:30 PM IST) and weekend fast-track batches are available with 100% session recordings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.fullName || 'Valued Partner'}</span>. 
                Your message has been dispatched to Shekanna H. We will contact you at{' '}
                <span className="font-semibold text-slate-900">{formData.workEmail || 'your email'}</span> within 2 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      workEmail: '',
                      company: '',
                      phone: '',
                      topic: 'Enterprise Training License',
                      message: '',
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Send an Inquiry or Schedule a Demo</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below and our team will get back to you with custom syllabus options and pilot pricing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="ramesh@company.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp / CloudScale"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Enterprise Training License">Enterprise Training & Employee Upskilling</option>
                  <option value="Custom Course & Curriculum Request">Custom Course & Curriculum Request</option>
                  <option value="Capstone Project Evaluation Integration">Capstone Project Mentorship & Evaluation</option>
                  <option value="Private Cloud LMS Installation">Private Cloud LMS Installation</option>
                  <option value="Direct Consultation with Shekanna H">Direct Architecture Consultation with Shekanna H</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your training goals, batch size, target technologies, and estimated start date..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Average response time: under 2 hours
                </p>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
