import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  Settings,
  Building2,
  BookOpen,
} from "lucide-react";
import Login from "../../components/Login/Login";
import "./PortalSelectionPage.css";

const PORTALS = [
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

export default function PortalSelectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const portalParam = searchParams.get("portal") || searchParams.get("role");

  // Which portal's sign-in modal is open (null = showing the four cards)
  const [activePortal, setActivePortal] = useState(portalParam || null);

  useEffect(() => {
    if (portalParam) {
      setActivePortal(portalParam);
    }
  }, [portalParam]);

  const handleOpenPortal = (roleKey) => {
    setActivePortal(roleKey);
    setSearchParams({ portal: roleKey });
  };

  const handleClosePortal = () => {
    setActivePortal(null);
    setSearchParams({});
  };

  return (
    <div className="portal-page-container">
      {/* Centered Role Selection Layout (Faithful to Image) */}
      <div className="portal-content-box">
        {/* Header */}
        <div className="portal-header">
          <h1 className="portal-main-title">WELCOME TO PATHWING PORTAL</h1>
          <p className="portal-subtitle">Select your role to access the system</p>
        </div>

        {/* 4 Dashboard Cards Grid (2x2) */}
        <div className="portal-cards-grid">
          {PORTALS.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.key}
                className="portal-card"
                onClick={() => handleOpenPortal(portal.key)}
                tabIndex={0}
                role="button"
                aria-label={`Select ${portal.title} Dashboard`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenPortal(portal.key);
                  }
                }}
              >
                <div className="portal-card-icon">
                  <Icon size={30} strokeWidth={2.2} />
                </div>
                <h2 className="portal-card-title">{portal.title}</h2>
                <p className="portal-card-desc">{portal.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Particular Sign-in Page (Exact Screenshot UI) */}
      <Login
        isOpen={Boolean(activePortal)}
        selectedRole={activePortal || "student"}
        onClose={handleClosePortal}
        onBack={handleClosePortal}
      />
    </div>
  );
}
