import React from 'react';
import { Sparkles } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useResume();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-purple-100 text-slate-800 text-sm font-medium">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
