import React from "react";
import {
  GraduationCap,
  Users2,
  Building2,
  ArrowRight,
  ArrowLeft,
  X,
  ShieldCheck,
} from "lucide-react";
import "./CategorySelectionModal.css";

const CATEGORIES = [
  {
    key: "institution",
    title: "Institution",
    tagline: "Academic Campuses & Universities",
    icon: GraduationCap,
    badgeColor: "#1d4ed8",
    accentGrad: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    lightTint: "#eff6ff",
    description:
      "Manage educational institutions, campuses, departments, students, and academic operations.",
    features: ["Campus & Departments", "Student & Faculty Rosters", "Academic Programs & Placement"],
  },
  {
    key: "organization",
    title: "Organization",
    tagline: "NGOs, Foundations & Non-Profits",
    icon: Users2,
    badgeColor: "#2563eb",
    accentGrad: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    lightTint: "#eff6ff",
    description:
      "Manage organizations, teams, members, training programs, and organizational activities.",
    features: ["Team Cohorts & Members", "Skill Upskilling Bootcamps", "Collaborative Events"],
  },
  {
    key: "company",
    title: "Company",
    tagline: "Corporate Enterprises & Startups",
    icon: Building2,
    badgeColor: "#0284c7",
    accentGrad: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
    lightTint: "#f0f9ff",
    description:
      "Manage companies, employees, recruitment, training, and business operations.",
    features: ["Workforce & Employee Ops", "Recruitment & Job Openings", "L&D Training & Performance"],
  },
];

export default function CategorySelectionModal({
  isOpen = false,
  onClose,
  onBack,
  onSelectCategory,
  onSwitchToLogin,
}) {
  if (!isOpen) return null;

  return (
    <div className="cat-modal-popup" role="dialog" aria-modal="true">
      <div className="cat-modal-overlay" onClick={onClose} />

      <div className="cat-modal-window">
        <button
          type="button"
          className="cat-modal-close-btn"
          onClick={onClose}
          aria-label="Close category selection"
        >
          <X size={20} />
        </button>

        <div className="cat-modal-header">
          {onBack && (
            <button
              type="button"
              className="cat-back-btn"
              onClick={onBack}
              title="Return to Welcome Portal"
            >
              <ArrowLeft size={15} />
              <span>Back to Role Selection</span>
            </button>
          )}

          <div className="cat-header-content">
            <div className="cat-pill-badge">
              <ShieldCheck size={14} />
              <span>SELECT YOUR PORTAL CATEGORY</span>
            </div>
            <h1 className="cat-main-title">Choose Your Entity Type</h1>
            <p className="cat-subtitle">
              Select your organization model to access tailored management dashboards,
              workflows, and registration setup.
            </p>
          </div>
        </div>

        <div className="cat-cards-grid">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className={`cat-card cat-card-${cat.key}`}
                onClick={() => onSelectCategory(cat.key)}
                tabIndex={0}
                role="button"
                aria-label={`Select ${cat.title} category`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCategory(cat.key);
                  }
                }}
              >
                <div
                  className="cat-icon-container"
                  style={{ background: cat.lightTint, color: cat.badgeColor }}
                >
                  <Icon size={32} strokeWidth={2.2} />
                </div>

                <div className="cat-card-body">
                  <div className="cat-title-row">
                    <h2 className="cat-card-title">{cat.title}</h2>
                    <span
                      className="cat-tagline-badge"
                      style={{ color: cat.badgeColor, background: cat.lightTint }}
                    >
                      {cat.key.toUpperCase()}
                    </span>
                  </div>

                  <p className="cat-card-desc">{cat.description}</p>

                  <ul className="cat-features-list">
                    {cat.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="cat-feat-dot" style={{ background: cat.badgeColor }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cat-card-action">
                  <button
                    type="button"
                    className="cat-get-started-btn"
                    style={{ background: cat.accentGrad }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(cat.key);
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cat-modal-footer">
          <span>Already registered your institution, organization, or company?</span>
          <button
            type="button"
            className="cat-switch-login-btn"
            onClick={onSwitchToLogin}
          >
            Sign In to Account
          </button>
        </div>
      </div>
    </div>
  );
}
