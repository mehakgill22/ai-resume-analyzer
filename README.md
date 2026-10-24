# ResuMatch AI — Frontend (React + Tailwind CSS)

A modern, responsive, and professional AI SaaS web application for analyzing resumes against job descriptions, identifying ATS keyword gaps, and generating actionable bullet-point optimizations.

![Design Theme](https://img.shields.io/badge/Theme-White%20%7C%20Purple%20%26%20Blue%20Accents-8B5CF6)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript)

---

## 🚀 Key Features

1. **Landing Page**
   - Heading: *"Build a Resume That Gets Noticed"*
   - Interactive live preview card with instant ATS score benchmarking
   - Stats bar (94% pass rate, 150k+ analyzed, 3.4x callbacks)
   - Before & After AI rewrite showcase
   - Core features breakdown (Keyword Radar, Bullet Rewriter, ATS Compliance, Match Scoring)

2. **Resume Analyzer Page**
   - Drag-and-drop PDF & DOCX file upload zone with file size validation (up to 10MB)
   - "Try Preloaded Sample Resume" quick-buttons (Senior Full Stack, Lead Product Manager, AI/ML Engineer)
   - Job Description text box with character counter & clear button
   - 1-click curated Job Specification templates
   - ATS Rigor mode selector (Balanced, Strict Keyword Match, Executive Scope)
   - Interactive 4-step AI scanning modal animation

3. **Results Dashboard**
   - **Overall Match Score** circular progress gauge and ATS readiness verdict
   - **Summary Cards**: Overall Score, ATS Compatibility, Skills Found vs Missing, AI Action Plan
   - **Recruiter Assessment**: Synthesized qualitative feedback & hiring funnel position
   - **ATS Diagnostic Breakdown**: Parseability, Keyword Match, Impact Metrics, Layout & Typography
   - **Categorized Skills Radar**: Technical, Cloud & DevOps, Soft Skills, and Tools with 1-click keyword copying
   - **Strengths Breakdown**: High and medium impact competitive advantages
   - **Actionable AI Suggestions**: Categorized (Critical, Recommended, Optional) with Before & After XYZ bullet point rewrites

4. **Sidebar Navigation & History**
   - Collapsible desktop sidebar and mobile slide-out drawer
   - Recent Analyses quick-list with instant score pills
   - Aggregate audit statistics and ATS engine status widget
   - Searchable past analyses history with localStorage persistence

5. **Settings & Python Backend Integration Ready**
   - Modular architecture (`src/services/api.ts` & `src/types/resume.ts`)
   - Pre-configured API service with toggleable `useRealBackend` switch
   - Built-in FastAPI / Flask integration guide and ready-to-run Python backend starter template

---

## 🛠️ Project Structure

```text
AI Resume Analyzer/
├── index.html                     # HTML5 entry with Plus Jakarta Sans & Inter fonts
├── package.json                   # Dependencies (React 19, Tailwind, Lucide, Confetti)
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Custom purple & blue theme colors, glows, animations
├── tsconfig.json                  # TypeScript config
├── tsconfig.app.json              # App compiler settings
├── src/
│   ├── main.tsx                   # React root mount
│   ├── App.tsx                    # Main layout shell with Sidebar and Navbar
│   ├── index.css                  # Tailwind directives and custom scrollbar
│   ├── types/
│   │   └── resume.ts              # Strict TypeScript interfaces matching backend models
│   ├── data/
│   │   └── mockData.ts            # High-fidelity sample resumes, JDs, and ATS audits
│   ├── services/
│   │   └── api.ts                 # API service layer (mock simulation + real API switch)
│   ├── context/
│   │   └── ResumeContext.tsx       # Centralized state management & history sync
│   └── components/
│       ├── common/
│       │   ├── LoadingModal.tsx   # 4-step animated AI diagnostic scanner
│       │   └── Toast.tsx          # Floating feedback toast notifications
│       ├── layout/
│       │   ├── Navbar.tsx         # Sticky header with breadcrumbs and actions
│       │   └── Sidebar.tsx        # Responsive navigation and recent analyses
│       ├── landing/
│       │   └── LandingPage.tsx    # "Build a Resume That Gets Noticed" hero & features
│       ├── analyzer/
│       │   └── ResumeAnalyzerPage.tsx # PDF upload, drag-and-drop, JD input
│       ├── results/
│       │   └── ResultsDashboard.tsx   # Comprehensive ATS score report & rewrites
│       ├── history/
│       │   └── RecentAnalysesPage.tsx # Filterable card grid of past audits
│       └── settings/
│           └── SettingsPage.tsx   # Python backend setup & API controls
```

---

## 💻 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🐍 Future Python Backend Integration

The frontend is already configured to connect directly to a Python backend (FastAPI / Flask).

1. In your `.env` or environment variables:
   ```env
   VITE_USE_REAL_BACKEND=true
   VITE_API_URL=http://localhost:8000/api/v1
   ```
2. In Python (FastAPI):
   ```python
   from fastapi import FastAPI, UploadFile, File, Form
   from fastapi.middleware.cors import CORSMiddleware

   app = FastAPI()
   app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

   @app.post("/api/v1/analyze")
   async def analyze(
       resume_file: UploadFile = File(...),
       job_description: str = Form(...),
       target_role: str = Form(""),
       target_company: str = Form(""),
       analysis_mode: str = Form("standard")
   ):
       # Parse PDF with pdfplumber or pypdf, run NLP model, return JSON
       return { ... }
   ```
   A ready-to-copy Python script is also available in the **Settings & API** tab inside the app.
