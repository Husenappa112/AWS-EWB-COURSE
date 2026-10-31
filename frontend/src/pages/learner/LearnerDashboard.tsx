import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Flame,
  Clock,
  Play,
  Search,
} from 'lucide-react';

export const LearnerDashboard: React.FC = () => {
  const { enrollments, courses, gamification, enrollInCourse, setActiveCoursePlayerId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['ALL', ...Array.from(new Set(courses.map((c) => c.category)))];

  return (
    <div className="space-y-8">
      {/* Welcome & Gamification Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                Learner Experience
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                {gamification.currentStreak}-Day Active Learning Streak
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Arjun!
            </h1>
            <p className="mt-1 text-blue-100 text-sm max-w-xl">
              You are currently enrolled in {enrollments.length} corporate training programs. Continue where you left off or explore new enterprise skill tracks.
            </p>
          </div>

          {/* Gamification Stats Card */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-2xl font-black text-amber-300">{gamification.points}</p>
              <p className="text-[11px] uppercase font-semibold tracking-wider text-blue-100">Points</p>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-2xl font-black text-white">{gamification.level}</p>
              <p className="text-[11px] uppercase font-semibold tracking-wider text-blue-100">Level</p>
            </div>
            <div className="text-center px-3">
              <p className="text-2xl font-black text-emerald-300">{gamification.badges.length}</p>
              <p className="text-[11px] uppercase font-semibold tracking-wider text-blue-100">Badges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Enrollments Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">In-Progress Training</h2>
            <p className="text-xs text-slate-500">Pick up right where you last stopped</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrollments.map((enr) => (
            <div
              key={enr.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                      {enr.course.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{enr.course.title}</h3>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      enr.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {enr.status === 'COMPLETED' ? 'Completed' : `${enr.progress}% Done`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${enr.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>{enr.completedLessons.length} lessons completed</span>
                    <span>{enr.course.durationMinutes} mins total</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Instructor: {enr.course.instructor}</span>
                <button
                  onClick={() => setActiveCoursePlayerId(enr.courseId)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{enr.status === 'COMPLETED' ? 'Review Course' : 'Resume Learning'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Course Catalog */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Explore Course Catalog</h2>
            <p className="text-xs text-slate-500">Browse and self-enroll in organizational curricula</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredCourses.map((c) => {
            const isEnrolled = enrollments.some((e) => e.courseId === c.id);

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={c.thumbnailUrl} alt={c.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md">
                      {c.level}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                      {c.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">{c.title}</h3>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {c.durationMinutes} mins
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {c.modules.flatMap((m) => m.lessons).length} Lessons
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {isEnrolled ? (
                    <button
                      onClick={() => setActiveCoursePlayerId(c.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                    >
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollInCourse(c.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
                    >
                      Enroll in Course
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
