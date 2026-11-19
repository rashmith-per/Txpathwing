import React from "react";
import { CheckCircle2 } from "lucide-react";

export const ResumeSuccessView = ({ formData, resumeFile, onDone }) => {
  return (
    <div className="resume-modal-success">
      <div className="success-icon-wrap">
        <CheckCircle2 size={48} className="success-check-icon" />
      </div>
      <h3 className="success-title">Application Submitted!</h3>
      <p className="success-desc">
        Thank you, <strong>{formData.name}</strong>. We have received your profile for{" "}
        <strong>{formData.appliedRole}</strong>. Our talent acquisition team will review your application and reach out if there is a strong fit.
      </p>
      <div className="success-details-card">
        <div className="success-row">
          <span>Email:</span>
          <strong>{formData.email}</strong>
        </div>
        <div className="success-row">
          <span>Department:</span>
          <strong>{formData.area_of_interest}</strong>
        </div>
        {resumeFile && (
          <div className="success-row">
            <span>Resume Attached:</span>
            <strong>{resumeFile.name}</strong>
          </div>
        )}
      </div>
      <button className="resume-submit-btn" onClick={onDone}>
        Done
      </button>
    </div>
  );
};
