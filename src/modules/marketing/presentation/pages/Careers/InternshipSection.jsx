import React from "react";
import { GraduationCap, Sparkles, ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import "./InternshipSection.css";

const InternshipSection = ({ onFilterInternships, onFilterEntryLevel }) => {
  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleExploreInternships = () => {
    if (onFilterInternships) {
      onFilterInternships();
    }
    scrollToPositions();
  };

  const handleEntryLevel = () => {
    if (onFilterEntryLevel) {
      onFilterEntryLevel();
    }
    scrollToPositions();
  };

  return (
    <section className="internship-section" aria-labelledby="intern-heading">
      <div className="careers-container">
        <div className="internship-card-banner">
          <div className="internship-content">
            <div className="internship-eyebrow">
              <GraduationCap size={15} />
              <span>FRESHERS & GRADUATES</span>
            </div>

            <h2 id="intern-heading" className="internship-title">
              Start Your Career With TX Pathwing
            </h2>

            <p className="internship-desc">
              Build practical experience, work with professionals and develop skills through real-world opportunities.
            </p>

            <div className="internship-perks-list">
              <div className="intern-perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Live Project Experience</span>
              </div>
              <div className="intern-perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>1-on-1 Mentor Guidance</span>
              </div>
              <div className="intern-perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Full-time Conversion Track</span>
              </div>
            </div>

            <div className="internship-actions">
              <button
                type="button"
                className="btn-intern-primary"
                onClick={handleExploreInternships}
              >
                <span>Explore Internships</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn-intern-secondary"
                onClick={handleEntryLevel}
              >
                <span>Entry-Level Jobs</span>
              </button>
            </div>
          </div>

          <div className="internship-visual">
            <div className="internship-badge-floating">
              <Rocket size={24} className="rocket-icon" />
              <div>
                <strong>Launch Fast</strong>
                <small>Graduate-Ready Programs</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
