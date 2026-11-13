/**
 * Learning Progress Service
 * Calculates course progress, module progress, remaining topics, and next learning targets.
 * Strictly adheres to: Overall Progress = (Total Completed Topics / Total Course Topics) * 100
 */

export const learningProgressService = {
  /**
   * Compute comprehensive progress metrics for a given course
   * @param {Object} course - The course object with modules and topics
   * @param {Object} topicProgressMap - Object mapping topicId -> { status, completedAt }
   * @param {string} lastAccessedTopicId - ID of last topic accessed
   */
  computeCourseProgress(course, topicProgressMap = {}, lastAccessedTopicId = null) {
    if (!course || !Array.isArray(course.modules)) {
      return {
        overallProgressPercent: 0,
        completedTopics: 0,
        inProgressTopics: 0,
        remainingTopics: 0,
        totalTopics: 0,
        totalModules: 0,
        currentModule: "Module 1",
        lastAccessedTopic: null,
        nextIncompleteTopic: null,
        estimatedRemainingDuration: "0 hrs",
        moduleProgress: [],
      };
    }

    let totalTopics = 0;
    let completedTopics = 0;
    let inProgressTopics = 0;
    let remainingDurationSec = 0;

    let lastAccessedTopicObj = null;
    let nextIncompleteTopicObj = null;
    let currentModuleTitle = null;

    const moduleProgress = course.modules.map((mod, modIdx) => {
      const modTopics = Array.isArray(mod.topics) ? mod.topics : [];
      const modTotal = modTopics.length;
      let modCompleted = 0;
      let modInProgress = 0;

      const decoratedTopics = modTopics.map((topic, topicIdx) => {
        totalTopics += 1;
        const prog = topicProgressMap[topic.id] || { status: "not-started" };
        const status = prog.status || "not-started";

        if (status === "completed") {
          completedTopics += 1;
          modCompleted += 1;
        } else if (status === "in-progress") {
          inProgressTopics += 1;
          modInProgress += 1;
          remainingDurationSec += topic.durationSec || 2700;
        } else {
          remainingDurationSec += topic.durationSec || 2700;
        }

        const decorated = {
          ...topic,
          topicIndex: topicIdx + 1,
          moduleNumber: mod.moduleNumber || modIdx + 1,
          moduleTitle: mod.title,
          status,
          completedAt: prog.completedAt || null,
        };

        if (lastAccessedTopicId && topic.id === lastAccessedTopicId) {
          lastAccessedTopicObj = decorated;
        }

        if (!nextIncompleteTopicObj && (status === "in-progress" || status === "not-started")) {
          nextIncompleteTopicObj = decorated;
        }

        return decorated;
      });

      const modPct = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
      const modStatus =
        modCompleted === modTotal && modTotal > 0
          ? "Completed"
          : modCompleted > 0 || modInProgress > 0
          ? "In Progress"
          : "Not Started";

      if (!currentModuleTitle && modStatus !== "Completed") {
        currentModuleTitle = `Module ${mod.moduleNumber || modIdx + 1}: ${mod.title}`;
      }

      return {
        id: mod.id,
        moduleNumber: mod.moduleNumber || modIdx + 1,
        title: mod.title,
        duration: mod.duration,
        totalTopics: modTotal,
        completedTopics: modCompleted,
        inProgressTopics: modInProgress,
        remainingTopics: modTotal - modCompleted,
        progressPercent: modPct,
        status: modStatus,
        topics: decoratedTopics,
      };
    });

    const remainingTopics = totalTopics - completedTopics;
    const overallProgressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    // Fallback current module
    if (!currentModuleTitle && course.modules.length > 0) {
      const firstMod = course.modules[0];
      currentModuleTitle = `Module ${firstMod.moduleNumber || 1}: ${firstMod.title}`;
    }

    // Format estimated remaining duration
    const remHours = Math.round(remainingDurationSec / 3600);
    const remMins = Math.round((remainingDurationSec % 3600) / 60);
    const estimatedRemainingDuration =
      remHours > 0
        ? `${remHours} hr${remHours > 1 ? "s" : ""}${remMins > 0 ? ` ${remMins} min` : ""}`
        : `${remMins} mins`;

    return {
      overallProgressPercent,
      completedTopics,
      inProgressTopics,
      remainingTopics,
      totalTopics,
      totalModules: course.modules.length,
      currentModule: currentModuleTitle,
      lastAccessedTopic: lastAccessedTopicObj,
      nextIncompleteTopic: nextIncompleteTopicObj,
      estimatedRemainingDuration: remainingTopics === 0 ? "Course Completed ✓" : estimatedRemainingDuration,
      moduleProgress,
    };
  },
};
