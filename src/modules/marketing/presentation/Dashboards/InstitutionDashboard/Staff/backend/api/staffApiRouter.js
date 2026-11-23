/**
 * Staff REST API Router
 * Simulates enterprise HTTP REST gateway dispatching requests to controllers
 */

import { StaffApiController } from "./staffApiController.js";
import { STAFF_ROLES } from "../models/StaffRoleModel.js";

function getCurrentUserSession() {
  if (typeof localStorage === "undefined") {
    return {
      name: "R. Sathyanarayana",
      email: "institution@pathwing.com",
      role: STAFF_ROLES.INSTITUTION_ADMIN,
      department: null,
    };
  }

  try {
    const activeTestRole = localStorage.getItem("tx_active_staff_test_role");
    const activeTestDept = localStorage.getItem("tx_active_staff_test_dept");

    const userRole = activeTestRole || localStorage.getItem("userRole") || STAFF_ROLES.INSTITUTION_ADMIN;
    const userName = localStorage.getItem("userName") || "R. Sathyanarayana";
    const userEmail = localStorage.getItem("userEmail") || "institution@pathwing.com";

    return {
      name: userName,
      email: userEmail,
      role: userRole,
      department: activeTestDept || (userRole === STAFF_ROLES.DEPT_HEAD ? "CSE" : null),
    };
  } catch {
    return {
      name: "R. Sathyanarayana",
      email: "institution@pathwing.com",
      role: STAFF_ROLES.INSTITUTION_ADMIN,
      department: null,
    };
  }
}

export const StaffApiRouter = {
  async handleRequest({ method, url, body = null, headers = {} }) {
    // Artificial slight latency simulation (50ms)
    await new Promise((r) => setTimeout(r, 60));

    const user = headers["x-user"] ? JSON.parse(headers["x-user"]) : getCurrentUserSession();
    const cleanUrl = url.split("?")[0].replace(/\/+$/, "");

    // 1. GET /api/institution/staff/statistics
    if (method === "GET" && cleanUrl.endsWith("/api/institution/staff/statistics")) {
      return StaffApiController.getStaffStatistics({ user, url });
    }

    // 2. PATCH /api/institution/staff/:id/status
    const patchStatusMatch = cleanUrl.match(/\/api\/institution\/staff\/([^/]+)\/status$/);
    if (method === "PATCH" && patchStatusMatch) {
      const id = patchStatusMatch[1];
      return StaffApiController.updateStaffStatus({ user, params: { id }, body });
    }

    // 3. GET /api/institution/staff/:id
    const getSingleMatch = cleanUrl.match(/\/api\/institution\/staff\/([^/]+)$/);
    if (method === "GET" && getSingleMatch && !cleanUrl.endsWith("/statistics")) {
      const id = getSingleMatch[1];
      return StaffApiController.getStaffById({ user, params: { id } });
    }

    // 4. PUT /api/institution/staff/:id
    const putMatch = cleanUrl.match(/\/api\/institution\/staff\/([^/]+)$/);
    if (method === "PUT" && putMatch) {
      const id = putMatch[1];
      return StaffApiController.updateStaff({ user, params: { id }, body });
    }

    // 5. DELETE /api/institution/staff/:id
    const deleteMatch = cleanUrl.match(/\/api\/institution\/staff\/([^/]+)$/);
    if (method === "DELETE" && deleteMatch) {
      const id = deleteMatch[1];
      return StaffApiController.deleteStaff({ user, params: { id } });
    }

    // 6. POST /api/institution/staff
    if (method === "POST" && cleanUrl.endsWith("/api/institution/staff")) {
      return StaffApiController.createStaff({ user, body });
    }

    // 7. GET /api/institution/staff
    if (method === "GET" && cleanUrl.endsWith("/api/institution/staff")) {
      return StaffApiController.getStaff({ user, url, query: null });
    }

    return {
      status: 404,
      body: {
        success: false,
        error: `Endpoint '${method} ${url}' not found in Institution Staff API.`,
      },
    };
  },
};
