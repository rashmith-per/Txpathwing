import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Play } from "lucide-react";

export default function ContinueLearning({
  enrollments = [],
  courseFilter = "All",
  onFilterChange,
  onResume,
}) {
  return (
    <section className="dash-card-section continue-learning-section">
      <div className="section-head-row">
        <div className="section-title-wrap">
          <h3>Continue Learning</h3>
          <p>Pick up where you left off with your enrolled courses</p>
        </div>

        {/* Course Filter Tabs */}
        <div className="courses-filter-tabs">
          {["All", "In Progress", "Completed"].map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-tab-pill ${courseFilter === filter ? "active" : ""}`}
              onClick={() => onFilterChange && onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="continue-courses-list">
        {enrollments.length === 0 ? (
          <div className="empty-enrollments-box">
            <BookOpen size={40} color="#94a3b8" />
            <h4>No courses found</h4>
            <p>
              No enrolled courses match your current search or filter. Explore our marketplace catalogue to begin!
            </p>
            <Link to="/marketplace" className="empty-browse-btn">
              Explore Marketplace Courses
            </Link>
          </div>
        ) : (
          enrollments.map((course) => {
            const pct = course.progressPercent || 0;
            const isDone = pct === 100;
            const syllabusPath = `/course/${(course.courseId || course.id || "course").toLowerCase()}`;

            return (
              <div key={course.courseId || course.id} className="continue-course-card">
                <div className="course-card-top">
                  <span className="course-code-pill">
                    {course.courseCode || "COURSE"}
                  </span>
                  <span className={`course-status-label ${isDone ? "completed" : "in-progress"}`}>
                    <span className="status-dot-pulse" />
                    {isDone ? "Completed ✓" : "In Progress"}
                  </span>
                </div>

                <h4 className="course-card-title">{course.title}</h4>
                <div className="course-current-module">
                  <BookOpen size={13} className="module-icon" />
                  <span>{course.currentModule || "Module 1"}</span>
                </div>

                <div className="course-progress-block">
                  <div className="progress-label-row">
                    <span className="progress-title">Progress</span>
                    <span className="pct-text">{pct}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="course-card-actions">
                  <button
                    type="button"
                    className="course-resume-btn"
                    onClick={() => onResume && onResume(course)}
                  >
                    <Play size={14} fill="#ffffff" />
                    <span>Resume Lesson</span>
                  </button>
                  <Link
                    to={syllabusPath}
                    className="course-view-link"
                  >
                    Syllabus
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
