/**
 * Static mock learning API stub.
 * Zero backend, zero storage dependencies, zero fetch calls.
 * Preserves method names, argument shapes, and return shapes expected by
 * Overview.jsx, Programmes.jsx, and any consumer.
 */

import {
  INITIAL_PROGRAMS,
  INITIAL_ENROLLMENTS,
  INITIAL_LEARNING_STATS
} from "../learningsData.js";

export const learningApi = {
  getPrograms: async (filters = {}) => {
    let progs = [...INITIAL_PROGRAMS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      progs = progs.filter(
        (p) =>
          (p.name || p.title || "").toLowerCase().includes(q) ||
          (p.code || "").toLowerCase().includes(q)
      );
    }
    if (filters.category && filters.category !== "All categories") {
      progs = progs.filter((p) => p.category === filters.category);
    }
    if (filters.status && filters.status !== "All statuses") {
      progs = progs.filter((p) => (p.status || p.state) === filters.status);
    }
    return progs;
  },

  getProgramById: async (programId) => {
    return (
      INITIAL_PROGRAMS.find((p) => p.id === programId) || INITIAL_PROGRAMS[0]
    );
  },

  getEnrollments: async (filters = {}) => {
    let enrs = [...INITIAL_ENROLLMENTS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      enrs = enrs.filter(
        (e) =>
          (e.learnerName || "").toLowerCase().includes(q) ||
          (e.learnerEmail || "").toLowerCase().includes(q)
      );
    }
    if (filters.batch && filters.batch !== "All batches") {
      enrs = enrs.filter((e) => e.batch === filters.batch);
    }
    if (filters.programId && filters.programId !== "All programs") {
      enrs = enrs.filter((e) => e.programId === filters.programId);
    }
    return enrs;
  },

  getStatistics: async () => {
    return { ...INITIAL_LEARNING_STATS };
  },

  createProgram: async (programData) => {
    return {
      success: true,
      data: { id: `prog_${Date.now()}`, ...programData }
    };
  },

  updateProgram: async (programId, updateData) => {
    return {
      success: true,
      data: { id: programId, ...updateData }
    };
  },

  deleteProgram: async (programId) => {
    return { success: true, programId };
  },

  toggleProgramStatus: async (programId) => {
    const prog = INITIAL_PROGRAMS.find((p) => p.id === programId) || {
      name: "Program",
      status: "Active"
    };
    const nextStatus = prog.status === "Active" ? "Draft" : "Active";
    return {
      id: programId,
      name: prog.name || prog.title || "Program",
      status: nextStatus
    };
  },

  createEnrollment: async (enrollmentData) => {
    return {
      success: true,
      data: { id: `enr_${Date.now()}`, ...enrollmentData }
    };
  },

  addModule: async (programId, moduleData) => {
    return { success: true, id: `mod_${Date.now()}`, ...moduleData };
  },

  updateModule: async (programId, moduleId, moduleData) => {
    return { success: true, programId, moduleId, ...moduleData };
  },

  deleteModule: async (programId, moduleId) => {
    return { success: true, programId, moduleId };
  },

  addTopic: async (programId, moduleId, topicData) => {
    return { success: true, id: `top_${Date.now()}`, ...topicData };
  },

  deleteTopic: async (programId, moduleId, topicId) => {
    return { success: true, programId, moduleId, topicId };
  },

  reorderTopic: async (programId, moduleId, topicId, direction) => {
    return { success: true, programId, moduleId, topicId, direction };
  },

  toggleTopicCompletion: async (enrollmentId, topicId) => {
    return {
      success: true,
      enrollment: {
        id: enrollmentId,
        completedTopicIds: [topicId]
      },
      computed: { progressPercentage: 75 }
    };
  }
};
