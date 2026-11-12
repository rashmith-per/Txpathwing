import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Edit3,
  Layers,
  UserCheck,
  Users,
  X
} from "lucide-react";
import { Badge } from "../common/Badge";
import {
  buildBatchStudentEvaluationRows,
  resolveEvaluationBatches,
  validateEvaluationMarks
} from "./evaluationUtils";
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
        /* ============================================================
           VIEW 1: EVALUATION BATCHES LISTING PAGE
           ============================================================ */
        <>
          <div className="eval-screen-topbar">
            {typeof onBackToHub === "function" && (
              <button
                type="button"
                className="btn-secondary asmt-back-btn"
                onClick={onBackToHub}
              >
                <ArrowLeft size={15} />
                <span>Back to Assessment &amp; Evaluation</span>
              </button>
            )}
          </div>

          <div className="module-header-row">
            <div>
              <div className="breadcrumb-nav">
                <span>TX Pathwing</span>
                <span className="separator">/</span>
                <span>Assessment &amp; Evaluation</span>
                <span className="separator">/</span>
                <strong className="current">Evaluation</strong>
              </div>
              <h1 className="module-title">Evaluation Batches</h1>
              <p className="module-sub">
                Select a batch to review enrolled students and allot assessment evaluation marks.
              </p>
            </div>

            <div className="asmt-header-summary-pill">
              <Layers size={15} />
              <span>
                {evaluationBatches.length}{" "}
                {evaluationBatches.length === 1 ? "Batch" : "Batches"}
              </span>
              <span className="asmt-pill-divider" />
              <Award size={15} />
              <span>{totalEvaluatedAcrossBatches} Evaluated</span>
            </div>
          </div>

          {evaluationBatches.length === 0 ? (
            <div className="asmt-empty-state-card">
              <div className="asmt-empty-icon-wrap">
                <Layers size={28} />
              </div>
              <h2>No Batches Available</h2>
              <p>
                Create a batch in Batch Management first. Any batch created or updated there
                appears here automatically for student evaluation.
              </p>
              {typeof onNavigate === "function" && (
                <button
                  type="button"
                  className="btn-primary-gradient"
                  onClick={() => onNavigate("Batches")}
                >
                  Go to Batches
                </button>
              )}
            </div>
          ) : (
            <div className="eval-batches-grid">
              {evaluationBatches.map((item) => (
                <article key={item.batch.id} className="asmt-batch-card eval-batch-card">
                  <div className="asmt-batch-card-top">
                    <div className="asmt-batch-title-group">
                      <div className="asmt-batch-badges">
                        <Badge tone={getBatchStatusTone(item.status)}>
                          {item.status}
                        </Badge>
                        {item.code && <Badge tone="blue">{item.code}</Badge>}
                      </div>
                      <span className="eval-field-kicker">Batch Name</span>
                      <h2 className="asmt-batch-name">{item.batchName}</h2>
                      <p className="asmt-course-name">
                        <BookOpen size={14} />
                        <span>
                          <strong>Batch Title:</strong> {item.batchTitle}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="asmt-batch-stats-grid">
                    <div className="asmt-stat-box">
                      <span className="asmt-stat-label">Enrolled Candidates</span>
                      <div className="asmt-stat-value-row">
                        <Users size={15} className="asmt-stat-icon" />
                        <span className="asmt-stat-value">{item.enrolledCandidates}</span>
                      </div>
                    </div>

                    <div className="asmt-stat-box">
                      <span className="asmt-stat-label">Attended Students</span>
                      <div className="asmt-stat-value-row">
                        <UserCheck size={15} className="asmt-stat-icon" />
                        <span className="asmt-stat-value">{item.attendedStudents}</span>
                      </div>
                    </div>
                  </div>

                  <div className="eval-card-footer">
                    <button
                      type="button"
                      className="btn-primary-gradient eval-batch-btn"
                      onClick={() => handleSelectBatchForEvaluation(item.batch)}
                    >
                      <Award size={15} />
                      <span>Evaluate</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        /* ============================================================
           VIEW 2: STUDENT DETAILS PAGE FOR SELECTED BATCH
           ============================================================ */
        <div className="eval-details-screen">
          <div className="eval-screen-topbar">
            <button
              type="button"
              className="btn-secondary asmt-back-btn"
              onClick={handleBackToBatches}
            >
              <ArrowLeft size={15} />
              <span>Back to Batches</span>
            </button>

            <div className="breadcrumb-nav">
              <span>Assessment &amp; Evaluation</span>
              <span className="separator">/</span>
              <span>Evaluation</span>
              <span className="separator">/</span>
              <strong className="current">{selectedBatch.name}</strong>
            </div>
          </div>

          <div className="asmt-assignment-header-card">
            <div className="eval-details-header-row">
              <div className="asmt-assignment-title-block">
                <div className="asmt-batch-badges">
                  <Badge tone={getBatchStatusTone(selectedBatch.status || "Active")}>
                    {selectedBatch.status || "Active"}
                  </Badge>
                  <Badge tone="blue">{selectedBatch.name}</Badge>
                </div>
                <h1 className="module-title">Student Details</h1>
                <p className="module-sub">
                  Evaluate students in <strong>{selectedBatch.name}</strong>, allot marks, and
                  update saved evaluations.
                </p>
              </div>

              {studentDetailsData.assessmentsForBatch.length > 1 && (
                <div className="eval-assessment-selector">
                  <label htmlFor="eval-assessment-select">Active Assessment</label>
                  <select
                    id="eval-assessment-select"
                    value={studentDetailsData.activeAssessment?.id || ""}
                    onChange={(e) => setSelectedAssessmentId(e.target.value)}
                  >
                    {studentDetailsData.assessmentsForBatch.map((asmt) => (
                      <option key={asmt.id} value={asmt.id}>
                        {asmt.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="eval-summary-metrics">
              <div className="asmt-summary-kpi">
                <span className="asmt-summary-kpi-label">Selected Batch Name</span>
                <strong className="asmt-summary-kpi-value">{selectedBatch.name}</strong>
              </div>
              <div className="asmt-summary-kpi">
                <span className="asmt-summary-kpi-label">Total Students</span>
                <strong className="asmt-summary-kpi-value">
                  {studentDetailsData.totalStudents}
                </strong>
              </div>
              <div className="asmt-summary-kpi kpi-success">
                <span className="asmt-summary-kpi-label">Evaluated Students</span>
                <strong className="asmt-summary-kpi-value">
                  {studentDetailsData.evaluatedStudents}
                </strong>
              </div>
              <div className="asmt-summary-kpi kpi-warning">
                <span className="asmt-summary-kpi-label">Pending Evaluations</span>
                <strong className="asmt-summary-kpi-value">
                  {Math.max(
                    0,
                    studentDetailsData.totalStudents - studentDetailsData.evaluatedStudents
                  )}
                </strong>
              </div>
            </div>
          </div>

          <div className="submissions-table-card asmt-student-table-wrap">
            {studentDetailsData.rows.length === 0 ? (
              <div className="asmt-table-empty">
                <AlertCircle size={26} />
                <h3>No Enrolled Students Found</h3>
                <p>
                  No learner records are currently associated with{" "}
                  <strong>{selectedBatch.name}</strong>.
                </p>
              </div>
            ) : (
              <table className="dark-pro-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course Name</th>
                    <th>Assessment Title</th>
                    <th>Time Duration</th>
                    <th>Total Marks</th>
                    <th>Evaluation Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetailsData.rows.map((row) => (
                    <tr key={row.rowKey}>
                      <td>
                        <span className="table-main-title">{row.studentName}</span>
                        {row.studentEmail && (
                          <span className="asmt-student-sub">{row.studentEmail}</span>
                        )}
                      </td>
                      <td>
                        <span className="eval-course-label">{row.courseName}</span>
                      </td>
                      <td>
                        <span className="eval-assessment-title-cell">
                          <ClipboardCheck size={14} />
                          <span>{row.assessmentTitle}</span>
                        </span>
                      </td>
                      <td>
                        <span className="date-tag">
                          <Clock size={12} />
                          <span>{row.timeDuration}</span>
                        </span>
                      </td>
                      <td>
                        <strong className="eval-total-marks">{row.totalMarks}</strong>
                      </td>
                      <td>
                        <div className="eval-status-stack">
                          {row.isEvaluated ? (
                            <>
                              <Badge tone="success">Evaluated</Badge>
                              <span className="eval-obtained-marks-pill">
                                Obtained: <strong>{row.marksObtained}</strong> / {row.totalMarks}
                              </span>
                            </>
                          ) : (
                            <Badge tone="warning">Pending</Badge>
                          )}
                        </div>
                      </td>
                      <td className="text-right">
                        {row.isEvaluated ? (
                          <button
                            type="button"
                            className="btn-action-sm eval-edit-btn"
                            onClick={() => handleOpenEvaluationModal(row)}
                          >
                            <Edit3 size={13} />
                            <span>Edit Evaluation</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-action-sm eval-action-btn"
                            onClick={() => handleOpenEvaluationModal(row)}
                          >
                            <Award size={13} />
                            <span>Evaluate</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: STUDENT EVALUATION POPUP
         ============================================================ */}
      {evaluatingRow && (
        <div
          className="modal-backdrop"
          onClick={handleCloseEvaluationModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-evaluation-modal-title"
        >
          <div
            className="modal-dialog asmt-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="student-evaluation-modal-title">
                  {evaluatingRow.isEvaluated ? "Edit Student Evaluation" : "Student Evaluation"}
                </h2>
                <span className="modal-sub">
                  Review assessment details and enter marks obtained for this student.
                </span>
              </div>
              <button
                type="button"
                className="asmt-modal-close-btn"
                onClick={handleCloseEvaluationModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleMarksSubmit} noValidate>
              <div className="modal-body">
                <div className="asmt-confirm-summary-grid">
                  <div className="asmt-confirm-summary-row">
                    <span>Student Name</span>
                    <strong>{evaluatingRow.studentName}</strong>
                  </div>
                  <div className="asmt-confirm-summary-row">
                    <span>Course Name</span>
                    <strong>{evaluatingRow.courseName}</strong>
                  </div>
                  <div className="asmt-confirm-summary-row">
                    <span>Assessment Title</span>
                    <strong>{evaluatingRow.assessmentTitle}</strong>
                  </div>
                  <div className="asmt-confirm-summary-row highlight">
                    <span>Total Marks</span>
                    <strong>{evaluatingRow.totalMarks}</strong>
                  </div>
                </div>

                <div className="asmt-field-group">
                  <label className="asmt-field-label" htmlFor="eval-marks-obtained-input">
                    Marks Obtained <span className="asmt-required-mark">*</span>
                  </label>
                  <input
                    id="eval-marks-obtained-input"
                    type="number"
                    className="eval-marks-input"
                    min={0}
                    max={evaluatingRow.totalMarks}
                    step="any"
                    inputMode="decimal"
                    placeholder={`Enter marks (0 - ${evaluatingRow.totalMarks})`}
                    value={marksInput}
                    onKeyDown={handleMarksKeyDown}
                    onChange={(e) => {
                      setMarksInput(e.target.value);
                      if (formError) setFormError("");
                    }}
                    autoFocus
                  />
                  {formError && (
                    <span className="asmt-field-error" role="alert">
                      {formError}
                    </span>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseEvaluationModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-gradient">
                  Allot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Evaluation;
