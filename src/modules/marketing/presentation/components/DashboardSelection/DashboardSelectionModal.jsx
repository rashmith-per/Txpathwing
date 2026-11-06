import React, { useEffect } from "react";
import {
  GraduationCap,
  Settings,
  Building2,
  BookOpen,
  X,
} from "lucide-react";
import "./DashboardSelectionModal.css";

const DASHBOARDS = [
  {
    key: "student",
    icon: GraduationCap,
    title: "Student",
    roleName: "Student",
    description: "Access your dashboard, courses, payments & clearance.",
  },
  {
    key: "instructor",
    icon: BookOpen,
    title: "Instructor",
    roleName: "Instructor",
    description: "Manage class schedules, curriculum, and student attendance.",
  },
  {
    key: "institution",
    icon: Building2,
    title: "Institution",
    roleName: "Institution",
    description: "Oversee campus cohorts, compliance, and department records.",
  },
  {
    key: "admin",
    icon: Settings,
    title: "Admin",
    roleName: "Administrator",
    description: "Control users, payments, platform security, and reports.",
  },
];

export default function DashboardSelectionModal({
  isOpen = false,
  onClose,
  onSelectRole,
}) {
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="selection-popup" role="dialog" aria-modal="true">
      <div className="selection-overlay" onClick={onClose} />

      <div className="selection-box">
        <button
          type="button"
          className="selection-close"
          onClick={onClose}
          aria-label="Close dashboard selection"
        >
          <X size={18} />
        </button>

        <div className="selection-header">
          <h1 className="selection-title">WELCOME TO PATHWING PORTAL</h1>
          <p className="selection-subtitle">Select your role to access the system</p>
        </div>

        <div className="selection-grid">
          {DASHBOARDS.map((dash) => {
            const Icon = dash.icon;
            return (
              <div
                key={dash.key}
                className="selection-card"
                onClick={() => onSelectRole(dash.key)}
                tabIndex={0}
                role="button"
                aria-label={`Select ${dash.title} Dashboard`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectRole(dash.key);
                  }
                }}
              >
                <div className="selection-card-icon">
                  <Icon size={30} strokeWidth={2.2} />
                </div>
                <h2 className="selection-card-title">{dash.title}</h2>
                <p className="selection-card-desc">{dash.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
