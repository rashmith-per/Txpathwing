import {
  normalizeModulesList,
  addModuleToList,
  updateModuleInList,
  deleteModuleFromList,
  reorderModuleInList,
  addTopicToModules,
  updateTopicInModules,
  deleteTopicFromModules,
  reorderTopicInModules,
  computeSyllabusMetrics
} from "../../MyCourses/utils/topicOperations.js";
import { courseService } from "../../MyCourses/services/courseService.js";
import { suggestCourseCode } from "../../MyCourses/validation/courseValidation.js";
import {
  DEFAULT_AGENTIC_TOPIC,
  createDefaultAgenticModules,
  createTopicAwareModules
} from "./blueprintTemplates.js";
import {
  DRAFT_STORAGE_KEY,
  storageKeyFor,
  readEnvelope,
  writeEnvelope,
  clearDraftStorage,
  loadDraftState,
  saveWorkingDraft,
  commitDraftChanges,
  revertWorkingDraft
} from "./curriculumDraftStorage.js";

class CurriculumDraftService {
  _storageKeyFor(instructorId) {
    return storageKeyFor(instructorId);
  }

  _readEnvelope(instructorId) {
    return readEnvelope(instructorId);
  }

  _writeEnvelope(instructorId, envelope) {
    writeEnvelope(instructorId, envelope);
  }

  loadDraftState(instructorId) {
    return loadDraftState(instructorId);
  }

  saveWorkingDraft(workingSyllabus, committedSyllabus, instructorId) {
    return saveWorkingDraft(workingSyllabus, committedSyllabus, instructorId);
  }

  commitDraftChanges(syllabus, instructorId) {
    return commitDraftChanges(syllabus, instructorId);
  }

  revertWorkingDraft(committedSyllabus, instructorId) {
    return revertWorkingDraft(committedSyllabus, instructorId);
  }

  clearDraft(instructorId) {
    clearDraftStorage(instructorId);
  }

  _withUpdatedModules(syllabus, updatedModules) {
    const { modulesCount, topicsCount } = computeSyllabusMetrics(updatedModules);
    return {
      ...syllabus,
      modulesCount,
      topicsCount,
      modules: updatedModules,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Update draft course metadata fields (title, code, category, level, price, description, etc.)
   */
  updateCourseMetadata(syllabus, updatedFields) {
    if (!syllabus) return null;
    return {
      ...syllabus,
      ...updatedFields,
      title: updatedFields?.title !== undefined ? updatedFields.title.trim() : syllabus.title,
      code:
        updatedFields?.code !== undefined
          ? String(updatedFields.code).trim().toUpperCase()
          : syllabus.code,
      totalHours:
        updatedFields?.totalHours !== undefined
          ? Number(updatedFields.totalHours)
          : syllabus.totalHours || syllabus.estimatedHours,
      estimatedHours:
        updatedFields?.totalHours !== undefined
          ? Number(updatedFields.totalHours)
          : syllabus.estimatedHours || syllabus.totalHours,
      price:
        updatedFields?.price !== undefined ? Number(updatedFields.price) : syllabus.price ?? 19999,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Immutable module CRUD & reorder methods delegating to shared topicOperations.js.
   */
  addModuleToSyllabus(syllabus, moduleData) {
    const scopeId = syllabus?.draftId || "draft";
    const updatedModules = addModuleToList(syllabus.modules, scopeId, moduleData);
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  updateModuleInSyllabus(syllabus, moduleId, updatedFields) {
    const updatedModules = updateModuleInList(syllabus.modules, moduleId, updatedFields);
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  deleteModuleFromSyllabus(syllabus, moduleId) {
    const updatedModules = deleteModuleFromList(syllabus.modules, moduleId);
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  reorderModuleInSyllabus(syllabus, moduleId, direction) {
    const updatedModules = reorderModuleInList(syllabus.modules, moduleId, direction);
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  /**
   * Immutable topic mutation methods delegating to shared topicOperations.js.
   */
  addTopicToSyllabus(syllabus, moduleId, topicData) {
    const updatedModules = addTopicToModules(syllabus.modules, moduleId, topicData);
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  updateTopicInSyllabus(syllabus, moduleId, topicId, updatedFields) {
    const updatedModules = updateTopicInModules(
      syllabus.modules,
      moduleId,
      topicId,
      updatedFields
    );
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  deleteTopicFromSyllabus(syllabus, moduleId, topicId) {
    const updatedModules = deleteTopicFromModules(syllabus.modules, moduleId, topicId);
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  reorderTopicInSyllabus(syllabus, moduleId, topicId, direction) {
    const updatedModules = reorderTopicInModules(
      syllabus.modules,
      moduleId,
      topicId,
      direction
    );
    return this._withUpdatedModules(syllabus, updatedModules);
  }

  /**
   * Publish draft curriculum (AI-generated or manual) through unified courseService + syllabusService
   * so created courses immediately persist in My Courses with identical management capabilities.
   */
  async publishCourseCurriculum(syllabus, instructorId) {
    if (!syllabus || !Array.isArray(syllabus.modules)) {
      throw new Error("Generate or build a course curriculum before publishing.");
    }

    const modePrefix = syllabus.generationMode === "manual" ? "crs-inst" : "crs-ai";
    const courseId = syllabus.existingCourseId || `${modePrefix}-${Date.now()}`;

    const courseInput = {
      id: courseId,
      title: syllabus.title || DEFAULT_AGENTIC_TOPIC,
      code: syllabus.code || suggestCourseCode(syllabus.title, "AGENT-AI"),
      category: syllabus.category || "Artificial Intelligence & Systems",
      level: syllabus.level || "Advanced",
      description: syllabus.description || "",
      targetAudience: syllabus.targetAudience || "Software Engineers & Full Stack Developers",
      status: syllabus.status || "Published",
      totalHours: Number(syllabus.totalHours || syllabus.estimatedHours) || 52,
      price: Number(syllabus.price ?? 19999),
      generationMode: syllabus.generationMode || "ai"
    };

    const { course } = await courseService.createCourse(
      courseInput,
      syllabus.modules,
      instructorId
    );

    this.clearDraft(instructorId);
    return course;
  }
}

export const curriculumDraftService = new CurriculumDraftService();
export default curriculumDraftService;

