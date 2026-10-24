import type { ResumeAnalysis } from '../types/resume';

// Backend configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
};

export interface AnalyzePayload {
  file: File;
  jobDescription: string;
  targetRole?: string;
  targetCompany?: string;
  analysisMode?: 'strict_ats' | 'standard' | 'executive';
}

/**
 * Service to analyze real resume against job description via the backend.
 * Never uses dummy data, mock responses, or hardcoded scores.
 */
export async function analyzeResumeService(payload: AnalyzePayload): Promise<ResumeAnalysis> {
  if (!payload.file) {
    throw new Error('Please select a real resume file (PDF or DOCX).');
  }

  if (!payload.jobDescription || payload.jobDescription.trim().length < 30) {
    throw new Error('Please enter a job description with at least 30 characters.');
  }

  const formData = new FormData();
  formData.append('resume_file', payload.file);
  formData.append('job_description', payload.jobDescription.trim());
  formData.append('target_role', (payload.targetRole || '').trim());
  formData.append('target_company', (payload.targetCompany || '').trim());
  formData.append('analysis_mode', payload.analysisMode || 'standard');

  let response: Response;
  try {
    response = await fetch(`${API_CONFIG.baseURL}/analyze`, {
      method: 'POST',
      body: formData,
    });
  } catch (networkErr: any) {
    console.error('Backend connection failed:', networkErr);
    throw new Error(
      `Cannot connect to backend server at ${API_CONFIG.baseURL}. Please ensure the backend server is running.`
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Server returned status ${response.status} with unreadable response.`);
  }

  if (!response.ok) {
    throw new Error(data.error || `Analysis failed with status code ${response.status}.`);
  }

  return data as ResumeAnalysis;
}

/**
 * Check if the backend is reachable
 */
export async function checkBackendHealth(): Promise<{ online: boolean; message: string }> {
  try {
    const res = await fetch(`${API_CONFIG.baseURL}/health`);
    if (res.ok) {
      const data = await res.json();
      return { online: true, message: data.service || 'Online' };
    }
    return { online: false, message: `Status ${res.status}` };
  } catch (err: any) {
    return { online: false, message: err.message || 'Offline' };
  }
}

/**
 * Fetch past analyses history (saved in localStorage).
 * Returns empty list if no analyses have been conducted yet.
 */
export function getStoredAnalyses(): ResumeAnalysis[] {
  try {
    const raw = localStorage.getItem('resumatch_analyses_history');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading analyses from localStorage:', e);
  }
  return [];
}

export function saveStoredAnalyses(analyses: ResumeAnalysis[]): void {
  try {
    localStorage.setItem('resumatch_analyses_history', JSON.stringify(analyses));
  } catch (e) {
    console.error('Failed saving analyses to localStorage:', e);
  }
}
