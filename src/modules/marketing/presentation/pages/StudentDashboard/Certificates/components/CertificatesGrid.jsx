import React from "react";
import { Award, CheckCircle, Download, ExternalLink } from "lucide-react";

export default function CertificatesGrid({
  certificates = [],
  selectedCert,
  onSelectCert,
  onDownload,
  onOpenPreview
}) {
  return (
    <>
      <div className="certs-section-heading">
        <h3>All Earned Certificates ({certificates.length})</h3>
        <span>Click any certificate card to preview</span>
      </div>

      <div className="certs-grid">
        {certificates.map((c) => {
          const isSelected = selectedCert?.id === c.id;
          return (
            <div
              className={`cert-card ${isSelected ? "selected" : ""}`}
              key={c.id}
              onClick={() => onSelectCert(c)}
            >
              <div className="cert-card-top-row">
                <div
                  className="cert-badge-icon"
                  style={{ backgroundColor: `${c.color}15`, color: c.color }}
                >
                  <Award size={28} />
                </div>

                <div className="cert-status-pill">
                  <CheckCircle size={12} color="#16a34a" />
                  <span>{c.badgeText}</span>
                </div>
              </div>

              <h3 className="cert-card-title">{c.title}</h3>
              <p className="cert-card-issuer">{c.issuer}</p>

              <div className="cert-meta-box">
                <div className="cert-meta-row">
                  <span className="meta-lbl">Issued Date</span>
                  <span className="meta-val">{c.issuedDate}</span>
                </div>
                <div className="cert-meta-row">
                  <span className="meta-lbl">Final Score</span>
                  <span className="meta-val highlight">{c.grade}</span>
                </div>
                <div className="cert-meta-row">
                  <span className="meta-lbl">Credential ID</span>
                  <span className="meta-val monospace">{c.id}</span>
                </div>
              </div>

              <div className="cert-actions-row">
                <button
                  type="button"
                  className="btn-download-cert"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(c);
                  }}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  className="btn-preview-cert"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPreview(c);
                  }}
                  title="Preview Certificate"
                >
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
