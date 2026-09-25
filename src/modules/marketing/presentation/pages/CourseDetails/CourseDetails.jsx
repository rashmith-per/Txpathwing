import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetails.css";

const coursesData = {
  "react-fs": { code: "REACT-FS", title: "React Full Stack Development", instructor: "Arjun Mehta", role: "Ex-Meta, 8 years React", weeks: "14 weeks", lessons: "96 lessons", level: "Intermediate", price: "₹5,499", oldPrice: "₹8,999", rating: "4.9", reviews: "1,240", emoji: "⚛️", about: "Master modern React with Next.js 14, Tailwind, Node.js. Build production apps.", syllabus: [{ m: "Module 1", t: "React Fundamentals", topics: ["JSX & Components", "Props & State", "Hooks", "Router"], d: "2 weeks" }, { m: "Module 2", t: "Advanced React", topics: ["Context", "React Query", "Performance", "Testing"], d: "3 weeks" }, { m: "Module 3", t: "Next.js & Full Stack", topics: ["App Router", "Server Components", "API Routes", "Prisma"], d: "4 weeks" }, { m: "Module 4", t: "Production", topics: ["Vercel CI/CD", "Auth & Payments", "Socket.io", "Capstone"], d: "5 weeks" }], projects: ["E-commerce Store", "Real-time Chat", "SaaS Dashboard"], skills: ["React", "Next.js", "Tailwind", "Node.js", "PostgreSQL", "TypeScript"] },
  "py-fs": { code: "PY-FS", title: "Python Full Stack with Django & React", instructor: "Sowmya Iyer", role: "Ex-Swiggy, Python Architect", weeks: "16 weeks", lessons: "112 lessons", level: "Beginner", price: "₹6,499", oldPrice: "₹9,999", rating: "4.8", reviews: "1,876", emoji: "🐍", about: "Become Python full stack. Django, DRF, PostgreSQL, Celery, Redis, React, Docker.", syllabus: [{ m: "Module 1", t: "Python Core", topics: ["Python Basics", "OOP", "File Handling", "Async"], d: "2 weeks" }, { m: "Module 2", t: "Django & DB", topics: ["Django MVT", "ORM", "PostgreSQL", "Auth"], d: "4 weeks" }, { m: "Module 3", t: "DRF & Advanced", topics: ["DRF", "Celery Redis", "Caching", "Testing"], d: "4 weeks" }, { m: "Module 4", t: "React & DevOps", topics: ["React Integration", "Docker", "AWS Deploy", "Capstone"], d: "6 weeks" }], projects: ["Job Portal", "REST API Marketplace", "AI Chatbot"], skills: ["Python", "Django", "DRF", "PostgreSQL", "React", "Docker"] },
  "java-fs": { code: "JAVA-FS", title: "Java Full Stack — Spring Boot & Microservices", instructor: "Naveen Kulkarni", role: "Ex-Oracle, Java Champion", weeks: "18 weeks", lessons: "128 lessons", level: "Intermediate", price: "₹6,999", oldPrice: "₹11,999", rating: "4.7", reviews: "2,104", emoji: "☕", about: "Enterprise Java. Spring Boot, Spring Cloud, Kafka, Kubernetes, Microservices.", syllabus: [{ m: "Module 1", t: "Java 17 Core", topics: ["Java 17", "Collections", "Multithreading", "JVM"], d: "3 weeks" }, { m: "Module 2", t: "Spring Boot", topics: ["Spring Core", "Boot", "JPA Hibernate", "Security"], d: "5 weeks" }, { m: "Module 3", t: "Microservices", topics: ["Spring Cloud", "Kafka", "API Gateway", "Discovery"], d: "5 weeks" }, { m: "Module 4", t: "Cloud", topics: ["Docker K8s", "AWS", "Monitoring", "Capstone"], d: "5 weeks" }], projects: ["Banking System", "E-commerce Microservices", "Notification Service"], skills: ["Java 17", "Spring Boot", "Kafka", "Kubernetes", "PostgreSQL", "AWS"] },
  "aws-dop": { code: "AWS-DOP", title: "AWS DevOps Engineer — Professional Track", instructor: "Meera Krishnan", role: "AWS Hero, Ex-Amazon DevOps", weeks: "12 weeks", lessons: "74 lessons", level: "Advanced", price: "₹6,999", oldPrice: "₹10,999", rating: "4.9", reviews: "1,284", emoji: "☁️", about: "Production DevOps. AWS, Terraform, EKS, CI/CD, GitOps, monitoring at scale.", syllabus: [{ m: "Module 1", t: "AWS Core", topics: ["EC2 VPC IAM", "S3 RDS", "Networking", "Security"], d: "2 weeks" }, { m: "Module 2", t: "IaC", topics: ["Terraform", "CloudFormation", "Ansible", "State"], d: "3 weeks" }, { m: "Module 3", t: "Containers K8s", topics: ["Docker", "EKS ECS", "Helm", "Service Mesh"], d: "4 weeks" }, { m: "Module 4", t: "CI/CD GitOps", topics: ["GitHub Actions", "ArgoCD", "Prometheus", "Capstone"], d: "3 weeks" }], projects: ["Terraform Infra", "EKS Cluster", "CI/CD Pipeline"], skills: ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus"] },
  "dsa-01": { code: "DSA-01", title: "Data Structures & Algorithms Mastery", instructor: "Rohit Sharma", role: "Ex-Google, DSA Expert", weeks: "8 weeks", lessons: "46 lessons", level: "Intermediate", price: "₹8,999", oldPrice: "₹13,999", rating: "4.8", reviews: "311", emoji: "🧠", about: "Crack FAANG interviews. DSA patterns, system design basics, live coding.", syllabus: [{ m: "Module 1", t: "Arrays & Hashing", topics: ["Arrays", "HashMap", "Two Pointers", "Sliding Window"], d: "2 weeks" }, { m: "Module 2", t: "Trees & Graphs", topics: ["Binary Trees", "BST", "Graphs BFS/DFS", "DP Intro"], d: "3 weeks" }, { m: "Module 3", t: "Advanced", topics: ["Dynamic Programming", "Greedy", "System Design", "Mock Interviews"], d: "3 weeks" }], projects: ["LeetCode 200", "System Design Doc", "Mock FAANG Interviews"], skills: ["DSA", "Algorithms", "System Design", "Problem Solving"] },
  "sql-01": { code: "SQL-01", title: "SQL & Database Design", instructor: "Priya Nair", role: "Data Engineer, 6 years", weeks: "6 weeks", lessons: "38 lessons", level: "Beginner", price: "₹1,999", oldPrice: "₹3,499", rating: "4.7", reviews: "2,890", emoji: "🗄️", about: "SQL from scratch to advanced. Queries, joins, indexing, DB design.", syllabus: [{ m: "Module 1", t: "SQL Basics", topics: ["SELECT", "Joins", "Aggregation", "Subqueries"], d: "2 weeks" }, { m: "Module 2", t: "Advanced", topics: ["Indexing", "Transactions", "Stored Proc", "Design"], d: "4 weeks" }], projects: ["E-commerce DB Design", "Analytics Queries", "Performance Tuning"], skills: ["SQL", "PostgreSQL", "MySQL", "DB Design"] },
  "cyber-01": { code: "CS-01", title: "Cybersecurity Fundamentals", instructor: "Vikram Singh", role: "Security Researcher", weeks: "8 weeks", lessons: "54 lessons", level: "Beginner", price: "₹3,499", oldPrice: "₹5,999", rating: "4.7", reviews: "890", emoji: "🔒", about: "Ethical hacking, network security, OWASP, penetration testing.", syllabus: [{ m: "Module 1", t: "Network Security", topics: ["Networking", "Firewalls", "VPN", "IDS"], d: "3 weeks" }, { m: "Module 2", t: "Ethical Hacking", topics: ["OWASP Top 10", "Pen Testing", "Cryptography", "SOC"], d: "5 weeks" }], projects: ["Vulnerability Assessment", "Pen Test Report", "Secure App"], skills: ["Cybersecurity", "OWASP", "Pen Testing", "Network Security"] },
  "ai-01": { code: "AI-01", title: "GenAI & Prompt Engineering", instructor: "Kavitha Reddy", role: "AI Engineer", weeks: "5 weeks", lessons: "31 lessons", level: "Beginner", price: "₹2,999", oldPrice: "₹4,499", rating: "4.6", reviews: "405", emoji: "🤖", about: "Build with LLMs. Prompt engineering, RAG, LangChain, OpenAI API.", syllabus: [{ m: "Module 1", t: "LLM Basics", topics: ["Prompt Engineering", "OpenAI API", "RAG", "LangChain"], d: "3 weeks" }, { m: "Module 2", t: "Build AI Apps", topics: ["Chatbot", "Vector DB", "Fine-tuning", "Deploy"], d: "2 weeks" }], projects: ["AI Chatbot", "RAG Document Q&A", "AI SaaS"], skills: ["GenAI", "Prompt Engineering", "LangChain", "OpenAI"] },
  "career-01": { code: "CAREER-01", title: "Interview Preparation & Resume Lab", instructor: "Placement Cell", role: "Placement Experts", weeks: "4 weeks", lessons: "22 lessons", level: "Beginner", price: "Free", oldPrice: "", rating: "4.8", reviews: "5,210", emoji: "💼", about: "Resume building, mock interviews, HR rounds, salary negotiation.", syllabus: [{ m: "Module 1", t: "Resume & LinkedIn", topics: ["Resume Building", "LinkedIn Profile", "Cover Letter", "Portfolio"], d: "2 weeks" }, { m: "Module 2", t: "Interviews", topics: ["Technical Interviews", "HR Rounds", "Mock Interviews", "Negotiation"], d: "2 weeks" }], projects: ["Resume Review", "3 Mock Interviews", "LinkedIn Makeover"], skills: ["Interview Prep", "Resume", "Communication", "Placement"] },
  "career-02": { code: "CAREER-02", title: "Aptitude & Communication for Campus Hiring", instructor: "Placement Cell", role: "Aptitude Trainer", weeks: "6 weeks", lessons: "40 lessons", level: "Beginner", price: "Free", oldPrice: "", rating: "4.5", reviews: "3,120", emoji: "🎯", about: "Aptitude, logical reasoning, verbal, group discussions.", syllabus: [{ m: "Module 1", t: "Aptitude", topics: ["Quant", "Logical", "Verbal", "Puzzles"], d: "3 weeks" }, { m: "Module 2", t: "Communication", topics: ["GD", "Public Speaking", "Email", "Interview Comm"], d: "3 weeks" }], projects: ["Aptitude Tests", "GD Sessions", "Communication Lab"], skills: ["Aptitude", "Communication", "Campus Hiring"] },
  "ml-01": { code: "ML-01", title: "Machine Learning with Python", instructor: "Anita Bose", role: "ML Engineer, PhD", weeks: "10 weeks", lessons: "64 lessons", level: "Intermediate", price: "₹4,999", oldPrice: "₹7,999", rating: "4.8", reviews: "980", emoji: "📊", about: "ML from scratch. Regression, classification, NLP, deployment.", syllabus: [{ m: "Module 1", t: "ML Foundations", topics: ["Regression", "Classification", "Clustering", "Evaluation"], d: "5 weeks" }, { m: "Module 2", t: "Advanced ML", topics: ["NLP", "Deep Learning Intro", "Model Deploy", "Capstone"], d: "5 weeks" }], projects: ["House Price Prediction", "Sentiment Analysis", "ML API"], skills: ["Python", "ML", "Scikit-learn", "Pandas"] },
  "test-01": { code: "TEST-01", title: "Manual & Automation Testing", instructor: "Suresh Kumar", role: "QA Lead, 8 years", weeks: "7 weeks", lessons: "48 lessons", level: "Beginner", price: "₹2,499", oldPrice: "₹4,999", rating: "4.6", reviews: "756", emoji: "🧪", about: "Testing fundamentals, Selenium, API testing, frameworks.", syllabus: [{ m: "Module 1", t: "Manual Testing", topics: ["SDLC", "Test Cases", "Bug Tracking", "API Testing"], d: "3 weeks" }, { m: "Module 2", t: "Automation", topics: ["Selenium", "TestNG", "Framework", "CI/CD"], d: "4 weeks" }], projects: ["Test Plan", "Selenium Framework", "API Test Suite"], skills: ["Manual Testing", "Selenium", "API Testing", "TestNG"] },
  "azure-01": { code: "CLOUD-01", title: "Azure Cloud Architect", instructor: "Deepak Joshi", role: "Azure MVP", weeks: "9 weeks", lessons: "58 lessons", level: "Advanced", price: "₹5,999", oldPrice: "₹9,499", rating: "4.7", reviews: "623", emoji: "☁️", about: "Azure services, architecture, DevOps, security.", syllabus: [{ m: "Module 1", t: "Azure Core", topics: ["VMs", "VNet", "Storage", "IAM"], d: "4 weeks" }, { m: "Module 2", t: "Architecture", topics: ["AKS", "DevOps", "Security", "Cost Mgmt"], d: "5 weeks" }], projects: ["Azure Infra", "AKS Deployment", "Cost Optimization"], skills: ["Azure", "AKS", "Terraform", "DevOps"] },
  "dsa-02": { code: "DSA-02", title: "Advanced DSA & System Design", instructor: "Rohit Sharma", role: "Ex-Google Staff Engineer", weeks: "12 weeks", lessons: "82 lessons", level: "Advanced", price: "₹9,999", oldPrice: "₹15,999", rating: "4.9", reviews: "445", emoji: "🏗️", about: "Advanced DSA + LLD + HLD + System Design for senior roles.", syllabus: [{ m: "Module 1", t: "Advanced DSA", topics: ["Graphs Advanced", "DP Hard", "Tries", "Segment Tree"], d: "5 weeks" }, { m: "Module 2", t: "System Design", topics: ["LLD", "HLD", "Scalability", "Design Instagram"], d: "7 weeks" }], projects: ["Design TinyURL", "Design WhatsApp", "LLD Parking Lot"], skills: ["Advanced DSA", "System Design", "LLD", "HLD"] },
};

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData[id];

  if (!course) return <div className="detail-notfound">Course not found <button onClick={() => navigate("/")}>Go Home</button></div>;

  return (
    <div className="detail-page">
      <div className="detail-breadcrumb">
        <button
          className="back-btn"
          onClick={() => navigate("/marketplace")}
        >
          ← Back to Marketplace
        </button>

        <span className="crumb">
          Marketplace &gt; {course.code}
        </span>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-badge">{course.code} • {course.level}</div>
          <h1 className="detail-title">{course.title}</h1>
          <div className="detail-instructor">
            <div className="avatar">{course.emoji}</div>
            <div><div className="inst-name">{course.instructor}</div><div className="inst-role">{course.role}</div></div>
            <div className="detail-meta"><span>⏱ {course.weeks}</span><span>📚 {course.lessons}</span><span>⭐ {course.rating} ({course.reviews})</span></div>
          </div>
          <p className="detail-about">{course.about}</p>
          <div className="detail-skills">{course.skills.map(s => <span key={s} className="skill-pill">{s}</span>)}</div>
          <h2 className="section-title">Syllabus — {course.code} Full Track</h2>
          <div className="syllabus-list">
            {course.syllabus.map((mod, i) => (
              <div key={i} className="syllabus-card">
                <div className="syllabus-left"><div className="mod-num">{mod.m}</div><div className="mod-duration">{mod.d}</div></div>
                <div className="syllabus-right"><h3>{mod.t}</h3><ul>{mod.topics.map(t => <li key={t}>{t}</li>)}</ul></div>
              </div>
            ))}
          </div>
          <h2 className="section-title">Capstone Projects</h2>
          <div className="projects-list">{course.projects.map((p, i) => <div key={i} className="project-card"><div className="project-num">0{i + 1}</div><div className="project-name">{p}</div></div>)}</div>
        </div>
        <div className="detail-sidebar">
          <div className="buy-card">
            <div className="buy-price"><span className="now">{course.price}</span>{course.oldPrice && <><span className="old">{course.oldPrice}</span><span className="off">40% off</span></>}</div>
            <button className="buy-btn">Buy this cohort — {course.price}</button>
            <button className="cart-btn">Add to cart</button>
            <div className="buy-features"><div>✓ Lifetime access</div><div>✓ Certificate + Placement support</div><div>✓ Live doubt sessions</div><div>✓ GST Invoice</div></div>
            <div className="trust">🔒 Secure payment by Pathwing • 7 day refund</div>
          </div>
          <div className="info-card"><h4>This course includes</h4><div>📹 {course.lessons} videos</div><div>💻 Coding labs</div><div>🎯 {course.projects.length} projects</div><div>📄 Certificate</div></div>
        </div>
      </div>
    </div>
  );
}