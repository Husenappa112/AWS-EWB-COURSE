import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Certificate } from '../../types';
import { CertificateModal } from '../../components/CertificateModal';
import {
  BookOpen,
  Flame,
  Clock,
  Play,
  Search,
  Calendar,
  Video,
  Award,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Plus,
  X,
  ArrowRight,
  Send,
  Layers,
  Sparkles,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';

export const LearnerDashboard: React.FC = () => {
  const {
    currentUser,
    enrollments,
    courses,
    gamification,
    interviews,
    exams,
    projectSubmissions,
    enrollInCourse,
    setActiveCoursePlayerId,
    submitProject,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'interviews' | 'exams' | 'projects' | 'certificates' | 'simulation' | 'catalog'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Certificate Modal State
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // New Project Submission Modal State
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectTitle: '',
    courseTitle: courses[0]?.title || 'Enterprise Cybersecurity Essentials 2026',
    githubUrl: '',
    liveDemoUrl: '',
  });

  // Sample certificates generated for completed/in-progress training
  const earnedCertificates: Certificate[] = [
    {
      id: 'cert-cyber-01',
      courseId: 'course-cybersecurity-2026',
      courseTitle: 'Enterprise Cybersecurity Essentials 2026',
      recipientName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Arjun Verma',
      issuedDate: 'October 30, 2026',
      certificateCode: 'SHEK-SEC-2026-9842',
      grade: 92,
      organizationName: 'CloudScale Technologies',
    },
    {
      id: 'cert-fs-02',
      courseId: 'course-fullstack-ts-2026',
      courseTitle: 'Full-Stack TypeScript & Enterprise React 19 Architecture',
      recipientName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Arjun Verma',
      issuedDate: 'October 25, 2026',
      certificateCode: 'SHEK-FS-2026-1184',
      grade: 96,
      organizationName: 'CloudScale Technologies',
    },
  ];

  // Scenario Simulator State (2026 AI Feature)
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scen-1');
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [simulationSubmitted, setSimulationSubmitted] = useState<boolean>(false);

  const simulationScenarios = [
    {
      id: 'scen-1',
      title: 'Active Whaling Attack: Unauthorized Vendor Wire Request',
      category: 'Cybersecurity Incident Response',
      context:
        'You receive an urgent message on WhatsApp at 7:45 PM from an unverified mobile number claiming to be your CEO. The message contains realistic corporate logos and states: "We need an emergency $450,000 escrow transfer to our Swiss supplier before market close today or we lose the acquisition deal. Wire details are attached. Do not mention this to anyone yet as it is an NDA-bound operation."',
      question: 'What is your immediate compliance and operational course of action?',
      options: [
        {
          id: 'opt-a',
          label: 'Option A: Comply Immediately',
          text: 'Initiate the wire transfer immediately through the bank portal to ensure the enterprise acquisition deal is not lost.',
          isOptimal: false,
          score: 0,
          analysis:
            'Critical Security Failure: This is a textbook whaling / Business Email Compromise (BEC) attack vector. Wire transfers must never be initiated based solely on chat or email messages without dual-custody authorization.',
        },
        {
          id: 'opt-b',
          label: 'Option B: Reply to WhatsApp for Verification',
          text: 'Reply on WhatsApp asking the sender to confirm their identity or send a selfie holding their employee ID card.',
          isOptimal: false,
          score: 25,
          analysis:
            'High Vulnerability: The adversary controls the WhatsApp communication channel. Engaging with the attacker gives them opportunities to provide forged identity documents or voice clones.',
        },
        {
          id: 'opt-c',
          label: 'Option C: Initiate Out-of-Band Dual-Custody Verification SOP',
          text: 'Refuse to process the request over chat. Contact the CFO and Security Operations Center (SOC) via verified internal VoIP/office lines, and initiate dual-custody wire protocols.',
          isOptimal: true,
          score: 100,
          analysis:
            'Optimal Protocol (100% Score): Out-of-band verification via cryptographically secured internal channels completely neutralizes BEC attacks. SOC logging allows domain isolation.',
        },
      ],
    },
    {
      id: 'scen-2',
      title: 'Architecture Trade-off: High-Concurrency Cache Stampede Mitigation',
      category: 'Full-Stack Distributed Systems',
      context:
        'Your production LMS experiences 50,000 simultaneous learner logins at 10:00 AM for a mandatory compliance certification. The primary Redis cache key for course metadata expires at 10:01 AM, triggering 50,000 simultaneous database queries, causing connection pool exhaustion and 504 gateway timeouts.',
      question: 'Which architectural mitigation pattern best eliminates this failure mode?',
      options: [
        {
          id: 'opt-2a',
          label: 'Option A: Double the Database Instance Size',
          text: 'Vertically scale PostgreSQL from 8 vCPU to 64 vCPU to absorb the 50,000 concurrent queries during key expiration.',
          isOptimal: false,
          score: 30,
          analysis:
            'Suboptimal & Costly: Vertical scaling increases cloud operational expenditure significantly without solving the root cause of the thundering herd problem during peak spikes.',
        },
        {
          id: 'opt-2b',
          label: 'Option B: Mutex Lock with Stale-While-Revalidate & Early Expiration',
          text: 'Implement a distributed mutex lock (Redlock) so only the first request queries the DB while others receive stale cached data, supplemented by probabilistic early expiration (XFetch).',
          isOptimal: true,
          score: 100,
          analysis:
            'Optimal Architecture (100% Score): The mutex lock guarantees exactly one DB query on cache miss, while Stale-While-Revalidate ensures zero latency spikes for learners.',
        },
        {
          id: 'opt-2c',
          label: 'Option C: Disable Cache Expiration Entirely',
          text: 'Set cache TTL to infinite (no expiration) so the key never expires.',
          isOptimal: false,
          score: 15,
          analysis:
            'Dangerous Anti-Pattern: Storing course data infinitely leads to stale course revisions, memory leakage, and inability to invalidate updated assessment question pools.',
        },
      ],
    },
  ];

  const currentScenario = simulationScenarios.find((s) => s.id === activeScenarioId) || simulationScenarios[0];
  const chosenOption = currentScenario.options.find((o) => o.id === selectedDecisionId);

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.projectTitle || !newProject.githubUrl) return;
    submitProject({
      projectTitle: newProject.projectTitle,
      courseTitle: newProject.courseTitle,
      githubUrl: newProject.githubUrl,
      liveDemoUrl: newProject.liveDemoUrl || undefined,
    });
    setSubmitModalOpen(false);
    setNewProject({
      projectTitle: '',
      courseTitle: courses[0]?.title || 'Enterprise Cybersecurity Essentials 2026',
      githubUrl: '',
      liveDemoUrl: '',
    });
    setActiveTab('projects');
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['ALL', ...Array.from(new Set(courses.map((c) => c.category)))];

  const primaryEnrollment = enrollments[0];

  return (
    <div className="space-y-8">
      {/* Welcome & Gamification Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                Learner Portal · CloudScale Technologies
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-amber-400/20 text-amber-200 border border-amber-300/30 font-bold backdrop-blur-md">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                {gamification.currentStreak}-Day Active Learning Streak!
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.firstName || 'Arjun'}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Track your course progression, upcoming mock technical interviews, scheduled certification exams, and hands-on capstone code submissions in one place.
            </p>
          </div>

          {/* Gamification Stats Card */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-2xl font-black text-amber-300">{gamification.points}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-blue-100">Points</p>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-2xl font-black text-white">Lvl {gamification.level}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-blue-100">Senior</p>
            </div>
            <div className="text-center px-3">
              <p className="text-2xl font-black text-emerald-300">{gamification.badges.length}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-blue-100">Badges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'courses'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Enrolled Courses ({enrollments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'interviews'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Technical Interviews ({interviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'exams'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Scheduled Exams ({exams.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Capstone Projects ({projectSubmissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'certificates'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates & Badges ({earnedCertificates.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('simulation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'simulation'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Scenario Simulator (2026)</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'catalog'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Browse Catalog</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Courses</p>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{enrollments.length}</p>
                <p className="text-[11px] text-blue-600 font-semibold mt-1">1 in progress · 1 completed</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Interviews</p>
                <p className="text-2xl font-black text-purple-600 mt-0.5">{interviews.length}</p>
                <p className="text-[11px] text-purple-700 font-semibold mt-1">Next: Nov 12 (Shekanna H)</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                <Video className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Exams</p>
                <p className="text-2xl font-black text-amber-600 mt-0.5">{exams.length}</p>
                <p className="text-[11px] text-amber-700 font-semibold mt-1">Next: Nov 14 (Cybersecurity)</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Project Submissions</p>
                <p className="text-2xl font-black text-emerald-600 mt-0.5">{projectSubmissions.length}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">Grade: A+ (96% Pass)</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <GitBranch className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Primary Action Card: Continue Main Course */}
          {primaryEnrollment && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-200">
                    Active Learning Focus
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Batch Timing: {primaryEnrollment.course.scheduleTiming || 'Mon-Fri 7:30 PM - 9:00 PM IST'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{primaryEnrollment.course.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {primaryEnrollment.course.description}
                </p>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-1.5">
                    <span>Course Progress: {primaryEnrollment.progress}%</span>
                    <span>
                      {primaryEnrollment.completedLessons.length} /{' '}
                      {primaryEnrollment.course.modules.flatMap((m) => m.lessons).length} Lessons Completed
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${primaryEnrollment.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  onClick={() => setActiveCoursePlayerId(primaryEnrollment.courseId)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume Course Player</span>
                </button>
                <button
                  onClick={() => setSelectedCert(earnedCertificates[0])}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>View Verified Certificate</span>
                </button>
              </div>
            </div>
          )}

          {/* Two-Column Layout: Next Interview & Scheduled Exams */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Next Technical Mock Interview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Next Technical Mock Interview</h4>
                    <p className="text-[11px] text-slate-500">Scheduled by Placement & Architecture Team</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('interviews')}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  View All ({interviews.length})
                </button>
              </div>

              {interviews[0] && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{interviews[0].title}</h5>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                        Target Role: <strong className="text-purple-700">{interviews[0].roleTarget}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Company: {interviews[0].companyTarget} · Interviewer: {interviews[0].interviewerName}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 uppercase">
                      Confirmed
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      {interviews[0].dateTime}
                    </span>
                    <a
                      href={interviews[0].meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-xs transition-colors"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Google Meet</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Next Scheduled Exam */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Upcoming Examination</h4>
                    <p className="text-[11px] text-slate-500">Timed Online Knowledge Check</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('exams')}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  View All ({exams.length})
                </button>
              </div>

              {exams[0] && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{exams[0].title}</h5>
                      <p className="text-[11px] text-blue-600 font-semibold mt-0.5">{exams[0].courseTitle}</p>
                      <p className="text-[11px] text-slate-500">
                        Duration: {exams[0].durationMinutes} mins · Total Marks: {exams[0].totalMarks}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                      Upcoming
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {exams[0].dateTime}
                    </span>
                    <button
                      onClick={() => setActiveCoursePlayerId(primaryEnrollment.courseId)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
                    >
                      Enter Assessment Hall
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gamification Badges Carousel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Your Earned Achievement Badges</h4>
                <p className="text-[11px] text-slate-500">Recognizing continuous learning consistency</p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                {gamification.currentStreak} Days Consecutive
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {gamification.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white flex items-center gap-3.5 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{badge.name}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{badge.description}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Awarded {badge.awardedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENROLLED COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Enrolled Programs & Syllabi</h2>
              <p className="text-xs text-slate-500">Pick up where you left off or review completed modules</p>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Explore More Courses</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enr) => (
              <div
                key={enr.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
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

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{enr.course.description}</p>

                  {/* Batch Details */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                    <p>
                      <strong>Trainer:</strong> {enr.course.trainer?.name || enr.course.instructor} (
                      {enr.course.trainer?.company || 'CloudScale Technologies'})
                    </p>
                    <p>
                      <strong>Schedule:</strong> {enr.course.scheduleTiming}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {enr.course.batchStartDate}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
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

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(earnedCertificates[0])}
                    className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>View Certificate</span>
                  </button>

                  <button
                    onClick={() => setActiveCoursePlayerId(enr.courseId)}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{enr.status === 'COMPLETED' ? 'Review Material' : 'Resume Player'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TECHNICAL INTERVIEWS */}
      {activeTab === 'interviews' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Placement & Technical Mock Interviews</h2>
              <p className="text-xs text-slate-500">
                1-on-1 architecture evaluations and employer recruitment screenings
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              {interviews.length} Scheduled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-purple-300 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{interview.title}</h3>
                      <p className="text-xs text-purple-700 font-semibold mt-0.5">
                        Target Role: {interview.roleTarget}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                    {interview.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1.5">
                  <p>
                    <strong>Target Company:</strong> {interview.companyTarget}
                  </p>
                  <p>
                    <strong>Technical Interviewer:</strong> {interview.interviewerName}
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-800 font-semibold pt-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    {interview.dateTime}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Google Meet link active 10 mins prior</span>
                  <a
                    href={interview.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Meeting</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULED EXAMS */}
      {activeTab === 'exams' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Scheduled Exams & Certification Tests</h2>
              <p className="text-xs text-slate-500">
                Mandatory compliance mid-terms and capstone evaluation checks
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              {exams.length} Upcoming
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-300 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{exam.title}</h3>
                      <p className="text-xs text-blue-600 font-semibold mt-0.5">{exam.courseTitle}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    {exam.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1.5">
                  <p>
                    <strong>Scheduled Date & Time:</strong> {exam.dateTime}
                  </p>
                  <p>
                    <strong>Examination Duration:</strong> {exam.durationMinutes} Minutes
                  </p>
                  <p>
                    <strong>Maximum Marks:</strong> {exam.totalMarks} Marks (Passing threshold: 75%)
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Proctored & auto-graded</span>
                  <button
                    onClick={() => setActiveCoursePlayerId(primaryEnrollment.courseId)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
                  >
                    <span>Start Online Exam</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INDUSTRIAL CAPSTONE PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Industrial Capstone Project Submissions</h2>
              <p className="text-xs text-slate-500">
                Real-world repos, mentor code evaluations, and architectural defenses
              </p>
            </div>
            <button
              onClick={() => setSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Capstone Repo</span>
            </button>
          </div>

          <div className="space-y-4">
            {projectSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {sub.courseTitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{sub.projectTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Submitted on {sub.submittedDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {sub.grade && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Grade: {sub.grade}
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        sub.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sub.status === 'NEEDS_CHANGES'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Feedback Box */}
                {sub.mentorFeedback && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Mentor Evaluation & Review Notes:</span>
                    </p>
                    <p className="text-slate-600 leading-relaxed pl-5.5">{sub.mentorFeedback}</p>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <a
                    href={sub.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  {sub.liveDemoUrl && (
                    <a
                      href={sub.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Live Production Deployment</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: VERIFIABLE CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Verifiable Credentials & Certifications</h2>
              <p className="text-xs text-slate-500">
                Official certificates awarded upon passing assessments and capstones
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {earnedCertificates.length} Certificates Earned
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {earnedCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                        Official Certification
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">{cert.certificateCode}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-4 leading-snug">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Recipient: {cert.recipientName}</p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                    <p>
                      <strong>Issued By:</strong> {cert.organizationName}
                    </p>
                    <p>
                      <strong>Award Date:</strong> {cert.issuedDate}
                    </p>
                    <p>
                      <strong>Score:</strong> {cert.grade}% Pass
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Cryptographically Valid
                  </span>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View & Verify</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: AI SCENARIO SIMULATOR (2026 FEATURE) */}
      {activeTab === 'simulation' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-300/30">
                2026 Interactive Scenario Simulator
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Real-World Workplace Simulations & Incident Practice
              </h2>
              <p className="text-xs text-blue-200 max-w-xl leading-relaxed">
                Test your architectural and compliance judgment against high-stakes enterprise scenarios. Receive instantaneous AI evaluation and vulnerability risk scores.
              </p>
            </div>

            {/* Scenario Selector Pills */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              {simulationScenarios.map((scen, idx) => (
                <button
                  key={scen.id}
                  onClick={() => {
                    setActiveScenarioId(scen.id);
                    setSelectedDecisionId(null);
                    setSimulationSubmitted(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    activeScenarioId === scen.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <p className="text-[10px] text-amber-300">Scenario {idx + 1}</p>
                  <p className="truncate max-w-[180px]">{scen.title.split(':')[0]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Scenario Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {currentScenario.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{currentScenario.title}</h3>
                </div>
              </div>

              {simulationSubmitted && chosenOption && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    chosenOption.isOptimal
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  Score: {chosenOption.score} / 100
                </span>
              )}
            </div>

            {/* Scenario Narrative Box */}
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-2 border border-slate-800 shadow-inner">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                🚨 Live Incident Context
              </span>
              <p className="italic font-mono">{currentScenario.context}</p>
            </div>

            {/* Tactical Question */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">{currentScenario.question}</h4>

              <div className="space-y-3">
                {currentScenario.options.map((opt) => {
                  const isSelected = selectedDecisionId === opt.id;
                  const isOptimal = opt.isOptimal;

                  let borderClass = 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white';
                  if (isSelected) {
                    borderClass = 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500';
                  }
                  if (simulationSubmitted) {
                    if (isOptimal) {
                      borderClass = 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500';
                    } else if (isSelected && !isOptimal) {
                      borderClass = 'border-rose-600 bg-rose-50/70 shadow-xs ring-1 ring-rose-500';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => !simulationSubmitted && setSelectedDecisionId(opt.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${borderClass}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
                            {opt.label}
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">{opt.text}</p>
                        </div>
                        {simulationSubmitted && isOptimal && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                      </div>

                      {simulationSubmitted && isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-200/70 text-xs">
                          <p className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>AI Diagnostic & Compliance Feedback:</span>
                          </p>
                          <p className="text-slate-600 leading-relaxed pl-5">{opt.analysis}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-400">
                AI simulator runs on Google Gemini inference engine
              </span>

              <div className="flex items-center gap-2">
                {simulationSubmitted ? (
                  <button
                    onClick={() => {
                      setSimulationSubmitted(false);
                      setSelectedDecisionId(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Another Decision</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSimulationSubmitted(true)}
                    disabled={!selectedDecisionId}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Evaluate Decision With AI</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: BROWSE CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Explore Course Catalog</h2>
              <p className="text-xs text-slate-500">Browse and self-enroll in organizational curricula</p>
            </div>

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
      )}

      {/* Modal: View Verifiable Certificate */}
      {selectedCert && (
        <CertificateModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          certificate={selectedCert}
        />
      )}

      {/* Modal: Submit New Capstone Project */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Submit Industrial Capstone</h3>
                <p className="text-xs text-slate-500">Submit your GitHub repo for mentor review</p>
              </div>
              <button
                onClick={() => setSubmitModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Capstone Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProject.projectTitle}
                  onChange={(e) => setNewProject({ ...newProject, projectTitle: e.target.value })}
                  placeholder="e.g. Distributed Rate Limiter & Monitoring Dashboard"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Associated Course
                </label>
                <select
                  value={newProject.courseTitle}
                  onChange={(e) => setNewProject({ ...newProject, courseTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Repository URL *
                </label>
                <div className="relative">
                  <GitBranch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/project-repo"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Live Production URL (Optional)
                </label>
                <div className="relative">
                  <ExternalLink className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    value={newProject.liveDemoUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveDemoUrl: e.target.value })}
                    placeholder="https://my-capstone.vercel.app"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
