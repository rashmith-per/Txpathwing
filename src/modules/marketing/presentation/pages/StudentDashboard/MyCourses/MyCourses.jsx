import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Search, BookOpen, ArrowRight } from "lucide-react";
import { studentStorage } from "../Dashboard/services/studentStorage";
import "./MyCourses.css";

export default function MyCourses({ onResumeCourse, onOpenCourseDetails }) {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadEnrollments = () => {
    const list = studentStorage.getEnrolledCourses();
    setEnrollments(list);
  };

  useEffect(() => {
    loadEnrollments();

    const handleStorage = () => loadEnrollments();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("topicProgressChanged", handleStorage);
    window.addEventListener("enrollmentChanged", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("topicProgressChanged", handleStorage);
      window.removeEventListener("enrollmentChanged", handleStorage);
    };
  }, []);

  const filtered = enrollments.filter((course) => {
    const matchesSearch =
      (course.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.courseCode || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      categoryFilter === "All" ||
      (course.category || "").toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="my-courses-container">
      {/* Top Bar */}
      <div className="my-courses-header">
        <div className="my-courses-header-titles">
          <h2 className="my-courses-title">My Enrolled Courses</h2>
          <p className="my-courses-subtitle">
            Track module syllabus progress, resume lessons, and prepare for industry certifications.
          </p>
        </div>

        <Link to="/marketplace" className="my-courses-explore-btn">
          Explore Marketplace <ArrowRight size={16} />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="my-courses-filter-bar">
        <div className="my-courses-search-wrap">
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            className="my-courses-search-input"
            placeholder="Search by course title or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="my-courses-category-pills">
          {["All", "Software Development", "Cloud & DevOps", "AI & Data"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`my-courses-cat-btn ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filtered.length === 0 ? (
        <div className="my-courses-empty-card">
          <BookOpen size={48} className="my-courses-empty-icon" />
          <h3 className="my-courses-empty-title">No courses found</h3>
          <p className="my-courses-empty-desc">
            {enrollments.length === 0
              ? "You haven't enrolled in any courses yet. Browse our marketplace catalogue to enroll."
              : "No courses matched your search criteria."}
          </p>
          <Link to="/marketplace" className="my-courses-browse-link">
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="my-courses-grid">
          {filtered.map((course) => {
            const pct = course.progressPercent || 0;
            const isCompleted = pct === 100;

            return (
              <div
                key={course.courseId}
                className="my-course-card"
                onClick={() => onOpenCourseDetails && onOpenCourseDetails(course)}
                style={{ cursor: "pointer" }}
                title="Click to view course learning details and complete syllabus"
              >
                <div>
                  <div className="my-course-top">
                    <span className="my-course-code-pill">{course.courseCode}</span>
                    <span className="my-course-status">
                      {isCompleted ? "Completed ✓" : "In Progress"}
                    </span>
                  </div>

                  <h3 className="my-course-title">
                    {course.title || course.courseCode}
                  </h3>

                  <div className="my-course-module">
                    <BookOpen size={13} style={{ display: "inline", marginRight: "5px" }} />
                    {course.currentModule || "Module 1"}
                  </div>

                  {/* Progress bar */}
                  <div className="my-course-progress-wrap">
                    <div className="my-course-progress-labels">
                      <span className="my-course-progress-label-text">Course Progress</span>
                      <span className="my-course-progress-pct">{pct}%</span>
                    </div>
                    <div className="my-course-progress-track">
                      <div
                        className="my-course-progress-fill"
                        style={{
                          width: `${pct}%`,
                          background: isCompleted ? "#10b981" : "#2563eb",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="my-course-actions">
                  <button
                    type="button"
                    className="my-course-resume-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResumeCourse && onResumeCourse(course);
                    }}
                  >
                    <Play size={15} fill="#ffffff" /> Resume Lesson
                  </button>

                  <button
                    type="button"
                    className="my-course-syllabus-link"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCourseDetails && onOpenCourseDetails(course);
                    }}
                  >
                    Learning Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
