import type { JobTemplate } from '../types/resume';

export const JOB_TEMPLATES: JobTemplate[] = [
  {
    id: 'fullstack-sr',
    title: 'Senior Full Stack Engineer',
    company: 'Stripe / Fintech Unicorn',
    level: 'Senior (5+ yrs)',
    description: `We are seeking a Senior Full Stack Engineer to lead architecture across our distributed payments platform. 

Responsibilities:
- Build high-scale, resilient microservices in Node.js, TypeScript, and Go.
- Develop responsive, accessible frontends using React 18, Tailwind CSS, and Next.js.
- Architect asynchronous event-driven pipelines using Apache Kafka, Redis, and PostgreSQL.
- Drive cloud-native infrastructure with Docker, Kubernetes, AWS (ECS, Lambda, RDS), and Terraform.
- Champion CI/CD automation, comprehensive testing (Jest, Playwright), and observability with Datadog.

Requirements:
- 5+ years building full-stack distributed web applications.
- Strong proficiency in React, TypeScript, Node.js, and SQL databases.
- Hands-on experience with AWS cloud services, containerization (Docker, Kubernetes), and CI/CD pipelines.
- Familiarity with GraphQL, REST APIs, and microservice communication patterns.
- Passion for clean architecture, automated testing, and mentorship.`
  },
  {
    id: 'ai-ml-eng',
    title: 'AI / Machine Learning Engineer',
    company: 'Anthropic / Scale AI',
    level: 'Mid - Senior',
    description: `Join our Applied AI team to develop and deploy cutting-edge LLM pipelines and retrieval-augmented generation (RAG) systems.

Key Responsibilities:
- Design and optimize scalable LLM evaluation pipelines and fine-tuning workflows using PyTorch and Hugging Face.
- Implement vector search architectures with Pinecone, Qdrant, and LangChain/LlamaIndex.
- Build resilient production REST and gRPC inference APIs in Python (FastAPI, Celery).
- Optimize inference throughput and model latency using TensorRT, ONNX, and vLLM.
- Collaborate with frontend engineers to build intuitive AI copilot workflows.

Requirements:
- 3+ years in production machine learning and deep learning pipelines.
- Deep expertise in Python, PyTorch, LangChain, Transformers, and Vector Databases.
- Experience building cloud deployments with Docker, Kubernetes, and AWS / GCP GPUs.
- Solid understanding of prompt engineering, model alignment, and RAG evaluation metrics.`
  },
  {
    id: 'product-lead',
    title: 'Lead Product Manager (SaaS)',
    company: 'Linear / Notion',
    level: 'Lead / Principal',
    description: `We are looking for a Lead Product Manager to spearhead our core collaboration and workflow automation product suite.

What You Will Do:
- Define product vision, roadmap strategy, and quarterly OKRs aligned with company growth targets.
- Conduct in-depth customer discovery interviews, usability testing, and quantitative cohort analysis.
- Partner closely with engineering, design, and GTM leaders to deliver high-velocity sprint cycles.
- Establish product analytics telemetry using Amplitude, Mixpanel, and SQL to track activation and retention.
- Oversee feature launches from beta testing through enterprise general availability.

Requirements:
- 5+ years of product management experience in B2B SaaS or PLG products.
- Proven track record of launching successful product features with measurable ARR impact.
- Strong analytical skills: SQL, experimentation (A/B testing), user journey mapping.
- Outstanding communication and stakeholder management across executive teams.`
  }
];
