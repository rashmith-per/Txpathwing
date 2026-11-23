import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import RegistrationFormFields from "./RegistrationFormFields";
import { registerPortalAccount } from "../../../services/portalAuth/portalAuthService";
import { CATEGORY_CONFIGS } from "../../../services/portalAuth/portalStorage";
import { evaluatePasswordStrength } from "../../../services/portalAuth/portalValidation";
import "./PortalRegistrationModal.css";

export default function PortalRegistrationModal({
  isOpen = false,
  category = "institution",
  onClose,
  onBack,
  onRegistrationSuccess,
  onSwitchToLogin,
}) {
  const config = CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS.institution;

  const [form, setForm] = useState({
    username: "",
    entityName: "",
    email: "",
    password: "",
    confirmPassword: "",
    logo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const passwordStrength = evaluatePasswordStrength(form.password);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const result = await registerPortalAccount({
      username: form.username,
      category,
      entityName: form.entityName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      logo: form.logo,
    });

    setIsLoading(false);

    if (!result.success) {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setErrors({ general: result.error });
      }
      return;
    }

    setSuccessMessage(result.message || "Account Created Successfully! Please Login to Continue.");

    setTimeout(() => {
      onRegistrationSuccess(result.user);
    }, 1200);
  };

  return (
    <div className="reg-modal-popup" role="dialog" aria-modal="true">
      <div className="reg-modal-overlay" onClick={onClose} />

      <div className="reg-modal-window">
        <button
          type="button"
          className="reg-modal-close"
          onClick={onClose}
          aria-label="Close registration"
        >
          <X size={19} />
        </button>

        <div className="reg-modal-header">
          {onBack && (
            <button
              type="button"
              className="reg-back-btn"
              onClick={onBack}
              title="Return to category selection"
            >
              <ArrowLeft size={14} />
              <span>Back to Categories</span>
            </button>
          )}

          <div
            className="reg-category-pill"
            style={{
              color: config.badgeColor,
              background: `${config.badgeColor}18`,
              border: `1px solid ${config.badgeColor}33`,
            }}
          >
            <span>{config.title.toUpperCase()} REGISTRATION</span>
          </div>

          <h1 className="reg-title">{config.title} Registration</h1>
          <p className="reg-subtitle">
            Set up your {config.title.toLowerCase()} workspace, register your administrator
            credentials, and customize your brand.
          </p>
        </div>

        {errors.general && (
          <div className="reg-alert error" role="alert">
            <AlertCircle size={16} />
            <span>{errors.general}</span>
          </div>
        )}

        {successMessage && (
          <div className="reg-alert success" role="status">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        <form className="reg-form" onSubmit={handleSubmit}>
          <RegistrationFormFields
            form={form}
            errors={errors}
            config={config}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            passwordStrength={passwordStrength}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="reg-submit-btn"
            disabled={isLoading || Boolean(successMessage)}
            style={{
              background: `linear-gradient(135deg, ${config.badgeColor} 0%, ${config.accentColor} 100%)`,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create {config.title} Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="reg-footer">
          <span>Already have an account?</span>
          <button
            type="button"
            className="reg-switch-login-btn"
            onClick={() => onSwitchToLogin(category, form.email)}
          >
            Sign In to {config.title}
          </button>
        </div>
      </div>
    </div>
  );
}
