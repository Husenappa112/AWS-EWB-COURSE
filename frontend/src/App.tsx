import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DemoGuideModal } from './components/DemoGuideModal';
import { LearnerDashboard } from './pages/learner/LearnerDashboard';
import { TrainerDashboard } from './pages/trainer/TrainerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CoursePlayer } from './pages/learner/CoursePlayer';

const MainContent: React.FC = () => {
  const { currentRole, activeCoursePlayerId, setActiveCoursePlayerId } = useApp();
  const [demoGuideOpen, setDemoGuideOpen] = useState(false);

  // If a course is actively open in the player, show the immersive distraction-free player
  if (activeCoursePlayerId) {
    return (
      <CoursePlayer
        courseId={activeCoursePlayerId}
        onBack={() => setActiveCoursePlayerId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar onOpenDemoInfo={() => setDemoGuideOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'LEARNER' && <LearnerDashboard />}
        {currentRole === 'TRAINER' && <TrainerDashboard />}
        {(currentRole === 'SUPER_ADMIN' || currentRole === 'ORG_ADMIN') && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">SHEK'sLMS — Cloud-based Enterprise LMS</p>
        <p className="mt-1">
          Demonstration Application for E2E Management (Bengaluru) · React 19 · TypeScript · Vite · Tailwind · Node.js · Prisma
        </p>
      </footer>

      {/* Demo Credentials & Architecture Guide Modal */}
      <DemoGuideModal isOpen={demoGuideOpen} onClose={() => setDemoGuideOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
