import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses as marketCourses } from "../MarketPlace/coursesList";
import "./CourseDetails.css";

/* ---------- Compact course builder ----------
   syllabus item: [title, duration, [topics...]]  (module number is auto-generated) */
const mk = (code, title, category, instructor, role, weeks, lessons, level, price, oldPrice, rating, reviews, emoji, about, syl, projects, skills) => ({
  code, title, category, instructor, role, weeks, lessons, level, price, oldPrice, rating, reviews, emoji, about,
  syllabus: syl.map(([t, d, topics], i) => ({ m: `Module ${i + 1}`, t, d, topics })),
  projects, skills,
});

const extendedCoursesData = {
  "react-fs": mk(
    "REACT-FS", "React Full Stack Development", "Software Development",
    "Arjun Mehta", "Ex-Meta, 8 years React Architect",
    "14 weeks", "96 lessons", "Intermediate", "₹5,499", "₹8,999", "4.9", "1,240", "⚛️",
    "Master modern React with Next.js 14, Tailwind CSS, Node.js, and PostgreSQL. Build industry-ready full stack web applications.",
    [
      ["React Fundamentals & Hooks", "2 weeks", ["JSX & Components", "Props & State Management", "Custom Hooks", "React Router v6"]],
      ["Advanced Frontend Architecture", "3 weeks", ["Context API & Redux Toolkit", "React Query & Data Fetching", "Performance Optimization", "Jest & React Testing Library"]],
      ["Next.js 14 & Full Stack API", "4 weeks", ["App Router & Server Components", "API Routes & Middleware", "Prisma ORM & PostgreSQL", "Authentication with NextAuth"]],
      ["Production & Deployment", "5 weeks", ["Vercel CI/CD Pipelines", "Payment Gateway Integration", "Realtime WebSockets", "Capstone Project"]],
    ],
    ["E-commerce SaaS Platform", "Real-time Collaborative Workspace", "Analytics Dashboard"],
    ["React", "Next.js", "Tailwind", "Node.js", "PostgreSQL", "TypeScript"]
  ),

  "py-fs": mk(
    "PY-FS", "Python Full Stack with Django & React", "Software Development",
    "Sowmya Iyer", "Ex-Swiggy, Python Lead Architect",
    "16 weeks", "112 lessons", "Beginner", "₹6,499", "₹9,999", "4.8", "1,876", "🐍",
    "Become a complete Python Full Stack Developer. Master Python OOP, Django MVT, REST Framework, React integration, Celery background tasks, and Docker deployment.",
    [
      ["Python Core & Advanced OOP", "2 weeks", ["Python Data Structures", "OOP Concepts & Design Patterns", "Asyncio & Multithreading", "File I/O & Generators"]],
      ["Django Framework & Relational DB", "4 weeks", ["Django Architecture", "ORM & Migrations", "PostgreSQL Integration", "Auth & Permissions"]],
      ["Django REST Framework (DRF)", "4 weeks", ["API Serializers & Views", "JWT Authentication", "Celery & Redis Caching", "Unit Testing APIs"]],
      ["Frontend & DevOps Integration", "6 weeks", ["React Integration", "Docker Containerization", "AWS EC2 Deployment", "Capstone Project"]],
    ],
    ["EdTech Marketplace", "REST API Engine", "AI Powered Lead Tracker"],
    ["Python", "Django", "DRF", "PostgreSQL", "React", "Docker", "Redis"]
  ),

  "java-fs": mk(
    "JAVA-FS", "Java Full Stack — Spring Boot & Microservices", "Software Development",
    "Naveen Kulkarni", "Ex-Oracle, Java Champion",
    "18 weeks", "128 lessons", "Intermediate", "₹6,999", "₹11,999", "4.7", "2,104", "☕",
    "Enterprise Java Development track. Master Java 17, Spring Boot 3, Spring Cloud Microservices, Apache Kafka, Kubernetes, and React frontend.",
    [
      ["Java 17 Core & JVM Internals", "3 weeks", ["Java 17 Features", "Collections Framework", "Multithreading & Concurrency", "JVM Tuning"]],
      ["Spring Boot Enterprise Deep-Dive", "5 weeks", ["Dependency Injection", "Spring Data JPA & Hibernate", "Spring Security & OAuth2", "RESTful Web Services"]],
      ["Microservices & Event-Driven Architecture", "5 weeks", ["Spring Cloud Gateway & Eureka", "Apache Kafka Messaging", "Distributed Tracing", "Circuit Breakers"]],
      ["Cloud & Kubernetes Deployment", "5 weeks", ["Dockerization", "Kubernetes Manifests", "AWS Cloud Infrastructure", "Capstone Microservices Project"]],
    ],
    ["Banking Core Microservices", "E-Commerce Checkout System", "Notification Hub"],
    ["Java 17", "Spring Boot", "Spring Cloud", "Kafka", "Kubernetes", "PostgreSQL", "React"]
  ),

  "aws-dop": mk(
    "AWS-DOP", "AWS DevOps Engineer — Professional Track", "Cloud & DevOps",
    "Meera Krishnan", "AWS Community Hero, Ex-Amazon DevOps",
    "12 weeks", "74 lessons", "Advanced", "₹6,999", "₹10,999", "4.9", "1,284", "☁️",
    "Production-grade Cloud DevOps. Master AWS Core Infrastructure, Infrastructure as Code with Terraform, Amazon EKS, automated CI/CD pipelines, and Prometheus monitoring.",
    [
      ["AWS Core Infrastructure", "2 weeks", ["VPC Architecture", "EC2, Auto-scaling, ALB", "IAM Security Policies", "S3 & RDS Storage"]],
      ["Infrastructure as Code (IaC)", "3 weeks", ["Terraform Fundamentals", "Modular State Management", "CloudFormation", "Ansible Configuration"]],
      ["Containers & Orchestration", "4 weeks", ["Docker Deep Dive", "Amazon EKS & ECS", "Helm Package Manager", "Istio Service Mesh"]],
      ["CI/CD & Observability", "3 weeks", ["GitHub Actions Pipelines", "ArgoCD GitOps", "Prometheus & Grafana", "Production Capstone Lab"]],
    ],
    ["Multi-Region Terraform Infra", "EKS Microservices Deployment", "Zero-Downtime CI/CD Pipeline"],
    ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus", "ArgoCD"]
  ),

  "k8s-prd": mk(
    "K8S-PRD", "Kubernetes for Production Workloads", "Cloud & DevOps",
    "Meera Krishnan", "AWS Community Hero, Ex-Amazon DevOps",
    "9 weeks", "52 lessons", "Advanced", "₹5,499", "₹8,499", "4.8", "760", "☸️",
    "Deep dive into production-grade Kubernetes. Master pod scheduling, ingress control, storage persistence, RBAC, network policies, and cluster upgrades.",
    [
      ["Kubernetes Architecture", "3 weeks", ["Control Plane & Worker Nodes", "Pods, ReplicaSets & Deployments", "Services & Ingress Controllers", "ConfigMaps & Secrets"]],
      ["Storage, Security & RBAC", "3 weeks", ["Persistent Volumes & PVCs", "Cluster RBAC & Service Accounts", "Network Policies", "Calico CNI"]],
      ["Production Operations & Monitoring", "3 weeks", ["Cluster Upgrades & Backup (Velero)", "Prometheus Monitoring & Alertmanager", "Logging with Fluent Bit & Loki", "Production Capstone"]],
    ],
    ["High-Availability K8s Cluster", "GitOps Continuous Deployment", "Cluster Observability Stack"],
    ["Kubernetes", "Docker", "Helm", "Prometheus", "Grafana", "GitOps"]
  ),

  "devsec": mk(
    "DEVSEC", "Cloud Security & DevSecOps Essentials", "Cloud & DevOps",
    "Tanvox Technologies", "Industry Security Consultants",
    "8 weeks", "44 lessons", "Intermediate", "₹5,299", "₹7,999", "4.7", "640", "🛡️",
    "Embed security into the DevOps pipeline. Learn SAST, DAST, container scanning, secret detection, IAM auditing, and cloud compliance standards.",
    [
      ["DevSecOps Fundamentals & SAST", "3 weeks", ["Security in CI/CD", "SonarQube & Semgrep", "Secret Scanning (TruffleHog)", "Dependency Scanning (Snyk)"]],
      ["Container & Cloud Security", "5 weeks", ["Trivy & Clair Container Auditing", "Kubernetes Security Policies", "AWS IAM Security Auditing", "DAST with OWASP ZAP"]],
    ],
    ["Secure CI/CD Pipeline", "Kubernetes Security Benchmark", "Automated Vulnerability Scanner"],
    ["DevSecOps", "Docker Security", "Kubernetes Security", "SonarQube", "Trivy", "OWASP"]
  ),

  "ml-py": mk(
    "ML-PY", "Machine Learning with Python", "AI & Data",
    "Dr. Anita Bose", "Data Science Lead, PhD in AI",
    "12 weeks", "62 lessons", "Intermediate", "₹7,499", "₹11,999", "4.9", "2,100", "📊",
    "Comprehensive Machine Learning program. Master Python data science libraries (NumPy, Pandas, Matplotlib), supervised & unsupervised learning, model tuning, and deployment.",
    [
      ["Data Preprocessing & EDA", "3 weeks", ["NumPy & Pandas Deep Dive", "Data Cleaning & Feature Scaling", "Exploratory Data Analysis", "Feature Engineering"]],
      ["Supervised Learning Algorithms", "4 weeks", ["Linear & Logistic Regression", "Decision Trees & Random Forests", "XGBoost & Gradient Boosting", "SVM & K-Nearest Neighbors"]],
      ["Unsupervised & Model Deployment", "5 weeks", ["K-Means & Hierarchical Clustering", "PCA Dimensionality Reduction", "Model Evaluation & Hyperparameter Tuning", "FastAPI & Docker ML Deployment"]],
    ],
    ["Predictive Analytics Engine", "Customer Churn Prediction", "End-to-End ML API"],
    ["Python", "Scikit-Learn", "Pandas", "NumPy", "XGBoost", "FastAPI", "Docker"]
  ),

  "agentic": mk(
    "AGENTIC", "Agentic AI Platform Engineering", "AI & Data",
    "Rohit Sharma", "Ex-Google, AI Systems Engineer",
    "8 weeks", "46 lessons", "Advanced", "₹8,999", "₹13,999", "4.9", "520", "🤖",
    "Build autonomous AI agents and multi-agent platforms. Master LangChain, LangGraph, AutoGen, vector databases, RAG architecture, and tool-calling models.",
    [
      ["LLM Orchestration & RAG", "3 weeks", ["OpenAI & Anthropic APIs", "Vector DBs (ChromaDB, Pinecone)", "Retrieval-Augmented Generation (RAG)", "LangChain Core"]],
      ["Autonomous Multi-Agent Architectures", "5 weeks", ["Agent Memory & Planning", "LangGraph State Machines", "Multi-Agent Collaboration (AutoGen)", "Tool Calling & Code Execution"]],
    ],
    ["Autonomous Coding Agent", "Multi-Agent Research Assistant", "Enterprise RAG Platform"],
    ["GenAI", "LangChain", "LangGraph", "Vector DB", "Python", "OpenAI"]
  ),

  "sql-dm": mk(
    "SQL-DM", "SQL & Data Modelling for Engineers", "AI & Data",
    "Dr. Anita Bose", "Data Science Lead, PhD in AI",
    "6 weeks", "38 lessons", "Beginner", "₹1,999", "₹3,499", "4.7", "1,430", "🗄️",
    "SQL from fundamentals to advanced data engineering queries. Master joins, window functions, indexing, CTEs, and relational database schema design.",
    [
      ["SQL Fundamentals & Joins", "2 weeks", ["SELECT & Filtering", "INNER, LEFT, RIGHT Joins", "Aggregations & GROUP BY", "Subqueries"]],
      ["Advanced Querying & Schema Design", "4 weeks", ["Window Functions (RANK, LEAD, LAG)", "Common Table Expressions (CTEs)", "Indexing & Query Optimization", "Normalization & ERD"]],
    ],
    ["Analytics Warehouse Schema", "Sales Performance Queries", "Database Tuning Suite"],
    ["SQL", "PostgreSQL", "MySQL", "DB Design", "Data Analytics"]
  ),

  "sel-aut": mk(
    "SEL-AUT", "Selenium Automation Testing", "Testing",
    "Kavitha Reddy", "QA Lead Architect",
    "8 weeks", "54 lessons", "Beginner", "₹3,499", "₹5,999", "4.8", "1,520", "🧪",
    "Master automated web testing with Java and Selenium WebDriver. Learn TestNG framework, Page Object Model (POM), Data-Driven testing, and Jenkins integration.",
    [
      ["Java Basics & Selenium WebDriver", "3 weeks", ["Java for Automation", "WebDriver Locators (XPath, CSS)", "Handling Elements & Windows", "Explicit & Implicit Waits"]],
      ["TestNG Framework & CI/CD", "5 weeks", ["TestNG Annotations & Assertions", "Page Object Model (POM) Design", "Apache POI Data Driven Testing", "Jenkins Pipeline Integration"]],
    ],
    ["E-Commerce Test Automation Suite", "Hybrid Test Automation Framework", "Extent Reports Dashboard"],
    ["Selenium", "Java", "TestNG", "Maven", "Jenkins", "POM"]
  ),

  "api-perf": mk(
    "API-PERF", "API & Performance Testing — Postman & JMeter", "Testing",
    "Kavitha Reddy", "QA Lead Architect",
    "5 weeks", "31 lessons", "Intermediate", "₹2,999", "₹4,999", "4.7", "980", "⚡",
    "API testing and performance benchmarking. Master Postman test scripts, Newman CLI, Apache JMeter load testing, response validation, and stress analysis.",
    [
      ["API Automation with Postman", "2 weeks", ["REST API Methods", "Postman Collections & Variables", "JavaScript Test Assertion Scripts", "Newman Command Line Execution"]],
      ["Performance Testing with Apache JMeter", "3 weeks", ["JMeter Thread Groups & Samplers", "Parameterization & Correlation", "Load, Stress & Spike Testing", "Performance Bottleneck Analysis"]],
    ],
    ["REST API Test Automation Suite", "E-Commerce Load Benchmark Report", "CI/CD Postman Pipeline"],
    ["Postman", "JMeter", "REST API", "JavaScript", "Newman", "Performance Testing"]
  ),

  "career-01": mk(
    "CAREER-01", "Interview Preparation & Resume Lab", "Career",
    "Placement Cell", "Senior Placement Experts",
    "4 weeks", "22 lessons", "Beginner", "₹0", "₹0", "4.9", "5,210", "💼",
    "Land your dream IT job. Comprehensive resume optimization, ATS formatting, LinkedIn branding, technical mock interviews, HR negotiation strategies.",
    [
      ["ATS Resume & Profile Building", "2 weeks", ["ATS-Friendly Resume Templates", "GitHub & Portfolio Showcase", "LinkedIn Optimization", "Cover Letter Strategies"]],
      ["Mock Interviews & Soft Skills", "2 weeks", ["Technical Interview Frameworks", "HR Behavioral Questions", "Salary Negotiation", "Live Mock Interview Rounds"]],
    ],
    ["Industry-Ready ATS Resume", "Professional Developer Portfolio", "3 Live Mock Interview Reviews"],
    ["Resume Optimization", "LinkedIn Branding", "Mock Interviews", "Placement Support"]
  ),

  "career-02": mk(
    "CAREER-02", "Aptitude & Communication for Campus Hiring", "Career",
    "Placement Cell", "Campus Training Division",
    "6 weeks", "40 lessons", "Beginner", "₹0", "₹0", "4.6", "3,120", "🎯",
    "Prepare for campus recruitment drives. Quantitative aptitude, logical reasoning, verbal ability, group discussions, and corporate communication.",
    [
      ["Quantitative & Logical Aptitude", "3 weeks", ["Speed Math & Arithmetic", "Logical & Data Interpretation", "Puzzles & Series", "Company Test Patterns"]],
      ["Verbal & Group Discussion", "3 weeks", ["Grammar & Vocabulary", "Group Discussion Techniques", "Email Writing Etiquette", "Public Speaking Practice"]],
    ],
    ["5 Full-Length Aptitude Tests", "Live Group Discussion Simulation", "Corporate Email Portfolio"],
    ["Aptitude", "Logical Reasoning", "Communication", "Campus Hiring"]
  ),
};

/* ---------- Fallback: build a generic course from the marketplace list ---------- */
const fromMarket = (m) =>
  mk(
    m.id, m.title, m.category,
    m.instructor || "TX Pathwing Expert", "Senior Industry Instructor",
    m.duration || "8 weeks", m.lessons || "45 lessons", m.level || "Intermediate",
    m.price, m.oldPrice || "", "4.8", m.students || "1,200", "🎓",
    `Comprehensive ${m.title} training program. Designed to provide hands-on experience, real-world projects, and placement assistance.`,
    [
      ["Foundations & Environment Setup", "2 weeks", ["Core Concepts", "Tooling & Setup", "Basic Implementations"]],
      ["Core Applications & Deep Dive", "3 weeks", ["Advanced Topics", "Best Practices", "Industry Standards"]],
      ["Capstone Project & Deployment", "3 weeks", ["Real-world Capstone", "Performance Tuning", "Deployment & Portfolio"]],
    ],
    [`${m.title} Real-World App`, "Enterprise Case Study"],
    [m.category, "Industry Best Practices", "Hands-on Labs"]
  );

const readEnrolled = () => {
  try {
    return JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
  } catch {
    return [];
  }
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolledSuccess, setEnrolledSuccess] = useState(false); // hooks must run before any early return

  const cleanId = (id || "").toLowerCase();

  let course = extendedCoursesData[cleanId];
  if (!course) {
    const m = marketCourses.find((c) => (c.id || "").toLowerCase() === cleanId);
    if (m) course = fromMarket(m);
  }

  if (!course) {
    return (
      <div className="detail-notfound">
        <h2>Course not found</h2>
        <p>The requested course could not be located in our catalogue.</p>
        <button onClick={() => navigate("/marketplace")}>Back to Marketplace</button>
      </div>
    );
  }

  const isEnrolled = readEnrolled().some(
    (e) => (e.id || "").toLowerCase() === cleanId || (e.code || "").toLowerCase() === cleanId
  );

  const handleEnroll = () => {
    const current = readEnrolled();
    if (!current.some((e) => (e.id || "").toLowerCase() === cleanId)) {
      current.push({
        id: cleanId,
        code: course.code,
        title: course.title,
        price: course.price,
        category: course.category,
        instructor: course.instructor,
        progress: 0,
        currentModule: course.syllabus?.[0]?.t ? `Module 1: ${course.syllabus[0].t}` : "Module 1",
      });
      localStorage.setItem("enrolledCourses", JSON.stringify(current));
    }
    setEnrolledSuccess(true);
    setTimeout(() => navigate("/dashboard"), 600);
  };

  const buttonLabel = enrolledSuccess
    ? "Enrolled Successfully! Loading..."
    : isEnrolled
    ? "Already Enrolled ✓ Go to Dashboard"
    : `Enroll Now — ${course.price}`;

  return (
    <div className="detail-page">
      <div className="detail-breadcrumb">
        <button type="button" className="back-btn" onClick={() => navigate("/marketplace")}>
          ← Back to Courses
        </button>
        <span className="crumb">
          Marketplace &gt; {course.category || "Course"} &gt; {course.code}
        </span>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-badge">
            {course.code} • {course.level}
          </div>
          <h1 className="detail-title">{course.title}</h1>

          <div className="detail-instructor">
            <div className="avatar">{course.emoji}</div>
            <div>
              <div className="inst-name">{course.instructor}</div>
              <div className="inst-role">{course.role}</div>
            </div>
            <div className="detail-meta">
              <span>⏱ {course.weeks}</span>
              <span>📚 {course.lessons}</span>
              <span>⭐ {course.rating} ({course.reviews})</span>
            </div>
          </div>

          <p className="detail-about">{course.about}</p>

          <div className="detail-skills">
            {course.skills.map((skill) => (
              <span key={skill} className="skill-pill">{skill}</span>
            ))}
          </div>

          <h2 className="section-title">Syllabus — {course.code} Track</h2>
          <div className="syllabus-list">
            {course.syllabus.map((mod) => (
              <div key={mod.m} className="syllabus-card">
                <div className="syllabus-left">
                  <div className="mod-num">{mod.m}</div>
                  <div className="mod-duration">{mod.d}</div>
                </div>
                <div className="syllabus-right">
                  <h3>{mod.t}</h3>
                  <ul>
                    {mod.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <h2 className="section-title">Capstone Projects</h2>
          <div className="projects-list">
            {course.projects.map((p, i) => (
              <div key={p} className="project-card">
                <div className="project-num">0{i + 1}</div>
                <div className="project-name">{p}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="buy-card">
            <div className="buy-price">
              <span className="now">{course.price}</span>
              {course.oldPrice && course.oldPrice !== "₹0" && (
                <>
                  <span className="old">{course.oldPrice}</span>
                  <span className="off">SPECIAL OFFER</span>
                </>
              )}
            </div>

            <button
              type="button"
              className="buy-btn"
              onClick={isEnrolled ? () => navigate("/dashboard") : handleEnroll}
            >
              {buttonLabel}
            </button>
            <button type="button" className="cart-btn">Add to Cart</button>

            <div className="buy-features">
              <div>✓ Lifetime Access to Course Labs</div>
              <div>✓ Certificate + Placement Support</div>
              <div>✓ Live Mentor Doubt Sessions</div>
              <div>✓ GST Invoice Included</div>
            </div>

            <div className="trust">🔒 Secure payment by Pathwing • 7 day money-back guarantee</div>
          </div>

          <div className="info-card">
            <h4>This Course Includes</h4>
            <div>📹 {course.lessons} videos & lectures</div>
            <div>💻 Hands-on Coding Labs</div>
            <div>🎯 {course.projects.length} Real-World Projects</div>
            <div>📄 Industry Certificate</div>
          </div>
        </div>
      </div>
    </div>
  );
}