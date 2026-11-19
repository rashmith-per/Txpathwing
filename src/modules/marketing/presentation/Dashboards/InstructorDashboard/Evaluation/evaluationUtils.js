import {
  generateRecordId,
  normalizeText,
  resolveBatchCourseAndSyllabus
} from "../Assessments/assessmentUtils.js";

export const EVALUATION_STORAGE_KEYS = {
  EVALUATIONS: "instructor_student_evaluations"
};

export const DEFAULT_EVALUATION_DURATION = "60 Mins";
export const DEFAULT_EVALUATION_TOTAL_MARKS = 100;

/**
 * Resolves the canonical course record matching a batch by ID or title.
 */
function findMatchingCourse(batch, courses = []) {
  if (!batch || !Array.isArray(courses)) return null;
  const normBatchCourse = normalizeText(batch.courseName || batch.title);
  return (
    courses.find(
      (c) =>
        (batch.courseId && c.id === batch.courseId) ||
        (normBatchCourse && normalizeText(c.title) === normBatchCourse)
    ) || null
  );
}

/**
 * Checks whether two course names refer to the same course even if one is abbreviated.
 */
function coursesMatchByName(courseNameA, courseNameB) {
  const a = normalizeText(courseNameA);
  const b = normalizeText(courseNameB);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.length >= 8 && b.length >= 8) {
    return a.includes(b) || b.includes(a);
  }
  return false;
}

/**
 * Resolves all students belonging to a batch from direct batch links,
 * assessment assignments, and course enrollments.
 */

export * from "./evaluationBatchResolvers";
export * from "./evaluationAssessmentResolvers";
