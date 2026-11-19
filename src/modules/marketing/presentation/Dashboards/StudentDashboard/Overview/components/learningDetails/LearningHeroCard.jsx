import React from "react";
import { Calendar, BookOpen, Layers } from "lucide-react";

export function LearningHeroCard({ course, progressMetrics }) {
  return (
    <section className="learning-hero-card">
      <div className="learning-badge-row">
        <span className="learning-code-pill">{course.code}</span>
        <span className="learning-cat-pill">{course.category}</span>
        <span className="learning-level-pill">{course.level}</span>
      </div>

      <h1 className="learning-course-title">{course.title}</h1>
      <p className="learning-course-desc">{course.description}</p>

      <div className="learning-instructor-bar">
        <div className="instructor-avatar-wrap">
          <div className="instructor-avatar-circle">
            {course.instructor.initials || "TX"}
          </div>
          <div>
            <div className="instructor-details-name">{course.instructor.name}</div>
            <div className="instructor-details-role">{course.instructor.role}</div>
          </div>
        </div>

        <div className="learning-meta-stats">
          <div className="meta-stat-item">
            <Calendar size={15} /> <span>{course.duration}</span>
          </div>
          <div className="meta-stat-item">
            <BookOpen size={15} /> <span>{course.lessons}</span>
          </div>
          <div className="meta-stat-item">
            <Layers size={15} /> <span>{progressMetrics.totalModules} Modules</span>
          </div>
        </div>
      </div>
    </section>
  );
}
