const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mammoth = require('mammoth');
const { PDFParse } = require('pdf-parse');
const { analyzeResumeAgainstJob } = require('./analyzer.cjs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer memory storage (files kept in memory buffer, never written to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 12 * 1024 * 1024, // 12MB limit
  },
  fileFilter: (req, file, cb) => {
    const originalName = file.originalname.toLowerCase();
    const isAllowed =
      originalName.endsWith('.pdf') ||
      originalName.endsWith('.docx') ||
      originalName.endsWith('.doc') ||
      originalName.endsWith('.txt') ||
      originalName.endsWith('.md') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'text/plain';

    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload a PDF or Word (.docx) document.'));
    }
  },
});

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ResuMatch AI Real ATS Backend',
    timestamp: new Date().toISOString(),
  });
});

// Main Analysis Endpoint
app.post('/api/v1/analyze', upload.single('resume_file'), async (req, res) => {
  try {
    const file = req.file;
    const {
      job_description,
      target_role,
      target_company,
      analysis_mode,
    } = req.body;

    // Validate inputs
    if (!file) {
      return res.status(400).json({
        error: 'No resume file uploaded. Please upload a PDF or Word document.',
      });
    }

    if (!job_description || job_description.trim().length < 30) {
      return res.status(400).json({
        error: 'Job description is too short. Please provide at least 30 characters of the target role requirements.',
      });
    }

    let resumeText = '';
    let pageCount = 1;
    const fileName = file.originalname;
    const lowerName = fileName.toLowerCase();

    // 1. Real Text Extraction
    if (lowerName.endsWith('.pdf') || file.mimetype === 'application/pdf') {
      try {
        const parser = new PDFParse({ data: file.buffer });
        const parsed = await parser.getText();
        await parser.destroy();

        if (parsed && typeof parsed.text === 'string' && parsed.text.trim()) {
          resumeText = parsed.text;
          pageCount = parsed.total || (parsed.pages ? parsed.pages.length : 1) || 1;
        } else if (parsed && parsed.pages && Array.isArray(parsed.pages)) {
          resumeText = parsed.pages.map((p) => p.text).join('\n\n');
          pageCount = parsed.pages.length;
        }
      } catch (pdfErr) {
        console.error('PDF parsing error:', pdfErr);
        return res.status(422).json({
          error: 'Failed to read PDF. The document may be corrupted or password-protected. Please upload an unprotected, readable PDF.',
        });
      }
    } else if (lowerName.endsWith('.docx') || file.mimetype.includes('wordprocessingml')) {
      try {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        resumeText = result.value || '';
        pageCount = Math.max(1, Math.ceil(resumeText.split(/\s+/).length / 450));
      } catch (docxErr) {
        console.error('DOCX parsing error:', docxErr);
        return res.status(422).json({
          error: 'Failed to extract text from DOCX file. Please ensure the document is a valid Microsoft Word file.',
        });
      }
    } else {
      // Plain text / Markdown
      resumeText = file.buffer.toString('utf-8');
      pageCount = Math.max(1, Math.ceil(resumeText.split(/\s+/).length / 450));
    }

    // Check if extracted text is valid and readable
    if (!resumeText || resumeText.trim().length < 35) {
      return res.status(422).json({
        error:
          'Could not extract text from this document. It appears to be an image-only scan or empty. ATS engines require selectable, text-based documents. Please upload a standard text PDF or Word document.',
      });
    }

    const fileSizeFormatted = `${(file.size / 1024).toFixed(0)} KB`;

    // 2. Real Content Analysis
    const analysis = analyzeResumeAgainstJob({
      resumeText,
      jobDescription: job_description,
      targetRole: target_role || '',
      targetCompany: target_company || '',
      fileName,
      fileSize: fileSizeFormatted,
      pageCount,
      analysisMode: analysis_mode || 'standard',
    });

    return res.json(analysis);
  } catch (err) {
    console.error('Analysis execution error:', err);
    return res.status(500).json({
      error: err.message || 'An internal error occurred during resume analysis.',
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds maximum allowed limit (12MB).' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Start Server
app.listen(PORT, () => {
  console.log(`[ResuMatch Backend] Running on http://localhost:${PORT}`);
  console.log(`[ResuMatch Backend] Real PDF/DOCX Text Extraction & ATS Keyword Matching Active`);
});
