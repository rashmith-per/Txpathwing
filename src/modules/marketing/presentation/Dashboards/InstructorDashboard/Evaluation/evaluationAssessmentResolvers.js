import {
  DEFAULT_EVALUATION_TOTAL_MARKS
} from "./evaluationUtils";
import { resolveEvaluationStudents } from "./evaluationBatchResolvers";

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

