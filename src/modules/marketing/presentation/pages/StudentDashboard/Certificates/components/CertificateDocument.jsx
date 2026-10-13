import React from "react";
import txIcon from "../../../../../../../assets/tx-icon.jpg";

export default function CertificateDocument({ cert, isModal = false }) {
  if (!cert) return null;

  return (
    <div className={`cert-document-preview ${isModal ? "modal-version" : ""}`}>
      <div className="cert-doc-inner">
        <div className="cert-doc-header">
          <div className="cert-doc-brand">
            <img
              src={txIcon}
              alt=""
              style={{ width: "30px", height: "30px", objectFit: "contain", borderRadius: "6px" }}
            />
            <span className="cert-doc-brandname">Pathwing</span>
          </div>
          <span className="cert-doc-id">
            {isModal ? `CREDENTIAL ID: ${cert.id}` : `ID: ${cert.id}`}
          </span>
        </div>

        <div className="cert-doc-body">
          <span className="cert-doc-Subtitle">
            {isModal ? "OFFICIAL CERTIFICATE OF ACHIEVEMENT" : "CERTIFICATE OF COMPLETION"}
          </span>
          <h2 className="cert-doc-student">{cert.studentName}</h2>
          <p className="cert-doc-Statement">
            {isModal
              ? "has successfully passed the proctored examination and demonstrated mastery in"
              : "has successfully completed the proctored assessment and practical coursework for"}
          </p>
          <h3 className="cert-doc-course" style={{ color: cert.color }}>
            {cert.title}
          </h3>

          <div className="cert-doc-skills">
            {cert.skills.map((skill) => (
              <span key={skill} className="cert-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="cert-doc-footer">
          <div>
            <span className="doc-foot-lbl">
              {isModal ? "DATE OF ISSUE" : "ISSUED ON"}
            </span>
            <strong className="doc-foot-val">{cert.issuedDate}</strong>
          </div>
          <div>
            <span className="doc-foot-lbl">
              {isModal ? "ASSESSMENT GRADE" : "SCORE / GRADE"}
            </span>
            <strong className="doc-foot-val" style={{ color: "#16a34a" }}>
              {cert.grade}
            </strong>
          </div>
          <div>
            <span className="doc-foot-lbl">
              {isModal ? "VERIFIED BY" : "ISSUING AUTHORITY"}
            </span>
            <strong className="doc-foot-val">{cert.issuer}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
