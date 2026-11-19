import React from "react";
import { Plus, Pencil, X } from "lucide-react";

export function CourseModal({ mode, formData, setFormData, onClose, onSubmit }) {
  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal-window" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <div className="adm-modal-title-group">
            <div className="adm-modal-icon-wrap">
              {mode === "add" ? <Plus size={20} /> : <Pencil size={18} />}
            </div>
            <div>
              <h2 className="adm-modal-heading">{mode === "add" ? "Add New Course" : "Edit Course"}</h2>
              <p className="adm-modal-desc">
                {mode === "add"
                  ? "Configure catalog metadata, instructor, and publication status."
                  : "Update course curriculum, instructor, or status settings."}
              </p>
            </div>
          </div>
          <button className="adm-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="adm-modal-form">
          <div className="adm-modal-body">
            <div className="adm-form-grid">
              <div className="adm-form-field full-width">
                <label>Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Java Bootcamp"
                  value={formData.title}
                  onChange={e => handleChange("title", e.target.value)}
                />
              </div>

              <div className="adm-form-field">
                <label>Lead Instructor *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. R. Sharma"
                  value={formData.instructor}
                  onChange={e => handleChange("instructor", e.target.value)}
                />
              </div>

              <div className="adm-form-field">
                <label>Organization / Academy *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tech Academy"
                  value={formData.organization}
                  onChange={e => handleChange("organization", e.target.value)}
                />
              </div>

              <div className="adm-form-field">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={e => handleChange("category", e.target.value)}
                >
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="adm-form-field">
                <label>Publication Status</label>
                <select
                  value={formData.status}
                  onChange={e => handleChange("status", e.target.value)}
                >
                  <option value="Published">Published</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending Review">Pending Review</option>
                </select>
              </div>

              <div className="adm-form-field">
                <label>Course Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 12 Weeks"
                  value={formData.duration}
                  onChange={e => handleChange("duration", e.target.value)}
                />
              </div>

              <div className="adm-form-field">
                <label>Complexity Level</label>
                <select
                  value={formData.level}
                  onChange={e => handleChange("level", e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="adm-form-field">
                <label>Enrollments Count</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 420"
                  value={formData.enrollments}
                  onChange={e => handleChange("enrollments", e.target.value)}
                />
              </div>

              <div className="adm-form-field">
                <label>Rating (1.0 - 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  placeholder="e.g. 4.8"
                  value={formData.rating}
                  onChange={e => handleChange("rating", e.target.value)}
                />
              </div>

              <div className="adm-form-field">
                <label>Retail Price</label>
                <input
                  type="text"
                  placeholder="e.g. ₹4,999"
                  value={formData.price}
                  onChange={e => handleChange("price", e.target.value)}
                />
              </div>

              <div className="adm-form-field full-width">
                <label>Course Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide a brief summary of the course syllabus and learning outcomes..."
                  value={formData.description}
                  onChange={e => handleChange("description", e.target.value)}
                />
              </div>

              <div className="adm-form-field full-width">
                <label>Prerequisites</label>
                <input
                  type="text"
                  placeholder="e.g. Basic programming knowledge, OOP fundamentals"
                  value={formData.prerequisites}
                  onChange={e => handleChange("prerequisites", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="adm-modal-footer">
            <button type="button" className="adm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="adm-btn-primary">
              {mode === "add" ? "Create Course" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
