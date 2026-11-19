import { Award, BookOpen, BriefcaseBusiness, TrendingUp, Users } from "lucide-react";

export const departments = [
  { name: "CSE", completion: 78 }, { name: "IT", completion: 74 },
  { name: "ECE", completion: 69 }, { name: "EEE", completion: 61 },
  { name: "MECH", completion: 52 }, { name: "CIVIL", completion: 47 }
];

export const metrics = [
  { label: "ENROLLED LEARNERS", value: "2,140", note: "186 added this term", page: "Learners", positive: true, icon: Users, tone: "blue" },
  { label: "PROGRAMME COMPLETION", value: "72%", note: "6 pts vs last term", page: "Programmes", positive: true, icon: TrendingUp, tone: "green" },
  { label: "CERTIFIED THIS TERM", value: "614", note: "of 852 eligible", page: "Learning", icon: Award, tone: "amber" },
  { label: "PLACEMENT-READY", value: "418", note: "fit score ≥ 80", page: "Reports", icon: BriefcaseBusiness, tone: "teal" },
  { label: "SEATS REMAINING", value: "360", note: "of 2,500 contracted", page: "Programmes", icon: BookOpen, tone: "coral" }
];
