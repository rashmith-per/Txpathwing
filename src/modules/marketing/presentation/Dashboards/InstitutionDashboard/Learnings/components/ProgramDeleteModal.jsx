import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ProgramDeleteModal({ isOpen, program, onClose, onSuccess, showMessage }) {
  if (!isOpen || !program) return null;

  const handleDelete = () => {
    if (showMessage) showMessage(`Program "${program.name || program.title}" deleted.`);
    if (onSuccess) onSuccess(program.id);
    onClose();
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
          <p style={{ margin: "0 0 12px", color: "var(--ink)", lineHeight: 1.5 }}>
            Are you sure you want to delete <strong>{program.name || program.title}</strong> ({program.code})?
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
            All curriculum modules, topics, and learner enrollment records linked to this program will be removed from view.
          </p>
        </div>

        <div className="staff-modal-footer">
          <button type="button" className="secondary-action" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="destructive-action"
            onClick={handleDelete}
          >
            <Trash2 size={15} /> Delete Program
          </button>
        </div>
      </div>
    </div>
  );
}
