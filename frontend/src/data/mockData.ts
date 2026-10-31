import type { User, Organization, Course, Enrollment, GamificationProfile } from '../types';

export const DEMO_USERS: Record<string, User> = {
  SUPER_ADMIN: {
    id: 'user-superadmin',
    email: 'superadmin@shekslms.com',
    firstName: 'Shek',
    lastName: 'GlobalAdmin',
    role: 'SUPER_ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    organizationName: 'Global SHEK Platform',
  },
  ORG_ADMIN: {
    id: 'user-orgadmin',
    email: 'admin@acme.com',
    firstName: 'Rajesh',
    lastName: 'Sharma',
    role: 'ORG_ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    organizationId: 'org-acme',
    organizationName: 'Acme Corporation',
    department: 'Engineering & People Ops',
    branch: 'Bengaluru HQ',
  },
  TRAINER: {
    id: 'user-trainer',
    email: 'trainer@acme.com',
    firstName: 'Ananya',
    lastName: 'Iyer',
    role: 'TRAINER',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    organizationId: 'org-acme',
    organizationName: 'Acme Corporation',
    department: 'L&D Technology',
    branch: 'Bengaluru HQ',
  },
  LEARNER: {
    id: 'user-learner',
    email: 'learner@acme.com',
    firstName: 'Arjun',
    lastName: 'Verma',
    role: 'LEARNER',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    organizationId: 'org-acme',
    organizationName: 'Acme Corporation',
    department: 'Software Engineering',
    branch: 'Bengaluru HQ',
  },
};

export const INITIAL_ORGS: Organization[] = [
  {
    id: 'org-acme',
    name: 'Acme Corporation',
    slug: 'acme',
    primaryColor: '#2563eb',
    userCount: 420,
    courseCount: 18,
    status: 'ACTIVE',
  },
  {
    id: 'org-e2e',
    name: 'E2E Management Consulting',
    slug: 'e2e-mgmt',
    primaryColor: '#059669',
    userCount: 150,
    courseCount: 12,
    status: 'ACTIVE',
  },
  {
    id: 'org-zenith',
    name: 'Zenith FinTech Global',
    slug: 'zenith',
    primaryColor: '#7c3aed',
    userCount: 890,
    courseCount: 35,
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
    enrolledLearnersCount: 320,
    status: 'PUBLISHED',
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
2. **Sender Domain Subtle Variations**: Look-alike domains (e.g., \`acme-internal-support.co\` vs \`acme.com\`).
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
    enrolledLearnersCount: 210,
    status: 'PUBLISHED',
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
            textContent: `# Enterprise Prompt Patterns

When automating documentation and data analysis, clear context framing and structural boundaries reduce hallucination by over 90%.

### Best Practices:
- Always define the exact persona and role constraint.
- Provide 2-3 canonical input/output examples (Few-shot learning).
- Instruct the model to cite specific document excerpts rather than generating speculative answers.`,
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
  points: 450,
  level: 2,
  currentStreak: 5,
  badges: [
    {
      id: 'badge-01',
      name: 'Cyber Shield',
      description: 'Completed information security threat hygiene',
      icon: 'ShieldCheck',
      awardedAt: '2026-10-28',
    },
    {
      id: 'badge-02',
      name: 'Fast Learner',
      description: 'Completed 3 lessons in a single 24-hour streak',
      icon: 'Zap',
      awardedAt: '2026-10-30',
    },
  ],
};
