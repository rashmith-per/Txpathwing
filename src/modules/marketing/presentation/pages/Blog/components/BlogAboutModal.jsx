import React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  UserCheck,
  X,
} from "lucide-react";

export function BlogAboutModal({ onClose }) {
  return (
    <div className="tx-modal-backdrop" onClick={onClose}>
      <div className="tx-overview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tx-overview-modal-head">
          <div>
            <div className="tx-section-tagline">
              <span className="tx-tagline-bar" />
              <span className="tx-tagline-label">ABOUT TX-PATH-WING</span>
            </div>
            <h2 className="tx-modal-headline">
              Empowering Next-Generation Tech Careers
            </h2>
            <p className="tx-modal-subheadline">
              Bridging the gap between academic learning and high-growth engineering roles.
            </p>
          </div>
          <button
            type="button"
            className="tx-modal-close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="tx-overview-modal-body">
          <p className="tx-modal-intro">
            TX-Path-Wing is an EdTech platform designed for B.Tech students,
            Degree students, colleges, and industry professionals. We bridge
            the gap between academic learning and industry requirements
            through practical, hands-on, and outcome-driven programs.
          </p>

          <div className="tx-modal-pillars-grid">
            <div className="tx-modal-pillar-card">
              <div className="tx-pillar-icon icon-blue">
                <GraduationCap size={22} />
              </div>
              <h4>For Students & Aspirants</h4>
              <p>
                Gain in-browser coding practice, complete capstone
                engineering projects, and secure verified internships with
                reputable tech companies.
              </p>
            </div>

            <div className="tx-modal-pillar-card">
              <div className="tx-pillar-icon icon-purple">
                <Landmark size={22} />
              </div>
              <h4>For Colleges & Institutions</h4>
              <p>
                Integrate industry-aligned curriculum, leverage outcome-driven
                LMS analytics, and conduct automated placement readiness
                evaluations.
              </p>
            </div>

            <div className="tx-modal-pillar-card">
              <div className="tx-pillar-icon icon-green">
                <UserCheck size={22} />
              </div>
              <h4>For Mentors & Trainers</h4>
              <p>
                Lead interactive live workshops, review real pull requests,
                and guide thousands of eager engineering students.
              </p>
            </div>

            <div className="tx-modal-pillar-card">
              <div className="tx-pillar-icon icon-orange">
                <BriefcaseBusiness size={22} />
              </div>
              <h4>For Industry Partners</h4>
              <p>
                Recruit pre-screened talent with verifiable credentials,
                proven coding skills, and hands-on project portfolios.
              </p>
            </div>
          </div>

          <div className="tx-modal-cta-box">
            <div>
              <h4>Ready to level up your engineering skills?</h4>
              <p>Explore our structured 6-step learning pathway today.</p>
            </div>
            <div className="tx-modal-btn-row">
              <a href="/learner-journey" className="tx-modal-primary-btn">
                <span>Explore Learner Journey</span>
                <ArrowRight size={15} />
              </a>
              <button
                type="button"
                className="tx-modal-secondary-btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
