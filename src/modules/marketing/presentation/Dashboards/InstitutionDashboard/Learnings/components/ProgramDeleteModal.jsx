import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { learningApi } from "../services/learningApi.js";

export default function ProgramDeleteModal({ isOpen, program, onClose, onSuccess, showMessage }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !program) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");
      await learningApi.deleteProgram(program.id);
      showMessage(`Program "${program.name || program.title}" deleted.`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete program");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "480px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>
              <AlertTriangle size={18} />
            </span>
            <div>
              <h2 style={{ color: "#b91c1c" }}>Delete Learning Program</h2>
              <p>This action cannot be undone.</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        <div className="staff-modal-body">
          {error && (
            <div className="staff-error-banner" style={{ marginBottom: "14px" }}>
              <span>{error}</span>
            </div>
          )}
          <p style={{ margin: "0 0 12px", color: "var(--ink)", lineHeight: 1.5 }}>
            Are you sure you want to delete <strong>{program.name || program.title}</strong> ({program.code})?
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
            All curriculum modules, topics, and learner enrollment records linked to this program will be permanently removed.
          </p>
        </div>

        <div className="staff-modal-footer">
          <button type="button" className="secondary-action" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button
            type="button"
            className="destructive-action"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <span className="spinner-inline" /> : <><Trash2 size={15} /> Delete Program</>}
          </button>
        </div>
      </div>
    </div>
  );
}
