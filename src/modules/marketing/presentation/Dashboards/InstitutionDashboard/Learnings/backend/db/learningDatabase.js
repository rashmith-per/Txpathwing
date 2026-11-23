/**
 * Learning Database Engine
 * IndexedDB + memory-sync persistence for programs, modules, topics, and enrollments.
 */

import { INITIAL_PROGRAMS, INITIAL_ENROLLMENTS } from "./initialLearningData.js";
import { LearningProgramModel } from "../models/LearningProgramModel.js";
import { EnrollmentModel } from "../models/EnrollmentModel.js";

const DB_NAME = "TX_Pathwing_Learning_DB";
const DB_VERSION = 1;
const STORE_PROGRAMS = "programs";
const STORE_ENROLLMENTS = "enrollments";

class LearningDatabase {
  constructor() {
    this.programsStore = new Map();
    this.enrollmentsStore = new Map();
    this.isInitialized = false;
    this.initPromise = null;
    this.db = null;

    // Load initial seed data into memory immediately
    INITIAL_PROGRAMS.forEach((prog) => {
      const sanitized = LearningProgramModel.sanitize(prog);
      this.programsStore.set(sanitized.id, sanitized);
    });

    INITIAL_ENROLLMENTS.forEach((enr) => {
      const prog = this.programsStore.get(enr.programId);
      const sanitized = EnrollmentModel.sanitize(enr, prog);
      this.enrollmentsStore.set(sanitized.id, sanitized);
    });
  }

  async init() {
    if (this.isInitialized) return this;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      if (typeof window === "undefined" || !window.indexedDB) {
        this.isInitialized = true;
        resolve(this);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_PROGRAMS)) {
          db.createObjectStore(STORE_PROGRAMS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_ENROLLMENTS)) {
          const enrStore = db.createObjectStore(STORE_ENROLLMENTS, { keyPath: "id" });
          enrStore.createIndex("learnerId", "learnerId", { unique: false });
          enrStore.createIndex("programId", "programId", { unique: false });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        await this._loadFromIndexedDB();
        this.isInitialized = true;
        resolve(this);
      };

      request.onerror = () => {
        this.isInitialized = true;
        resolve(this);
      };
    });

    return this.initPromise;
  }

  async _loadFromIndexedDB() {
    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_PROGRAMS, STORE_ENROLLMENTS], "readonly");
        const progReq = tx.objectStore(STORE_PROGRAMS).getAll();
        const enrReq = tx.objectStore(STORE_ENROLLMENTS).getAll();

        tx.oncomplete = async () => {
          const progs = progReq.result || [];
          const enrs = enrReq.result || [];

          if (progs.length === 0) {
            await this._seedIndexedDB();
          } else {
            this.programsStore.clear();
            progs.forEach((p) => this.programsStore.set(p.id, p));

            this.enrollmentsStore.clear();
            enrs.forEach((e) => this.enrollmentsStore.set(e.id, e));
          }
          resolve();
        };

        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  async _seedIndexedDB() {
    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_PROGRAMS, STORE_ENROLLMENTS], "readwrite");
        const progStore = tx.objectStore(STORE_PROGRAMS);
        const enrStore = tx.objectStore(STORE_ENROLLMENTS);

        INITIAL_PROGRAMS.forEach((prog) => {
          const sanitized = LearningProgramModel.sanitize(prog);
          progStore.put(sanitized);
          this.programsStore.set(sanitized.id, sanitized);
        });

        INITIAL_ENROLLMENTS.forEach((enr) => {
          const prog = this.programsStore.get(enr.programId);
          const sanitized = EnrollmentModel.sanitize(enr, prog);
          enrStore.put(sanitized);
          this.enrollmentsStore.set(sanitized.id, sanitized);
        });

        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  async _persistProgram(record) {
    if (!this.db) return;
    try {
      const tx = this.db.transaction([STORE_PROGRAMS], "readwrite");
      tx.objectStore(STORE_PROGRAMS).put(record);
    } catch {
      // fallback
    }
  }

  async _deleteProgramFromDb(id) {
    if (!this.db) return;
    try {
      const tx = this.db.transaction([STORE_PROGRAMS], "readwrite");
      tx.objectStore(STORE_PROGRAMS).delete(id);
    } catch {
      // fallback
    }
  }

  async _persistEnrollment(record) {
    if (!this.db) return;
    try {
      const tx = this.db.transaction([STORE_ENROLLMENTS], "readwrite");
      tx.objectStore(STORE_ENROLLMENTS).put(record);
    } catch {
      // fallback
    }
  }

  _notifyChange() {
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("institution_learning_updated"));
    }
  }

  // ==========================================
  // PROGRAM CRUD
  // ==========================================
  async getAllPrograms(options = {}) {
    await this.init();
    const { search = "", category = "", status = "" } = options;

    let records = Array.from(this.programsStore.values());

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      records = records.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.instructor.toLowerCase().includes(q)
      );
    }

    if (category && category !== "All categories") {
      records = records.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (status && status !== "All statuses") {
      records = records.filter(
        (p) => (p.status || p.state).toLowerCase() === status.toLowerCase()
      );
    }

    // Attach dynamic learner counts to each program
    const enrollments = Array.from(this.enrollmentsStore.values());
    const enriched = records.map((p) => {
      const programEnrollments = enrollments.filter((e) => e.programId === p.id);
      const learnersCount = programEnrollments.length;
      let totalProgress = 0;
      programEnrollments.forEach((e) => {
        totalProgress += e.progressPercentage || 0;
      });
      const avgCompletion =
        learnersCount > 0 ? Math.round(totalProgress / learnersCount) : 0;

      return {
        ...p,
        learners: learnersCount,
        completion: avgCompletion
      };
    });

    return enriched;
  }

  async getProgramById(id) {
    await this.init();
    return this.programsStore.get(id) || null;
  }

  async createProgram(data) {
    await this.init();

    const validation = LearningProgramModel.validate(data, false);
    if (!validation.isValid) {
      throw new Error(`Validation Error: ${JSON.stringify(validation.errors)}`);
    }

    const sanitized = LearningProgramModel.sanitize(data);
    this.programsStore.set(sanitized.id, sanitized);
    await this._persistProgram(sanitized);

    this._notifyChange();
    return sanitized;
  }

  async updateProgram(id, updates) {
    await this.init();

    const existing = this.programsStore.get(id);
    if (!existing) {
      throw new Error(`Program with ID "${id}" not found.`);
    }

    const merged = LearningProgramModel.sanitize({
      ...existing,
      ...updates,
      id
    });

    this.programsStore.set(id, merged);
    await this._persistProgram(merged);

    this._notifyChange();
    return merged;
  }

  async deleteProgram(id) {
    await this.init();

    const existing = this.programsStore.get(id);
    if (!existing) {
      throw new Error(`Program with ID "${id}" not found.`);
    }

    this.programsStore.delete(id);
    await this._deleteProgramFromDb(id);

    this._notifyChange();
    return true;
  }

  async toggleProgramStatus(id) {
    await this.init();

    const prog = this.programsStore.get(id);
    if (!prog) throw new Error(`Program with ID "${id}" not found.`);

    const nextStatus = (prog.status || prog.state) === "Active" ? "Draft" : "Active";
    prog.status = nextStatus;
    prog.state = nextStatus;
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(id, prog);
    await this._persistProgram(prog);

    this._notifyChange();
    return prog;
  }

  // ==========================================
  // MODULES & TOPICS (CURRICULUM BUILDER)
  // ==========================================
  async addModule(programId, moduleData) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    const newModule = {
      id: `mod_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      title: (moduleData.title || "New Module").trim(),
      description: (moduleData.description || "").trim(),
      order: (prog.modules?.length || 0) + 1,
      topics: []
    };

    prog.modules = [...(prog.modules || []), newModule];
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return newModule;
  }

  async updateModule(programId, moduleId, moduleData) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    const modIndex = prog.modules.findIndex((m) => m.id === moduleId);
    if (modIndex === -1) throw new Error(`Module "${moduleId}" not found.`);

    prog.modules[modIndex] = {
      ...prog.modules[modIndex],
      title: moduleData.title !== undefined ? moduleData.title.trim() : prog.modules[modIndex].title,
      description: moduleData.description !== undefined ? moduleData.description.trim() : prog.modules[modIndex].description
    };
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return prog.modules[modIndex];
  }

  async deleteModule(programId, moduleId) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    prog.modules = prog.modules.filter((m) => m.id !== moduleId);
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return true;
  }

  async addTopic(programId, moduleId, topicData) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    const mod = prog.modules.find((m) => m.id === moduleId);
    if (!mod) throw new Error(`Module "${moduleId}" not found.`);

    const newTopic = {
      id: `top_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      title: (topicData.title || "New Topic").trim(),
      type: topicData.type || "Video",
      durationMinutes: parseInt(topicData.durationMinutes || "30", 10),
      order: (mod.topics?.length || 0) + 1
    };

    mod.topics = [...(mod.topics || []), newTopic];
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return newTopic;
  }

  async updateTopic(programId, moduleId, topicId, topicData) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    const mod = prog.modules.find((m) => m.id === moduleId);
    if (!mod) throw new Error(`Module "${moduleId}" not found.`);

    const topIndex = mod.topics.findIndex((t) => t.id === topicId);
    if (topIndex === -1) throw new Error(`Topic "${topicId}" not found.`);

    mod.topics[topIndex] = {
      ...mod.topics[topIndex],
      ...topicData
    };
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return mod.topics[topIndex];
  }

  async deleteTopic(programId, moduleId, topicId) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    const mod = prog.modules.find((m) => m.id === moduleId);
    if (!mod) throw new Error(`Module "${moduleId}" not found.`);

    mod.topics = mod.topics.filter((t) => t.id !== topicId);
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return true;
  }

  async reorderTopic(programId, moduleId, topicId, direction) {
    await this.init();
    const prog = this.programsStore.get(programId);
    if (!prog) throw new Error(`Program "${programId}" not found.`);

    const mod = prog.modules.find((m) => m.id === moduleId);
    if (!mod || !mod.topics) throw new Error(`Module "${moduleId}" not found.`);

    const idx = mod.topics.findIndex((t) => t.id === topicId);
    if (idx === -1) throw new Error(`Topic "${topicId}" not found.`);

    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= mod.topics.length) return mod.topics;

    const [moved] = mod.topics.splice(idx, 1);
    mod.topics.splice(targetIdx, 0, moved);
    prog.updatedAt = new Date().toISOString();

    this.programsStore.set(programId, prog);
    await this._persistProgram(prog);
    this._notifyChange();
    return mod.topics;
  }

  // ==========================================
  // ENROLLMENTS & MATHEMATICAL PROGRESS
  // ==========================================
  async getAllEnrollments(options = {}) {
    await this.init();
    const { search = "", programId = "", batch = "", status = "" } = options;

    let records = Array.from(this.enrollmentsStore.values());

    // Enrich with dynamic progress computation
    records = records.map((enr) => {
      const prog = this.programsStore.get(enr.programId);
      const computed = EnrollmentModel.computeProgress(enr, prog);
      return {
        ...enr,
        completedModules: computed.completedModulesCount,
        remainingModules: computed.remainingModulesCount,
        progress: computed.progressPercentage,
        progressPercentage: computed.progressPercentage,
        status: computed.status,
        totalTopics: computed.totalTopicsCount,
        completedTopics: computed.completedTopicsCount
      };
    });

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      records = records.filter(
        (e) =>
          e.learnerName.toLowerCase().includes(q) ||
          e.learnerEmail.toLowerCase().includes(q) ||
          e.programTitle.toLowerCase().includes(q) ||
          e.learnerId.toLowerCase().includes(q)
      );
    }

    if (programId && programId !== "All programs") {
      records = records.filter((e) => e.programId === programId);
    }

    if (batch && batch !== "All batches") {
      records = records.filter((e) => e.batch === batch);
    }

    if (status && status !== "All statuses") {
      records = records.filter(
        (e) => e.status.toLowerCase() === status.toLowerCase()
      );
    }

    return records;
  }

  async createEnrollment(data) {
    await this.init();

    const prog = this.programsStore.get(data.programId);
    if (!prog) throw new Error(`Program "${data.programId}" not found.`);

    // Check duplicate enrollment for same learner in same program
    for (const existing of this.enrollmentsStore.values()) {
      if (existing.learnerId === data.learnerId && existing.programId === data.programId) {
        throw new Error(`Learner is already enrolled in "${prog.name}".`);
      }
    }

    const sanitized = EnrollmentModel.sanitize(
      {
        ...data,
        programTitle: prog.name
      },
      prog
    );

    this.enrollmentsStore.set(sanitized.id, sanitized);
    await this._persistEnrollment(sanitized);

    this._notifyChange();
    return sanitized;
  }

  /**
   * Toggles a topic completion for an enrollment and recalculates exact progress %
   */
  async toggleTopicCompletion(enrollmentId, topicId) {
    await this.init();

    const enr = this.enrollmentsStore.get(enrollmentId);
    if (!enr) throw new Error(`Enrollment "${enrollmentId}" not found.`);

    const completed = new Set(enr.completedTopicIds || []);
    if (completed.has(topicId)) {
      completed.delete(topicId);
    } else {
      completed.add(topicId);
    }

    enr.completedTopicIds = Array.from(completed);
    const prog = this.programsStore.get(enr.programId);
    const computed = EnrollmentModel.computeProgress(enr, prog);

    enr.progressPercentage = computed.progressPercentage;
    enr.status = computed.status;
    enr.updatedAt = new Date().toISOString();

    this.enrollmentsStore.set(enrollmentId, enr);
    await this._persistEnrollment(enr);

    this._notifyChange();
    return {
      enrollment: enr,
      computed
    };
  }

  // ==========================================
  // STATISTICS
  // ==========================================
  async getStatistics() {
    await this.init();

    const programs = Array.from(this.programsStore.values());
    const enrollments = Array.from(this.enrollmentsStore.values());

    const totalPrograms = programs.length;
    const activePrograms = programs.filter(
      (p) => (p.status || p.state) === "Active"
    ).length;

    const totalEnrolledLearners = enrollments.length;

    let completedPrograms = 0;
    let inProgressPrograms = 0;

    enrollments.forEach((e) => {
      const prog = this.programsStore.get(e.programId);
      const computed = EnrollmentModel.computeProgress(e, prog);
      if (computed.progressPercentage === 100) {
        completedPrograms++;
      } else if (computed.progressPercentage > 0) {
        inProgressPrograms++;
      }
    });

    return {
      totalPrograms,
      activePrograms,
      totalEnrolledLearners,
      completedPrograms,
      inProgressPrograms
    };
  }

  async resetToSeed() {
    this.programsStore.clear();
    this.enrollmentsStore.clear();

    INITIAL_PROGRAMS.forEach((p) => {
      const sanitized = LearningProgramModel.sanitize(p);
      this.programsStore.set(sanitized.id, sanitized);
    });

    INITIAL_ENROLLMENTS.forEach((e) => {
      const prog = this.programsStore.get(e.programId);
      const sanitized = EnrollmentModel.sanitize(e, prog);
      this.enrollmentsStore.set(sanitized.id, sanitized);
    });

    if (this.db) {
      try {
        const tx = this.db.transaction([STORE_PROGRAMS, STORE_ENROLLMENTS], "readwrite");
        tx.objectStore(STORE_PROGRAMS).clear();
        tx.objectStore(STORE_ENROLLMENTS).clear();
        INITIAL_PROGRAMS.forEach((p) => tx.objectStore(STORE_PROGRAMS).put(LearningProgramModel.sanitize(p)));
        INITIAL_ENROLLMENTS.forEach((e) => {
          const prog = this.programsStore.get(e.programId);
          tx.objectStore(STORE_ENROLLMENTS).put(EnrollmentModel.sanitize(e, prog));
        });
      } catch {
        // fallback
      }
    }

    this._notifyChange();
  }
}

export const learningDatabase = new LearningDatabase();
