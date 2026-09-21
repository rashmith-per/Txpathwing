import {
  LayoutGrid,
  Brain,
  Code2,
  BarChart3,
  Cloud,
  Briefcase,
  UserCheck,
} from "lucide-react";

import promptEngineeringImg from "../../../../../assets/blog_prompt_engineering.jpg";
import interviewSuccessImg from "../../../../../assets/blog_interview_success.jpg";
import nextjsGuideImg from "../../../../../assets/blog_nextjs14.jpg";
import productivityHabitsImg from "../../../../../assets/blog_productivity_habits.jpg";
import heroBookImg from "../../../../../assets/blog_hero_book.jpg";
import darkWorkspaceImg from "../../../../../assets/blog1.png";
import deskNotesImg from "../../../../../assets/Blog.png.png";
import learningHeroImg from "../../../../../assets/blog/blog-hero-exact.png";

export const categories = [
  { id: "All", name: "All", icon: LayoutGrid },
  { id: "AI & ML", name: "AI & ML", icon: Brain },
  { id: "Web Dev", name: "Web Dev", icon: Code2 },
  { id: "Data Science", name: "Data Science", icon: BarChart3 },
  { id: "Cloud", name: "Cloud", icon: Cloud },
  { id: "Career", name: "Career", icon: Briefcase },
  { id: "Interview", name: "Interview", icon: UserCheck },
];

export const topArticles = [
  {
    id: 1,
    title: "Prompt Engineering 101:\nA Beginner's Guide",
    category: "AI & ML",
    readTime: "8 min read",
    description: "Learn the basics of prompt engineering and get better results from AI tools.",
    image: promptEngineeringImg,
    featured: true,
    date: "June 12, 2026",
    author: "AI Research Team",
    tags: ["LLMs", "Prompting", "ChatGPT", "Claude"],
    keyTakeaway: "Master structured prompts with defined personas, few-shot examples, and output constraints to get 10x more accurate results.",
    content: `Prompt engineering is the art and science of structuring inputs to Large Language Models (LLMs) so they produce the most accurate, context-aware, and actionable outputs.

### 1. Core Prompting Architecture
- **Role/Persona:** Instructing the model on its identity (e.g., "Act as a Senior Architect").
- **Task & Context:** Giving background data, business rules, and constraints.
- **Few-Shot Examples:** Providing 1–3 concrete input/output demonstrations.
- **Output Constraints:** Specifying schema formats like JSON or Markdown tables.

### 2. Chain-of-Thought (CoT)
Prompting models to "think step by step" dramatically decreases hallucinations and improves reasoning accuracy.`,
  },
  {
    id: 2,
    title: "How to Ace Your Next\nTechnical Interview",
    category: "Career",
    readTime: "6 min read",
    description: "Step-by-step preparation strategy for success.",
    image: interviewSuccessImg,
    featured: true,
    date: "June 10, 2026",
    author: "Senior Engineering Mentors",
    tags: ["Interview", "Career", "Coding", "Soft Skills"],
    keyTakeaway: "Communicate your thought process out loud, ask clarifying questions first, and structure behavioral responses using the STAR method.",
    content: `Technical interviews assess problem-solving process, communication skills, and adaptability under pressure.

### 1. The 5-Step Live Coding Framework
- **Clarify the Problem:** Ask about constraints, edge cases, and scale.
- **State the Brute Force Approach:** Explain a basic solution and analyze complexity.
- **Optimize with Patterns:** Map to patterns (Two Pointers, Sliding Window, DP, Graph BFS/DFS).
- **Write Clean, Modular Code:** Use clear variable names and helper functions.
- **Test with Dry Runs:** Trace through example inputs line-by-line.

### 2. The Behavioral STAR Method
Structure answers around Situation, Task, Action, and Result with quantifiable business metrics.`,
  },
  {
    id: 3,
    title: "Next.js 15 & React 19:\nFeatures You Should Know",
    category: "Web Dev",
    readTime: "7 min read",
    description: "Explore the newest features and improvements.",
    image: nextjsGuideImg,
    featured: true,
    date: "June 8, 2026",
    author: "Frontend Architecture Group",
    tags: ["React", "Next.js", "Full-Stack", "JavaScript"],
    keyTakeaway: "Leverage React 19 compiler optimizations, Server Actions, and Partial Prerendering to deliver instant page loads.",
    content: `The web development landscape has shifted toward server-first rendering, compiler optimizations, and edge-native data.

### 1. React 19 Compiler
Automatic build-level memoization eliminates boilerplate \`useMemo\`/\`useCallback\` and prevents wasteful re-renders.

### 2. Next.js 15 Server Actions & Caching
Server Actions enable direct backend mutation functions with optimistic UI updates via \`useOptimistic\`.

### 3. Partial Prerendering (PPR)
Combines static shell generation with streaming dynamic server slots in a single fast response.`,
  },
  {
    id: 4,
    title: "5 Productivity Habits\nfor Developers",
    category: "Career",
    readTime: "5 min read",
    description: "Simple habits to help you stay focused and consistent.",
    image: productivityHabitsImg,
    featured: true,
    date: "June 5, 2026",
    author: "Developer Experience Lead",
    tags: ["Productivity", "Deep Work", "Mindset", "Efficiency"],
    keyTakeaway: "Protect 2-hour uninterrupted deep work blocks, automate repetitive terminal tasks, and establish an end-of-day shutdown routine.",
    content: `High-performing engineers design disciplined environments that maximize focus and eliminate context switching.

### 1. The 90-Minute Deep Work Block
Schedule demanding architectural tasks during peak cognitive windows with zero notifications.

### 2. Aggressive Tooling Automation
Automate workflows repeated more than three times daily with shell aliases and CLI scripts.

### 3. Writing Before Coding
Drafting a 1-page Architecture Decision Record (ADR) before coding saves hours of refactoring.`,
  },
];

export const additionalArticles = [
  {
    id: 5,
    title: "Building Production RAG Pipelines with Vector DBs & LLMs",
    category: "AI & ML",
    readTime: "10 min read",
    description: "How to build high-accuracy knowledge retrieval systems using hybrid search and re-ranking.",
    image: promptEngineeringImg,
    featured: false,
    date: "June 1, 2026",
    author: "Machine Learning Engineer",
    tags: ["RAG", "Vector DB", "Pinecone", "Embeddings"],
    keyTakeaway: "Combine sparse keyword search with dense vector embeddings and cross-encoder re-ranking for sub-second retrieval.",
    content: `Retrieval-Augmented Generation (RAG) grounds LLM responses in real-time private documentation.

### 1. Document Chunking Strategies
Chunk text into 300–500 token semantic boundaries with 10% overlap for optimal vector fidelity.

### 2. Hybrid Search + Re-ranking
Combine BM25 keyword search with Dense Vector retrieval and Cohere re-ranking for >90% precision.`,
  },
  {
    id: 6,
    title: "High-Performance Web: Core Web Vitals (LCP, INP, CLS)",
    category: "Web Dev",
    readTime: "8 min read",
    description: "Actionable strategies to achieve perfect 100/100 Lighthouse performance.",
    image: nextjsGuideImg,
    featured: false,
    date: "May 28, 2026",
    author: "Performance Architect",
    tags: ["Performance", "Lighthouse", "Core Web Vitals", "CSS"],
    keyTakeaway: "Prioritize hero assets with fetchpriority='high' and break long tasks with scheduler.yield().",
    content: `Core Web Vitals dictate user engagement, conversion rates, and SEO visibility.

### 1. LCP Under 1.5s
Preload hero images with \`<link rel="preload" fetchpriority="high">\` and modern AVIF/WebP formats.

### 2. INP Under 150ms
Break long event handlers using \`scheduler.yield()\` to keep the main thread interactive.`,
  },
  {
    id: 7,
    title: "Clean Architecture & Domain-Driven Design in Node.js",
    category: "Web Dev",
    readTime: "9 min read",
    description: "Structuring enterprise backends with repository patterns and dependency injection.",
    image: darkWorkspaceImg,
    featured: false,
    date: "May 25, 2026",
    author: "Enterprise Backend Lead",
    tags: ["Node.js", "TypeScript", "Clean Architecture", "API"],
    keyTakeaway: "Decouple business use cases from databases and frameworks to make your codebase testable.",
    content: `Clean Architecture isolates core business rules from external databases and HTTP frameworks using Entities, Use Cases, Controllers, and Infrastructure layers.`,
  },
  {
    id: 8,
    title: "End-to-End Data Science: From EDA to Production Model",
    category: "Data Science",
    readTime: "11 min read",
    description: "From exploratory data analysis to feature engineering and deploying model APIs.",
    image: heroBookImg,
    featured: false,
    date: "May 22, 2026",
    author: "Principal Data Scientist",
    tags: ["Python", "Pandas", "Scikit-Learn", "FastAPI"],
    keyTakeaway: "Automate data validation with Great Expectations and deploy inference APIs inside containerized FastAPI services.",
    content: `Building high-accuracy ML systems requires automated validation, feature pipelines, and low-latency inference serving with Polars, Scikit-learn, and FastAPI.`,
  },
  {
    id: 9,
    title: "Feature Engineering & Predictive Modeling at Scale",
    category: "Data Science",
    readTime: "9 min read",
    description: "Advanced techniques for tabular data, time-series forecasting, and model tuning.",
    image: heroBookImg,
    featured: false,
    date: "May 18, 2026",
    author: "Lead AI Researcher",
    tags: ["Feature Engineering", "XGBoost", "Data Science"],
    keyTakeaway: "High quality domain features outperform hyperparameter tuning every time.",
    content: `Target encoding with K-fold regularization, Fourier time-series terms, and SHAP explainability ensure high model precision.`,
  },
  {
    id: 10,
    title: "Mastering Cloud Infrastructure with AWS & Terraform (IaC)",
    category: "Cloud",
    readTime: "10 min read",
    description: "Infrastructure as Code best practices for multi-region resilience and cost efficiency.",
    image: darkWorkspaceImg,
    featured: false,
    date: "May 14, 2026",
    author: "Cloud Solutions Architect",
    tags: ["AWS", "Terraform", "DevOps", "IaC"],
    keyTakeaway: "Use modular Terraform blueprints with remote S3 state locking and automated CI/CD security scanning.",
    content: `Provision secure VPCs with private subnet isolation, NAT Gateways, and ECS Fargate serverless clusters with version-controlled Terraform code.`,
  },
  {
    id: 11,
    title: "Docker & Kubernetes: Production Container Playbook",
    category: "Cloud",
    readTime: "8 min read",
    description: "Multi-stage builds, rootless container security, and Helm deployment charts.",
    image: darkWorkspaceImg,
    featured: false,
    date: "May 10, 2026",
    author: "DevOps Tech Lead",
    tags: ["Docker", "Kubernetes", "Microservices", "Cloud"],
    keyTakeaway: "Adopt multi-stage Docker builds to reduce image sizes by 80% and run non-root containers.",
    content: `Lean 50MB container images using multi-stage builds coupled with Kubernetes Horizontal Pod Autoscaling (HPA) ensure resilient deployments.`,
  },
  {
    id: 12,
    title: "From Junior to Staff Engineer: The Strategic Roadmap",
    category: "Career",
    readTime: "8 min read",
    description: "Technical leadership, architectural influence, and maximizing organizational leverage.",
    image: deskNotesImg,
    featured: false,
    date: "May 6, 2026",
    author: "Staff Software Engineer",
    tags: ["Leadership", "Mentorship", "Career Growth"],
    keyTakeaway: "Staff engineers multiply team effectiveness through clear architecture docs and unblocking cross-team initiatives.",
    content: `Expand organizational influence through Architecture Decision Records (ADRs), unblocking junior teammates, and aligning technology with business value.`,
  },
  {
    id: 13,
    title: "Building a Standout Tech Portfolio & Open Source Impact",
    category: "Career",
    readTime: "7 min read",
    description: "What top engineering hiring managers actually look for in developer portfolios.",
    image: productivityHabitsImg,
    featured: false,
    date: "May 2, 2026",
    author: "Tech Recruitment Partner",
    tags: ["Portfolio", "Open Source", "GitHub", "Jobs"],
    keyTakeaway: "Build 2 complete, deployed full-stack systems with live URLs rather than 10 unfinished clones.",
    content: `Demonstrate genuine production capabilities with live URLs, CI/CD pipelines, clean READMEs, and open-source contributions.`,
  },
  {
    id: 14,
    title: "The Comprehensive System Design Interview Blueprint",
    category: "Interview",
    readTime: "10 min read",
    description: "Mastering distributed systems, caching tiers, database sharding, and scale trade-offs.",
    image: interviewSuccessImg,
    featured: false,
    date: "April 28, 2026",
    author: "Principal Systems Architect",
    tags: ["System Design", "Scalability", "Databases", "Interview"],
    keyTakeaway: "Always start with capacity estimations, establish functional requirements, and address data partitioning.",
    content: `Master the 4-stage framework: Scope & Requirements, Back-of-the-Envelope Estimation, High-Level Architecture, and Bottleneck Mitigation.`,
  },
  {
    id: 15,
    title: "Mastering Data Structures & Algorithms (DSA) for Top Tech",
    category: "Interview",
    readTime: "9 min read",
    description: "Pattern-based roadmap for cracking technical coding rounds with confidence.",
    image: learningHeroImg,
    featured: false,
    date: "April 24, 2026",
    author: "Competitive Programming Coach",
    tags: ["DSA", "LeetCode", "Algorithms", "Coding"],
    keyTakeaway: "Learn to recognize the 14 fundamental algorithmic patterns instead of memorizing hundreds of problems.",
    content: `Focus on patterns: Two Pointers, Sliding Window, Monotonic Stack, and Dynamic Programming to solve unseen coding problems effortlessly.`,
  },
  {
    id: 16,
    title: "Behavioral & Leadership Mock Interview Breakdowns",
    category: "Interview",
    readTime: "7 min read",
    description: "Real candidate answer evaluations: conflict resolution, ownership, and tech lead skills.",
    image: interviewSuccessImg,
    featured: false,
    date: "April 20, 2026",
    author: "Engineering Director",
    tags: ["Behavioral", "STAR", "Leadership", "Interview"],
    keyTakeaway: "Prepare 5 multi-purpose career stories with quantifiable business outcomes using the STAR method.",
    content: `Craft authentic STAR responses that highlight technical ownership, handling failure, and conflict resolution with measurable metrics.`,
  },
];

export const allBlogPosts = [...topArticles, ...additionalArticles];
