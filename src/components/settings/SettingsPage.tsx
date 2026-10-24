import React, { useState, useEffect } from 'react';
import {
  Settings,
  Server,
  Code2,
  Copy,
  Check,
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { API_CONFIG, checkBackendHealth } from '../../services/api';
import { useResume } from '../../context/ResumeContext';

export const SettingsPage: React.FC = () => {
  const { showToast } = useResume();
  const [apiUrl, setApiUrl] = useState(API_CONFIG.baseURL);
  const [copiedCode, setCopiedCode] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [statusMessage, setStatusMessage] = useState('');

  const pingBackend = async () => {
    setBackendStatus('checking');
    const res = await checkBackendHealth();
    if (res.online) {
      setBackendStatus('online');
      setStatusMessage('Live & Ready for Real PDF / ATS Ingestion');
    } else {
      setBackendStatus('offline');
      setStatusMessage('Backend offline. Run "npm run server" or "npm run dev".');
    }
  };

  useEffect(() => {
    pingBackend();
  }, []);

  const pythonFastApiCode = `# Optional Python FastAPI Alternative
# If you prefer running Python instead of the active Node backend:
# Run: pip install fastapi uvicorn pydantic python-multipart pypdf
# Start: uvicorn main:app --reload --port 8000

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI(title="ResuMatch AI - Python Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/analyze")
async def analyze_resume(
    resume_file: UploadFile = File(...),
    job_description: str = Form(...),
    target_role: Optional[str] = Form(""),
    target_company: Optional[str] = Form(""),
    analysis_mode: Optional[str] = Form("standard")
):
    # Extract PDF text, calculate skill overlap, return structured JSON
    return { ... }
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonFastApiCode);
    setCopiedCode(true);
    showToast('Copied Python FastAPI template to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Backend</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Backend Configuration & Status
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Monitor your real ATS extraction backend and configure network endpoints.
        </p>
      </div>

      {/* Backend Status Card */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Active ATS Parsing Backend</h4>
              <p className="text-xs text-slate-500">{statusMessage || 'Checking connection...'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={pingBackend}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors"
              title="Ping backend"
            >
              <RefreshCw className={`w-4 h-4 ${backendStatus === 'checking' ? 'animate-spin' : ''}`} />
            </button>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                backendStatus === 'online'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : backendStatus === 'checking'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {backendStatus === 'online' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real Backend Online</span>
                </>
              ) : backendStatus === 'checking' ? (
                <span>Checking...</span>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Backend Offline</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Backend Target URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:8000/api/v1"
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <button
              onClick={() => {
                API_CONFIG.baseURL = apiUrl;
                showToast('Updated active backend URL!');
                pingBackend();
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Update
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            Default endpoint: <code className="text-purple-600 font-mono font-semibold">http://localhost:8000/api/v1</code>.
          </p>
        </div>
      </div>

      {/* Python FastAPI Implementation Blueprint */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-600" />
            <h4 className="font-bold text-slate-900 text-base">Python Starter Blueprint (FastAPI)</h4>
          </div>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500">
          If you ever want to swap the Node.js backend for a Python backend, this endpoint template shares the exact same payload schema and parameters.
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed max-h-80">
          {pythonFastApiCode}
        </pre>
      </div>

      {/* Storage Management */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-slate-400" />
          <div>
            <h5 className="font-bold text-slate-900 text-sm">Clear History Cache</h5>
            <p className="text-xs text-slate-500">Clears all locally saved past analyses.</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('resumatch_analyses_history');
            showToast('Cleared analysis history.');
            setTimeout(() => window.location.reload(), 400);
          }}
          className="px-4 py-2 border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
        >
          Reset Storage
        </button>
      </div>
    </div>
  );
};
