import {
  EVALUATION_STORAGE_KEYS,
  DEFAULT_EVALUATION_DURATION,
  DEFAULT_EVALUATION_TOTAL_MARKS
} from "./evaluationUtils";

export function resolveEvaluationStudents(
  batch,
  learners = [],
  courses = [],
  assignments = []
) {
  if (!batch) {
    return { students: [], matchSource: "none" };
  }

  const batchId = batch.id;
  const normBatchName = normalizeText(batch.name);
  const normBatchCode = normalizeText(batch.code);
  const matchedCourse = findMatchingCourse(batch, courses);
  const safeLearners = Array.isArray(learners) ? learners : [];
  const learnerById = new Map(safeLearners.map((lrn) => [lrn.id, lrn]));

  // Include students explicitly assigned to assessments in this batch
  const assignedMap = new Map();
  if (Array.isArray(assignments)) {
    for (const record of assignments) {
      if (record?.batchId !== batchId || !record.studentId) continue;
      if (!assignedMap.has(record.studentId)) {
        const knownLearner = learnerById.get(record.studentId);
        assignedMap.set(
          record.studentId,
          knownLearner || {
            id: record.studentId,
            name: record.studentName || "Student",
            courseId: batch.courseId || matchedCourse?.id || "",
            courseName: batch.courseName || matchedCourse?.title || "Unassigned Course"
          }
        );
      }
    }
  }

  const directMatches = safeLearners.filter((lrn) => {
    if (batchId && lrn.batchId === batchId) return true;
    const lrnBatchName = normalizeText(lrn.batchName);
    const lrnCohort = normalizeText(lrn.cohort);
    if (
      normBatchName &&
      (lrnBatchName === normBatchName || lrnCohort === normBatchName)
    ) {
      return true;
    }
    if (normBatchCode && lrnCohort === normBatchCode) {
      return true;
    }
    return false;
  });

  const mergeWithAssigned = (baseList) => {
    const merged = new Map();
    for (const student of baseList) {
      if (student?.id) merged.set(student.id, student);
    }
    for (const [studentId, student] of assignedMap.entries()) {
      if (!merged.has(studentId)) {
        merged.set(studentId, student);
      }
    }
    return Array.from(merged.values());
  };

  if (directMatches.length > 0) {
    return {
      students: mergeWithAssigned(directMatches),
      matchSource: "direct_batch"
    };
  }

  const batchCourseName = batch.courseName || matchedCourse?.title || "";
  const courseFallbackMatches = safeLearners.filter((lrn) => {
    if (batch.courseId && lrn.courseId && lrn.courseId === batch.courseId) {
      return true;
    }
    if (matchedCourse?.id && lrn.courseId === matchedCourse.id) {
      return true;
    }
    if (coursesMatchByName(batchCourseName, lrn.courseName)) {
      return true;
    }
    return false;
  });

  if (courseFallbackMatches.length > 0 || assignedMap.size > 0) {
    return {
      students: mergeWithAssigned(courseFallbackMatches),
      matchSource: courseFallbackMatches.length > 0 ? "course_fallback" : "assignments"
    };
  }

  return { students: [], matchSource: "none" };
}

/**
 * Computes attended student count dynamically from batch metadata,
 * learner attendance status, assessment assignments, or recorded evaluations.
 */
export function resolveBatchAttendedCount(
  batch,
  students = [],
  assignments = [],
  evaluations = []
) {
  const explicitAttended = batch?.attendedStudents ?? batch?.attended;
  if (
    explicitAttended !== undefined &&
    explicitAttended !== null &&
    explicitAttended !== ""
  ) {
    const num = Number(explicitAttended);
    if (Number.isFinite(num) && num >= 0) return num;
  }

  const safeStudents = Array.isArray(students) ? students : [];
  const hasRecordedAttendance = safeStudents.some((s) => {
    const status = normalizeText(s.attendanceStatus || s.attendance);
    return status === "present" || status === "absent";
  });

  if (hasRecordedAttendance) {
    return safeStudents.filter(
      (s) => normalizeText(s.attendanceStatus || s.attendance) === "present"
    ).length;
  }

  const batchId = batch?.id;
  if (!batchId) return 0;

  const absentIds = new Set(
    safeStudents
      .filter((s) => normalizeText(s.attendanceStatus || s.attendance) === "absent")
      .map((s) => s.id)
  );

  const participatedIds = new Set();
  for (const asgn of Array.isArray(assignments) ? assignments : []) {
    if (asgn?.batchId === batchId && asgn.studentId && !absentIds.has(asgn.studentId)) {
      participatedIds.add(asgn.studentId);
    }
  }
  for (const ev of Array.isArray(evaluations) ? evaluations : []) {
    if (ev?.batchId === batchId && ev.studentId && !absentIds.has(ev.studentId)) {
      participatedIds.add(ev.studentId);
    }
  }

  return participatedIds.size;
}

/**
 * Enriches batches with dynamic evaluation metrics for the Evaluation Batches view.
 */
export function resolveEvaluationBatches({
  batches = [],
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  evaluations = []
} = {}) {
  return (Array.isArray(batches) ? batches : []).map((batch) => {
    const syllabus = resolveBatchCourseAndSyllabus(batch, courses);
    const roster = resolveEvaluationStudents(
      batch,
      learners,
      courses,
      assessmentAssignments
    );
    const rawEnrolled = Number(batch.enrolled);
    const enrolledCandidates =
      Number.isFinite(rawEnrolled) && rawEnrolled > 0
        ? Math.max(rawEnrolled, roster.students.length)
        : roster.students.length;

    const attendedStudents = resolveBatchAttendedCount(
      batch,
      roster.students,
      assessmentAssignments,
      evaluations
    );

    const assessmentsForBatch = (Array.isArray(batchAssessments) ? batchAssessments : []).filter(
      (a) => a.batchId === batch.id
    );

    const evaluatedForBatch = new Set(
      (Array.isArray(evaluations) ? evaluations : [])
        .filter((e) => e.batchId === batch.id)
        .map((e) => e.studentId)
    ).size;

    return {
      batch,
      batchName: batch.name,
      batchTitle: batch.title || syllabus.courseName,
      code: batch.code || "",
      status: batch.status || "Active",
      enrolledCandidates,
      attendedStudents,
      rosterCount: roster.students.length,
      assessmentCount: assessmentsForBatch.length,
      evaluatedCount: evaluatedForBatch
    };
  });
}

/**
 * Selects the default assessment for a batch when viewing Student Details.
 * Prefers the most recent assessment with assignments or evaluations, falling back
 * to the latest created assessment or a virtual batch evaluation descriptor.
 */

