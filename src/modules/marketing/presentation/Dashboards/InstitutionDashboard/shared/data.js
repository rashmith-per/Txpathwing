import {
  Activity, Award, BookOpen, BriefcaseBusiness, CalendarDays, GraduationCap,
  LayoutDashboard, ShieldCheck, TrendingUp, Users
} from "lucide-react";

export const departments = [
  { name: "CSE", completion: 78 }, { name: "IT", completion: 74 },
  { name: "ECE", completion: 69 }, { name: "EEE", completion: 61 },
  { name: "MECH", completion: 52 }, { name: "CIVIL", completion: 47 }
];

export const initialEvents = [
  { day: "10", month: "Sep", title: "Mid-term assessment window opens", detail: "CSE & IT · 640 learners", time: "09:00 – 17:00", place: "KITS Warangal · Examination block", type: "Assessment", owner: "Academic office" },
  { day: "18", month: "Sep", title: "Placement drive — ValueLabs", detail: "Eligibility: fit ≥ 80, no active backlog", time: "10:00 – 16:00", place: "Main auditorium", type: "Placement", owner: "Career services" },
  { day: "26", month: "Sep", title: "Industry guest module — Cloud Security", detail: "Delivered by Tanvox Technologies", time: "14:00 – 16:00", place: "Online · Lecture hall 3", type: "Guest module", owner: "CSE department" },
  { day: "30", month: "Sep", title: "Term compliance report due", detail: "Auto-generated, needs admin sign-off", time: "Due by 17:00", place: "Institution console", type: "Compliance", owner: "Tenant admin", urgent: true }
];

export const learners = [
  { name: "Aarav Reddy", email: "aarav.reddy@kits.edu", department: "CSE", programme: "Full Stack Engineering", progress: 92, status: "On track" },
  { name: "Ananya Sharma", email: "ananya.sharma@kits.edu", department: "IT", programme: "Cloud & DevOps", progress: 86, status: "On track" },
  { name: "Kiran Kumar", email: "kiran.kumar@kits.edu", department: "ECE", programme: "Data Engineering", progress: 58, status: "Needs support" },
  { name: "Priya Nair", email: "priya.nair@kits.edu", department: "CSE", programme: "Full Stack Engineering", progress: 74, status: "On track" },
  { name: "Rahul Varma", email: "rahul.varma@kits.edu", department: "EEE", programme: "Cloud & DevOps", progress: 41, status: "Needs support" }
];

export const courses = [
  { name: "Full Stack Engineering", category: "SOFTWARE DEVELOPMENT", instructor: "Meera Krishnan", learners: 680, completion: 76, state: "Active", tone: "blue" },
  { name: "Cloud & DevOps Foundations", category: "CLOUD COMPUTING", instructor: "Arjun Menon", learners: 520, completion: 71, state: "Active", tone: "green" },
  { name: "Applied Data Engineering", category: "DATA & AI", instructor: "Nisha Rao", learners: 410, completion: 68, state: "Active", tone: "orange" },
  { name: "Cybersecurity Essentials", category: "SECURITY", instructor: "Tanvox Technologies", learners: 320, completion: 63, state: "Review due", tone: "red" }
];

export const programmes = [
  { name: "Industry-Ready Software Engineer", code: "PRG-2026-01", duration: "24 weeks", learners: 820, departments: "CSE, IT", progress: 78, state: "In progress" },
  { name: "Cloud & DevOps Career Track", code: "PRG-2026-02", duration: "20 weeks", learners: 540, departments: "CSE, IT, ECE", progress: 71, state: "In progress" },
  { name: "Data Engineering Pathway", code: "PRG-2026-03", duration: "18 weeks", learners: 410, departments: "CSE, ECE", progress: 68, state: "In progress" },
  { name: "Campus to Career Accelerator", code: "PRG-2026-04", duration: "12 weeks", learners: 370, departments: "All departments", progress: 52, state: "Enrollment open" }
];

export const requirements = [
  { name: "Learner consent and data processing records", category: "Data governance", due: "12 Sep 2026", owner: "Tenant admin", state: "Complete" },
  { name: "Instructor qualification verification", category: "People & safety", due: "15 Sep 2026", owner: "Academic office", state: "In review" },
  { name: "Placement partner due diligence", category: "Industry partners", due: "22 Sep 2026", owner: "Career services", state: "Action needed" },
  { name: "Term outcomes and completion report", category: "Academic outcomes", due: "30 Sep 2026", owner: "Tenant admin", state: "Action needed" },
  { name: "Accessibility and course content audit", category: "Learning quality", due: "04 Oct 2026", owner: "Programme leads", state: "In review" }
];

export const reports = [
  { name: "Term completion and outcomes", period: "2026–27 · Current term", updated: "08 Sep 2026", format: "CSV" },
  { name: "Learner placement readiness", period: "2026–27 · Current term", updated: "07 Sep 2026", format: "CSV" },
  { name: "Department participation summary", period: "2026–27 · Current term", updated: "05 Sep 2026", format: "CSV" },
  { name: "Programme seat utilization", period: "2026–27 · Current term", updated: "01 Sep 2026", format: "CSV" }
];

export const metrics = [
  { label: "ENROLLED LEARNERS", value: "2,140", note: "186 added this term", page: "Learners", positive: true, icon: Users, tone: "blue" },
  { label: "PROGRAMME COMPLETION", value: "72%", note: "6 pts vs last term", page: "Programmes", positive: true, icon: TrendingUp, tone: "green" },
  { label: "CERTIFIED THIS TERM", value: "614", note: "of 852 eligible", page: "Learning", icon: Award, tone: "amber" },
  { label: "PLACEMENT-READY", value: "418", note: "fit score ≥ 80", page: "Reports", icon: BriefcaseBusiness, tone: "teal" },
  { label: "SEATS REMAINING", value: "360", note: "of 2,500 contracted", page: "Programmes", icon: BookOpen, tone: "coral" }
];

export const navigation = [
  { label: "Overview", icon: LayoutDashboard, group: "INSTITUTION" },
  { label: "Learners", icon: Users, count: "2,140" },
  { label: "Learning", icon: GraduationCap, count: "6" },
  { label: "Programmes", icon: BookOpen, count: "4" },
  { label: "Events", icon: CalendarDays, count: "4" },
  { label: "Compliance", icon: ShieldCheck, group: "GOVERNANCE", count: "5" },
  { label: "Reports", icon: Activity }
];
