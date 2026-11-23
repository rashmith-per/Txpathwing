import { Activity, BookOpen, CalendarDays, GraduationCap, LayoutDashboard, ShieldCheck, Users, UserCheck } from "lucide-react";

export const navigation = [
  { label: "Overview", icon: LayoutDashboard, group: "INSTITUTION" },
  { label: "Learners", icon: Users, count: "2,140" },
  { label: "Staff Management", icon: UserCheck, count: "12" },
  { label: "Learning", icon: GraduationCap, count: "6" },
  { label: "Programmes", icon: BookOpen, count: "4" },
  { label: "Events", icon: CalendarDays, count: "4" },
  { label: "Compliance", icon: ShieldCheck, group: "GOVERNANCE", count: "5" },
  { label: "Reports", icon: Activity }
];
