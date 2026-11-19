import { useState, useMemo, useEffect } from "react";
import {
  assignStudentsToAssessment,
  createBatchAssessmentRecord,
  getAssessmentAssignmentSummary,
  normalizeText,
  resolveBatchCourseAndSyllabus,
  resolveBatchStudents
} from "../assessmentUtils";

export function useAssessmentsManagement({
  batches = [],
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  onCreateAssessment,
  onAssignAssessmentStudents
}) {
  const [activeSelection, setActiveSelection] = useState(null);
  const [createTargetBatch, setCreateTargetBatch] = useState(null);
  const [assessmentTitleInput, setAssessmentTitleInput] = useState("");
  const [createFormError, setCreateFormError] = useState("");
  const [studentToAssign, setStudentToAssign] = useState(null);
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState(null);

  useEffect(() => {
    if (!feedbackNotice) return undefined;
    const timer = setTimeout(() => {
      setFeedbackNotice(null);
    }, 5500);
    return () => clearTimeout(timer);
  }, [feedbackNotice]);

  const showNotice = (type, message, showNavActions = false) => {
    setFeedbackNotice({ type, message, showNavActions });
  };

  const activeAssessment = useMemo(() => {
    if (!activeSelection?.assessmentId) return null;
    return batchAssessments.find((a) => a.id === activeSelection.assessmentId) || null;
  }, [activeSelection, batchAssessments]);

  const activeBatch = useMemo(() => {
    if (!activeSelection?.batchId) return null;
    return batches.find((b) => b.id === activeSelection.batchId) || null;
  }, [activeSelection, batches]);

  const activeCreateTargetBatch = useMemo(() => {
    if (!createTargetBatch?.id) return null;
    return batches.find((b) => b.id === createTargetBatch.id) || null;
  }, [batches, createTargetBatch]);

  const enrichedBatches = useMemo(() => {
    return batches.map((batch) => {
      const syllabus = resolveBatchCourseAndSyllabus(batch, courses);
      const roster = resolveBatchStudents(batch, learners);
      const rawEnrolled = Number(batch.enrolled);
      const enrolledCount = Number.isFinite(rawEnrolled) ? rawEnrolled : roster.students.length;

      return {
        batch,
        syllabus,
        enrolledCount
      };
    });
  }, [batches, courses, learners]);

  const activeRoster = useMemo(() => {
    if (!activeBatch) return { students: [], matchSource: "none" };
    return resolveBatchStudents(activeBatch, learners);
  }, [activeBatch, learners]);

  const activeSummary = useMemo(() => {
    if (!activeAssessment) {
      return {
        totalStudents: 0,
        assignedCount: 0,
        pendingCount: 0,
        allAssigned: false,
        assignedStudentIds: new Set()
      };
    }
    return getAssessmentAssignmentSummary(
      activeAssessment.id,
      activeRoster.students,
      assessmentAssignments
    );
  }, [activeAssessment, activeRoster.students, assessmentAssignments]);

  const activeCourseInfo = useMemo(() => {
    if (!activeBatch) return null;
    return resolveBatchCourseAndSyllabus(activeBatch, courses);
  }, [activeBatch, courses]);

  const isPracticeActive = activeAssessment?.kind === "practice";
  const activeTypeLabel = isPracticeActive ? "Practice Assessment" : "Assessment";
  const activeTypeLower = isPracticeActive ? "practice assessment" : "assessment";

  const handleOpenCreateModal = (batch) => {
    setCreateTargetBatch(batch);
    setAssessmentTitleInput("");
    setCreateFormError("");
  };

  const handlePracticeClick = (batch) => {
    const existingPractice = batchAssessments.find(
      (a) =>
        a.batchId === batch.id &&
        a.kind === "practice" &&
        normalizeText(a.title) === "practice assessment"
    );

    if (existingPractice) {
      setActiveSelection({
        assessmentId: existingPractice.id,
        batchId: batch.id
      });
      setStudentToAssign(null);
      setIsBulkConfirmOpen(false);
      return;
    }

    const result = createBatchAssessmentRecord(batchAssessments, {
      batch,
      title: "Practice Assessment",
      kind: "practice"
    });

    if (result.assessment) {
      onCreateAssessment(result.assessment);
      setActiveSelection({
        assessmentId: result.assessment.id,
        batchId: batch.id
      });
      setStudentToAssign(null);
      setIsBulkConfirmOpen(false);
    }
  };

  const handleCloseCreateModal = () => {
    setCreateTargetBatch(null);
    setAssessmentTitleInput("");
    setCreateFormError("");
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!activeCreateTargetBatch) return;

    const result = createBatchAssessmentRecord(batchAssessments, {
      batch: activeCreateTargetBatch,
      title: assessmentTitleInput,
      kind: "assessment"
    });

    if (result.error) {
      setCreateFormError(result.error);
      return;
    }

    onCreateAssessment(result.assessment);
    setActiveSelection({
      assessmentId: result.assessment.id,
      batchId: activeCreateTargetBatch.id
    });
    setStudentToAssign(null);
    setIsBulkConfirmOpen(false);
    setCreateTargetBatch(null);
    setAssessmentTitleInput("");
    setCreateFormError("");
    showNotice(
      "success",
      `Assessment "${result.assessment.title}" created for batch "${activeCreateTargetBatch.name}".`
    );
  };

  const handleConfirmIndividualAssignment = () => {
    if (!activeAssessment || !activeBatch || !studentToAssign) return;

    const result = assignStudentsToAssessment(assessmentAssignments, {
      assessmentId: activeAssessment.id,
      batchId: activeBatch.id,
      students: [studentToAssign]
    });

    if (result.addedCount > 0) {
      onAssignAssessmentStudents({
        assessmentId: activeAssessment.id,
        batchId: activeBatch.id,
        students: [studentToAssign]
      });
      showNotice(
        "success",
        `Assigned "${activeAssessment.title}" to ${studentToAssign.name}.`
      );
    } else {
      showNotice(
        "info",
        `${studentToAssign.name} has already been assigned this ${activeTypeLower}.`
      );
    }

    setStudentToAssign(null);
  };

  const handleConfirmBulkAssignment = () => {
    if (!activeAssessment || !activeBatch) return;

    const result = assignStudentsToAssessment(assessmentAssignments, {
      assessmentId: activeAssessment.id,
      batchId: activeBatch.id,
      students: activeRoster.students
    });

    if (result.addedCount > 0) {
      onAssignAssessmentStudents({
        assessmentId: activeAssessment.id,
        batchId: activeBatch.id,
        students: activeRoster.students
      });
      showNotice(
        "success",
        `Assigned "${activeAssessment.title}" to ${result.addedCount} pending student${
          result.addedCount === 1 ? "" : "s"
        } in batch "${activeBatch.name}"${
          result.skippedCount > 0 ? ` (${result.skippedCount} already assigned)` : ""
        }.`
      );
    } else {
      showNotice(
        "info",
        `${activeTypeLabel} has already been assigned to all students in ${activeBatch.name}.`
      );
    }

    setIsBulkConfirmOpen(false);
  };

  const getAttendanceTone = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "present") return "success";
    if (normalized === "absent") return "danger";
    return "neutral";
  };

  return {
    activeSelection,
    setActiveSelection,
    activeAssessment,
    activeBatch,
    activeCreateTargetBatch,
    assessmentTitleInput,
    setAssessmentTitleInput,
    createFormError,
    setCreateFormError,
    studentToAssign,
    setStudentToAssign,
    isBulkConfirmOpen,
    setIsBulkConfirmOpen,
    feedbackNotice,
    setFeedbackNotice,
    enrichedBatches,
    activeRoster,
    activeSummary,
    activeCourseInfo,
    isPracticeActive,
    activeTypeLabel,
    activeTypeLower,
    handleOpenCreateModal,
    handlePracticeClick,
    handleCloseCreateModal,
    handleCreateSubmit,
    handleConfirmIndividualAssignment,
    handleConfirmBulkAssignment,
    getAttendanceTone
  };
}
