import { useState, useEffect, useMemo, useCallback } from "react";
import { studentStorage } from "../services/studentStorage";
import { studentApi } from "../services/studentApi";
import { COURSE_CATALOGUE } from "../services/courseCatalogue.data";

export function useStudentCourses() {
  const [enrollments, setEnrollments] = useState(() => studentStorage.getEnrolledCourses());
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  const syncCourses = useCallback(() => {
    setEnrollments(studentStorage.getEnrolledCourses());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncCourses);
    window.addEventListener("topicProgressChanged", syncCourses);
    window.addEventListener("enrollmentChanged", syncCourses);

    return () => {
      window.removeEventListener("storage", syncCourses);
      window.removeEventListener("topicProgressChanged", syncCourses);
      window.removeEventListener("enrollmentChanged", syncCourses);
    };
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
    return COURSE_CATALOGUE.filter(
      (c) =>
        !enrolledIds.has((c.id || "").toLowerCase()) &&
        !enrolledIds.has((c.code || "").toLowerCase())
    ).slice(0, 6);
  }, [enrollments]);

  const enrollInCourse = useCallback((course) => {
    const res = studentStorage.enrollCourse(course);
    if (res.success) {
      syncCourses();
    }
    return res;
  }, [syncCourses]);

  const updateProgress = useCallback((courseId, pct) => {
    studentStorage.updateCourseProgress(courseId, pct);
    syncCourses();
  }, [syncCourses]);

  const updateTopicProgress = useCallback(async ({ courseId, topicId, status }) => {
    const res = await studentApi.updateTopicProgress({ courseId, topicId, status });
    syncCourses();
    return res;
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
    updateTopicProgress,
    syncCourses,
  };
}
