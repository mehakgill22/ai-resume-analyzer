import React from 'react';
import {
  Upload,
  BarChart3,
  History,
  Settings,
  Sparkles,
  ShieldCheck,
  X,
  Plus
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import type { NavView } from '../../types/resume';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentView, setCurrentView, analysesHistory, selectAnalysis, currentAnalysis } = useResume();

  const navItems: { id: NavView; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'landing', label: 'Home Overview', icon: Sparkles },
    { id: 'analyzer', label: 'Resume Analyzer', icon: Upload, badge: 'AI' },
    { id: 'results', label: 'Results Dashboard', icon: BarChart3 },
    { id: 'history', label: 'Recent Analyses', icon: History, badge: `${analysesHistory.length}` },
    { id: 'settings', label: 'Settings & API', icon: Settings },
  ];

  const handleNavClick = (view: NavView) => {
    setCurrentView(view);
    setMobileOpen(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">ResuMatch</span>
                <span className="text-xs font-bold text-purple-600 px-1.5 py-0.5 rounded-md bg-purple-50 border border-purple-200/60">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">ATS Optimization Engine</p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <button
            onClick={() => handleNavClick('analyzer')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white rounded-2xl text-sm font-semibold shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Analyze New Resume</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-2 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-50/80 text-purple-700 shadow-sm border border-purple-100/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-purple-200/80 text-purple-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recent Analyses Quick List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0 border-t border-slate-100 mt-2">
          <div className="flex items-center justify-between px-3 py-1 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Recent Analyses
            </span>
            <button
              onClick={() => handleNavClick('history')}
              className="text-[11px] font-semibold text-purple-600 hover:text-purple-700"
            >
              View All
            </button>
          </div>

          <div className="space-y-1.5">
            {analysesHistory.slice(0, 4).map((item) => {
              const isSelected = currentAnalysis?.id === item.id && currentView === 'results';
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    selectAnalysis(item.id);
                    setMobileOpen(false);
                  }}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-200/80 shadow-sm'
                      : 'bg-slate-50/50 hover:bg-slate-100/70 border-slate-100 hover:border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800 truncate flex-1">
                      {item.fileName.replace('.pdf', '')}
                    </p>
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${getScoreColor(
                        item.scores.overall
                      )}`}
                    >
                      {item.scores.overall}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {item.jobTitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Summary Card / ATS Benchmark Widget */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="p-3.5 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-blue-500/10 rounded-2xl border border-purple-100/70">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-800">ATS Engine v2.4</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
              <span>Average Match:</span>
              <span className="font-bold text-slate-900">
                {analysesHistory.length > 0
                  ? `${Math.round(
                      analysesHistory.reduce((acc, c) => acc + c.scores.overall, 0) /
                        analysesHistory.length
                    )}%`
                  : '—'}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-500"
                style={{
                  width: `${
                    analysesHistory.length > 0
                      ? Math.round(
                          analysesHistory.reduce((acc, c) => acc + c.scores.overall, 0) /
                            analysesHistory.length
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Greenhouse & Workday parser models loaded
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
