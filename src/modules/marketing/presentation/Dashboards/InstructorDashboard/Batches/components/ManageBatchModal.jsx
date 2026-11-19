import React from "react";
import { BookOpen, Calendar, Clock, Edit3, Trash2, Users, X } from "lucide-react";
import { Badge } from "../../common/Badge";
import { CATEGORY_META } from "../batchUtils.js";

export function ManageBatchModal({
  selectedBatch,
  onClose,
  editMode,
  setEditMode,
  editEnrolled,
  setEditEnrolled,
  editCapacity,
  setEditCapacity,
  editCompletion,
  setEditCompletion,
  editSchedule,
  setEditSchedule,
  editStatus,
  setEditStatus,
  onSaveEdits,
  onDelete
}) {
  if (!selectedBatch) return null;

  const catMeta = CATEGORY_META[selectedBatch.category] || CATEGORY_META["General"];

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
        style={{ width: "min(580px, 100%)" }}
      >
        <div className="cohort-modal-header">
          <div>
            <span className="cohort-code-badge">{selectedBatch.code}</span>
            <h2 className="cohort-modal-title" style={{ marginTop: "6px" }}>
              {selectedBatch.name}
            </h2>
          </div>
          <button
            type="button"
            className="cohort-modal-close-btn"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className={`cohort-category-tag ${catMeta.tone}`}>
                {catMeta.icon} {selectedBatch.category}
              </span>
              <Badge tone={selectedBatch.status === "Active" ? "success" : "purple"}>
                {selectedBatch.status}
              </Badge>
            </div>

            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: editMode ? "#eff6ff" : "#f8fafc",
                border: "1px solid #cbd5e1",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                color: editMode ? "#1d4ed8" : "#334155"
              }}
              onClick={() => setEditMode(!editMode)}
            >
              <Edit3 size={13} />
              <span>{editMode ? "Cancel Editing" : "Edit Batch Data"}</span>
            </button>
          </div>

          {!editMode ? (
            <>
              <div className="cohort-meta-details">
                <div className="cohort-meta-item">
                  <BookOpen size={14} />
                  <span>
                    <strong>Associated Course:</strong> {selectedBatch.courseName}
                  </span>
                </div>
                <div className="cohort-meta-item">
                  <Clock size={14} />
                  <span>
                    <strong>Live Schedule:</strong> {selectedBatch.schedule}
                  </span>
                </div>
                <div className="cohort-meta-item">
                  <Calendar size={14} />
                  <span>
                    <strong>Duration:</strong> {selectedBatch.startDate} to {selectedBatch.endDate}
                  </span>
                </div>
                <div className="cohort-meta-item">
                  <Users size={14} />
                  <span>
                    <strong>Enrollment:</strong> {selectedBatch.enrolled} / {selectedBatch.capacity} seats filled (
                    {Math.round(((selectedBatch.enrolled || 0) / (selectedBatch.capacity || 1)) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="cohort-capacity-section">
                <div className="capacity-head-row">
                  <span className="label">Curriculum Completion</span>
                  <span className="value">{selectedBatch.completion}%</span>
                </div>
                <div className="cohort-progress-track">
                  <div
                    className="cohort-progress-fill purple"
                    style={{ width: `${selectedBatch.completion}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#1e293b" }}>
                  Enrolled Learners
                  <input
                    type="number"
                    min="0"
                    max={editCapacity}
                    value={editEnrolled}
                    onChange={(e) => setEditEnrolled(e.target.value)}
                    className="cohort-form-input"
                    style={{ marginTop: "4px" }}
                  />
                </label>

                <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#1e293b" }}>
                  Total Capacity
                  <input
                    type="number"
                    min="1"
                    value={editCapacity}
                    onChange={(e) => setEditCapacity(e.target.value)}
                    className="cohort-form-input"
                    style={{ marginTop: "4px" }}
                  />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#1e293b" }}>
                  Curriculum Progress (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editCompletion}
                    onChange={(e) => setEditCompletion(e.target.value)}
                    className="cohort-form-input"
                    style={{ marginTop: "4px" }}
                  />
                </label>

                <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#1e293b" }}>
                  Batch Status
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="cohort-form-input"
                    style={{ marginTop: "4px" }}
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
              </div>

              <label style={{ fontSize: "12.5px", fontWeight: 600, color: "#1e293b" }}>
                Weekly Schedule
                <input
                  type="text"
                  value={editSchedule}
                  onChange={(e) => setEditSchedule(e.target.value)}
                  className="cohort-form-input"
                  style={{ marginTop: "4px" }}
                />
              </label>

              <button
                type="button"
                className="btn-modal-publish"
                style={{ alignSelf: "flex-end", marginTop: "6px" }}
                onClick={onSaveEdits}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="cohort-modal-footer" style={{ justifyContent: "space-between" }}>
          <button
            type="button"
            style={{
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
            onClick={() => onDelete(selectedBatch.id, selectedBatch.name)}
          >
            <Trash2 size={14} />
            <span>Delete Batch</span>
          </button>

          <button
            type="button"
            className="btn-modal-cancel"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
