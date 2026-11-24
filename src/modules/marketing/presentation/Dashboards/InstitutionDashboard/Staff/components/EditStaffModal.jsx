import { useState, useEffect } from "react";
import {
  X,
  Pencil,
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
  ROLE_DEFINITIONS,
} from "../staffData.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

export default function EditStaffModal({ isOpen, staff, onClose, onSave }) {
  const [activeSection, setActiveSection] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: staff?.name || "",
    email: staff?.email || "",
    phone: staff?.phone || "",
    dob: staff?.dob || "",
    gender: staff?.gender || "Male",
    address: staff?.address || "",
    staffId: staff?.staffId || "",
    department: staff?.department || "CSE",
    designation: staff?.designation || "",
    employmentType: staff?.employmentType || "Full-time",
    joiningDate: staff?.joiningDate || "",
    category: staff?.category || "Teaching",
    reportingManager: staff?.reportingManager || "",
    qualification: staff?.qualification || "",
    experience: staff?.experience || "",
    username: staff?.username || "",
    status: staff?.status || "Active",
    role: staff?.role || "faculty",
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        dob: staff.dob || "",
        gender: staff.gender || "Male",
        address: staff.address || "",
        staffId: staff.staffId || "",
        department: staff.department || "CSE",
        designation: staff.designation || "",
        employmentType: staff.employmentType || "Full-time",
        joiningDate: staff.joiningDate || "",
        category: staff.category || "Teaching",
        reportingManager: staff.reportingManager || "",
        qualification: staff.qualification || "",
        experience: staff.experience || "",
        username: staff.username || "",
        status: staff.status || "Active",
        role: staff.role || "faculty",
      });
      setErrors({});
      setServerError("");
    }
  }, [staff]);

  if (!isOpen || !staff) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      await onSave(staff.id, formData);
      onClose();
    } catch (err) {
      setServerError(err.message || "Failed to update staff member.");
      if (err.field) {
        setErrors((prev) => ({ ...prev, [err.field]: err.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-modal-scrim" role="dialog" aria-modal="true" aria-labelledby="edit-staff-title">
      <div className="staff-modal-card staff-modal-lg">
        {/* Modal Header */}
        <div className="staff-modal-header">
          <div className="modal-header-icon-box">
            <Pencil size={18} />
          </div>
          <div className="modal-header-titles">
            <h2 id="edit-staff-title">Edit Staff Profile: {staff.name}</h2>
            <p>Update employment credentials, designation, contact info, or permissions</p>
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
          >
            <User size={15} />
            <span>1. Personal Information</span>
          </button>

          <button
            type="button"
            className={`section-tab-btn ${activeSection === "professional" ? "active-tab" : ""}`}
            onClick={() => setActiveSection("professional")}
          >
            <Building size={15} />
            <span>2. Professional Information</span>
          </button>

          <button
            type="button"
            className={`section-tab-btn ${activeSection === "account" ? "active-tab" : ""}`}
            onClick={() => setActiveSection("account")}
          >
            <Shield size={15} />
            <span>3. Account & Role</span>
          </button>
        </div>

        {serverError && (
          <div className="form-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="staff-modal-form">
          {/* SECTION 1: Personal Details */}
          {activeSection === "personal" && (
            <div className="form-section-body">
              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label htmlFor="edit-staff-name">
                    Full Name <span className="field-required">*</span>
                  </label>
                  <input
                    id="edit-staff-name"
                    type="text"
                    className={`form-text-input ${errors.name ? "input-has-error" : ""}`}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-email">
                    Official Email <span className="field-required">*</span>
                  </label>
                  <input
                    id="edit-staff-email"
                    type="email"
                    className={`form-text-input ${errors.email ? "input-has-error" : ""}`}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-phone">
                    Phone Number <span className="field-required">*</span>
                  </label>
                  <input
                    id="edit-staff-phone"
                    type="tel"
                    className={`form-text-input ${errors.phone ? "input-has-error" : ""}`}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                  {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-gender">Gender</label>
                  <select
                    id="edit-staff-gender"
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
                  <label htmlFor="edit-staff-dob">Date of Birth</label>
                  <input
                    id="edit-staff-dob"
                    type="date"
                    className="form-text-input"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field-group full-width-field">
                <label htmlFor="edit-staff-address">Residential / Official Address</label>
                <textarea
                  id="edit-staff-address"
                  className="form-textarea-input"
                  rows={2}
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
                  <label htmlFor="edit-staff-id">
                    Staff ID <span className="field-required">*</span>
                  </label>
                  <input
                    id="edit-staff-id"
                    type="text"
                    className={`form-text-input ${errors.staffId ? "input-has-error" : ""}`}
                    value={formData.staffId}
                    onChange={(e) => handleChange("staffId", e.target.value.toUpperCase())}
                    required
                  />
                  {errors.staffId && <span className="field-error-msg">{errors.staffId}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-dept">
                    Department <span className="field-required">*</span>
                  </label>
                  <select
                    id="edit-staff-dept"
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
                  <label htmlFor="edit-staff-desig">
                    Designation / Title <span className="field-required">*</span>
                  </label>
                  <input
                    id="edit-staff-desig"
                    type="text"
                    className={`form-text-input ${errors.designation ? "input-has-error" : ""}`}
                    value={formData.designation}
                    onChange={(e) => handleChange("designation", e.target.value)}
                    required
                  />
                  {errors.designation && (
                    <span className="field-error-msg">{errors.designation}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-emp-type">Employment Type</label>
                  <select
                    id="edit-staff-emp-type"
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
                  <label htmlFor="edit-staff-category">Staff Category</label>
                  <select
                    id="edit-staff-category"
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
                  <label htmlFor="edit-staff-joining-date">
                    Joining Date <span className="field-required">*</span>
                  </label>
                  <input
                    id="edit-staff-joining-date"
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
                  <label htmlFor="edit-staff-manager">Reporting Manager</label>
                  <input
                    id="edit-staff-manager"
                    type="text"
                    className="form-text-input"
                    value={formData.reportingManager}
                    onChange={(e) => handleChange("reportingManager", e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-qual">Qualification</label>
                  <input
                    id="edit-staff-qual"
                    type="text"
                    className="form-text-input"
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
                  <label htmlFor="edit-staff-username">Username</label>
                  <input
                    id="edit-staff-username"
                    type="text"
                    className="form-text-input"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-staff-status">Account Status</label>
                  <select
                    id="edit-staff-status"
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
                        name="edit-staff-role"
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

            <button
              type="submit"
              className="primary-action btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner-inline" />
                  <span>Updating Staff...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={15} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
