import React from 'react';
import { Menu, Sparkles, FileText } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { currentView, setCurrentView, loadSampleResume, currentAnalysis } = useResume();

  const getPageTitle = () => {
    switch (currentView) {
      case 'landing':
        return 'Overview';
      case 'analyzer':
        return 'Resume Analyzer';
      case 'results':
        return 'Analysis Results';
      case 'history':
        return 'Recent Analyses';
      case 'settings':
        return 'Settings & Backend';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100/90 transition-all">
      <div className="h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Left Side: Mobile toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                ResuMatch
              </span>
              <span className="text-slate-300">/</span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
            {currentView === 'results' && currentAnalysis && (
              <p className="text-xs text-slate-400 hidden sm:block truncate max-w-md">
                Viewing: {currentAnalysis.fileName} • {currentAnalysis.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Quick Action Pills */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Upload Button */}
          <button
            onClick={() => setCurrentView('analyzer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-all hover:border-slate-300"
            title="Upload and analyze a resume"
          >
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>Upload Resume</span>
          </button>

          {/* Analyze Resume Main CTA */}
          <button
            onClick={() => setCurrentView('analyzer')}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
