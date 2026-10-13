import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Search, BookOpen, ArrowRight } from "lucide-react";
import "./MyCourses.css";

const DEFAULT_COURSES = [
  {
    courseId: "aws-dop",
    courseCode: "AWS-DOP",
    title: "AWS DevOps Engineer",
    category: "Cloud & DevOps",
    instructor: "Meera Krishnan",
    currentModule: "Module 1",
    progressPercent: 0,
  },
  {
    courseId: "java-fs",
    courseCode: "JAVA-FS",
    title: "Java Full Stack Development",
    category: "Software Development",
    instructor: "Naveen Kulkarni",
    currentModule: "Module 1",
    progressPercent: 0,
  },
];

export default function MyCourses({ onResumeCourse }) {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadEnrollments = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
      if (Array.isArray(stored) && stored.length > 0) {
        const normalized = stored.map((item) => ({
          courseId: item.courseId || item.id || item.code?.toLowerCase() || "course",
          courseCode: item.courseCode || item.code || "COURSE",
          title: item.title || item.name || "Enrolled Course",
          category: item.category || "Software Development",
          instructor: item.instructor || "Pathwing Faculty",
          currentModule: item.currentModule || "Module 1: Foundations",
          progressPercent: item.progressPercent !== undefined ? item.progressPercent : (item.progress || 0),
        }));
        setEnrollments(normalized);
      } else {
        setEnrollments(DEFAULT_COURSES);
      }
    } catch {
      setEnrollments(DEFAULT_COURSES);
    }
  };

  useEffect(() => {
    loadEnrollments();

    const handleStorage = () => loadEnrollments();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filtered = enrollments.filter((course) => {
    const matchesSearch =
      (course.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.courseCode || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      categoryFilter === "All" || (course.category || "").toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="my-courses-container">
      {/* Top Bar */}
      <div className="my-courses-header">
        <div className="my-courses-header-titles">
          <h2 className="my-courses-title">My Enrolled Courses</h2>
          <p className="my-courses-subtitle">
            Track progress, resume video lessons, and prepare for certifications.
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

            return (
              <div key={course.courseId} className="my-course-card">
                <div>
                  <div className="my-course-top">
                    <span className="my-course-code-pill">{course.courseCode}</span>
                    <span className="my-course-status">
                      {pct === 100 ? "Completed ✓" : "In Progress"}
                    </span>
                  </div>

                  <h3 className="my-course-title">
                    {course.title || course.courseCode}
                  </h3>

                  <div className="my-course-module">
                    {course.currentModule || "Module 1: Foundations"}
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
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="my-course-actions">
                  <button
                    type="button"
                    className="my-course-resume-btn"
                    onClick={() => onResumeCourse && onResumeCourse(course)}
                  >
                    <Play size={15} fill="#ffffff" /> Resume Lesson
                  </button>

                  <Link
                    to={`/course/${course.courseId.toLowerCase()}`}
                    className="my-course-syllabus-link"
                  >
                    Syllabus
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
