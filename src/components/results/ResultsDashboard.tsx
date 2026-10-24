import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  TrendingUp,
  FileText,
  ShieldCheck,
  Check,
  Share2,
  Layers
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import type { SkillCategory } from '../../types/resume';

export const ResultsDashboard: React.FC = () => {
  const { currentAnalysis, setCurrentView, showToast } = useResume();

  const [skillFilter, setSkillFilter] = useState<'all' | 'found' | 'missing' | SkillCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!currentAnalysis) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 p-8">
        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Resume Analysis Selected</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Upload a resume or run an analysis to view your deep ATS report.
        </p>
        <button
          onClick={() => setCurrentView('analyzer')}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors"
        >
          Go to Resume Analyzer
        </button>
      </div>
    );
  }

  const {
    fileName,
    jobTitle,
    jobCompany,
    scores,
    summaryFeedback,
    skillsFound,
    missingSkills,
    strengths,
    suggestions,
    atsReadinessSummary,
    metadata
  } = currentAnalysis;

  const handleCopyText = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadReport = () => {
    const reportText = `# ResuMatch AI — Resume Analysis Report
Date: ${new Date(currentAnalysis.createdAt).toLocaleDateString()}
Candidate Resume: ${fileName}
Target Role: ${jobTitle} (${jobCompany || 'N/A'})

## Overall Match Score: ${scores.overall}/100
- ATS Compatibility: ${scores.atsCompatibility}%
- Keyword Match: ${scores.keywordMatch}%
- Quantifiable Impact: ${scores.impactMetrics}%
- Formatting & Readability: ${scores.formattingReadability}%

## Recruiter Summary
${summaryFeedback}

## Skills Found (${skillsFound.length})
${skillsFound.map((s) => `- [x] ${s.name} (${s.relevance}%)`).join('\n')}

## Missing Critical Keywords (${missingSkills.length})
${missingSkills.map((s) => `- [ ] ${s.name}`).join('\n')}

## Actionable Suggestions
${suggestions.map((s) => `### ${s.title} [${s.category.toUpperCase()}]\n${s.description}\nAction: ${s.actionableStep}`).join('\n\n')}
`;

    const blob = new Blob([reportText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName.replace(/\.[^/.]+$/, '')}_ATS_Report.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded ATS report (.md)');
  };

  // Filter skills
  const allSkills = [
    ...skillsFound.map((s) => ({ ...s, isMissing: false })),
    ...missingSkills.map((s) => ({ ...s, isMissing: true })),
  ];

  const filteredSkills = allSkills.filter((s) => {
    if (skillFilter === 'all') return true;
    if (skillFilter === 'found') return !s.isMissing;
    if (skillFilter === 'missing') return s.isMissing;
    return s.category === skillFilter;
  });


  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Top Banner / Actions Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 via-blue-50/30 to-transparent rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200/60">
                Analysis Complete
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {new Date(currentAnalysis.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {fileName}
            </h2>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              <span>Target Role: <strong className="text-slate-700">{jobTitle}</strong></span>
              {jobCompany && <span>• <span className="text-slate-600">{jobCompany}</span></span>}
              <span>• {metadata.pages} Page(s)</span>
              <span>• {metadata.wordCount} Words</span>
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 shadow-sm transition-all hover:border-purple-300"
            >
              <Download className="w-4 h-4 text-purple-600" />
              <span>Download Report</span>
            </button>

            <button
              onClick={() => {
                handleCopyText(
                  `ResuMatch Score: ${scores.overall}% for ${jobTitle} (${fileName})`,
                  'summary-share',
                  'Summary'
                );
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setCurrentView('analyzer')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Re-Analyze</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Overall Match Score */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-purple-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Match Score
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {scores.overall}
            </span>
            <span className="text-sm font-bold text-slate-400">/ 100</span>
          </div>

          <div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${scores.overall}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{atsReadinessSummary.verdict}</span>
            </p>
          </div>
        </div>

        {/* Card 2: ATS Pass Rate */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-purple-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ATS Compatibility
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {scores.atsCompatibility}%
            </span>
          </div>

          <div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                style={{ width: `${scores.atsCompatibility}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-slate-500 truncate">
              {atsReadinessSummary.passRateEstimated}
            </p>
          </div>
        </div>

        {/* Card 3: Skills Keyword Radar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-purple-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skills Found / Gaps
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              <Layers className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 my-2">
            <span className="text-4xl font-black text-emerald-600 tracking-tight">
              {skillsFound.length}
            </span>
            <span className="text-xs font-semibold text-slate-400">Found</span>
            <span className="text-slate-300">/</span>
            <span className="text-4xl font-black text-rose-500 tracking-tight">
              {missingSkills.length}
            </span>
            <span className="text-xs font-semibold text-slate-400">Missing</span>
          </div>

          <div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2 flex">
              <div
                className="bg-emerald-500 h-full"
                style={{
                  width: `${(skillsFound.length / Math.max(1, skillsFound.length + missingSkills.length)) * 100}%`,
                }}
              />
              <div
                className="bg-rose-400 h-full"
                style={{
                  width: `${(missingSkills.length / Math.max(1, skillsFound.length + missingSkills.length)) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs font-semibold text-slate-500">
              {Math.round(
                (skillsFound.length / Math.max(1, skillsFound.length + missingSkills.length)) * 100
              )}
              % Keyword Coverage
            </p>
          </div>
        </div>

        {/* Card 4: Actionable Recommendations */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-purple-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              AI Action Plan
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {suggestions.length}
            </span>
            <span className="text-xs font-semibold text-slate-400">Action items</span>
          </div>

          <div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-purple-600 h-full rounded-full"
                style={{ width: `${scores.impactMetrics}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-purple-600">
              {atsReadinessSummary.interviewChanceBoost}
            </p>
          </div>
        </div>
      </div>

      {/* Recruiter Summary Feedback & Sub-scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recruiter AI Executive Brief (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Recruiter Diagnostic Assessment
              </h3>
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
              AI Synthesis
            </span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed font-normal">
            {summaryFeedback}
          </p>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center font-bold shadow-sm shrink-0 border border-slate-100">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">
                Estimated Hiring Funnel Position:
              </span>
              <span className="text-slate-500">
                In the <strong>{scores.overall >= 85 ? 'top 10%' : scores.overall >= 75 ? 'top 20%' : scores.overall >= 60 ? 'top 40%' : 'lower 50%'} of candidates</strong> benchmarked for {jobTitle} roles with modern ATS pipelines.
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Metric Radar Bars (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-5">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>ATS Diagnostic Breakdown</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Metric 1 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Greenhouse / Workday ATS Parseability</span>
                <span className="text-purple-600 font-bold">{scores.atsCompatibility}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${scores.atsCompatibility}%` }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Target Role Keyword Overlap</span>
                <span className="text-indigo-600 font-bold">{scores.keywordMatch}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${scores.keywordMatch}%` }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Quantifiable XYZ Impact Metrics</span>
                <span className="text-blue-600 font-bold">{scores.impactMetrics}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${scores.impactMetrics}%` }}
                />
              </div>
            </div>

            {/* Metric 4 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Semantic Layout & Typography</span>
                <span className="text-emerald-600 font-bold">
                  {scores.formattingReadability}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${scores.formattingReadability}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Analysis Section (Found vs Missing) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xl tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>Skills Gap & Keyword Analysis</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Compare keywords present in your resume against target requirements.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: `All (${allSkills.length})` },
              { id: 'found', label: `Found (${skillsFound.length})` },
              { id: 'missing', label: `Missing (${missingSkills.length})` },
              { id: 'technical', label: 'Technical' },
              { id: 'cloud_devops', label: 'Cloud' },
              { id: 'soft_skills', label: 'Leadership' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSkillFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  skillFilter === f.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map((skill, index) => {
            const isMissing = skill.isMissing;
            return (
              <div
                key={index}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isMissing
                    ? 'bg-rose-50/50 border-rose-200/70 hover:border-rose-300'
                    : 'bg-purple-50/40 border-purple-100 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isMissing ? 'bg-rose-100 text-rose-600' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {isMissing ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{skill.name}</p>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {skill.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isMissing ? (
                    <button
                      onClick={() => handleCopyText(skill.name, `skill-${index}`, skill.name)}
                      className="px-2 py-1 bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                      title="Copy keyword to clipboard"
                    >
                      {copiedId === `skill-${index}` ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Match {skill.relevance}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Key Resume Strengths</h3>
            <p className="text-xs text-slate-500">Elements already giving you a competitive edge</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strengths.map((str) => (
            <div
              key={str.id}
              className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{str.title}</span>
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                  {str.impact} impact
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{str.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions & Before/After Rewrites Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Actionable AI Suggestions & Bullet Rewrites
              </h3>
              <p className="text-xs text-slate-500">
                1-click optimizations to boost your ATS score above 95%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {suggestions.map((sug) => {
            const isCritical = sug.category === 'critical';
            const isRecommended = sug.category === 'recommended';

            return (
              <div
                key={sug.id}
                className="p-6 rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 transition-all space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        isCritical
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isRecommended
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {sug.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 capitalize">
                      Section: {sug.section}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-1">{sug.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sug.description}
                  </p>
                </div>

                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-medium text-purple-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recommended Action:</strong> {sug.actionableStep}
                  </span>
                </div>

                {/* Before & After Rewrite Example Card */}
                {sug.rewriteExample && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Suggested Resume Bullet Rewrite:
                      </span>
                      <button
                        onClick={() =>
                          handleCopyText(sug.rewriteExample!.improved, sug.id, 'Rewritten bullet')
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold transition-all shadow-xs"
                      >
                        {copiedId === sug.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === sug.id ? 'Copied!' : 'Copy Improved Bullet'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Before */}
                      <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-rose-900">
                        <span className="text-[10px] font-bold uppercase text-rose-600 block mb-1">
                          Original (Vague):
                        </span>
                        "{sug.rewriteExample.original}"
                      </div>

                      {/* After */}
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium">
                        <span className="text-[10px] font-bold uppercase text-emerald-600 block mb-1">
                          Optimized (XYZ Formula + Metrics):
                        </span>
                        "{sug.rewriteExample.improved}"
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      Why it works: {sug.rewriteExample.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
