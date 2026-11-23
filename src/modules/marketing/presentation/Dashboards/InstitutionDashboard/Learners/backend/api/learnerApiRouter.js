/**
 * Learner API Router
 * Dispatches simulated REST requests to LearnerApiController.
 */

import { LearnerApiController } from "./learnerApiController.js";

export class LearnerApiRouter {
  static async dispatch(method, path, body = null, queryParams = {}, userRole = "institution_admin") {
    const cleanPath = path.replace(/^\/api\/institution\/learners\/?/, "");

    // 1. GET /api/institution/learners/stats
    if (method === "GET" && (cleanPath === "stats" || cleanPath === "statistics")) {
      return LearnerApiController.getStatistics();
    }

    // 2. POST /api/institution/learners/import-csv
    if (method === "POST" && cleanPath === "import-csv") {
      return LearnerApiController.importCsv(body?.records || body, userRole);
    }

    // 3. GET /api/institution/learners
    if (method === "GET" && !cleanPath) {
      return LearnerApiController.getLearners(queryParams);
    }

    // 4. GET /api/institution/learners/:id
    if (method === "GET" && cleanPath) {
      return LearnerApiController.getLearnerById(cleanPath);
    }

    // 5. POST /api/institution/learners
    if (method === "POST" && !cleanPath) {
      return LearnerApiController.createLearner(body, userRole);
    }

    // 6. PUT /api/institution/learners/:id
    if (method === "PUT" && cleanPath) {
      return LearnerApiController.updateLearner(cleanPath, body, userRole);
    }

    // 7. DELETE /api/institution/learners/:id
    if (method === "DELETE" && cleanPath) {
      return LearnerApiController.deleteLearner(cleanPath, userRole);
    }

    return {
      status: 404,
      error: `Endpoint not found: ${method} /api/institution/learners/${cleanPath}`
    };
  }
}
