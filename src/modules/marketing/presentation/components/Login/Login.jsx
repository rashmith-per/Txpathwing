import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", {
      ...formData,
      rememberMe,
    });

    // Add your login API here

    // Example:
    // navigate("/");
  };

  return (
    <div className="login-page">

      {/* Background Decorations */}
      <div className="login-decoration login-decoration-one"></div>
      <div className="login-decoration login-decoration-two"></div>

      <div className="login-container">

        {/* Left Side */}
        <div className="login-brand-section">

          <div className="brand-content">

            <div className="brand-logo">
              TX
            </div>

            <p className="brand-eyebrow">
              TX PATHWING
            </p>

            <h1>
              Your journey
              <br />
              <span>starts here.</span>
            </h1>

            <p className="brand-description">
              Access your learning dashboard, track your progress,
              build your skills, and move closer to your career goals.
            </p>

            <div className="brand-points">

              <div className="brand-point">
                <span className="point-icon">✓</span>
                <span>Continue your learning journey</span>
              </div>

              <div className="brand-point">
                <span className="point-icon">✓</span>
                <span>Track your progress</span>
              </div>

              <div className="brand-point">
                <span className="point-icon">✓</span>
                <span>Build career-ready skills</span>
              </div>

            </div>

          </div>

        </div>


        {/* Right Side */}
        <div className="login-form-section">

          <div className="login-card">

            {/* Mobile Logo */}
            <div className="mobile-brand">
              <div className="mobile-brand-logo">
                TX
              </div>

              <span>TX PATHWING</span>
            </div>


            {/* Header */}
            <div className="login-header">

              <p className="login-eyebrow">
                WELCOME BACK
              </p>

              <h2>
                Sign in to your account
              </h2>

              <p>
                Enter your details to continue your journey.
              </p>

            </div>


            {/* Form */}
            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* Email */}
              <div className="form-group">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />

                </div>

              </div>


              {/* Password */}
              <div className="form-group">

                <div className="password-label-row">

                  <label htmlFor="password">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="forgot-password"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="input-wrapper">

                  <span className="input-icon">
                    •••
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* Remember Me */}
              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />    
                  <span className="custom-checkbox"></span>
                  <span>
                    Remember me
                  </span>
                </label>
              </div>
              {/* Login Button */}
              <button type="submit" className="login-button" >
                <span>
                  Sign in
                </span>
                <span className="login-arrow">
                  →
                </span>
              </button>
            </form>
            {/* Divider */}
            <div className="login-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>
            {/* Google Login */}
            <button
              type="button"
              className="google-button"
              onClick={() => console.log("Google login")}
            >
              <span className="google-icon">
                G
              </span>
              <span>
                Continue with Google
              </span>
            </button>
            {/* Signup */}
            <div className="signup-section">
              <p>
                Don't have an account?
                {" "}
                <Link to="/register">
                  Create an account
                </Link>
              </p>
            </div>
            {/* Footer */}
            <div className="login-footer">
              <span>
                Secure access
              </span>
              <span className="footer-dot">  •</span>
              <span>
                TX Pathwing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;