import React, { useState } from "react";
import { Mail, X, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import "./ForgotPasswordModal.css";

export default function ForgotPasswordModal({ isOpen = false, onClose, initialEmail = "" }) {
  const [email, setEmail] = useState(initialEmail);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid official email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="forgot-modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="forgot-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <h2 className="forgot-title">Reset Your Password</h2>
        <p className="forgot-subtitle">
          Enter your registered official email address and we'll verify your administrative access.
        </p>

        {error && (
          <div className="forgot-alert error">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="forgot-success-box">
            <CheckCircle2 size={36} className="forgot-success-icon" />
            <h3>Reset Instructions Sent</h3>
            <p>
              A password reset link and verification code have been dispatched to <strong>{email}</strong>.
            </p>
            <button type="button" className="forgot-primary-btn" onClick={onClose}>
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="forgot-field">
              <label htmlFor="forgot-email">Official Email Address</label>
              <div className="forgot-input-box">
                <Mail size={16} className="forgot-icon" />
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@entity.com"
                  required
                />
              </div>
            </div>

            <button type="submit" className="forgot-primary-btn">
              <span>Send Reset Instructions</span>
              <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
