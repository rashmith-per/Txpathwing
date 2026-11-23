/**
 * Enrollment Model
 * Mathematical calculation of learning progress based on completed topics and modules.
 */

export class EnrollmentModel {
  /**
   * Calculates progress metrics from actual module & topic completion
   * @param {Object} enrollment
   * @param {Object} program
   * @returns {{ completedTopicsCount: number, totalTopicsCount: number, completedModulesCount: number, remainingModulesCount: number, progressPercentage: number, status: string }}
   */
  static computeProgress(enrollment, program) {
    if (!program || !Array.isArray(program.modules) || program.modules.length === 0) {
      return {
        completedTopicsCount: 0,
        totalTopicsCount: 0,
        completedModulesCount: 0,
        remainingModulesCount: 0,
        progressPercentage: enrollment?.progressPercentage || 0,
        status: enrollment?.status || "Enrolled"
      };
    }

    const completedTopicSet = new Set(enrollment.completedTopicIds || []);
    let totalTopicsCount = 0;
    let completedTopicsCount = 0;
    let completedModulesCount = 0;
    const totalModulesCount = program.modules.length;

    program.modules.forEach((mod) => {
      const topics = Array.isArray(mod.topics) ? mod.topics : [];
      totalTopicsCount += topics.length;

      let moduleAllTopicsDone = topics.length > 0;
      topics.forEach((t) => {
        if (completedTopicSet.has(t.id)) {
          completedTopicsCount++;
        } else {
          moduleAllTopicsDone = false;
        }
      });

      if (moduleAllTopicsDone && topics.length > 0) {
        completedModulesCount++;
      }
    });

    const remainingModulesCount = Math.max(0, totalModulesCount - completedModulesCount);
    const progressPercentage =
      totalTopicsCount > 0
        ? Math.round((completedTopicsCount / totalTopicsCount) * 100)
        : 0;

    let status = enrollment.status || "Enrolled";
    if (progressPercentage === 100) {
      status = "Completed";
    } else if (progressPercentage > 0) {
      status = "In Progress";
    }

    return {
      completedTopicsCount,
      totalTopicsCount,
      completedModulesCount,
      remainingModulesCount,
      progressPercentage,
      status
    };
  }

  static validate(data) {
    const errors = {};
    if (!data.learnerId) errors.learnerId = "Learner ID is required";
    if (!data.programId) errors.programId = "Program ID is required";
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static sanitize(data, program) {
    const now = new Date().toISOString();
    const id = data.id || `enr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const base = {
      id,
      learnerId: (data.learnerId || "").trim(),
      learnerName: (data.learnerName || data.name || "Learner").trim(),
      learnerEmail: (data.learnerEmail || data.email || "").trim().toLowerCase(),
      department: (data.department || "CSE").trim(),
      programId: (data.programId || "").trim(),
      programTitle: (data.programTitle || data.course || "Learning Program").trim(),
      batch: (data.batch || "2026–27").trim(),
      enrollmentDate: data.enrollmentDate || now.split("T")[0],
      completedTopicIds: Array.isArray(data.completedTopicIds) ? data.completedTopicIds : [],
      status: data.status || "Enrolled",
      progressPercentage: 0,
      createdAt: data.createdAt || now,
      updatedAt: now
    };

    if (program) {
      const computed = this.computeProgress(base, program);
      base.progressPercentage = computed.progressPercentage;
      base.completedModulesCount = computed.completedModulesCount;
      base.remainingModulesCount = computed.remainingModulesCount;
      base.status = computed.status;
    } else if (typeof data.progressPercentage === "number") {
      base.progressPercentage = data.progressPercentage;
    }

    return base;
  }
}
