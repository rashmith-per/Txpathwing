import { generateDefaultModules } from "./defaultSyllabusTemplates.js";
/**
 * Syllabus Service
 * Centralized data access and persistence layer for Course Syllabus & Topics.
 * Uses localStorage persistence to ensure changes survive page refreshes,
 * and exposes an asynchronous Promise-based API prepared for future REST API integration.
 */

import {
  normalizeModulesList,
  addModuleToList,
  updateModuleInList,
  deleteModuleFromList,
  reorderModuleInList,
  addTopicToModules,
  updateTopicInModules,
  deleteTopicFromModules,
  reorderTopicInModules
} from "../utils/topicOperations.js";

const STORAGE_KEY = "tx_instructor_course_syllabus_v1";

class SyllabusService {
  constructor() {
    this._memoryStore = {};
    this._apiEndpoint = null; // Future REST API: e.g. "/api/v1/instructor/courses"
  }

  /**
   * Safely read all course syllabi from storage
   */
  _loadStorage() {
    try {
      if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            this._memoryStore = parsed;
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn("[SyllabusService] Storage read error:", err);
    }
    return this._memoryStore;
  }

  /**
   * Safely persist syllabi map to storage and notify subscribers
   */
  _saveStorage(allSyllabi, updatedCourseId, updatedModules) {
    this._memoryStore = allSyllabi || {};
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._memoryStore));
      }
    } catch (err) {
      console.warn("[SyllabusService] Storage write error:", err);
    }

    if (typeof window !== "undefined" && updatedCourseId) {
      window.dispatchEvent(
        new CustomEvent("tx_syllabus_updated", {
          detail: { courseId: updatedCourseId, modules: updatedModules }
        })
      );
    }
  }

  /**
   * Generate canonical standard modules for a course if none exist
   */
  _generateDefaultModules(course) {
    return generateDefaultModules(course);
  }

  _normalizeModules(courseId, rawModules) {
    return normalizeModulesList(courseId, rawModules);
  }

  /**
   * Persist an authored/edited syllabus for a newly published or updated course.
   * Ensures customized AI-generated curricula carry over directly into My Courses.
   * @param {string} courseId
   * @param {Array<Object>} rawModules
   * @returns {Promise<Array>} Normalized saved modules
   */
  async saveCourseSyllabus(courseId, rawModules) {
    if (!courseId) {
      throw new Error("Course ID is required to save syllabus.");
    }
    const store = this._loadStorage();
    const normalized = this._normalizeModules(courseId, rawModules);
    store[courseId] = normalized;
    this._saveStorage(store, courseId, normalized);
    return Promise.resolve(JSON.parse(JSON.stringify(normalized)));
  }

  /**
   * Fetch syllabus for a course.
   * Resolves from persistent storage, course.modules, or generated template.
   * @param {Object} course - The course record
   * @returns {Promise<Array>} List of modules with normalized topics
   */
  async getCourseSyllabus(course) {
    if (!course || !course.id) {
      return Promise.resolve([]);
    }

    const courseId = course.id;
    const store = this._loadStorage();

    if (store[courseId] && Array.isArray(store[courseId])) {
      return Promise.resolve(JSON.parse(JSON.stringify(store[courseId])));
    }

    let initialModules;
    if (course.modules && course.modules.length > 0) {
      initialModules = this._normalizeModules(courseId, course.modules);
    } else {
      initialModules = this._generateDefaultModules(course);
    }

    store[courseId] = initialModules;
    this._saveStorage(store, courseId, initialModules);

    return Promise.resolve(JSON.parse(JSON.stringify(initialModules)));
  }

  async _mutateStoredModules(courseId, mutator) {
    if (!courseId) {
      throw new Error("Course ID is required.");
    }
    const store = this._loadStorage();
    const modules = store[courseId];
    if (!modules) {
      throw new Error(`Syllabus for course ${courseId} not found.`);
    }

    const updatedModules = mutator(modules);
    store[courseId] = updatedModules;
    this._saveStorage(store, courseId, updatedModules);

    return Promise.resolve(JSON.parse(JSON.stringify(updatedModules)));
  }

  /**
   * Add a new module to a course syllabus
   */
  async addModule(courseId, moduleData) {
    if (!courseId) {
      throw new Error("Course ID is required.");
    }
    const store = this._loadStorage();
    const existingModules = Array.isArray(store[courseId]) ? store[courseId] : [];
    const updatedModules = addModuleToList(existingModules, courseId, moduleData);
    store[courseId] = updatedModules;
    this._saveStorage(store, courseId, updatedModules);
    return Promise.resolve(JSON.parse(JSON.stringify(updatedModules)));
  }

  /**
   * Update an existing syllabus module
   */
  async updateModule(courseId, moduleId, updatedFields) {
    if (!courseId || !moduleId) {
      throw new Error("Course ID and Module ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      updateModuleInList(modules, moduleId, updatedFields)
    );
  }

  /**
   * Delete a syllabus module (and its topics)
   */
  async deleteModule(courseId, moduleId) {
    if (!courseId || !moduleId) {
      throw new Error("Course ID and Module ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      deleteModuleFromList(modules, moduleId)
    );
  }

  /**
   * Reorder a module one slot up or down within a course syllabus
   */
  async reorderModule(courseId, moduleId, direction) {
    if (!courseId || !moduleId) {
      throw new Error("Course ID and Module ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      reorderModuleInList(modules, moduleId, direction)
    );
  }

  /**
   * Add a new topic to a specific module in a course
   * @param {string} courseId
   * @param {string} moduleId
   * @param {Object} topicData - { title, description, duration, order }
   * @returns {Promise<Array>} Updated modules
   */
  async addTopic(courseId, moduleId, topicData) {
    if (!courseId || !moduleId) {
      throw new Error("Course ID and Module ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      addTopicToModules(modules, moduleId, topicData)
    );
  }

  /**
   * Update an existing syllabus topic
   * @param {string} courseId
   * @param {string} moduleId
   * @param {string} topicId
   * @param {Object} updatedFields - { title, description, duration, order }
   * @returns {Promise<Array>} Updated modules
   */
  async updateTopic(courseId, moduleId, topicId, updatedFields) {
    if (!courseId || !moduleId || !topicId) {
      throw new Error("Course ID, Module ID, and Topic ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      updateTopicInModules(modules, moduleId, topicId, updatedFields)
    );
  }

  /**
   * Delete an existing syllabus topic
   * @param {string} courseId
   * @param {string} moduleId
   * @param {string} topicId
   * @returns {Promise<Array>} Updated modules
   */
  async deleteTopic(courseId, moduleId, topicId) {
    if (!courseId || !moduleId || !topicId) {
      throw new Error("Course ID, Module ID, and Topic ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      deleteTopicFromModules(modules, moduleId, topicId)
    );
  }

  /**
   * Reorder a topic up or down within a module
   * @param {string} courseId
   * @param {string} moduleId
   * @param {string} topicId
   * @param {"up"|"down"} direction
   * @returns {Promise<Array>} Updated modules
   */
  async reorderTopic(courseId, moduleId, topicId, direction) {
    if (!courseId || !moduleId || !topicId) {
      throw new Error("Course ID, Module ID, and Topic ID are required.");
    }
    return this._mutateStoredModules(courseId, (modules) =>
      reorderTopicInModules(modules, moduleId, topicId, direction)
    );
  }

  /**
   * Remove a course's stored syllabus cleanly when a course is permanently deleted.
   */
  async deleteCourseSyllabus(courseId) {
    if (!courseId) return;
    const store = this._loadStorage();
    delete store[courseId];
    this._saveStorage(store, null, null);
  }

  /**
   * Reset course syllabus back to defaults (useful for testing & resets)
   * @param {Object} course
   * @returns {Promise<Array>}
   */
  async resetCourseSyllabus(course) {
    if (!course || !course.id) return [];
    const store = this._loadStorage();
    delete store[course.id];
    this._saveStorage(store, null, null);
    return this.getCourseSyllabus(course);
  }
}

export const syllabusService = new SyllabusService();
export default syllabusService;
