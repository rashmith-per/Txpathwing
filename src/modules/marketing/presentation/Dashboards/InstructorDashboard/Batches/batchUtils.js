// Helper function to resolve category from course name
export function getCategoryForCourse(courseTitle = "") {
  const map = {
    "Java Full Stack Development": "Software Development",
    "AWS DevOps Engineer Professional": "Cloud & DevOps",
    "AWS DevOps Spring Intensive 2027": "Cloud & DevOps",
    "React 19 & Next.js Full Stack Engineering": "Web Development",
    "Distributed Microservices & Kubernetes Architecture": "System Architecture"
  };

  if (map[courseTitle]) return map[courseTitle];

  const lower = (courseTitle || "").toLowerCase();
  if (lower.includes("aws") || lower.includes("cloud") || lower.includes("devops") || lower.includes("azure")) {
    return "Cloud & DevOps";
  }
  if (lower.includes("react") || lower.includes("next") || lower.includes("web") || lower.includes("frontend")) {
    return "Web Development";
  }
  if (lower.includes("java") || lower.includes("python") || lower.includes("spring") || lower.includes("backend") || lower.includes("software")) {
    return "Software Development";
  }
  if (lower.includes("microservice") || lower.includes("kubernetes") || lower.includes("architecture") || lower.includes("system")) {
    return "System Architecture";
  }
  if (lower.includes("ai") || lower.includes("data") || lower.includes("ml") || lower.includes("machine")) {
    return "AI & Data Science";
  }
  return "Software Development";
}

// Category styling configuration
export const CATEGORY_META = {
  "Cloud & DevOps": { icon: "☁️", tone: "blue", accentClass: "cat-cloud" },
  "Software Development": { icon: "☕", tone: "green", accentClass: "cat-software" },
  "Web Development": { icon: "⚛️", tone: "purple", accentClass: "cat-web" },
  "System Architecture": { icon: "⚡", tone: "amber", accentClass: "cat-system" },
  "AI & Data Science": { icon: "🤖", tone: "blue", accentClass: "cat-cloud" },
  "General": { icon: "📁", tone: "blue", accentClass: "cat-cloud" }
};

// Helper to parse schedule string into days and time cleanly
export function parseSchedule(scheduleStr = "") {
  if (!scheduleStr) {
    return { days: "Mon, Wed, Fri", time: "6:00 PM – 8:00 PM" };
  }
  if (scheduleStr.includes("·")) {
    const [d, ...rest] = scheduleStr.split("·");
    return { days: d.trim(), time: rest.join("·").trim() };
  }
  if (scheduleStr.includes(" - ") || scheduleStr.includes(" – ")) {
    const delimiter = scheduleStr.includes(" – ") ? " – " : " - ";
    const parts = scheduleStr.split(delimiter);
    if (parts.length >= 2 && !/^\s*\d/.test(parts[0])) {
      return { days: parts[0].trim(), time: parts.slice(1).join(delimiter).trim() };
    }
  }
  return { days: scheduleStr, time: "6:00 PM – 8:00 PM" };
}
