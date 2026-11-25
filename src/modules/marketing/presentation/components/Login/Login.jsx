import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  X,
  AlertCircle,
  GraduationCap,
  Users,
  Building2,
} from "lucide-react";
import { ROLE_CONFIGS } from "../../../services/authService";
import { LoginSidebar } from "./components/LoginSidebar";
import { LoginFormFields } from "./components/LoginFormFields";
import { useLoginForm } from "./hooks/useLoginForm";
import "./Login.css";

const ROLE_ICON_MAP = {
  student: GraduationCap,
  admin: ShieldCheck,
  instructor: Users,
  institution: Building2,
};

const Login = ({
  isOpen = true,
  selectedRole = "student",
  onClose,
  onBack,
  initialView = "login",
  onLoginSuccess,
  onSwitchView,
  onAdminLogin,
}) => {
  const navigate = useNavigate();
  const roleConfig = ROLE_CONFIGS[selectedRole] || ROLE_CONFIGS.student;
  const RoleIcon = ROLE_ICON_MAP[roleConfig.key] || ShieldCheck;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const {
    isLogin,
    form,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    message,
    messageType,
    handleChange,
    handleSubmit,
    changeView,
  } = useLoginForm({
    isOpen,
    selectedRole,
    initialView,
    roleConfig,
    onClose,
    onLoginSuccess,
    onSwitchView,
    onAdminLogin,
  });

  if (!isOpen) return null;

  return (
    <div className="login-popup" role="dialog" aria-modal="true">
      <div className="login-overlay" onClick={handleClose} />

      <div className="login-box">
        <button
          type="button"
          className="login-close"
          onClick={handleClose}
          aria-label="Close login dialog"
        >
          <X size={20} />
        </button>

        <LoginSidebar />

        <div className={`login-right ${isLogin ? "login-view" : "signup-view"}`}>
          {onBack && (
            <button
              type="button"
              className="login-back-button"
              onClick={onBack}
              title="Return to dashboard selection"
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard Selection</span>
            </button>
          )}

          <div className="login-header">
            <div
              className="login-role-pill"
              style={{
                color: roleConfig.color,
                background: roleConfig.bgTint,
                border: `1px solid ${roleConfig.borderTint}`,
              }}
            >
              <RoleIcon size={13} style={{ color: roleConfig.color }} />
              <span>{roleConfig.displayName}</span>
            </div>

            {!isLogin ? (
              <span className="login-label">GET STARTED</span>
            ) : roleConfig.welcomeLabel ? (
              <span className="login-label">{roleConfig.welcomeLabel}</span>
            ) : null}

            <h1>{isLogin ? roleConfig.welcomeHeading : "Create your account"}</h1>

            <p>
              {isLogin
                ? roleConfig.subtitle
                : "Join us and start building your future today."}
            </p>
          </div>

          {errors.general && (
            <div className="login-message error">
              <AlertCircle size={17} style={{ flexShrink: 0 }} />
              <span>{errors.general}</span>
            </div>
          )}

          {message && (
            <div className={`login-message ${messageType}`}>
              <CheckCircle size={17} style={{ flexShrink: 0 }} />
              <span>{message}</span>
            </div>
          )}

          <LoginFormFields
            isLogin={isLogin}
            form={form}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <div className="login-switch">
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button type="button" onClick={changeView}>
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </div>

          <p className="login-security">
            <ShieldCheck size={14} />
            Your information is securely protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
