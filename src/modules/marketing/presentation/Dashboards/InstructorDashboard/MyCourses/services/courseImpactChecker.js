export function checkCourseEnrollmentImpact(course, { learners = [], batches = [] } = {}) {
  if (!course) {
    return {
      enrolledLearners: 0,
      linkedLearnersCount: 0,
      linkedBatchesCount: 0,
      studentPortalEnrolled: false,
      hasEnrolledStudents: false,
      requiresArchive: false
    };
  }

  const courseEnrolledCount = Number(course.enrolledLearners) || 0;
  const normalizedCode = String(course.code || "").trim().toLowerCase();
  const normalizedId = String(course.id || "").trim().toLowerCase();

  const linkedLearnersCount = Array.isArray(learners)
    ? learners.filter(
        (l) =>
          String(l.courseId || "").toLowerCase() === normalizedId ||
          String(l.courseName || "").toLowerCase() === String(course.title || "").toLowerCase()
      ).length
    : 0;

  const linkedBatchesCount = Array.isArray(batches)
    ? batches.filter(
        (b) =>
          String(b.courseId || "").toLowerCase() === normalizedId ||
          String(b.courseName || "").toLowerCase() === String(course.title || "").toLowerCase()
      ).length
    : 0;

  let studentPortalEnrolled = false;
  try {
    if (typeof localStorage !== "undefined") {
      const enrolledRaw = localStorage.getItem("enrolledCourses");
      if (enrolledRaw) {
        const parsed = JSON.parse(enrolledRaw);
        if (Array.isArray(parsed)) {
          studentPortalEnrolled = parsed.some((item) => {
            const idMatch = String(item.courseId || item.id || "").toLowerCase() === normalizedId;
            const codeMatch =
              normalizedCode &&
              String(item.courseCode || item.code || "").toLowerCase() === normalizedCode;
            return idMatch || codeMatch;
          });
        }
      }
    }
  } catch {
    studentPortalEnrolled = false;
  }

  const hasEnrolledStudents =
    courseEnrolledCount > 0 || linkedLearnersCount > 0 || studentPortalEnrolled;

  return {
    enrolledLearners: courseEnrolledCount,
    linkedLearnersCount,
    linkedBatchesCount,
    studentPortalEnrolled,
    hasEnrolledStudents,
    requiresArchive: hasEnrolledStudents || linkedBatchesCount > 0
  };
}
