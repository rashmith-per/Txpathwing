/**
 * Learner Client API Service
 * Exposes methods consumed by React components to perform CRUD operations on learners.
 */

import { LearnerApiController } from "../backend/api/learnerApiController.js";

class LearnerApiService {
  async getLearners(params = {}) {
    const res = await LearnerApiController.getLearners(params);
    if (res.status >= 400) {
      throw new Error(res.error || "Failed to fetch learners");
    }
    return res.data;
  }

  async getLearnerById(id) {
    const res = await LearnerApiController.getLearnerById(id);
    if (res.status >= 400) {
      throw new Error(res.error || "Failed to fetch learner details");
    }
    return res.data;
  }

  async createLearner(data, userRole = "institution_admin") {
    const res = await LearnerApiController.createLearner(data, userRole);
    if (res.status >= 400) {
      const err = new Error(res.error || "Failed to create learner");
      err.validationErrors = res.validationErrors;
      err.status = res.status;
      throw err;
    }
    return res.data;
  }

  async updateLearner(id, data, userRole = "institution_admin") {
    const res = await LearnerApiController.updateLearner(id, data, userRole);
    if (res.status >= 400) {
      const err = new Error(res.error || "Failed to update learner");
      err.validationErrors = res.validationErrors;
      err.status = res.status;
      throw err;
    }
    return res.data;
  }

  async deleteLearner(id, userRole = "institution_admin") {
    const res = await LearnerApiController.deleteLearner(id, userRole);
    if (res.status >= 400) {
      const err = new Error(res.error || "Failed to delete learner");
      err.status = res.status;
      throw err;
    }
    return true;
  }

  async getStatistics() {
    const res = await LearnerApiController.getStatistics();
    if (res.status >= 400) {
      throw new Error(res.error || "Failed to fetch statistics");
    }
    return res.data;
  }

  async importCsv(records, userRole = "institution_admin") {
    const res = await LearnerApiController.importCsv(records, userRole);
    if (res.status >= 400) {
      throw new Error(res.error || "Failed to import CSV records");
    }
    return res.data;
  }
}

export const learnerApi = new LearnerApiService();
