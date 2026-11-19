import { normalizeText } from "./assessmentUtils";

export function resolveBatchCourseAndSyllabus(batch, courses = []) {
  const safeBatch = batch || {};
  const matchedCourse = courses.find(
    (c) =>
      c.id === safeBatch.courseId ||
      (safeBatch.courseName &&
        normalizeText(c.title) === normalizeText(safeBatch.courseName))
  );

  const courseName =
    matchedCourse?.title || safeBatch.courseName || "Unassigned Course";

  const rawCompletion = Number(safeBatch.completion);
  const completionPercentage = Number.isFinite(rawCompletion)
    ? Math.min(100, Math.max(0, Math.round(rawCompletion)))
    : 0;

  const rawTopicsCount =
    matchedCourse?.modulesCount ??
    (Array.isArray(matchedCourse?.modules) ? matchedCourse.modules.length : null);

  const totalTopics =
    typeof rawTopicsCount === "number" && rawTopicsCount > 0
      ? rawTopicsCount
      : null;

  const coveredTopics =
    totalTopics !== null
      ? Math.round((completionPercentage / 100) * totalTopics)
      : null;

  const syllabusLabel =
    totalTopics !== null
      ? `${coveredTopics} / ${totalTopics} Topics`
      : "Not Available";

  return {
    courseName,
    completionPercentage,
    totalTopics,
    coveredTopics,
    syllabusLabel
  };
}

/**
 * Resolves enrolled student records for a batch from the existing learners list.
 *
 * Priority 1: Direct batch linkage via `batchId`, `batchName`, or `cohort` matching
 * the batch name or batch code.
 * Priority 2 (fallback when existing learner records use generic cohort strings
 * without `batchId`): Matches existing learners enrolled in the same course
 * (`courseId` / `courseName`) so real learners remain actionable without
 * fabricating synthetic student records.
 */
export function resolveBatchStudents(batch, learners = []) {
  if (!batch || !Array.isArray(learners) || learners.length === 0) {
    return { students: [], matchSource: "none" };
  }

  const batchId = batch.id;
  const normBatchName = normalizeText(batch.name);
  const normBatchCode = normalizeText(batch.code);

  const mapStudent = (learner) => ({
    ...learner,
    attendanceStatus: learner.attendanceStatus || learner.attendance || "Not Recorded"
  });

  const directMatches = learners.filter((lrn) => {
    if (batchId && lrn.batchId === batchId) return true;
    const lrnBatchName = normalizeText(lrn.batchName);
    const lrnCohort = normalizeText(lrn.cohort);
    if (normBatchName && (lrnBatchName === normBatchName || lrnCohort === normBatchName)) {
      return true;
    }
    if (normBatchCode && lrnCohort === normBatchCode) {
      return true;
    }
    return false;
  });

  if (directMatches.length > 0) {
    return {
      students: directMatches.map(mapStudent),
      matchSource: "direct_batch"
    };
  }

  const normCourseName = normalizeText(batch.courseName);
  const courseFallbackMatches = learners.filter((lrn) => {
    if (batch.courseId && lrn.courseId && lrn.courseId === batch.courseId) {
      return true;
    }
    if (normCourseName && normalizeText(lrn.courseName) === normCourseName) {
      return true;
    }
    return false;
  });

  if (courseFallbackMatches.length > 0) {
    return {
      students: courseFallbackMatches.map(mapStudent),
      matchSource: "course_fallback"
    };
  }

  return { students: [], matchSource: "none" };
}

/**
 * Validates input and creates a new batch assessment or practice assessment record
 * while preventing duplicate titles of the same kind within the same batch.
 */

