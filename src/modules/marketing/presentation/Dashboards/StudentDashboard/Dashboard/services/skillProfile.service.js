/**
 * Dynamic Skill Profile Service
 * Aggregates skills from all enrolled courses and calculates proficiency strictly
 * from syllabus topic completions without duplicate entries.
 */

import { getCourseByIdOrCode } from "./courseCatalogue.data.js";

export const SKILL_STATUS = {
  NOT_STARTED: "Not Started",
  LEARNING: "Learning",
  DEVELOPING: "Developing",
  PROFICIENT: "Proficient",
  COMPLETED: "Completed",
};

export const SKILL_STATUS_COLORS = {
  "Not Started": {
    bg: "#f8fafc",
    border: "#e2e8f0",
    text: "#64748b",
    fill: "#cbd5e1",
  },
  Learning: {
    bg: "#fffbeb",
    border: "#fde68a",
    text: "#b45309",
    fill: "#f59e0b",
  },
  Developing: {
    bg: "#eef2ff",
    border: "#c7d2fe",
    text: "#4338ca",
    fill: "#6366f1",
  },
  Proficient: {
    bg: "#eff6ff",
    border: "#bfdbfe",
    text: "#1d4ed8",
    fill: "#3b82f6",
  },
  Completed: {
    bg: "#ecfdf5",
    border: "#a7f3d0",
    text: "#047857",
    fill: "#10b981",
  },
};

export const skillProfileService = {
  /**
   * Determine skill status based on topic completion percentage
   * @param {number} pct - Progress percentage (0 - 100)
   * @returns {string} Status from SKILL_STATUS
   */
  classifyStatus(pct) {
    if (pct <= 0) return SKILL_STATUS.NOT_STARTED;
    if (pct < 40) return SKILL_STATUS.LEARNING;
    if (pct < 75) return SKILL_STATUS.DEVELOPING;
    if (pct < 100) return SKILL_STATUS.PROFICIENT;
    return SKILL_STATUS.COMPLETED;
  },

  /**
   * Aggregate student skills across all enrolled courses
   * @param {Array} enrollments - Array of enrolled course objects
   * @param {Object} allProgressMap - Map of courseId -> { topics: { [topicId]: { status } } }
   * @returns {Array} List of consolidated skill objects
   */
  calculateSkillProfile(enrollments = [], allProgressMap = {}) {
    if (!Array.isArray(enrollments) || enrollments.length === 0) {
      return [];
    }

    const skillMap = new Map();

    enrollments.forEach((enrollment) => {
      const rawId = enrollment.courseId || enrollment.id || enrollment.code;
      const course = getCourseByIdOrCode(rawId);
      if (!course) return;

      const courseProg = allProgressMap[course.id] || allProgressMap[course.code] || {};
      const topicStatuses = courseProg.topics || {};

      (course.modules || []).forEach((mod) => {
        (mod.topics || []).forEach((topic) => {
          const isCompleted = topicStatuses[topic.id]?.status === "completed";
          const topicKey = `${course.id}:${mod.id}:${topic.id}`;

          // Map each skill defined on the topic or fallback to course skills
          const skillsToMap =
            Array.isArray(topic.skills) && topic.skills.length > 0
              ? topic.skills
              : course.skills || [];

          skillsToMap.forEach((skillName) => {
            const cleanSkillName = skillName.trim();
            if (!cleanSkillName) return;

            if (!skillMap.has(cleanSkillName)) {
              skillMap.set(cleanSkillName, {
                skillName: cleanSkillName,
                sourceCourses: new Map(),
                topics: new Map(),
              });
            }

            const record = skillMap.get(cleanSkillName);
            if (!record.sourceCourses.has(course.id)) {
              record.sourceCourses.set(course.id, {
                id: course.id,
                code: course.code,
                title: course.title,
              });
            }

            if (!record.topics.has(topicKey)) {
              record.topics.set(topicKey, {
                key: topicKey,
                courseId: course.id,
                topicTitle: topic.title,
                isCompleted,
              });
            }
          });
        });
      });
    });

    const result = Array.from(skillMap.values()).map((entry) => {
      const allTopics = Array.from(entry.topics.values());
      const totalTopics = allTopics.length;
      const completedTopics = allTopics.filter((t) => t.isCompleted).length;
      const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
      const remainingTopics = totalTopics - completedTopics;
      const status = this.classifyStatus(progressPercent);
      const colorScheme = SKILL_STATUS_COLORS[status] || SKILL_STATUS_COLORS["Not Started"];

      const courseNames = Array.from(entry.sourceCourses.values())
        .map((c) => c.title)
        .join(" & ");

      return {
        name: entry.skillName,
        associatedCourses: courseNames,
        coursesCount: entry.sourceCourses.size,
        progressPercent,
        status,
        color: colorScheme.fill,
        badgeStyle: colorScheme,
        completedTopics,
        remainingTopics,
        totalTopics,
      };
    });

    // Sort by progress descending, then by name
    return result.sort((a, b) => b.progressPercent - a.progressPercent || a.name.localeCompare(b.name));
  },
};
