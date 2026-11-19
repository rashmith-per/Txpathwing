import { useState, useEffect, useMemo } from "react";
import { initialInstructorCourses } from "../data/mockData";
import { courseService } from "../MyCourses/services/courseService";

export function useInstructorCourses({ instructorIdentity, learners, batches, setProfile }) {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("tx_instructor_courses_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return initialInstructorCourses;
  });

  useEffect(() => {
    let active = true;
    courseService
      .getCourses(instructorIdentity)
      .then((persisted) => {
        if (!active || !Array.isArray(persisted)) return;
        setCourses(persisted);
        const activeCount = persisted.filter(
          (c) => String(c.status || "").toLowerCase() !== "archived"
        ).length;
        setProfile((prev) => ({ ...prev, publishedCoursesCount: activeCount }));
      })
      .catch(() => {});

    const handleCoursesSync = (event) => {
      const updatedList = event?.detail?.courses;
      if (!Array.isArray(updatedList)) return;
      setCourses(updatedList);
      const activeCount = updatedList.filter(
        (c) => String(c.status || "").toLowerCase() !== "archived"
      ).length;
      setProfile((prev) => ({ ...prev, publishedCoursesCount: activeCount }));
    };

    window.addEventListener("tx_instructor_courses_updated", handleCoursesSync);
    return () => {
      active = false;
      window.removeEventListener("tx_instructor_courses_updated", handleCoursesSync);
    };
  }, [instructorIdentity, setProfile]);

  const activeCoursesCount = useMemo(
    () => courses.filter((c) => String(c.status || "").toLowerCase() !== "archived").length,
    [courses]
  );

  const applyCourseListState = (nextCourses) => {
    setCourses(nextCourses);
    const activeCount = nextCourses.filter(
      (c) => String(c.status || "").toLowerCase() !== "archived"
    ).length;
    setProfile((prev) => ({ ...prev, publishedCoursesCount: activeCount }));
  };

  const handleCreateCourse = async (coursePayload) => {
    const existingList = await courseService.getCourses(instructorIdentity);
    if (coursePayload?.id && existingList.some((c) => c.id === coursePayload.id)) {
      applyCourseListState(existingList);
      return existingList;
    }
    const result = await courseService.createCourse(coursePayload, coursePayload?.modules || [], instructorIdentity);
    applyCourseListState(result.courses);
    return result.courses;
  };

  const handleUpdateCourse = async (courseId, updatedFields) => {
    const result = await courseService.updateCourse(courseId, updatedFields, instructorIdentity);
    applyCourseListState(result.courses);
    return result;
  };

  const handleDeleteOrArchiveCourse = async (courseId, options = {}) => {
    const result = await courseService.deleteOrArchiveCourse(courseId, {
      ...options,
      learners,
      batches,
      instructorIdentity
    });
    applyCourseListState(result.courses);
    return result;
  };

  const handleRestoreCourse = async (courseId) => {
    const result = await courseService.restoreCourse(courseId, instructorIdentity);
    applyCourseListState(result.courses);
    return result;
  };

  const handleSyncCourseSyllabus = async (courseId, updatedModules) => {
    const result = await courseService.syncCourseSyllabusSummary(courseId, updatedModules, instructorIdentity);
    if (result?.courses) applyCourseListState(result.courses);
    return result;
  };

  return {
    courses,
    activeCoursesCount,
    handleCreateCourse,
    handleUpdateCourse,
    handleDeleteOrArchiveCourse,
    handleRestoreCourse,
    handleSyncCourseSyllabus
  };
}
