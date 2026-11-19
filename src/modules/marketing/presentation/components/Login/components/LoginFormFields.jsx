import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

export function LoginFormFields({
  isLogin,
  form,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleChange,
  handleSubmit,
}) {
  const getInputClass = (fieldName) =>
    errors[fieldName] ? "login-input-box input-error" : "login-input-box";

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {!isLogin && (
        <div className="login-field">
          <div className={getInputClass("full_name")}>
            <User size={18} className="input-icon" />
            <input
              type="text"
              name="full_name"
              placeholder="Full name"
              value={form.full_name}
              onChange={handleChange}
            />
          </div>
          {errors.full_name && (
            <small className="input-error-message">{errors.full_name}</small>
          )}
        </div>
      )}

      <div className="login-field">
        <div className={getInputClass("email")}>
          <Mail size={18} className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && (
          <small className="input-error-message">{errors.email}</small>
        )}
      </div>

      {!isLogin && (
        <div className="login-field">
          <div className={getInputClass("phone")}>
            <Phone size={18} className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
            />
          </div>
          {errors.phone && (
            <small className="input-error-message">{errors.phone}</small>
          )}
        </div>
      )}

      <div className="login-field">
        <div className={getInputClass("password")}>
          <Lock size={18} className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.password && (
          <small className="input-error-message">{errors.password}</small>
        )}
      </div>

      {!isLogin && (
        <div className="login-field">
          <div className={getInputClass("confirm_password")}>
            <CheckCircle size={18} className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="Confirm password"
              value={form.confirm_password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.confirm_password && (
            <small className="input-error-message">
              {errors.confirm_password}
            </small>
          )}
        </div>
      )}

      <button type="submit" className="login-button">
        <span>{isLogin ? "Sign in" : "Create account"}</span>
        <span className="button-arrow">
          <ArrowRight size={17} />
        </span>
      </button>
    </form>
  );
}
