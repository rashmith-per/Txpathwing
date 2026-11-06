import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { normalizeRole, getDashboardRouteForRole } from "../services/authService";

/**
 * Route Guard Component
 * Enforces authentication and role-based access control.
 * Prevents unauthorized access through direct URLs.
 */
export default function ProtectedRoute({ allowedRole, children }) {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole") || "";
  const isPlatformAdmin = localStorage.getItem("isPlatformAdmin") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // 1. If not logged in, redirect to login for this portal
  if (!isLoggedIn) {
    return (
      <Navigate
        to={`/login?portal=${allowedRole}&redirect=${encodeURIComponent(
          location.pathname
        )}`}
        replace
      />
    );
  }

  // 2. Normalize roles
  const normalizedUserRole = normalizeRole(userRole);
  const normalizedAllowedRole = normalizeRole(allowedRole);

  // 3. Verify role match
  let hasAccess = false;

  if (normalizedAllowedRole === "admin") {
    hasAccess =
      normalizedUserRole === "admin" ||
      isPlatformAdmin ||
      (isAdmin && userRole === "platform_admin");
  } else if (normalizedAllowedRole === "instructor") {
    hasAccess = normalizedUserRole === "instructor";
  } else if (normalizedAllowedRole === "institution") {
    hasAccess =
      normalizedUserRole === "institution" ||
      userRole === "institution_admin";
  } else if (normalizedAllowedRole === "student") {
    hasAccess = normalizedUserRole === "student";
  } else if (normalizedAllowedRole === "hackathon_admin") {
    hasAccess =
      normalizedUserRole === "hackathon_admin" ||
      userRole === "hackathon_admin" ||
      isAdmin;
  }

  // 4. If role does not match, redirect to the user's authorized dashboard
  if (!hasAccess) {
    const authorizedDestination = getDashboardRouteForRole(normalizedUserRole);
    return <Navigate to={authorizedDestination} replace />;
  }

  // 5. Authorized - allow access
  return children;
}
