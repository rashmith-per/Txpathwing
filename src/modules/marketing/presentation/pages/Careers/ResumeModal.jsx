import React, { useState, useEffect } from "react";
import { X, AlertCircle, Briefcase } from "lucide-react";
import { ResumeSuccessView } from "./components/ResumeSuccessView";
import { ResumeFormFields } from "./components/ResumeFormFields";
import "./ResumeModal.css";

const ResumeModal = ({ isOpen, onClose, selectedJob = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area_of_interest: selectedJob ? selectedJob.department : "Technology",
    experience: selectedJob ? selectedJob.experience : "0-2 Years",
    appliedRole: selectedJob ? selectedJob.title : "General Application",
    linkedin: "",
    github: "",
    portfolio: "",
    message: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        appliedRole: selectedJob.title,
        area_of_interest: selectedJob.department,
        experience: selectedJob.experience || "0-2 Years",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        appliedRole: "General Application",
      }));
    }
    setIsSuccess(false);
    setErrorMsg("");
  }, [selectedJob, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("File size exceeds 5MB. Please upload a smaller file.");
        return;
      }
      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
        setErrorMsg("Please upload a PDF or DOC/DOCX document.");
        return;
      }
      setErrorMsg("");
      setResumeFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in your name, email, and contact number.");
      return;
    }
    if (!resumeFile) {
      setErrorMsg("Please attach your resume file (PDF or DOCX).");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setResumeFile(null);
    onClose();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
      <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="resume-modal-close" onClick={onClose} aria-label="Close application modal">
          <X size={20} />
        </button>

        {isSuccess ? (
          <ResumeSuccessView
            formData={formData}
            resumeFile={resumeFile}
            onDone={handleResetAndClose}
          />
        ) : (
          <div className="resume-modal-content">
            <div className="resume-modal-header">
              <span className="resume-badge">
                <Briefcase size={13} /> {selectedJob ? "Job Application" : "Direct Resume Submission"}
              </span>
              <h2 id="resume-modal-title" className="resume-modal-heading">
                {selectedJob ? `Apply for ${selectedJob.title}` : "Join the TX Pathwing Team"}
              </h2>
              <p className="resume-modal-subheading">
                {selectedJob
                  ? `Submit your credentials for this ${selectedJob.department} role in ${selectedJob.location}.`
                  : "Tell us about your background, skills, and where you see yourself making a real difference."}
              </p>
            </div>

            {errorMsg && (
              <div className="resume-modal-alert">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <ResumeFormFields
              formData={formData}
              handleChange={handleChange}
              resumeFile={resumeFile}
              handleFileChange={handleFileChange}
              isSubmitting={isSubmitting}
              onCancel={onClose}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
