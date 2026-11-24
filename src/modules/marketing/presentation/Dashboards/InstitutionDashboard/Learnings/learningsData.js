/**
 * Static mock data and configuration constants for Learning Management.
 * Zero backend, zero storage dependencies.
 */

export const BATCHES = [
  "2023–27",
  "2024–28",
  "2025–29",
  "2026–27"
];

export const DEPARTMENTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];

export const PROGRAM_CATEGORIES = [
  "SOFTWARE DEVELOPMENT",
  "CLOUD COMPUTING",
  "DATA & AI",
  "SECURITY",
  "ELECTRONICS",
  "CIVIL ENGINEERING"
];

export const PROGRAM_STATUSES = ["Active", "Draft", "Review due", "Archived"];

export const TOPIC_TYPES = ["Video", "Reading", "Quiz", "Lab"];

export const courses = [
  { name: "Full Stack Engineering", category: "SOFTWARE DEVELOPMENT", instructor: "Meera Krishnan", learners: 680, completion: 76, state: "Active", tone: "blue" },
  { name: "Cloud & DevOps Foundations", category: "CLOUD COMPUTING", instructor: "Arjun Menon", learners: 520, completion: 71, state: "Active", tone: "green" },
  { name: "Applied Data Engineering", category: "DATA & AI", instructor: "Nisha Rao", learners: 410, completion: 68, state: "Active", tone: "orange" },
  { name: "Cybersecurity Essentials", category: "SECURITY", instructor: "Tanvox Technologies", learners: 320, completion: 63, state: "Review due", tone: "red" }
];

export const SAMPLE_LEARNERS = [
  { id: "lrn_001", learnerId: "LRN-2026-1001", fullName: "Aarav Reddy", name: "Aarav Reddy", email: "aarav.reddy@kits.edu", department: "CSE", batch: "2023–27" },
  { id: "lrn_002", learnerId: "LRN-2026-1002", fullName: "Ananya Sharma", name: "Ananya Sharma", email: "ananya.sharma@kits.edu", department: "IT", batch: "2023–27" },
  { id: "lrn_003", learnerId: "LRN-2026-1003", fullName: "Kiran Kumar", name: "Kiran Kumar", email: "kiran.kumar@kits.edu", department: "ECE", batch: "2024–28" },
  { id: "lrn_004", learnerId: "LRN-2026-1004", fullName: "Priya Nair", name: "Priya Nair", email: "priya.nair@kits.edu", department: "CSE", batch: "2023–27" },
  { id: "lrn_005", learnerId: "LRN-2026-1005", fullName: "Rahul Varma", name: "Rahul Varma", email: "rahul.varma@kits.edu", department: "EEE", batch: "2024–28" },
  { id: "lrn_006", learnerId: "LRN-2026-1006", fullName: "Sneha Patel", name: "Sneha Patel", email: "sneha.patel@kits.edu", department: "CIVIL", batch: "2025–29" },
  { id: "lrn_007", learnerId: "LRN-2026-1007", fullName: "Vikram Rathore", name: "Vikram Rathore", email: "vikram.rathore@kits.edu", department: "MECH", batch: "2023–27" }
];

export const INITIAL_PROGRAMS = [
  {
    id: "prog_fse_01",
    code: "FSE-2026",
    name: "Full Stack Engineering",
    title: "Full Stack Engineering",
    category: "SOFTWARE DEVELOPMENT",
    department: "CSE",
    duration: "16 weeks",
    instructor: "Meera Krishnan",
    state: "Active",
    status: "Active",
    tone: "blue",
    learners: 680,
    completion: 76,
    progress: 76,
    description: "Industry-aligned full stack software engineering with React, Node.js, and cloud deployments.",
    batches: ["2023–27", "2024–28", "2026–27"],
    modules: [
      {
        id: "mod_fse_1",
        title: "Frontend Architecture & Modern React",
        description: "Components, hooks, state management, and enterprise dashboard architecture.",
        order: 1,
        topics: [
          { id: "top_fse_1_1", title: "React Core & Component Lifecycles", type: "Video", durationMinutes: 45, order: 1, completed: true },
          { id: "top_fse_1_2", title: "Custom Hooks & State Primitives", type: "Reading", durationMinutes: 30, order: 2, completed: true },
          { id: "top_fse_1_3", title: "Building Responsive Data Tables", type: "Lab", durationMinutes: 60, order: 3, completed: true }
        ]
      },
      {
        id: "mod_fse_2",
        title: "Backend Microservices & REST APIs",
        description: "Node.js runtime, API routing, authentication, and database schemas.",
        order: 2,
        topics: [
          { id: "top_fse_2_1", title: "RESTful Principles & Route Handling", type: "Video", durationMinutes: 40, order: 1, completed: true },
          { id: "top_fse_2_2", title: "JWT Authentication & RBAC Middleware", type: "Lab", durationMinutes: 55, order: 2, completed: true },
          { id: "top_fse_2_3", title: "Database Normalization & Indexing", type: "Reading", durationMinutes: 35, order: 3, completed: true }
        ]
      },
      {
        id: "mod_fse_3",
        title: "Full Stack Integration & Testing",
        description: "End-to-end integration, automated testing with Node runner, and CI/CD.",
        order: 3,
        topics: [
          { id: "top_fse_3_1", title: "Unit Testing with Node Test Runner", type: "Lab", durationMinutes: 50, order: 1, completed: true },
          { id: "top_fse_3_2", title: "API Integration & Error Handling", type: "Video", durationMinutes: 45, order: 2, completed: false }
        ]
      }
    ]
  },
  {
    id: "prog_cdo_02",
    code: "CDO-2026",
    name: "Cloud & DevOps Foundations",
    title: "Cloud & DevOps Foundations",
    category: "CLOUD COMPUTING",
    department: "IT",
    duration: "14 weeks",
    instructor: "Arjun Menon",
    state: "Active",
    status: "Active",
    tone: "green",
    learners: 520,
    completion: 71,
    progress: 71,
    description: "Cloud infrastructure, containerization, Kubernetes orchestration, and continuous deployment.",
    batches: ["2023–27", "2024–28"],
    modules: [
      {
        id: "mod_cdo_1",
        title: "Containerization with Docker",
        description: "Docker images, multi-stage builds, and container networking.",
        order: 1,
        topics: [
          { id: "top_cdo_1_1", title: "Docker Architecture & Core Commands", type: "Video", durationMinutes: 40, order: 1, completed: true },
          { id: "top_cdo_1_2", title: "Multi-stage Dockerfile Optimization", type: "Lab", durationMinutes: 60, order: 2, completed: true }
        ]
      },
      {
        id: "mod_cdo_2",
        title: "Kubernetes Cluster Management",
        description: "Pods, Deployments, Services, and Ingress routing.",
        order: 2,
        topics: [
          { id: "top_cdo_2_1", title: "Kubernetes Architecture & Manifests", type: "Video", durationMinutes: 50, order: 1, completed: true },
          { id: "top_cdo_2_2", title: "Deploying Resilient Microservices", type: "Lab", durationMinutes: 70, order: 2, completed: true },
          { id: "top_cdo_2_3", title: "ConfigMaps & Secrets Best Practices", type: "Reading", durationMinutes: 25, order: 3, completed: false }
        ]
      }
    ]
  },
  {
    id: "prog_ade_03",
    code: "ADE-2026",
    name: "Applied Data Engineering",
    title: "Applied Data Engineering",
    category: "DATA & AI",
    department: "ECE",
    duration: "12 weeks",
    instructor: "Nisha Rao",
    state: "Active",
    status: "Active",
    tone: "orange",
    learners: 410,
    completion: 68,
    progress: 68,
    description: "Scalable data ingestion, ETL pipelines, Apache Spark, and cloud data warehouses.",
    batches: ["2024–28"],
    modules: [
      {
        id: "mod_ade_1",
        title: "Data Pipelines & ETL",
        description: "Extract, transform, and load paradigms with Python.",
        order: 1,
        topics: [
          { id: "top_ade_1_1", title: "Batch vs Stream Processing", type: "Video", durationMinutes: 40, order: 1, completed: true },
          { id: "top_ade_1_2", title: "Building Resilient Pipelines", type: "Lab", durationMinutes: 60, order: 2, completed: true }
        ]
      },
      {
        id: "mod_ade_2",
        title: "Distributed Data with Spark",
        description: "Apache Spark DataFrames, transformations, and caching.",
        order: 2,
        topics: [
          { id: "top_ade_2_1", title: "Spark Cluster Architecture", type: "Video", durationMinutes: 45, order: 1, completed: false },
          { id: "top_ade_2_2", title: "DataFrame Optimizations", type: "Lab", durationMinutes: 65, order: 2, completed: false }
        ]
      }
    ]
  },
  {
    id: "prog_sec_04",
    code: "SEC-2026",
    name: "Cybersecurity Essentials",
    title: "Cybersecurity Essentials",
    category: "SECURITY",
    department: "IT",
    duration: "10 weeks",
    instructor: "Tanvox Technologies",
    state: "Review due",
    status: "Review due",
    tone: "red",
    learners: 320,
    completion: 63,
    progress: 63,
    description: "Network security, vulnerability scanning, cryptosystems, and threat analysis.",
    batches: ["2024–28"],
    modules: [
      {
        id: "mod_sec_1",
        title: "Network Security Fundamentals",
        description: "Protocols, firewalls, and traffic analysis.",
        order: 1,
        topics: [
          { id: "top_sec_1_1", title: "TCP/IP Security Pitfalls", type: "Video", durationMinutes: 35, order: 1, completed: true },
          { id: "top_sec_1_2", title: "Wireshark Packet Analysis", type: "Lab", durationMinutes: 50, order: 2, completed: false }
        ]
      }
    ]
  },
  {
    id: "prog_iot_05",
    code: "IOT-2026",
    name: "Embedded IoT Systems",
    title: "Embedded IoT Systems",
    category: "ELECTRONICS",
    department: "ECE",
    duration: "12 weeks",
    instructor: "Dr. K. Srinivas",
    state: "Active",
    status: "Active",
    tone: "purple",
    learners: 280,
    completion: 55,
    progress: 55,
    description: "Embedded C/C++, microcontroller interfaces, MQTT communication, and edge telemetry.",
    batches: ["2023–27", "2025–29"],
    modules: [
      {
        id: "mod_iot_1",
        title: "Microcontroller Peripherals",
        description: "GPIO, ADC, UART, and I2C protocols.",
        order: 1,
        topics: [
          { id: "top_iot_1_1", title: "ARM Cortex Architecture", type: "Video", durationMinutes: 45, order: 1, completed: true },
          { id: "top_iot_1_2", title: "Sensor Interfacing & ADC Calibration", type: "Lab", durationMinutes: 60, order: 2, completed: false }
        ]
      }
    ]
  }
];

export const INITIAL_ENROLLMENTS = [
  {
    id: "enr_001",
    learnerId: "LRN-2026-1001",
    learnerName: "Aarav Reddy",
    learnerEmail: "aarav.reddy@kits.edu",
    department: "CSE",
    programId: "prog_fse_01",
    programTitle: "Full Stack Engineering",
    batch: "2023–27",
    enrollmentDate: "2023-08-10",
    completedTopicIds: [
      "top_fse_1_1",
      "top_fse_1_2",
      "top_fse_1_3",
      "top_fse_2_1",
      "top_fse_2_2",
      "top_fse_2_3",
      "top_fse_3_1"
    ],
    status: "In Progress"
  },
  {
    id: "enr_002",
    learnerId: "LRN-2026-1002",
    learnerName: "Ananya Sharma",
    learnerEmail: "ananya.sharma@kits.edu",
    department: "IT",
    programId: "prog_cdo_02",
    programTitle: "Cloud & DevOps Foundations",
    batch: "2023–27",
    enrollmentDate: "2023-08-10",
    completedTopicIds: [
      "top_cdo_1_1",
      "top_cdo_1_2",
      "top_cdo_2_1",
      "top_cdo_2_2"
    ],
    status: "In Progress"
  },
  {
    id: "enr_003",
    learnerId: "LRN-2026-1003",
    learnerName: "Kiran Kumar",
    learnerEmail: "kiran.kumar@kits.edu",
    department: "ECE",
    programId: "prog_ade_03",
    programTitle: "Applied Data Engineering",
    batch: "2024–28",
    enrollmentDate: "2024-08-16",
    completedTopicIds: [
      "top_ade_1_1",
      "top_ade_1_2"
    ],
    status: "In Progress"
  },
  {
    id: "enr_004",
    learnerId: "LRN-2026-1004",
    learnerName: "Priya Nair",
    learnerEmail: "priya.nair@kits.edu",
    department: "CSE",
    programId: "prog_fse_01",
    programTitle: "Full Stack Engineering",
    batch: "2023–27",
    enrollmentDate: "2023-08-10",
    completedTopicIds: [
      "top_fse_1_1",
      "top_fse_1_2",
      "top_fse_1_3",
      "top_fse_2_1",
      "top_fse_2_2",
      "top_fse_2_3",
      "top_fse_3_1",
      "top_fse_3_2"
    ],
    status: "Completed"
  },
  {
    id: "enr_005",
    learnerId: "LRN-2026-1007",
    learnerName: "Vikram Rathore",
    learnerEmail: "vikram.rathore@kits.edu",
    department: "MECH",
    programId: "prog_iot_05",
    programTitle: "Embedded IoT Systems",
    batch: "2023–27",
    enrollmentDate: "2023-08-10",
    completedTopicIds: [
      "top_iot_1_1",
      "top_iot_1_2"
    ],
    status: "Completed"
  }
];

export const INITIAL_LEARNING_STATS = {
  totalPrograms: 5,
  activePrograms: 4,
  totalEnrolledLearners: 1930,
  completedPrograms: 2,
  inProgressPrograms: 3
};
