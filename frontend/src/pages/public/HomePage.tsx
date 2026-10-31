import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEVELOPER_INFO } from '../../data/mockData';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  GitBranch,
  Phone,
  Mail,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { courses, setActiveNavTab, setAuthModalType, enrollInCourse } = useApp();

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>2026 Enterprise Learning Architecture · Multi-Tenant LMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none">
            Empower Your Workforce with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">SHEK'sLMS</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            Enterprise-ready learning management platform inspired by TalentLMS. Delivers structured curriculums, interactive video & document lessons, auto-graded certification assessments, and real-world industrial capstone projects for every course.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveNavTab('courses')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Explore Courses & Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveNavTab('projects')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
            >
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span>How We Teach Projects</span>
            </button>

            <button
              onClick={() => setAuthModalType('login')}
              className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-blue-300 hover:text-white transition-colors"
            >
              Sign In Demo →
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl font-black text-white">1,460+</p>
              <p className="text-xs text-slate-400 mt-0.5">Enrolled Corporate Learners</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Live Industrial Projects</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">98.4%</p>
              <p className="text-xs text-slate-400 mt-0.5">Assessment Pass Rate</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-400">Multi-Tenant</p>
              <p className="text-xs text-slate-400 mt-0.5">Isolated Enterprise Data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses with Trainer, Syllabus & Timing */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Industry Aligned Curriculums
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Featured Training Tracks & Projects</h2>
            <p className="text-xs text-slate-500">
              Each track is taught by industry leads and includes a production capstone project.
            </p>
          </div>
          <button
            onClick={() => setActiveNavTab('courses')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View All Curriculums</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail & Level Badge */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md">
                    {course.level}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Trainer & Batch Info */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.trainer.avatarUrl}
                        alt={course.trainer.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-800">{course.trainer.name}</span>
                      <span className="text-[10px] text-slate-400">({course.trainer.company})</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Starts: <strong>{course.batchStartDate}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{course.scheduleTiming}</span>
                    </div>
                  </div>

                  {/* Capstone Project Offering Highlight */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs">
                    <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                      <GitBranch className="w-3 h-3 text-emerald-600" />
                      Industrial Project Included:
                    </p>
                    <p className="font-semibold text-emerald-950 text-[11px] truncate mt-0.5">
                      {course.capstoneProject.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => enrollInCourse(course.id)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                >
                  Enroll & View Syllabus
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Teach Through Industrial Projects */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Project-Based Pedagogy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            How We Teach Real-World Industrial Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Unlike traditional tutorial platforms, every SHEK'sLMS course centers around a real-world enterprise engineering problem. We don't consider a concept learned until it is running in production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black">
              1
            </div>
            <h4 className="text-sm font-bold text-white">Enterprise Scenario</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learners receive realistic architectural specs simulating high-scale enterprise challenges from companies like CloudScale and Zenith FinTech.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-black">
              2
            </div>
            <h4 className="text-sm font-bold text-white">GitHub Repo & CI/CD</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learners initialize production code repositories with automated GitHub Actions, TypeScript linting, and automated test runners.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black">
              3
            </div>
            <h4 className="text-sm font-bold text-white">Mentor Code Reviews</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Senior instructors like Shekanna H and Ananya Iyer perform line-by-line pull request code audits and provide actionable architectural feedback.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-black">
              4
            </div>
            <h4 className="text-sm font-bold text-white">Viva & Certification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live technical defense and mock interview assessment before awarding the cryptographically verified course and project credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Developer & Leadership Spotlight */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest">
            Lead Architect & Developer Spotlight
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Designed & Developed by {DEVELOPER_INFO.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            SHEK'sLMS was conceptualized and engineered from the ground up by {DEVELOPER_INFO.name} in {DEVELOPER_INFO.location}. Featuring multi-tenant data isolation, React 19, Express, Prisma ORM, and integrated Google Gemini intelligence.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-2">
            <span className="flex items-center gap-1.5 text-blue-700">
              <Phone className="w-4 h-4" />
              <span>Contact: <strong>{DEVELOPER_INFO.phone}</strong></span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Mail className="w-4 h-4" />
              <span>{DEVELOPER_INFO.email}</span>
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md text-center shrink-0 w-full sm:w-72">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt={DEVELOPER_INFO.name}
            className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-blue-100 mb-3"
          />
          <h4 className="font-bold text-slate-900 text-sm">{DEVELOPER_INFO.name}</h4>
          <p className="text-xs text-blue-600 font-medium">{DEVELOPER_INFO.title}</p>
          <p className="text-[11px] text-slate-400 mt-1">{DEVELOPER_INFO.location}</p>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href={`tel:${DEVELOPER_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full justify-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {DEVELOPER_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
