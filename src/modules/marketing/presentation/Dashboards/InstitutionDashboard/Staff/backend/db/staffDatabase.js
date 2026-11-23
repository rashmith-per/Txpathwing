/**
 * Staff Database Engine
 * Implements transactional persistence with IndexedDB and In-Memory synchronization.
 * Supports schema versioning, constraints, migrations, and relationship integrity.
 */

import { initialStaffRecords } from "./initialStaffData.js";
import { StaffModel } from "../models/StaffModel.js";
import { StaffActivityLogModel, LOG_ACTIONS } from "../models/StaffActivityLogModel.js";

const DB_NAME = "TX_Pathwing_Institution_DB";
const DB_VERSION = 1;
const STORE_STAFF = "staff";
const STORE_LOGS = "activityLogs";

// In-Memory storage cache for instant sync and Node.js testing compatibility
let memoryStaffStore = [...initialStaffRecords.map((s) => StaffModel.sanitize(s))];
let memoryLogStore = [];

// Populate initial logs from seed data
memoryStaffStore.forEach((staff) => {
  if (Array.isArray(staff.activityLogs)) {
    memoryLogStore.push(...staff.activityLogs);
  }
});

let isInitialized = false;

function isIndexedDBAvailable() {
  return typeof window !== "undefined" && typeof window.indexedDB !== "undefined";
}

function openDatabase() {
  return new Promise((resolve) => {
    if (!isIndexedDBAvailable()) {
      return resolve(null);
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create Staff Object Store
        if (!db.objectStoreNames.contains(STORE_STAFF)) {
          const staffStore = db.createObjectStore(STORE_STAFF, { keyPath: "id" });
          staffStore.createIndex("staffId", "staffId", { unique: true });
          staffStore.createIndex("email", "email", { unique: true });
          staffStore.createIndex("department", "department", { unique: false });
          staffStore.createIndex("status", "status", { unique: false });
          staffStore.createIndex("category", "category", { unique: false });
        }

        // Create Activity Logs Store
        if (!db.objectStoreNames.contains(STORE_LOGS)) {
          const logStore = db.createObjectStore(STORE_LOGS, { keyPath: "id" });
          logStore.createIndex("staffId", "staffId", { unique: false });
          logStore.createIndex("timestamp", "timestamp", { unique: false });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.warn("IndexedDB open error, falling back to memory store:", event.target.error);
        resolve(null);
      };
    } catch (err) {
      console.warn("IndexedDB initialization caught exception:", err);
      resolve(null);
    }
  });
}

export const StaffDatabase = {
  async init() {
    if (isInitialized) return true;

    // Check localStorage backup if available
    if (typeof localStorage !== "undefined") {
      try {
        const stored = localStorage.getItem("tx_institution_staff_v1");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryStaffStore = parsed.map((s) => StaffModel.sanitize(s));
          }
        }
      } catch (e) {
        console.warn("Could not read backup storage:", e);
      }
    }

    const db = await openDatabase();
    if (db) {
      try {
        const count = await new Promise((res) => {
          const tx = db.transaction(STORE_STAFF, "readonly");
          const store = tx.objectStore(STORE_STAFF);
          const countReq = store.count();
          countReq.onsuccess = () => res(countReq.result);
          countReq.onerror = () => res(0);
        });

        if (count === 0) {
          // Seed database
          const writeTx = db.transaction([STORE_STAFF, STORE_LOGS], "readwrite");
          const staffStore = writeTx.objectStore(STORE_STAFF);
          const logStore = writeTx.objectStore(STORE_LOGS);

          for (const staff of memoryStaffStore) {
            staffStore.put(staff);
            if (Array.isArray(staff.activityLogs)) {
              for (const log of staff.activityLogs) {
                logStore.put(log);
              }
            }
          }
        } else {
          // Read from IndexedDB into memory store
          const readTx = db.transaction(STORE_STAFF, "readonly");
          const store = readTx.objectStore(STORE_STAFF);
          const allReq = store.getAll();
          allReq.onsuccess = () => {
            if (Array.isArray(allReq.result) && allReq.result.length > 0) {
              memoryStaffStore = allReq.result;
            }
          };
        }
      } catch (err) {
        console.warn("Database sync encountered non-blocking warning:", err);
      }
    }

    isInitialized = true;
    this._persistMemory();
    return true;
  },

  _persistMemory() {
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("tx_institution_staff_v1", JSON.stringify(memoryStaffStore));
        window.dispatchEvent(new CustomEvent("institution_staff_updated", { detail: { count: memoryStaffStore.length } }));
      } catch (e) {
        console.warn("Memory persistence to localStorage warning:", e);
      }
    }
  },

  async getAllStaff() {
    await this.init();
    return [...memoryStaffStore];
  },

  async getStaffById(idOrStaffId) {
    await this.init();
    if (!idOrStaffId) return null;
    const lookup = String(idOrStaffId).trim().toLowerCase();
    return (
      memoryStaffStore.find(
        (s) => s.id.toLowerCase() === lookup || s.staffId.toLowerCase() === lookup
      ) || null
    );
  },

  async findStaffByEmail(email) {
    await this.init();
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    return memoryStaffStore.find((s) => s.email.toLowerCase() === cleanEmail) || null;
  },

  async findStaffByStaffId(staffId) {
    await this.init();
    if (!staffId) return null;
    const cleanId = staffId.trim().toUpperCase();
    return memoryStaffStore.find((s) => s.staffId.toUpperCase() === cleanId) || null;
  },

  async insertStaff(staffData, actor = { name: "Institution Admin", email: "institution@pathwing.com" }) {
    await this.init();

    // 1. Validation
    const validation = StaffModel.validate(staffData);
    if (!validation.isValid) {
      throw { status: 400, message: "Validation failed", errors: validation.errors };
    }

    // 2. Uniqueness constraint check (Email & Staff ID)
    const existingEmail = await this.findStaffByEmail(staffData.email);
    if (existingEmail) {
      throw {
        status: 409,
        message: `A staff member with email '${staffData.email}' already exists.`,
        field: "email",
      };
    }

    const existingStaffId = await this.findStaffByStaffId(staffData.staffId);
    if (existingStaffId) {
      throw {
        status: 409,
        message: `Staff ID '${staffData.staffId}' is already assigned to another employee.`,
        field: "staffId",
      };
    }

    // 3. Create sanitized entity
    const newStaff = StaffModel.sanitize(staffData);

    // 4. Create initial activity log
    const initialLog = StaffActivityLogModel.createLogEntry({
      action: newStaff.status === "Pending Invitation" ? LOG_ACTIONS.INVITATION_SENT : LOG_ACTIONS.STAFF_CREATED,
      staffId: newStaff.staffId,
      staffName: newStaff.name,
      actorName: actor.name,
      actorEmail: actor.email,
      details: `Enrolled new staff member into ${newStaff.department} department as ${newStaff.designation}.`,
    });

    newStaff.activityLogs = [initialLog];
    memoryStaffStore.unshift(newStaff);
    memoryLogStore.unshift(initialLog);

    // 5. Persist to IndexedDB
    const db = await openDatabase();
    if (db) {
      try {
        const tx = db.transaction([STORE_STAFF, STORE_LOGS], "readwrite");
        tx.objectStore(STORE_STAFF).put(newStaff);
        tx.objectStore(STORE_LOGS).put(initialLog);
      } catch (err) {
        console.warn("IndexedDB write failed:", err);
      }
    }

    this._persistMemory();
    return newStaff;
  },

  async updateStaff(id, updates, actor = { name: "Institution Admin", email: "institution@pathwing.com" }) {
    await this.init();
    const existing = await this.getStaffById(id);
    if (!existing) {
      throw { status: 404, message: `Staff member with ID '${id}' was not found.` };
    }

    // Duplicate check for email if modified
    if (updates.email && updates.email.trim().toLowerCase() !== existing.email.toLowerCase()) {
      const emailConflict = await this.findStaffByEmail(updates.email);
      if (emailConflict && emailConflict.id !== existing.id) {
        throw {
          status: 409,
          message: `The email address '${updates.email}' is already in use by another staff member.`,
          field: "email",
        };
      }
    }

    // Duplicate check for staffId if modified
    if (updates.staffId && updates.staffId.trim().toUpperCase() !== existing.staffId.toUpperCase()) {
      const idConflict = await this.findStaffByStaffId(updates.staffId);
      if (idConflict && idConflict.id !== existing.id) {
        throw {
          status: 409,
          message: `The Staff ID '${updates.staffId}' is already assigned to another staff member.`,
          field: "staffId",
        };
      }
    }

    const mergedData = { ...existing, ...updates, id: existing.id };
    const validation = StaffModel.validate(mergedData, true);
    if (!validation.isValid) {
      throw { status: 400, message: "Validation failed on update", errors: validation.errors };
    }

    const updated = StaffModel.sanitize(mergedData);
    updated.createdAt = existing.createdAt;

    // Track changes diff
    const changedFields = [];
    ["name", "email", "phone", "department", "designation", "employmentType", "status", "role"].forEach((field) => {
      if (existing[field] !== updated[field]) {
        changedFields.push(`${field}: "${existing[field]}" → "${updated[field]}"`);
      }
    });

    const updateLog = StaffActivityLogModel.createLogEntry({
      action: LOG_ACTIONS.STAFF_UPDATED,
      staffId: updated.staffId,
      staffName: updated.name,
      actorName: actor.name,
      actorEmail: actor.email,
      details: changedFields.length > 0 ? `Updated: ${changedFields.join(", ")}` : "Profile updated without major attribute changes",
    });

    updated.activityLogs = [updateLog, ...(existing.activityLogs || [])];

    // Update in memory
    const index = memoryStaffStore.findIndex((s) => s.id === existing.id);
    if (index !== -1) {
      memoryStaffStore[index] = updated;
    }
    memoryLogStore.unshift(updateLog);

    // Update in IndexedDB
    const db = await openDatabase();
    if (db) {
      try {
        const tx = db.transaction([STORE_STAFF, STORE_LOGS], "readwrite");
        tx.objectStore(STORE_STAFF).put(updated);
        tx.objectStore(STORE_LOGS).put(updateLog);
      } catch (err) {
        console.warn("IndexedDB update failed:", err);
      }
    }

    this._persistMemory();
    return updated;
  },

  async updateStaffStatus(id, newStatus, reason = "", actor = { name: "Institution Admin", email: "institution@pathwing.com" }) {
    await this.init();
    const existing = await this.getStaffById(id);
    if (!existing) {
      throw { status: 404, message: `Staff member with ID '${id}' was not found.` };
    }

    const oldStatus = existing.status;
    existing.status = newStatus;
    existing.updatedAt = new Date().toISOString();

    const statusLog = StaffActivityLogModel.createLogEntry({
      action: LOG_ACTIONS.STATUS_CHANGED,
      staffId: existing.staffId,
      staffName: existing.name,
      actorName: actor.name,
      actorEmail: actor.email,
      details: `Status transitioned from '${oldStatus}' to '${newStatus}'. ${reason ? `Reason: ${reason}` : ""}`.trim(),
    });

    existing.activityLogs = [statusLog, ...(existing.activityLogs || [])];

    const index = memoryStaffStore.findIndex((s) => s.id === existing.id);
    if (index !== -1) {
      memoryStaffStore[index] = { ...existing };
    }
    memoryLogStore.unshift(statusLog);

    const db = await openDatabase();
    if (db) {
      try {
        const tx = db.transaction([STORE_STAFF, STORE_LOGS], "readwrite");
        tx.objectStore(STORE_STAFF).put(existing);
        tx.objectStore(STORE_LOGS).put(statusLog);
      } catch (err) {
        console.warn("IndexedDB status update failed:", err);
      }
    }

    this._persistMemory();
    return existing;
  },

  async deleteStaff(id, actor = { name: "Institution Admin", email: "institution@pathwing.com" }) {
    await this.init();
    const existing = await this.getStaffById(id);
    if (!existing) {
      throw { status: 404, message: `Staff member with ID '${id}' was not found.` };
    }

    const deletionLog = StaffActivityLogModel.createLogEntry({
      action: LOG_ACTIONS.STAFF_DELETED,
      staffId: existing.staffId,
      staffName: existing.name,
      actorName: actor.name,
      actorEmail: actor.email,
      details: `Staff member ${existing.name} (${existing.staffId}) deleted from registry.`,
    });

    memoryStaffStore = memoryStaffStore.filter((s) => s.id !== existing.id);
    memoryLogStore.unshift(deletionLog);

    const db = await openDatabase();
    if (db) {
      try {
        const tx = db.transaction([STORE_STAFF, STORE_LOGS], "readwrite");
        tx.objectStore(STORE_STAFF).delete(existing.id);
        tx.objectStore(STORE_LOGS).put(deletionLog);
      } catch (err) {
        console.warn("IndexedDB delete failed:", err);
      }
    }

    this._persistMemory();
    return { success: true, message: `Staff record ${existing.staffId} successfully deleted.` };
  },

  async getStatistics() {
    await this.init();
    const all = memoryStaffStore;

    const totalStaff = all.length;
    const activeStaff = all.filter((s) => s.status === "Active").length;
    const inactiveStaff = all.filter((s) => s.status === "Inactive").length;
    const onLeaveStaff = all.filter((s) => s.status === "On Leave").length;
    const pendingInvitations = all.filter((s) => s.status === "Pending Invitation").length;
    const teachingStaff = all.filter((s) => s.category === "Teaching").length;
    const nonTeachingStaff = all.filter((s) => s.category === "Non-Teaching").length;

    // Breakdown by department
    const departmentBreakdown = {};
    all.forEach((s) => {
      departmentBreakdown[s.department] = (departmentBreakdown[s.department] || 0) + 1;
    });

    // Breakdown by employment type
    const employmentTypeBreakdown = {};
    all.forEach((s) => {
      employmentTypeBreakdown[s.employmentType] = (employmentTypeBreakdown[s.employmentType] || 0) + 1;
    });

    return {
      totalStaff,
      activeStaff,
      inactiveStaff,
      onLeaveStaff,
      pendingInvitations,
      teachingStaff,
      nonTeachingStaff,
      departmentBreakdown,
      employmentTypeBreakdown,
    };
  },

  async resetToSeedData() {
    memoryStaffStore = [...initialStaffRecords.map((s) => StaffModel.sanitize(s))];
    memoryLogStore = [];
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("tx_institution_staff_v1");
    }
    this._persistMemory();
    return true;
  },
};
