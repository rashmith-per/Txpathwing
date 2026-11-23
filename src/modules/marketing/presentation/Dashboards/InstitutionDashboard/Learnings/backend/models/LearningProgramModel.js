/**
 * Learning Program Model
 * Defines data structures and validation for programs, modules, and topics.
 */

export const PROGRAM_CATEGORIES = [
  "SOFTWARE DEVELOPMENT",
  "CLOUD COMPUTING",
  "DATA & AI",
  "SECURITY",
  "ELECTRONICS",
  "CIVIL ENGINEERING"
];

export const PROGRAM_STATUSES = ["Active", "Draft", "Review due", "Archived"];

export const TOPIC_TYPES = ["Video", "Reading", "Quiz", "Lab"];

export class LearningProgramModel {
  static validate(data, isUpdate = false) {
    const errors = {};

    if (!isUpdate || data.name !== undefined || data.title !== undefined) {
      const name = (data.name || data.title || "").trim();
      if (!name) {
        errors.name = "Program name is required";
      } else if (name.length < 3) {
        errors.name = "Program name must be at least 3 characters";
      }
    }

    if (!isUpdate || data.code !== undefined) {
      const code = (data.code || "").trim();
      if (!code) {
        errors.code = "Program code is required";
      }
    }

    if (!isUpdate || data.category !== undefined) {
      if (!data.category || !data.category.trim()) {
        errors.category = "Category is required";
      }
    }

    if (!isUpdate || data.instructor !== undefined) {
      if (!data.instructor || !data.instructor.trim()) {
        errors.instructor = "Instructor name is required";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static sanitize(data) {
    const now = new Date().toISOString();
    const programName = (data.name || data.title || "Untitled Program").trim();
    const id = data.id || `prog_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    return {
      id,
      code: (data.code || `PRG-${Math.floor(100 + Math.random() * 900)}`).trim().toUpperCase(),
      name: programName,
      title: programName,
      category: (data.category || "SOFTWARE DEVELOPMENT").trim().toUpperCase(),
      department: (data.department || "All departments").trim(),
      duration: data.duration || "12 weeks",
      instructor: (data.instructor || "Faculty Lead").trim(),
      state: data.state || data.status || "Active",
      status: data.state || data.status || "Active",
      tone: data.tone || "blue",
      description: data.description || `Comprehensive industry curriculum in ${programName}.`,
      batches: Array.isArray(data.batches) ? data.batches : ["2023–27", "2024–28", "2026–27"],
      modules: Array.isArray(data.modules) ? data.modules : [],
      createdAt: data.createdAt || now,
      updatedAt: now
    };
  }
}
