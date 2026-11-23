import { useState } from "react";
import { X, CheckCircle2, AlertCircle, BookPlus } from "lucide-react";
import {
  LearningProgramModel,
  PROGRAM_CATEGORIES
} from "../backend/models/LearningProgramModel.js";
import { DEPARTMENTS } from "../../Learners/backend/models/LearnerModel.js";
import { learningApi } from "../services/learningApi.js";

const generateInitialCode = () => `PRG-${Math.floor(100 + Math.random() * 900)}`;

export default function AddProgramModal({ isOpen, onClose, onSuccess, showMessage }) {
  const [formData, setFormData] = useState(() => ({
    name: "",
    code: generateInitialCode(),
    category: "SOFTWARE DEVELOPMENT",
    department: "CSE",
    duration: "12 weeks",
    instructor: "",
    state: "Active",
    description: "",
    tone: "blue"
  }));

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    setServerError("");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setServerError("");

    const validation = LearningProgramModel.validate(formData, false);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await learningApi.createProgram(formData);
      showMessage(`Program "${formData.name}" created successfully.`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setServerError(err.message || "Failed to create program");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon"><BookPlus size={18} /></span>
            <div>
              <h2>Create Learning Program</h2>
              <p>Add a new industry-aligned curriculum pathway for students.</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        {serverError && (
          <div className="staff-error-banner" style={{ margin: "16px 20px 0" }}>
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="staff-modal-body">
            <div className="form-field">
              <label>Program Name <span className="req-star">*</span></label>
              <input
                type="text"
                placeholder="e.g. Full Stack Engineering"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "field-error-input" : ""}
              />
              {errors.name && <span className="field-error-msg">{errors.name}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Program Code <span className="req-star">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. FSE-2026"
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
                  className={errors.code ? "field-error-input" : ""}
                />
                {errors.code && <span className="field-error-msg">{errors.code}</span>}
              </div>

              <div className="form-field">
                <label>Category <span className="req-star">*</span></label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  {PROGRAM_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                >
                  <option value="All departments">All departments</option>
                  {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 14 weeks"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Lead Instructor / Faculty <span className="req-star">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Meera Krishnan"
                  value={formData.instructor}
                  onChange={(e) => handleChange("instructor", e.target.value)}
                  className={errors.instructor ? "field-error-input" : ""}
                />
                {errors.instructor && <span className="field-error-msg">{errors.instructor}</span>}
              </div>

              <div className="form-field">
                <label>Initial Status</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Review due">Review due</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Program Overview & Objectives</label>
              <textarea
                rows={3}
                placeholder="Brief summary of program curriculum and outcomes..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="staff-modal-footer">
            <button type="button" className="secondary-action" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="primary-action btn-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner-inline" />
              ) : (
                <>
                  <CheckCircle2 size={16} /> Save Program
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
