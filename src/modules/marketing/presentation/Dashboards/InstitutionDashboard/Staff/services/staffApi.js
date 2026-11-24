/**
 * Static mock staff API stub.
 * Zero backend, zero storage dependencies, zero fetch calls.
 * Preserves method names, argument shapes, and return shapes expected by
 * Overview.jsx and any consumer.
 */

import { initialStaffRecords, INITIAL_STAFF_STATS } from "../staffData.js";

export const staffApi = {
  getStatistics: async () => {
    return {
      ...INITIAL_STAFF_STATS,
      data: { ...INITIAL_STAFF_STATS }
    };
  },

  getStaffStatistics: async () => {
    return {
      data: { ...INITIAL_STAFF_STATS },
      ...INITIAL_STAFF_STATS
    };
  },

  getStaffList: async (params = {}) => {
    let list = [...initialStaffRecords];
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (s) =>
          (s.name || "").toLowerCase().includes(q) ||
          (s.email || "").toLowerCase().includes(q) ||
          (s.staffId || "").toLowerCase().includes(q)
      );
    }
    if (params.department && params.department !== "All") {
      list = list.filter((s) => s.department === params.department);
    }
    if (params.status && params.status !== "All") {
      list = list.filter((s) => s.status === params.status);
    }
    return {
      data: list,
      pagination: {
        page: 1,
        limit: 10,
        total: list.length,
        totalPages: 1
      }
    };
  },

  createStaff: async (staffData) => {
    return {
      success: true,
      data: { id: `stf_${Date.now()}`, ...staffData }
    };
  },

  updateStaff: async (staffId, staffData) => {
    return {
      success: true,
      data: { id: staffId, ...staffData }
    };
  },

  updateStaffStatus: async (staffId, status) => {
    return {
      success: true,
      data: { id: staffId, status }
    };
  },

  deleteStaff: async (staffId) => {
    return {
      success: true,
      id: staffId
    };
  }
};
