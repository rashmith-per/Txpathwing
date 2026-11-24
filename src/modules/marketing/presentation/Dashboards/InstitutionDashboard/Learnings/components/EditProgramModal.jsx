import { useState } from "react";
import { X, CheckCircle2, Edit } from "lucide-react";
import { PROGRAM_CATEGORIES, DEPARTMENTS } from "../learningsData.js";

export default function EditProgramModal({ isOpen, program, onClose, onSuccess, showMessage }) {
  const [formData, setFormData] = useState(() => ({
    name: program?.name || program?.title || "",
    code: program?.code || "",
    category: program?.category || "SOFTWARE DEVELOPMENT",
    department: program?.department || "CSE",
    duration: program?.duration || "12 weeks",
    instructor: program?.instructor || "",
    state: program?.state || program?.status || "Active",
    description: program?.description || "",
    tone: program?.tone || "blue"
  }));

  const [errors, setErrors] = useState({});

  if (!isOpen || !program) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Program name is required";
    if (!formData.code.trim()) newErrors.code = "Program code is required";
    if (!formData.instructor.trim()) newErrors.instructor = "Instructor name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedProgram = {
      ...program,
      ...formData,
      title: formData.name,
      status: formData.state
    };

    if (showMessage) showMessage(`Program "${formData.name}" updated successfully.`);
    if (onSuccess) onSuccess(updatedProgram);
    onClose();
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon"><Edit size={18} /></span>
            <div>
              <h2>Edit Learning Program</h2>
              <p>Update curriculum parameters for {program.name || program.title}.</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="staff-modal-body">
            <div className="form-field">
              <label>Program Name <span className="req-star">*</span></label>
              <input
                type="text"
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
                  value={formData.instructor}
                  onChange={(e) => handleChange("instructor", e.target.value)}
                  className={errors.instructor ? "field-error-input" : ""}
                />
                {errors.instructor && <span className="field-error-msg">{errors.instructor}</span>}
              </div>

              <div className="form-field">
                <label>Status</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Review due">Review due</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Program Overview & Objectives</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="staff-modal-footer">
            <button type="button" className="secondary-action" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-action btn-submit">
              <CheckCircle2 size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
