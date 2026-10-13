import React from "react";
import { Download, X } from "lucide-react";
import CertificateDocument from "./CertificateDocument";

export default function CertificateModal({ previewModalCert, onClose }) {
  if (!previewModalCert) return null;

  return (
    <div className="cert-modal-backdrop" onClick={onClose}>
      <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-topbar">
          <span>Official Credential Preview — {previewModalCert.id}</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn-modal-print"
              onClick={() => window.print()}
            >
              <Download size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              className="btn-modal-close"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <CertificateDocument cert={previewModalCert} isModal={true} />
      </div>
    </div>
  );
}
