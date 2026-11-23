/**
 * Learning API Router
 * Dispatches simulated REST requests to LearningApiController.
 */

import { LearningApiController } from "./learningApiController.js";

export class LearningApiRouter {
  static async dispatch(method, path, body = null, queryParams = {}, userRole = "institution_admin") {
    // 1. GET /api/institution/learning/stats
    if (method === "GET" && path.includes("/stats")) {
      return LearningApiController.getStatistics();
    }

    // 2. Enrollments: /api/institution/learning/enrollments
    if (path.includes("/enrollments")) {
      if (method === "GET") {
        return LearningApiController.getEnrollments(queryParams);
      }
      if (method === "POST" && path.includes("/toggle-topic")) {
        return LearningApiController.toggleTopicCompletion(body.enrollmentId, body.topicId);
      }
      if (method === "POST") {
        return LearningApiController.createEnrollment(body, userRole);
      }
    }

    // 3. Programs: /api/institution/learning/programs
    if (method === "GET" && path.endsWith("/programs")) {
      return LearningApiController.getPrograms(queryParams);
    }

    if (method === "POST" && path.endsWith("/programs")) {
      return LearningApiController.createProgram(body, userRole);
    }

    // Program by ID: /api/institution/learning/programs/:id
    const progMatch = path.match(/\/programs\/([^/]+)$/);
    if (progMatch) {
      const progId = progMatch[1];
      if (method === "GET") return LearningApiController.getProgramById(progId);
      if (method === "PUT") return LearningApiController.updateProgram(progId, body, userRole);
      if (method === "DELETE") return LearningApiController.deleteProgram(progId, userRole);
      if (method === "PATCH") return LearningApiController.toggleStatus(progId);
    }

    return {
      status: 404,
      error: `Endpoint not found: ${method} ${path}`
    };
  }
}
