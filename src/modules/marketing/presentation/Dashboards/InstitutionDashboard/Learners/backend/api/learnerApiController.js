/**
 * Learner API Controller
 * Business logic and HTTP response formatting for learner endpoints.
 */

import { learnerDatabase } from "../db/learnerDatabase.js";
import { LearnerModel } from "../models/LearnerModel.js";

export class LearnerApiController {
  static async getLearners(params = {}) {
    try {
      const page = parseInt(params.page || "1", 10);
      const limit = parseInt(params.limit || "10", 10);
      const { search, department, batch, status, sortBy, sortOrder } = params;

      const result = await learnerDatabase.getAll({
        search,
        department,
        batch,
        status,
        sortBy,
        sortOrder,
        page,
        limit
      });

      return {
        status: 200,
        data: {
          learners: result.learners,
          pagination: {
            page: result.page,
            limit: result.limit,
            total: result.total,
            totalPages: result.totalPages
          }
        }
      };
    } catch (err) {
      return {
        status: 500,
        error: err.message || "Failed to fetch learners"
      };
    }
  }

  static async getLearnerById(id) {
    try {
      const learner = await learnerDatabase.getById(id);
      if (!learner) {
        return {
          status: 404,
          error: `Learner with ID "${id}" was not found.`
        };
      }
      return {
        status: 200,
        data: learner
      };
    } catch (err) {
      return {
        status: 500,
        error: err.message || "Failed to retrieve learner"
      };
    }
  }

  static async createLearner(body, userRole = "institution_admin") {
    try {
      // Role check: Only institution_admin and hr_manager may add learners
      if (userRole === "faculty" || userRole === "support_staff") {
        return {
          status: 403,
          error: "You do not have permission to add new learners."
        };
      }

      // Pre-validation
      const validation = LearnerModel.validate(body, false);
      if (!validation.isValid) {
        return {
          status: 400,
          error: "Validation failed",
          validationErrors: validation.errors
        };
      }

      const created = await learnerDatabase.create(body);
      return {
        status: 201,
        message: "Learner created successfully",
        data: created
      };
    } catch (err) {
      const isConflict = err.message && err.message.includes("already exists");
      return {
        status: isConflict ? 409 : 400,
        error: err.message || "Failed to create learner"
      };
    }
  }

  static async updateLearner(id, body, userRole = "institution_admin") {
    try {
      if (userRole === "support_staff") {
        return {
          status: 403,
          error: "You do not have permission to update learner records."
        };
      }

      const validation = LearnerModel.validate(body, true);
      if (!validation.isValid) {
        return {
          status: 400,
          error: "Validation failed",
          validationErrors: validation.errors
        };
      }

      const updated = await learnerDatabase.update(id, body);
      return {
        status: 200,
        message: "Learner updated successfully",
        data: updated
      };
    } catch (err) {
      const isNotFound = err.message && err.message.includes("not found");
      const isConflict = err.message && err.message.includes("already exists");
      return {
        status: isNotFound ? 404 : isConflict ? 409 : 400,
        error: err.message || "Failed to update learner"
      };
    }
  }

  static async deleteLearner(id, userRole = "institution_admin") {
    try {
      // Only Institution Admin can delete learners
      if (userRole !== "institution_admin") {
        return {
          status: 403,
          error: "Permission denied. Only Institution Admins can delete learners."
        };
      }

      await learnerDatabase.delete(id);
      return {
        status: 200,
        message: "Learner deleted successfully"
      };
    } catch (err) {
      const isNotFound = err.message && err.message.includes("not found");
      return {
        status: isNotFound ? 404 : 500,
        error: err.message || "Failed to delete learner"
      };
    }
  }

  static async getStatistics() {
    try {
      const stats = await learnerDatabase.getStatistics();
      return {
        status: 200,
        data: stats
      };
    } catch (err) {
      return {
        status: 500,
        error: err.message || "Failed to fetch learner statistics"
      };
    }
  }

  /**
   * Bulk CSV Import handler
   * Accepts array of learner objects parsed from CSV, validates and inserts them
   */
  static async importCsv(records, userRole = "institution_admin") {
    if (userRole !== "institution_admin" && userRole !== "hr_manager") {
      return {
        status: 403,
        error: "Permission denied for importing learners."
      };
    }

    if (!Array.isArray(records) || records.length === 0) {
      return {
        status: 400,
        error: "No records found in CSV to import."
      };
    }

    let importedCount = 0;
    const errors = [];
    const createdList = [];

    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      try {
        const payload = {
          fullName: row.fullName || row.name || row.Name || "",
          email: row.email || row.Email || "",
          phone: row.phone || row.Phone || "+91 90000 00000",
          department: row.department || row.Department || "CSE",
          course: row.course || row.programme || row.Course || "Full Stack Engineering",
          batch: row.batch || row.Batch || "2026–27",
          learnerId: row.learnerId || row.LearnerId || LearnerModel.generateLearnerId(),
          learningStatus: row.learningStatus || row.status || row.Status || "On track"
        };

        const res = await learnerDatabase.create(payload);
        createdList.push(res);
        importedCount++;
      } catch (err) {
        errors.push({
          row: i + 1,
          name: row.fullName || row.name || `Row ${i + 1}`,
          error: err.message
        });
      }
    }

    return {
      status: 200,
      data: {
        totalRows: records.length,
        importedCount,
        failedCount: errors.length,
        errors,
        createdList
      }
    };
  }
}
