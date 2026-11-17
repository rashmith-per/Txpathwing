import { useMemo } from "react";

export function useStudentStats(enrollments = []) {
  return useMemo(() => {
    const activeCoursesCount = enrollments.length;
    const streakDays = 5;
    const learningHours = Math.round(activeCoursesCount * 14);

    return {
      activeCoursesCount,
      streakDays,
      learningHours,
    };
  }, [enrollments]);
}
