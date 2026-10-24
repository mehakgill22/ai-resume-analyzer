import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ResumeAnalysis, NavView } from '../types/resume';
import { analyzeResumeService, getStoredAnalyses, saveStoredAnalyses, type AnalyzePayload } from '../services/api';
import confetti from 'canvas-confetti';

interface ResumeContextType {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  currentAnalysis: ResumeAnalysis | null;
  analysesHistory: ResumeAnalysis[];
  isAnalyzing: boolean;
  analysisStep: number;
  toastMessage: string | null;
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  runAnalysis: (payload: AnalyzePayload) => Promise<void>;
  selectAnalysis: (id: string) => void;
  deleteAnalysis: (id: string) => void;
  loadSampleResume: () => void;
  showToast: (message: string) => void;
  triggerConfetti: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<NavView>('landing');
  const [analysesHistory, setAnalysesHistory] = useState<ResumeAnalysis[]>(() => getStoredAnalyses());
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysis | null>(() => {
    const list = getStoredAnalyses();
    return list.length > 0 ? list[0] : null;
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Sync history to localStorage
  useEffect(() => {
    saveStoredAnalyses(analysesHistory);
  }, [analysesHistory]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#2563eb', '#38bdf8', '#a855f7'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const runAnalysis = async (payload: AnalyzePayload) => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 600);

    try {
      const result = await analyzeResumeService(payload);
      clearInterval(stepInterval);
      setAnalysisStep(4);

      setTimeout(() => {
        setCurrentAnalysis(result);
        setAnalysesHistory((prev) => [result, ...prev.filter((item) => item.id !== result.id)]);
        setIsAnalyzing(false);
        setAnalysisStep(0);
        setCurrentView('results');
        triggerConfetti();
        showToast('Real resume analysis completed successfully!');
      }, 400);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setAnalysisStep(0);
      const errMsg = err?.message || 'Analysis error occurred. Please verify your file and try again.';
      showToast(errMsg);
      throw err;
    }
  };

  const selectAnalysis = (id: string) => {
    const found = analysesHistory.find((item) => item.id === id);
    if (found) {
      setCurrentAnalysis(found);
      setCurrentView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const deleteAnalysis = (id: string) => {
    const filtered = analysesHistory.filter((item) => item.id !== id);
    setAnalysesHistory(filtered);
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(filtered[0] || null);
    }
    showToast('Analysis removed from history.');
  };

  const loadSampleResume = () => {
    setCurrentView('analyzer');
    showToast('Please upload your resume (PDF or Word) to run an analysis.');
  };

  return (
    <ResumeContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentAnalysis,
        analysesHistory,
        isAnalyzing,
        analysisStep,
        toastMessage,
        selectedTemplateId,
        setSelectedTemplateId,
        runAnalysis,
        selectAnalysis,
        deleteAnalysis,
        loadSampleResume,
        showToast,
        triggerConfetti,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
