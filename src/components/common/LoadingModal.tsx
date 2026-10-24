import React from 'react';
import { Loader2, CheckCircle2, Sparkles, FileText, Cpu, Target, Award } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const LoadingModal: React.FC = () => {
  const { isAnalyzing, analysisStep } = useResume();

  if (!isAnalyzing) return null;

  const steps = [
    { title: 'Parsing document structure', desc: 'Analyzing layout, typography & semantic headers', icon: FileText },
    { title: 'Extracting skills & experience', desc: 'Identifying technical tools and leadership indicators', icon: Cpu },
    { title: 'Benchmarking against ATS', desc: 'Computing keyword density & match percentage', icon: Target },
    { title: 'Generating AI recommendations', desc: 'Writing bullet point rewrites & optimization tips', icon: Award },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100/80 relative overflow-hidden">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full blur-[2px]" />

        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 animate-pulse-slow">
              <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-purple-400/20 blur-xl -z-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">AI Deep Diagnostic</h3>
          <p className="text-sm text-slate-500 mt-1">Analyzing your resume against target ATS models</p>
        </div>

        {/* Steps Tracker */}
        <div className="space-y-3.5 mb-6">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isCompleted = analysisStep > stepNum;
            const isCurrent = analysisStep === stepNum;
            const StepIcon = step.icon;

            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-300 border ${
                  isCurrent
                    ? 'bg-purple-50/70 border-purple-200/80 translate-x-1 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-100 text-slate-700'
                    : 'bg-slate-50/50 border-transparent text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-purple-900' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    {isCurrent && (
                      <span className="text-[11px] font-medium text-purple-600 animate-pulse uppercase tracking-wider">
                        Processing
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(15, (analysisStep / 4) * 100))}%` }}
          />
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Engineered for Greenhouse, Workday, Taleo & Lever ATS pipelines
        </p>
      </div>
    </div>
  );
};
