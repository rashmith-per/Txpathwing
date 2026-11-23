/**
 * Learner Database Engine
 * Transactional IndexedDB persistence with memory caching and broadcast events.
 */

import { INITIAL_LEARNERS } from "./initialLearnersData.js";
import { LearnerModel } from "../models/LearnerModel.js";

const DB_NAME = "TX_Pathwing_Learners_DB";
const DB_VERSION = 1;
const STORE_NAME = "learners";

class LearnerDatabase {
  constructor() {
    this.memoryStore = new Map();
    this.isInitialized = false;
    this.initPromise = null;
    this.db = null;

    // Load initial seed learners into memory cache immediately
    INITIAL_LEARNERS.forEach((learner) => {
      const sanitized = LearnerModel.sanitize(learner);
      this.memoryStore.set(sanitized.id, sanitized);
    });
  }

  async init() {
    if (this.isInitialized) return this;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      // Check for browser IndexedDB environment
      if (typeof window === "undefined" || !window.indexedDB) {
        this.isInitialized = true;
        resolve(this);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("email", "email", { unique: true });
          store.createIndex("learnerId", "learnerId", { unique: true });
          store.createIndex("department", "department", { unique: false });
          store.createIndex("batch", "batch", { unique: false });
          store.createIndex("status", "status", { unique: false });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        await this._loadFromIndexedDB();
        this.isInitialized = true;
        resolve(this);
      };

      request.onerror = () => {
        // Fall back to memoryStore gracefully
        this.isInitialized = true;
        resolve(this);
      };
    });

    return this.initPromise;
  }

  async _loadFromIndexedDB() {
    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = async () => {
        const records = request.result || [];
        if (records.length === 0) {
          // First run: seed IndexedDB with initial learners
          await this._seedIndexedDB();
        } else {
          this.memoryStore.clear();
          records.forEach((rec) => {
            this.memoryStore.set(rec.id, rec);
          });
        }
        resolve();
      };

      request.onerror = () => {
        resolve();
      };
    });
  }

  async _seedIndexedDB() {
    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      INITIAL_LEARNERS.forEach((learner) => {
        const sanitized = LearnerModel.sanitize(learner);
        store.put(sanitized);
        this.memoryStore.set(sanitized.id, sanitized);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    });
  }

  async _persistRecord(record) {
    if (!this.db) return;
    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.put(record);
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  async _deleteRecord(id) {
    if (!this.db) return;
    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.delete(id);
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  _notifyChange() {
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("institution_learners_updated"));
    }
  }

  /**
   * Retrieves all learners with filtering, search, sorting and pagination
   */
  async getAll(options = {}) {
    await this.init();

    const {
      search = "",
      department = "",
      batch = "",
      status = "",
      sortBy = "fullName",
      sortOrder = "asc",
      page = 1,
      limit = 10
    } = options;

    let records = Array.from(this.memoryStore.values());

    // 1. Search filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      records = records.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.learnerId.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q) ||
          r.course.toLowerCase().includes(q)
      );
    }

    // 2. Department filter
    if (department && department !== "All departments") {
      records = records.filter(
        (r) => r.department.toLowerCase() === department.toLowerCase()
      );
    }

    // 3. Batch filter
    if (batch && batch !== "All batches") {
      records = records.filter((r) => r.batch === batch);
    }

    // 4. Status filter
    if (status && status !== "All statuses") {
      records = records.filter(
        (r) => r.status.toLowerCase() === status.toLowerCase() ||
               r.learningStatus.toLowerCase() === status.toLowerCase()
      );
    }

    // 5. Sorting
    records.sort((a, b) => {
      let valA = a[sortBy] ?? "";
      let valB = b[sortBy] ?? "";

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const total = records.length;
    const startIndex = (page - 1) * limit;
    const paginatedRecords = limit > 0 ? records.slice(startIndex, startIndex + limit) : records;

    return {
      learners: paginatedRecords,
      total,
      page,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1
    };
  }

  /**
   * Retrieves single learner by ID
   */
  async getById(id) {
    await this.init();
    return this.memoryStore.get(id) || null;
  }

  /**
   * Retrieves single learner by email address
   */
  async getByEmail(email) {
    await this.init();
    const cleanEmail = (email || "").trim().toLowerCase();
    for (const learner of this.memoryStore.values()) {
      if (learner.email.toLowerCase() === cleanEmail) {
        return learner;
      }
    }
    return null;
  }

  /**
   * Retrieves single learner by unique Learner ID
   */
  async getByLearnerId(learnerId) {
    await this.init();
    const cleanId = (learnerId || "").trim().toUpperCase();
    for (const learner of this.memoryStore.values()) {
      if (learner.learnerId.toUpperCase() === cleanId) {
        return learner;
      }
    }
    return null;
  }

  /**
   * Creates a new learner record with validation and uniqueness checks
   */
  async create(data) {
    await this.init();

    // 1. Validate fields
    const validation = LearnerModel.validate(data, false);
    if (!validation.isValid) {
      throw new Error(`Validation Error: ${JSON.stringify(validation.errors)}`);
    }

    // 2. Prevent duplicate email
    const existingEmail = await this.getByEmail(data.email);
    if (existingEmail) {
      throw new Error(`A learner with email "${data.email}" already exists.`);
    }

    // 3. Prevent duplicate Learner ID
    if (data.learnerId) {
      const existingId = await this.getByLearnerId(data.learnerId);
      if (existingId) {
        throw new Error(`A learner with ID "${data.learnerId}" already exists.`);
      }
    }

    // 4. Sanitize and persist
    const sanitized = LearnerModel.sanitize(data);
    this.memoryStore.set(sanitized.id, sanitized);
    await this._persistRecord(sanitized);

    this._notifyChange();
    return sanitized;
  }

  /**
   * Updates an existing learner record
   */
  async update(id, updates) {
    await this.init();

    const existing = this.memoryStore.get(id);
    if (!existing) {
      throw new Error(`Learner with ID "${id}" not found.`);
    }

    // Validate updates
    const mergedCandidate = { ...existing, ...updates };
    const validation = LearnerModel.validate(mergedCandidate, true);
    if (!validation.isValid) {
      throw new Error(`Validation Error: ${JSON.stringify(validation.errors)}`);
    }

    // Check duplicate email
    if (updates.email && updates.email.toLowerCase() !== existing.email.toLowerCase()) {
      const emailConflict = await this.getByEmail(updates.email);
      if (emailConflict && emailConflict.id !== id) {
        throw new Error(`A learner with email "${updates.email}" already exists.`);
      }
    }

    // Check duplicate learner ID
    if (updates.learnerId && updates.learnerId.toUpperCase() !== existing.learnerId.toUpperCase()) {
      const idConflict = await this.getByLearnerId(updates.learnerId);
      if (idConflict && idConflict.id !== id) {
        throw new Error(`A learner with ID "${updates.learnerId}" already exists.`);
      }
    }

    const merged = LearnerModel.sanitize({
      ...existing,
      ...updates,
      id
    });

    this.memoryStore.set(id, merged);
    await this._persistRecord(merged);

    this._notifyChange();
    return merged;
  }

  /**
   * Deletes a learner record
   */
  async delete(id) {
    await this.init();

    const existing = this.memoryStore.get(id);
    if (!existing) {
      throw new Error(`Learner with ID "${id}" not found.`);
    }

    this.memoryStore.delete(id);
    await this._deleteRecord(id);

    this._notifyChange();
    return true;
  }

  /**
   * Calculates dynamic statistics based on current database records
   */
  async getStatistics() {
    await this.init();

    const all = Array.from(this.memoryStore.values());
    const total = all.length;

    let activeThisTerm = 0;
    let placementReady = 0;
    let needSupport = 0;
    let totalProgress = 0;

    const byDepartment = {};
    const byStatus = {};

    all.forEach((learner) => {
      const s = (learner.status || "").toLowerCase();

      if (s === "on track" || s === "placement ready") {
        activeThisTerm++;
      }
      if (s === "placement ready") {
        placementReady++;
      }
      if (s === "needs support" || s === "at risk") {
        needSupport++;
      }

      totalProgress += learner.progress || 0;

      // Grouping
      byDepartment[learner.department] = (byDepartment[learner.department] || 0) + 1;
      byStatus[learner.status] = (byStatus[learner.status] || 0) + 1;
    });

    const averageProgress = total > 0 ? Math.round(totalProgress / total) : 0;

    return {
      total,
      activeThisTerm,
      placementReady,
      needSupport,
      averageProgress,
      byDepartment,
      byStatus
    };
  }

  /**
   * Resets database to initial seed data
   */
  async resetToSeed() {
    this.memoryStore.clear();
    INITIAL_LEARNERS.forEach((learner) => {
      const sanitized = LearnerModel.sanitize(learner);
      this.memoryStore.set(sanitized.id, sanitized);
    });

    if (this.db) {
      const transaction = this.db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.clear();
      INITIAL_LEARNERS.forEach((l) => store.put(LearnerModel.sanitize(l)));
    }

    this._notifyChange();
  }
}

export const learnerDatabase = new LearnerDatabase();
