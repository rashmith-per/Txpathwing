import React from "react";
import { X } from "lucide-react";

export function EvaluationModal({
  evaluatingRow,
  marksInput,
  formError,
  onClose,
  onSubmit,
  onMarksChange,
  onMarksKeyDown
}) {
  if (!evaluatingRow) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
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
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate>
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
                onKeyDown={onMarksKeyDown}
                onChange={onMarksChange}
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
              onClick={onClose}
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
  );
}
