import React, { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { ResumeAnalyzerPage } from './components/analyzer/ResumeAnalyzerPage';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { RecentAnalysesPage } from './components/history/RecentAnalysesPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { Toast } from './components/common/Toast';
import { LoadingModal } from './components/common/LoadingModal';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useResume();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'analyzer':
        return <ResumeAnalyzerPage />;
      case 'results':
        return <ResultsDashboard />;
      case 'history':
        return <RecentAnalysesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      {/* Sidebar (Desktop fixed & Mobile drawer) */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area (Offset by sidebar width on lg screens) */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0 transition-all duration-300">
        {/* Sticky Header Navbar */}
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Page View Body */}
        <main className="flex-1 px-4 sm:px-8 pt-8 max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>

        {/* App Footer */}
        <footer className="mt-auto border-t border-slate-100 bg-white/70 py-6 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                R
              </div>
              <span className="font-semibold text-slate-700">ResuMatch AI</span>
              <span>— Modern AI SaaS Resume & ATS Diagnostic Engine</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('settings')}
                className="hover:text-purple-600 transition-colors"
              >
                Python API Docs
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentView('analyzer')}
                className="hover:text-purple-600 transition-colors"
              >
                Analyze Resume
              </button>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                Greenhouse & Workday Compatible
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Interactive Elements */}
      <LoadingModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
