import React from "react";
import { Check, Send, X } from "lucide-react";

export function BlogContributorModal({
  formData,
  setFormData,
  isSubmitted,
  handleSubmit,
  closeModal
}) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="contributor-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div className="modal-label">
              <span />
              CONTRIBUTOR APPLICATION
            </div>
            <h2>Share Your Story</h2>
            <p>
              Tell us what you would like to write about and our editorial team will get back to you.
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <div className="modal-content">
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">
                <Check size={30} />
              </div>
              <h3>Application Received</h3>
              <p>
                Thank you, <strong>{formData.name}</strong>. Our editorial
                team will review your idea and contact you at{" "}
                <strong>{formData.email}</strong>.
              </p>
              <button
                type="button"
                className="success-button"
                onClick={closeModal}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contributor-form">
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>I am a *</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="Student">B.Tech / Degree Student</option>
                    <option value="Software Engineer">
                      Software Engineer / Placed Alumni
                    </option>
                    <option value="Educator">College Educator / Faculty</option>
                    <option value="Industry Mentor">
                      Industry Mentor / Corporate Lead
                    </option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Primary Topic *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Career Guidance & Roadmaps">
                      Career Guidance & Roadmaps
                    </option>
                    <option value="Internship & Placement Experience">
                      Internship & Placement Experience
                    </option>
                    <option value="Full-Stack & System Design">
                      Full-Stack & System Design
                    </option>
                    <option value="AI, ML & Cloud Technologies">
                      AI, ML & Cloud Technologies
                    </option>
                    <option value="Student Project Case Studies">
                      Student Project Case Studies
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Article Topic & Short Pitch *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about the article, tutorial, project or experience you would like to share..."
                  value={formData.pitch}
                  onChange={(e) =>
                    setFormData({ ...formData, pitch: e.target.value })
                  }
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="submit-button">
                  <span>Submit Application</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
