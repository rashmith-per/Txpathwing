/**
 * Staff Activity Log Model
 * Tracks audit trail of all staff lifecycle events
 */

export const LOG_ACTIONS = {
  STAFF_CREATED: "STAFF_CREATED",
  STAFF_UPDATED: "STAFF_UPDATED",
  STATUS_CHANGED: "STATUS_CHANGED",
  STAFF_DELETED: "STAFF_DELETED",
  ROLE_CHANGED: "ROLE_CHANGED",
  INVITATION_SENT: "INVITATION_SENT",
};

export const StaffActivityLogModel = {
  createLogEntry({
    action,
    staffId,
    staffName,
    actorName = "Institution Admin",
    actorEmail = "institution@pathwing.com",
    details = "",
    changes = null,
  }) {
    return {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      action,
      staffId,
      staffName,
      actorName,
      actorEmail,
      details,
      changes: changes || {},
    };
  },

  formatAction(action) {
    switch (action) {
      case LOG_ACTIONS.STAFF_CREATED:
        return "Staff Enrolled";
      case LOG_ACTIONS.STAFF_UPDATED:
        return "Profile Updated";
      case LOG_ACTIONS.STATUS_CHANGED:
        return "Status Changed";
      case LOG_ACTIONS.STAFF_DELETED:
        return "Staff Archived/Deleted";
      case LOG_ACTIONS.ROLE_CHANGED:
        return "Permissions Modified";
      case LOG_ACTIONS.INVITATION_SENT:
        return "Invitation Dispatched";
      default:
        return action;
    }
  },
};
