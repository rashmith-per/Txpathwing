export const initialAssignments = [
  {
    id: "asg-1",
    title: "Capstone: Distributed E-Commerce Saga Orchestrator",
    course: "Distributed Microservices & Kubernetes Architecture",
    student: "Aarav Sharma",
    submittedAt: "Yesterday, 11:45 PM",
    dueDate: "25 Oct 2026",
    status: "Pending Review",
    score: null,
    maxScore: 100,
    repoUrl: "https://github.com/aarav-sharma/saga-orchestrator-capstone",
    feedback: ""
  },
  {
    id: "asg-2",
    title: "Lab 4: Spring Cloud Gateway & JWT Rate Limiting",
    course: "Java Full Stack Development",
    student: "Sneha Reddy",
    submittedAt: "22 Oct 2026",
    dueDate: "23 Oct 2026",
    status: "Graded",
    score: 96,
    maxScore: 100,
    repoUrl: "https://github.com/sneha-reddy/spring-cloud-gateway-lab",
    feedback: "Outstanding rate limiter implementation using Redis token bucket algorithm."
  },
  {
    id: "asg-3",
    title: "Lab 5: Helm Chart & Canary Deployment in EKS",
    course: "AWS DevOps Engineer Professional",
    student: "Vikram Patel",
    submittedAt: "24 Oct 2026",
    dueDate: "25 Oct 2026",
    status: "Pending Review",
    score: null,
    maxScore: 100,
    repoUrl: "https://github.com/vikram-patel/eks-helm-canary",
    feedback: ""
  },
  {
    id: "asg-4",
    title: "Project 2: Next.js 15 Server Actions & Optimistic Cart",
    course: "React 19 & Next.js Full Stack Engineering",
    student: "Pooja Varma",
    submittedAt: "20 Oct 2026",
    dueDate: "21 Oct 2026",
    status: "Graded",
    score: 98,
    maxScore: 100,
    repoUrl: "https://github.com/pooja-varma/next15-optimistic-cart",
    feedback: "Flawless optimistic rollback state handling and type-safe server validation."
  },
  {
    id: "asg-5",
    title: "Lab 3: Docker Multi-Stage Optimization & Trivy Vulnerability Scan",
    course: "AWS DevOps Engineer Professional",
    student: "Karan Johar",
    submittedAt: "18 Oct 2026",
    dueDate: "19 Oct 2026",
    status: "Needs Resubmission",
    score: 62,
    maxScore: 100,
    repoUrl: "https://github.com/karan-j/docker-trivy-scan",
    feedback: "Base image must use distroless or alpine. Vulnerability report still has 2 CRITICAL CVEs."
  }
];

export const initialLiveSessions = [
  {
    id: "sess-1",
    title: "Mastering Distributed Transactions & Event-Driven Sagas",
    course: "Distributed Microservices & Kubernetes Architecture",
    dateTime: "Today, 6:00 PM IST",
    duration: "90 Mins",
    platform: "Pathwing Live Classroom",
    attendees: 124,
    status: "Upcoming",
    meetingUrl: "https://meet.pathwing.in/class/live-micro-arch",
    agenda: "Saga choreography vs orchestration, Outbox pattern, and failure compensation."
  },
  {
    id: "sess-2",
    title: "AWS EKS Cluster Zero-Downtime Migration Workshop",
    course: "AWS DevOps Engineer Professional",
    dateTime: "28 Oct 2026, 7:00 PM IST",
    duration: "120 Mins",
    platform: "Pathwing Live Classroom",
    attendees: 156,
    status: "Scheduled",
    meetingUrl: "https://meet.pathwing.in/class/live-aws-eks",
    agenda: "Blue/green worker node group upgrades, CoreDNS tuning, and Karpenter autoscaling."
  },
  {
    id: "sess-3",
    title: "React 19 Concurrent Features & Server Actions Deep Dive",
    course: "React 19 & Next.js Full Stack Engineering",
    dateTime: "24 Oct 2026 (Past)",
    duration: "75 Mins",
    platform: "Pathwing Archive",
    attendees: 142,
    status: "Completed",
    meetingUrl: "https://pathwing.in/recordings/rec-react19-ama",
    agenda: "useActionState, useOptimistic, and Server Functions serialization rules."
  },
  {
    id: "sess-4",
    title: "System Design Mock Interview & Architectural Critique",
    course: "Java Full Stack Development",
    dateTime: "21 Oct 2026 (Past)",
    duration: "105 Mins",
    platform: "Pathwing Archive",
    attendees: 198,
    status: "Completed",
    meetingUrl: "https://pathwing.in/recordings/rec-sysdesign-mock",
    agenda: "Designing a high-throughput URL shortener and real-time chat with WebSockets."
  }
];

export const initialQnA = [
  {
    id: "qna-1",
    title: "How to configure idempotency keys with Stripe and Spring Boot 3?",
    course: "Java Full Stack Development",
    student: "Aarav Sharma",
    upvotes: 14,
    repliesCount: 2,
    status: "Answered",
    timestamp: "3 hours ago",
    content: "When processing webhook events, duplicate charges occur during network retries. What is the recommended idempotency pattern?",
    answer: "Store idempotency keys in Redis with an atomic SETNX and a 24-hour TTL before processing transaction mutations. Return cached responses on replay."
  },
  {
    id: "qna-2",
    title: "OOMKilled Error code 137 in AWS ECS Fargate container startup",
    course: "AWS DevOps Engineer Professional",
    student: "Sneha Reddy",
    upvotes: 21,
    repliesCount: 0,
    status: "Pending",
    timestamp: "5 hours ago",
    content: "My JVM app exits with code 137 on ECS Fargate. The task memory is 2GB, but JVM still crashes during heap initialization.",
    answer: null
  },
  {
    id: "qna-3",
    title: "Next.js 15 cookies() in Server Actions async await requirement",
    course: "React 19 & Next.js Full Stack Engineering",
    student: "Vikram Patel",
    upvotes: 9,
    repliesCount: 1,
    status: "Answered",
    timestamp: "1 day ago",
    content: "Getting warning that cookies() is now an asynchronous Promise in Next.js 15. How do I adapt my auth middleware?",
    answer: "In Next.js 15, cookies() is async. Simply `const cookieStore = await cookies();` then invoke `.get('token')`."
  },
  {
    id: "qna-4",
    title: "Kafka Consumer rebalance storm when processing heavy payloads",
    course: "Distributed Microservices & Kubernetes Architecture",
    student: "Pooja Varma",
    upvotes: 18,
    repliesCount: 0,
    status: "Pending",
    timestamp: "1 day ago",
    content: "When batch size is 500 records, heartbeat thread fails and triggers constant group rebalancing. What tuning parameters fix this?",
    answer: null
  }
];
