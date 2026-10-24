import React, { useState } from 'react';
import {
  History,
  Search,
  Trash2,
  ExternalLink,
  FileText,
  Sparkles,
  TrendingUp,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const RecentAnalysesPage: React.FC = () => {
  const { analysesHistory, selectAnalysis, deleteAnalysis, setCurrentView } = useResume();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnalyses = analysesHistory.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.jobCompany && item.jobCompany.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const avgScore =
    analysesHistory.length > 0
      ? Math.round(
          analysesHistory.reduce((acc, curr) => acc + curr.scores.overall, 0) /
            analysesHistory.length
        )
      : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Audit History</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recent Resume Analyses
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Review past scores, keyword benchmarks, and actionable feedback reports.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('analyzer')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Analyzed
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {analysesHistory.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Average Match
            </span>
            <span className="text-2xl font-black text-purple-600 mt-1 block">
              {avgScore}%
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              ATS Ready (&gt;80%)
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {analysesHistory.filter((i) => i.scores.overall >= 80).length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by resume filename, job role, or company..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
        />
      </div>

      {/* List / Grid */}
      {filteredAnalyses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No matching analyses found</h4>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or upload a new resume.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAnalyses.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-black border ${getScoreColor(
                      item.scores.overall
                    )}`}
                  >
                    {item.scores.overall}% Score
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-600 transition-colors truncate">
                  {item.fileName}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Target: {item.jobTitle}
                </p>

                {/* Sub metrics pills */}
                <div className="flex items-center gap-2 mt-4 text-[11px] font-semibold text-slate-600 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100">
                    ATS: {item.scores.atsCompatibility}%
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                    {item.skillsFound.length} Found
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                    {item.missingSkills.length} Missing
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => selectAnalysis(item.id)}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group/btn"
                >
                  <span>View Full Report</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => deleteAnalysis(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
