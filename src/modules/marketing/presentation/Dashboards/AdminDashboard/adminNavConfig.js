import {
  Activity, Award, Bell, BookOpen, Briefcase, Building2,
  Calendar, CheckCircle2, GraduationCap, Layers, LayoutDashboard,
  LockKeyhole, ShieldCheck, Tag, UserRound, Users, Wallet
} from "lucide-react";

export const navConfig = [
  {
    group: "PLATFORM",
    items: [
      { name: "Overview", icon: LayoutDashboard },
      { name: "Instructors", icon: GraduationCap },
      { name: "Organizations", icon: Building2 },
      { name: "Users", icon: Users }
    ]
  },
  {
    group: "LEARNING & PROGRAMS",
    items: [
      { name: "Courses", icon: BookOpen },
      { name: "Internships", icon: Briefcase },
      { name: "Events", icon: Calendar },
      { name: "Training programs", icon: Layers },
      { name: "Certificates", icon: Award },
      { name: "Batches", icon: Users }
    ]
  },
  {
    group: "APPROVALS",
    items: [
      { name: "Moderation", icon: ShieldCheck },
      { name: "Approvals", icon: CheckCircle2 }
    ]
  },
  {
    group: "MONEY & PLANS",
    items: [
      { name: "Payments", icon: Wallet },
      { name: "Subscriptions", icon: Layers },
      { name: "Coupons", icon: Tag }
    ]
  },
  {
    group: "INSIGHTS",
    items: [
      { name: "Reports & analytics", icon: Activity }
    ]
  },
  {
    group: "GOVERNANCE",
    items: [
      { name: "Security & audit", icon: LockKeyhole },
      { name: "Roles & permissions", icon: ShieldCheck },
      { name: "Notifications", icon: Bell },
      { name: "Helpdesk", icon: UserRound },
      { name: "Settings", icon: LockKeyhole }
    ]
  }
];

export const pageDescriptions = {
  "Overview": "A platform-wide governance view of learning operations, revenue, approvals, and system health.",
  "Instructors": "Oversee platform faculty, mentors, teaching credentials, and instructor allocations.",
  "Instructor": "Oversee platform faculty, mentors, teaching credentials, and instructor allocations.",
  "Organizations": "Manage partner institutions, corporate data boundaries, subdomains, and seat licenses.",
  "Tenants": "Manage partner institutions, corporate data boundaries, subdomains, and seat licenses.",
  "Users": "Manage student accounts, mentors, organization admins, and platform operators.",
  "Courses": "Manage course catalogue, syllabus units, publication status, and moderation triggers.",
  "Internships": "Oversee official internships, candidate applications, seat limits, and certificates.",
  "Events": "Manage hackathons, live coding workshops, bootcamps, and attendee rosters.",
  "Training programs": "Administer live, hybrid, and offline enterprise cohort programs.",
  "Certificates": "Verify issued certificates, cryptographic signatures, and student honors.",
  "Batches": "Schedule faculty mentors, active student batches, timetables, and capacity limits.",
  "Moderation": "Review pending course submissions, evaluate SLA windows, and assign reviewers.",
  "Approvals": "Platform governance queue for courses, mentor credentials, and tenant onboarding.",
  "Payments": "Monitor platform collections, 29.3% take rates, instructor payouts, and settlements.",
  "Subscriptions": "Manage Basic, Professional, and Enterprise LMS subscription limits.",
  "Coupons": "Administer percentage and fixed discount coupons and promotional validity.",
  "Reports & analytics": "Explore enrollment analytics, tenant seat consumption, and revenue trends.",
  "Security & audit": "Review immutable security audit logs, access changes, and infrastructure incidents.",
  "Roles & permissions": "Configure granular role-based access controls and module permissions.",
  "Notifications": "Manage automated communication templates and broadcast system notices.",
  "Helpdesk": "Respond to support inquiries from students, mentors, and partner organizations.",
  "Settings": "Configure platform console preferences, video DRM, and security policies."
};
