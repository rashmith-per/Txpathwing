/**
 * Learner Data Model
 * Defines data structures, field validations, and sanitization for learners.
 */

export const LEARNER_STATUSES = [
  "On track",
  "Placement ready",
  "Needs support",
  "At risk",
  "Completed",
  "On leave"
];

export const ACCOUNT_STATUSES = ["Active", "Inactive", "Suspended"];

export const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

export const BATCHES = [
  "2023–27",
  "2024–28",
  "2025–29",
  "2026–27"
];

export const DEPARTMENTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];

export const DEFAULT_COURSES = [
  "Full Stack Engineering",
  "Cloud & DevOps Foundations",
  "Applied Data Engineering",
  "Cybersecurity Essentials",
  "Embedded IoT Systems",
  "Structural CAD & BIM"
];

export class LearnerModel {
  /**
   * Generates a unique learner identification string
   * Format: LRN-2026-XXXX (e.g. LRN-2026-4819)
   */
  static generateLearnerId() {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `LRN-${year}-${randomSuffix}`;
  }

  /**
   * Validates learner data before database persistence
   * @param {Object} data - Learner fields
   * @param {boolean} isUpdate - Whether validating for an update
   * @returns {{ isValid: boolean, errors: Object }}
   */
  static validate(data, isUpdate = false) {
    const errors = {};

    // 1. Full Name
    if (!isUpdate || data.fullName !== undefined) {
      if (!data.fullName || typeof data.fullName !== "string" || !data.fullName.trim()) {
        errors.fullName = "Full name is required";
      } else if (data.fullName.trim().length < 2) {
        errors.fullName = "Full name must be at least 2 characters";
      }
    }

    // 2. Email validation
    if (!isUpdate || data.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || typeof data.email !== "string" || !data.email.trim()) {
        errors.email = "Email address is required";
      } else if (!emailRegex.test(data.email.trim())) {
        errors.email = "Invalid email address format";
      }
    }

    // 3. Phone validation
    if (!isUpdate || data.phone !== undefined) {
      const cleanPhone = (data.phone || "").replace(/[\s\-()]/g, "");
      if (!cleanPhone) {
        errors.phone = "Phone number is required";
      } else if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
        errors.phone = "Phone number must be between 10 and 14 digits";
      }
    }

    // 4. Learner ID
    if (!isUpdate && data.learnerId !== undefined) {
      if (!data.learnerId || typeof data.learnerId !== "string" || !data.learnerId.trim()) {
        errors.learnerId = "Learner ID is required";
      }
    }

    // 5. Department
    if (!isUpdate || data.department !== undefined) {
      if (!data.department || typeof data.department !== "string" || !data.department.trim()) {
        errors.department = "Department is required";
      }
    }

    // 6. Enrolled Course / Programme
    if (!isUpdate || (data.course !== undefined || data.programme !== undefined)) {
      if (!data.course && !data.programme) {
        errors.course = "Enrolled course/programme is required";
      }
    }

    // 7. Batch
    if (!isUpdate || data.batch !== undefined) {
      if (!data.batch || typeof data.batch !== "string" || !data.batch.trim()) {
        errors.batch = "Batch is required";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Sanitizes learner payload and ensures defaults
   */
  static sanitize(data) {
    const now = new Date().toISOString();
    const courseName = (data.course || data.programme || "Full Stack Engineering").trim();

    return {
      id: data.id || `learner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      learnerId: (data.learnerId || this.generateLearnerId()).trim().toUpperCase(),
      fullName: (data.fullName || data.name || "").trim(),
      name: (data.fullName || data.name || "").trim(),
      email: (data.email || "").trim().toLowerCase(),
      phone: (data.phone || "").trim(),
      dob: data.dob || "",
      gender: data.gender || "Prefer not to say",
      address: (data.address || "").trim(),
      institution: (data.institution || "KITS Warangal").trim(),
      department: (data.department || "CSE").trim(),
      course: courseName,
      programme: courseName,
      batch: (data.batch || "2026–27").trim(),
      enrollmentDate: data.enrollmentDate || now.split("T")[0],
      learningStatus: data.learningStatus || data.status || "On track",
      status: data.learningStatus || data.status || "On track",
      loginEmail: (data.loginEmail || data.email || "").trim().toLowerCase(),
      accountStatus: data.accountStatus || "Active",
      assignedRole: data.assignedRole || "student",
      progress: typeof data.progress === "number" ? data.progress : 0,
      createdAt: data.createdAt || now,
      updatedAt: now
    };
  }
}
