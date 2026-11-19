import React from "react";
import { GraduationCap, CheckCircle2, BookOpen, Users } from "lucide-react";
import { Metric } from "../../common/Metric";

export function InstructorMetrics({ instructors = [] }) {
  const activeCount = instructors.filter(i => i.status === "Active").length;
  const totalStudents = instructors.reduce((acc, i) => acc + (Number(i.studentsCount) || 0), 0);
  const totalCourses = instructors.reduce((acc, i) => acc + (Number(i.coursesCount) || 0), 0);

  return (
    <div className="metrics-grid four instructor-metrics">
      <Metric
        label="TOTAL INSTRUCTORS"
        value={String(instructors.length)}
        foot="Registered teaching faculty"
        icon={GraduationCap}
      />
      <Metric
        label="ACTIVE FACULTY"
        value={String(activeCount)}
        foot="Currently taking cohorts"
        icon={CheckCircle2}
      />
      <Metric
        label="COURSES MENTORED"
        value={String(totalCourses)}
        foot="Active curricula"
        icon={BookOpen}
      />
      <Metric
        label="STUDENTS TAUGHT"
        value={totalStudents.toLocaleString("en-IN")}
        foot="Platform aggregate"
        icon={Users}
      />
    </div>
  );
}
