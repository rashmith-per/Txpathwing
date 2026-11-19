import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses as marketCourses } from "../MarketPlace/coursesList";
import { getCourseByIdOrCode } from "../../Dashboards/StudentDashboard/services/courseCatalogue.data.js";
import { studentStorage } from "../../Dashboards/StudentDashboard/services/studentStorage";
import { extendedCoursesData, fromMarket, readEnrolled } from "./courseDetailsData";
import "./CourseDetails.css";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const cleanId = (id || "").toLowerCase();

  const matched = getCourseByIdOrCode(cleanId);
  let course = matched
    ? {
        code: matched.code,
        title: matched.title,
        category: matched.category,
        instructor: matched.instructor.name,
        role: matched.instructor.role,
        weeks: matched.duration,
        lessons: matched.lessons,
        level: matched.level,
        price: matched.price,
        oldPrice: matched.oldPrice,
        rating: matched.rating,
        reviews: matched.reviews,
        emoji: matched.emoji,
        about: matched.description,
        syllabus: matched.modules.map((m) => ({
          m: `Module ${m.moduleNumber}`,
          t: m.title,
          d: m.duration,
          topics: m.topics.map((top) => top.title),
        })),
        projects: matched.modules
          .filter((m) => m.assignment)
          .map((m) => m.assignment.title),
        skills: matched.skills || [matched.category],
      }
    : extendedCoursesData[cleanId];

  if (!course) {
    const market = marketCourses.find((c) => String(c.id).toLowerCase() === cleanId);
    if (market) course = fromMarket(market);
  }

  const [activeTab, setActiveTab] = useState("syllabus");
  const [openModule, setOpenModule] = useState(0);

  const isEnrolled = () => {
    const list = readEnrolled();
    return list.some(
      (c) =>
        c.code === course?.code ||
        c.title?.toLowerCase() === course?.title?.toLowerCase()
    );
  };

  const handleEnrollNow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please sign in to enroll in this course.");
      return;
    }
    const current = readEnrolled();
    const already = current.some(
      (c) =>
        c.code === course.code ||
        c.title?.toLowerCase() === course.title?.toLowerCase()
    );
    if (!already) {
      const newCourse = {
        code: course.code,
        title: course.title,
        category: course.category,
        progress: 0,
        completedLessons: 0,
        totalLessons: parseInt(course.lessons) || 60,
        status: "In Progress",
        instructor: course.instructor,
        emoji: course.emoji,
        enrolledAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      const updated = [...current, newCourse];
      localStorage.setItem("enrolledCourses", JSON.stringify(updated));

      try {
        const student = studentStorage.getProfile();
        student.enrolledCount = updated.length;
        studentStorage.saveProfile(student);
      } catch (e) {
        console.error("Could not update student storage:", e);
      }
    }
    setEnrolledSuccess(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  if (!course) {
    return (
      <div className="cd-not-found">
        <div className="cd-nf-content">
          <span className="cd-nf-icon">📚</span>
          <h2>Course Not Found</h2>
          <p>
            We couldn't locate details for this course. Please explore our full
            catalogue.
          </p>
          <button className="cd-btn-primary" onClick={() => navigate("/marketplace")}>
            Browse Marketplace
          </button>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled();

  return (
    <div className="cd-page">
      <div className="cd-hero">
        <div className="cd-hero-inner">
          <div className="cd-breadcrumb">
            <span onClick={() => navigate("/marketplace")}>Marketplace</span>
            <span className="cd-sep">›</span>
            <span>{course.category}</span>
            <span className="cd-sep">›</span>
            <span className="cd-active-crumb">{course.title}</span>
          </div>

          <div className="cd-hero-grid">
            <div className="cd-hero-main">
              <span className="cd-cat-pill">{course.category}</span>
              <h1 className="cd-title">{course.title}</h1>
              <p className="cd-about">{course.about}</p>

              <div className="cd-meta-row">
                <span className="cd-rating-badge">★ {course.rating}</span>
                <span className="cd-reviews">({course.reviews} ratings)</span>
                <span className="cd-dot">•</span>
                <span className="cd-instructor-by">
                  Created by <strong>{course.instructor}</strong>
                </span>
                <span className="cd-dot">•</span>
                <span className="cd-badge-level">{course.level}</span>
              </div>
            </div>

            <div className="cd-price-card">
              <div className="cd-pc-badge">{course.emoji} Special Curriculum</div>
              <div className="cd-price-row">
                <span className="cd-price">{course.price}</span>
                {course.oldPrice && <span className="cd-old-price">{course.oldPrice}</span>}
              </div>
              <div className="cd-highlights-list">
                <div className="cd-hl-item">
                  <span>⏱</span>
                  <span>{course.weeks} Duration</span>
                </div>
                <div className="cd-hl-item">
                  <span>📖</span>
                  <span>{course.lessons} Total</span>
                </div>
                <div className="cd-hl-item">
                  <span>🎯</span>
                  <span>Capstone Real Projects</span>
                </div>
                <div className="cd-hl-item">
                  <span>📜</span>
                  <span>Verified TX Certification</span>
                </div>
              </div>

              {enrolledSuccess ? (
                <div className="cd-enrolled-msg">✓ Successfully Enrolled! Redirecting...</div>
              ) : enrolled ? (
                <button className="cd-btn-enrolled" onClick={() => navigate("/dashboard")}>
                  ✓ Already Enrolled — Go to Dashboard
                </button>
              ) : (
                <button className="cd-btn-primary cd-btn-enroll" onClick={handleEnrollNow}>
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="cd-content-wrap">
        <div className="cd-tabs-bar">
          <button
            className={`cd-tab-btn ${activeTab === "syllabus" ? "active" : ""}`}
            onClick={() => setActiveTab("syllabus")}
          >
            Curriculum ({course.syllabus.length} Modules)
          </button>
          <button
            className={`cd-tab-btn ${activeTab === "instructor" ? "active" : ""}`}
            onClick={() => setActiveTab("instructor")}
          >
            Instructor
          </button>
          <button
            className={`cd-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects ({course.projects.length})
          </button>
        </div>

        {activeTab === "syllabus" && (
          <div className="cd-syllabus-list">
            {course.syllabus.map((mod, idx) => {
              const isOpen = openModule === idx;
              return (
                <div key={idx} className={`cd-mod-card ${isOpen ? "open" : ""}`}>
                  <div
                    className="cd-mod-header"
                    onClick={() => setOpenModule(isOpen ? -1 : idx)}
                  >
                    <div>
                      <span className="cd-mod-tag">{mod.m}</span>
                      <h4 className="cd-mod-title">{mod.t}</h4>
                    </div>
                    <div className="cd-mod-right">
                      <span className="cd-mod-duration">{mod.d}</span>
                      <span className="cd-caret">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <ul className="cd-topics-list">
                      {mod.topics.map((t, i) => (
                        <li key={i} className="cd-topic-item">
                          <span className="cd-bullet">▹</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "instructor" && (
          <div className="cd-instructor-box">
            <div className="cd-inst-avatar">👨‍🏫</div>
            <div className="cd-inst-info">
              <h3>{course.instructor}</h3>
              <p className="cd-inst-role">{course.role}</p>
              <p className="cd-inst-bio">
                Senior engineering mentor and curriculum specialist at TX Pathwing. Has trained
                over 10,000+ developers into full-stack and cloud engineering careers.
              </p>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="cd-projects-grid">
            {course.projects.map((proj, idx) => (
              <div key={idx} className="cd-proj-card">
                <span className="cd-proj-icon">🚀</span>
                <h4>{proj}</h4>
                <p>
                  Built from scratch with industry architecture standards, unit tests, and
                  production deployment pipelines.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
