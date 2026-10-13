import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

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
          <p>Explore top courses from our marketplace catalogue</p>
        </div>
        <Link to="/marketplace" className="view-all-link">
          View Catalogue <CheckCircle2 size={14} />
        </Link>
      </div>

      <div className="recommended-grid-3">
        {recommendedCourses.map((c) => (
          <div key={c.id} className="rec-course-card">
            <div className="rec-card-top">
              <div className="rec-badge-row">
                <span className="rec-category-tag">{c.category}</span>
                <span className="rec-level-tag">{c.level}</span>
              </div>
              <h4 className="rec-course-title">{c.title}</h4>
              <div className="rec-instructor">by {c.instructor}</div>
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
                  onClick={() => onViewDetails && onViewDetails(c.id)}
                >
                  Details
                </button>
                <button
                  type="button"
                  className="rec-enroll-btn"
                  onClick={() => onEnroll && onEnroll(c)}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
