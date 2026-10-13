import React from "react";
import { CheckCircle, Download, Eye, Share2 } from "lucide-react";
import CertificateDocument from "./CertificateDocument";

export default function CertificateFeaturedPreview({
  selectedCert,
  copiedId,
  onDownload,
  onOpenPreview,
  onCopyLink
}) {
  if (!selectedCert) return null;

  return (
    <div className="featured-cert-showcase">
      <CertificateDocument cert={selectedCert} />

      {/* Right side details & actions for selected certificate */}
      <div className="featured-cert-actions-panel">
        <div className="verified-status-box">
          <CheckCircle size={18} color="#16a34a" />
          <div>
            <strong>Proctored &amp; Identity Verified</strong>
            <p>Recipient: {selectedCert.studentName} ({selectedCert.tenant})</p>
          </div>
        </div>

        <div className="cert-action-buttons-stack">
          <button
            type="button"
            className="btn-cert-primary"
            onClick={() => onDownload(selectedCert)}
          >
            <Download size={16} />
            <span>Download / Print PDF</span>
          </button>

          <button
            type="button"
            className="btn-cert-secondary"
            onClick={() => onOpenPreview(selectedCert)}
          >
            <Eye size={16} />
            <span>Full Screen Preview</span>
          </button>

          <button
            type="button"
            className="btn-cert-secondary"
            onClick={() => onCopyLink(selectedCert.id)}
          >
            <Share2 size={16} />
            <span>
              {copiedId === selectedCert.id
                ? "✓ Verification Link Copied!"
                : "Copy Credential Link"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
