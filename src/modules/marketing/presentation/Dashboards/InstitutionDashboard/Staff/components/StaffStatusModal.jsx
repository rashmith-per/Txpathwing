import { useState } from "react";
import { X, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { STAFF_STATUSES } from "../staffData.js";

export default function StaffStatusModal({ isOpen, staff, onClose, onConfirm }) {
  const [selectedStatus, setSelectedStatus] = useState(staff?.status || "Active");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !staff) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStatus === staff.status) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onConfirm(staff.id, selectedStatus, reason);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update status");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-modal-scrim" role="dialog" aria-modal="true" aria-labelledby="status-modal-title">
      <div className="staff-modal-card staff-modal-sm">
        <div className="staff-modal-header">
          <div className="modal-header-icon-box">
            <RefreshCw size={18} />
          </div>
          <div className="modal-header-titles">
            <h2 id="status-modal-title">Update Staff Status</h2>
            <p>{staff.name} ({staff.staffId})</p>
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

        <form onSubmit={handleSubmit} className="staff-modal-form">
          <div className="form-section-body">
            <div className="status-current-callout">
              <span className="text-muted">Current Status:</span>
              <strong className="current-status-val">{staff.status}</strong>
            </div>

            <div className="form-field-group">
              <label htmlFor="select-new-status">Transition to New Status</label>
              <select
                id="select-new-status"
                className="form-text-input"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {STAFF_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field-group">
              <label htmlFor="status-reason">Reason / Remarks (Optional)</label>
              <textarea
                id="status-reason"
                className="form-textarea-input"
                rows={2}
                placeholder="e.g. Sabbatical approved, Contract completed, Onboarding re-invited"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            {(selectedStatus === "Inactive" || selectedStatus === "On Leave") && (
              <div className="status-warning-box">
                <AlertTriangle size={16} />
                <span>
                  Notice: Setting status to <strong>{selectedStatus}</strong> will restrict active teaching schedules and notify department head.
                </span>
              </div>
            )}

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
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-action"
              disabled={isSubmitting || selectedStatus === staff.status}
            >
              {isSubmitting ? (
                <span>Updating...</span>
              ) : (
                <>
                  <CheckCircle size={14} />
                  <span>Confirm Status Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
