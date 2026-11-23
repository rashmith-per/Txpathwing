/**
 * Staff Entity Model and Validation
 */

import { DepartmentModel } from "./DepartmentModel.js";
import { STAFF_ROLES, StaffRoleModel } from "./StaffRoleModel.js";

export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract"];
export const STAFF_CATEGORIES = ["Teaching", "Non-Teaching"];
export const STAFF_STATUSES = ["Active", "Inactive", "On Leave", "Pending Invitation"];
export const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

export const StaffModel = {
  validate(data) {
    const errors = {};

    // 1. Personal Info
    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
      errors.name = "Full name is required (at least 2 characters).";
    }

    if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email.trim())) {
      errors.email = "A valid official email address is required.";
    }

    if (!data.phone || typeof data.phone !== "string" || !PHONE_REGEX.test(data.phone.trim())) {
      errors.phone = "A valid contact phone number is required (min 7 digits).";
    }

    // 2. Professional Info
    if (!data.staffId || typeof data.staffId !== "string" || data.staffId.trim().length < 3) {
      errors.staffId = "Staff ID is required (min 3 characters, e.g. STF-1001).";
    }

    if (!data.department || !DepartmentModel.isValidDepartment(data.department)) {
      errors.department = "A valid department must be selected.";
    }

    if (!data.designation || typeof data.designation !== "string" || data.designation.trim().length < 2) {
      errors.designation = "Staff designation/job title is required.";
    }

    if (!data.employmentType || !EMPLOYMENT_TYPES.includes(data.employmentType)) {
      errors.employmentType = `Employment type must be one of: ${EMPLOYMENT_TYPES.join(", ")}`;
    }

    if (!data.category || !STAFF_CATEGORIES.includes(data.category)) {
      errors.category = `Staff category must be Teaching or Non-Teaching.`;
    }

    if (!data.joiningDate) {
      errors.joiningDate = "Joining date is required.";
    }

    // 3. Status & Role
    if (data.status && !STAFF_STATUSES.includes(data.status)) {
      errors.status = `Status must be one of: ${STAFF_STATUSES.join(", ")}`;
    }

    const isValid = Object.keys(errors).length === 0;
    return {
      isValid,
      errors,
    };
  },

  sanitize(data) {
    const roleDef = StaffRoleModel.getRole(data.role || STAFF_ROLES.FACULTY);
    const email = (data.email || "").trim().toLowerCase();
    const staffId = (data.staffId || "").trim().toUpperCase();
    const name = (data.name || "").trim();

    return {
      id: data.id || `staff_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      staffId,
      name,
      avatar: data.avatar || "",
      email,
      phone: (data.phone || "").trim(),
      dob: data.dob || "",
      gender: data.gender || "Prefer not to say",
      address: (data.address || "").trim(),
      department: DepartmentModel.normalizeDepartment(data.department),
      designation: (data.designation || "").trim(),
      employmentType: data.employmentType || "Full-time",
      joiningDate: data.joiningDate || new Date().toISOString().split("T")[0],
      category: data.category || (data.designation?.toLowerCase().includes("officer") ? "Non-Teaching" : "Teaching"),
      reportingManager: (data.reportingManager || "Prof. K. Venkatesh (Dean Academics)").trim(),
      username: data.username ? data.username.trim() : email.split("@")[0],
      status: data.status || "Active",
      role: roleDef.id,
      roleName: roleDef.name,
      permissions: Array.isArray(data.permissions) && data.permissions.length > 0 ? data.permissions : [...roleDef.permissions],
      qualification: data.qualification || "M.Tech / Ph.D",
      experience: data.experience || "5+ Years",
      activityLogs: Array.isArray(data.activityLogs) ? data.activityLogs : [],
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};
