import { useState } from "react";
import { X, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ComplianceReviewModal({ isOpen, requirement, onClose, onSave, showMessage }) {
  const [status, setStatus] = useState(() => requirement?.state || "In review");
  const [remarks, setRemarks] = useState(
    () => requirement?.remarks || (requirement ? `Verified requirements for ${requirement.name}.` : "")
  );

  if (!isOpen || !requirement) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(requirement.name, status, remarks);
    showMessage(`Compliance item "${requirement.name}" updated to "${status}".`);
    onClose();
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "520px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon"><ShieldCheck size={18} /></span>
            <div>
              <h2>Review Compliance Requirement</h2>
              <p>{requirement.name} · {requirement.category}</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="staff-modal-body">
            <div className="form-field">
              <label>Requirement Name</label>
              <input type="text" value={requirement.name} disabled style={{ background: "#f1f5f9" }} />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Due Date</label>
                <input type="text" value={requirement.due} disabled style={{ background: "#f1f5f9" }} />
              </div>

              <div className="form-field">
                <label>Responsible Owner</label>
                <input type="text" value={requirement.owner} disabled style={{ background: "#f1f5f9" }} />
              </div>
            </div>

            <div className="form-field">
              <label>Compliance Status <span className="req-star">*</span></label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Complete">Complete</option>
                <option value="In review">In review</option>
                <option value="Action needed">Action needed</option>
              </select>
            </div>

            <div className="form-field">
              <label>Review Notes & Sign-off</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Audit observation, verification details or document references..."
              />
            </div>
          </div>

          <div className="staff-modal-footer">
            <button type="button" className="secondary-action" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-action btn-submit">
              <CheckCircle2 size={16} /> Save Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
