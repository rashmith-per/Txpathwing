import React, { useState, useEffect } from "react";
import { X, Upload, CheckCircle2, AlertCircle, Send, Briefcase, FileText } from "lucide-react";
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
        experience: selectedJob.experience || "0-2 Years"
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        appliedRole: "General Application"
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
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
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

    // Simulate clean frontend submission preparing for future POST /api/careers/apply/
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
            <button className="resume-submit-btn" onClick={handleResetAndClose}>
              Done
            </button>
          </div>
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

            <form onSubmit={handleSubmit} className="resume-form">
              <div className="form-grid-two">
                <div className="form-group">
                  <label htmlFor="res-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    name="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-group">
                  <label htmlFor="res-phone">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-area">
                    Area of Interest <span className="req">*</span>
                  </label>
                  <select
                    id="res-area"
                    name="area_of_interest"
                    value={formData.area_of_interest}
                    onChange={handleChange}
                    required
                  >
                    <option value="Technology">Technology & Engineering</option>
                    <option value="Training">Training & Mentorship</option>
                    <option value="Design">UI/UX & Product Design</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Student Success">Student Success & Support</option>
                    <option value="Operations">Operations & HR</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-group">
                  <label htmlFor="res-exp">Experience Level</label>
                  <select
                    id="res-exp"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="Fresher / Student">Fresher / Student</option>
                    <option value="0-1 Years">0 - 1 Years</option>
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="res-role">Role Title</label>
                  <input
                    id="res-role"
                    type="text"
                    name="appliedRole"
                    value={formData.appliedRole}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
              </div>

              <div className="form-grid-three">
                <div className="form-group">
                  <label htmlFor="res-linkedin">LinkedIn Profile</label>
                  <input
                    id="res-linkedin"
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-github">GitHub Profile</label>
                  <input
                    id="res-github"
                    type="url"
                    name="github"
                    placeholder="https://github.com/..."
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-portfolio">Portfolio / Website</label>
                  <input
                    id="res-portfolio"
                    type="url"
                    name="portfolio"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Resume File Upload */}
              <div className="form-group">
                <label>
                  Resume / CV (PDF or DOCX, max 5MB) <span className="req">*</span>
                </label>
                <div className={`file-dropzone ${resumeFile ? "file-selected" : ""}`}>
                  <input
                    type="file"
                    id="resume-file-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="file-hidden-input"
                  />
                  <label htmlFor="resume-file-input" className="file-dropzone-label">
                    {resumeFile ? (
                      <div className="file-picked-info">
                        <FileText size={22} className="file-picked-icon" />
                        <div>
                          <strong>{resumeFile.name}</strong>
                          <small>({(resumeFile.size / 1024).toFixed(0)} KB) — Click to replace</small>
                        </div>
                      </div>
                    ) : (
                      <div className="file-placeholder-info">
                        <Upload size={22} className="file-upload-icon" />
                        <span><strong>Click to choose file</strong> or drag & drop</span>
                        <small>Supported formats: PDF, DOC, DOCX up to 5MB</small>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="res-message">Cover Note / Message</label>
                <textarea
                  id="res-message"
                  name="message"
                  rows="3"
                  placeholder="Share what excites you about joining TX Pathwing and any relevant highlights..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="resume-cancel-btn" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="resume-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
