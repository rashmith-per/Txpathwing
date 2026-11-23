/**
 * Session persistence, role normalizers, and storage helpers
 */

export function getCustomUsers() {
  try {
    const raw = localStorage.getItem("tx_custom_users");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function normalizeRole(role) {
  if (!role) return "student";
  const r = role.toLowerCase().trim();
  if (r === "admin" || r === "platform_admin" || r === "super admin") return "admin";
  if (r === "instructor" || r === "mentor") return "instructor";
  if (r === "institution" || r === "institution_admin" || r === "org admin") return "institution";
  if (r === "organization") return "organization";
  if (r === "company") return "company";
  if (r === "hackathon_admin") return "hackathon_admin";
  return "student";
}

export function getRoleDisplayName(role) {
  const norm = normalizeRole(role);
  if (norm === "admin") return "Admin";
  if (norm === "instructor") return "Instructor";
  if (norm === "institution") return "Institution";
  if (norm === "organization") return "Organization";
  if (norm === "company") return "Company";
  if (norm === "hackathon_admin") return "Hackathon Admin";
  return "Student";
}

export function getDashboardRouteForRole(role) {
  const norm = normalizeRole(role);
  if (norm === "admin") return "/admin-dashboard";
  if (norm === "instructor") return "/instructor-dashboard";
  if (norm === "institution") return "/institution-dashboard";
  if (norm === "organization") return "/organization-dashboard";
  if (norm === "company") return "/company-dashboard";
  if (norm === "hackathon_admin") return "/hackathon-dashboard";
  return "/dashboard";
}

export function setAuthenticatedSession(user) {
  const normRole = normalizeRole(user.role);

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", user.email);
  localStorage.setItem("userName", user.name || "User");
  localStorage.setItem("userRole", normRole);

  if (normRole === "admin" || user.isPlatformAdmin) {
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("isPlatformAdmin", "true");
  } else {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isPlatformAdmin");
  }

  if (normRole === "hackathon_admin") {
    localStorage.setItem("isAdmin", "true");
  }

  window.dispatchEvent(new Event("authChanged"));
  window.dispatchEvent(new Event("storage"));
}

export function clearAuthenticatedSession() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userPhone");
  localStorage.removeItem("userRole");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("isPlatformAdmin");
  localStorage.removeItem("isHackathonAdmin");

  window.dispatchEvent(new Event("authChanged"));
  window.dispatchEvent(new Event("storage"));
}
