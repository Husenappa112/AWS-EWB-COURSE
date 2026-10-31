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
} from 'lucide-react';

interface CoursePlayerProps {
  courseId: string;
  onBack: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ courseId, onBack }) => {
  const { courses, enrollments, updateLessonProgress } = useApp();
  const course = courses.find((c) => c.id === courseId);
  const enrollment = enrollments.find((e) => e.courseId === courseId);

  // Flatten lessons
  const allLessons = course?.modules.flatMap((m) => m.lessons) || [];
  const [activeLessonId, setActiveLessonId] = useState<string>(
    enrollment?.lastAccessedLessonId || allLessons[0]?.id || ''
  );

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const isLessonCompleted = enrollment?.completedLessons.includes(activeLesson?.id || '');

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

  const certificateData: Certificate = {
    id: `cert-${course.id}`,
    courseTitle: course.title,
    recipientName: 'Arjun Verma',
    organizationName: 'Acme Corporation',
    certificateCode: `SHEK-${course.id.slice(0, 4).toUpperCase()}-ARJUN-2026`,
    issuedDate: 'October 31, 2026',
    grade: quizScore !== null ? quizScore : 95,
  };

  const canShowCertificate =
    enrollment?.status === 'COMPLETED' || (quizScore !== null && quizScore >= 80);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
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
          <div className="max-w-4xl mx-auto">
            {/* Lesson Header */}
            <div className="mb-6 pb-4 border-b border-slate-800 flex items-center justify-between">
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
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-750 text-sm text-slate-300">
                    <p className="font-semibold text-white mb-1">Lesson Notes:</p>
                    <p>{activeLesson.textContent}</p>
                  </div>
                )}
              </div>
            )}

            {activeLesson.type === 'DOCUMENT' && (
              <div className="bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl prose prose-invert max-w-none">
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {activeLesson.textContent}
                </div>
              </div>
            )}

            {activeLesson.type === 'QUIZ' && activeLesson.assessment && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-blue-200 text-sm">{activeLesson.assessment.title}</h3>
                    <p className="text-xs text-blue-400 mt-0.5">
                      Passing Grade: {activeLesson.assessment.passPercentage}% | Total Questions:{' '}
                      {activeLesson.assessment.questions.length}
                    </p>
                  </div>
                  {quizScore !== null && (
                    <div
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        quizScore >= activeLesson.assessment.passPercentage
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border-rose-800'
                      }`}
                    >
                      Score: {quizScore}% ({quizScore >= activeLesson.assessment.passPercentage ? 'PASSED' : 'FAILED'})
                    </div>
                  )}
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                  {activeLesson.assessment.questions.map((question, qIdx) => (
                    <div
                      key={question.id}
                      className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-lg space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-900/60 text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <p className="text-sm font-semibold text-white">{question.prompt}</p>
                      </div>

                      <div className="space-y-2 pt-2">
                        {question.options.map((opt) => {
                          const isSelected = selectedAnswers[question.id] === opt.id;
                          let optStyle =
                            'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

                          if (isSelected) {
                            optStyle = 'bg-blue-950/70 border-blue-600 text-blue-200';
                          }

                          if (quizSubmitted) {
                            if (opt.isCorrect) {
                              optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                            } else if (isSelected && !opt.isCorrect) {
                              optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleOptionSelect(question.id, opt.id)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt.text}</span>
                              {quizSubmitted && opt.isCorrect && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && question.explanation && (
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                          <span className="font-semibold text-slate-300">Explanation:</span>{' '}
                          {question.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Quiz Actions */}
                <div className="flex items-center justify-end gap-3 pt-4">
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
