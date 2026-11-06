/**
 * Central Student LMS API Service
 * Decoupled client API layer providing async methods for enrollments,
 * syllabus topic progress, and dynamic skill profiles.
 * Backed by persistent storage with cross-tab/cross-component synchronization.
 */

import { COURSE_CATALOGUE, getCourseByIdOrCode } from "./courseCatalogue.data";
import { learningProgressService } from "./learningProgress.service";
import { skillProfileService } from "./skillProfile.service";

const STORAGE_KEYS = {
  ENROLLED_COURSES: "enrolledCourses",
  TOPIC_PROGRESS: "tx_student_topic_progress",
  DEMO_SEEDED: "tx_student_demo_seeded_v2",
};

// Seed initial topic progress for default demo courses if first time
function ensureDemoProgressSeeded() {
  try {
    const isSeeded = localStorage.getItem(STORAGE_KEYS.DEMO_SEEDED);
    if (!isSeeded) {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS) || "{}");

      if (!existing["java-fs"]) {
        existing["java-fs"] = {
          lastAccessedTopicId: "top-java-4",
          topics: {
            "top-java-1": { status: "completed", completedAt: Date.now() - 86400000 * 3 },
            "top-java-2": { status: "completed", completedAt: Date.now() - 86400000 * 2 },
            "top-java-3": { status: "completed", completedAt: Date.now() - 86400000 * 1 },
            "top-java-4": { status: "in-progress", completedAt: null },
          },
        };
      }

      if (!existing["aws-dop"]) {
        existing["aws-dop"] = {
          lastAccessedTopicId: "top-aws-1",
          topics: {
            "top-aws-1": { status: "in-progress", completedAt: null },
          },
        };
      }

      localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(existing));
      localStorage.setItem(STORAGE_KEYS.DEMO_SEEDED, "true");
    }
  } catch (err) {
    console.warn("Could not seed demo progress:", err);
  }
}

export const studentApi = {
  /**
   * Initialize service and seed demo progress
   */
  init() {
    ensureDemoProgressSeeded();
  },

  /**
   * Retrieve all topic progress across all enrolled courses
   * @returns {Object} Map of courseId -> { lastAccessedTopicId, topics: {} }
   */
  getAllTopicProgress() {
    ensureDemoProgressSeeded();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS) || "{}");
    } catch {
      return {};
    }
  },

  /**
   * Save all topic progress map
   * @param {Object} data - Complete topic progress map
   */
  saveAllTopicProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(data));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("topicProgressChanged", { detail: data }));
    } catch (err) {
      console.warn("Failed to persist topic progress:", err);
    }
  },

  /**
   * Get enrolled courses with up-to-date computed progress
   * @returns {Promise<Array>} List of enriched enrolled courses
   */
  async getEnrollments() {
    ensureDemoProgressSeeded();
    const allProgress = this.getAllTopicProgress();

    let rawList = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES);
      if (stored) {
        rawList = JSON.parse(stored);
      }
    } catch {
      rawList = [];
    }

    // Default courses if empty
    if (!Array.isArray(rawList) || rawList.length === 0) {
      rawList = [
        { courseId: "aws-dop", code: "AWS-DOP" },
        { courseId: "java-fs", code: "JAVA-FS" },
      ];
    }

    const enriched = rawList
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

    return enriched;
  },

  /**
   * Get learning details for a specific course
   * @param {string} courseId - Course ID or code
   * @returns {Promise<Object>} Full course details and live computed metrics
   */
  async getCourseLearningDetails(courseId) {
    ensureDemoProgressSeeded();
    const course = getCourseByIdOrCode(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }

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

  /**
   * Enroll the student in a new course
   * @param {string|Object} courseInput - Course ID, code, or course object
   * @returns {Promise<{ success: boolean, course?: Object, message: string }>}
   */
  async enrollCourse(courseInput) {
    ensureDemoProgressSeeded();
    const rawId = typeof courseInput === "string" ? courseInput : courseInput?.id || courseInput?.code;
    const course = getCourseByIdOrCode(rawId);

    if (!course) {
      return { success: false, message: "Course not found in catalogue." };
    }

    const currentEnrollments = await this.getEnrollments();
    const isAlready = currentEnrollments.some(
      (e) => e.courseId.toLowerCase() === course.id.toLowerCase()
    );

    if (isAlready) {
      return {
        success: false,
        message: `Already enrolled in ${course.title}.`,
      };
    }

    // Initialize progress for this course to 0% (all topics not started)
    const allProgress = this.getAllTopicProgress();
    allProgress[course.id] = {
      lastAccessedTopicId: course.modules?.[0]?.topics?.[0]?.id || null,
      topics: {},
    };
    this.saveAllTopicProgress(allProgress);

    // Save to enrolledCourses in localStorage
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

  /**
   * Update the status of a specific syllabus topic
   * @param {Object} params - { courseId, topicId, status }
   * @returns {Promise<Object>} Updated course progress metrics
   */
  async updateTopicProgress({ courseId, topicId, status }) {
    ensureDemoProgressSeeded();
    const course = getCourseByIdOrCode(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }

    const allProgress = this.getAllTopicProgress();
    if (!allProgress[course.id]) {
      allProgress[course.id] = { lastAccessedTopicId: topicId, topics: {} };
    }

    const cProg = allProgress[course.id];
    cProg.lastAccessedTopicId = topicId;

    if (!cProg.topics) cProg.topics = {};
    cProg.topics[topicId] = {
      status, // "completed" | "in-progress" | "not-started"
      completedAt: status === "completed" ? Date.now() : null,
    };

    this.saveAllTopicProgress(allProgress);

    // Recalculate metrics
    const metrics = learningProgressService.computeCourseProgress(
      course,
      cProg.topics,
      cProg.lastAccessedTopicId
    );

    // Sync progress percent in enrolledCourses list
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

    return {
      success: true,
      metrics,
    };
  },

  /**
   * Set last accessed topic without necessarily changing its completion status
   */
  async setLastAccessedTopic(courseId, topicId) {
    const course = getCourseByIdOrCode(courseId);
    if (!course) return;

    const allProgress = this.getAllTopicProgress();
    if (!allProgress[course.id]) {
      allProgress[course.id] = { lastAccessedTopicId: topicId, topics: {} };
    } else {
      allProgress[course.id].lastAccessedTopicId = topicId;
    }

    // If the topic is currently not-started, promote to in-progress
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

  /**
   * Get dynamic aggregated skill profile across all enrolled courses
   * @returns {Promise<Array>} List of skill items
   */
  async getSkillProfile() {
    const enrollments = await this.getEnrollments();
    const allProgress = this.getAllTopicProgress();
    return skillProfileService.calculateSkillProfile(enrollments, allProgress);
  },

  /**
   * Get recommended courses that the student has not yet enrolled in
   * @returns {Promise<Array>} List of available courses from catalogue
   */
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
