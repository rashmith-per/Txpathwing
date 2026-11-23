/**
 * Staff Roles and Permissions Architecture (RBAC)
 */

export const STAFF_ROLES = {
  INSTITUTION_ADMIN: "institution_admin",
  HR_MANAGER: "hr_manager",
  DEPT_HEAD: "dept_head",
  FACULTY: "faculty",
  SUPPORT_STAFF: "support_staff",
};

export const STAFF_PERMISSIONS = {
  STAFF_VIEW_ALL: "staff:view_all",
  STAFF_VIEW_DEPT: "staff:view_dept",
  STAFF_VIEW_OWN: "staff:view_own",
  STAFF_CREATE: "staff:create",
  STAFF_EDIT: "staff:edit",
  STAFF_DELETE: "staff:delete",
  STAFF_CHANGE_STATUS: "staff:change_status",
  STAFF_MANAGE_ROLES: "staff:manage_roles",
  STAFF_VIEW_AUDIT: "staff:view_audit",
  STAFF_EXPORT: "staff:export",
};

export const ROLE_DEFINITIONS = {
  [STAFF_ROLES.INSTITUTION_ADMIN]: {
    id: STAFF_ROLES.INSTITUTION_ADMIN,
    name: "Institution Admin",
    description: "Full staff management access, deletion, and role provisioning across all departments.",
    badgeClass: "badge-admin",
    permissions: [
      STAFF_PERMISSIONS.STAFF_VIEW_ALL,
      STAFF_PERMISSIONS.STAFF_CREATE,
      STAFF_PERMISSIONS.STAFF_EDIT,
      STAFF_PERMISSIONS.STAFF_DELETE,
      STAFF_PERMISSIONS.STAFF_CHANGE_STATUS,
      STAFF_PERMISSIONS.STAFF_MANAGE_ROLES,
      STAFF_PERMISSIONS.STAFF_VIEW_AUDIT,
      STAFF_PERMISSIONS.STAFF_EXPORT,
    ],
  },
  [STAFF_ROLES.HR_MANAGER]: {
    id: STAFF_ROLES.HR_MANAGER,
    name: "HR Manager",
    description: "Create, update, view, and manage staff lifecycle across all departments.",
    badgeClass: "badge-hr",
    permissions: [
      STAFF_PERMISSIONS.STAFF_VIEW_ALL,
      STAFF_PERMISSIONS.STAFF_CREATE,
      STAFF_PERMISSIONS.STAFF_EDIT,
      STAFF_PERMISSIONS.STAFF_CHANGE_STATUS,
      STAFF_PERMISSIONS.STAFF_VIEW_AUDIT,
      STAFF_PERMISSIONS.STAFF_EXPORT,
    ],
  },
  [STAFF_ROLES.DEPT_HEAD]: {
    id: STAFF_ROLES.DEPT_HEAD,
    name: "Department Head",
    description: "Manage and monitor staff within their assigned department.",
    badgeClass: "badge-hod",
    permissions: [
      STAFF_PERMISSIONS.STAFF_VIEW_DEPT,
      STAFF_PERMISSIONS.STAFF_VIEW_ALL, // Read directory
      STAFF_PERMISSIONS.STAFF_EDIT,      // Limited to department
      STAFF_PERMISSIONS.STAFF_CHANGE_STATUS,
      STAFF_PERMISSIONS.STAFF_EXPORT,
    ],
  },
  [STAFF_ROLES.FACULTY]: {
    id: STAFF_ROLES.FACULTY,
    name: "Faculty",
    description: "View staff directory and access own detailed profile and assigned subjects.",
    badgeClass: "badge-faculty",
    permissions: [
      STAFF_PERMISSIONS.STAFF_VIEW_OWN,
      STAFF_PERMISSIONS.STAFF_VIEW_ALL,
    ],
  },
  [STAFF_ROLES.SUPPORT_STAFF]: {
    id: STAFF_ROLES.SUPPORT_STAFF,
    name: "Support Staff",
    description: "Access only explicitly authorized administrative directory information.",
    badgeClass: "badge-support",
    permissions: [
      STAFF_PERMISSIONS.STAFF_VIEW_ALL,
    ],
  },
};

export const StaffRoleModel = {
  getAllRoles() {
    return Object.values(ROLE_DEFINITIONS);
  },

  getRole(roleId) {
    if (!roleId) return ROLE_DEFINITIONS[STAFF_ROLES.FACULTY];
    const normalized = roleId.toLowerCase().replace(/[-\s]/g, "_");
    return ROLE_DEFINITIONS[normalized] || ROLE_DEFINITIONS[STAFF_ROLES.FACULTY];
  },

  hasPermission(userRole, requiredPermission, userDept = null, targetDept = null) {
    if (!userRole) return false;
    const roleDef = this.getRole(userRole);
    if (!roleDef) return false;

    // Super admin has all permissions
    if (roleDef.id === STAFF_ROLES.INSTITUTION_ADMIN) {
      return true;
    }

    const hasBasePerm = roleDef.permissions.includes(requiredPermission);
    if (!hasBasePerm) return false;

    // Department boundary check for Dept Head
    if (roleDef.id === STAFF_ROLES.DEPT_HEAD) {
      if (
        (requiredPermission === STAFF_PERMISSIONS.STAFF_EDIT ||
          requiredPermission === STAFF_PERMISSIONS.STAFF_CHANGE_STATUS) &&
        userDept &&
        targetDept &&
        userDept.toUpperCase() !== targetDept.toUpperCase()
      ) {
        return false;
      }
    }

    return true;
  },
};
