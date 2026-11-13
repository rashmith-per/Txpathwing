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
export function resolveDefaultBatchAssessment(
  batch,
  courses = [],
  batchAssessments = [],
  assessmentAssignments = [],
  evaluations = []
) {
  if (!batch) return null;

  const syllabus = resolveBatchCourseAndSyllabus(batch, courses);
  const assessmentsForBatch = (Array.isArray(batchAssessments) ? batchAssessments : []).filter(
    (a) => a.batchId === batch.id
  );

  if (assessmentsForBatch.length === 0) {
    return {
      id: `eval-default-${batch.id}`,
      batchId: batch.id,
      title: `${syllabus.courseName} Assessment`,
      courseName: syllabus.courseName,
      duration: batch.assessmentDuration || DEFAULT_EVALUATION_DURATION,
      totalMarks: Number(batch.totalMarks) > 0 ? Number(batch.totalMarks) : DEFAULT_EVALUATION_TOTAL_MARKS,
      isFallback: true
    };
  }

  const assignedAssessmentIds = new Set(
    (Array.isArray(assessmentAssignments) ? assessmentAssignments : [])
      .filter((r) => r.batchId === batch.id)
      .map((r) => r.assessmentId)
  );
  const evaluatedAssessmentIds = new Set(
    (Array.isArray(evaluations) ? evaluations : [])
      .filter((e) => e.batchId === batch.id)
      .map((e) => e.assessmentId)
  );

  const activeMatch =
    assessmentsForBatch.find(
      (a) => assignedAssessmentIds.has(a.id) || evaluatedAssessmentIds.has(a.id)
    ) || assessmentsForBatch[0];

  return {
    ...activeMatch,
    courseName: activeMatch.courseName || syllabus.courseName,
    duration: activeMatch.duration || activeMatch.timeDuration || DEFAULT_EVALUATION_DURATION,
    totalMarks:
      Number(activeMatch.totalMarks) > 0
        ? Number(activeMatch.totalMarks)
        : DEFAULT_EVALUATION_TOTAL_MARKS,
    isFallback: false
  };
}

/**
 * Builds Student Details rows for the selected batch and active assessment,
 * merging saved evaluation marks and status per (studentId, batchId, assessmentId).
 */
export function buildBatchStudentEvaluationRows({
  batch,
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  evaluations = [],
  selectedAssessmentId = null
} = {}) {
  if (!batch) {
    return {
      rows: [],
      assessmentsForBatch: [],
      activeAssessment: null,
      totalStudents: 0,
      evaluatedStudents: 0
    };
  }

  const syllabus = resolveBatchCourseAndSyllabus(batch, courses);
  const assessmentsForBatch = (Array.isArray(batchAssessments) ? batchAssessments : [])
    .filter((a) => a.batchId === batch.id)
    .map((a) => ({
      ...a,
      courseName: a.courseName || syllabus.courseName,
      duration: a.duration || a.timeDuration || DEFAULT_EVALUATION_DURATION,
      totalMarks:
        Number(a.totalMarks) > 0
          ? Number(a.totalMarks)
          : DEFAULT_EVALUATION_TOTAL_MARKS
    }));

  const defaultAssessment = resolveDefaultBatchAssessment(
    batch,
    courses,
    assessmentsForBatch,
    assessmentAssignments,
    evaluations
  );

  const activeAssessment =
    (selectedAssessmentId &&
      assessmentsForBatch.find((a) => a.id === selectedAssessmentId)) ||
    defaultAssessment;

  const roster = resolveEvaluationStudents(
    batch,
    learners,
    courses,
    assessmentAssignments
  );

  const evaluationMap = new Map();
  for (const ev of Array.isArray(evaluations) ? evaluations : []) {
    if (!ev || ev.batchId !== batch.id) continue;
    const key = `${ev.batchId}::${ev.assessmentId}::${ev.studentId}`;
    evaluationMap.set(key, ev);
  }

  const rows = roster.students.map((student) => {
    const evalKey = `${batch.id}::${activeAssessment.id}::${student.id}`;
    const savedEval = evaluationMap.get(evalKey) || null;
    const totalMarks = activeAssessment.totalMarks;
    const isEvaluated = Boolean(savedEval);

    return {
      rowKey: `${batch.id}::${activeAssessment.id}::${student.id}`,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email || "",
      batchId: batch.id,
      batchName: batch.name,
      courseName: syllabus.courseName || student.courseName || "Unassigned Course",
      assessmentId: activeAssessment.id,
      assessmentTitle: activeAssessment.title,
      timeDuration: activeAssessment.duration,
      totalMarks,
      evaluationStatus: isEvaluated ? "Evaluated" : "Pending",
      isEvaluated,
      marksObtained: isEvaluated ? Number(savedEval.marksObtained) : null,
      evaluatedAt: savedEval?.evaluatedAt || null,
      updatedAt: savedEval?.updatedAt || null
    };
  });

  const totalStudents = rows.length;
  const evaluatedStudents = rows.filter((r) => r.isEvaluated).length;

  return {
    rows,
    assessmentsForBatch,
    activeAssessment,
    totalStudents,
    evaluatedStudents
  };
}

/**
 * Validates Marks Obtained input for the Student Evaluation modal.
 */
export function validateEvaluationMarks(rawValue, totalMarks) {
  const parsedMax = Number(totalMarks);
  const maxMarks =
    Number.isFinite(parsedMax) && parsedMax > 0
      ? parsedMax
      : DEFAULT_EVALUATION_TOTAL_MARKS;

  const trimmed = String(rawValue ?? "").trim();
  if (!trimmed) {
    return {
      valid: false,
      error: "Please enter Marks Obtained.",
      numericValue: null
    };
  }

  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return {
      valid: false,
      error: "Marks Obtained must be a valid numeric value.",
      numericValue: null
    };
  }

  const numericValue = Number(trimmed);
  if (!Number.isFinite(numericValue)) {
    return {
      valid: false,
      error: "Marks Obtained must be a valid numeric value.",
      numericValue: null
    };
  }

  if (numericValue < 0) {
    return {
      valid: false,
      error: "Marks Obtained cannot be less than 0.",
      numericValue: null
    };
  }

  if (numericValue > maxMarks) {
    return {
      valid: false,
      error: `Marks Obtained cannot exceed Total Marks (${maxMarks}).`,
      numericValue: null
    };
  }

  return {
    valid: true,
    error: "",
    numericValue
  };
}

/**
 * Saves or updates a student evaluation record associated with
 * (studentId, batchId, assessmentId).
 */
export function upsertStudentEvaluation(existingEvaluations = [], payload) {
  const safeList = Array.isArray(existingEvaluations) ? existingEvaluations : [];
  if (!payload || !payload.studentId || !payload.batchId || !payload.assessmentId) {
    return {
      error: "Missing student, batch, or assessment identifier.",
      evaluation: null,
      evaluations: safeList
    };
  }

  const validation = validateEvaluationMarks(payload.marksObtained, payload.totalMarks);
  if (!validation.valid) {
    return {
      error: validation.error,
      evaluation: null,
      evaluations: safeList
    };
  }

  const now = new Date().toISOString();
  const existingIndex = safeList.findIndex(
    (item) =>
      item.studentId === payload.studentId &&
      item.batchId === payload.batchId &&
      item.assessmentId === payload.assessmentId
  );

  if (existingIndex !== -1) {
    const updatedRecord = {
      ...safeList[existingIndex],
      studentName: payload.studentName || safeList[existingIndex].studentName,
      batchName: payload.batchName || safeList[existingIndex].batchName,
      courseName: payload.courseName || safeList[existingIndex].courseName,
      assessmentTitle: payload.assessmentTitle || safeList[existingIndex].assessmentTitle,
      totalMarks: Number(payload.totalMarks) || safeList[existingIndex].totalMarks,
      marksObtained: validation.numericValue,
      status: "Evaluated",
      updatedAt: now
    };
    const nextList = safeList.map((item, idx) =>
      idx === existingIndex ? updatedRecord : item
    );
    return {
      error: null,
      evaluation: updatedRecord,
      evaluations: nextList,
      isUpdate: true
    };
  }

  const newRecord = {
    id: generateRecordId("eval"),
    studentId: payload.studentId,
    studentName: payload.studentName || "Student",
    batchId: payload.batchId,
    batchName: payload.batchName || "",
    courseName: payload.courseName || "",
    assessmentId: payload.assessmentId,
    assessmentTitle: payload.assessmentTitle || "",
    totalMarks: Number(payload.totalMarks) || DEFAULT_EVALUATION_TOTAL_MARKS,
    marksObtained: validation.numericValue,
    status: "Evaluated",
    evaluatedAt: now,
    updatedAt: now
  };

  return {
    error: null,
    evaluation: newRecord,
    evaluations: [newRecord, ...safeList],
    isUpdate: false
  };
}
