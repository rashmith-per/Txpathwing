import React from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function InstOverviewModule({ user, onNavigate }) {
  const stats = [
    { label: "Total Enrolled Students", value: "3,480", change: "+12.4%", icon: GraduationCap, color: "#2563eb" },
    { label: "Active Faculty Members", value: "142", change: "+4.1%", icon: Users, color: "#059669" },
    { label: "Academic Departments", value: "8", change: "Full Accreditation", icon: Layers, color: "#7c3aed" },
    { label: "Active Degree Tracks", value: "24", change: "+2 New", icon: BookOpen, color: "#d97706" },
    { label: "Campus Placement Rate", value: "91.8%", change: "+5.3% YoY", icon: Briefcase, color: "#0891b2" },
    { label: "Avg CTC Package", value: "₹8.4 LPA", change: "Top: ₹42 LPA", icon: Award, color: "#ea580c" },
  ];

  const recentActivities = [
    { title: "B.Tech CSE Batch 2024-28 Orientation", time: "2 hours ago", status: "Completed", dept: "Computer Science" },
    { title: "Campus Recruitment Drive — TCS & Tech Mahindra", time: "Today, 10:30 AM", status: "In Progress", dept: "Training & Placements" },
    { title: "Mid-Term Examination Schedule Published", time: "Yesterday", status: "Published", dept: "Academic Operations" },
    { title: "Faculty Development Program on Agentic AI", time: "2 days ago", status: "Upcoming", dept: "AI & Data Science" },
  ];

  return (
    <div className="portal-module-container">
      {/* Banner */}
      <div className="inst-hero-banner">
        <div>
          <h2>Welcome to {user?.entityName || "Institution Workspace"}</h2>
          <p>
            Oversee campus departments, student enrollments, faculty teaching schedules, and placement operations.
          </p>
        </div>
        <div className="inst-banner-action">
          <button type="button" className="inst-banner-btn" onClick={() => onNavigate("Placements")}>
            <span>View Placement Insights</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="inst-stats-grid">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="inst-stat-card">
              <div className="inst-stat-icon-wrap" style={{ background: `${s.color}15`, color: s.color }}>
                <Icon size={22} />
              </div>
              <div className="inst-stat-body">
                <span className="inst-stat-label">{s.label}</span>
                <strong className="inst-stat-val">{s.value}</strong>
                <span className="inst-stat-change">{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Activities & Department Overview */}
      <div className="inst-content-split">
        <div className="inst-card">
          <div className="inst-card-header">
            <h3>Recent Academic & Campus Activities</h3>
            <span className="inst-badge-pill">Live Feed</span>
          </div>
          <div className="inst-activity-list">
            {recentActivities.map((act, i) => (
              <div key={i} className="inst-activity-item">
                <div className="inst-activity-dot" />
                <div className="inst-activity-main">
                  <strong>{act.title}</strong>
                  <span>{act.dept} • {act.time}</span>
                </div>
                <span className={`inst-status-tag ${act.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="inst-card">
          <div className="inst-card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="inst-quick-actions-grid">
            <button type="button" className="inst-quick-btn" onClick={() => onNavigate("Students")}>
              <GraduationCap size={18} />
              <span>Register Students</span>
            </button>
            <button type="button" className="inst-quick-btn" onClick={() => onNavigate("Faculty")}>
              <Users size={18} />
              <span>Manage Faculty</span>
            </button>
            <button type="button" className="inst-quick-btn" onClick={() => onNavigate("Courses")}>
              <BookOpen size={18} />
              <span>Curriculum Setup</span>
            </button>
            <button type="button" className="inst-quick-btn" onClick={() => onNavigate("Reports")}>
              <TrendingUp size={18} />
              <span>NAAC / NBA Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
