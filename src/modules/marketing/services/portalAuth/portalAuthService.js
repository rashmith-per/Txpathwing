/**
 * Portal Authentication & Registration Service
 * Coordinates cryptographic password hashing, account creation, and session security.
 */

import { generateSalt, hashPassword, verifyPassword } from "./portalCrypto.js";
import {
  findPortalUserByEmail,
  storePortalUser,
  setActivePortalUser,
  clearActivePortalUser,
  getActivePortalUser,
  getStoredPortalUsers,
  CATEGORY_CONFIGS,
} from "./portalStorage.js";
import { validateRegistrationForm, validateLoginForm } from "./portalValidation.js";
import { findUserByEmail } from "../authService.js";

/**
 * Register a new dynamic Institution, Organization, or Company account
 */
export async function registerPortalAccount({
  username,
  category = "institution",
  entityName,
  email,
  password,
  confirmPassword,
  logo = null,
}) {
  // Validate inputs
  const validation = validateRegistrationForm({
    username,
    entityName,
    email,
    password,
    confirmPassword,
    category,
  });

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      error: Object.values(validation.errors)[0] || "Registration validation failed.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const cleanUsername = username.trim();
  const cleanEntityName = entityName.trim();

  // Generate secure salt and hash password
  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const newAccount = {
    userId: `usr_${category.substring(0, 3)}_${Date.now()}`,
    username: cleanUsername,
    category,
    categoryTitle: CATEGORY_CONFIGS[category]?.title || "Institution",
    entityName: cleanEntityName,
    email: normalizedEmail,
    logo: logo || null,
    passwordHash,
    salt,
    createdAt: formattedDate,
    status: "Active",
  };

  // Store in portal users database
  storePortalUser(newAccount);

  // Sync with standard custom users array for cross-module compatibility
  try {
    const rawCustom = localStorage.getItem("tx_custom_users");
    const customUsers = rawCustom ? JSON.parse(rawCustom) : [];
    const idx = customUsers.findIndex((u) => u.email.toLowerCase() === normalizedEmail);
    const customRecord = {
      email: normalizedEmail,
      passwords: [password],
      name: cleanUsername,
      entityName: cleanEntityName,
      role: category,
      roleLabel: CATEGORY_CONFIGS[category]?.roleLabel || "Institution",
      targetDashboard: CATEGORY_CONFIGS[category]?.dashboardPath || "/institution-dashboard",
    };
    if (idx >= 0) {
      customUsers[idx] = customRecord;
    } else {
      customUsers.push(customRecord);
    }
    localStorage.setItem("tx_custom_users", JSON.stringify(customUsers));
  } catch {
    // Ignore custom storage errors
  }

  return {
    success: true,
    user: newAccount,
    message: "Account Created Successfully! Please Login to Continue.",
  };
}

/**
 * Authenticate dynamic account using registered credentials
 */
export async function loginPortalAccount({ email, password, rememberMe = true }) {
  const validation = validateLoginForm({ email, password });
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      error: Object.values(validation.errors)[0] || "Login validation failed.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const portalUser = findPortalUserByEmail(normalizedEmail);

  if (portalUser) {
    // Verify password hash against stored salt
    const isMatch = await verifyPassword(password, portalUser.salt, portalUser.passwordHash);

    if (!isMatch) {
      return {
        success: false,
        error: "Incorrect password. Please verify your credentials and try again.",
      };
    }

    // Set authenticated session and return user
    const token = setActivePortalUser(portalUser, rememberMe);
    const dashboardRoute =
      CATEGORY_CONFIGS[portalUser.category]?.dashboardPath || "/institution-dashboard";

    return {
      success: true,
      user: portalUser,
      token,
      dashboardRoute,
    };
  }

  // Fallback: Check canonical / legacy accounts (e.g. demo institution accounts)
  const legacyAccount = findUserByEmail(normalizedEmail);
  if (legacyAccount) {
    const validPasswords =
      legacyAccount.passwords || (legacyAccount.password ? [legacyAccount.password] : []);
    const isValid = validPasswords.includes(password);

    if (!isValid) {
      return {
        success: false,
        error: "Incorrect password. Please verify your credentials.",
      };
    }

    // Adapt legacy account to portal user format
    const adaptedUser = {
      userId: `legacy_${legacyAccount.role}_${Date.now()}`,
      username: legacyAccount.name || "Administrator",
      category: legacyAccount.role === "admin" ? "company" : "institution",
      categoryTitle: "Institution",
      entityName: legacyAccount.name?.includes("KITS") ? "KITS Warangal" : "Academic Campus",
      email: normalizedEmail,
      logo: null,
      createdAt: "Established",
      status: "Active",
    };

    setActivePortalUser(adaptedUser, rememberMe);
    return {
      success: true,
      user: adaptedUser,
      dashboardRoute: "/institution-dashboard",
    };
  }

  return {
    success: false,
    error: "No account found with this email. Please check your credentials or create a new account.",
  };
}

/**
 * Sign out currently logged-in user
 */
export function logoutPortalAccount() {
  clearActivePortalUser();
}

/**
 * Retrieve current authenticated portal user
 */
export function getCurrentPortalUser() {
  return getActivePortalUser();
}

/**
 * Pre-seed initial demo accounts if database is empty
 */
export async function seedDemoAccountsIfEmpty() {
  const users = getStoredPortalUsers();
  if (users.length > 0) return;

  const demoAccounts = [
    {
      username: "Vamshi",
      category: "institution",
      entityName: "ABC Engineering College",
      email: "admin@abccollege.com",
      password: "Password123!",
    },
    {
      username: "Rajesh Sharma",
      category: "organization",
      entityName: "Global Tech Foundation",
      email: "contact@globaltech.org",
      password: "Password123!",
    },
    {
      username: "Priya Varma",
      category: "company",
      entityName: "Acme Technologies Inc.",
      email: "careers@acmetech.com",
      password: "Password123!",
    },
  ];

  for (const acc of demoAccounts) {
    const salt = generateSalt();
    const passwordHash = await hashPassword(acc.password, salt);
    storePortalUser({
      userId: `usr_${acc.category.substring(0, 3)}_seed`,
      username: acc.username,
      category: acc.category,
      categoryTitle: CATEGORY_CONFIGS[acc.category].title,
      entityName: acc.entityName,
      email: acc.email,
      logo: null,
      passwordHash,
      salt,
      createdAt: "Nov 23, 2026",
      status: "Active",
    });
  }
}
