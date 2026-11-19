import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

export function DeleteSubscriptionModal({ tenant, onClose, onConfirm }) {
  return (
    <div className="sub-modal-backdrop" onClick={onClose}>
      <div className="sub-modal sub-modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="sub-danger-icon">
          <AlertTriangle size={20} />
        </div>
        <h2>Delete subscription?</h2>
        <p className="sub-muted">
          This removes <strong>{tenant.name}</strong> and its{" "}
          {tenant.seats.toLocaleString("en-IN")} contracted seats. This can't be undone.
        </p>
        <div className="sub-modal-actions">
          <button className="secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="sub-danger-btn" onClick={onConfirm}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
