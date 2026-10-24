import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Target,
  Zap,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const LandingPage: React.FC = () => {
  const { setCurrentView, loadSampleResume } = useResume();

  const features = [
    {
      icon: Target,
      title: 'ATS Keyword Match Radar',
      description: 'Pinpoints exactly which required skills, frameworks, and domain keywords are missing from your resume before you apply.',
      accent: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Zap,
      title: 'AI Bullet Point Rewriter',
      description: 'Transforms passive duty descriptions into high-impact achievements formatted with quantifiable metrics (XYZ formula).',
      accent: 'from-indigo-500 to-blue-500',
    },
    {
      icon: ShieldCheck,
      title: 'Greenhouse & Workday Compliance',
      description: 'Audits font hierarchy, section titles, and layout structure to guarantee 100% parseability across enterprise ATS systems.',
      accent: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'Holistic Match Scoring',
      description: 'Detailed multi-dimensional scoring evaluating ATS compatibility, keyword density, role relevancy, and readability.',
      accent: 'from-purple-600 to-blue-600',
    },
  ];

  const stats = [
    { value: '94%', label: 'ATS First-Round Pass Rate' },
    { value: '3.4x', label: 'More Interview Callbacks' },
    { value: '150k+', label: 'Resumes Benchmarked' },
    { value: '< 5s', label: 'Instant AI Diagnostic' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-gradient-to-tr from-purple-200/40 via-indigo-200/30 to-blue-200/40 blur-3xl -z-10 rounded-full pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200/80 shadow-sm shadow-purple-500/10 mb-6 text-xs sm:text-sm font-semibold text-purple-700 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-ping" />
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Next-Gen AI Resume & ATS Diagnostic Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
          Build a Resume That <br className="hidden sm:inline" />
          <span className="text-gradient">Gets Noticed</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Applicant tracking systems reject over 75% of resumes before a human ever reads them.
          ResuMatch AI audits your resume against target job descriptions to fix keyword gaps, formatting traps, and weak bullets.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => setCurrentView('analyzer')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white rounded-2xl font-bold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/35 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 group"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentView('analyzer')}
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-semibold text-base border border-slate-200/90 shadow-sm hover:border-purple-200 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Upload Resume</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Instant Analysis
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Works with PDF & DOCX
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tailored to Any Job Spec
          </span>
        </div>

        {/* Hero Preview Card Showcase */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl shadow-indigo-500/10 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl -z-10" />

            {/* Mock Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200/50">
                  Live Preview
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  Alex_Chen_Senior_FullStack_Resume.pdf
                </h3>
                <p className="text-xs text-slate-500">Target Role: Senior Full Stack Engineer • Stripe</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">ATS Match Score</div>
                  <div className="text-2xl font-black text-purple-600">88%</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-purple-200 flex items-center justify-center font-bold text-xs text-purple-700 bg-white">
                  88
                </div>
              </div>
            </div>

            {/* Interactive Preview Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Left Column: Skills Radar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Detected Key Competencies (12)
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">92% Match</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS ECS', 'System Design'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50/80 text-purple-700 border border-purple-200/60"
                      >
                        ✓ {skill}
                      </span>
                    )
                  )}
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500 block mb-2">
                    Missing Target Keywords (Need Attention)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Apache Kafka', 'Kubernetes Orchestration', 'Terraform'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200"
                      >
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Bullet Rewriter Example */}
              <div className="p-4 bg-gradient-to-br from-purple-50/50 via-slate-50/50 to-blue-50/50 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-purple-700">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI Quantified Bullet Point Optimizer</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-800">
                    <span className="font-bold block text-[10px] uppercase text-rose-500 mb-0.5">
                      Before (Passive duty):
                    </span>
                    "Integrated backend services with message queues to process payment notifications asynchronously."
                  </div>

                  <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-900">
                    <span className="font-bold block text-[10px] uppercase text-emerald-600 mb-0.5">
                      After AI Rewrite (XYZ formula):
                    </span>
                    "Architected event-driven microservices using Apache Kafka & Redis Pub/Sub, processing 15,000+ async transactions/sec with 99.99% fault tolerance."
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Button in preview */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Ready to see your real resume score?
              </span>
              <button
                onClick={() => setCurrentView('analyzer')}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
              >
                <span>Upload & Test Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center hover:border-purple-200 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
            Engineered For Modern Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Everything You Need To Pass The 6-Second Screen
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Designed around how recruiters and modern algorithmic ATS filters actually process candidate resumes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-200 transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.accent} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Optimize in Under 60 Seconds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center mb-4 border border-purple-500/30">
                1
              </div>
              <h4 className="font-bold text-base text-white mb-2">Upload Resume</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Drop your current PDF or Word resume. Our parser reconstructs your sections without altering raw formatting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center mb-4 border border-indigo-500/30">
                2
              </div>
              <h4 className="font-bold text-base text-white mb-2">Paste Job Spec</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Add the job description you want to apply for or pick from our curated tech and leadership templates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center mb-4 border border-blue-500/30">
                3
              </div>
              <h4 className="font-bold text-base text-white mb-2">Get Actionable Report</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Review your ATS score, instant keyword checklist, and 1-click bullet point suggestions to elevate your resume.
              </p>
            </div>
          </div>

          {/* Bottom CTA within banner */}
          <div className="mt-10 text-center">
            <button
              onClick={() => setCurrentView('analyzer')}
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Analyze Your Resume Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
