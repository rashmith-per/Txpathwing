import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function RecommendedSection({
  recommendedCourses = [],
  onEnroll,
  onViewDetails,
}) {
  return (
    <section className="dash-card-section">
      <div className="section-head-row">
        <div className="section-title-wrap">
          <h3>Recommended for You</h3>
          <p>Explore full syllabuses and enroll in industry courses</p>
        </div>
        <Link to="/marketplace" className="view-all-link">
          Marketplace <ArrowRight size={14} />
        </Link>
      </div>

      <div className="recommended-grid-3">
        {recommendedCourses.map((c) => {
          const instructorName = c.instructor?.name || c.instructor || "Pathwing Faculty";

          return (
            <div
              key={c.id || c.code}
              className="rec-course-card"
              onClick={() => onViewDetails && onViewDetails(c)}
              style={{ cursor: "pointer" }}
              title="Click to explore full syllabus and course details"
            >
              <div className="rec-card-top">
                <div className="rec-badge-row">
                  <span className="rec-category-tag">{c.category}</span>
                  <span className="rec-level-tag">{c.level}</span>
                </div>
                <h4 className="rec-course-title">{c.title}</h4>
                <div className="rec-instructor">by {instructorName}</div>
                <div className="rec-course-meta">
                  <span>⏱ {c.duration}</span>
                  <span>•</span>
                  <span>📚 {c.lessons}</span>
                </div>
              </div>

              <div className="rec-card-bottom">
                <span className="rec-price-val">{c.price}</span>
                <div className="rec-actions-group">
                  <button
                    type="button"
                    className="rec-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails && onViewDetails(c);
                    }}
                  >
                    Syllabus
                  </button>
                  <button
                    type="button"
                    className="rec-enroll-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnroll && onEnroll(c);
                    }}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
