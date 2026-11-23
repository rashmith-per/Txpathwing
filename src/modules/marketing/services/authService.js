import { KNOWN_ACCOUNTS } from "./authConstants.js";
import {
  getCustomUsers,
  normalizeRole,
  getRoleDisplayName,
  getDashboardRouteForRole,
} from "./authSession.js";

export * from "./authConstants.js";
export * from "./authSession.js";

/**
 * Find user by email across canonical and registered accounts
 */
export function findUserByEmail(emailInput) {
  if (!emailInput) return null;
  const email = emailInput.trim().toLowerCase();

  const canonical = KNOWN_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === email
  );
  if (canonical) return canonical;

  const customUsers = getCustomUsers();
  const custom = customUsers.find(
    (acc) => acc.email.toLowerCase() === email
  );
  if (custom) return custom;

  return null;
}

/**
 * Verify user credentials (email and password)
 */
export function verifyCredentials(emailInput, passwordInput, selectedRole = null) {
  const email = (emailInput || "").trim().toLowerCase();
  const password = passwordInput || "";

  if (!email) {
    return { success: false, error: "Email address is required." };
  }
  if (!password) {
    return { success: false, error: "Password is required." };
  }

  const normalizedSelectedRole = selectedRole ? normalizeRole(selectedRole) : null;
  const account = findUserByEmail(email);

  if (normalizedSelectedRole === "student") {
    if (account && account.role !== "student") {
      const validPasswords = account.passwords || (account.password ? [account.password] : []);
      const isValid = validPasswords.includes(password);
      if (!isValid) {
        return {
          success: false,
          error: "Invalid email or password. Please verify your credentials.",
        };
      }
      return { success: true, user: account };
    }

    if (account && account.role === "student") {
      return { success: true, user: account };
    }

    const prefix = email.split("@")[0] || "Learner";
    const formattedName =
      prefix
        .replace(/[._-]+/g, " ")
        .split(" ")
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
        .join(" ") || "Student Learner";

    const studentUser = {
      email,
      name: formattedName,
      role: "student",
      roleLabel: "Student",
      targetDashboard: "/dashboard",
    };
    return { success: true, user: studentUser };
  }

  if (account) {
    const validPasswords = account.passwords || (account.password ? [account.password] : []);
    const isValid = validPasswords.includes(password);
    if (!isValid) {
      return {
        success: false,
        error: "Invalid email or password. Please verify your credentials.",
      };
    }
    return { success: true, user: account };
  }

  return {
    success: false,
    error: "Account not found with this email. Please check your credentials or create a new account.",
  };
}

/**
 * Register a new user account into localStorage
 */
export function registerCustomUser({ email, password, full_name, phone, role }) {
  const customUsers = getCustomUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const assignedRole = normalizeRole(role || "student");

  const newUser = {
    email: normalizedEmail,
    passwords: [password],
    name: (full_name && full_name.trim()) || "Learner",
    phone: (phone && phone.trim()) || "",
    role: assignedRole,
    roleLabel: getRoleDisplayName(assignedRole),
    targetDashboard: getDashboardRouteForRole(assignedRole),
  };

  const existingIdx = customUsers.findIndex(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  if (existingIdx >= 0) {
    customUsers[existingIdx] = newUser;
  } else {
    customUsers.push(newUser);
  }

  localStorage.setItem("tx_custom_users", JSON.stringify(customUsers));
  return newUser;
}
