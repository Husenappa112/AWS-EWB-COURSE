import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModals } from './components/AuthModals';
import { AIChatbotWidget } from './components/AIChatbotWidget';
import { DemoGuideModal } from './components/DemoGuideModal';
import { HomePage } from './pages/public/HomePage';
import { CoursesCatalogPage } from './pages/public/CoursesCatalogPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LearnerDashboard } from './pages/learner/LearnerDashboard';
import { TrainerDashboard } from './pages/trainer/TrainerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CoursePlayer } from './pages/learner/CoursePlayer';

const MainContent: React.FC = () => {
  const { activeNavTab, currentRole, activeCoursePlayerId, setActiveCoursePlayerId } = useApp();
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar onOpenDemoInfo={() => setDemoGuideOpen(true)} />

      {/* Dynamic Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeNavTab === 'home' && <HomePage />}
        {activeNavTab === 'courses' && <CoursesCatalogPage />}
        {activeNavTab === 'projects' && <ProjectsPage />}
        {activeNavTab === 'about' && <AboutPage />}
        {activeNavTab === 'contact' && <ContactPage />}

        {activeNavTab === 'portal' && (
          <div>
            {currentRole === 'LEARNER' && <LearnerDashboard />}
            {currentRole === 'TRAINER' && <TrainerDashboard />}
            {(currentRole === 'SUPER_ADMIN' || currentRole === 'ORG_ADMIN') && <AdminDashboard />}
          </div>
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer onOpenDemoInfo={() => setDemoGuideOpen(true)} />

      {/* Floating 24/7 AI Knowledge Assistant */}
      <AIChatbotWidget />

      {/* Authentication & 1-Click Role Login Modals */}
      <AuthModals />

      {/* Demo Credentials & Architecture Evaluation Guide Modal */}
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
