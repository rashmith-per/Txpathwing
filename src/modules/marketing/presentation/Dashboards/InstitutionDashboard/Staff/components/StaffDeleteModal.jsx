import { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";

export default function StaffDeleteModal({ isOpen, staff, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !staff) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await onConfirm(staff.id);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete staff record.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="staff-modal-scrim" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
      <div className="staff-modal-card staff-modal-sm">
        <div className="staff-modal-header header-destructive">
          <div className="modal-header-icon-box box-destructive">
            <Trash2 size={18} />
          </div>
          <div className="modal-header-titles">
            <h2 id="delete-modal-title">Delete Staff Record</h2>
            <p>Irreversible action requiring administrative authorization</p>
          </div>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="form-section-body">
          <div className="delete-warning-card">
            <AlertTriangle size={24} className="warning-icon" />
            <div className="warning-text">
              <p>
                Are you sure you want to permanently delete{" "}
                <strong>{staff.name}</strong> ({staff.staffId}) from the{" "}
                <strong>{staff.department}</strong> department?
              </p>
              <small>All assigned course affiliations and access privileges will be revoked.</small>
            </div>
          </div>

          {error && (
            <div className="form-error-banner">
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="staff-modal-footer">
          <button
            type="button"
            className="secondary-action"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="destructive-action"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Permanently Delete Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}
