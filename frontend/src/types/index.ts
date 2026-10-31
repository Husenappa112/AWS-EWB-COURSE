export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'TRAINER' | 'LEARNER';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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
  enrolledLearnersCount: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
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
