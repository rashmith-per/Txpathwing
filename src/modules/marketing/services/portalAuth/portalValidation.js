/**
 * Validation rules and helpers for Dynamic Registration & Authentication
 */

import { findPortalUserByEmail } from "./portalStorage.js";
import { findUserByEmail } from "../authService.js";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Check password strength rating and hints
 */
export function evaluatePasswordStrength(password) {
  if (!password) {
    return { score: 0, label: "Empty", color: "#94a3b8" };
  }

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score, label: "Weak", color: "#ef4444" };
  }
  if (score <= 3) {
    return { score, label: "Moderate", color: "#f59e0b" };
  }
  return { score, label: "Strong", color: "#10b981" };
}

/**
 * Validate full registration form inputs
 */
export function validateRegistrationForm({
  username,
  entityName,
  email,
  password,
  confirmPassword,
  category,
}) {
  const errors = {};

  // Username
  if (!username || !username.trim()) {
    errors.username = "Username is required.";
  } else if (username.trim().length < 2) {
    errors.username = "Username must be at least 2 characters.";
  }

  // Entity Name (Institution / Organization / Company)
  const categoryLabel =
    category === "institution"
      ? "Institution name"
      : category === "organization"
      ? "Organization name"
      : "Company name";

  if (!entityName || !entityName.trim()) {
    errors.entityName = `${categoryLabel} is required.`;
  } else if (entityName.trim().length < 2) {
    errors.entityName = `${categoryLabel} must be at least 2 characters.`;
  }

  // Email format
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail) {
    errors.email = "Official email address is required.";
  } else if (!EMAIL_REGEX.test(normalizedEmail)) {
    errors.email = "Please enter a valid official email address.";
  } else {
    // Uniqueness validation
    const existingPortalUser = findPortalUserByEmail(normalizedEmail);
    const existingLegacyUser = findUserByEmail(normalizedEmail);
    if (existingPortalUser || (existingLegacyUser && existingLegacyUser.passwords)) {
      errors.email = "An account with this email address already exists. Please login instead.";
    }
  }

  // Password
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  // Confirm Password
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate login form inputs
 */
export function validateLoginForm({ email, password }) {
  const errors = {};
  const normalizedEmail = (email || "").trim().toLowerCase();

  if (!normalizedEmail) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(normalizedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
