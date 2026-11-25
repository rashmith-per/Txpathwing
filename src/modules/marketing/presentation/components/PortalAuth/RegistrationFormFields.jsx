import React from "react";
import { User, Building2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import LogoUploadField from "./LogoUploadField";

export default function RegistrationFormFields({
  form,
  errors,
  config,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrength,
  handleChange,
}) {
  return (
    <>
      {/* Logo Upload Field */}
      <LogoUploadField
        logo={form.logo}
        onLogoChange={(data) => handleChange("logo", data)}
        label={`${config.title} Logo`}
      />

      <div className="reg-fields-grid">
        {/* Username */}
        <div className="reg-field">
          <label htmlFor="reg-username">Username *</label>
          <div className={`reg-input-box ${errors.username ? "error" : ""}`}>
            <User size={16} className="reg-field-icon" />
            <input
              id="reg-username"
              type="text"
              placeholder="e.g. Vamshi"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              required
            />
          </div>
          {errors.username && <span className="field-err">{errors.username}</span>}
        </div>

        {/* Dynamic Entity Name */}
        <div className="reg-field">
          <label htmlFor="reg-entity-name">{config.entityLabel} *</label>
          <div className={`reg-input-box ${errors.entityName ? "error" : ""}`}>
            <Building2 size={16} className="reg-field-icon" />
            <input
              id="reg-entity-name"
              type="text"
              placeholder={config.entityPlaceholder}
              value={form.entityName}
              onChange={(e) => handleChange("entityName", e.target.value)}
              required
            />
          </div>
          {errors.entityName && <span className="field-err">{errors.entityName}</span>}
        </div>
      </div>

      {/* Official Email */}
      <div className="reg-field full-width">
        <label htmlFor="reg-email">Official Email Address *</label>
        <div className={`reg-input-box ${errors.email ? "error" : ""}`}>
          <Mail size={16} className="reg-field-icon" />
          <input
            id="reg-email"
            type="email"
            placeholder="admin@organization.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        {errors.email && <span className="field-err">{errors.email}</span>}
      </div>

      <div className="reg-fields-grid">
        {/* Password */}
        <div className="reg-field">
          <div className="label-with-strength">
            <label htmlFor="reg-password">Password *</label>
            {form.password && (
              <span className="strength-tag" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            )}
          </div>
          <div className={`reg-input-box ${errors.password ? "error" : ""}`}>
            <Lock size={16} className="reg-field-icon" />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            <button
              type="button"
              className="reg-eye-btn"
              onClick={() => setShowPassword((p) => !p)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="field-err">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="reg-field">
          <label htmlFor="reg-confirm-password">Confirm Password *</label>
          <div className={`reg-input-box ${errors.confirmPassword ? "error" : ""}`}>
            <Lock size={16} className="reg-field-icon" />
            <input
              id="reg-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
            />
            <button
              type="button"
              className="reg-eye-btn"
              onClick={() => setShowConfirmPassword((p) => !p)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="field-err">{errors.confirmPassword}</span>
          )}
        </div>
      </div>
    </>
  );
}
