/**
 * Learning Client API Service
 * Exposes methods consumed by React components to perform operations on programs, modules, topics, and enrollments.
 */

import { LearningApiController } from "../backend/api/learningApiController.js";

class LearningApiService {
  async getPrograms(params = {}) {
    const res = await LearningApiController.getPrograms(params);
    if (res.status >= 400) throw new Error(res.error || "Failed to fetch programs");
    return res.data;
  }

  async getProgramById(id) {
    const res = await LearningApiController.getProgramById(id);
    if (res.status >= 400) throw new Error(res.error || "Failed to fetch program");
    return res.data;
  }

  async createProgram(data, userRole = "institution_admin") {
    const res = await LearningApiController.createProgram(data, userRole);
    if (res.status >= 400) throw new Error(res.error || "Failed to create program");
    return res.data;
  }

  async updateProgram(id, data, userRole = "institution_admin") {
    const res = await LearningApiController.updateProgram(id, data, userRole);
    if (res.status >= 400) throw new Error(res.error || "Failed to update program");
    return res.data;
  }

  async deleteProgram(id, userRole = "institution_admin") {
    const res = await LearningApiController.deleteProgram(id, userRole);
    if (res.status >= 400) throw new Error(res.error || "Failed to delete program");
    return true;
  }

  async toggleProgramStatus(id) {
    const res = await LearningApiController.toggleStatus(id);
    if (res.status >= 400) throw new Error(res.error || "Failed to toggle status");
    return res.data;
  }

  // Modules & Topics
  async addModule(programId, moduleData) {
    const res = await LearningApiController.addModule(programId, moduleData);
    if (res.status >= 400) throw new Error(res.error || "Failed to add module");
    return res.data;
  }

  async updateModule(programId, moduleId, moduleData) {
    const res = await LearningApiController.updateModule(programId, moduleId, moduleData);
    if (res.status >= 400) throw new Error(res.error || "Failed to update module");
    return res.data;
  }

  async deleteModule(programId, moduleId) {
    const res = await LearningApiController.deleteModule(programId, moduleId);
    if (res.status >= 400) throw new Error(res.error || "Failed to delete module");
    return true;
  }

  async addTopic(programId, moduleId, topicData) {
    const res = await LearningApiController.addTopic(programId, moduleId, topicData);
    if (res.status >= 400) throw new Error(res.error || "Failed to add topic");
    return res.data;
  }

  async updateTopic(programId, moduleId, topicId, topicData) {
    const res = await LearningApiController.updateTopic(programId, moduleId, topicId, topicData);
    if (res.status >= 400) throw new Error(res.error || "Failed to update topic");
    return res.data;
  }

  async deleteTopic(programId, moduleId, topicId) {
    const res = await LearningApiController.deleteTopic(programId, moduleId, topicId);
    if (res.status >= 400) throw new Error(res.error || "Failed to delete topic");
    return true;
  }

  async reorderTopic(programId, moduleId, topicId, direction) {
    const res = await LearningApiController.reorderTopic(programId, moduleId, topicId, direction);
    if (res.status >= 400) throw new Error(res.error || "Failed to reorder topic");
    return res.data;
  }

  // Enrollments
  async getEnrollments(params = {}) {
    const res = await LearningApiController.getEnrollments(params);
    if (res.status >= 400) throw new Error(res.error || "Failed to fetch enrollments");
    return res.data;
  }

  async createEnrollment(data, userRole = "institution_admin") {
    const res = await LearningApiController.createEnrollment(data, userRole);
    if (res.status >= 400) throw new Error(res.error || "Failed to enroll learner");
    return res.data;
  }

  async toggleTopicCompletion(enrollmentId, topicId) {
    const res = await LearningApiController.toggleTopicCompletion(enrollmentId, topicId);
    if (res.status >= 400) throw new Error(res.error || "Failed to update progress");
    return res.data;
  }

  async getStatistics() {
    const res = await LearningApiController.getStatistics();
    if (res.status >= 400) throw new Error(res.error || "Failed to fetch statistics");
    return res.data;
  }
}

export const learningApi = new LearningApiService();
