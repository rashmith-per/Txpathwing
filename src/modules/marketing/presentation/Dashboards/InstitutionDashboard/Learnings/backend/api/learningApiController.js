/**
 * Learning API Controller
 * Business logic and HTTP response formatting for learning endpoints.
 */

import { learningDatabase } from "../db/learningDatabase.js";

export class LearningApiController {
  static async getPrograms(params = {}) {
    try {
      const programs = await learningDatabase.getAllPrograms(params);
      return { status: 200, data: programs };
    } catch (err) {
      return { status: 500, error: err.message || "Failed to fetch programs" };
    }
  }

  static async getProgramById(id) {
    try {
      const prog = await learningDatabase.getProgramById(id);
      if (!prog) return { status: 404, error: `Program with ID "${id}" was not found.` };
      return { status: 200, data: prog };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  }

  static async createProgram(body, userRole = "institution_admin") {
    try {
      if (userRole === "support_staff") {
        return { status: 403, error: "Permission denied for creating learning programs." };
      }
      const created = await learningDatabase.createProgram(body);
      return { status: 201, message: "Program created successfully", data: created };
    } catch (err) {
      return { status: 400, error: err.message || "Failed to create program" };
    }
  }

  static async updateProgram(id, body, userRole = "institution_admin") {
    try {
      if (userRole === "support_staff") {
        return { status: 403, error: "Permission denied for updating programs." };
      }
      const updated = await learningDatabase.updateProgram(id, body);
      return { status: 200, message: "Program updated successfully", data: updated };
    } catch (err) {
      const isNotFound = err.message && err.message.includes("not found");
      return { status: isNotFound ? 404 : 400, error: err.message };
    }
  }

  static async deleteProgram(id, userRole = "institution_admin") {
    try {
      if (userRole !== "institution_admin") {
        return { status: 403, error: "Only Institution Admins can delete programs." };
      }
      await learningDatabase.deleteProgram(id);
      return { status: 200, message: "Program deleted successfully" };
    } catch (err) {
      return { status: 404, error: err.message };
    }
  }

  static async toggleStatus(id) {
    try {
      const prog = await learningDatabase.toggleProgramStatus(id);
      return { status: 200, data: prog };
    } catch (err) {
      return { status: 404, error: err.message };
    }
  }

  // Modules & Topics
  static async addModule(programId, body) {
    try {
      const mod = await learningDatabase.addModule(programId, body);
      return { status: 201, data: mod };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async updateModule(programId, moduleId, body) {
    try {
      const mod = await learningDatabase.updateModule(programId, moduleId, body);
      return { status: 200, data: mod };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async deleteModule(programId, moduleId) {
    try {
      await learningDatabase.deleteModule(programId, moduleId);
      return { status: 200, message: "Module deleted" };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async addTopic(programId, moduleId, body) {
    try {
      const topic = await learningDatabase.addTopic(programId, moduleId, body);
      return { status: 201, data: topic };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async updateTopic(programId, moduleId, topicId, body) {
    try {
      const topic = await learningDatabase.updateTopic(programId, moduleId, topicId, body);
      return { status: 200, data: topic };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async deleteTopic(programId, moduleId, topicId) {
    try {
      await learningDatabase.deleteTopic(programId, moduleId, topicId);
      return { status: 200, message: "Topic deleted" };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async reorderTopic(programId, moduleId, topicId, direction) {
    try {
      const topics = await learningDatabase.reorderTopic(programId, moduleId, topicId, direction);
      return { status: 200, data: topics };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  // Enrollments
  static async getEnrollments(params = {}) {
    try {
      const records = await learningDatabase.getAllEnrollments(params);
      return { status: 200, data: records };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  }

  static async createEnrollment(body, userRole = "institution_admin") {
    try {
      if (userRole === "support_staff") {
        return { status: 403, error: "Permission denied for enrolling learners." };
      }
      const created = await learningDatabase.createEnrollment(body);
      return { status: 201, message: "Learner enrolled successfully", data: created };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async toggleTopicCompletion(enrollmentId, topicId) {
    try {
      const result = await learningDatabase.toggleTopicCompletion(enrollmentId, topicId);
      return { status: 200, data: result };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  static async getStatistics() {
    try {
      const stats = await learningDatabase.getStatistics();
      return { status: 200, data: stats };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  }
}
