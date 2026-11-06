import test from "node:test";
import assert from "node:assert/strict";
import {
  ROLE_CONFIGS,
  verifyCredentials,
  normalizeRole,
  getRoleDisplayName,
  getDashboardRouteForRole,
} from "./authService.js";

test("ROLE_CONFIGS defines exact dynamic text required by user specifications", () => {
  // Student
  assert.equal(ROLE_CONFIGS.student.welcomeLabel, "Welcome Student");
  assert.equal(ROLE_CONFIGS.student.welcomeHeading, "Welcome back, Student");
  assert.equal(
    ROLE_CONFIGS.student.subtitle,
    "Sign in to access your Student Dashboard."
  );
  assert.equal(ROLE_CONFIGS.student.route, "/dashboard");

  // Admin
  assert.equal(ROLE_CONFIGS.admin.welcomeLabel, "Welcome Admin");
  assert.equal(ROLE_CONFIGS.admin.welcomeHeading, "Welcome back, Admin");
  assert.equal(
    ROLE_CONFIGS.admin.subtitle,
    "Sign in to access your Admin Dashboard."
  );
  assert.equal(ROLE_CONFIGS.admin.route, "/admin-dashboard");

  // Instructor
  assert.equal(ROLE_CONFIGS.instructor.welcomeLabel, "Welcome Instructor");
  assert.equal(
    ROLE_CONFIGS.instructor.welcomeHeading,
    "Welcome back, Instructor"
  );
  assert.equal(
    ROLE_CONFIGS.instructor.subtitle,
    "Sign in to access your Instructor Dashboard."
  );
  assert.equal(ROLE_CONFIGS.instructor.route, "/instructor-dashboard");

  // Institution
  assert.equal(ROLE_CONFIGS.institution.welcomeLabel, "Welcome Institution");
  assert.equal(
    ROLE_CONFIGS.institution.welcomeHeading,
    "Welcome back, Institution"
  );
  assert.equal(
    ROLE_CONFIGS.institution.subtitle,
    "Sign in to access your Institution Dashboard."
  );
  assert.equal(ROLE_CONFIGS.institution.route, "/institution-dashboard");
});

test("Student login allows ANY email and ANY password", () => {
  // Arbitrary email and password in student portal
  const anyStudent1 = verifyCredentials("random.user@gmail.com", "anypass123", "student");
  assert.equal(anyStudent1.success, true);
  assert.equal(anyStudent1.user.role, "student");
  assert.equal(anyStudent1.user.targetDashboard, "/dashboard");
  assert.equal(anyStudent1.user.name, "Random User");

  const anyStudent2 = verifyCredentials("alice@somedomain.org", "123", "student");
  assert.equal(anyStudent2.success, true);
  assert.equal(anyStudent2.user.role, "student");
  assert.equal(anyStudent2.user.name, "Alice");

  // Known preset student email with any password
  const presetStudent = verifyCredentials("student@pathwing.com", "anyrandompassword", "student");
  assert.equal(presetStudent.success, true);
  assert.equal(presetStudent.user.role, "student");
});

test("Admin, Instructor, and Institution portals strictly enforce registered credentials", () => {
  // Admin requires valid credentials
  const validAdmin = verifyCredentials("admin@pathwing.com", "admin123", "admin");
  assert.equal(validAdmin.success, true);
  assert.equal(validAdmin.user.role, "admin");

  const badAdminPass = verifyCredentials("admin@pathwing.com", "wrongpass", "admin");
  assert.equal(badAdminPass.success, false);
  assert.match(badAdminPass.error, /Invalid email or password/i);

  const unknownAdmin = verifyCredentials("random@gmail.com", "admin123", "admin");
  assert.equal(unknownAdmin.success, false);
  assert.match(unknownAdmin.error, /Account not found/i);

  // Instructor requires valid credentials
  const validInstructor = verifyCredentials("ramana.r@kitsw.ac.in", "instructor123", "instructor");
  assert.equal(validInstructor.success, true);
  assert.equal(validInstructor.user.role, "instructor");

  const unknownInstructor = verifyCredentials("unknown@college.edu", "pass123", "instructor");
  assert.equal(unknownInstructor.success, false);
  assert.match(unknownInstructor.error, /Account not found/i);

  // Institution requires valid credentials
  const validInstitution = verifyCredentials("institution@pathwing.com", "institution123", "institution");
  assert.equal(validInstitution.success, true);
  assert.equal(validInstitution.user.role, "institution");

  const unknownInstitution = verifyCredentials("random@college.edu", "pass123", "institution");
  assert.equal(unknownInstitution.success, false);
  assert.match(unknownInstitution.error, /Account not found/i);
});

test("Role comparison prevents cross-portal authorization", () => {
  // Entering admin credentials in student portal identifies as admin for role mismatch check
  const adminInStudent = verifyCredentials("admin@pathwing.com", "admin123", "student");
  assert.equal(adminInStudent.success, true);
  assert.equal(normalizeRole(adminInStudent.user.role), "admin");
  // Since user role is "admin" and portal is "student", role comparison triggers mismatch!
  assert.notEqual(normalizeRole(adminInStudent.user.role), normalizeRole("student"));

  // Student trying to access Admin portal
  const studentInAdmin = verifyCredentials("student@pathwing.com", "student123", "admin");
  assert.equal(studentInAdmin.success, true);
  assert.equal(normalizeRole(studentInAdmin.user.role), "student");
  assert.notEqual(normalizeRole(studentInAdmin.user.role), normalizeRole("admin"));
});

test("Dashboard routes map to authorized portal paths", () => {
  assert.equal(getDashboardRouteForRole("student"), "/dashboard");
  assert.equal(getDashboardRouteForRole("admin"), "/admin-dashboard");
  assert.equal(getDashboardRouteForRole("instructor"), "/instructor-dashboard");
  assert.equal(
    getDashboardRouteForRole("institution"),
    "/institution-dashboard"
  );
});
