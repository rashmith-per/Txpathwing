import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const BATCHES = [
  {
    id: "java", name: "Java Full Stack Development", tag: "Java", cohort: "Batch 2026-A",
    start: "12 Jan 2026", lessons: 48,
    learners: [
      { id: 1, name: "Vikram Patel", email: "vpatel@txhub.org", progress: 65, quiz: 84, assign: "7/10", last: "Yesterday" },
      { id: 2, name: "Karan Johar", email: "karan.j@anurag.edu.in", progress: 52, quiz: 78, assign: "5/10", last: "3 days ago" },
      { id: 3, name: "Neha Iyer", email: "neha.iyer@kitsw.pathwing.in", progress: 100, quiz: 96, assign: "10/10", last: "1 hour ago" },
      { id: 4, name: "Rohit Menon", email: "rohit.m@student.valuelabs.com", progress: 71, quiz: 88, assign: "8/10", last: "5 hours ago" },
    ],
  },
  {
    id: "python", name: "Python & Data Science", tag: "Py", cohort: "Batch 2026-B",
    start: "03 Feb 2026", lessons: 42,
    learners: [
      { id: 5, name: "Ananya Rao", email: "ananya.rao@gmail.com", progress: 82, quiz: 91, assign: "9/10", last: "20 mins ago" },
      { id: 6, name: "Siddharth Nair", email: "sid.nair@student.iiit.ac.in", progress: 45, quiz: 72, assign: "4/10", last: "4 days ago" },
      { id: 7, name: "Meera Krishnan", email: "meera.k@deloitte.com", progress: 93, quiz: 97, assign: "10/10", last: "2 hours ago" },
    ],
  },
  {
    id: "aws", name: "AWS DevOps Engineer", tag: "AWS", cohort: "Batch 2026-B",
    start: "20 Feb 2026", lessons: 36,
    learners: [
      { id: 8, name: "Sneha Reddy", email: "sneha.reddy@student.valuelabs.com", progress: 88, quiz: 95, assign: "9/10", last: "45 mins ago" },
      { id: 9, name: "Arjun Das", email: "arjun.das@infosys.com", progress: 60, quiz: 81, assign: "6/10", last: "Yesterday" },
    ],
  },
  {
    id: "react", name: "React 19 & Next.js Full Stack", tag: "Rx", cohort: "Batch 2026-A",
    start: "05 Mar 2026", lessons: 40,
    learners: [
      { id: 10, name: "Aarav Sharma", email: "aarav.sharma@kitsw.pathwing.in", progress: 74, quiz: 92, assign: "8/10", last: "2 hours ago" },
      { id: 11, name: "Pooja Varma", email: "p.varma@deloitte.com", progress: 91, quiz: 98, assign: "10/10", last: "30 mins ago" },
      { id: 12, name: "Ishaan Gupta", email: "ishaan.g@student.jntuh.ac.in", progress: 38, quiz: 69, assign: "3/10", last: "6 days ago" },
    ],
  },
];

export const statusOf = (l) => (l.progress >= 100 ? "completed" : l.quiz < 80 || l.progress < 55 ? "support" : "active");
export const STATUS_LABEL = { active: "Active", support: "Needs support", completed: "Completed" };
export const avg = (arr, k) => Math.round(arr.reduce((s, x) => s + x[k], 0) / (arr.length || 1));
export const initials = (n) => (n || "").split(" ").map((p) => p[0]).join("").slice(0, 2);

export const TEMPLATES = {
  "Progress check-in": (n, c) => `Hi ${n.split(" ")[0]},\n\nI was reviewing the ${c} batch and wanted to check in on your progress. How are the lessons going? Let me know if anything is unclear and we can set up a quick call.\n\nBest regards,\nDr. R. Ramana`,
  "Needs support": (n, c) => `Hi ${n.split(" ")[0]},\n\nI noticed you've been falling a little behind in ${c}. That's completely okay — let's fix it together. Reply with a time that suits you this week and I'll walk you through the topics you're stuck on.\n\nBest regards,\nDr. R. Ramana`,
  "Well done": (n, c) => `Hi ${n.split(" ")[0]},\n\nGreat work in ${c}! Your quiz scores and consistency are really standing out. Keep going — you're setting a strong example for the batch.\n\nBest regards,\nDr. R. Ramana`,
};

export const P = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  back: "M15 5l-7 7 7 7",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 19c0-3 3-5 6-5s6 2 6 5M16 5.5a3 3 0 010 5.5M18 14c2 .6 3 2.2 3 5",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  x: "M6 6l12 12M18 6L6 18",
  send: "M4 12l16-8-6 16-2-7z",
  check: "M5 12.5l4.5 4.5L19 7",
  arrow: "M9 5l7 7-7 7",
  quiz: "M9 12l2 2 4-4M12 21a9 9 0 100-18 9 9 0 000 18z",
  file: "M7 3h7l4 4v14H7zM14 3v4h4",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  msg: "M4 5h16v11H9l-5 4z",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 19V5",
  alert: "M12 8v5M12 16.5v.5M10.3 4l-8 14a2 2 0 001.7 3h16a2 2 0 001.7-3l-8-14a2 2 0 00-3.4 0z",
};

export const Icon = ({ n, s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={P[n]} />
  </svg>
);

export function useMounted(delay = 80) {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), delay); return () => clearTimeout(t); }, [delay]);
  return m;
}

export function Ring({ value, size = 76 }) {
  const on = useMounted(200);
  const h = size / 2, r = (size - 10) / 2, c = 2 * Math.PI * r;
  return (
    <svg className="lx-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${value}% complete`}>
      <defs>
        <linearGradient id="lxg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#60a5fa" /><stop offset="1" stopColor="#2563eb" /></linearGradient>
      </defs>
      <g transform={`rotate(-90 ${h} ${h})`}>
        <circle cx={h} cy={h} r={r} fill="none" stroke="#e6eefc" strokeWidth="7" />
        <circle cx={h} cy={h} r={r} fill="none" stroke="url(#lxg)" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={on ? c * (1 - value / 100) : c}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)" }} />
      </g>
      <text x={h} y={h} textAnchor="middle" dominantBaseline="central" fontSize={size * 0.22} fontWeight="800" fill="#0f1d3a">{value}%</text>
    </svg>
  );
}

export function Portal({ children }) {
  return createPortal(<div className="lx lx-portal">{children}</div>, document.body);
}

export function useLockScroll() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
}

export function Bar({ value }) {
  const on = useMounted(150);
  return <div className="lx-bar"><i style={{ width: on ? `${value}%` : 0 }} /></div>;
}

export const Pill = ({ s }) => <span className={`lx-pill ${s}`}>{STATUS_LABEL[s]}</span>;
