import { ArrowDownToLine, ArrowRight, CheckCircle2, GraduationCap, Users } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { courses } from "./learningsData.js";
import { matchesSearch } from "../utils.js";
import "./Learnings.css";

const SUMMARY = [
  { value: "6", label: "Courses available" },
  { value: "1,930", label: "Course enrollments" },
  { value: "72%", label: "Average completion" },
  { value: "4.7", label: "Average feedback" }
];

export default function Learnings({ search, showMessage }) {
  const visibleCourses = courses.filter((course) => matchesSearch(course, search));

  return (
    <>
      <PageHeading
        eyebrow="ACADEMICS · LEARNING"
        title="Learning"
        description="Track courses delivered across your institution and their learner outcomes."
      >
        <button className="secondary-action" type="button" onClick={() => showMessage("Course catalogue export is being prepared.")}>
          <ArrowDownToLine size={16} />Export catalogue
        </button>
      </PageHeading>

      <SummaryStrip items={SUMMARY} />

      <div className="institution-course-grid">
        {visibleCourses.map((course) => (
          <article className="panel institution-course-card" key={course.name}>
            <div className={`institution-course-accent institution-course-accent-${course.tone}`}>
              <GraduationCap size={21} /><span>{course.category}</span>
            </div>
            <div className="institution-course-card-body">
              <StatusTag>{course.state}</StatusTag>
              <h2>{course.name}</h2>
              <p>Delivered by {course.instructor}</p>
              <div className="institution-course-meta">
                <span><Users size={14} />{course.learners} learners</span>
                <span><CheckCircle2 size={14} />{course.completion}% complete</span>
              </div>
              <div className="institution-course-progress">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${course.completion}%` }} />
                </div>
              </div>
              <button className="institution-course-link" type="button" onClick={() => showMessage(`${course.name} course details`)}>
                View course details <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
      {!visibleCourses.length && <div className="panel table-empty">No courses match your search.</div>}
    </>
  );
}
