import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { LearningProgramModel } from "./backend/models/LearningProgramModel.js";
import { EnrollmentModel } from "./backend/models/EnrollmentModel.js";
import { learningDatabase } from "./backend/db/learningDatabase.js";
import { LearningApiRouter } from "./backend/api/learningApiRouter.js";

describe("Learning Management Module — Comprehensive Suite", () => {
  beforeEach(async () => {
    await learningDatabase.resetToSeed();
  });

  describe("1. Learning Program Model Validation", () => {
    it("validates valid program entity", () => {
      const valid = {
        name: "Cloud Architecture Masterclass",
        code: "CAM-2026",
        category: "CLOUD COMPUTING",
        instructor: "Arjun Menon"
      };

      const result = LearningProgramModel.validate(valid, false);
      assert.equal(result.isValid, true);
    });

    it("rejects missing required program attributes", () => {
      const invalid = {
        name: "",
        code: "",
        category: "",
        instructor: ""
      };

      const result = LearningProgramModel.validate(invalid, false);
      assert.equal(result.isValid, false);
      assert.ok(result.errors.name);
      assert.ok(result.errors.code);
      assert.ok(result.errors.category);
      assert.ok(result.errors.instructor);
    });
  });

  describe("2. Mathematical Learning Progress Calculations", () => {
    it("calculates exact progress percentage from topic completion", () => {
      const dummyProgram = {
        modules: [
          {
            id: "m1",
            topics: [{ id: "t1" }, { id: "t2" }]
          },
          {
            id: "m2",
            topics: [{ id: "t3" }, { id: "t4" }]
          }
        ]
      };

      // Case 1: 0 completed
      const res0 = EnrollmentModel.computeProgress({ completedTopicIds: [] }, dummyProgram);
      assert.equal(res0.completedTopicsCount, 0);
      assert.equal(res0.totalTopicsCount, 4);
      assert.equal(res0.progressPercentage, 0);
      assert.equal(res0.completedModulesCount, 0);
      assert.equal(res0.remainingModulesCount, 2);

      // Case 2: 2 completed (module 1 completely done)
      const res2 = EnrollmentModel.computeProgress({ completedTopicIds: ["t1", "t2"] }, dummyProgram);
      assert.equal(res2.completedTopicsCount, 2);
      assert.equal(res2.progressPercentage, 50);
      assert.equal(res2.completedModulesCount, 1);
      assert.equal(res2.remainingModulesCount, 1);
      assert.equal(res2.status, "In Progress");

      // Case 3: all 4 completed (module 1 and module 2 done)
      const res4 = EnrollmentModel.computeProgress({ completedTopicIds: ["t1", "t2", "t3", "t4"] }, dummyProgram);
      assert.equal(res4.completedTopicsCount, 4);
      assert.equal(res4.progressPercentage, 100);
      assert.equal(res4.completedModulesCount, 2);
      assert.equal(res4.remainingModulesCount, 0);
      assert.equal(res4.status, "Completed");
    });
  });

  describe("3. Database Program & Curriculum Management", () => {
    it("loads seeded learning programs", async () => {
      const programs = await learningDatabase.getAllPrograms();
      assert.ok(programs.length >= 5);
      const fse = programs.find((p) => p.code === "FSE-2026");
      assert.ok(fse);
      assert.equal(fse.modules.length, 3);
    });

    it("creates, updates, and deletes program", async () => {
      const created = await learningDatabase.createProgram({
        name: "Artificial Intelligence Foundations",
        code: "AIF-2026",
        category: "DATA & AI",
        instructor: "Dr. Andrew"
      });
      assert.equal(created.name, "Artificial Intelligence Foundations");

      // Toggle status
      const toggled = await learningDatabase.toggleProgramStatus(created.id);
      assert.equal(toggled.status, "Draft");

      // Delete
      const deleted = await learningDatabase.deleteProgram(created.id);
      assert.equal(deleted, true);
    });

    it("adds module and topic to program curriculum", async () => {
      const programs = await learningDatabase.getAllPrograms();
      const prog = programs[0];

      const mod = await learningDatabase.addModule(prog.id, {
        title: "Advanced System Design",
        description: "High concurrency and caching strategies"
      });
      assert.ok(mod.id);
      assert.equal(mod.title, "Advanced System Design");

      const top = await learningDatabase.addTopic(prog.id, mod.id, {
        title: "Consistent Hashing & Partitioning",
        type: "Video",
        durationMinutes: 45
      });
      assert.ok(top.id);
      assert.equal(top.title, "Consistent Hashing & Partitioning");
    });
  });

  describe("4. Enrollment and Progress Tracking", () => {
    it("enrolls a learner and toggles topic completion", async () => {
      const programs = await learningDatabase.getAllPrograms();
      const prog = programs[0];

      const enr = await learningDatabase.createEnrollment({
        learnerId: "LRN-TEST-1",
        learnerName: "Test Student",
        learnerEmail: "test.student@kits.edu",
        department: "CSE",
        programId: prog.id,
        batch: "2026–27"
      });

      assert.equal(enr.learnerName, "Test Student");
      assert.equal(enr.progressPercentage, 0);

      // Toggle topic
      const firstTopicId = prog.modules[0].topics[0].id;
      const updated = await learningDatabase.toggleTopicCompletion(enr.id, firstTopicId);
      assert.ok(updated.computed.progressPercentage > 0);
      assert.equal(updated.enrollment.completedTopicIds.includes(firstTopicId), true);
    });
  });

  describe("5. REST API Controller & Router Endpoints", () => {
    it("handles GET /api/institution/learning/programs", async () => {
      const res = await LearningApiRouter.dispatch("GET", "/api/institution/learning/programs");
      assert.equal(res.status, 200);
      assert.ok(Array.isArray(res.data));
    });

    it("handles GET /api/institution/learning/stats", async () => {
      const res = await LearningApiRouter.dispatch("GET", "/api/institution/learning/stats");
      assert.equal(res.status, 200);
      assert.ok(res.data.totalPrograms >= 5);
      assert.ok(typeof res.data.activePrograms === "number");
      assert.ok(typeof res.data.totalEnrolledLearners === "number");
    });

    it("handles POST /api/institution/learning/programs with HTTP 201", async () => {
      const payload = {
        name: "Robotics and Automation",
        code: "ROB-2026",
        category: "ELECTRONICS",
        instructor: "Prof. Sharma"
      };

      const res = await LearningApiRouter.dispatch("POST", "/api/institution/learning/programs", payload);
      assert.equal(res.status, 201);
      assert.equal(res.data.name, "Robotics and Automation");
    });
  });
});
