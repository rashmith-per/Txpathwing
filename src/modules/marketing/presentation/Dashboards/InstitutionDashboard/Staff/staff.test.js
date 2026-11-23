import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";

import { StaffModel } from "./backend/models/StaffModel.js";
import { DepartmentModel } from "./backend/models/DepartmentModel.js";
import { StaffRoleModel, STAFF_ROLES, STAFF_PERMISSIONS } from "./backend/models/StaffRoleModel.js";
import { StaffDatabase } from "./backend/db/staffDatabase.js";
import { StaffApiController } from "./backend/api/staffApiController.js";
import { StaffApiRouter } from "./backend/api/staffApiRouter.js";

describe("Staff Management Module — Comprehensive Suite", () => {
  beforeEach(async () => {
    await StaffDatabase.resetToSeedData();
  });

  // 1. Validation & Schema Model
  describe("1. Staff Model Validation & Sanitization", () => {
    it("validates valid staff entity without errors", () => {
      const valid = {
        name: "Dr. K. Srinivas Rao",
        email: "srinivas.test@kitsw.ac.in",
        phone: "+91 98480 12345",
        staffId: "STF-9901",
        department: "CSE",
        designation: "Professor",
        employmentType: "Full-time",
        category: "Teaching",
        joiningDate: "2020-01-15",
      };

      const result = StaffModel.validate(valid);
      assert.strictEqual(result.isValid, true);
      assert.strictEqual(Object.keys(result.errors).length, 0);
    });

    it("rejects invalid email formats", () => {
      const invalid = {
        name: "Test Staff",
        email: "invalid-email-address",
        phone: "+91 98480 12345",
        staffId: "STF-9902",
        department: "IT",
        designation: "Assistant Professor",
        employmentType: "Full-time",
        category: "Teaching",
        joiningDate: "2021-06-01",
      };

      const result = StaffModel.validate(invalid);
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.email);
    });

    it("rejects invalid phone numbers and missing required fields", () => {
      const invalid = {
        name: "A", // too short
        email: "valid@kitsw.ac.in",
        phone: "123", // too short
        staffId: "",
        department: "InvalidDept",
        designation: "",
        employmentType: "Gig",
        category: "Unknown",
        joiningDate: "",
      };

      const result = StaffModel.validate(invalid);
      assert.strictEqual(result.isValid, false);
      assert.ok(result.errors.name);
      assert.ok(result.errors.phone);
      assert.ok(result.errors.staffId);
      assert.ok(result.errors.department);
      assert.ok(result.errors.designation);
      assert.ok(result.errors.employmentType);
      assert.ok(result.errors.category);
      assert.ok(result.errors.joiningDate);
    });

    it("reconnects with existing DepartmentModel from overviewData", () => {
      assert.strictEqual(DepartmentModel.isValidDepartment("CSE"), true);
      assert.strictEqual(DepartmentModel.isValidDepartment("IT"), true);
      assert.strictEqual(DepartmentModel.isValidDepartment("ECE"), true);
      assert.strictEqual(DepartmentModel.isValidDepartment("CIVIL"), true);
      assert.strictEqual(DepartmentModel.isValidDepartment("FAKE_DEPT"), false);
    });
  });

  // 2. Database & Persistence Layer
  describe("2. Staff Database & CRUD Operations", () => {
    it("loads seeded staff records across departments", async () => {
      const list = await StaffDatabase.getAllStaff();
      assert.ok(Array.isArray(list));
      assert.ok(list.length >= 10);
      assert.ok(list.some((s) => s.staffId === "STF-1001"));
    });

    it("prevents duplicate email addresses on insertion", async () => {
      const duplicateRecord = {
        name: "Duplicate Email Test",
        email: "srinivas.k@kitsw.ac.in", // already in seed
        phone: "+91 91234 56789",
        staffId: "STF-UNIQUE-99",
        department: "CSE",
        designation: "Assistant Professor",
        employmentType: "Full-time",
        category: "Teaching",
        joiningDate: "2024-01-01",
      };

      await assert.rejects(
        async () => {
          await StaffDatabase.insertStaff(duplicateRecord);
        },
        (err) => {
          return err.status === 409 && err.field === "email";
        }
      );
    });

    it("prevents duplicate staff IDs on insertion", async () => {
      const duplicateRecord = {
        name: "Duplicate Staff ID Test",
        email: "brand.new@kitsw.ac.in",
        phone: "+91 91234 56789",
        staffId: "STF-1001", // already in seed
        department: "CSE",
        designation: "Assistant Professor",
        employmentType: "Full-time",
        category: "Teaching",
        joiningDate: "2024-01-01",
      };

      await assert.rejects(
        async () => {
          await StaffDatabase.insertStaff(duplicateRecord);
        },
        (err) => {
          return err.status === 409 && err.field === "staffId";
        }
      );
    });

    it("creates, updates, logs activity, and deletes staff record", async () => {
      // 1. Insert
      const newStaff = await StaffDatabase.insertStaff({
        name: "Dr. Vikram Aditya",
        email: "vikram.aditya@kitsw.ac.in",
        phone: "+91 99887 66554",
        staffId: "STF-7777",
        department: "IT",
        designation: "Associate Professor",
        employmentType: "Full-time",
        category: "Teaching",
        joiningDate: "2025-05-10",
        status: "Active",
      });

      assert.ok(newStaff.id);
      assert.strictEqual(newStaff.activityLogs.length, 1);
      assert.strictEqual(newStaff.activityLogs[0].action, "STAFF_CREATED");

      // 2. Update
      const updated = await StaffDatabase.updateStaff(newStaff.id, {
        designation: "Professor & Vice Chair",
        status: "On Leave",
      });

      assert.strictEqual(updated.designation, "Professor & Vice Chair");
      assert.strictEqual(updated.status, "On Leave");
      assert.strictEqual(updated.activityLogs.length, 2);
      assert.strictEqual(updated.activityLogs[0].action, "STAFF_UPDATED");

      // 3. Status Change
      const statusChanged = await StaffDatabase.updateStaffStatus(newStaff.id, "Active", "Returned from leave");
      assert.strictEqual(statusChanged.status, "Active");
      assert.strictEqual(statusChanged.activityLogs.length, 3);
      assert.strictEqual(statusChanged.activityLogs[0].action, "STATUS_CHANGED");

      // 4. Delete
      const deleteRes = await StaffDatabase.deleteStaff(newStaff.id);
      assert.strictEqual(deleteRes.success, true);

      const foundAfterDelete = await StaffDatabase.getStaffById(newStaff.id);
      assert.strictEqual(foundAfterDelete, null);
    });
  });

  // 3. Dynamic Statistics Calculation
  describe("3. Dynamic Statistics Calculation", () => {
    it("computes accurate dynamic stats without hardcoded numbers", async () => {
      const stats = await StaffDatabase.getStatistics();
      assert.ok(typeof stats.totalStaff === "number");
      assert.ok(stats.totalStaff >= 10);
      assert.ok(typeof stats.activeStaff === "number");
      assert.ok(typeof stats.inactiveStaff === "number");
      assert.ok(typeof stats.teachingStaff === "number");
      assert.ok(typeof stats.nonTeachingStaff === "number");
      assert.ok(typeof stats.pendingInvitations === "number");

      // Mathematical consistency
      assert.strictEqual(
        stats.totalStaff,
        stats.activeStaff + stats.inactiveStaff + stats.onLeaveStaff + stats.pendingInvitations
      );
      assert.strictEqual(
        stats.totalStaff,
        stats.teachingStaff + stats.nonTeachingStaff
      );
    });
  });

  // 4. Role-Based Access Control (RBAC)
  describe("4. Role-Based Access Control (RBAC)", () => {
    it("allows Institution Admin full permissions", () => {
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.INSTITUTION_ADMIN, STAFF_PERMISSIONS.STAFF_CREATE),
        true
      );
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.INSTITUTION_ADMIN, STAFF_PERMISSIONS.STAFF_DELETE),
        true
      );
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.INSTITUTION_ADMIN, STAFF_PERMISSIONS.STAFF_CHANGE_STATUS),
        true
      );
    });

    it("allows HR Manager to create and edit but forbids delete", () => {
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.HR_MANAGER, STAFF_PERMISSIONS.STAFF_CREATE),
        true
      );
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.HR_MANAGER, STAFF_PERMISSIONS.STAFF_EDIT),
        true
      );
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.HR_MANAGER, STAFF_PERMISSIONS.STAFF_DELETE),
        false
      );
    });

    it("enforces department boundary for Department Head", () => {
      // In same department (CSE)
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.DEPT_HEAD, STAFF_PERMISSIONS.STAFF_EDIT, "CSE", "CSE"),
        true
      );
      // In different department (IT vs CSE)
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.DEPT_HEAD, STAFF_PERMISSIONS.STAFF_EDIT, "CSE", "IT"),
        false
      );
      // Cannot delete even in own department
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.DEPT_HEAD, STAFF_PERMISSIONS.STAFF_DELETE, "CSE", "CSE"),
        false
      );
    });

    it("restricts Faculty and Support Staff to read-only capabilities", () => {
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.FACULTY, STAFF_PERMISSIONS.STAFF_CREATE),
        false
      );
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.FACULTY, STAFF_PERMISSIONS.STAFF_EDIT),
        false
      );
      assert.strictEqual(
        StaffRoleModel.hasPermission(STAFF_ROLES.SUPPORT_STAFF, STAFF_PERMISSIONS.STAFF_CREATE),
        false
      );
    });
  });

  // 5. REST API Endpoints & Status Codes
  describe("5. REST API Endpoints & HTTP Protocols", () => {
    it("handles GET /api/institution/staff with query filters and pagination", async () => {
      const res = await StaffApiController.getStaff({
        query: { department: "CSE", limit: "5", page: "1", sortField: "name", sortDirection: "asc" },
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.every((s) => s.department === "CSE"));
      assert.strictEqual(res.body.pagination.limit, 5);
      assert.strictEqual(res.body.pagination.page, 1);
    });

    it("handles GET /api/institution/staff/:id", async () => {
      const res = await StaffApiController.getStaffById({
        params: { id: "STF-1001" },
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.staffId, "STF-1001");
    });

    it("handles POST /api/institution/staff with HTTP 201 on success", async () => {
      const res = await StaffApiController.createStaff({
        user: { role: STAFF_ROLES.INSTITUTION_ADMIN },
        body: {
          name: "Dr. Ananya Roy",
          email: "ananya.roy@kitsw.ac.in",
          phone: "+91 99881 22334",
          staffId: "STF-5501",
          department: "ECE",
          designation: "Assistant Professor",
          employmentType: "Full-time",
          category: "Teaching",
          joiningDate: "2026-02-01",
        },
      });

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.staffId, "STF-5501");
    });

    it("returns HTTP 403 when unauthorized role attempts POST /api/institution/staff", async () => {
      const res = await StaffApiController.createStaff({
        user: { role: STAFF_ROLES.FACULTY }, // Faculty cannot create
        body: {
          name: "Dr. Blocked User",
          email: "blocked@kitsw.ac.in",
          phone: "+91 99881 22334",
          staffId: "STF-BLOCKED",
          department: "ECE",
          designation: "Assistant Professor",
          employmentType: "Full-time",
          category: "Teaching",
          joiningDate: "2026-02-01",
        },
      });

      assert.strictEqual(res.status, 403);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.error.includes("Forbidden"));
    });

    it("returns HTTP 403 when non-admin attempts DELETE /api/institution/staff/:id", async () => {
      const res = await StaffApiController.deleteStaff({
        user: { role: STAFF_ROLES.HR_MANAGER }, // HR Manager cannot delete
        params: { id: "STF-1001" },
      });

      assert.strictEqual(res.status, 403);
      assert.strictEqual(res.body.success, false);
    });

    it("dispatches requests accurately through StaffApiRouter", async () => {
      const statsRes = await StaffApiRouter.handleRequest({
        method: "GET",
        url: "/api/institution/staff/statistics",
      });

      assert.strictEqual(statsRes.status, 200);
      assert.strictEqual(statsRes.body.success, true);
      assert.ok(statsRes.body.data.totalStaff > 0);
    });
  });
});
