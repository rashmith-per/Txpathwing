import React, { useState } from "react";
import {
  X,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";
import { getCourseByIdOrCode } from "../services/courseCatalogue.data";
import "./RecommendedCourseModal.css";

export default function RecommendedCourseModal({
  course,
  isEnrolled = false,
  onClose,
  onEnroll,
}) {
  const fullCourse = getCourseByIdOrCode(course?.id || course?.code) || course;

  const [expandedModules, setExpandedModules] = useState(() => {
    const init = {};
    (fullCourse?.modules || []).forEach((m, i) => {
      init[m.id] = i === 0; // open first module by default
    });
    return init;
  });

  const [enrolling, setEnrolling] = useState(false);

  if (!fullCourse) return null;

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleEnrollClick = async () => {
    if (isEnrolled || enrolling) return;
    setEnrolling(true);
    try {
      if (onEnroll) {
        await onEnroll(fullCourse);
      }
    } finally {
      setEnrolling(false);
    }
  };

  const instructorName = fullCourse.instructor?.name || fullCourse.instructor || "Pathwing Faculty";
  const instructorRole = fullCourse.instructor?.role || "Industry Senior Instructor";
  const instructorInitials =
    fullCourse.instructor?.initials ||
    instructorName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TX";

  return (
    <div className="rec-modal-backdrop" onClick={onClose}>
      <div className="rec-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="rec-modal-header">
          <div className="rec-modal-title-box">
            <div className="rec-modal-tag-row">
              <span className="rec-modal-code-pill">{fullCourse.code}</span>
              <span className="rec-modal-cat-pill">{fullCourse.category}</span>
              <span className="rec-modal-level-pill">{fullCourse.level}</span>
            </div>
            <h2 className="rec-modal-course-name">{fullCourse.title}</h2>
            <div className="rec-modal-meta-row">
              <span>⏱ {fullCourse.duration}</span>
              <span>•</span>
              <span>📚 {fullCourse.lessons}</span>
              <span>•</span>
              <span>⭐ {fullCourse.rating || "4.8"} ({fullCourse.reviews || "1,000+"} reviews)</span>
            </div>
          </div>

          <button
            type="button"
            className="rec-modal-close-btn"
            onClick={onClose}
            title="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="rec-modal-body-scroll">
          {/* 1. Description */}
          <h3 className="rec-modal-section-title">Course Overview</h3>
          <p className="rec-modal-desc">{fullCourse.description}</p>

          {/* 2. Instructor Details */}
          <div className="rec-modal-instructor-card">
            <div className="rec-modal-avatar">{instructorInitials}</div>
            <div>
              <div className="rec-modal-inst-name">{instructorName}</div>
              <div className="rec-modal-inst-role">{instructorRole}</div>
            </div>
          </div>

          {/* 3. Skills Covered */}
          {fullCourse.skills?.length > 0 && (
            <>
              <h3 className="rec-modal-section-title">
                <Sparkles size={16} color="#2563eb" /> Skills You Will Master
              </h3>
              <div className="rec-modal-skills-grid">
                {fullCourse.skills.map((skill) => (
                  <span key={skill} className="rec-modal-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* 4. Learning Outcomes */}
          {fullCourse.learningOutcomes?.length > 0 && (
            <>
              <h3 className="rec-modal-section-title">
                <CheckCircle2 size={16} color="#10b981" /> Learning Outcomes
              </h3>
              <ul className="rec-modal-outcomes-list">
                {fullCourse.learningOutcomes.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 5. Practical Projects */}
          {fullCourse.projects?.length > 0 && (
            <>
              <h3 className="rec-modal-section-title">
                <Layers size={16} color="#8b5cf6" /> Practical Projects
              </h3>
              <div className="rec-modal-projects-grid">
                {fullCourse.projects.map((proj, idx) => (
                  <div key={idx} className="rec-modal-project-box">
                    <span className="rec-modal-project-num">0{idx + 1}</span>
                    <span className="rec-modal-project-title">{proj}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 6. Complete Module-Wise Syllabus (Strictly NO fake progress) */}
          <h3 className="rec-modal-section-title">
            <BookOpen size={16} color="#2563eb" /> Complete Syllabus Track
          </h3>
          <div className="rec-modal-syllabus-box">
            {(fullCourse.modules || []).map((mod, modIdx) => {
              const isOpen = Boolean(expandedModules[mod.id]);

              return (
                <div key={mod.id || modIdx} className="rec-module-card">
                  <div
                    className="rec-module-header"
                    onClick={() => toggleModule(mod.id)}
                  >
                    <div className="rec-module-title-row">
                      {isOpen ? (
                        <ChevronDown size={18} color="#475569" />
                      ) : (
                        <ChevronRight size={18} color="#475569" />
                      )}
                      <span>
                        Module {mod.moduleNumber || modIdx + 1}: {mod.title}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      ⏱ {mod.duration} • {mod.topics?.length || 0} topics
                    </span>
                  </div>

                  {isOpen && (
                    <div className="rec-module-topics-list">
                      {(mod.topics || []).map((top, topIdx) => (
                        <div key={top.id || topIdx} className="rec-topic-item">
                          <div className="rec-topic-left">
                            <span className="rec-topic-dot" />
                            <span>
                              {topIdx + 1}. {top.title}
                            </span>
                          </div>
                          <span className="rec-topic-dur">{top.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with Price and Enroll Now Button */}
        <footer className="rec-modal-footer">
          <div className="rec-modal-price-box">
            <span className="rec-modal-price-val">{fullCourse.price}</span>
            {fullCourse.oldPrice && fullCourse.oldPrice !== "₹0" && (
              <span className="rec-modal-old-price">{fullCourse.oldPrice}</span>
            )}
          </div>

          <button
            type="button"
            className={`rec-modal-enroll-btn ${isEnrolled ? "enrolled" : ""}`}
            onClick={isEnrolled ? onClose : handleEnrollClick}
            disabled={enrolling}
          >
            {isEnrolled ? (
              <>
                <CheckCircle2 size={16} /> Already Enrolled ✓
              </>
            ) : enrolling ? (
              "Enrolling..."
            ) : (
              <>Enroll Now — {fullCourse.price}</>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
