export const initialLearners = [
  {
    id: "lrn-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@kitsw.pathwing.in",
    courseId: "crs-inst-3",
    courseName: "React 19 & Next.js Full Stack",
    progress: 74,
    quizScore: 92,
    lastActive: "2 hours ago",
    status: "Active",
    cohort: "Batch 2026-A"
  },
  {
    id: "lrn-2",
    name: "Sneha Reddy",
    email: "sneha.reddy@student.valuelabs.com",
    courseId: "crs-inst-2",
    courseName: "AWS DevOps Engineer",
    progress: 88,
    quizScore: 95,
    lastActive: "45 mins ago",
    status: "Active",
    cohort: "Batch 2026-B"
  },
  {
    id: "lrn-3",
    name: "Vikram Patel",
    email: "vpatel@txhub.org",
    courseId: "crs-inst-1",
    courseName: "Java Full Stack Development",
    progress: 65,
    quizScore: 84,
    lastActive: "Yesterday",
    status: "Active",
    cohort: "Batch 2026-A"
  },
  {
    id: "lrn-4",
    name: "Pooja Varma",
    email: "p.varma@deloitte.com",
    courseId: "crs-inst-4",
    courseName: "Distributed Microservices",
    progress: 91,
    quizScore: 98,
    lastActive: "30 mins ago",
    status: "Active",
    cohort: "Corporate Cohort"
  },
  {
    id: "lrn-5",
    name: "Karan Johar",
    email: "karan.j@anurag.edu.in",
    courseId: "crs-inst-1",
    courseName: "Java Full Stack Development",
    progress: 52,
    quizScore: 78,
    lastActive: "3 days ago",
    status: "Needs Support",
    cohort: "Batch 2026-C"
  },
  {
    id: "lrn-6",
    name: "Meera Krishnan",
    email: "meera.k@pathwing.in",
    courseId: "crs-inst-2",
    courseName: "AWS DevOps Engineer",
    progress: 100,
    quizScore: 97,
    lastActive: "Just now",
    status: "Completed",
    cohort: "Batch 2026-A"
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    learner: "Aarav Sharma",
    avatarInitials: "AS",
    course: "React 19 & Next.js Full Stack",
    rating: 5,
    date: "20 Oct 2026",
    comment: "Deep dive into Server Actions made complex concepts clear. Great labs!"
  },
  {
    id: "rev-2",
    learner: "Sneha Reddy",
    avatarInitials: "SR",
    course: "AWS DevOps Engineer Professional",
    rating: 5,
    date: "17 Oct 2026",
    comment: "Best cloud engineering curriculum. Live sessions helped pass certification."
  },
  {
    id: "rev-3",
    learner: "Vikram Patel",
    avatarInitials: "VP",
    course: "Java Full Stack Development",
    rating: 4.8,
    date: "14 Oct 2026",
    comment: "Excellent real-world architectures and Spring Cloud microservices."
  },
  {
    id: "rev-4",
    learner: "Pooja Varma",
    avatarInitials: "PV",
    course: "Distributed Microservices & Kubernetes Architecture",
    rating: 5,
    date: "11 Oct 2026",
    comment: "Kubernetes orchestration labs gave me confidence for enterprise deployment."
  },
  {
    id: "rev-5",
    learner: "Karan Johar",
    avatarInitials: "KJ",
    course: "Autonomous AI Agents & Multi-Agent Orchestration",
    rating: 4.9,
    date: "08 Oct 2026",
    comment: "Cyclic agent workflows and tool-calling exercises are unmatched."
  },
  {
    id: "rev-6",
    learner: "Meera Krishnan",
    avatarInitials: "MK",
    course: "Java Full Stack Development",
    rating: 5,
    date: "05 Oct 2026",
    comment: "Modern and practical curriculum for Java backend engineers."
  }
];

export const initialPayoutHistory = [
  { id: "pay-oct-26", month: "October 2026", gross: "₹3,34,706", commission: "₹50,206 (15%)", net: "₹2,84,500", status: "Processing", date: "Est. 02 Nov 2026" },
  { id: "pay-sep-26", month: "September 2026", gross: "₹3,18,000", commission: "₹47,700 (15%)", net: "₹2,70,300", status: "Settled", date: "02 Oct 2026" },
  { id: "pay-aug-26", month: "August 2026", gross: "₹2,95,000", commission: "₹44,250 (15%)", net: "₹2,50,750", status: "Settled", date: "02 Sep 2026" },
  { id: "pay-jul-26", month: "July 2026", gross: "₹2,70,000", commission: "₹40,500 (15%)", net: "₹2,29,500", status: "Settled", date: "02 Aug 2026" }
];

export const initialBatches = [];


export const initialCertificates = [
  {
    id: "cert-1",
    certCode: "CERT-PW-89211",
    student: "Meera Krishnan",
    course: "AWS DevOps Engineer Professional",
    issuedDate: "22 Oct 2026",
    grade: "Distinction (97%)",
    status: "Verified",
    verificationUrl: "https://pathwing.in/verify/CERT-PW-89211"
  },
  {
    id: "cert-2",
    certCode: "CERT-PW-89212",
    student: "Rahul Verma",
    course: "Java Full Stack Development",
    issuedDate: "18 Oct 2026",
    grade: "First Class (91%)",
    status: "Verified",
    verificationUrl: "https://pathwing.in/verify/CERT-PW-89212"
  },
  {
    id: "cert-3",
    certCode: "CERT-PW-89213",
    student: "Ananya Deshmukh",
    course: "React 19 & Next.js Full Stack Engineering",
    issuedDate: "12 Oct 2026",
    grade: "Distinction (98%)",
    status: "Verified",
    verificationUrl: "https://pathwing.in/verify/CERT-PW-89213"
  },
  {
    id: "cert-4",
    certCode: "CERT-PW-89214",
    student: "Pooja Varma",
    course: "Distributed Microservices & Kubernetes Architecture",
    issuedDate: "05 Oct 2026",
    grade: "First Class (94%)",
    status: "Verified",
    verificationUrl: "https://pathwing.in/verify/CERT-PW-89214"
  }
];
