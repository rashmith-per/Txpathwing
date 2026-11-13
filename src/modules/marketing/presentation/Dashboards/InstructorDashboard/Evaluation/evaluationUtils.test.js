import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveEvaluationStudents,
  resolveBatchAttendedCount,
  resolveEvaluationBatches,
  buildBatchStudentEvaluationRows,
  validateEvaluationMarks,
  upsertStudentEvaluation,
  DEFAULT_EVALUATION_DURATION,
  DEFAULT_EVALUATION_TOTAL_MARKS
} from "./evaluationUtils.js";

const SAMPLE_COURSES = [
  { id: "crs-inst-1", title: "Java Full Stack Development", modulesCount: 16 },
  { id: "crs-inst-2", title: "AWS DevOps Engineer Professional", modulesCount: 14 },
  { id: "crs-inst-3", title: "React 19 & Next.js Full Stack Engineering", modulesCount: 12 }
];

const SAMPLE_LEARNERS = [
  {
    id: "lrn-1",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    courseId: "crs-inst-3",
    courseName: "React 19 & Next.js Full Stack",
    cohort: "Batch 2026-A"
  },
  {
    id: "lrn-2",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    courseId: "crs-inst-2",
    courseName: "AWS DevOps Engineer",
    cohort: "Batch 2026-B"
  },
  {
    id: "lrn-3",
    name: "Vikram Patel",
    email: "vikram@example.com",
    courseId: "crs-inst-1",
    courseName: "Java Full Stack Development",
    cohort: "CS-B01"
  },
  {
    id: "lrn-5",
    name: "Karan Johar",
    email: "karan@example.com",
    courseId: "crs-inst-1",
    courseName: "Java Full Stack Development",
    cohort: "Batch 2026-C"
  }
];

const SAMPLE_BATCH_CS = {
  id: "batch-cs-b01",
  name: "Computer Science - B01",
  code: "CS-B01",
  courseId: "crs-inst-1",
  courseName: "Java Full Stack Development",
  enrolled: 45,
  status: "Active"
};

const SAMPLE_BATCH_AWS = {
  id: "batch-aws-01",
  name: "AWS Spring 2027",
  code: "AWS-27A",
  courseId: "crs-generated-id",
  courseName: "AWS DevOps Engineer Professional",
  enrolled: 0,
  status: "Active"
};

test("resolveEvaluationStudents resolves direct batch matches and abbreviated course names", () => {
  const direct = resolveEvaluationStudents(SAMPLE_BATCH_CS, SAMPLE_LEARNERS, SAMPLE_COURSES, []);
  assert.equal(direct.matchSource, "direct_batch");
  assert.equal(direct.students.length, 1);
  assert.equal(direct.students[0].id, "lrn-3");

  const awsFallback = resolveEvaluationStudents(SAMPLE_BATCH_AWS, SAMPLE_LEARNERS, SAMPLE_COURSES, []);
  assert.equal(awsFallback.matchSource, "course_fallback");
  assert.equal(awsFallback.students.length, 1);
  assert.equal(awsFallback.students[0].id, "lrn-2");
});

test("resolveBatchAttendedCount resolves attendance, assignments, and explicit batch counts dynamically", () => {
  const withExplicit = { ...SAMPLE_BATCH_CS, attendedStudents: 40 };
  assert.equal(resolveBatchAttendedCount(withExplicit, SAMPLE_LEARNERS, [], []), 40);

  const studentsWithAttendance = [
    { id: "s1", attendanceStatus: "Present" },
    { id: "s2", attendanceStatus: "Absent" },
    { id: "s3", attendanceStatus: "Present" }
  ];
  assert.equal(resolveBatchAttendedCount(SAMPLE_BATCH_CS, studentsWithAttendance, [], []), 2);

  const assignments = [
    { id: "asgn-1", batchId: SAMPLE_BATCH_CS.id, studentId: "lrn-3" },
    { id: "asgn-2", batchId: SAMPLE_BATCH_CS.id, studentId: "lrn-3" },
    { id: "asgn-3", batchId: SAMPLE_BATCH_CS.id, studentId: "lrn-5" }
  ];
  assert.equal(resolveBatchAttendedCount(SAMPLE_BATCH_CS, [SAMPLE_LEARNERS[2]], assignments, []), 2);
});

test("resolveEvaluationBatches returns dynamic cards metadata without hardcoded values", () => {
  const assignments = [
    { id: "asgn-1", batchId: SAMPLE_BATCH_CS.id, studentId: "lrn-3" }
  ];
  const cards = resolveEvaluationBatches({
    batches: [SAMPLE_BATCH_CS, SAMPLE_BATCH_AWS],
    courses: SAMPLE_COURSES,
    learners: SAMPLE_LEARNERS,
    batchAssessments: [{ id: "asmt-1", batchId: SAMPLE_BATCH_CS.id, title: "Core Java Mid-Module" }],
    assessmentAssignments: assignments,
    evaluations: []
  });

  assert.equal(cards.length, 2);
  assert.equal(cards[0].batchName, "Computer Science - B01");
  assert.equal(cards[0].batchTitle, "Java Full Stack Development");
  assert.equal(cards[0].enrolledCandidates, 45);
  assert.equal(cards[0].attendedStudents, 1);
  assert.equal(cards[0].status, "Active");

  assert.equal(cards[1].batchName, "AWS Spring 2027");
  assert.equal(cards[1].enrolledCandidates, 1);
  assert.equal(cards[1].attendedStudents, 0);
});

test("validateEvaluationMarks enforces numeric, non-empty, >= 0, and <= totalMarks rules", () => {
  assert.equal(validateEvaluationMarks("", 100).valid, false);
  assert.equal(validateEvaluationMarks("   ", 100).valid, false);
  assert.equal(validateEvaluationMarks("abc", 100).valid, false);
  assert.equal(validateEvaluationMarks("12ab", 100).valid, false);
  assert.equal(validateEvaluationMarks("-1", 100).valid, false);
  assert.equal(validateEvaluationMarks("101", 100).valid, false);
  assert.equal(validateEvaluationMarks("51", 50).valid, false);

  const zeroResult = validateEvaluationMarks("0", 100);
  assert.equal(zeroResult.valid, true);
  assert.equal(zeroResult.numericValue, 0);

  const decimalResult = validateEvaluationMarks("87.5", 100);
  assert.equal(decimalResult.valid, true);
  assert.equal(decimalResult.numericValue, 87.5);

  const maxResult = validateEvaluationMarks("50", 50);
  assert.equal(maxResult.valid, true);
  assert.equal(maxResult.numericValue, 50);
});

test("upsertStudentEvaluation associates marks with studentId, batchId, assessmentId and updates rows & counts", () => {
  const assessments = [
    {
      id: "asmt-java-1",
      batchId: SAMPLE_BATCH_CS.id,
      title: "Core Java Mid-Module",
      courseName: "Java Full Stack Development"
    }
  ];
  const assignments = [
    { id: "a1", batchId: SAMPLE_BATCH_CS.id, assessmentId: "asmt-java-1", studentId: "lrn-3" },
    { id: "a2", batchId: SAMPLE_BATCH_CS.id, assessmentId: "asmt-java-1", studentId: "lrn-5", studentName: "Karan Johar" }
  ];

  // Initial state: both Pending
  let detail = buildBatchStudentEvaluationRows({
    batch: SAMPLE_BATCH_CS,
    courses: SAMPLE_COURSES,
    learners: SAMPLE_LEARNERS,
    batchAssessments: assessments,
    assessmentAssignments: assignments,
    evaluations: []
  });

  assert.equal(detail.totalStudents, 2);
  assert.equal(detail.evaluatedStudents, 0);
  assert.equal(detail.rows[0].timeDuration, DEFAULT_EVALUATION_DURATION);
  assert.equal(detail.rows[0].totalMarks, DEFAULT_EVALUATION_TOTAL_MARKS);
  assert.equal(detail.rows[0].evaluationStatus, "Pending");

  // Allot marks for student lrn-3
  const step1 = upsertStudentEvaluation([], {
    studentId: "lrn-3",
    studentName: "Vikram Patel",
    batchId: SAMPLE_BATCH_CS.id,
    batchName: SAMPLE_BATCH_CS.name,
    courseName: "Java Full Stack Development",
    assessmentId: "asmt-java-1",
    assessmentTitle: "Core Java Mid-Module",
    totalMarks: 100,
    marksObtained: "88"
  });

  assert.equal(step1.error, null);
  assert.equal(step1.isUpdate, false);
  assert.equal(step1.evaluation.studentId, "lrn-3");
  assert.equal(step1.evaluation.batchId, SAMPLE_BATCH_CS.id);
  assert.equal(step1.evaluation.assessmentId, "asmt-java-1");
  assert.equal(step1.evaluation.marksObtained, 88);

  detail = buildBatchStudentEvaluationRows({
    batch: SAMPLE_BATCH_CS,
    courses: SAMPLE_COURSES,
    learners: SAMPLE_LEARNERS,
    batchAssessments: assessments,
    assessmentAssignments: assignments,
    evaluations: step1.evaluations
  });

  assert.equal(detail.totalStudents, 2);
  assert.equal(detail.evaluatedStudents, 1);
  const vikramRow = detail.rows.find((r) => r.studentId === "lrn-3");
  const karanRow = detail.rows.find((r) => r.studentId === "lrn-5");
  assert.equal(vikramRow.evaluationStatus, "Evaluated");
  assert.equal(vikramRow.marksObtained, 88);
  assert.equal(karanRow.evaluationStatus, "Pending");
  assert.equal(karanRow.marksObtained, null);

  // Edit Evaluation for lrn-3
  const step2 = upsertStudentEvaluation(step1.evaluations, {
    studentId: "lrn-3",
    studentName: "Vikram Patel",
    batchId: SAMPLE_BATCH_CS.id,
    batchName: SAMPLE_BATCH_CS.name,
    courseName: "Java Full Stack Development",
    assessmentId: "asmt-java-1",
    assessmentTitle: "Core Java Mid-Module",
    totalMarks: 100,
    marksObtained: "94"
  });

  assert.equal(step2.error, null);
  assert.equal(step2.isUpdate, true);
  assert.equal(step2.evaluations.length, 1);
  assert.equal(step2.evaluation.marksObtained, 94);
});
