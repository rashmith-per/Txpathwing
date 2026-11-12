import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Info,
  Layers,
  Play,
  Send,
  UserCheck,
  Users,
  X
} from "lucide-react";
import { Badge } from "../common/Badge";
import {
  assignStudentsToAssessment,
  createBatchAssessmentRecord,
  getAssessmentAssignmentSummary,
  normalizeText,
  resolveBatchCourseAndSyllabus,
  resolveBatchStudents
} from "./assessmentUtils";
import "./Assessments.css";

/**
 * Batch-Based Assessment Management module for the Instructor Dashboard
 * (Advanced Monolithic Model).
 *
 * Reads live batches, courses, and learners directly from parent state
 * and persists batch assessments + student assignments in frontend state / localStorage.
 */
export function Assessments({
  batches = [],
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  onCreateAssessment,
  onAssignAssessmentStudents,
  onNavigate
}) {
  const [activeSelection, setActiveSelection] = useState(null);
  // activeSelection shape: { assessmentId, batchId }

  // Modal 1: Create Assessment
  const [createTargetBatch, setCreateTargetBatch] = useState(null);
  const [assessmentTitleInput, setAssessmentTitleInput] = useState("");
  const [createFormError, setCreateFormError] = useState("");

  // Modal 2: Individual Student Assignment Confirmation
  const [studentToAssign, setStudentToAssign] = useState(null);

  // Modal 3: Bulk Assignment Confirmation
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);

  // Feedback banner / toast
  const [feedbackNotice, setFeedbackNotice] = useState(null);
  // { type: "success" | "info" | "warning", message: string, showNavActions?: boolean }

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

  // Resolve active batch + assessment live from props so edits/deletions stay synced
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

  // Enrich all batches with resolved course/syllabus and enrollment count
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

  // Active assignment screen data
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

  // Handlers
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

  return (
    <div className="instructor-assessments-page">
      {feedbackNotice && (
        <div
          className={`asmt-toast-banner ${feedbackNotice.type}`}
          role="status"
          aria-live="polite"
        >
          <div className="asmt-toast-content">
            {feedbackNotice.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <Info size={18} />
            )}
            <span>{feedbackNotice.message}</span>
          </div>
          <div className="asmt-toast-actions">
            {feedbackNotice.showNavActions && typeof onNavigate === "function" && (
              <>
                <button
                  type="button"
                  className="asmt-toast-link"
                  onClick={() => onNavigate("My Courses")}
                >
                  My Courses
                </button>
                <button
                  type="button"
                  className="asmt-toast-link"
                  onClick={() => onNavigate("Batches")}
                >
                  Batches
                </button>
              </>
            )}
            <button
              type="button"
              className="asmt-toast-close"
              onClick={() => setFeedbackNotice(null)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          VIEW A: ALL BATCH CARDS FOR ASSESSMENT MANAGEMENT
         ============================================================ */}
      {!activeAssessment || !activeBatch ? (
        <>
          <div className="module-header-row">
            <div>
              <h1 className="module-title">Assessment</h1>
              <p className="module-sub">
                Select a batch to create assessments and assign tests directly to enrolled students.
              </p>
            </div>
            <div className="asmt-header-summary-pill">
              <Layers size={15} />
              <span>{batches.length} {batches.length === 1 ? "Batch" : "Batches"}</span>
              <span className="asmt-pill-divider" />
              <ClipboardCheck size={15} />
              <span>
                {batchAssessments.length} Saved {batchAssessments.length === 1 ? "Assessment" : "Assessments"}
              </span>
            </div>
          </div>

          {enrichedBatches.length === 0 ? (
            <div className="asmt-empty-state-card">
              <div className="asmt-empty-icon-wrap">
                <Layers size={28} />
              </div>
              <h2>No Batches Available</h2>
              <p>
                Create a batch in Batch Management first. Any batch created, updated, or removed
                there appears here automatically.
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
            <div className="asmt-batches-grid">
              {enrichedBatches.map(({ batch, syllabus, enrolledCount }) => (
                <article key={batch.id} className="asmt-batch-card">
                  <div className="asmt-batch-card-top">
                    <div className="asmt-batch-title-group">
                      <div className="asmt-batch-badges">
                        {batch.code && <Badge tone="blue">{batch.code}</Badge>}
                        {batch.status && (
                          <Badge tone={String(batch.status).toLowerCase() === "active" ? "success" : "neutral"}>
                            {batch.status}
                          </Badge>
                        )}
                      </div>
                      <h2 className="asmt-batch-name">{batch.name}</h2>
                      <p className="asmt-course-name">
                        <BookOpen size={14} />
                        <span>{syllabus.courseName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="asmt-batch-stats-grid">
                    <div className="asmt-stat-box">
                      <span className="asmt-stat-label">Enrolled Students</span>
                      <div className="asmt-stat-value-row">
                        <Users size={15} className="asmt-stat-icon" />
                        <span className="asmt-stat-value">{enrolledCount}</span>
                      </div>
                    </div>

                    <div className="asmt-stat-box">
                      <span className="asmt-stat-label">Covered Syllabus</span>
                      <div className="asmt-stat-value-row">
                        <ClipboardCheck size={15} className="asmt-stat-icon" />
                        <span className="asmt-stat-value">{syllabus.syllabusLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="asmt-progress-section">
                    <div className="asmt-progress-header">
                      <span>Syllabus Completion</span>
                      <strong>{syllabus.completionPercentage}%</strong>
                    </div>
                    <div className="asmt-progress-track">
                      <div
                        className="asmt-progress-fill"
                        style={{ width: `${syllabus.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="asmt-batch-actions">
                    <button
                      type="button"
                      className="btn-secondary asmt-btn-half"
                      onClick={() => handlePracticeClick(batch)}
                    >
                      <Play size={14} />
                      <span>Practice</span>
                    </button>
                    <button
                      type="button"
                      className="btn-primary-gradient asmt-btn-half asmt-btn-center"
                      onClick={() => handleOpenCreateModal(batch)}
                    >
                      <ClipboardCheck size={15} />
                      <span>Assessment</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        /* ============================================================
           VIEW B: STUDENT ASSESSMENT ASSIGNMENT SCREEN
           ============================================================ */
        <div className="asmt-assignment-screen">
          <div className="asmt-screen-topbar">
            <button
              type="button"
              className="btn-secondary asmt-back-btn"
              onClick={() => {
                setActiveSelection(null);
                setStudentToAssign(null);
                setIsBulkConfirmOpen(false);
              }}
            >
              <ArrowLeft size={15} />
              <span>Back to Batches</span>
            </button>
          </div>

          <div className="asmt-assignment-header-card">
            <div className="asmt-assignment-title-block">
              {!isPracticeActive && (
                <div className="asmt-batch-badges">
                  <Badge tone="blue">{activeBatch.name}</Badge>
                  {activeCourseInfo?.courseName && (
                    <Badge tone="neutral">{activeCourseInfo.courseName}</Badge>
                  )}
                </div>
              )}
              <h1 className="module-title">{activeAssessment.title}</h1>
              <p className="module-sub">
                Assign this {activeTypeLower} to individual students or across {activeBatch.name}.
              </p>
            </div>

            <div className="asmt-summary-metrics">
              <div className="asmt-summary-kpi">
                <span className="asmt-summary-kpi-label">Batch Name</span>
                <strong className="asmt-summary-kpi-value">{activeBatch.name}</strong>
              </div>
              <div className="asmt-summary-kpi">
                <span className="asmt-summary-kpi-label">
                  {isPracticeActive ? "Assessment Type" : "Assessment Title"}
                </span>
                <strong className="asmt-summary-kpi-value">{activeAssessment.title}</strong>
              </div>
              <div className="asmt-summary-kpi">
                <span className="asmt-summary-kpi-label">Total Enrolled Students</span>
                <strong className="asmt-summary-kpi-value">{activeSummary.totalStudents}</strong>
              </div>
              <div className="asmt-summary-kpi kpi-success">
                <span className="asmt-summary-kpi-label">Assigned Students</span>
                <strong className="asmt-summary-kpi-value">{activeSummary.assignedCount}</strong>
              </div>
              <div className="asmt-summary-kpi kpi-warning">
                <span className="asmt-summary-kpi-label">Pending Students</span>
                <strong className="asmt-summary-kpi-value">{activeSummary.pendingCount}</strong>
              </div>
            </div>
          </div>

          {activeRoster.matchSource === "course_fallback" && (
            <div className="asmt-data-note-banner">
              <Info size={16} />
              <span>
                Displaying existing learners enrolled in <strong>{activeCourseInfo?.courseName}</strong>.
                Direct per-batch IDs and attendance logs are not present in the existing frontend learner records.
              </span>
            </div>
          )}

          <div className="submissions-table-card asmt-student-table-wrap">
            {activeRoster.students.length === 0 ? (
              <div className="asmt-table-empty">
                <AlertCircle size={26} />
                <h3>No Enrolled Student Records Found</h3>
                <p>
                  No learner records in the existing frontend dataset are associated with{" "}
                  <strong>{activeBatch.name}</strong> ({activeCourseInfo?.courseName}).
                </p>
              </div>
            ) : (
              <table className="dark-pro-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Attendance Status</th>
                    <th>Assessment Assignment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRoster.students.map((student) => {
                    const isAssigned = activeSummary.assignedStudentIds.has(student.id);
                    return (
                      <tr key={student.id}>
                        <td className="asmt-student-id-cell">{student.id}</td>
                        <td>
                          <span className="table-main-title">{student.name}</span>
                          {student.email && (
                            <span className="asmt-student-sub">{student.email}</span>
                          )}
                        </td>
                        <td>
                          <Badge tone={getAttendanceTone(student.attendanceStatus)}>
                            {student.attendanceStatus}
                          </Badge>
                        </td>
                        <td>
                          {isAssigned ? (
                            <Badge tone="success">Assigned</Badge>
                          ) : (
                            <Badge tone="warning">Pending</Badge>
                          )}
                        </td>
                        <td>
                          {isAssigned ? (
                            <button
                              type="button"
                              className="asmt-assigned-btn"
                              disabled
                            >
                              <UserCheck size={14} />
                              <span>Assigned</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-action-sm asmt-assign-test-btn"
                              onClick={() => setStudentToAssign(student)}
                            >
                              <Send size={13} />
                              <span>Assign Test</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div className="asmt-bulk-footer-bar">
            <div className="asmt-bulk-footer-status">
              {activeSummary.allAssigned ? (
                <div className="asmt-all-assigned-notice">
                  <CheckCircle2 size={18} />
                  <span>
                    {activeTypeLabel} has already been assigned to all students in {activeBatch.name}.
                  </span>
                </div>
              ) : activeRoster.students.length > 0 ? (
                <div className="asmt-pending-hint">
                  <Clock size={16} />
                  <span>
                    {activeSummary.pendingCount} pending student
                    {activeSummary.pendingCount === 1 ? "" : "s"} will receive this{" "}
                    {activeTypeLower} when bulk assigned (all attendance statuses included).
                  </span>
                </div>
              ) : (
                <div className="asmt-pending-hint">
                  <Info size={16} />
                  <span>
                    Assign {activeTypeLabel} to {activeBatch.name} becomes active when student
                    records exist for this batch.
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn-primary-gradient asmt-bulk-btn"
              disabled={activeRoster.students.length === 0 || activeSummary.allAssigned}
              onClick={() => setIsBulkConfirmOpen(true)}
            >
              <ClipboardCheck size={16} />
              <span>
                Assign {activeTypeLabel} to {activeBatch.name}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 1: CREATE ASSESSMENT POPUP
         ============================================================ */}
      {activeCreateTargetBatch && (
        <div
          className="modal-backdrop"
          onClick={handleCloseCreateModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-assessment-title"
        >
          <div
            className="modal-dialog asmt-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="create-assessment-title">Create Assessment</h2>
                <span className="modal-sub">
                  Enter an assessment title to start assigning tests to enrolled learners.
                </span>
              </div>
              <button
                type="button"
                className="asmt-modal-close-btn"
                onClick={handleCloseCreateModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body">
                <div className="asmt-field-group">
                  <label className="asmt-field-label" htmlFor="create-asmt-batch-name">
                    Batch Name
                  </label>
                  <input
                    id="create-asmt-batch-name"
                    type="text"
                    className="asmt-readonly-input"
                    value={activeCreateTargetBatch.name}
                    readOnly
                  />
                </div>

                <div className="asmt-field-group">
                  <label className="asmt-field-label" htmlFor="create-asmt-title">
                    Assessment Title <span className="asmt-required-mark">*</span>
                  </label>
                  <input
                    id="create-asmt-title"
                    type="text"
                    value={assessmentTitleInput}
                    onChange={(e) => {
                      setAssessmentTitleInput(e.target.value);
                      if (createFormError) setCreateFormError("");
                    }}
                    placeholder="e.g., Core Java Mid-Module Assessment"
                    autoFocus
                  />
                  {createFormError && (
                    <span className="asmt-field-error" role="alert">
                      {createFormError}
                    </span>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseCreateModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-gradient">
                  Start
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: INDIVIDUAL STUDENT ASSIGNMENT CONFIRMATION
         ============================================================ */}
      {studentToAssign && activeAssessment && activeBatch && (
        <div
          className="modal-backdrop"
          onClick={() => setStudentToAssign(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="assign-student-modal-title"
        >
          <div
            className="modal-dialog asmt-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="assign-student-modal-title">Assign {activeTypeLabel}</h2>
                <span className="modal-sub">
                  Confirm individual test assignment details below.
                </span>
              </div>
              <button
                type="button"
                className="asmt-modal-close-btn"
                onClick={() => setStudentToAssign(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="asmt-field-group">
                <label className="asmt-field-label">Batch Name</label>
                <input
                  type="text"
                  className="asmt-readonly-input"
                  value={activeBatch.name}
                  readOnly
                />
              </div>

              <div className="asmt-field-group">
                <label className="asmt-field-label">
                  {isPracticeActive ? "Assessment Type" : "Assessment Title"}
                </label>
                <input
                  type="text"
                  className="asmt-readonly-input"
                  value={activeAssessment.title}
                  readOnly
                />
              </div>

              <div className="asmt-field-group">
                <label className="asmt-field-label">Student Name</label>
                <input
                  type="text"
                  className="asmt-readonly-input"
                  value={studentToAssign.name}
                  readOnly
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStudentToAssign(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary-gradient"
                onClick={handleConfirmIndividualAssignment}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 3: BULK ASSIGNMENT TO BATCH CONFIRMATION
         ============================================================ */}
      {isBulkConfirmOpen && activeAssessment && activeBatch && (
        <div
          className="modal-backdrop"
          onClick={() => setIsBulkConfirmOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bulk-assign-modal-title"
        >
          <div
            className="modal-dialog asmt-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="bulk-assign-modal-title">
                  Assign {activeTypeLabel} to {activeBatch.name}
                </h2>
                <span className="modal-sub">
                  Review enrollment totals before confirming batch-wide assignment.
                </span>
              </div>
              <button
                type="button"
                className="asmt-modal-close-btn"
                onClick={() => setIsBulkConfirmOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="asmt-confirm-summary-grid">
                <div className="asmt-confirm-summary-row">
                  <span>Batch Name</span>
                  <strong>{activeBatch.name}</strong>
                </div>
                <div className="asmt-confirm-summary-row">
                  <span>{isPracticeActive ? "Assessment Type" : "Assessment Title"}</span>
                  <strong>{activeAssessment.title}</strong>
                </div>
                <div className="asmt-confirm-summary-row">
                  <span>Total Enrolled Students</span>
                  <strong>{activeSummary.totalStudents}</strong>
                </div>
                <div className="asmt-confirm-summary-row">
                  <span>Already Assigned Students</span>
                  <strong>{activeSummary.assignedCount}</strong>
                </div>
                <div className="asmt-confirm-summary-row highlight">
                  <span>Students Pending Assignment</span>
                  <strong>{activeSummary.pendingCount}</strong>
                </div>
              </div>

              <div className="asmt-bulk-confirm-message">
                {activeSummary.allAssigned
                  ? `${activeTypeLabel} has already been assigned to all students in ${activeBatch.name}.`
                  : `Are you sure you want to assign this ${activeTypeLower} to all students in ${activeBatch.name}?`}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsBulkConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary-gradient"
                disabled={activeSummary.allAssigned || activeSummary.pendingCount === 0}
                onClick={handleConfirmBulkAssignment}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessments;
