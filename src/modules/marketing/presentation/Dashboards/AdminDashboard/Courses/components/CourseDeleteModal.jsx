import React from "react";
import { AlertTriangle } from "lucide-react";

export function CourseDeleteModal({ course, onCancel, onConfirm }) {
  if (!course) return null;
  return (
    <div className="adm-modal-overlay" onClick={onCancel}>
      <div className="adm-delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adm-delete-icon-wrap">
          <AlertTriangle size={32} className="adm-delete-icon" />
        </div>
        <h3 className="adm-delete-title">Delete Course</h3>
        <p className="adm-delete-message">
          Are you sure you want to delete <strong>"{course.title}"</strong>? This will permanently remove the course and its enrollment records.
        </p>
        <div className="adm-delete-actions">
          <button className="adm-btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="adm-btn-danger" onClick={onConfirm}>
            Yes, Delete Course
          </button>
        </div>
      </div>
    </div>
  );
}
