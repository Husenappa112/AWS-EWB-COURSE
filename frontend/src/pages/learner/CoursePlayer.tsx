import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIAssistantDrawer } from '../../components/AIAssistantDrawer';
import { CertificateModal } from '../../components/CertificateModal';
import type { Certificate } from '../../types';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  PlayCircle,
  FileText,
  HelpCircle,
  Award,
  Clock,
  Check,
  RefreshCw,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Send,
  Plus,
} from 'lucide-react';

interface CoursePlayerProps {
  courseId: string;
  onBack: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ courseId, onBack }) => {
  const {
    courses,
    enrollments,
    updateLessonProgress,
    discussions,
    addDiscussion,
    upvoteDiscussion,
    currentUser,
  } = useApp();

  const course = courses.find((c) => c.id === courseId);
  const enrollment = enrollments.find((e) => e.courseId === courseId);

  // Flatten lessons
  const allLessons = course?.modules.flatMap((m) => m.lessons) || [];
  const [activeLessonId, setActiveLessonId] = useState<string>(
    enrollment?.lastAccessedLessonId || allLessons[0]?.id || ''
  );

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const isLessonCompleted = enrollment?.completedLessons.includes(activeLesson?.id || '');

  // Viewer Tab: 'content' | 'discussions' | 'notes'
  const [viewerTab, setViewerTab] = useState<'content' | 'discussions' | 'notes'>('content');

  // Notes state (per lesson)
  const [notes, setNotes] = useState<Record<string, string>>({
    'les-1': 'Important: Phishing simulators show 90% drop in breach rate when employees use hardware FIDO2 keys.',
  });

  // Discussions state
  const [showNewDiscForm, setShowNewDiscForm] = useState(false);
  const [newDiscTitle, setNewDiscTitle] = useState('');
  const [newDiscContent, setNewDiscContent] = useState('');

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // AI & Certificate Modals State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);

  if (!course || !activeLesson) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Course or lesson not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleQuizSubmit = () => {
    if (!activeLesson.assessment) return;
    let earned = 0;
    const questions = activeLesson.assessment.questions;
    questions.forEach((q) => {
      const correctOpt = q.options.find((opt) => opt.isCorrect);
      if (selectedAnswers[q.id] === correctOpt?.id) {
        earned += q.points;
      }
    });

    const total = questions.reduce((sum, q) => sum + q.points, 0);
    const score = total > 0 ? Math.round((earned / total) * 100) : 100;
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= activeLesson.assessment.passPercentage) {
      updateLessonProgress(course.id, activeLesson.id, true);
    }
  };

  const handleMarkComplete = () => {
    updateLessonProgress(course.id, activeLesson.id, true);
    // Move to next lesson if available
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].id);
      setQuizSubmitted(false);
      setSelectedAnswers({});
      setQuizScore(null);
    }
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscTitle || !newDiscContent) return;

    addDiscussion({
      courseId: course.id,
      authorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Arjun Verma',
      authorRole: currentUser?.role || 'LEARNER',
      authorAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      title: newDiscTitle,
      content: newDiscContent,
    });

    setNewDiscTitle('');
    setNewDiscContent('');
    setShowNewDiscForm(false);
  };

  const certificateData: Certificate = {
    id: `cert-${course.id}`,
    courseTitle: course.title,
    recipientName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Arjun Verma',
    organizationName: 'CloudScale Technologies',
    certificateCode: `SHEK-${course.id.slice(0, 4).toUpperCase()}-ARJUN-2026`,
    issuedDate: 'October 31, 2026',
    grade: quizScore !== null ? quizScore : 95,
  };

  const canShowCertificate =
    enrollment?.status === 'COMPLETED' || (quizScore !== null && quizScore >= 80);

  const courseDiscussions = discussions.filter(
    (d) => d.courseId === course.id || d.courseId === 'course-cybersecurity-2026'
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Course Player Top Navigation Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div>
            <h2 className="text-xs font-semibold text-slate-300 truncate max-w-md">{course.title}</h2>
            <p className="text-[11px] text-blue-400 font-medium">{activeLesson.title}</p>
          </div>
        </div>

        {/* Course Controls: AI Assistant, Progress, and Certificate */}
        <div className="flex items-center gap-3">
          {/* AI Learning Assistant Toggle Button */}
          <button
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/60 hover:bg-indigo-900 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Certificate View Button (if earned) */}
          {canShowCertificate && (
            <button
              onClick={() => setIsCertOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-950 text-amber-300 border border-amber-600/60 hover:bg-amber-900 shadow-sm transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Certificate</span>
            </button>
          )}

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-400">Progress:</span>
            <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${enrollment?.progress || 0}%` }}
              />
            </div>
            <span className="text-xs font-bold text-blue-400">{enrollment?.progress || 0}%</span>
          </div>

          <button
            onClick={handleMarkComplete}
            disabled={isLessonCompleted}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isLessonCompleted
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/30'
            }`}
          >
            {isLessonCompleted ? (
              <>
                <Check className="w-4 h-4" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Mark Complete</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Player Body: Lesson Viewer + Curriculum Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Content Viewer */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-slate-900">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Player Sub-Navigation: Content / Discussions / Notes */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setViewerTab('content')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewerTab === 'content'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lesson Material</span>
              </button>

              <button
                onClick={() => setViewerTab('discussions')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewerTab === 'discussions'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Community & Announcements ({courseDiscussions.length})</span>
              </button>

              <button
                onClick={() => setViewerTab('notes')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewerTab === 'notes'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>My Lesson Notes</span>
              </button>
            </div>

            {/* TAB 1: LESSON CONTENT */}
            {viewerTab === 'content' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Lesson Header */}
                <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                      {activeLesson.type === 'VIDEO' && <PlayCircle className="w-3.5 h-3.5" />}
                      {activeLesson.type === 'DOCUMENT' && <FileText className="w-3.5 h-3.5" />}
                      {activeLesson.type === 'QUIZ' && <HelpCircle className="w-3.5 h-3.5" />}
                      {activeLesson.type} LESSON
                    </span>
                    <h1 className="text-xl font-bold text-white mt-2">{activeLesson.title}</h1>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{activeLesson.durationMinutes} mins</span>
                  </div>
                </div>

                {/* Content Rendering By Type */}
                {activeLesson.type === 'VIDEO' && (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                      <video
                        src={activeLesson.contentUrl}
                        controls
                        className="w-full h-full object-cover"
                        poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                      />
                    </div>
                    {activeLesson.textContent && (
                      <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {activeLesson.textContent}
                      </div>
                    )}
                  </div>
                )}

                {activeLesson.type === 'DOCUMENT' && (
                  <div className="p-8 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-xl space-y-6 text-slate-200">
                    <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {activeLesson.textContent}
                    </div>
                  </div>
                )}

                {activeLesson.type === 'QUIZ' && activeLesson.assessment && (
                  <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-8">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <h2 className="text-lg font-bold text-white">{activeLesson.assessment.title}</h2>
                        <p className="text-xs text-slate-400 mt-1">
                          Pass percentage: {activeLesson.assessment.passPercentage}% · Timed limit:{' '}
                          {activeLesson.assessment.timeLimitMinutes} mins
                        </p>
                      </div>
                      {quizScore !== null && (
                        <div
                          className={`px-4 py-2 rounded-xl text-center border ${
                            quizScore >= activeLesson.assessment.passPercentage
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                              : 'bg-rose-950/80 text-rose-300 border-rose-700/60'
                          }`}
                        >
                          <p className="text-xl font-black">{quizScore}%</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider">
                            {quizScore >= activeLesson.assessment.passPercentage ? 'Passed' : 'Needs Review'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Questions List */}
                    <div className="space-y-6">
                      {activeLesson.assessment.questions.map((q, qIndex) => (
                        <div key={q.id} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-sm font-semibold text-slate-200">
                              <span className="text-blue-400 font-bold mr-1.5">{qIndex + 1}.</span>
                              {q.prompt}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 shrink-0">
                              {q.points} pts
                            </span>
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 gap-2 pt-2">
                            {q.options.map((opt) => {
                              const isSelected = selectedAnswers[q.id] === opt.id;
                              const showResults = quizSubmitted;
                              const isCorrect = opt.isCorrect;

                              let optionStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300';
                              if (isSelected) {
                                optionStyle = 'bg-blue-950/60 border-blue-600 text-blue-200';
                              }
                              if (showResults) {
                                if (isCorrect) {
                                  optionStyle = 'bg-emerald-950/70 border-emerald-600 text-emerald-200';
                                } else if (isSelected && !isCorrect) {
                                  optionStyle = 'bg-rose-950/70 border-rose-600 text-rose-200';
                                }
                              }

                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => handleOptionSelect(q.id, opt.id)}
                                  disabled={quizSubmitted}
                                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                                >
                                  <span>{opt.text}</span>
                                  {showResults && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && q.explanation && (
                            <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-300">
                              <strong>Explanation:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Quiz Action Buttons */}
                    <div className="pt-4 flex items-center justify-between">
                      {quizSubmitted ? (
                        <div className="flex items-center gap-3">
                          {quizScore !== null && quizScore >= activeLesson.assessment.passPercentage && (
                            <button
                              onClick={() => setIsCertOpen(true)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-colors"
                            >
                              <Award className="w-4 h-4" />
                              <span>View Official Certificate</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setQuizSubmitted(false);
                              setSelectedAnswers({});
                              setQuizScore(null);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Retake Quiz</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < activeLesson.assessment.questions.length}
                          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Assessment
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: COURSE DISCUSSIONS & ANNOUNCEMENTS */}
            {viewerTab === 'discussions' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white">Course Discussions & Mentor Announcements</h2>
                    <p className="text-xs text-slate-400">
                      Collaborate with peers, ask questions, and review architectural guidance
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNewDiscForm(!showNewDiscForm)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ask Question</span>
                  </button>
                </div>

                {/* New Question Form */}
                {showNewDiscForm && (
                  <form onSubmit={handleCreateDiscussion} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Post New Inquiry to Mentors & Peers
                    </h3>
                    <div>
                      <input
                        type="text"
                        required
                        value={newDiscTitle}
                        onChange={(e) => setNewDiscTitle(e.target.value)}
                        placeholder="Discussion Title / Concept Question..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        required
                        value={newDiscContent}
                        onChange={(e) => setNewDiscContent(e.target.value)}
                        placeholder="Describe your question, implementation detail, or edge case..."
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowNewDiscForm(false)}
                        className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:bg-slate-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Discussion</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Discussions List */}
                <div className="space-y-4">
                  {courseDiscussions.map((disc) => (
                    <div
                      key={disc.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        disc.isPinned
                          ? 'bg-gradient-to-r from-blue-950/60 to-slate-950 border-blue-800/80'
                          : 'bg-slate-950/70 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={disc.authorAvatar}
                            alt={disc.authorName}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-800"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{disc.authorName}</h4>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                                {disc.authorRole}
                              </span>
                              {disc.isPinned && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                                  Instructor Announcement
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500">{disc.timestamp}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => upvoteDiscussion(disc.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                          <span>{disc.upvotes}</span>
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-slate-100">{disc.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{disc.content}</p>

                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{disc.repliesCount} replies</span>
                        <span className="text-blue-400 hover:underline cursor-pointer">Reply in Thread &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PERSONAL NOTES & BOOKMARKS */}
            {viewerTab === 'notes' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white">Lesson Notes & Quick Scratchpad</h2>
                    <p className="text-xs text-slate-400">
                      Private notes auto-saved for: <strong className="text-blue-400">{activeLesson.title}</strong>
                    </p>
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Auto-saved locally
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <textarea
                    rows={8}
                    value={notes[activeLesson.id] || ''}
                    onChange={(e) => setNotes({ ...notes, [activeLesson.id]: e.target.value })}
                    placeholder="Type key takeaways, code syntax, or questions to ask in your next mock interview..."
                    className="w-full p-4 rounded-xl border border-slate-800 bg-slate-900 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                  <p className="text-[11px] text-slate-500">
                    💡 Tip: Personal lesson notes are accessible anytime when reviewing course modules.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Curriculum Table of Contents */}
        <div className="w-full lg:w-80 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-auto lg:h-full">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Modules</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {course.modules.map((module) => (
              <div key={module.id} className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-300 px-2">{module.title}</p>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id;
                    const isCompleted = enrollment?.completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLessonId(lesson.id);
                          setViewerTab('content');
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                          setQuizScore(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase shrink-0">
                          {lesson.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Generation Status */}
          {course.certificateEnabled && (
            <div className="p-4 border-t border-slate-800 bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Official Certificate</p>
                    <p className="text-[11px] text-slate-400">
                      {canShowCertificate ? 'Issued & Verified' : 'Unlocks upon 100% completion'}
                    </p>
                  </div>
                </div>
                {canShowCertificate && (
                  <button
                    onClick={() => setIsCertOpen(true)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide-out AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        courseTitle={course.title}
        currentLessonTitle={activeLesson.title}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        certificate={certificateData}
      />
    </div>
  );
};
