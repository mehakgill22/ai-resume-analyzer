export type NavView = 'landing' | 'analyzer' | 'results' | 'history' | 'settings';

export type SkillCategory = 'technical' | 'cloud_devops' | 'soft_skills' | 'tools';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  relevance: number; // 0 - 100
  foundInResume: boolean;
  frequency?: number;
}

export interface BulletRewrite {
  original: string;
  improved: string;
  explanation: string;
  metricType: 'quantifiable_impact' | 'action_verb' | 'ats_keyword';
}

export interface SuggestionItem {
  id: string;
  title: string;
  category: 'critical' | 'recommended' | 'optional';
  section: 'summary' | 'experience' | 'skills' | 'formatting';
  description: string;
  actionableStep: string;
  rewriteExample?: BulletRewrite;
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium';
}

export interface ScoreBreakdown {
  overall: number; // 0-100
  atsCompatibility: number; // 0-100
  keywordMatch: number; // 0-100
  impactMetrics: number; // 0-100
  formattingReadability: number; // 0-100
}

export interface ResumeAnalysis {
  id: string;
  createdAt: string;
  fileName: string;
  fileSize?: string;
  jobTitle: string;
  jobCompany?: string;
  jobDescriptionExcerpt: string;
  scores: ScoreBreakdown;
  summaryFeedback: string;
  skillsFound: SkillItem[];
  missingSkills: SkillItem[];
  strengths: StrengthItem[];
  suggestions: SuggestionItem[];
  atsReadinessSummary: {
    verdict: 'Excellent Match' | 'Good Match' | 'Needs Improvement' | 'Critical ATS Issues';
    passRateEstimated: string;
    interviewChanceBoost: string;
    recommendedActionsCount: number;
  };
  metadata: {
    wordCount: number;
    pages: number;
    readingTimeMinutes: number;
    identifiedRole: string;
  };
}

export interface AnalysisHistoryItem {
  id: string;
  createdAt: string;
  fileName: string;
  jobTitle: string;
  score: number;
  status: 'completed' | 'draft';
}

export interface JobTemplate {
  id: string;
  title: string;
  company: string;
  level: string;
  description: string;
}
