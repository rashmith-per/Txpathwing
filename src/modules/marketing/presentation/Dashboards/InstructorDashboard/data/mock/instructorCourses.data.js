export const initialInstructorCourses = [
  {
    id: "crs-inst-1",
    code: "JAVA-FS",
    title: "Java Full Stack Development",
    category: "Software Development",
    level: "Intermediate to Advanced",
    enrolledLearners: 542,
    completionRate: 89.2,
    rating: 4.95,
    reviewsCount: 168,
    status: "Published",
    modulesCount: 16,
    totalHours: 72,
    price: 18999,
    revenue: 10297458,
    lastUpdated: "18 Oct 2026",
    thumbnailTone: "blue"
  },
  {
    id: "crs-inst-2",
    code: "AWS-DOP",
    title: "AWS DevOps Engineer Professional",
    category: "Cloud & DevOps",
    level: "Advanced",
    enrolledLearners: 428,
    completionRate: 86.4,
    rating: 4.91,
    reviewsCount: 112,
    status: "Published",
    modulesCount: 14,
    totalHours: 64,
    price: 21999,
    revenue: 9415572,
    lastUpdated: "12 Oct 2026",
    thumbnailTone: "amber"
  },
  {
    id: "crs-inst-3",
    code: "REACT-FS",
    title: "React 19 & Next.js Full Stack Engineering",
    category: "Web Development",
    level: "All Levels",
    enrolledLearners: 348,
    completionRate: 88.0,
    rating: 4.89,
    reviewsCount: 84,
    status: "Published",
    modulesCount: 12,
    totalHours: 56,
    price: 15999,
    revenue: 5567652,
    lastUpdated: "04 Oct 2026",
    thumbnailTone: "emerald"
  },
  {
    id: "crs-inst-4",
    code: "MICRO-ARCH",
    title: "Distributed Microservices & Kubernetes Architecture",
    category: "System Design",
    level: "Advanced",
    enrolledLearners: 110,
    completionRate: 82.5,
    rating: 4.94,
    reviewsCount: 28,
    status: "Published",
    modulesCount: 10,
    totalHours: 48,
    price: 24999,
    revenue: 2749890,
    lastUpdated: "20 Sep 2026",
    thumbnailTone: "purple"
  }
];


export const initialCourseAnalytics = {
  totalEnrollments: 1428,
  activeLearnersCount: 1280,
  completionRate: 87.6,
  avgWatchTimeHours: 4.8,
  assignmentPassRate: 93.4,
  weeklyActivity: [
    { day: "Mon", active: 840, submissions: 42, watchHours: 320 },
    { day: "Tue", active: 920, submissions: 68, watchHours: 390 },
    { day: "Wed", active: 1150, submissions: 95, watchHours: 460 },
    { day: "Thu", active: 1080, submissions: 88, watchHours: 440 },
    { day: "Fri", active: 990, submissions: 54, watchHours: 380 },
    { day: "Sat", active: 1320, submissions: 140, watchHours: 580 },
    { day: "Sun", active: 1410, submissions: 185, watchHours: 640 }
  ]
};

/**
 * Format a Date instance to local YYYY-MM-DD calendar key.
 * @param {Date} date
 * @returns {string}
 */
function toLocalCalendarDay(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Deterministic timestamped enrollment/payment transaction seed builder.
 * Generates transactions relative to `referenceDate` across 7d, 14d, 30d, and 6+ month windows
 * linked to canonical courses and batches for dynamic instructor revenue aggregation.
 *
 * @param {Date|string} [referenceDate]
 * @returns {Array<Object>}
 */