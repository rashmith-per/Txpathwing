import { useState } from "react";
import {
  X,
  UserPlus,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Building,
  Shield,
  User,
} from "lucide-react";
import { departments } from "../../Overview/overviewData.js";
import {
  EMPLOYMENT_TYPES,
  STAFF_CATEGORIES,
  STAFF_STATUSES,
  GENDERS,
  EMAIL_REGEX,
  PHONE_REGEX,
} from "../backend/models/StaffModel.js";
import { STAFF_ROLES, ROLE_DEFINITIONS } from "../backend/models/StaffRoleModel.js";

export default function AddStaffModal({ isOpen, onClose, onSave }) {
  const [activeSection, setActiveSection] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Personal
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",

    // Professional
    staffId: `STF-${Math.floor(1000 + Math.random() * 9000)}`,
    department: departments[0]?.name || "CSE",
    designation: "Assistant Professor",
    employmentType: "Full-time",
    joiningDate: new Date().toISOString().split("T")[0],
    category: "Teaching",
    reportingManager: "Prof. K. Ashoka Reddy (Principal)",
    qualification: "M.Tech / Ph.D",
    experience: "5 Years",

    // Account
    username: "",
    status: "Active",
    role: STAFF_ROLES.FACULTY,
  });

  if (!isOpen) return null;

  const generateNewStaffId = () => {
    const randomId = `STF-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData((prev) => ({ ...prev, staffId: randomId }));
    if (errors.staffId) {
      setErrors((prev) => ({ ...prev, staffId: null }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-sync username from email if not manually altered
      if (field === "email" && !prev.username) {
        next.username = value.split("@")[0] || "";
      }
      return next;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
    setServerError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = "Please enter a valid official email address.";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number (min 7 digits).";
    }

    if (!formData.staffId.trim()) errs.staffId = "Staff ID is required.";
    if (!formData.designation.trim()) errs.designation = "Job designation is required.";
    if (!formData.joiningDate) errs.joiningDate = "Joining date is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // Navigate to first section with error
      if (errors.name || errors.email || errors.phone) {
        setActiveSection("personal");
      } else if (errors.staffId || errors.designation || errors.joiningDate) {
        setActiveSection("professional");
      }
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setServerError(err.message || "Failed to create staff member.");
      if (err.field) {
        setErrors((prev) => ({ ...prev, [err.field]: err.message }));
        if (err.field === "email" || err.field === "phone") setActiveSection("personal");
        if (err.field === "staffId") setActiveSection("professional");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-modal-scrim" role="dialog" aria-modal="true" aria-labelledby="add-staff-title">
      <div className="staff-modal-card staff-modal-lg">
        {/* Modal Header */}
        <div className="staff-modal-header">
          <div className="modal-header-icon-box">
            <UserPlus size={18} />
          </div>
          <div className="modal-header-titles">
            <h2 id="add-staff-title">Enroll New Staff Member</h2>
            <p>Add faculty, administrative, or technical staff to institution registry</p>
          </div>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Navigation Tabs */}
        <div className="form-sections-nav" role="tablist">
          <button
            type="button"
            className={`section-tab-btn ${activeSection === "personal" ? "active-tab" : ""}`}
            onClick={() => setActiveSection("personal")}
            role="tab"
            aria-selected={activeSection === "personal"}
          >
            <User size={15} />
            <span>1. Personal Information</span>
            {(errors.name || errors.email || errors.phone) && (
              <span className="tab-error-dot" />
            )}
          </button>

          <button
            type="button"
            className={`section-tab-btn ${activeSection === "professional" ? "active-tab" : ""}`}
            onClick={() => setActiveSection("professional")}
            role="tab"
            aria-selected={activeSection === "professional"}
          >
            <Building size={15} />
            <span>2. Professional Information</span>
            {(errors.staffId || errors.designation || errors.joiningDate) && (
              <span className="tab-error-dot" />
            )}
          </button>

          <button
            type="button"
            className={`section-tab-btn ${activeSection === "account" ? "active-tab" : ""}`}
            onClick={() => setActiveSection("account")}
            role="tab"
            aria-selected={activeSection === "account"}
          >
            <Shield size={15} />
            <span>3. Account & Role</span>
          </button>
        </div>

        {/* Global Server Error Banner */}
        {serverError && (
          <div className="form-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="staff-modal-form">
          {/* SECTION 1: Personal Details */}
          {activeSection === "personal" && (
            <div className="form-section-body">
              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label htmlFor="staff-name">
                    Full Name <span className="field-required">*</span>
                  </label>
                  <input
                    id="staff-name"
                    type="text"
                    className={`form-text-input ${errors.name ? "input-has-error" : ""}`}
                    placeholder="e.g. Dr. Rajesh K. Varma"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-email">
                    Official Email <span className="field-required">*</span>
                  </label>
                  <input
                    id="staff-email"
                    type="email"
                    className={`form-text-input ${errors.email ? "input-has-error" : ""}`}
                    placeholder="rajesh.v@kitsw.ac.in"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-phone">
                    Phone Number <span className="field-required">*</span>
                  </label>
                  <input
                    id="staff-phone"
                    type="tel"
                    className={`form-text-input ${errors.phone ? "input-has-error" : ""}`}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                  {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-gender">Gender</label>
                  <select
                    id="staff-gender"
                    className="form-text-input"
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-dob">Date of Birth</label>
                  <input
                    id="staff-dob"
                    type="date"
                    className="form-text-input"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field-group full-width-field">
                <label htmlFor="staff-address">Residential / Official Address</label>
                <textarea
                  id="staff-address"
                  className="form-textarea-input"
                  rows={2}
                  placeholder="Street name, Quarter number, City, State, PIN"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* SECTION 2: Professional Details */}
          {activeSection === "professional" && (
            <div className="form-section-body">
              <div className="form-grid-2col">
                <div className="form-field-group">
                  <div className="label-with-addon">
                    <label htmlFor="staff-id">
                      Staff ID <span className="field-required">*</span>
                    </label>
                    <button
                      type="button"
                      className="btn-text-sparkle"
                      onClick={generateNewStaffId}
                      title="Auto-generate a unique staff identifier"
                    >
                      <Sparkles size={12} /> Auto-Generate
                    </button>
                  </div>
                  <input
                    id="staff-id"
                    type="text"
                    className={`form-text-input ${errors.staffId ? "input-has-error" : ""}`}
                    value={formData.staffId}
                    onChange={(e) => handleChange("staffId", e.target.value.toUpperCase())}
                    required
                  />
                  {errors.staffId && <span className="field-error-msg">{errors.staffId}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-dept">
                    Department <span className="field-required">*</span>
                  </label>
                  <select
                    id="staff-dept"
                    className="form-text-input"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    required
                  >
                    {departments.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} Engineering
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-desig">
                    Designation / Title <span className="field-required">*</span>
                  </label>
                  <input
                    id="staff-desig"
                    type="text"
                    className={`form-text-input ${errors.designation ? "input-has-error" : ""}`}
                    placeholder="e.g. Associate Professor"
                    value={formData.designation}
                    onChange={(e) => handleChange("designation", e.target.value)}
                    required
                  />
                  {errors.designation && (
                    <span className="field-error-msg">{errors.designation}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-emp-type">Employment Type</label>
                  <select
                    id="staff-emp-type"
                    className="form-text-input"
                    value={formData.employmentType}
                    onChange={(e) => handleChange("employmentType", e.target.value)}
                  >
                    {EMPLOYMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-category">Staff Category</label>
                  <select
                    id="staff-category"
                    className="form-text-input"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    {STAFF_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-joining-date">
                    Joining Date <span className="field-required">*</span>
                  </label>
                  <input
                    id="staff-joining-date"
                    type="date"
                    className={`form-text-input ${errors.joiningDate ? "input-has-error" : ""}`}
                    value={formData.joiningDate}
                    onChange={(e) => handleChange("joiningDate", e.target.value)}
                    required
                  />
                  {errors.joiningDate && (
                    <span className="field-error-msg">{errors.joiningDate}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-manager">Reporting Manager</label>
                  <input
                    id="staff-manager"
                    type="text"
                    className="form-text-input"
                    value={formData.reportingManager}
                    onChange={(e) => handleChange("reportingManager", e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-qual">Qualification</label>
                  <input
                    id="staff-qual"
                    type="text"
                    className="form-text-input"
                    placeholder="e.g. Ph.D. in Computer Science"
                    value={formData.qualification}
                    onChange={(e) => handleChange("qualification", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: Account & Role Details */}
          {activeSection === "account" && (
            <div className="form-section-body">
              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label htmlFor="staff-username">Username</label>
                  <input
                    id="staff-username"
                    type="text"
                    className="form-text-input"
                    placeholder="Login username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="staff-status">Initial Account Status</label>
                  <select
                    id="staff-status"
                    className="form-text-input"
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    {STAFF_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="role-selection-box">
                <label className="section-label-strong">Assign Role & System Permissions</label>
                <div className="role-cards-list">
                  {Object.values(ROLE_DEFINITIONS).map((r) => (
                    <label
                      key={r.id}
                      className={`role-option-card ${formData.role === r.id ? "role-card-active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="staff-role"
                        value={r.id}
                        checked={formData.role === r.id}
                        onChange={(e) => handleChange("role", e.target.value)}
                        className="role-radio-input"
                      />
                      <div className="role-option-info">
                        <div className="role-name-row">
                          <strong>{r.name}</strong>
                          <span className="role-pill-preview">{r.id}</span>
                        </div>
                        <p>{r.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="staff-modal-footer">
            <button
              type="button"
              className="secondary-action"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <div className="footer-right-buttons">
              {activeSection !== "account" ? (
                <button
                  type="button"
                  className="primary-action"
                  onClick={() => {
                    if (activeSection === "personal") setActiveSection("professional");
                    else if (activeSection === "professional") setActiveSection("account");
                  }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="primary-action btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner-inline" />
                      <span>Saving Staff...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={15} />
                      <span>Save & Enroll Staff</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
