import React from "react";
import { AlertCircle, ChevronDown, X } from "lucide-react";

export function CreateBatchModal({
  isOpen,
  onClose,
  formError,
  newBatchName,
  setNewBatchName,
  newCourseName,
  setNewCourseName,
  newSchedule,
  setNewSchedule,
  newCapacity,
  setNewCapacity,
  availableCourses,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div
      className="cohort-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="cohort-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cohort-modal-header">
          <h2 className="cohort-modal-title">Create New Batch</h2>
          <button
            type="button"
            className="cohort-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {formError && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "14px"
            }}
          >
            <AlertCircle size={16} />
            <span>{formError}</span>
          </div>
        )}

        <form className="cohort-modal-form" onSubmit={onSubmit}>
          <div className="cohort-form-group">
            <label className="cohort-form-label">Batch Name</label>
            <input
              type="text"
              className="cohort-form-input"
              placeholder="e.g. AWS DevOps Spring Intensive 2027"
              value={newBatchName}
              onChange={(e) => setNewBatchName(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="cohort-form-group">
            <label className="cohort-form-label">Associated Course</label>
            <div className="cohort-select-wrapper">
              <select
                className="cohort-form-select"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
              >
                {availableCourses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="cohort-select-arrow">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div className="cohort-form-group">
            <label className="cohort-form-label">Weekly Schedule</label>
            <input
              type="text"
              className="cohort-form-input"
              placeholder="Mon, Wed, Fri · 6:00 PM – 8:00 PM"
              value={newSchedule}
              onChange={(e) => setNewSchedule(e.target.value)}
            />
          </div>

          <div className="cohort-form-group">
            <label className="cohort-form-label">Student Capacity</label>
            <input
              type="number"
              className="cohort-form-input"
              min="1"
              max="1000"
              placeholder="120"
              value={newCapacity}
              onChange={(e) => setNewCapacity(e.target.value)}
            />
          </div>

          <div className="cohort-modal-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-modal-publish">
              Publish Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
