/**
 * Pure domain helpers for Batch-Based Assessment Management in the
 * Instructor Dashboard (Advanced Monolithic Model).
 *
 * Uses existing batches, courses, and learners data without fabricating
 * synthetic students or attendance records.
 */

export const ASSESSMENT_STORAGE_KEYS = {
  ASSESSMENTS: "instructor_batch_assessments",
  ASSIGNMENTS: "instructor_assessment_assignments"
};

/**
 * Normalizes a string for case-insensitive, whitespace-trimmed comparison.
 */
export function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

/**
 * Generates a unique identifier with a readable prefix.
 */
export function generateRecordId(prefix = "id") {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Resolves course name, completion percentage, and covered/total topics
 * for a batch using existing course definitions (`modulesCount` / `modules`).
 */

export * from "./batchAssessmentResolvers";

export function createBatchAssessmentRecord(
  existingAssessments = [],
  { batch, title, kind = "assessment" }
) {
  if (!batch || !batch.id) {
    return {
      error: "Selected batch information is missing.",
      assessment: null,
      assessments: existingAssessments
    };
  }

  const normalizedKind = kind === "practice" ? "practice" : "assessment";
  const label = normalizedKind === "practice" ? "Practice Assessment" : "Assessment";

  const trimmedTitle = String(title ?? "").trim();
  if (!trimmedTitle) {
    return {
      error: `Please enter a ${label} title before starting.`,
      assessment: null,
      assessments: existingAssessments
    };
  }

  const normalizedTitle = normalizeText(trimmedTitle);
  const duplicate = existingAssessments.find(
    (item) =>
      item.batchId === batch.id &&
      (item.kind || "assessment") === normalizedKind &&
      normalizeText(item.title) === normalizedTitle
  );

  if (duplicate) {
    return {
      error: `A ${label.toLowerCase()} with this title already exists for this batch. Select it from Saved Assessments or enter a different title.`,
      assessment: null,
      assessments: existingAssessments
    };
  }

  const assessment = {
    id: generateRecordId(normalizedKind === "practice" ? "prac" : "asmt"),
    kind: normalizedKind,
    batchId: batch.id,
    batchName: batch.name,
    courseId: batch.courseId || "",
    courseName: batch.courseName || "Unassigned Course",
    title: trimmedTitle,
    createdAt: new Date().toISOString()
  };

  return {
    error: null,
    assessment,
    assessments: [assessment, ...existingAssessments]
  };
}

/**
 * Assigns an assessment to one or more students while strictly preventing
 * duplicate assignments for the same (assessmentId, studentId) pair.
 * Explicitly includes all provided students regardless of attendance status.
 */
export function assignStudentsToAssessment(
  existingAssignments = [],
  { assessmentId, batchId, students = [] }
) {
  if (!assessmentId || !batchId || !Array.isArray(students) || students.length === 0) {
    return {
      assignments: existingAssignments,
      addedCount: 0,
      skippedCount: 0
    };
  }

  const alreadyAssignedIds = new Set(
    existingAssignments
      .filter((record) => record.assessmentId === assessmentId)
      .map((record) => record.studentId)
  );

  const newlyCreated = [];
  let skippedCount = 0;

  for (const student of students) {
    if (!student || !student.id) continue;
    if (alreadyAssignedIds.has(student.id)) {
      skippedCount += 1;
      continue;
    }

    alreadyAssignedIds.add(student.id);
    newlyCreated.push({
      id: generateRecordId("asgn"),
      assessmentId,
      batchId,
      studentId: student.id,
      studentName: student.name,
      assignedAt: new Date().toISOString()
    });
  }

  if (newlyCreated.length === 0) {
    return {
      assignments: existingAssignments,
      addedCount: 0,
      skippedCount
    };
  }

  return {
    assignments: [...existingAssignments, ...newlyCreated],
    addedCount: newlyCreated.length,
    skippedCount
  };
}

/**
 * Computes assigned/pending counts and a Set of assigned student IDs
 * for a given assessment and student roster.
 */
export function getAssessmentAssignmentSummary(
  assessmentId,
  students = [],
  assignments = []
) {
  const assignedStudentIds = new Set(
    assignments
      .filter((record) => record.assessmentId === assessmentId)
      .map((record) => record.studentId)
  );

  const totalStudents = students.length;
  let assignedCount = 0;

  for (const student of students) {
    if (assignedStudentIds.has(student.id)) {
      assignedCount += 1;
    }
  }

  const pendingCount = Math.max(0, totalStudents - assignedCount);
  const allAssigned = totalStudents > 0 && pendingCount === 0;

  return {
    totalStudents,
    assignedCount,
    pendingCount,
    allAssigned,
    assignedStudentIds
  };
}

