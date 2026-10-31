export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'TRAINER' | 'LEARNER';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  organizationId?: string | null;
  organizationName?: string;
  department?: string;
  branch?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor: string;
  userCount: number;
  courseCount: number;
  status: 'ACTIVE' | 'SUSPENDED';
}

export type LessonType = 'DOCUMENT' | 'VIDEO' | 'PDF' | 'QUIZ' | 'ASSIGNMENT' | 'SCORM';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  type: 'MCQ' | 'MULTIPLE_SELECT' | 'TRUE_FALSE';
  prompt: string;
  explanation?: string;
  points: number;
  options: QuestionOption[];
}

export interface Assessment {
  id: string;
  title: string;
  timeLimitMinutes: number;
  passPercentage: number;
  questions: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  contentUrl?: string;
  textContent?: string;
  order: number;
  isRequired: boolean;
  assessment?: Assessment;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseProject {
  title: string;
  description: string;
  industryScenario: string;
  techStack: string[];
  deliverables: string[];
  durationWeeks: number;
}

export interface CourseTrainer {
  name: string;
  title: string;
  experience: string;
  company: string;
  avatarUrl: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationMinutes: number;
  passPercentage: number;
  certificateEnabled: boolean;
  modules: Module[];
  instructor: string;
  trainer: CourseTrainer;
  scheduleTiming: string;
  batchStartDate: string;
  capstoneProject: CourseProject;
  enrolledLearnersCount: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  price: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  course: Course;
  progress: number;
  status: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED';
  completedLessons: string[];
  lastAccessedLessonId?: string;
}

export interface GamificationProfile {
  points: number;
  level: number;
  currentStreak: number;
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    awardedAt: string;
  }[];
}

export interface Certificate {
  id: string;
  courseId?: string;
  courseTitle: string;
  recipientName: string;
  organizationName: string;
  certificateCode: string;
  issuedDate: string;
  grade: number;
}

export interface InterviewSchedule {
  id: string;
  title: string;
  roleTarget: string;
  companyTarget: string;
  interviewerName: string;
  dateTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'FEEDBACK_READY';
  meetLink: string;
  feedback?: string;
  score?: number;
}

export interface ScheduledExam {
  id: string;
  title: string;
  courseTitle: string;
  dateTime: string;
  durationMinutes: number;
  totalMarks: number;
  status: 'UPCOMING' | 'COMPLETED';
  score?: number;
}

export interface ProjectSubmission {
  id: string;
  projectTitle: string;
  courseTitle: string;
  githubUrl: string;
  liveDemoUrl?: string;
  submittedDate: string;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'NEEDS_CHANGES';
  mentorFeedback?: string;
  grade?: string;
}
