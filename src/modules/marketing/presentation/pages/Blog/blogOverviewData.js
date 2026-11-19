import {
  BookOpen,
  Radio,
  Video,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  BadgeCheck,
  Laptop,
  GraduationCap,
  Building2,
  Trophy,
  Landmark,
  UserCheck,
} from "lucide-react";

export const AUDIENCE_CARDS = [
  {
    icon: Users,
    title: "For Students",
    desc: "Learn, practice, get certified and build your career.",
  },
  {
    icon: Landmark,
    title: "For Colleges & Institutions",
    desc: "Access a complete LMS for your students.",
  },
  {
    icon: UserCheck,
    title: "For Mentors & Trainers",
    desc: "Share knowledge and make an impact.",
  },
  {
    icon: BriefcaseBusiness,
    title: "For Industry Partners",
    desc: "Collaborate, hire talent and grow together.",
  },
];

export const OFFERING_CARDS = [
  {
    id: "courses",
    icon: BookOpen,
    title: "Courses",
    desc: "Industry-relevant online courses",
    details:
      "Structured self-paced modules across Full-Stack, AI, Cloud, and DevOps with hands-on practice quizzes and coding exercises.",
    theme: "theme-blue",
  },
  {
    id: "live-training",
    icon: Radio,
    title: "Live Training",
    desc: "Interactive live classes with experts",
    details:
      "Direct instructor-led training with doubt-clearing sessions, live coding walkthroughs, and peer collaboration.",
    theme: "theme-green",
  },
  {
    id: "recorded-courses",
    icon: Video,
    title: "Recorded Courses",
    desc: "Learn at your own pace",
    details:
      "High-definition video lectures available 24/7 on demand with downloadable source codes and reference notes.",
    theme: "theme-red",
  },
  {
    id: "training-programs",
    icon: Users,
    title: "Training Programs",
    desc: "Online, Offline, Hybrid modes",
    details:
      "Comprehensive multi-month bootcamps with flexible scheduling, continuous mentor reviews, and career assistance.",
    theme: "theme-purple",
  },
  {
    id: "internships",
    icon: BriefcaseBusiness,
    title: "Internships",
    desc: "Real-world work experience",
    details:
      "Work on production sprint cycles, submit pull requests, and earn verified internship credentials for your resume.",
    theme: "theme-orange",
  },
  {
    id: "events",
    icon: CalendarDays,
    title: "Events",
    desc: "Hackathons, webinars & more",
    details:
      "National-level hackathons, tech tech-talks from industry leaders, and weekend coding sprint competitions.",
    theme: "theme-cyan",
  },
  {
    id: "certifications",
    icon: BadgeCheck,
    title: "Certifications",
    desc: "Industry-recognized certificates",
    details:
      "Cryptographically verified credentials with tamper-proof QR codes recognized by corporate hiring partners.",
    theme: "theme-yellow",
  },
  {
    id: "virtual-labs",
    icon: Laptop,
    title: "Virtual Labs",
    desc: "Hands-on practice environments",
    details:
      "Instant browser-based coding sandboxes for Python, Java, Linux, and Cloud—zero local software installation needed.",
    theme: "theme-indigo",
  },
];

export const STATS_ITEMS = [
  { icon: GraduationCap, value: "500+", label: "Courses" },
  { icon: Users, value: "50K+", label: "Students" },
  { icon: Building2, value: "100+", label: "Colleges & Institutions" },
  { icon: BadgeCheck, value: "200+", label: "Industry Experts" },
  { icon: BriefcaseBusiness, value: "1K+", label: "Internship Opportunities" },
  { icon: Trophy, value: "50+", label: "Events Conducted" },
];
