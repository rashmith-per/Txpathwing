/**
 * Staff REST API Controller
 * Implements server-side endpoint handling, request parsing,
 * validation, authorization enforcement, and standardized HTTP responses.
 */

import { StaffDatabase } from "../db/staffDatabase.js";
import { StaffRoleModel, STAFF_PERMISSIONS, STAFF_ROLES } from "../models/StaffRoleModel.js";

function parseQuery(urlOrQueryString) {
  if (!urlOrQueryString) return {};
  const query = {};
  const queryString = urlOrQueryString.includes("?")
    ? urlOrQueryString.split("?")[1]
    : urlOrQueryString;
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    if (!pair) continue;
    const [key, value] = pair.split("=");
    query[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }
  return query;
}

export const StaffApiController = {
  /**
   * GET /api/institution/staff
   */
  async getStaff(req = {}) {
    try {
      const user = req.user || { role: STAFF_ROLES.INSTITUTION_ADMIN, department: null };
      const query = req.query || parseQuery(req.url);

      const all = await StaffDatabase.getAllStaff();

      // Authorization filtering: Dept Head only sees their department if restricted
      let accessible = all;
      if (user.role === STAFF_ROLES.DEPT_HEAD && user.department) {
        // May view directory but prioritize or filter by department if query requires
      }

      // Filtering
      const search = (query.search || "").trim().toLowerCase();
      const department = (query.department || "").trim();
      const designation = (query.designation || "").trim();
      const employmentType = (query.employmentType || "").trim();
      const status = (query.status || "").trim();
      const category = (query.category || "").trim();

      let filtered = accessible.filter((staff) => {
        if (search) {
          const matchName = staff.name.toLowerCase().includes(search);
          const matchEmail = staff.email.toLowerCase().includes(search);
          const matchId = staff.staffId.toLowerCase().includes(search);
          const matchDept = staff.department.toLowerCase().includes(search);
          const matchDesig = staff.designation.toLowerCase().includes(search);
          if (!matchName && !matchEmail && !matchId && !matchDept && !matchDesig) {
            return false;
          }
        }

        if (department && department !== "All" && department !== "All departments") {
          if (staff.department.toLowerCase() !== department.toLowerCase()) {
            return false;
          }
        }

        if (designation && designation !== "All" && designation !== "All designations") {
          if (staff.designation.toLowerCase() !== designation.toLowerCase()) {
            return false;
          }
        }

        if (employmentType && employmentType !== "All" && employmentType !== "All types") {
          if (staff.employmentType.toLowerCase() !== employmentType.toLowerCase()) {
            return false;
          }
        }

        if (status && status !== "All" && status !== "All statuses") {
          if (staff.status.toLowerCase() !== status.toLowerCase()) {
            return false;
          }
        }

        if (category && category !== "All" && category !== "All categories") {
          if (staff.category.toLowerCase() !== category.toLowerCase()) {
            return false;
          }
        }

        return true;
      });

      // Sorting
      const sortField = query.sortField || "name";
      const sortDirection = (query.sortDirection || "asc").toLowerCase() === "desc" ? -1 : 1;

      filtered.sort((a, b) => {
        const valA = (a[sortField] || "").toString().toLowerCase();
        const valB = (b[sortField] || "").toString().toLowerCase();
        if (valA < valB) return -1 * sortDirection;
        if (valA > valB) return 1 * sortDirection;
        return 0;
      });

      // Pagination
      const page = Math.max(1, parseInt(query.page || "1", 10));
      const limit = Math.max(1, parseInt(query.limit || "10", 10));
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const paginatedItems = filtered.slice(startIndex, startIndex + limit);

      return {
        status: 200,
        body: {
          success: true,
          data: paginatedItems,
          pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
      };
    } catch (err) {
      return {
        status: err.status || 500,
        body: {
          success: false,
          error: err.message || "Failed to retrieve staff directory",
        },
      };
    }
  },

  /**
   * GET /api/institution/staff/{id}
   */
  async getStaffById(req = {}) {
    try {
      const id = req.params?.id || req.id;
      if (!id) {
        return {
          status: 400,
          body: { success: false, error: "Staff ID parameter is required" },
        };
      }

      const staff = await StaffDatabase.getStaffById(id);
      if (!staff) {
        return {
          status: 404,
          body: { success: false, error: `Staff member '${id}' not found` },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data: staff,
        },
      };
    } catch (err) {
      return {
        status: err.status || 500,
        body: { success: false, error: err.message || "Internal server error" },
      };
    }
  },

  /**
   * POST /api/institution/staff
   */
  async createStaff(req = {}) {
    try {
      const user = req.user || { role: STAFF_ROLES.INSTITUTION_ADMIN, name: "Institution Admin", email: "institution@pathwing.com" };

      // RBAC check
      if (!StaffRoleModel.hasPermission(user.role, STAFF_PERMISSIONS.STAFF_CREATE)) {
        return {
          status: 403,
          body: {
            success: false,
            error: "Forbidden: You do not possess permission to create staff records.",
          },
        };
      }

      const body = req.body || {};
      const newStaff = await StaffDatabase.insertStaff(body, {
        name: user.name || "Institution Admin",
        email: user.email || "institution@pathwing.com",
      });

      return {
        status: 201,
        body: {
          success: true,
          data: newStaff,
          message: "Staff member enrolled successfully.",
        },
      };
    } catch (err) {
      return {
        status: err.status || 400,
        body: {
          success: false,
          error: err.message || "Could not create staff record",
          errors: err.errors,
          field: err.field,
        },
      };
    }
  },

  /**
   * PUT /api/institution/staff/{id}
   */
  async updateStaff(req = {}) {
    try {
      const user = req.user || { role: STAFF_ROLES.INSTITUTION_ADMIN, name: "Institution Admin", email: "institution@pathwing.com" };
      const id = req.params?.id || req.id;
      const body = req.body || {};

      const existing = await StaffDatabase.getStaffById(id);
      if (!existing) {
        return {
          status: 404,
          body: { success: false, error: `Staff member '${id}' not found.` },
        };
      }

      // RBAC check
      if (
        !StaffRoleModel.hasPermission(
          user.role,
          STAFF_PERMISSIONS.STAFF_EDIT,
          user.department,
          existing.department
        )
      ) {
        return {
          status: 403,
          body: {
            success: false,
            error: "Forbidden: You do not possess permission to edit this staff member.",
          },
        };
      }

      const updated = await StaffDatabase.updateStaff(id, body, {
        name: user.name || "Institution Admin",
        email: user.email || "institution@pathwing.com",
      });

      return {
        status: 200,
        body: {
          success: true,
          data: updated,
          message: "Staff member details updated successfully.",
        },
      };
    } catch (err) {
      return {
        status: err.status || 400,
        body: {
          success: false,
          error: err.message || "Failed to update staff details",
          errors: err.errors,
          field: err.field,
        },
      };
    }
  },

  /**
   * PATCH /api/institution/staff/{id}/status
   */
  async updateStaffStatus(req = {}) {
    try {
      const user = req.user || { role: STAFF_ROLES.INSTITUTION_ADMIN, name: "Institution Admin", email: "institution@pathwing.com" };
      const id = req.params?.id || req.id;
      const body = req.body || {};
      const { status, reason } = body;

      if (!status) {
        return {
          status: 400,
          body: { success: false, error: "Status value is required." },
        };
      }

      const existing = await StaffDatabase.getStaffById(id);
      if (!existing) {
        return {
          status: 404,
          body: { success: false, error: `Staff member '${id}' not found.` },
        };
      }

      if (
        !StaffRoleModel.hasPermission(
          user.role,
          STAFF_PERMISSIONS.STAFF_CHANGE_STATUS,
          user.department,
          existing.department
        )
      ) {
        return {
          status: 403,
          body: {
            success: false,
            error: "Forbidden: You do not possess permission to change staff status.",
          },
        };
      }

      const updated = await StaffDatabase.updateStaffStatus(id, status, reason, {
        name: user.name || "Institution Admin",
        email: user.email || "institution@pathwing.com",
      });

      return {
        status: 200,
        body: {
          success: true,
          data: updated,
          message: `Staff status successfully changed to '${status}'.`,
        },
      };
    } catch (err) {
      return {
        status: err.status || 400,
        body: { success: false, error: err.message || "Failed to change status" },
      };
    }
  },

  /**
   * DELETE /api/institution/staff/{id}
   */
  async deleteStaff(req = {}) {
    try {
      const user = req.user || { role: STAFF_ROLES.INSTITUTION_ADMIN, name: "Institution Admin", email: "institution@pathwing.com" };
      const id = req.params?.id || req.id;

      if (!StaffRoleModel.hasPermission(user.role, STAFF_PERMISSIONS.STAFF_DELETE)) {
        return {
          status: 403,
          body: {
            success: false,
            error: "Forbidden: Only Institution Administrators have permission to delete staff records.",
          },
        };
      }

      const result = await StaffDatabase.deleteStaff(id, {
        name: user.name || "Institution Admin",
        email: user.email || "institution@pathwing.com",
      });

      return {
        status: 200,
        body: {
          success: true,
          message: result.message,
        },
      };
    } catch (err) {
      return {
        status: err.status || 400,
        body: { success: false, error: err.message || "Failed to delete staff record" },
      };
    }
  },

  /**
   * GET /api/institution/staff/statistics
   */
  async getStaffStatistics() {
    try {
      const stats = await StaffDatabase.getStatistics();
      return {
        status: 200,
        body: {
          success: true,
          data: stats,
        },
      };
    } catch (err) {
      return {
        status: 500,
        body: { success: false, error: err.message || "Failed to calculate statistics" },
      };
    }
  },
};
