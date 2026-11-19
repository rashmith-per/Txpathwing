import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import {
  buildBatchStudentEvaluationRows,
  resolveEvaluationBatches,
  validateEvaluationMarks
} from "./evaluationUtils";
import { EvaluationBatchesList } from "./components/EvaluationBatchesList.jsx";
import { EvaluationStudentTable } from "./components/EvaluationStudentTable.jsx";
import { EvaluationModal } from "./components/EvaluationModal.jsx";
import "./Evaluation.css";

/**
 * Evaluation Module for the Instructor Dashboard.
 *
 * View 1: Evaluation Batches page displaying dynamic batch cards.
 * View 2: Student Details page for a selected batch with evaluation status,
 *         obtained marks, and individual Evaluate / Edit Evaluation popup modal.
 */
export function Evaluation({
  batches = [],
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  studentEvaluations = [],
  onSaveEvaluation,
  onBackToHub,
  onNavigate
}) {
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  // Modal state for Student Evaluation Popup
  const [evaluatingRow, setEvaluatingRow] = useState(null);
  const [marksInput, setMarksInput] = useState("");
  const [formError, setFormError] = useState("");

  // Feedback toast banner
  const [feedbackNotice, setFeedbackNotice] = useState(null);

  useEffect(() => {
    if (!feedbackNotice) return undefined;
    const timer = setTimeout(() => setFeedbackNotice(null), 5000);
    return () => clearTimeout(timer);
  }, [feedbackNotice]);

  // Close evaluation modal with Escape key
  useEffect(() => {
    if (!evaluatingRow) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setEvaluatingRow(null);
        setMarksInput("");
        setFormError("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [evaluatingRow]);

  // Enrich batches dynamically from existing state/storage
  const evaluationBatches = useMemo(() => {
    return resolveEvaluationBatches({
      batches,
      courses,
      learners,
      batchAssessments,
      assessmentAssignments,
      evaluations: studentEvaluations
    });
  }, [
    batches,
    courses,
    learners,
    batchAssessments,
    assessmentAssignments,
    studentEvaluations
  ]);

  // Resolve selected batch live from props
  const selectedBatch = useMemo(() => {
    if (!selectedBatchId) return null;
    return batches.find((b) => b.id === selectedBatchId) || null;
  }, [batches, selectedBatchId]);

  // Student Details rows and counts for the selected batch
  const studentDetailsData = useMemo(() => {
    return buildBatchStudentEvaluationRows({
      batch: selectedBatch,
      courses,
      learners,
      batchAssessments,
      assessmentAssignments,
      evaluations: studentEvaluations,
      selectedAssessmentId
    });
  }, [
    selectedBatch,
    courses,
    learners,
    batchAssessments,
    assessmentAssignments,
    studentEvaluations,
    selectedAssessmentId
  ]);

  const handleSelectBatchForEvaluation = (batch) => {
    setSelectedBatchId(batch.id);
    setSelectedAssessmentId(null);
    setEvaluatingRow(null);
    setFormError("");
  };

  const handleBackToBatches = () => {
    setSelectedBatchId(null);
    setSelectedAssessmentId(null);
    setEvaluatingRow(null);
    setFormError("");
  };

  const handleOpenEvaluationModal = (row) => {
    setEvaluatingRow(row);
    setMarksInput(
      row.isEvaluated && row.marksObtained !== null && row.marksObtained !== undefined
        ? String(row.marksObtained)
        : ""
    );
    setFormError("");
  };

  const handleCloseEvaluationModal = () => {
    setEvaluatingRow(null);
    setMarksInput("");
    setFormError("");
  };

  const handleMarksKeyDown = (e) => {
    if (["e", "E", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleMarksSubmit = (e) => {
    e.preventDefault();
    if (!evaluatingRow) return;

    const validation = validateEvaluationMarks(marksInput, evaluatingRow.totalMarks);
    if (!validation.valid) {
      setFormError(validation.error);
      return;
    }

    const result = onSaveEvaluation?.({
      studentId: evaluatingRow.studentId,
      studentName: evaluatingRow.studentName,
      batchId: evaluatingRow.batchId,
      batchName: evaluatingRow.batchName,
      courseName: evaluatingRow.courseName,
      assessmentId: evaluatingRow.assessmentId,
      assessmentTitle: evaluatingRow.assessmentTitle,
      totalMarks: evaluatingRow.totalMarks,
      marksObtained: validation.numericValue
    });

    if (result?.error) {
      setFormError(result.error);
      return;
    }

    const actionWord = evaluatingRow.isEvaluated ? "updated" : "allotted";
    setFeedbackNotice({
      type: "success",
      message: `Marks ${actionWord} for ${evaluatingRow.studentName} (${validation.numericValue} / ${evaluatingRow.totalMarks}).`
    });
    handleCloseEvaluationModal();
  };

  const getBatchStatusTone = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "active") return "success";
    if (normalized === "upcoming") return "blue";
    return "neutral";
  };

  const totalEvaluatedAcrossBatches = useMemo(() => {
    return new Set(
      studentEvaluations.map((ev) => `${ev.batchId}::${ev.assessmentId}::${ev.studentId}`)
    ).size;
  }, [studentEvaluations]);

  return (
    <div className="instructor-evaluation-page">
      {feedbackNotice && (
        <div
          className={`asmt-toast-banner ${feedbackNotice.type}`}
          role="status"
          aria-live="polite"
        >
          <div className="asmt-toast-content">
            <CheckCircle2 size={18} />
            <span>{feedbackNotice.message}</span>
          </div>
          <button
            type="button"
            className="asmt-toast-close"
            onClick={() => setFeedbackNotice(null)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {!selectedBatch ? (
        <EvaluationBatchesList
          evaluationBatches={evaluationBatches}
          totalEvaluatedAcrossBatches={totalEvaluatedAcrossBatches}
          onBackToHub={onBackToHub}
          onNavigate={onNavigate}
          onSelectBatch={handleSelectBatchForEvaluation}
          getBatchStatusTone={getBatchStatusTone}
        />
      ) : (
        <EvaluationStudentTable
          selectedBatch={selectedBatch}
          studentDetailsData={studentDetailsData}
          onBackToBatches={handleBackToBatches}
          onSelectAssessmentId={setSelectedAssessmentId}
          onOpenEvaluationModal={handleOpenEvaluationModal}
          getBatchStatusTone={getBatchStatusTone}
        />
      )}

      <EvaluationModal
        evaluatingRow={evaluatingRow}
        marksInput={marksInput}
        formError={formError}
        onClose={handleCloseEvaluationModal}
        onSubmit={handleMarksSubmit}
        onMarksChange={(e) => {
          setMarksInput(e.target.value);
          if (formError) setFormError("");
        }}
        onMarksKeyDown={handleMarksKeyDown}
      />
    </div>
  );
}

export default Evaluation;
