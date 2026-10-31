import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GitBranch,
  ArrowRight,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { courses, enrollInCourse } = useApp();

  return (
    <div className="space-y-12 py-4">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <GitBranch className="w-4 h-4" />
            100% Industrial Project Mastery
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How We Teach Projects for Every Course
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            At SHEK'sLMS, we believe true mastery comes from shipping code that solves enterprise-grade problems. Every course culminates in a live, 4 to 6-week industrial capstone project evaluated through mentor code reviews and live technical viva.
          </p>
        </div>
      </div>

      {/* 4-Stage Teaching Methodology */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Our 4-Stage Pedagogy
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">From Specification to Production Code</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Industry Problem Statement</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We design real engineering briefs directly from partner companies like CloudScale Technologies and Zenith FinTech, challenging learners to think like staff engineers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">GitHub Repos & CI/CD</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Learners write test-driven code, set up continuous integration with automated linting, Docker containerization, and clean multi-tenant schemas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">1-on-1 Mentor Code Review</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every pull request is reviewed by seasoned architects like Shekanna H and Ananya Iyer, ensuring adherence to enterprise security and performance guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900">Live Defense & Placement</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Learners defend their system architecture during mock technical interviews and add verified project credentials to their portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Capstone Catalog
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Industrial Projects Offered per Course</h2>
          <p className="text-xs text-slate-500">
            Explore the production projects learners build and submit during their training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {course.capstoneProject.durationWeeks} Weeks Duration
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {course.trainer.name}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {course.capstoneProject.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {course.capstoneProject.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800 text-[11px]">Real-World Scenario:</p>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    {course.capstoneProject.industryScenario}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-700 mb-1.5">Technologies Used:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.capstoneProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => enrollInCourse(course.id)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Build This in Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
