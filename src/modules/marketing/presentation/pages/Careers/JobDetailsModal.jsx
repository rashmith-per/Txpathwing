import React, { useEffect } from "react";
import { X, MapPin, Briefcase, Clock, CheckCircle, ArrowRight } from "lucide-react";
import "./JobDetailsModal.css";

const JobDetailsModal = ({ isOpen, onClose, job, onApply }) => {
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

  if (!isOpen || !job) return null;

  return (
    <div className="job-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
      <div className="job-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="job-modal-close" onClick={onClose} aria-label="Close job details">
          <X size={20} />
        </button>

        <div className="job-modal-content">
          <header className="job-modal-header">
            <div className="job-modal-department-badge">
              {job.department}
            </div>
            <h2 id="job-modal-title" className="job-modal-title">
              {job.title}
            </h2>

            <div className="job-modal-meta-row">
              <span className="job-modal-meta-item">
                <MapPin size={15} /> {job.location}
              </span>
              <span className="job-modal-meta-item">
                <Briefcase size={15} /> {job.employmentType}
              </span>
              <span className="job-modal-meta-item">
                <Clock size={15} /> {job.experience || "Experience as listed"}
              </span>
            </div>
          </header>

          <div className="job-modal-body">
            <section className="job-modal-section">
              <h3 className="job-modal-section-title">About the Role</h3>
              <p className="job-modal-text">{job.aboutRole || job.description}</p>
            </section>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="job-modal-section">
                <h3 className="job-modal-section-title">Key Responsibilities</h3>
                <ul className="job-modal-checklist">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <CheckCircle size={16} className="checklist-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section className="job-modal-section">
                <h3 className="job-modal-section-title">Qualifications & Skills</h3>
                <ul className="job-modal-checklist">
                  {job.requirements.map((req, i) => (
                    <li key={i}>
                      <CheckCircle size={16} className="checklist-icon" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="job-modal-section">
              <h3 className="job-modal-section-title">Required Competencies</h3>
              <div className="job-modal-skills">
                {job.skills.map((skill) => (
                  <span key={skill} className="job-modal-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <footer className="job-modal-footer">
            <button className="job-modal-back-btn" onClick={onClose}>
              Back to Open Roles
            </button>
            <button
              className="job-modal-apply-btn"
              onClick={() => {
                onClose();
                onApply(job);
              }}
            >
              <span>Apply for this Role</span>
              <ArrowRight size={16} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
