import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, UserRole, Course, Enrollment, GamificationProfile } from '../types';
import { DEMO_USERS, INITIAL_COURSES, INITIAL_ENROLLMENT, INITIAL_GAMIFICATION } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  courses: Course[];
  enrollments: Enrollment[];
  gamification: GamificationProfile;
  enrollInCourse: (courseId: string) => void;
  updateLessonProgress: (courseId: string, lessonId: string, isCompleted: boolean) => void;
  activeCoursePlayerId: string | null;
  setActiveCoursePlayerId: (id: string | null) => void;
  addCourse: (course: Course) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('LEARNER');
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.LEARNER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([INITIAL_ENROLLMENT]);
  const [gamification, setGamification] = useState<GamificationProfile>(INITIAL_GAMIFICATION);
  const [activeCoursePlayerId, setActiveCoursePlayerId] = useState<string | null>(null);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role] || null);
    setActiveCoursePlayerId(null);
  };

  const enrollInCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    if (enrollments.some((e) => e.courseId === courseId)) return;

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

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        courses,
        enrollments,
        gamification,
        enrollInCourse,
        updateLessonProgress,
        activeCoursePlayerId,
        setActiveCoursePlayerId,
        addCourse,
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
