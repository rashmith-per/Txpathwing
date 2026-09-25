import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";


import "./Login.css";

const Login = ({
  isOpen,
  onClose,
  initialView = "login",
  onLoginSuccess,
}) => {
  const [isLogin, setIsLogin] = React.useState(
    initialView === "login"
  );

  const [form, setForm] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] =
    React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState(false);

  const [loading, setLoading] =
    React.useState(false);

  const [errors, setErrors] =
    React.useState({});

  const [message, setMessage] =
    React.useState("");

  const [messageType, setMessageType] =
    React.useState("");

  if (!isOpen) {
    return null;
  }

  /* =====================================================
     CHANGE LOGIN / SIGNUP VIEW
  ===================================================== */

  const changeView = () => {
    setIsLogin(!isLogin);

    setErrors({});
    setMessage("");
    setMessageType("");

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
    setMessageType("");
  };

  /* =====================================================
     VALIDATE FORM
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    /* FULL NAME - SIGNUP ONLY */

    if (!isLogin) {
      const fullName = form.full_name.trim();

      if (!fullName) {
        newErrors.full_name = "Full name is required";
      } else if (fullName.length < 3) {
        newErrors.full_name =
          "Please enter a valid full name";
      }
    }

    /* EMAIL */

    const email = form.email.trim();

    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailPattern.test(email)) {
        newErrors.email =
          "Please enter a valid email address";
      }
    }

    /* PHONE - SIGNUP ONLY */

    if (!isLogin) {
      const phone = form.phone.trim();

      if (!phone) {
        newErrors.phone =
          "Mobile number is required";
      } else if (!/^[6-9]\d{9}$/.test(phone)) {
        newErrors.phone =
          "Please enter a valid 10-digit mobile number";
      }
    }

    /* PASSWORD */

    if (!form.password) {
      newErrors.password =
        "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    /* CONFIRM PASSWORD - SIGNUP ONLY */

    if (!isLogin) {
      if (!form.confirm_password) {
        newErrors.confirm_password =
          "Please confirm your password";
      } else if (
        form.password !== form.confirm_password
      ) {
        newErrors.confirm_password =
          "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (isLogin) {
      onLoginSuccess();
      return;
    }

    setMessage("Account details are valid.");
    setMessageType("success");
  };

  /* =====================================================
     INPUT CLASS HELPER
  ===================================================== */

  const getInputClass = (fieldName) => {
    return errors[fieldName]
      ? "login-input-box input-error"
      : "login-input-box";
  };

  return (
    <div className="login-popup">

      {/* =================================================
          DARK BACKGROUND
      ================================================= */}

      <div
        className="login-overlay"
        onClick={onClose}
      />

      {/* =================================================
          MAIN LOGIN BOX
      ================================================= */}

      <div className="login-box">

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          className="login-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* =================================================
            LEFT PART
        ================================================= */}

        <div className="login-left">

          <div className="background-grid" />

          <div className="glow-top" />
          <div className="glow-bottom" />

          <span className="floating-dot dot-one" />
          <span className="floating-dot dot-two" />
          <span className="floating-dot dot-three" />
          <span className="floating-dot dot-four" />
          <span className="floating-dot dot-five" />

          {/* LEFT CONTENT */}

          <div className="login-left-content">

            <div className="login-brand">
              <ShieldCheck size={27} />
            </div>

            <span className="login-tagline">
              LEARN
              <span>•</span>
              GROW
              <span>•</span>
              ACHIEVE
            </span>

            <h2>
              Your learning
              <br />
              journey starts here.
            </h2>

            <p>
              Access your courses, track your
              progress and continue learning
              from anywhere.
            </p>

          </div>

          {/* LEARNING VISUAL */}

          <div className="learning-box">

            <div className="learning-orbit orbit-large" />
            <div className="learning-orbit orbit-small" />

            <span className="orbit-dot orbit-dot-one" />
            <span className="orbit-dot orbit-dot-two" />
            <span className="orbit-dot orbit-dot-three" />

            <div className="learning-item course-item">
              <CheckCircle size={15} />
              <span>Courses</span>
            </div>

            <div className="learning-item progress-item">
              <CheckCircle size={15} />
              <span>Progress</span>
            </div>

            <div className="learning-item skills-item">
              <CheckCircle size={15} />
              <span>Skills</span>
            </div>

          </div>

          {/* STATS */}

          <div className="login-stats">

            <div className="stat">
              <strong>10K+</strong>
              <span>Learners</span>
            </div>

            <div className="stats-line" />

            <div className="stat">
              <strong>500+</strong>
              <span>Courses</span>
            </div>

            <div className="stats-line" />

            <div className="stat">
              <strong>24/7</strong>
              <span>Learning</span>
            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT PART
        ================================================= */}

        <div
          className={`login-right ${isLogin
            ? "login-view"
            : "signup-view"
            }`}
        >

          {/* HEADER */}

          <div className="login-header">

            <div className="mobile-brand">
              <ShieldCheck size={20} />
            </div>

            <span className="login-label">
              {isLogin
                ? "WELCOME BACK"
                : "GET STARTED"}
            </span>

            <h1>
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h1>

            <p>
              {isLogin
                ? "Sign in to continue your learning journey."
                : "Join us and start building your future today."}
            </p>

          </div>

          {/* MESSAGE */}

          {message && (
            <div
              className={`login-message ${messageType}`}
            >
              {messageType === "success" ? (
                <CheckCircle size={17} />
              ) : (
                <X size={17} />
              )}

              <span>{message}</span>
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* FULL NAME */}

            {!isLogin && (
              <div className="login-field">

                <div
                  className={getInputClass(
                    "full_name"
                  )}
                >

                  <User
                    size={18}
                    className="input-icon"
                  />

                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full name"
                    value={form.full_name}
                    onChange={handleChange}
                    autoComplete="name"
                    className={
                      errors.full_name
                        ? "has-error"
                        : ""
                    }
                  />

                </div>

                {errors.full_name && (
                  <small className="input-error-message">
                    {errors.full_name}
                  </small>
                )}

              </div>
            )}

            {/* EMAIL */}

            <div className="login-field">

              <div
                className={getInputClass("email")}
              >

                <Mail
                  size={18}
                  className="input-icon"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={
                    errors.email
                      ? "has-error"
                      : ""
                  }
                />

              </div>

              {errors.email && (
                <small className="input-error-message">
                  {errors.email}
                </small>
              )}

            </div>

            {/* PHONE */}

            {!isLogin && (
              <div className="login-field">

                <div
                  className={getInputClass("phone")}
                >

                  <Phone
                    size={18}
                    className="input-icon"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    maxLength={10}
                    inputMode="numeric"
                    className={
                      errors.phone
                        ? "has-error"
                        : ""
                    }
                  />

                </div>

                {errors.phone && (
                  <small className="input-error-message">
                    {errors.phone}
                  </small>
                )}

              </div>
            )}

            {/* PASSWORD */}

            <div className="login-field">

              <div
                className={getInputClass(
                  "password"
                )}
              >

                <Lock
                  size={18}
                  className="input-icon"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : "new-password"
                  }
                  className={
                    errors.password
                      ? "has-error"
                      : ""
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

              {errors.password && (
                <small className="input-error-message">
                  {errors.password}
                </small>
              )}

            </div>

            {/* FORGOT PASSWORD */}

            {isLogin && (
              <div className="forgot-password">
                <Link
                  to="/forgot-password"
                  onClick={onClose}
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* CONFIRM PASSWORD */}

            {!isLogin && (
              <div className="login-field">

                <div
                  className={getInputClass(
                    "confirm_password"
                  )}
                >

                  <CheckCircle
                    size={18}
                    className="input-icon"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirm_password"
                    placeholder="Confirm password"
                    value={
                      form.confirm_password
                    }
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={
                      errors.confirm_password
                        ? "has-error"
                        : ""
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {errors.confirm_password && (
                  <small className="input-error-message">
                    {errors.confirm_password}
                  </small>
                )}

              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? isLogin
                    ? "Signing in..."
                    : "Creating account..."
                  : isLogin
                    ? "Sign in"
                    : "Create account"}
              </span>

              {!loading && (
                <span className="button-arrow">
                  <ArrowRight size={17} />
                </span>
              )}

            </button>

          </form>

          {/* SWITCH */}

          <div className="login-switch">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={changeView}
            >
              {isLogin
                ? "Create account"
                : "Sign in"}
            </button>

          </div>

          {/* SECURITY */}

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