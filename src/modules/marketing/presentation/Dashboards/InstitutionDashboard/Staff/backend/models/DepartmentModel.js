import { departments } from "../../../Overview/overviewData.js";

/**
 * Department Model
 * Reuses existing department definitions from Overview/overviewData.js
 */
export const DepartmentModel = {
  getDepartments() {
    return departments.map((d) => ({
      code: d.name,
      name: `${d.name} Engineering`,
      shortName: d.name,
      completionRate: d.completion || 0,
    }));
  },

  isValidDepartment(deptName) {
    if (!deptName) return false;
    const normalized = deptName.trim().toUpperCase();
    return departments.some(
      (d) => d.name.toUpperCase() === normalized || `${d.name} ENGINEERING`.toUpperCase() === normalized
    );
  },

  normalizeDepartment(deptName) {
    if (!deptName) return "";
    const match = departments.find(
      (d) => d.name.toUpperCase() === deptName.trim().toUpperCase()
    );
    return match ? match.name : deptName.trim();
  }
};
