import { useState, useEffect, useMemo, useCallback } from "react";
import { studentStorage } from "../services/studentStorage";
import { courses as marketCourses } from "../../../MarketPlace/coursesList";

export function useStudentCourses() {
  const [enrollments, setEnrollments] = useState(() => studentStorage.getEnrolledCourses());
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  const syncCourses = useCallback(() => {
    setEnrollments(studentStorage.getEnrolledCourses());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncCourses);
    return () => window.removeEventListener("storage", syncCourses);
  }, [syncCourses]);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((item) => {
      const matchSearch =
        (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.courseCode || "").toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      const pct = item.progressPercent || 0;
      if (courseFilter === "In Progress") return pct < 100;
      if (courseFilter === "Completed") return pct === 100;
      return true;
    });
  }, [enrollments, searchQuery, courseFilter]);

  const recommendedCourses = useMemo(() => {
    const enrolledIds = new Set(
      enrollments.map((e) => (e.courseId || e.id || e.courseCode || "").toLowerCase())
    );
    return marketCourses
      .filter((c) => !enrolledIds.has((c.id || "").toLowerCase()) && !enrolledIds.has((c.code || "").toLowerCase()))
      .slice(0, 3);
  }, [enrollments]);

  const enrollInCourse = useCallback((course) => {
    const res = studentStorage.enrollCourse(course);
    if (res.success) {
      setEnrollments((prev) => [...prev, res.course]);
    }
    return res;
  }, []);

  const updateProgress = useCallback((courseId, pct) => {
    studentStorage.updateCourseProgress(courseId, pct);
    syncCourses();
  }, [syncCourses]);

  return {
    enrollments,
    filteredEnrollments,
    recommendedCourses,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    enrollInCourse,
    updateProgress,
  };
}
