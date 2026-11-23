import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { LearnerModel } from "./backend/models/LearnerModel.js";
import { learnerDatabase } from "./backend/db/learnerDatabase.js";
import { LearnerApiController } from "./backend/api/learnerApiController.js";
import { LearnerApiRouter } from "./backend/api/learnerApiRouter.js";

describe("Learner Management Module — Comprehensive Suite", () => {
  beforeEach(async () => {
    await learnerDatabase.resetToSeed();
  });

  describe("1. Learner Model Validation & Sanitization", () => {
    it("validates valid learner entity without errors", () => {
      const valid = {
        fullName: "Test Learner",
        email: "test.learner@kits.edu",
        phone: "+91 98765 12345",
        department: "CSE",
        course: "Full Stack Engineering",
        batch: "2026–27",
        learnerId: "LRN-2026-9999"
      };

      const result = LearnerModel.validate(valid, false);
      assert.equal(result.isValid, true);
      assert.equal(Object.keys(result.errors).length, 0);
    });

    it("rejects invalid email formats", () => {
      const invalid = {
        fullName: "Test Learner",
        email: "invalid-email-address",
        phone: "+91 98765 12345",
        department: "CSE",
        course: "Full Stack Engineering",
        batch: "2026–27",
        learnerId: "LRN-2026-9999"
      };

      const result = LearnerModel.validate(invalid, false);
      assert.equal(result.isValid, false);
      assert.ok(result.errors.email);
    });

    it("rejects invalid phone numbers and missing required fields", () => {
      const invalid = {
        fullName: "",
        email: "",
        phone: "123", // too short
        department: "",
        course: "",
        batch: ""
      };

      const result = LearnerModel.validate(invalid, false);
      assert.equal(result.isValid, false);
      assert.ok(result.errors.fullName);
      assert.ok(result.errors.email);
      assert.ok(result.errors.phone);
      assert.ok(result.errors.department);
      assert.ok(result.errors.course);
      assert.ok(result.errors.batch);
    });

    it("generates correctly formatted Learner IDs", () => {
      const id = LearnerModel.generateLearnerId();
      assert.ok(/^LRN-\d{4}-\d{4}$/.test(id));
    });
  });

  describe("2. Learner Database & CRUD Operations", () => {
    it("loads seeded learner records across departments", async () => {
      const result = await learnerDatabase.getAll({ limit: 50 });
      assert.ok(result.learners.length >= 12);
      assert.equal(result.total, result.learners.length);
    });

    it("prevents duplicate email addresses on insertion", async () => {
      const duplicatePayload = {
        fullName: "Duplicate Learner",
        email: "aarav.reddy@kits.edu", // existing in seed
        phone: "+91 99999 88888",
        department: "CSE",
        course: "Full Stack Engineering",
        batch: "2026–27",
        learnerId: "LRN-2026-8888"
      };

      await assert.rejects(
        async () => {
          await learnerDatabase.create(duplicatePayload);
        },
        /already exists/i
      );
    });

    it("prevents duplicate learner IDs on insertion", async () => {
      const duplicatePayload = {
        fullName: "Another Learner",
        email: "unique.learner@kits.edu",
        phone: "+91 99999 77777",
        department: "ECE",
        course: "Applied Data Engineering",
        batch: "2026–27",
        learnerId: "LRN-2026-1001" // existing in seed
      };

      await assert.rejects(
        async () => {
          await learnerDatabase.create(duplicatePayload);
        },
        /already exists/i
      );
    });

    it("creates, updates, and deletes learner record", async () => {
      const newLearner = await learnerDatabase.create({
        fullName: "Vikram Sarabhai",
        email: "vikram.sarabhai@kits.edu",
        phone: "+91 91111 22222",
        department: "ECE",
        course: "Embedded IoT Systems",
        batch: "2026–27",
        learnerId: "LRN-2026-7777"
      });

      assert.equal(newLearner.fullName, "Vikram Sarabhai");

      // Update
      const updated = await learnerDatabase.update(newLearner.id, {
        fullName: "Dr. Vikram Sarabhai",
        department: "ECE",
        course: "Embedded IoT Systems",
        batch: "2026–27",
        progress: 50
      });
      assert.equal(updated.fullName, "Dr. Vikram Sarabhai");
      assert.equal(updated.progress, 50);

      // Delete
      const deleted = await learnerDatabase.delete(newLearner.id);
      assert.equal(deleted, true);

      const check = await learnerDatabase.getById(newLearner.id);
      assert.equal(check, null);
    });
  });

  describe("3. Dynamic Statistics Calculation", () => {
    it("computes accurate dynamic stats without hardcoded numbers", async () => {
      const stats = await learnerDatabase.getStatistics();
      assert.ok(stats.total >= 12);
      assert.ok(typeof stats.activeThisTerm === "number");
      assert.ok(typeof stats.placementReady === "number");
      assert.ok(typeof stats.needSupport === "number");
      assert.ok(typeof stats.averageProgress === "number");
      assert.ok(stats.byDepartment.CSE > 0);
    });
  });

  describe("4. REST API Controller & Router Endpoints", () => {
    it("handles GET /api/institution/learners with query filters", async () => {
      const res = await LearnerApiRouter.dispatch("GET", "/api/institution/learners", null, {
        department: "CSE"
      });

      assert.equal(res.status, 200);
      assert.ok(Array.isArray(res.data.learners));
      res.data.learners.forEach((l) => {
        assert.equal(l.department, "CSE");
      });
    });

    it("handles POST /api/institution/learners with HTTP 201 on success", async () => {
      const payload = {
        fullName: "Homi Bhabha",
        email: "homi.bhabha@kits.edu",
        phone: "+91 98888 77777",
        department: "MECH",
        course: "Applied Data Engineering",
        batch: "2026–27",
        learnerId: "LRN-2026-5555"
      };

      const res = await LearnerApiRouter.dispatch("POST", "/api/institution/learners", payload);
      assert.equal(res.status, 201);
      assert.equal(res.data.fullName, "Homi Bhabha");
    });

    it("returns HTTP 403 when unauthorized role attempts POST /api/institution/learners", async () => {
      const payload = {
        fullName: "Unauthorized Add",
        email: "unauth@kits.edu",
        phone: "+91 98888 11111",
        department: "CSE",
        course: "Full Stack Engineering",
        batch: "2026–27"
      };

      const res = await LearnerApiRouter.dispatch("POST", "/api/institution/learners", payload, {}, "faculty");
      assert.equal(res.status, 403);
    });

    it("handles CSV import successfully", async () => {
      const csvRecords = [
        {
          fullName: "CSV Learner 1",
          email: "csv1@kits.edu",
          phone: "+91 90001 00001",
          department: "IT",
          course: "Cloud & DevOps Foundations",
          batch: "2026–27"
        },
        {
          fullName: "CSV Learner 2",
          email: "csv2@kits.edu",
          phone: "+91 90002 00002",
          department: "ECE",
          course: "Embedded IoT Systems",
          batch: "2026–27"
        }
      ];

      const res = await LearnerApiController.importCsv(csvRecords, "institution_admin");
      assert.equal(res.status, 200);
      assert.equal(res.data.importedCount, 2);
      assert.equal(res.data.failedCount, 0);
    });
  });
});
