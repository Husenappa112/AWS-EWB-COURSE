import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  User,
  UserRole,
  Course,
  Enrollment,
  GamificationProfile,
  InterviewSchedule,
  ScheduledExam,
  ProjectSubmission,
} from '../types';
import {
  DEMO_USERS,
  INITIAL_COURSES,
  INITIAL_ENROLLMENT,
  INITIAL_GAMIFICATION,
  INITIAL_INTERVIEWS,
  INITIAL_EXAMS,
  INITIAL_PROJECT_SUBMISSIONS,
} from '../data/mockData';

export type ActiveNavTab = 'home' | 'courses' | 'projects' | 'about' | 'contact' | 'portal';

interface AppContextType {
  activeNavTab: ActiveNavTab;
  setActiveNavTab: (tab: ActiveNavTab) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  courses: Course[];
  enrollments: Enrollment[];
  gamification: GamificationProfile;
  interviews: InterviewSchedule[];
  exams: ScheduledExam[];
  projectSubmissions: ProjectSubmission[];
  enrollInCourse: (courseId: string) => void;
  updateLessonProgress: (courseId: string, lessonId: string, isCompleted: boolean) => void;
  activeCoursePlayerId: string | null;
  setActiveCoursePlayerId: (id: string | null) => void;
  addCourse: (course: Course) => void;
  submitProject: (submission: Omit<ProjectSubmission, 'id' | 'submittedDate' | 'status'>) => void;
  authModalType: 'login' | 'signup' | null;
  setAuthModalType: (type: 'login' | 'signup' | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeNavTab, setActiveNavTab] = useState<ActiveNavTab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<UserRole>('LEARNER');
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.LEARNER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([INITIAL_ENROLLMENT]);
  const [gamification, setGamification] = useState<GamificationProfile>(INITIAL_GAMIFICATION);
  const [interviews] = useState<InterviewSchedule[]>(INITIAL_INTERVIEWS);
  const [exams] = useState<ScheduledExam[]>(INITIAL_EXAMS);
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>(INITIAL_PROJECT_SUBMISSIONS);
  const [activeCoursePlayerId, setActiveCoursePlayerId] = useState<string | null>(null);
  const [authModalType, setAuthModalType] = useState<'login' | 'signup' | null>(null);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role] || null);
    setIsLoggedIn(true);
    setActiveCoursePlayerId(null);
    setActiveNavTab('portal');
  };

  const loginAs = (role: UserRole) => {
    switchRole(role);
    setAuthModalType(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveNavTab('home');
    setActiveCoursePlayerId(null);
  };

  const enrollInCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    if (enrollments.some((e) => e.courseId === courseId)) {
      setActiveCoursePlayerId(courseId);
      setActiveNavTab('portal');
      return;
    }

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      courseId,
      course,
      progress: 0,
      status: 'ENROLLED',
      completedLessons: [],
      lastAccessedLessonId: course.modules[0]?.lessons[0]?.id,
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);
    setActiveCoursePlayerId(courseId);
    setActiveNavTab('portal');
  };

  const updateLessonProgress = (courseId: string, lessonId: string, isCompleted: boolean) => {
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.courseId !== courseId) return enr;

        const completedSet = new Set(enr.completedLessons);
        if (isCompleted) {
          completedSet.add(lessonId);
        }

        const totalLessons = enr.course.modules.flatMap((m) => m.lessons).length;
        const completedCount = completedSet.size;
        const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 100;

        return {
          ...enr,
          completedLessons: Array.from(completedSet),
          progress: progressPercent,
          status: progressPercent >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
          lastAccessedLessonId: lessonId,
        };
      })
    );

    // Award gamification points on completion
    if (isCompleted) {
      setGamification((prev) => ({
        ...prev,
        points: prev.points + 50,
      }));
    }
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const submitProject = (submission: Omit<ProjectSubmission, 'id' | 'submittedDate' | 'status'>) => {
    const newSub: ProjectSubmission = {
      ...submission,
      id: `sub-${Date.now()}`,
      submittedDate: 'Just now',
      status: 'UNDER_REVIEW',
      mentorFeedback: 'Submitted successfully! Mentor review will be posted within 24 hours.',
    };
    setProjectSubmissions((prev) => [newSub, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeNavTab,
        setActiveNavTab,
        isLoggedIn,
        currentUser,
        currentRole,
        switchRole,
        loginAs,
        logout,
        courses,
        enrollments,
        gamification,
        interviews,
        exams,
        projectSubmissions,
        enrollInCourse,
        updateLessonProgress,
        activeCoursePlayerId,
        setActiveCoursePlayerId,
        addCourse,
        submitProject,
        authModalType,
        setAuthModalType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
