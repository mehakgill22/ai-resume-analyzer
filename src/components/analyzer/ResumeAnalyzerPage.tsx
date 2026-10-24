import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { JOB_TEMPLATES } from '../../data/mockData';

export const ResumeAnalyzerPage: React.FC = () => {
  const { runAnalysis, showToast } = useResume();

  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [targetCompany, setTargetCompany] = useState('');
  const [jobDescription, setJobDescription] = useState(JOB_TEMPLATES[0].description);
  const [analysisMode, setAnalysisMode] = useState<'standard' | 'strict_ats' | 'executive'>('standard');
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (f: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    const isPdfOrDoc =
      validTypes.includes(f.type) ||
      f.name.endsWith('.pdf') ||
      f.name.endsWith('.docx') ||
      f.name.endsWith('.doc') ||
      f.name.endsWith('.txt');

    if (!isPdfOrDoc) {
      setValidationError('Please upload a valid PDF or Word document (.pdf, .docx, .txt).');
      return;
    }

    if (f.size > 12 * 1024 * 1024) {
      setValidationError('File size exceeds the 12MB limit.');
      return;
    }

    setFile(f);
    setValidationError(null);
    showToast(`Loaded ${f.name} for analysis`);
  };

  const handleTemplateSelect = (templateId: string) => {
    const tmpl = JOB_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setTargetRole(tmpl.title);
      setTargetCompany(tmpl.company);
      setJobDescription(tmpl.description);
      showToast(`Loaded "${tmpl.title}" Job Spec`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setValidationError('Please upload your real resume file (PDF or Word document) to analyze.');
      return;
    }

    if (!jobDescription.trim() || jobDescription.trim().length < 30) {
      setValidationError('Please enter a job description with at least 30 characters of role requirements.');
      return;
    }

    setValidationError(null);

    try {
      await runAnalysis({
        file: file,
        jobDescription: jobDescription,
        targetRole: targetRole,
        targetCompany: targetCompany,
        analysisMode: analysisMode,
      });
    } catch (err: any) {
      setValidationError(err?.message || 'Failed to analyze resume. Please verify your file and try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div className="text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deterministic ATS Keyword & Structure Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Resume & Job Description Matcher
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload your real PDF resume and paste target job specifications to extract genuine keyword gaps and ATS metrics.
          </p>
        </div>

        {/* Quick Sample JD Templates */}
        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Sample Job Specs:</span>
          <button
            type="button"
            onClick={() => handleTemplateSelect('fullstack-sr')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-all shadow-xs"
          >
            Senior Full Stack
          </button>
          <button
            type="button"
            onClick={() => handleTemplateSelect('product-lead')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-all shadow-xs"
          >
            Product Lead
          </button>
          <button
            type="button"
            onClick={() => handleTemplateSelect('ai-ml-eng')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-all shadow-xs"
          >
            AI / ML Eng
          </button>
        </div>
      </div>

      {validationError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-sm animate-fade-in shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: File Upload (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>1. Resume File (PDF / DOCX)</span>
              </label>
              <span className="text-xs text-slate-400 font-medium">Max 12MB</span>
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc,.txt,application/pdf"
              className="hidden"
            />

            {/* Upload Zone / Preview Card */}
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[300px] ${
                  isDragOver
                    ? 'border-purple-500 bg-purple-50/80 scale-[1.01]'
                    : 'border-slate-200 hover:border-purple-400 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100 shadow-sm group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  Click or drag resume here
                </h4>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-4">
                  Select a real PDF or Word resume. Real text is extracted and analyzed against your target job spec.
                </p>
                <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                  Browse Files
                </div>
              </div>
            ) : (
              /* Uploaded State Card */
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -z-10" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm truncate max-w-[180px] sm:max-w-[220px]">
                        {file.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024).toFixed(0)} KB • Ready for real ATS parsing
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real document ready for backend text extraction</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-purple-600 hover:text-purple-700"
                  >
                    Replace Document
                  </button>
                  <span className="text-[11px] text-slate-400">Backend OCR & Parser Ready</span>
                </div>
              </div>
            )}

            {/* Quick Tips Box */}
            <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 text-xs text-slate-500 space-y-1.5">
              <span className="font-bold text-slate-700 block">Real ATS Requirements:</span>
              <p>• Avoid image-only scans; text must be selectable.</p>
              <p>• Standard headings (Experience, Education, Skills) improve parse accuracy.</p>
            </div>
          </div>

          {/* Right Column: Job Description & Target Info (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span>2. Target Role & Job Specification</span>
              </label>
              <button
                type="button"
                onClick={() => setJobDescription('')}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear text
              </button>
            </div>

            {/* Role & Company Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Target Company (Optional)
                </label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. Google, Stripe, OpenAI"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Quick Templates Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold">Load Role Requirements:</span>
              {JOB_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleTemplateSelect(tmpl.id)}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-600 hover:text-purple-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
                >
                  {tmpl.title}
                </button>
              ))}
            </div>

            {/* Job Description Textarea */}
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here (responsibilities, required tech stack, requirements)..."
                rows={10}
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-mono text-xs leading-relaxed transition-all resize-y"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pt-1">
                <span>{jobDescription.length} characters</span>
                <span>Minimum 30 characters required</span>
              </div>
            </div>

            {/* Analysis Mode Selector */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-600" />
                  <span>ATS Diagnostic Rigor Mode</span>
                </span>
                <span className="text-[11px] text-purple-600 font-semibold">
                  {analysisMode === 'strict_ats'
                    ? 'Strict Exact Match'
                    : analysisMode === 'executive'
                    ? 'Leadership & Scale'
                    : 'Standard Balanced'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', label: 'Balanced ATS', desc: 'Recruiter + filter' },
                  { id: 'strict_ats', label: 'Strict Keyword', desc: 'Workday exact-match' },
                  { id: 'executive', label: 'Executive Scope', desc: 'Impact & metrics focus' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setAnalysisMode(mode.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      analysisMode === mode.id
                        ? 'bg-purple-50/80 border-purple-300 text-purple-900 shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{mode.label}</div>
                    <div className="text-[10px] text-slate-400 truncate">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Submit Button */}
        <div className="p-6 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-3xl border border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-slate-900 text-base">
              Ready to generate your genuine ATS report?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              The backend will extract real text from your document and match keywords against your job description.
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Analyze Resume</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
