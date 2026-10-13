import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import txIcon from "../../../../../../assets/tx-icon.jpg";
import Assessments from "../Assessments/Assessments";
import Certificates from "../Certificates/Certificates";
import "./Dashboard.css";

export default function Dashboard() {
  const location = useLocation();

  // Determine initial tab based on URL path
  const getTabFromPath = (pathname) => {
    if (pathname.includes("assessments")) return "assessments";
    if (pathname.includes("certificates")) return "certificates";
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname));

  useEffect(() => {
    if (location.pathname.includes("assessments")) {
      setActiveTab("assessments");
    } else if (location.pathname.includes("certificates")) {
      setActiveTab("certificates");
    }
  }, [location.pathname]);

  return (
    <div className="student-dashboard-layout">
      {/* Left Sidebar with all Student Dashboard topics */}
      <aside className="student-sidebar">
        {/* Top Brand & Role Switcher */}
        <div className="sidebar-brand-area">
          <div className="pathwing-logo">
            <img src={txIcon} alt="" className="tx-sidebar-logo-img" />
            <span className="logo-text">Pathwing</span>
          </div>

          <div className="signed-in-box">
            <label className="signed-in-label">SIGNED IN AS</label>
            <select className="signed-in-select" defaultValue="student">
              <option value="student">Student — Aditya R.</option>
            </select>
          </div>
        </div>

        {/* Navigation Menu Items */}
        <nav className="sidebar-nav-menu">
          <div className="nav-group">
            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "my-courses" ? "active" : ""}`}
              onClick={() => setActiveTab("my-courses")}
            >
              <span>My courses</span>
              <span className="nav-badge">4</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "ai-assistant" ? "active" : ""}`}
              onClick={() => setActiveTab("ai-assistant")}
            >
              <span>AI assistant</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "coding-lab" ? "active" : ""}`}
              onClick={() => setActiveTab("coding-lab")}
            >
              <span>Coding lab</span>
              <span className="nav-badge">2</span>
            </button>
          </div>

          <div className="nav-group">
            <span className="nav-section-title">PROGRESS</span>
            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "assessments" ? "active" : ""}`}
              onClick={() => setActiveTab("assessments")}
            >
              <span>Assessments</span>
              <span className="nav-badge">1</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "certificates" ? "active" : ""}`}
              onClick={() => setActiveTab("certificates")}
            >
              <span>Certificates</span>
              <span className="nav-badge">3</span>
            </button>
          </div>

          <div className="nav-group">
            <span className="nav-section-title">NEXT</span>
            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "careers" ? "active" : ""}`}
              onClick={() => setActiveTab("careers")}
            >
              <span>Careers</span>
              <span className="nav-badge">14</span>
            </button>
          </div>
        </nav>

        {/* Bottom User Profile */}
        <div className="sidebar-user-footer">
          <div className="user-avatar-badge">AR</div>
          <div className="user-meta">
            <div className="user-name">Aditya Reddy</div>
            <div className="user-tenant">Tenant: KITSW · Learner Pro</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area: ONLY opens Assessments or Certificates when clicked */}
      <main className="student-main-content">
        {activeTab === "assessments" && <Assessments />}
        {activeTab === "certificates" && <Certificates />}
      </main>
    </div>
  );
}
