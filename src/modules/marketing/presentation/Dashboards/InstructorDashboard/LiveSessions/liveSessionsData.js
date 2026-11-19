export const COURSES = [
  "Java Full Stack Development",
  "Python & Data Science",
  "AWS DevOps Engineer",
  "React 19 & Next.js Full Stack",
  "Distributed Microservices"
];

export const DURATIONS = [30, 45, 60, 90, 120];
export const KEY = "tx_live_sessions_v2";
export const SEED_DEMO = true;
export const DEMO_CONTROLS = true;
export const LIFETIME_ATTENDEES = 620;
export const AVG_RATING = 4.96;
export const NAMES = ["AS", "SR", "VP", "PV", "KJ", "NI", "RM", "AR", "MK", "IG"];

export const SAMPLES = [
  [-25, 90, "Mastering Distributed Transactions & Event-Driven Sagas", COURSES[4], "Saga choreography vs orchestration, Outbox pattern, and failure compensation.", 124, 150],
  [180, 90, "AWS EKS Zero-Downtime Migration Workshop", COURSES[2], "Blue/green node upgrades, CoreDNS tuning, and Karpenter autoscaling.", 156, 200],
  [1560, 60, "Spring Boot 3 Performance Tuning Clinic", COURSES[0], "Profiling slow endpoints, connection pools, and caching that actually helps.", 88, 120],
  [4440, 75, "From Pandas to Polars: Faster Data Pipelines", COURSES[1], "Rewrite a slow ETL job step by step and measure the speed-up.", 64, 100],
  [7200, 120, "Building with React Server Components, Live", COURSES[3], "Build a dashboard with streaming, Suspense and Server Actions.", 143, 200],
  [11520, 45, "Weekly Doubt-Clearing Office Hours", COURSES[0], "Bring questions on assignments, projects or interview prep.", 31, 60],
  [-2880, 75, "React 19 Concurrent Features & Server Actions Deep Dive", COURSES[3], "useActionState, useOptimistic, and Server Functions serialization rules.", 142, 150],
  [-8640, 105, "System Design Mock Interview & Architectural Critique", COURSES[0], "Designing a high-throughput URL shortener and real-time chat with WebSockets.", 198, 200],
  [-14400, 60, "Feature Engineering with scikit-learn", COURSES[1], "Pipelines, encoders and leakage traps, with live debugging.", 97, 120]
];

export const pad = (n) => String(n).padStart(2, "0");
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
export const startOf = (s) => new Date(`${s.date}T${s.time}`);
export const endOf = (s) => new Date(startOf(s).getTime() + s.duration * 60000);
export const sameDay = (a, b) => a.toDateString() === b.toDateString();
export const statusOf = (s, n) => (n >= endOf(s) ? "completed" : n >= startOf(s) ? "live" : "scheduled");
export const clock = (d) => d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }).toUpperCase();

export const whenText = (s, n) => {
  const d = startOf(s);
  return `${sameDay(d, n) ? "Today" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}, ${clock(d)}`;
};

export const labelOf = (s, st, n) =>
  st === "live" ? "Live now" : st === "completed" ? "Completed" : sameDay(startOf(s), n) ? "Starts today" : "Scheduled";

export function rel(ms) {
  const m = Math.max(1, Math.round(ms / 60000));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return m % 60 ? `${h}h ${m % 60}m` : `${h}h`;
  return `${Math.floor(h / 24)} day${h >= 48 ? "s" : ""}`;
}

export function makeSamples(now) {
  const base = Date.now();
  return SAMPLES.map(([m, duration, title, course, desc, registered, capacity], i) => {
    let t = now.getTime() + m * 60000;
    if (i) t = Math.round(t / 1800000) * 1800000;
    const d = new Date(t);
    return { id: base + i, date: ymd(d), time: hm(d), duration, title, course, desc, registered, capacity, link: "" };
  });
}

export const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};

export const save = (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* ignore */ }
};

export { Icon, P } from "./components/LiveSessionIcon.jsx";
