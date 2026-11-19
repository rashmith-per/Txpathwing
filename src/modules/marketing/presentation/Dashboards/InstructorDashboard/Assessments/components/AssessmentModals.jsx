import React from "react";
import { X } from "lucide-react";

export function AssessmentModals({
  // Modal 1: Create Assessment
  activeCreateTargetBatch,
  assessmentTitleInput,
  createFormError,
  onCloseCreateModal,
  onCreateSubmit,
  onTitleInputChange,
  // Modal 2: Individual Assignment
  studentToAssign,
  activeAssessment,
  activeBatch,
  isPracticeActive,
  activeTypeLabel,
  activeTypeLower,
  onCloseAssignSingle,
  onConfirmAssignSingle,
  // Modal 3: Bulk Assignment
  isBulkConfirmOpen,
  activeSummary,
  onCloseBulkConfirm,
  onConfirmBulkAssignment
}) {
  return (
    <>
      {/* MODAL 1: CREATE ASSESSMENT */}
      {activeCreateTargetBatch && (
        <div
          className="modal-backdrop"
          onClick={onCloseCreateModal}
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
                onClick={onCloseCreateModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={onCreateSubmit}>
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
                    onChange={onTitleInputChange}
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
                  onClick={onCloseCreateModal}
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

      {/* MODAL 2: INDIVIDUAL STUDENT ASSIGNMENT */}
      {studentToAssign && activeAssessment && activeBatch && (
        <div
          className="modal-backdrop"
          onClick={onCloseAssignSingle}
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
                onClick={onCloseAssignSingle}
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
                onClick={onCloseAssignSingle}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary-gradient"
                onClick={onConfirmAssignSingle}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BULK ASSIGNMENT TO BATCH */}
      {isBulkConfirmOpen && activeAssessment && activeBatch && (
        <div
          className="modal-backdrop"
          onClick={onCloseBulkConfirm}
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
                onClick={onCloseBulkConfirm}
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
                onClick={onCloseBulkConfirm}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary-gradient"
                disabled={activeSummary.allAssigned || activeSummary.pendingCount === 0}
                onClick={onConfirmBulkAssignment}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
