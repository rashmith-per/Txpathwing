import React, { useEffect } from "react";
import { X } from "lucide-react";

export function CouponModal({ title, onClose, children }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="cp-overlay" onMouseDown={onClose}>
      <div
        className="cp-modal"
        role="dialog"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="cp-modal-head">
          <h3>{title}</h3>
          <button className="cp-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
