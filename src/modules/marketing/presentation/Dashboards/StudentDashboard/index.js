/**
 * Student Dashboard Module Public API Entry Point
 * Feature-oriented structure matching the Instructor Dashboard.
 * Existing public exports are preserved for application integrations.
 */
export { default as StudentDashboard } from "./StudentDashboard";
export { default as MyCourses } from "./MyCourses/MyCourses";
export { default as VideoPlayer } from "./VideoPlayer/VideoPlayer";
export { default as Assessments } from "./Assessments/Assessments";
export { default as Certificates } from "./Certificates/Certificates";
export { useStudentAuth } from "./hooks/useStudentAuth";
export { useStudentCourses } from "./hooks/useStudentCourses";
export { useStudentStats } from "./hooks/useStudentStats";
export { studentStorage } from "./services/studentStorage";
export { default } from "./StudentDashboard";
