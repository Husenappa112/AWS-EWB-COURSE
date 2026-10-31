import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Calendar,
  Clock,
  BookOpen,
  GitBranch,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';

export const CoursesCatalogPage: React.FC = () => {
  const { courses, enrollInCourse } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const categories = ['ALL', ...Array.from(new Set(courses.map((c) => c.category)))];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.trainer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Corporate Training Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Enterprise Courses, Syllabuses & Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
            Every course offers an end-to-end curriculum, live instructor batches, scheduled mock interviews, and a guaranteed production industrial project.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0 w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, trainer, or skill..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards List */}
      <div className="space-y-6">
        {filteredCourses.map((course) => {
          const isSyllabusOpen = expandedSyllabusId === course.id;

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="flex flex-col sm:flex-row gap-5 flex-1">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full sm:w-48 h-36 rounded-2xl object-cover shrink-0"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                        {course.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {course.level}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 leading-snug">{course.title}</h2>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {course.description}
                    </p>

                    {/* Trainer & Batch Details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={course.trainer.avatarUrl}
                          alt={course.trainer.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-900">Trainer: {course.trainer.name}</span>
                        <span className="text-[11px] text-slate-400">({course.trainer.experience})</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Batch: {course.batchStartDate}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.scheduleTiming}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Action Box */}
                <div className="w-full lg:w-56 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 shrink-0 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tuition</span>
                    <p className="text-sm font-extrabold text-slate-900">{course.price}</p>
                  </div>
                  <button
                    onClick={() => enrollInCourse(course.id)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Enroll & Learn</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setExpandedSyllabusId(isSyllabusOpen ? null : course.id)}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{isSyllabusOpen ? 'Hide Syllabus' : 'View Syllabus & Project'}</span>
                    {isSyllabusOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Syllabus & Capstone Project Section */}
              {isSyllabusOpen && (
                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
                  {/* Detailed Curriculum Syllabus */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Detailed Curriculum & Lessons ({course.modules.length} Modules)
                    </h4>
                    <div className="space-y-3">
                      {course.modules.map((m) => (
                        <div key={m.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                          <p className="text-xs font-bold text-slate-900">{m.title}</p>
                          <ul className="space-y-1 pl-4 text-xs text-slate-600 list-disc">
                            {m.lessons.map((l) => (
                              <li key={l.id}>
                                <span className="font-medium text-slate-800">{l.title}</span>{' '}
                                <span className="text-[10px] text-slate-400">({l.type} · {l.durationMinutes} mins)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included Industrial Capstone Project */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-emerald-600" />
                      Assigned Industrial Capstone Project ({course.capstoneProject.durationWeeks} Weeks)
                    </h4>
                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 space-y-3 text-xs">
                      <div>
                        <p className="font-extrabold text-emerald-950 text-sm">
                          {course.capstoneProject.title}
                        </p>
                        <p className="text-slate-600 mt-1 leading-relaxed">
                          {course.capstoneProject.description}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800">Tech Stack: </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {course.capstoneProject.techStack.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white border border-emerald-300 text-emerald-900"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800">Key Deliverables:</span>
                        <ul className="mt-1 space-y-1 text-slate-600 pl-4 list-disc text-[11px]">
                          {course.capstoneProject.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
