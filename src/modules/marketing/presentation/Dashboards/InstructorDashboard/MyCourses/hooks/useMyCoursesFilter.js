import { useMemo } from "react";

export function useMyCoursesFilter(courses = [], search = "", statusFilter = "all") {
  const activeCoursesCount = useMemo(
    () => courses.filter((c) => String(c.status || "").toLowerCase() !== "archived").length,
    [courses]
  );

  const totalEnrolled = useMemo(
    () => courses.reduce((sum, c) => sum + (Number(c.enrolledLearners) || 0), 0),
    [courses]
  );

  const averageRating = useMemo(() => {
    if (!courses.length) return "4.9";
    const total = courses.reduce((sum, c) => sum + (Number(c.rating) || 4.9), 0);
    return (total / courses.length).toFixed(1);
  }, [courses]);

  const statusCounts = useMemo(() => {
    const counts = { all: 0, published: 0, draft: 0, ai: 0, archived: 0 };
    courses.forEach((c) => {
      const isArchived = String(c.status || "").toLowerCase() === "archived";
      if (!isArchived) {
        counts.all += 1;
        if (String(c.status || "").toLowerCase() === "published") counts.published += 1;
        if (String(c.status || "").toLowerCase() === "draft") counts.draft += 1;
        if (c.generationMode === "ai") counts.ai += 1;
      } else {
        counts.archived += 1;
      }
    });
    return counts;
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    return courses.filter((course) => {
      const isArchived = String(course.status || "").toLowerCase() === "archived";
      if (statusFilter === "archived") {
        if (!isArchived) return false;
      } else {
        if (isArchived) return false;
        if (statusFilter === "published" && String(course.status || "").toLowerCase() !== "published") return false;
        if (statusFilter === "draft" && String(course.status || "").toLowerCase() !== "draft") return false;
        if (statusFilter === "ai" && course.generationMode !== "ai") return false;
      }
      if (!q) return true;
      return (
        course.title?.toLowerCase().includes(q) ||
        course.code?.toLowerCase().includes(q) ||
        course.category?.toLowerCase().includes(q)
      );
    });
  }, [courses, search, statusFilter]);

  return {
    activeCoursesCount,
    totalEnrolled,
    averageRating,
    statusCounts,
    filteredCourses,
  };
}
