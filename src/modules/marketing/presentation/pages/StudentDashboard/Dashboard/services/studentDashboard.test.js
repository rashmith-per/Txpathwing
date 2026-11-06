import { describe, it } from "node:test";
import assert from "node:assert";
import { learningProgressService } from "./learningProgress.service.js";
import { skillProfileService, SKILL_STATUS } from "./skillProfile.service.js";
import { COURSE_CATALOGUE, getCourseByIdOrCode } from "./courseCatalogue.data.js";

describe("Course Progress Calculation Engine", () => {
  const javaCourse = getCourseByIdOrCode("java-fs");

  it("calculates 0% overall progress when no topics are completed", () => {
    const metrics = learningProgressService.computeCourseProgress(javaCourse, {}, null);
    assert.strictEqual(metrics.overallProgressPercent, 0);
    assert.strictEqual(metrics.completedTopics, 0);
    assert.strictEqual(metrics.totalTopics, 16);
    assert.strictEqual(metrics.remainingTopics, 16);
    assert.strictEqual(metrics.totalModules, 4);
    assert.strictEqual(metrics.currentModule, "Module 1: Java Fundamentals & Core OOP");
    assert.strictEqual(metrics.nextIncompleteTopic.id, "top-java-1");
  });

  it("calculates exact mathematical progress (completed / total * 100)", () => {
    // Complete 4 topics out of 16 = exactly 25%
    const progressMap = {
      "top-java-1": { status: "completed" },
      "top-java-2": { status: "completed" },
      "top-java-3": { status: "completed" },
      "top-java-4": { status: "completed" },
    };

    const metrics = learningProgressService.computeCourseProgress(javaCourse, progressMap, "top-java-4");
    assert.strictEqual(metrics.overallProgressPercent, 25);
    assert.strictEqual(metrics.completedTopics, 4);
    assert.strictEqual(metrics.remainingTopics, 12);

    // Module 1 is completely finished (4/4 = 100%)
    assert.strictEqual(metrics.moduleProgress[0].progressPercent, 100);
    assert.strictEqual(metrics.moduleProgress[0].status, "Completed");

    // Current module advances to Module 2
    assert.strictEqual(metrics.currentModule, "Module 2: Collections Framework & Concurrency");
    assert.strictEqual(metrics.lastAccessedTopic.id, "top-java-4");
    assert.strictEqual(metrics.nextIncompleteTopic.id, "top-java-5");
  });

  it("calculates partial module progress and in-progress status correctly", () => {
    // 2 completed, 1 in-progress in Module 1
    const progressMap = {
      "top-java-1": { status: "completed" },
      "top-java-2": { status: "completed" },
      "top-java-3": { status: "in-progress" },
    };

    const metrics = learningProgressService.computeCourseProgress(javaCourse, progressMap, "top-java-3");
    // 2 / 16 = 12.5% -> rounded to 13%
    assert.strictEqual(metrics.overallProgressPercent, 13);
    assert.strictEqual(metrics.completedTopics, 2);
    assert.strictEqual(metrics.inProgressTopics, 1);
    assert.strictEqual(metrics.remainingTopics, 14);

    // Module 1 is 2/4 = 50%
    assert.strictEqual(metrics.moduleProgress[0].progressPercent, 50);
    assert.strictEqual(metrics.moduleProgress[0].status, "In Progress");
    assert.strictEqual(metrics.currentModule, "Module 1: Java Fundamentals & Core OOP");
  });
});

describe("Dynamic Skill Profile Engine", () => {
  it("determines skill status correctly across all percentage bands", () => {
    assert.strictEqual(skillProfileService.classifyStatus(0), SKILL_STATUS.NOT_STARTED);
    assert.strictEqual(skillProfileService.classifyStatus(15), SKILL_STATUS.LEARNING);
    assert.strictEqual(skillProfileService.classifyStatus(39), SKILL_STATUS.LEARNING);
    assert.strictEqual(skillProfileService.classifyStatus(40), SKILL_STATUS.DEVELOPING);
    assert.strictEqual(skillProfileService.classifyStatus(74), SKILL_STATUS.DEVELOPING);
    assert.strictEqual(skillProfileService.classifyStatus(75), SKILL_STATUS.PROFICIENT);
    assert.strictEqual(skillProfileService.classifyStatus(99), SKILL_STATUS.PROFICIENT);
    assert.strictEqual(skillProfileService.classifyStatus(100), SKILL_STATUS.COMPLETED);
  });

  it("extracts and connects skills from enrolled course topics", () => {
    const enrollments = [{ courseId: "java-fs" }];
    const allProgressMap = {
      "java-fs": {
        topics: {
          "top-java-1": { status: "completed" },
          "top-java-2": { status: "completed" },
          "top-java-3": { status: "completed" },
          "top-java-4": { status: "completed" },
        },
      },
    };

    const skills = skillProfileService.calculateSkillProfile(enrollments, allProgressMap);
    assert.ok(skills.length > 0);

    const javaSkill = skills.find((s) => s.name === "Java");
    assert.ok(javaSkill, "Java skill must be present");
    assert.strictEqual(javaSkill.completedTopics, 4);
    assert.ok(javaSkill.totalTopics >= 4);
    assert.ok(javaSkill.progressPercent > 0);
    assert.strictEqual(javaSkill.associatedCourses, "Java Full Stack Development");

    const oopsSkill = skills.find((s) => s.name === "OOPS");
    assert.ok(oopsSkill, "OOPS skill must be present");
    assert.strictEqual(oopsSkill.completedTopics, 1);
    assert.strictEqual(oopsSkill.totalTopics, 1);
    assert.strictEqual(oopsSkill.progressPercent, 100);
    assert.strictEqual(oopsSkill.status, "Completed");
  });

  it("combines multi-course overlapping skills without duplicate entries", () => {
    // Both Java-FS and React-FS teach React
    const enrollments = [{ courseId: "java-fs" }, { courseId: "react-fs" }];
    const allProgressMap = {
      "java-fs": {
        topics: {
          "top-java-15": { status: "completed" }, // React topic in Java course
        },
      },
      "react-fs": {
        topics: {
          "top-react-1": { status: "completed" },
        },
      },
    };

    const skills = skillProfileService.calculateSkillProfile(enrollments, allProgressMap);

    // Filter React skill occurrences
    const reactSkills = skills.filter((s) => s.name.toLowerCase() === "react");
    assert.strictEqual(reactSkills.length, 1, "There should be exactly one combined React entry");

    const reactSkill = reactSkills[0];
    assert.strictEqual(reactSkill.coursesCount, 2, "React should be tracked from both courses");
    assert.ok(
      reactSkill.associatedCourses.includes("Java Full Stack Development") &&
      reactSkill.associatedCourses.includes("Full Stack Development"),
      "Associated courses should mention both course titles"
    );
    assert.strictEqual(reactSkill.completedTopics, 2, "Completed topics across both courses should sum to 2");
  });
});
