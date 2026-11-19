export const initialTrainingPrograms = [
  {
    id: "tp-1",
    title: "Enterprise Java Microservices Track",
    deliveryMode: "Online live",
    duration: "16 Weeks",
    batchesCount: 4,
    enrolledLearners: 180,
    organization: "KITS Warangal",
    status: "Active",
    mentor: "Dr. R. Ramana",
    curriculum: "Spring Boot, Docker, Kafka, AWS ECS deployment and real-time capstone project.",
    schedule: "Tue, Thu, Sat · 06:30 PM - 08:30 PM IST"
  },
  {
    id: "tp-2",
    title: "Corporate Cloud DevOps Accelerator",
    deliveryMode: "Hybrid",
    duration: "12 Weeks",
    batchesCount: 6,
    enrolledLearners: 320,
    organization: "Deloitte USI",
    status: "Active",
    mentor: "Vikram Patel",
    curriculum: "Terraform IaC, Kubernetes clusters, Jenkins & GitLab CI, Prometheus observability.",
    schedule: "Mon & Wed online, Sat onsite labs"
  },
  {
    id: "tp-3",
    title: "Full Stack Web Engineering Cohort",
    deliveryMode: "Online live",
    duration: "20 Weeks",
    batchesCount: 5,
    enrolledLearners: 250,
    organization: "TX Hub Academy",
    status: "Active",
    mentor: "Sunil Nambiar",
    curriculum: "TypeScript, React, Next.js, Node.js, GraphQL, PostgreSQL and system design.",
    schedule: "Mon to Fri · 07:00 PM - 09:00 PM IST"
  },
  {
    id: "tp-4",
    title: "Foundations of Cybersecurity & SOC Operations",
    deliveryMode: "Offline / onsite",
    duration: "8 Weeks",
    batchesCount: 2,
    enrolledLearners: 90,
    organization: "Tanvox Technologies",
    status: "Active",
    mentor: "Arun Varma",
    curriculum: "Network defense, SIEM configuration, vulnerability scanning, and red/blue team exercises.",
    schedule: "Weekends · 10:00 AM - 04:00 PM IST"
  }
];

export const initialCertificates = [
  {
    id: "cert-1",
    recipient: "Sai Teja Reddy",
    email: "saiteja.r@kitsw.pathwing.in",
    course: "Advanced Java Bootcamp",
    type: "Course completion",
    issueDate: "08 Oct 2026",
    certNumber: "PW-CERT-2026-8941",
    status: "Verified",
    grade: "Distinction (94%)",
    verifyingOrg: "KITS Warangal",
    hash: "0x8fa3...c912",
    issuedBy: "Dr. R. Ramana"
  },
  {
    id: "cert-2",
    recipient: "Ananya Iyer",
    email: "ananya.iyer@deloitte-usi.in",
    course: "Cloud Fundamentals & AWS Architecture",
    type: "Course completion",
    issueDate: "12 Oct 2026",
    certNumber: "PW-CERT-2026-9022",
    status: "Verified",
    grade: "First Class (88%)",
    verifyingOrg: "Deloitte USI",
    hash: "0x4be1...aa70",
    issuedBy: "Pooja Malhotra"
  },
  {
    id: "cert-3",
    recipient: "Manoj Kumar",
    email: "manoj.k@valuelabs.com",
    course: "Full-Stack Software Engineering Internship",
    type: "Internship completion",
    issueDate: "14 Oct 2026",
    certNumber: "PW-INT-2026-0312",
    status: "Pending Eligibility",
    grade: "Under Evaluation",
    verifyingOrg: "ValueLabs",
    hash: "Pending",
    issuedBy: "Kiran Nadar"
  },
  {
    id: "cert-4",
    recipient: "Deepika Sen",
    email: "deepika@txhub.org",
    course: "TX Buildathon 2026: AI for India",
    type: "Event participation & Winner",
    issueDate: "27 Sep 2026",
    certNumber: "PW-EVT-2026-1184",
    status: "Verified",
    grade: "1st Place Winner",
    verifyingOrg: "TX Hub Academy",
    hash: "0x12fc...3e99",
    issuedBy: "Evaluation Jury"
  }
];

export const initialBatches = [
  {
    id: "btc-1",
    code: "JAVA-2026-02",
    program: "Advanced Java Bootcamp",
    mentor: "Dr. R. Ramana",
    organization: "KITS Warangal",
    learners: 38,
    capacity: 40,
    startDate: "15 Sep 2026",
    endDate: "15 Dec 2026",
    schedule: "Mon, Wed, Fri · 05:00 PM IST",
    status: "Active",
    completionRate: "92%"
  },
  {
    id: "btc-2",
    code: "PFS-2026-03",
    program: "Full Stack Web Engineering Cohort",
    mentor: "Vikram Patel",
    organization: "TX Hub Academy",
    learners: 45,
    capacity: 50,
    startDate: "01 Oct 2026",
    endDate: "20 Feb 2027",
    schedule: "Tue, Thu, Sat · 07:00 PM IST",
    status: "Active",
    completionRate: "88%"
  },
  {
    id: "btc-3",
    code: "CLOUD-2026-01",
    program: "Corporate Cloud DevOps Accelerator",
    mentor: "Pooja Malhotra",
    organization: "Deloitte USI",
    learners: 50,
    capacity: 50,
    startDate: "20 Aug 2026",
    endDate: "10 Nov 2026",
    schedule: "Daily · 09:30 AM IST",
    status: "Near capacity",
    completionRate: "95%"
  },
  {
    id: "btc-4",
    code: "CYBER-2026-01",
    program: "Foundations of Cybersecurity",
    mentor: "Arun Varma",
    organization: "Tanvox Technologies",
    learners: 22,
    capacity: 30,
    startDate: "05 Nov 2026",
    endDate: "30 Dec 2026",
    schedule: "Weekends · 10:00 AM IST",
    status: "Active",
    completionRate: "Not started"
  }
];
