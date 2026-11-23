import { useState } from "react";
import { X, AlertCircle, CheckCircle2, Edit } from "lucide-react";
import {
  LearnerModel,
  DEPARTMENTS,
  BATCHES,
  GENDERS,
  DEFAULT_COURSES,
  LEARNER_STATUSES,
  ACCOUNT_STATUSES
} from "../backend/models/LearnerModel.js";
import { learnerApi } from "../services/learnerApi.js";

export default function EditLearnerModal({ isOpen, learner, onClose, onSuccess, showMessage }) {
  const [formData, setFormData] = useState(() => ({
    fullName: learner?.fullName || learner?.name || "",
    email: learner?.email || "",
    phone: learner?.phone || "",
    dob: learner?.dob || "",
    gender: learner?.gender || "Male",
    address: learner?.address || "",
    learnerId: learner?.learnerId || "",
    institution: learner?.institution || "KITS Warangal",
    department: learner?.department || "CSE",
    course: learner?.course || learner?.programme || "Full Stack Engineering",
    batch: learner?.batch || "2026–27",
    enrollmentDate: learner?.enrollmentDate || "",
    learningStatus: learner?.learningStatus || learner?.status || "On track",
    loginEmail: learner?.loginEmail || learner?.email || "",
    accountStatus: learner?.accountStatus || "Active",
    assignedRole: learner?.assignedRole || "student",
    progress: learner?.progress || 0
  }));

  const [activeTab, setActiveTab] = useState("personal");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !learner) return null;

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

    const validation = LearnerModel.validate(formData, true);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await learnerApi.updateLearner(learner.id, formData);
      showMessage(`Learner ${formData.fullName} updated successfully.`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      if (err.validationErrors) {
        setErrors(err.validationErrors);
      }
      setServerError(err.message || "Failed to update learner");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon"><Edit size={18} /></span>
            <div>
              <h2>Edit Learner</h2>
              <p>Update academic and profile information for {learner.fullName || learner.name}.</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        <div className="profile-tabs-nav" style={{ padding: "0 20px" }}>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "personal" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            1. Personal Info
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "academic" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("academic")}
          >
            2. Academic Info
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "account" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            3. Account & Progress
          </button>
        </div>

        {serverError && (
          <div className="staff-error-banner" style={{ margin: "16px 20px 0" }}>
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="staff-modal-body" style={{ minHeight: "360px" }}>
            {activeTab === "personal" && (
              <div className="form-section">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Full Name <span className="req-star">*</span></label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className={errors.fullName ? "field-error-input" : ""}
                    />
                    {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
                  </div>

                  <div className="form-field">
                    <label>Official Email <span className="req-star">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={errors.email ? "field-error-input" : ""}
                    />
                    {errors.email && <span className="field-error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Phone Number <span className="req-star">*</span></label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={errors.phone ? "field-error-input" : ""}
                    />
                    {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                  </div>

                  <div className="form-field">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Permanent Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="form-section">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Learner ID</label>
                    <input
                      type="text"
                      value={formData.learnerId}
                      disabled
                      style={{ background: "#f1f5f9" }}
                    />
                  </div>

                  <div className="form-field">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => handleChange("institution", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Department <span className="req-star">*</span></label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleChange("department", e.target.value)}
                      className={errors.department ? "field-error-input" : ""}
                    >
                      {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                    {errors.department && <span className="field-error-msg">{errors.department}</span>}
                  </div>

                  <div className="form-field">
                    <label>Enrolled Course / Programme <span className="req-star">*</span></label>
                    <select
                      value={formData.course}
                      onChange={(e) => handleChange("course", e.target.value)}
                      className={errors.course ? "field-error-input" : ""}
                    >
                      {DEFAULT_COURSES.map((course) => <option key={course} value={course}>{course}</option>)}
                    </select>
                    {errors.course && <span className="field-error-msg">{errors.course}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Batch Cohort</label>
                    <select
                      value={formData.batch}
                      onChange={(e) => handleChange("batch", e.target.value)}
                    >
                      {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Enrollment Date</label>
                    <input
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={(e) => handleChange("enrollmentDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Learning Status</label>
                  <select
                    value={formData.learningStatus}
                    onChange={(e) => handleChange("learningStatus", e.target.value)}
                  >
                    {LEARNER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="form-section">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Login Email</label>
                    <input
                      type="email"
                      value={formData.loginEmail}
                      onChange={(e) => handleChange("loginEmail", e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Account Status</label>
                    <select
                      value={formData.accountStatus}
                      onChange={(e) => handleChange("accountStatus", e.target.value)}
                    >
                      {ACCOUNT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Progress Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleChange("progress", parseInt(e.target.value || "0", 10))}
                  />
                </div>
              </div>
            )}
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
                  <CheckCircle2 size={16} /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
