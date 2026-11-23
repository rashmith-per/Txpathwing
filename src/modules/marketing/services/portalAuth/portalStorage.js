/**
 * Portal User Persistence and Session Storage Engine
 * Manages Dynamic Institution, Organization, and Company accounts.
 */

const STORAGE_KEY = "tx_portal_users";
const ACTIVE_SESSION_KEY = "tx_active_portal_user";
const SESSION_TOKEN_KEY = "tx_portal_token";

export const PORTAL_CATEGORIES = {
  INSTITUTION: "institution",
  ORGANIZATION: "organization",
  COMPANY: "company",
};

export const CATEGORY_CONFIGS = {
  institution: {
    key: "institution",
    title: "Institution",
    entityLabel: "Institution / College Name",
    entityPlaceholder: "e.g. ABC Engineering College",
    defaultName: "ABC Engineering College",
    roleLabel: "Institution Administrator",
    dashboardPath: "/institution-dashboard",
    description:
      "Manage educational institutions, campuses, departments, students, and academic operations.",
    badgeColor: "#1d4ed8",
    accentColor: "#2563eb",
  },
  organization: {
    key: "organization",
    title: "Organization",
    entityLabel: "Organization Name",
    entityPlaceholder: "e.g. Global Tech Foundation",
    defaultName: "Global Tech Foundation",
    roleLabel: "Organization Leader",
    dashboardPath: "/institution-dashboard",
    description:
      "Manage organizations, teams, members, training programs, and organizational activities.",
    badgeColor: "#2563eb",
    accentColor: "#3b82f6",
  },
  company: {
    key: "company",
    title: "Company",
    entityLabel: "Company Name",
    entityPlaceholder: "e.g. Acme Technologies Inc.",
    defaultName: "Acme Technologies Inc.",
    roleLabel: "Corporate HR & Operations",
    dashboardPath: "/institution-dashboard",
    description:
      "Manage companies, employees, recruitment, training, and business operations.",
    badgeColor: "#0284c7",
    accentColor: "#2563eb",
  },
};

/**
 * Retrieve all registered portal accounts from localStorage
 */
export function getStoredPortalUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Save array of portal users into localStorage
 */
export function savePortalUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save portal users to localStorage", err);
  }
}

/**
 * Find user by email across registered portal accounts
 */
export function findPortalUserByEmail(emailInput) {
  if (!emailInput) return null;
  const email = emailInput.trim().toLowerCase();
  const users = getStoredPortalUsers();
  return users.find((u) => u.email.toLowerCase() === email) || null;
}

/**
 * Find user by ID
 */
export function findPortalUserById(userId) {
  if (!userId) return null;
  const users = getStoredPortalUsers();
  return users.find((u) => u.userId === userId) || null;
}

/**
 * Store or update an active portal user
 */
export function storePortalUser(user) {
  const users = getStoredPortalUsers();
  const index = users.findIndex(
    (u) => u.userId === user.userId || u.email.toLowerCase() === user.email.toLowerCase()
  );

  if (index >= 0) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }

  savePortalUsers(users);
  return user;
}

/**
 * Get active logged in portal user session
 */
export function getActivePortalUser() {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Set active portal user session and update global app auth state
 */
export function setActivePortalUser(user, rememberMe = true) {
  const token = `tx_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

  try {
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_TOKEN_KEY, token);

    // Synchronize with root application auth keys
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.username || "User");
    localStorage.setItem("userRole", user.category);

    if (user.logo) {
      localStorage.setItem("userLogo", user.logo);
      localStorage.setItem("institutionLogo", user.logo);
    } else {
      localStorage.removeItem("userLogo");
      localStorage.removeItem("institutionLogo");
    }

    if (user.category === "institution") {
      localStorage.setItem("institutionLoggedIn", "true");
      localStorage.setItem("institutionEmail", user.email);
      localStorage.setItem("institutionName", user.entityName);
    }

    if (rememberMe) {
      localStorage.setItem("tx_remember_email", user.email);
    } else {
      localStorage.removeItem("tx_remember_email");
    }

    // Trigger standard auth update events across tabs & components
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Failed to set active portal session", err);
  }

  return token;
}

/**
 * Terminate active portal user session
 */
export function clearActivePortalUser() {
  try {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    localStorage.removeItem(SESSION_TOKEN_KEY);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("institutionLoggedIn");
    localStorage.removeItem("institutionEmail");
    localStorage.removeItem("institutionName");
    localStorage.removeItem("userLogo");
    localStorage.removeItem("institutionLogo");

    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Failed to clear portal session", err);
  }
}
