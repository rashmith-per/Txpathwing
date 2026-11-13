import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveBatchCourseAndSyllabus,
  resolveBatchStudents,
  createBatchAssessmentRecord,
  assignStudentsToAssessment,
  getAssessmentAssignmentSummary
} from "./assessmentUtils.js";

const SAMPLE_COURSES = [
  { id: "crs-inst-1", title: "Java Full Stack Development", modulesCount: 16 },
  { id: "crs-inst-2", title: "AWS DevOps Engineer", modulesCount: 14 }
];

const SAMPLE_BATCH = {
  id: "batch-jfs-27a",
  name: "JFS-27A",
  code: "JFS-27A",
  courseId: "crs-inst-1",
  courseName: "Java Full Stack Development",
  enrolled: 35,
  completion: 60
};

const SAMPLE_LEARNERS = [
  { id: "lrn-1", name: "Student One", courseId: "crs-inst-1", courseName: "Java Full Stack Development", cohort: "JFS-27A", attendanceStatus: "Present" },
  { id: "lrn-2", name: "Student Two", courseId: "crs-inst-1", courseName: "Java Full Stack Development", cohort: "JFS-27A", attendanceStatus: "Absent" },
  { id: "lrn-3", name: "Student Three", courseId: "crs-inst-1", courseName: "Java Full Stack Development", cohort: "Batch 2026-C" },
  { id: "lrn-4", name: "Student Four", courseId: "crs-inst-2", courseName: "AWS DevOps Engineer", cohort: "Batch 2026-B" }
];

test("resolveBatchCourseAndSyllabus computes covered topics and completion accurately", () => {
  const result = resolveBatchCourseAndSyllabus(SAMPLE_BATCH, SAMPLE_COURSES);
  assert.equal(result.courseName, "Java Full Stack Development");
  assert.equal(result.completionPercentage, 60);
  assert.equal(result.totalTopics, 16);
  assert.equal(result.coveredTopics, 10);
  assert.equal(result.syllabusLabel, "10 / 16 Topics");
});

test("resolveBatchStudents prioritizes direct batch/cohort matches over course fallback and preserves attendance", () => {
  const direct = resolveBatchStudents(SAMPLE_BATCH, SAMPLE_LEARNERS);
  assert.equal(direct.matchSource, "direct_batch");
  assert.equal(direct.students.length, 2);
  assert.deepEqual(
    direct.students.map((s) => ({ id: s.id, attendanceStatus: s.attendanceStatus })),
    [
      { id: "lrn-1", attendanceStatus: "Present" },
      { id: "lrn-2", attendanceStatus: "Absent" }
    ]
  );

  const otherBatchSameCourse = {
    id: "batch-aws-new",
    name: "AWS-99",
    code: "AWS-99",
    courseId: "crs-inst-2",
    courseName: "AWS DevOps Engineer"
  };
  const fallback = resolveBatchStudents(otherBatchSameCourse, SAMPLE_LEARNERS);
  assert.equal(fallback.matchSource, "course_fallback");
  assert.equal(fallback.students.length, 1);
  assert.equal(fallback.students[0].id, "lrn-4");
  assert.equal(fallback.students[0].attendanceStatus, "Not Recorded");
});

test("createBatchAssessmentRecord validates required title and blocks duplicates per batch", () => {
  const emptyTitle = createBatchAssessmentRecord([], { batch: SAMPLE_BATCH, title: "   " });
  assert.ok(emptyTitle.error);
  assert.equal(emptyTitle.assessment, null);

  const created = createBatchAssessmentRecord([], { batch: SAMPLE_BATCH, title: " Core Java Assessment " });
  assert.equal(created.error, null);
  assert.equal(created.assessment.title, "Core Java Assessment");
  assert.equal(created.assessment.batchId, SAMPLE_BATCH.id);
  assert.equal(created.assessments.length, 1);

  const duplicate = createBatchAssessmentRecord(created.assessments, {
    batch: SAMPLE_BATCH,
    title: "core java assessment"
  });
  assert.ok(duplicate.error);
  assert.equal(duplicate.assessments.length, 1);
});

test("Individual followed by bulk assignment assigns Present & Absent students without duplicates", () => {
  const { students } = resolveBatchStudents(SAMPLE_BATCH, SAMPLE_LEARNERS);
  const { assessment } = createBatchAssessmentRecord([], {
    batch: SAMPLE_BATCH,
    title: "Java Sprint Test"
  });

  // Step 1: Individual assignment to Present student
  const step1 = assignStudentsToAssessment([], {
    assessmentId: assessment.id,
    batchId: SAMPLE_BATCH.id,
    students: [students[0]]
  });
  assert.equal(step1.addedCount, 1);
  assert.equal(step1.skippedCount, 0);

  let summary = getAssessmentAssignmentSummary(assessment.id, students, step1.assignments);
  assert.equal(summary.totalStudents, 2);
  assert.equal(summary.assignedCount, 1);
  assert.equal(summary.pendingCount, 1);
  assert.equal(summary.allAssigned, false);

  // Step 2: Re-assigning the same individual student creates no duplicate
  const dupIndividual = assignStudentsToAssessment(step1.assignments, {
    assessmentId: assessment.id,
    batchId: SAMPLE_BATCH.id,
    students: [students[0]]
  });
  assert.equal(dupIndividual.addedCount, 0);
  assert.equal(dupIndividual.skippedCount, 1);
  assert.equal(dupIndividual.assignments.length, 1);

  // Step 3: Bulk assign to entire batch includes Absent student and skips already-assigned student
  const bulkResult = assignStudentsToAssessment(step1.assignments, {
    assessmentId: assessment.id,
    batchId: SAMPLE_BATCH.id,
    students
  });
  assert.equal(bulkResult.addedCount, 1);
  assert.equal(bulkResult.skippedCount, 1);
  assert.equal(bulkResult.assignments.length, 2);

  summary = getAssessmentAssignmentSummary(assessment.id, students, bulkResult.assignments);
  assert.equal(summary.assignedCount, 2);
  assert.equal(summary.pendingCount, 0);
  assert.equal(summary.allAssigned, true);

  // Step 4: Second bulk click creates zero duplicates
  const secondBulk = assignStudentsToAssessment(bulkResult.assignments, {
    assessmentId: assessment.id,
    batchId: SAMPLE_BATCH.id,
    students
  });
  assert.equal(secondBulk.addedCount, 0);
  assert.equal(secondBulk.assignments.length, 2);
});

test("Practice assessments are isolated from standard assessment duplicates and follow the same workflow", () => {
  const { students } = resolveBatchStudents(SAMPLE_BATCH, SAMPLE_LEARNERS);

  const asmtResult = createBatchAssessmentRecord([], {
    batch: SAMPLE_BATCH,
    title: "Module 1",
    kind: "assessment"
  });
  assert.equal(asmtResult.error, null);
  assert.equal(asmtResult.assessment.kind, "assessment");

  const pracResult = createBatchAssessmentRecord(asmtResult.assessments, {
    batch: SAMPLE_BATCH,
    title: "Module 1",
    kind: "practice"
  });
  assert.equal(pracResult.error, null);
  assert.equal(pracResult.assessment.kind, "practice");
  assert.equal(pracResult.assessments.length, 2);

  const dupPrac = createBatchAssessmentRecord(pracResult.assessments, {
    batch: SAMPLE_BATCH,
    title: "module 1",
    kind: "practice"
  });
  assert.ok(dupPrac.error);

  const assignedPrac = assignStudentsToAssessment([], {
    assessmentId: pracResult.assessment.id,
    batchId: SAMPLE_BATCH.id,
    students
  });
  assert.equal(assignedPrac.addedCount, 2);
});
