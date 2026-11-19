import { initialInstructorCourses } from "../../data/mockData.js";
import { suggestCourseCode } from "../validation/courseValidation.js";

export const COURSES_STORAGE_KEY = "tx_instructor_courses_v1";

export function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

export function formatShortDate(date = new Date()) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function verifyInstructorAuthorization(instructorIdentity) {
  if (typeof localStorage !== "undefined") {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = (localStorage.getItem("userRole") || "").trim().toLowerCase();
    if (isLoggedIn === "true" && userRole && userRole !== "instructor") {
      throw new Error(
        "Forbidden: Instructor authorization is required to manage courses."
      );
    }
  }

  const instructorId =
    typeof instructorIdentity === "string"
      ? instructorIdentity.trim()
      : instructorIdentity?.id ||
        (typeof localStorage !== "undefined" ? localStorage.getItem("instructorId") : null) ||
        "inst-ramana-1";

  if (!instructorId) {
    throw new Error("Unauthorized: Valid instructor identity is required.");
  }

  return instructorId;
}

export function normalizeCourseRecord(course, defaultInstructorId = "inst-ramana-1") {
  const modulesCount = Number(course?.modulesCount) || 4;
  return {
    ...course,
    id: course.id || `crs-inst-${Date.now()}`,
    instructorId: course.instructorId || defaultInstructorId,
    code: String(course.code || suggestCourseCode(course.title)).toUpperCase(),
    title: course.title || "Untitled Course",
    category: course.category || "Software Development",
    level: course.level || "Intermediate",
    description:
      course.description ||
      `Structured instructor-led curriculum covering ${course.title || "core topics"}.`,
    targetAudience: course.targetAudience || "Software Engineers & Technical Learners",
    generationMode: course.generationMode || (String(course.id || "").startsWith("crs-ai-") ? "ai" : "manual"),
    status: course.status || "Draft",
    enrolledLearners: Number(course.enrolledLearners) || 0,
    completionRate: Number(course.completionRate) || 0,
    rating: Number(course.rating) || 4.9,
    reviewsCount: Number(course.reviewsCount) || 0,
    modulesCount,
    topicsCount: Number(course.topicsCount) || modulesCount * 3,
    totalHours: Number(course.totalHours) || 40,
    price: Number(course.price ?? 14999),
    revenue: Number(course.revenue) || 0,
    lastUpdated: course.lastUpdated || formatShortDate()
  };
}

let memoryStore = null;

export function loadCoursesStore(instructorId = "inst-ramana-1") {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(COURSES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((c) => normalizeCourseRecord(c, instructorId));
          memoryStore = normalized;
          return normalized;
        }
      }
    }
  } catch (err) {
    console.warn("[CourseService] Storage read warning:", err);
  }

  if (Array.isArray(memoryStore)) {
    return cloneData(memoryStore);
  }

  const seeded = initialInstructorCourses.map((c) =>
    normalizeCourseRecord(c, instructorId)
  );
  saveCoursesStore(seeded);
  return cloneData(seeded);
}

export function saveCoursesStore(courses) {
  const clean = cloneData(courses || []);
  memoryStore = clean;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(clean));
    }
  } catch (err) {
    console.warn("[CourseService] Storage write warning:", err);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("tx_instructor_courses_updated", {
        detail: { courses: clean }
      })
    );
  }
}

export function resetCoursesStore() {
  memoryStore = null;
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(COURSES_STORAGE_KEY);
  }
}
