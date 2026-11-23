import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  X,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { loginPortalAccount } from "../../../services/portalAuth/portalAuthService";
import { CATEGORY_CONFIGS } from "../../../services/portalAuth/portalStorage";
import ForgotPasswordModal from "./ForgotPasswordModal";
import "./PortalLoginModal.css";

export default function PortalLoginModal({
  isOpen = false,
  initialCategory = "institution",
  initialEmail = "",
  onClose,
  onBack,
  onSwitchToRegister,
  onLoginSuccess,
}) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "institution");
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const config = CATEGORY_CONFIGS[selectedCategory] || CATEGORY_CONFIGS.institution;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await loginPortalAccount({
      email,
      password,
      rememberMe,
    });

    setIsLoading(false);

    if (!result.success) {
      setError(result.error || "Authentication failed. Please check your credentials.");
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess(result.user);
    } else {
      if (onClose) onClose();
      navigate(result.dashboardRoute || "/institution-dashboard", { replace: true });
    }
  };

  return (
    <>
      <div className="portal-login-popup" role="dialog" aria-modal="true">
        <div className="portal-login-overlay" onClick={onClose} />

        <div className="portal-login-window">
          <button
            type="button"
            className="portal-login-close"
            onClick={onClose}
            aria-label="Close portal login"
          >
            <X size={19} />
          </button>

          <div className="portal-login-header">
            {onBack && (
              <button
                type="button"
                className="portal-login-back-btn"
                onClick={onBack}
                title="Return to Category Selection"
              >
                <ArrowLeft size={14} />
                <span>Back to Selection</span>
              </button>
            )}

            <div className="portal-login-brand-pill">
              <ShieldCheck size={14} />
              <span>PORTAL ACCESS</span>
            </div>

            <h1 className="portal-login-heading">{config.title} Sign In</h1>
            <p className="portal-login-subheading">
              Access your {config.title.toLowerCase()} dashboard, administrative tools, and records.
            </p>

            {/* Category Switcher Tabs */}
            <div className="portal-cat-tabs">
              {["institution", "organization", "company"].map((catKey) => {
                const c = CATEGORY_CONFIGS[catKey];
                const isActive = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    className={`portal-cat-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCategory(catKey);
                      setError("");
                    }}
                  >
                    <span>{c.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="portal-login-alert error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="portal-login-form" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="portal-login-field">
              <label htmlFor="portal-login-email">Registered Official Email</label>
              <div className="portal-login-input-box">
                <Mail size={16} className="portal-field-icon" />
                <input
                  id="portal-login-email"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@entity.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="portal-login-field">
              <div className="portal-login-label-row">
                <label htmlFor="portal-login-password">Password</label>
                <button
                  type="button"
                  className="portal-forgot-link"
                  onClick={() => setIsForgotOpen(true)}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="portal-login-input-box">
                <Lock size={16} className="portal-field-icon" />
                <input
                  id="portal-login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />
                <button
                  type="button"
                  className="portal-eye-btn"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="portal-login-options">
              <label className="portal-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="portal-login-submit-btn"
              disabled={isLoading}
              style={{
                background: `linear-gradient(135deg, ${config.badgeColor} 0%, ${config.accentColor} 100%)`,
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {config.title}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="portal-login-footer">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="portal-switch-reg-btn"
              onClick={() => onSwitchToRegister(selectedCategory)}
            >
              Register {config.title}
            </button>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        initialEmail={email}
      />
    </>
  );
}
