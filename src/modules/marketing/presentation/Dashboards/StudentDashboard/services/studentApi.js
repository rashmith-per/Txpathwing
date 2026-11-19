/**
 * Central Student LMS API Service
 * Decoupled client API layer providing async methods for enrollments,
 * syllabus topic progress, and dynamic skill profiles.
 */

import { COURSE_CATALOGUE, getCourseByIdOrCode } from "./courseCatalogue.data";
import { learningProgressService } from "./learningProgress.service";
import { skillProfileService } from "./skillProfile.service";
import {
  STORAGE_KEYS,
  ensureDemoProgressSeeded,
  getAllTopicProgress,
  saveAllTopicProgress,
} from "./studentStorage.service";

export const studentApi = {
  init() {
    ensureDemoProgressSeeded();
  },

  getAllTopicProgress() {
    return getAllTopicProgress();
  },

  saveAllTopicProgress(data) {
    saveAllTopicProgress(data);
  },

  async getEnrollments() {
    ensureDemoProgressSeeded();
    const allProgress = this.getAllTopicProgress();

    let rawList = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES);
      if (stored) rawList = JSON.parse(stored);
    } catch {
      rawList = [];
    }

    if (!Array.isArray(rawList) || rawList.length === 0) {
      rawList = [
        { courseId: "aws-dop", code: "AWS-DOP" },
        { courseId: "java-fs", code: "JAVA-FS" },
      ];
    }

    return rawList
      .map((item) => {
        const rawId = item.courseId || item.id || item.code || "";
        const course = getCourseByIdOrCode(rawId);
        if (!course) return null;

        const cProg = allProgress[course.id] || allProgress[course.code] || {};
        const metrics = learningProgressService.computeCourseProgress(
          course,
          cProg.topics || {},
          cProg.lastAccessedTopicId
        );

        return {
          id: course.id,
          courseId: course.id,
          code: course.code,
          courseCode: course.code,
          title: course.title,
          category: course.category,
          level: course.level,
          instructor: course.instructor.name,
          instructorRole: course.instructor.role,
          image: course.image,
          currentModule: metrics.currentModule,
          progressPercent: metrics.overallProgressPercent,
          completedTopics: metrics.completedTopics,
          remainingTopics: metrics.remainingTopics,
          totalTopics: metrics.totalTopics,
          lastAccessedTopicId: cProg.lastAccessedTopicId,
          lastAccessedTopic: metrics.lastAccessedTopic,
          nextIncompleteTopic: metrics.nextIncompleteTopic,
          estimatedRemainingDuration: metrics.estimatedRemainingDuration,
          enrolledAt: item.enrolledAt || Date.now(),
        };
      })
      .filter(Boolean);
  },

  async getCourseLearningDetails(courseId) {
    ensureDemoProgressSeeded();
    const course = getCourseByIdOrCode(courseId);
    if (!course) throw new Error(`Course not found: ${courseId}`);

    const allProgress = this.getAllTopicProgress();
    const cProg = allProgress[course.id] || allProgress[course.code] || {};

    const progressMetrics = learningProgressService.computeCourseProgress(
      course,
      cProg.topics || {},
      cProg.lastAccessedTopicId
    );

    return {
      course,
      progressMetrics,
      lastAccessedTopicId: cProg.lastAccessedTopicId,
    };
  },

  async enrollCourse(courseInput) {
    ensureDemoProgressSeeded();
    const rawId = typeof courseInput === "string" ? courseInput : courseInput?.id || courseInput?.code;
    const course = getCourseByIdOrCode(rawId);

    if (!course) return { success: false, message: "Course not found in catalogue." };

    const currentEnrollments = await this.getEnrollments();
    const isAlready = currentEnrollments.some(
      (e) => e.courseId.toLowerCase() === course.id.toLowerCase()
    );

    if (isAlready) {
      return { success: false, message: `Already enrolled in ${course.title}.` };
    }

    const allProgress = this.getAllTopicProgress();
    allProgress[course.id] = {
      lastAccessedTopicId: course.modules?.[0]?.topics?.[0]?.id || null,
      topics: {},
    };
    this.saveAllTopicProgress(allProgress);

    const newEnrollment = {
      id: course.id,
      courseId: course.id,
      code: course.code,
      courseCode: course.code,
      title: course.title,
      category: course.category,
      instructor: course.instructor.name,
      progressPercent: 0,
      currentModule: course.modules?.[0] ? `Module 1: ${course.modules[0].title}` : "Module 1",
      enrolledAt: Date.now(),
    };

    const updatedRaw = [...currentEnrollments, newEnrollment];
    localStorage.setItem(STORAGE_KEYS.ENROLLED_COURSES, JSON.stringify(updatedRaw));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("enrollmentChanged", { detail: newEnrollment }));

    return {
      success: true,
      course: newEnrollment,
      message: `Successfully enrolled in ${course.title}!`,
    };
  },

  async updateTopicProgress({ courseId, topicId, status }) {
    ensureDemoProgressSeeded();
    const course = getCourseByIdOrCode(courseId);
    if (!course) throw new Error(`Course not found: ${courseId}`);

    const allProgress = this.getAllTopicProgress();
    if (!allProgress[course.id]) {
      allProgress[course.id] = { lastAccessedTopicId: topicId, topics: {} };
    }

    const cProg = allProgress[course.id];
    cProg.lastAccessedTopicId = topicId;
    if (!cProg.topics) cProg.topics = {};
    cProg.topics[topicId] = {
      status,
      completedAt: status === "completed" ? Date.now() : null,
    };

    this.saveAllTopicProgress(allProgress);

    const metrics = learningProgressService.computeCourseProgress(
      course,
      cProg.topics,
      cProg.lastAccessedTopicId
    );

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES) || "[]");
      const updatedList = stored.map((e) => {
        const eId = (e.courseId || e.id || e.code || "").toLowerCase();
        if (eId === course.id.toLowerCase() || eId === course.code.toLowerCase()) {
          return {
            ...e,
            progressPercent: metrics.overallProgressPercent,
            currentModule: metrics.currentModule,
          };
        }
        return e;
      });
      localStorage.setItem(STORAGE_KEYS.ENROLLED_COURSES, JSON.stringify(updatedList));
    } catch {
      // Ignored
    }

    return { success: true, metrics };
  },

  async setLastAccessedTopic(courseId, topicId) {
    const course = getCourseByIdOrCode(courseId);
    if (!course) return;

    const allProgress = this.getAllTopicProgress();
    if (!allProgress[course.id]) {
      allProgress[course.id] = { lastAccessedTopicId: topicId, topics: {} };
    } else {
      allProgress[course.id].lastAccessedTopicId = topicId;
    }

    if (!allProgress[course.id].topics) allProgress[course.id].topics = {};
    const curr = allProgress[course.id].topics[topicId]?.status;
    if (!curr || curr === "not-started") {
      allProgress[course.id].topics[topicId] = {
        status: "in-progress",
        completedAt: null,
      };
    }

    this.saveAllTopicProgress(allProgress);
  },

  async getSkillProfile() {
    const enrollments = await this.getEnrollments();
    const allProgress = this.getAllTopicProgress();
    return skillProfileService.calculateSkillProfile(enrollments, allProgress);
  },

  async getRecommendedCourses() {
    const enrollments = await this.getEnrollments();
    const enrolledIds = new Set(
      enrollments.map((e) => (e.courseId || e.id || e.code || "").toLowerCase())
    );

    return COURSE_CATALOGUE.filter(
      (c) => !enrolledIds.has(c.id.toLowerCase()) && !enrolledIds.has(c.code.toLowerCase())
    );
  },
};
