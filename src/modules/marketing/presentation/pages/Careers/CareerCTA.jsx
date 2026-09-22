import React from "react";
import { ArrowRight, FileUp, Sparkles } from "lucide-react";
import "./CareerCTA.css";

const CareerCTA = ({ onExploreClick, onSubmitResumeClick }) => {
  const scrollToPositions = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById("open-positions");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="careers-bottom-wrapper">
      {/* 15. RESUME SUBMISSION: Don't See Your Role? */}
      <section className="dont-see-role-section" aria-labelledby="unlisted-role-heading">
        <div className="careers-container">
          <div className="dont-see-role-card">
            <div className="dont-see-role-content">
              <span className="dont-see-badge">GENERAL APPLICATION</span>
              <h3 id="unlisted-role-heading" className="dont-see-title">
                Don't See Your Role?
              </h3>
              <p className="dont-see-desc">
                Have skills, passion and ideas but don't see a matching position? Send us your resume and tell us where you can make an impact.
              </p>
            </div>
            <div className="dont-see-action">
              <button
                type="button"
                className="btn-submit-resume"
                onClick={onSubmitResumeClick}
                aria-label="Submit your resume for unlisted roles"
              >
                <FileUp size={18} />
                <span>Submit Your Resume</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 16. FINAL CTA */}
      <section className="career-final-cta-section" aria-labelledby="cta-heading">
        <div className="final-cta-glow" aria-hidden="true" />
        <div className="careers-container final-cta-content">
          <span className="final-cta-eyebrow">
            <Sparkles size={14} /> JOIN US TODAY
          </span>
          <h2 id="cta-heading" className="final-cta-headline">
            Your Next Chapter Starts Here.
          </h2>
          <p className="final-cta-subtext">
            Build your skills. Build your career. Build the future with TX Pathwing.
          </p>
          <button
            type="button"
            className="final-cta-button"
            onClick={scrollToPositions}
          >
            <span>Explore Open Positions</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default CareerCTA;
