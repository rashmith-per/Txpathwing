import React from "react";
import { Upload, FileText, Send } from "lucide-react";

export const ResumeFormFields = ({
  formData,
  handleChange,
  resumeFile,
  handleFileChange,
  isSubmitting,
  onCancel,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="resume-form">
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
        />
      </div>

      <div className="form-actions">
        <button type="button" className="resume-cancel-btn" onClick={onCancel} disabled={isSubmitting}>
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
  );
};
