import { validateCourseInput } from "../validation/courseValidation.js";
import { computeSyllabusMetrics } from "../utils/topicOperations.js";
import { syllabusService } from "./syllabusService.js";
import { checkCourseEnrollmentImpact } from "./courseImpactChecker.js";
import {
  COURSES_STORAGE_KEY,
  cloneData,
  formatShortDate,
  verifyInstructorAuthorization,
  normalizeCourseRecord,
  loadCoursesStore,
  saveCoursesStore,
  resetCoursesStore
} from "./courseStorage.js";

class CourseService {
  constructor() {
    this._apiEndpoint = null;
  }

  verifyInstructorAuthorization(instructorIdentity) {
    return verifyInstructorAuthorization(instructorIdentity);
  }

  _normalizeCourseRecord(course, defaultInstructorId = "inst-ramana-1") {
    return normalizeCourseRecord(course, defaultInstructorId);
  }

  _loadCoursesStore(instructorId = "inst-ramana-1") {
    return loadCoursesStore(instructorId);
  }

  _saveCoursesStore(courses) {
    return saveCoursesStore(courses);
  }

  async getCourses(instructorIdentity) {
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    const all = this._loadCoursesStore(instructorId);
    return cloneData(all.filter((c) => !c.instructorId || c.instructorId === instructorId));
  }

  async createCourse(courseInput, rawModules = [], instructorIdentity) {
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    const existing = await this.getCourses(instructorId);
    const validation = validateCourseInput(courseInput, { existingCourses: existing });
    if (!validation.isValid) {
      throw new Error(validation.errors[0]?.message || "Validation failed");
    }

    const { sanitized } = validation;
    const courseId = sanitized.id || `crs-inst-${Date.now()}`;

    let syllabusRecord = null;
    let metrics = { totalModules: 0, totalTopics: 0, totalDurationMinutes: 0 };
    if (Array.isArray(rawModules) && rawModules.length > 0) {
      syllabusRecord = await syllabusService.saveSyllabus(courseId, rawModules);
      metrics = computeSyllabusMetrics(rawModules);
    }

    const newRecord = this._normalizeCourseRecord({
      ...sanitized,
      id: courseId,
      instructorId,
      modulesCount: metrics.totalModules || sanitized.modulesCount || 4,
      topicsCount: metrics.totalTopics || (sanitized.modulesCount || 4) * 3,
      totalHours: metrics.totalDurationMinutes
        ? Math.max(1, Math.round(metrics.totalDurationMinutes / 60))
        : sanitized.totalHours || 40,
      status: sanitized.status || "Draft",
      lastUpdated: formatShortDate()
    }, instructorId);

    const updatedList = [newRecord, ...existing];
    this._saveCoursesStore(updatedList);
    return { course: cloneData(newRecord), syllabus: syllabusRecord };
  }

  async updateCourse(courseId, updatedFields, instructorIdentity) {
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    if (!courseId) throw new Error("Course ID is required for updating.");

    const existing = this._loadCoursesStore(instructorId);
    const targetIdx = existing.findIndex(
      (c) => String(c.id).toLowerCase() === String(courseId).toLowerCase()
    );
    if (targetIdx === -1) throw new Error(`Course not found: ${courseId}`);

    const currentCourse = existing[targetIdx];
    const candidate = { ...currentCourse, ...updatedFields, id: currentCourse.id };
    const validation = validateCourseInput(candidate, {
      existingCourses: existing.filter((c) => c.id !== currentCourse.id),
      isUpdate: true
    });
    if (!validation.isValid) {
      throw new Error(validation.errors[0]?.message || "Validation failed");
    }

    const merged = this._normalizeCourseRecord({
      ...currentCourse,
      ...validation.sanitized,
      lastUpdated: formatShortDate()
    }, instructorId);

    existing[targetIdx] = merged;
    this._saveCoursesStore(existing);
    return cloneData(merged);
  }

  async syncCourseSyllabusSummary(courseId, modules, instructorIdentity) {
    if (!courseId || !Array.isArray(modules)) return null;
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    const existing = this._loadCoursesStore(instructorId);
    const targetIdx = existing.findIndex(
      (c) => String(c.id).toLowerCase() === String(courseId).toLowerCase()
    );
    if (targetIdx === -1) return null;

    const metrics = computeSyllabusMetrics(modules);
    const updated = {
      ...existing[targetIdx],
      modulesCount: metrics.totalModules,
      topicsCount: metrics.totalTopics,
      totalHours: metrics.totalDurationMinutes
        ? Math.max(1, Math.round(metrics.totalDurationMinutes / 60))
        : existing[targetIdx].totalHours,
      lastUpdated: formatShortDate()
    };

    existing[targetIdx] = updated;
    this._saveCoursesStore(existing);
    return cloneData(updated);
  }

  checkCourseEnrollmentImpact(course, context) {
    return checkCourseEnrollmentImpact(course, context);
  }

  async archiveCourse(courseId, instructorIdentity) {
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    const existing = this._loadCoursesStore(instructorId);
    const targetIdx = existing.findIndex(
      (c) => String(c.id).toLowerCase() === String(courseId).toLowerCase()
    );
    if (targetIdx === -1) throw new Error(`Course not found: ${courseId}`);

    const archived = {
      ...existing[targetIdx],
      status: "Archived",
      isArchived: true,
      lastUpdated: formatShortDate()
    };
    existing[targetIdx] = archived;
    this._saveCoursesStore(existing);
    return cloneData(archived);
  }

  async restoreCourse(courseId, instructorIdentity) {
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    const existing = this._loadCoursesStore(instructorId);
    const targetIdx = existing.findIndex(
      (c) => String(c.id).toLowerCase() === String(courseId).toLowerCase()
    );
    if (targetIdx === -1) throw new Error(`Course not found: ${courseId}`);

    const restored = {
      ...existing[targetIdx],
      status: "Draft",
      isArchived: false,
      lastUpdated: formatShortDate()
    };
    existing[targetIdx] = restored;
    this._saveCoursesStore(existing);
    return cloneData(restored);
  }

  async deleteOrArchiveCourse(courseId, { learners = [], batches = [], forceArchive = false } = {}, instructorIdentity) {
    const instructorId = this.verifyInstructorAuthorization(instructorIdentity);
    if (!courseId) throw new Error("Course ID is required.");

    const existing = this._loadCoursesStore(instructorId);
    const targetCourse = existing.find(
      (c) => String(c.id).toLowerCase() === String(courseId).toLowerCase()
    );
    if (!targetCourse) throw new Error(`Course not found: ${courseId}`);

    const impact = this.checkCourseEnrollmentImpact(targetCourse, { learners, batches });
    if (impact.requiresArchive || forceArchive) {
      const archived = await this.archiveCourse(courseId, instructorId);
      return { action: "archived", course: archived, impact };
    }

    const remaining = existing.filter(
      (c) => String(c.id).toLowerCase() !== String(courseId).toLowerCase()
    );
    this._saveCoursesStore(remaining);
    await syllabusService.deleteSyllabus(courseId);
    return { action: "deleted", courseId, impact };
  }

  resetCourses() {
    resetCoursesStore();
  }
}

export const courseService = new CourseService();
export { COURSES_STORAGE_KEY };
