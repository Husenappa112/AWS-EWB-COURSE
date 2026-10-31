import type {
  User,
  Organization,
  Course,
  Enrollment,
  GamificationProfile,
  InterviewSchedule,
  ScheduledExam,
  ProjectSubmission,
} from '../types';

export const DEVELOPER_INFO = {
  name: 'Shekanna H',
  phone: '7022615394',
  email: 'shekanna@shekslms.com',
  title: 'Founder & Lead Architect',
  location: 'Bengaluru, India',
};

export const DEMO_USERS: Record<string, User> = {
  SUPER_ADMIN: {
    id: 'user-shekanna',
    email: 'shekanna@shekslms.com',
    firstName: 'Shekanna',
    lastName: 'H',
    phone: '7022615394',
    role: 'SUPER_ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    organizationName: 'SHEK\'s Global Platform HQ',
  },
  ORG_ADMIN: {
    id: 'user-orgadmin',
    email: 'admin@cloudscale.com',
    firstName: 'Vikram',
    lastName: 'Rao',
    phone: '9845123456',
    role: 'ORG_ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    organizationId: 'org-cloudscale',
    organizationName: 'CloudScale Technologies',
    department: 'Engineering & People Ops',
    branch: 'Bengaluru HQ',
  },
  TRAINER: {
    id: 'user-trainer',
    email: 'trainer@cloudscale.com',
    firstName: 'Ananya',
    lastName: 'Iyer',
    phone: '9880198801',
    role: 'TRAINER',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    organizationId: 'org-cloudscale',
    organizationName: 'CloudScale Technologies',
    department: 'L&D Technology',
    branch: 'Bengaluru HQ',
  },
  LEARNER: {
    id: 'user-learner',
    email: 'learner@cloudscale.com',
    firstName: 'Arjun',
    lastName: 'Verma',
    phone: '9900112233',
    role: 'LEARNER',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    organizationId: 'org-cloudscale',
    organizationName: 'CloudScale Technologies',
    department: 'Software Engineering',
    branch: 'Bengaluru HQ',
  },
};

export const INITIAL_ORGS: Organization[] = [
  {
    id: 'org-cloudscale',
    name: 'CloudScale Technologies',
    slug: 'cloudscale',
    primaryColor: '#2563eb',
    userCount: 640,
    courseCount: 22,
    status: 'ACTIVE',
  },
  {
    id: 'org-zenith',
    name: 'Zenith Global Financial',
    slug: 'zenith',
    primaryColor: '#7c3aed',
    userCount: 920,
    courseCount: 38,
    status: 'ACTIVE',
  },
  {
    id: 'org-apex',
    name: 'Apex HealthCare Systems',
    slug: 'apex-health',
    primaryColor: '#059669',
    userCount: 310,
    courseCount: 16,
    status: 'ACTIVE',
  },
  {
    id: 'org-novatech',
    name: 'NovaTech Innovations',
    slug: 'novatech',
    primaryColor: '#ea580c',
    userCount: 480,
    courseCount: 19,
    status: 'ACTIVE',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-cybersecurity-2026',
    title: 'Enterprise Cybersecurity Essentials 2026',
    slug: 'enterprise-cybersecurity-2026',
    description: 'Master defense fundamentals, spear-phishing detection, data classification, and incident reporting protocols.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    category: 'Information Security & Compliance',
    level: 'BEGINNER',
    durationMinutes: 45,
    passPercentage: 80,
    certificateEnabled: true,
    instructor: 'Ananya Iyer',
    price: '₹14,999 (Free for Org Employees)',
    trainer: {
      name: 'Ananya Iyer',
      title: 'Principal Security Architect & Lead Trainer',
      experience: '12+ Years Industry Experience',
      company: 'CloudScale Technologies',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    scheduleTiming: 'Mon-Fri 7:30 PM - 9:00 PM IST',
    batchStartDate: 'November 10, 2026',
    enrolledLearnersCount: 345,
    status: 'PUBLISHED',
    capstoneProject: {
      title: 'Production Multi-Cloud Zero-Trust SecOps Pipeline',
      description: 'Build an automated defense audit engine that flags credential misconfigurations, enforces FIDO2 WebAuthn policies, and triggers instant SIEM containment alerts.',
      industryScenario: 'CloudScale Technologies requires complete automated compliance across AWS & GCP environments without disrupting developer CI/CD workflows.',
      techStack: ['TypeScript', 'Node.js', 'FIDO2 / WebAuthn', 'Docker', 'Prisma', 'PostgreSQL'],
      deliverables: [
        'Live GitHub Repository with CI/CD GitHub Actions pipeline',
        'Zero-Trust Authentication gateway with device binding',
        'Automated vulnerability audit script & PDF report generator',
        'Architecture presentation & 1-on-1 mentor code defense',
      ],
      durationWeeks: 4,
    },
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Threat Landscape & Social Engineering',
        order: 1,
        lessons: [
          {
            id: 'les-1',
            title: '1.1 Recognizing Spear Phishing & AI-generated Spoofs',
            type: 'DOCUMENT',
            durationMinutes: 10,
            order: 1,
            isRequired: true,
            textContent: `# Recognizing Spear Phishing & Synthetic Spoofs

Modern spear-phishing campaigns no longer rely on misspelled generic emails. In 2026, enterprise attackers leverage multi-channel AI-generated voice clones, executive pretexting, and targeted social engineering.

### Top Indicators of a Targeted Attack:
1. **Urgency & Exception Requests**: Demands to bypass established procurement or wire authorization processes.
2. **Sender Domain Subtle Variations**: Look-alike domains (e.g., \`cloudscale-support.co\` vs \`cloudscale.com\`).
3. **Suspicious QR Codes (Quishing)**: Codes embedded in PDF invoices redirecting mobile browsers to credential harvesting forms.

> **Company Policy:** When in doubt, verify requests out-of-band using corporate Slack/Teams or internal extension dialling. Never reply directly to suspect communication.`,
          },
          {
            id: 'les-2',
            title: '1.2 Multi-Factor Authentication & Device Hygiene',
            type: 'VIDEO',
            durationMinutes: 15,
            order: 2,
            isRequired: true,
            contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            textContent: 'Watch this interactive overview on FIDO2 security keys, authenticator apps, and preventing MFA fatigue prompts.',
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Compliance Knowledge Check',
        order: 2,
        lessons: [
          {
            id: 'les-3',
            title: '2.1 Mandatory Cybersecurity Certification Quiz',
            type: 'QUIZ',
            durationMinutes: 15,
            order: 1,
            isRequired: true,
            assessment: {
              id: 'quiz-cyber-01',
              title: 'Cybersecurity Certification Assessment',
              timeLimitMinutes: 15,
              passPercentage: 80,
              questions: [
                {
                  id: 'q1',
                  type: 'MCQ',
                  prompt: 'Which Multi-Factor Authentication (MFA) method provides the highest defense against adversary-in-the-middle phishing attacks?',
                  points: 10,
                  options: [
                    { id: 'opt-1', text: 'SMS Text Message OTP', isCorrect: false },
                    { id: 'opt-2', text: 'FIDO2 Hardware Security Key (e.g., YubiKey)', isCorrect: true },
                    { id: 'opt-3', text: 'Email Verification Links', isCorrect: false },
                    { id: 'opt-4', text: 'Security Questions', isCorrect: false },
                  ],
                  explanation: 'FIDO2 / WebAuthn tokens are cryptographically bound to the origin domain, rendering spoofed phishing portals completely ineffective.',
                },
                {
                  id: 'q2',
                  type: 'MCQ',
                  prompt: 'You receive an urgent message on WhatsApp claiming to be your CEO, asking for an urgent gift card purchase or wire transfer. What is the required protocol?',
                  points: 10,
                  options: [
                    { id: 'opt-5', text: 'Comply immediately because it is the CEO', isCorrect: false },
                    { id: 'opt-6', text: 'Follow established verification SOP via verified corporate channels', isCorrect: true },
                    { id: 'opt-7', text: 'Forward the message to your personal email', isCorrect: false },
                  ],
                  explanation: 'Always follow internal standard operating procedures regardless of claimed urgency or seniority.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-fullstack-ts-2026',
    title: 'Full-Stack TypeScript & Enterprise React 19 Architecture',
    slug: 'fullstack-ts-react-19',
    description: 'Build modern high-scale multi-tenant web applications using React 19, Vite, Node.js Express, Prisma, and PostgreSQL with robust CI/CD.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    category: 'Engineering & Technology',
    level: 'INTERMEDIATE',
    durationMinutes: 90,
    passPercentage: 75,
    certificateEnabled: true,
    instructor: 'Shekanna H',
    price: '₹24,999 (Corporate Funded)',
    trainer: {
      name: 'Shekanna H',
      title: 'Lead Architect & Full-Stack Specialist',
      experience: '10+ Years Building Cloud Software',
      company: 'SHEK\'sLMS / CloudScale',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    scheduleTiming: 'Tue, Thu, Sat 8:00 PM - 9:30 PM IST',
    batchStartDate: 'November 15, 2026',
    enrolledLearnersCount: 412,
    status: 'PUBLISHED',
    capstoneProject: {
      title: 'Real-Time Multi-Tenant Collaboration Platform',
      description: 'Architect a full-stack platform supporting tenant subdomains, WebSocket sync, role-based ACLs, and automated PostgreSQL migrations.',
      industryScenario: 'Enterprise customers require instantaneous synchronized document editing with zero data leakage across company boundaries.',
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'Redis'],
      deliverables: [
        'End-to-End responsive SPA with mobile support',
        'Secured REST and WebSocket API with JWT auth',
        'Prisma multi-tenant schema with seed data script',
        'Comprehensive unit & integration test coverage (Jest / Vitest)',
      ],
      durationWeeks: 6,
    },
    modules: [
      {
        id: 'mod-fs-1',
        title: 'Module 1: React 19 Hooks, Server State & Design Systems',
        order: 1,
        lessons: [
          {
            id: 'les-fs-1',
            title: '1.1 Modern React 19 Patterns & TypeScript Type-Safety',
            type: 'DOCUMENT',
            durationMinutes: 25,
            order: 1,
            isRequired: true,
            textContent: `# Modern React 19 Architecture\n\nUnderstand actions, optimistic updates, and clean modular layout separation.`,
          },
        ],
      },
    ],
  },
  {
    id: 'course-ai-workplace-2026',
    title: 'Generative AI for Workplace Productivity & Ethics',
    slug: 'genai-workplace-2026',
    description: 'Learn how to leverage LLMs safely, prevent proprietary data leakage, craft effective prompts, and evaluate AI hallucination risks.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    category: 'Modern AI & Machine Learning',
    level: 'INTERMEDIATE',
    durationMinutes: 60,
    passPercentage: 75,
    certificateEnabled: true,
    instructor: 'Ananya Iyer',
    price: '₹18,999 (Free for Org Employees)',
    trainer: {
      name: 'Ananya Iyer',
      title: 'AI Curriculum Lead',
      experience: '12+ Years Industry Experience',
      company: 'CloudScale Technologies',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    scheduleTiming: 'Mon, Wed, Fri 6:30 PM - 8:00 PM IST',
    batchStartDate: 'November 22, 2026',
    enrolledLearnersCount: 280,
    status: 'PUBLISHED',
    capstoneProject: {
      title: 'Context-Aware AI Document Assistant with RAG',
      description: 'Implement an intelligent enterprise document assistant that retrieves company policy PDFs, embeds excerpts, and answers queries with verified citations.',
      industryScenario: 'Zenith Global Financial employees need instant answers from 500+ pages of financial regulation manuals with zero hallucinations.',
      techStack: ['Python / TypeScript', 'Gemini API', 'Vector Embeddings', 'Node.js', 'React'],
      deliverables: [
        'Document parsing and chunking ingestion pipeline',
        'Hybrid semantic search and vector retrieval system',
        'React chat widget with exact citation hyperlinks',
        'Red-team evaluation benchmark assessing hallucination rate',
      ],
      durationWeeks: 4,
    },
    modules: [
      {
        id: 'mod-ai-1',
        title: 'Module 1: Enterprise Prompt Engineering',
        order: 1,
        lessons: [
          {
            id: 'les-ai-1',
            title: '1.1 Zero-Shot vs Few-Shot Prompt Patterns',
            type: 'DOCUMENT',
            durationMinutes: 20,
            order: 1,
            isRequired: true,
            textContent: `# Enterprise Prompt Patterns\n\nWhen automating documentation and data analysis, clear context framing and structural boundaries reduce hallucination by over 90%.`,
          },
        ],
      },
    ],
  },
];

export const INITIAL_ENROLLMENT: Enrollment = {
  id: 'enr-01',
  courseId: 'course-cybersecurity-2026',
  course: INITIAL_COURSES[0],
  progress: 50,
  status: 'IN_PROGRESS',
  completedLessons: ['les-1'],
  lastAccessedLessonId: 'les-2',
};

export const INITIAL_GAMIFICATION: GamificationProfile = {
  points: 650,
  level: 3,
  currentStreak: 7,
  badges: [
    {
      id: 'badge-01',
      name: 'Cyber Shield',
      description: 'Completed threat hygiene & compliance check',
      icon: 'ShieldCheck',
      awardedAt: '2026-10-24',
    },
    {
      id: 'badge-02',
      name: 'Fast Learner',
      description: 'Completed 3 lessons in a single 24-hour streak',
      icon: 'Zap',
      awardedAt: '2026-10-28',
    },
    {
      id: 'badge-03',
      name: '7-Day Master',
      description: 'Maintained continuous 7-day study consistency',
      icon: 'Flame',
      awardedAt: '2026-10-31',
    },
  ],
};

export const INITIAL_INTERVIEWS: InterviewSchedule[] = [
  {
    id: 'int-01',
    title: 'Senior Frontend & React 19 Technical Mock Interview',
    roleTarget: 'Senior Frontend Engineer',
    companyTarget: 'CloudScale Technologies (Bengaluru)',
    interviewerName: 'Shekanna H (Principal Architect)',
    dateTime: 'November 12, 2026 at 4:30 PM IST',
    status: 'SCHEDULED',
    meetLink: 'https://meet.google.com/shek-lms-mock',
  },
  {
    id: 'int-02',
    title: 'Enterprise Security Architecture Placement Screening',
    roleTarget: 'Information Security Specialist',
    companyTarget: 'Zenith Global Financial',
    interviewerName: 'Ananya Iyer (L&D Director)',
    dateTime: 'November 18, 2026 at 6:00 PM IST',
    status: 'SCHEDULED',
    meetLink: 'https://meet.google.com/shek-lms-zenith',
  },
];

export const INITIAL_EXAMS: ScheduledExam[] = [
  {
    id: 'exam-01',
    title: 'Mandatory Information Security Mid-Term Examination',
    courseTitle: 'Enterprise Cybersecurity Essentials 2026',
    dateTime: 'November 14, 2026 at 10:00 AM IST',
    durationMinutes: 45,
    totalMarks: 100,
    status: 'UPCOMING',
  },
  {
    id: 'exam-02',
    title: 'Full-Stack Production Readiness Capstone Evaluation',
    courseTitle: 'Full-Stack TypeScript & Enterprise React 19 Architecture',
    dateTime: 'November 25, 2026 at 2:00 PM IST',
    durationMinutes: 60,
    totalMarks: 100,
    status: 'UPCOMING',
  },
];

export const INITIAL_PROJECT_SUBMISSIONS: ProjectSubmission[] = [
  {
    id: 'sub-01',
    projectTitle: 'Production Multi-Cloud Zero-Trust SecOps Pipeline',
    courseTitle: 'Enterprise Cybersecurity Essentials 2026',
    githubUrl: 'https://github.com/arjun-verma/zero-trust-secops',
    liveDemoUrl: 'https://secops-demo.cloudscale.internal',
    submittedDate: 'October 29, 2026',
    status: 'APPROVED',
    mentorFeedback: 'Outstanding work on FIDO2 cryptographic tokens. Automated vulnerability parser exceeds corporate benchmarks.',
    grade: 'A+ (96%)',
  },
];
