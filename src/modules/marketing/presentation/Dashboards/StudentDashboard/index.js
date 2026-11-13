/**
 * Student Dashboard Module Public API Entry Point
 * Exposes the main StudentDashboard component, sub-views, and shared domain hooks.
 */

export { default as StudentDashboard } from "./Dashboard/Dashboard";
export { default as MyCourses } from "./MyCourses/MyCourses";
export { default as VideoPlayer } from "./Dashboard/VideoPlayer";
export { default as Assessments } from "./Assessments/Assessments";
export { default as Certificates } from "./Certificates/Certificates";

export { useStudentAuth } from "./Dashboard/hooks/useStudentAuth";
export { useStudentCourses } from "./Dashboard/hooks/useStudentCourses";
export { useStudentStats } from "./Dashboard/hooks/useStudentStats";
export { studentStorage } from "./Dashboard/services/studentStorage";
