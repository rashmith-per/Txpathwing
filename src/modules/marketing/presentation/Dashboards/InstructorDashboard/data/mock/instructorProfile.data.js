/**
 * Canonical Data Source for Instructor Dashboard
 * Guaranteed unique, stable record IDs to prevent duplicate data rendering.
 */

export const instructorProfile = {
  id: "inst-ramana-1",
  name: "Dr. R. Ramana",
  title: "Professor & Lead Technical Instructor",
  department: "Computer Science & Engineering",
  organization: "KITS Warangal · Pathwing Partner",
  email: "ramana.r@kitsw.ac.in",
  avatarInitials: "RR",
  publishedCoursesCount: 4,
  activeLearners: 1428,
  completionRate: 87.6,
  averageRating: 4.92,
  totalReviews: 342,
  netEarningsMonth: 284500,
  netEarningsYTD: 1492000,
  platformCommissionRate: 15,
  openQuestionsCount: 7,
  responseRate: 98.4
};

export const initialEarningsData = [
  { id: "earn-may-26", month: "May", gross: 210000, commission: 31500, net: 178500, learners: 184 },
  { id: "earn-jun-26", month: "Jun", gross: 245000, commission: 36750, net: 208250, learners: 216 },
  { id: "earn-jul-26", month: "Jul", gross: 270000, commission: 40500, net: 229500, learners: 242 },
  { id: "earn-aug-26", month: "Aug", gross: 295000, commission: 44250, net: 250750, learners: 268 },
  { id: "earn-sep-26", month: "Sep", gross: 318000, commission: 47700, net: 270300, learners: 290 },
  { id: "earn-oct-26", month: "Oct", gross: 334706, commission: 50206, net: 284500, learners: 312 }
];

export const initialAttentionItems = [
  {
    id: "att-q-1",
    type: "question",
    priority: "urgent",
    title: "React 19 Server Components hydration mismatch in Lab 4",
    course: "React Full Stack Development",
    submittedBy: "Aarav Sharma",
    timestamp: "14h ago",
    details: "Learner encountering SSR hydration mismatch in Lab 4 test suite.",
    status: "Urgent",
    actionLabel: "Reply"
  },
  {
    id: "att-q-2",
    type: "question",
    priority: "urgent",
    title: "AWS ECS Fargate Task Definition memory allocation query",
    course: "AWS DevOps Engineer",
    submittedBy: "Sneha Reddy",
    timestamp: "18h ago",
    details: "Fargate container exiting with OOMKilled code 137.",
    status: "Urgent",
    actionLabel: "Reply"
  },
  {
    id: "att-q-3",
    type: "question",
    priority: "warning",
    title: "Spring Security 6 JWT filter chain deprecation in Module 3",
    course: "Java Full Stack Development",
    submittedBy: "Vikram Patel",
    timestamp: "1d ago",
    details: "Need migration snippet for authorizeHttpRequests() configuration.",
    status: "Action Needed",
    actionLabel: "Reply"
  },
  {
    id: "att-grade-1",
    type: "grading",
    priority: "warning",
    title: "Microservices Architecture Capstone: 6 submissions waiting",
    course: "Distributed Systems & Cloud Architecture",
    submittedBy: "Batch 2026-Alpha",
    timestamp: "Yesterday",
    details: "6 student capstone projects awaiting final instructor review.",
    status: "Action Needed",
    actionLabel: "Grade"
  },
  {
    id: "att-review-1",
    type: "review",
    priority: "warning",
    title: "Advanced Spring Boot 3 - Syllabus update awaiting platform review",
    course: "Java Full Stack Development",
    submittedBy: "Academic Audit Board",
    timestamp: "2d ago",
    details: "Module 8 AI Agents syllabus awaiting platform compliance review.",
    status: "Under Review",
    actionLabel: "View"
  },
  {
    id: "att-session-1",
    type: "session",
    priority: "info",
    title: "Live Q&A: Cloud Deployment Strategies & System Design",
    course: "AWS DevOps Engineer",
    submittedBy: "Batch 2026-B & 2026-C",
    timestamp: "Tomorrow 6:00 PM",
    details: "Live interactive mentoring session with 142 registered learners.",
    status: "Scheduled",
    actionLabel: "Join"
  }
];
