export const initialSecurityEvents = [
  {
    id: "sec-1",
    timestamp: "16 Oct 2026, 09:42:18",
    actor: "Super Admin (sunil.n@pathwing.in)",
    action: "TENANT_SEAT_LIMIT_UPDATED",
    target: "TX Hub Academy (1200 -> 1500)",
    ip: "103.21.144.92",
    severity: "Medium",
    details: "Seat cap amendment initiated following contract upgrade request."
  },
  {
    id: "sec-2",
    timestamp: "16 Oct 2026, 08:15:02",
    actor: "System Watchdog",
    action: "SANDBOX_QUEUE_ALERT",
    target: "Code Execution Worker Pool 3",
    ip: "10.0.4.18",
    severity: "High",
    details: "Queue depth exceeded threshold (34 tasks). Auto-scaler spun up 4 additional runner instances."
  },
  {
    id: "sec-3",
    timestamp: "15 Oct 2026, 18:30:11",
    actor: "Org Admin (p.varma@deloitte.com)",
    action: "BATCH_ENROLLMENT_UPLOAD",
    target: "Deloitte USI (Batch CLOUD-2026-01)",
    ip: "165.225.106.45",
    severity: "Low",
    details: "Bulk CSV enrollment completed for 50 trainee accounts."
  },
  {
    id: "sec-4",
    timestamp: "15 Oct 2026, 14:02:44",
    actor: "Super Admin (sunil.n@pathwing.in)",
    action: "ROLE_PERMISSION_MODIFIED",
    target: "Role: Event Manager",
    ip: "103.21.144.92",
    severity: "Medium",
    details: "Added export attendance permission to Event Manager role matrix."
  },
  {
    id: "sec-5",
    timestamp: "14 Oct 2026, 11:20:00",
    actor: "Security Gateway",
    action: "FAILED_LOGIN_SPIKE_BLOCKED",
    target: "IP 185.220.101.5",
    ip: "185.220.101.5",
    severity: "Critical",
    details: "12 failed password attempts within 60s blocked by rate limiter."
  }
];

export const initialHelpdeskTickets = [
  {
    id: "hd-1",
    ticketId: "HD-1092",
    subject: "Course video DRM playback failure on Firefox",
    requester: "Aarav Sharma",
    role: "Student",
    tenant: "KITS Warangal",
    priority: "High",
    status: "Open",
    created: "15 Oct 2026",
    assignedTo: "Tech Support L2",
    description: "Videos in module 3 of Advanced Java Bootcamp show Widevine DRM decrypt error 403 on Firefox 128 under Linux/Ubuntu."
  },
  {
    id: "hd-2",
    ticketId: "HD-1090",
    subject: "Subdomain SSL certificate renewal assistance",
    requester: "Prof. S. N. Murthy",
    role: "Org Admin",
    tenant: "Anurag University",
    priority: "Medium",
    status: "In Progress",
    created: "14 Oct 2026",
    assignedTo: "DevOps Ops Team",
    description: "Requesting Let's Encrypt automated challenge configuration for campus LMS DNS records."
  },
  {
    id: "hd-3",
    ticketId: "HD-1088",
    subject: "Certificate grade rectification for capstone submission",
    requester: "Sai Teja Reddy",
    role: "Student",
    tenant: "KITS Warangal",
    priority: "Low",
    status: "Resolved",
    created: "12 Oct 2026",
    assignedTo: "Academic Verification",
    description: "Updated capstone project resubmitted and verified with mentor Dr. Ramana; grade revised to 94%."
  },
  {
    id: "hd-4",
    ticketId: "HD-1085",
    subject: "Tenant seat expansion request for upcoming semester",
    requester: "Kavita Reddy",
    role: "Org Admin",
    tenant: "TX Hub Academy",
    priority: "High",
    status: "In Progress",
    created: "10 Oct 2026",
    assignedTo: "Sunil Nambiar",
    description: "Current enrollment is at 1,190/1,200 seats. Requesting increase to 1,500 contracted seats."
  }
];

export const initialRoles = [
  {
    name: "Super Admin",
    description: "Full platform-wide governance, tenant management, and system administration.",
    usersCount: 3,
    permissions: {
      "Platform Tenants": ["View", "Create", "Edit", "Suspend"],
      "User Accounts": ["View", "Create", "Edit", "Delete", "Change Role"],
      "Courses & Moderation": ["View", "Review", "Approve", "Reject", "Publish"],
      "Billing & Revenue": ["View", "Reconcile", "Refund", "Export Reports"],
      "Governance & Security": ["View Audit", "Manage Roles", "System Config"]
    }
  },
  {
    name: "Organization Admin",
    description: "Tenant-scoped administration for users, assigned courses, batches and reports.",
    usersCount: 42,
    permissions: {
      "Platform Tenants": ["View Own Tenant", "Edit Profile"],
      "User Accounts": ["View Tenant Users", "Invite Learners", "Manage Mentors"],
      "Courses & Moderation": ["View Catalog", "Submit Courses", "View Analytics"],
      "Billing & Revenue": ["View Invoices", "Manage Plan"],
      "Governance & Security": ["View Tenant Audit Log"]
    }
  },
  {
    name: "Instructor",
    description: "Assigned course instruction, batch evaluation, and student feedback.",
    usersCount: 184,
    permissions: {
      "Platform Tenants": ["View Tenant Info"],
      "User Accounts": ["View Batch Students"],
      "Courses & Moderation": ["Edit Assigned Course", "Grade Assignments", "Host Classes"],
      "Billing & Revenue": ["View Instructor Payouts"],
      "Governance & Security": ["None"]
    }
  },
  {
    name: "Student",
    description: "Learning access to enrolled courses, batches, events, and certificates.",
    usersCount: 41208,
    permissions: {
      "Platform Tenants": ["View Enrolled Tenant"],
      "User Accounts": ["View Own Profile", "Edit Profile"],
      "Courses & Moderation": ["View Enrolled Courses", "Submit Code", "Take Quizzes"],
      "Billing & Revenue": ["View Own Receipts"],
      "Governance & Security": ["None"]
    }
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    name: "Course Enrollment Confirmation",
    channel: "Email & In-App",
    trigger: "Student enrolls in course",
    deliveryRate: "99.8%",
    status: "Enabled",
    subject: "Welcome to {{course_title}} on Pathwing",
    body: "Hi {{student_name}}, your enrollment in {{course_title}} is confirmed. Click here to open your learning dashboard."
  },
  {
    id: "notif-2",
    name: "Live Class Schedule Alert",
    channel: "SMS & In-App",
    trigger: "30 minutes before live class",
    deliveryRate: "98.4%",
    status: "Enabled",
    subject: "Live Class starting in 30 minutes",
    body: "Reminder: {{class_title}} with {{mentor_name}} starts at {{time}}. Join via Pathwing Live."
  },
  {
    id: "notif-3",
    name: "Moderation SLA Breach Alert",
    channel: "Email & Webhook",
    trigger: "Course in review > 48 hours",
    deliveryRate: "100%",
    status: "Enabled",
    subject: "[URGENT SLA] Course Review Pending Over 48h",
    body: "Attention Platform Admins: Course {{course_name}} has breached SLA and requires immediate reviewer assignment."
  },
  {
    id: "notif-4",
    name: "Certificate Issuance Notice",
    channel: "Email",
    trigger: "Certificate eligibility approved",
    deliveryRate: "99.2%",
    status: "Enabled",
    subject: "Congratulations! Your Verified Certificate is Ready",
    body: "Dear {{recipient_name}}, your completion certificate for {{course_name}} has been cryptographically verified and issued."
  }
];

export const initialPlatformSettings = {
  platformName: "Pathwing Platform Console",
  supportEmail: "ops@pathwing.in",
  supportPhone: "+91 40 6820 9000",
  defaultCurrency: "INR (₹)",
  slaReviewHours: 48,
  seatWarningThreshold: 90,
  twoFactorEnforced: true,
  maintenanceMode: false,
  autoApproveVerifiedMentors: false,
  drmProtectionEnabled: true
};
