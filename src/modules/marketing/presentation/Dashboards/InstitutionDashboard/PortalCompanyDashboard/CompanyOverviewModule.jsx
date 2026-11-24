import React from "react";
import {
  Users,
  Briefcase,
  UserPlus,
  BookOpen,
  TrendingUp,
  Award,
  ArrowUpRight,
} from "lucide-react";

export default function CompanyOverviewModule({ user, onNavigate }) {
  const stats = [
    { label: "Total Workforce", value: "1,420", change: "+8.5% YoY", icon: Users, color: "#7c3aed" },
    { label: "Active Job Openings", value: "24 Roles", change: "Hiring Across 5 Depts", icon: Briefcase, color: "#2563eb" },
    { label: "Recruitment Pipeline", value: "186 Candidates", change: "42 in Interview", icon: UserPlus, color: "#059669" },
    { label: "L&D Training Modules", value: "18 Tracks", change: "94% Adoption", icon: BookOpen, color: "#ea580c" },
    { label: "Quarterly Performance", value: "92.4%", change: "High Productivity", icon: TrendingUp, color: "#0891b2" },
    { label: "Employee Retention", value: "96.2%", change: "+2.1% YoY", icon: Award, color: "#d97706" },
  ];

  const recentHiringUpdates = [
    { title: "Senior AI Platform Engineer — Final Round", time: "1 hour ago", status: "Offer Stage", dept: "Engineering" },
    { title: "Campus Recruitment Drive — 2026 Batch", time: "Today, 11:00 AM", status: "Active Drive", dept: "HR & University Relations" },
    { title: "Quarterly Talent Appraisal Cycle Launched", time: "Yesterday", status: "Evaluation", dept: "People Operations" },
    { title: "New Employee Onboarding Bootcamp Completed", time: "2 days ago", status: "Completed", dept: "L&D Academy" },
  ];

  return (
    <div className="portal-module-container">
      <div className="company-hero-banner">
        <div>
          <h2>Welcome to {user?.entityName || "Company Workspace"}</h2>
          <p>
            Track corporate workforce metrics, active recruitment pipelines, enterprise L&D programs, and employee performance.
          </p>
        </div>
        <div className="company-banner-action">
          <button type="button" className="company-banner-btn" onClick={() => onNavigate("Recruitment")}>
            <span>View Open Applications</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <div className="company-stats-grid">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="company-stat-card">
              <div className="company-stat-icon-wrap" style={{ background: `${s.color}15`, color: s.color }}>
                <Icon size={22} />
              </div>
              <div className="company-stat-body">
                <span className="company-stat-label">{s.label}</span>
                <strong className="company-stat-val">{s.value}</strong>
                <span className="company-stat-change">{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="company-content-split">
        <div className="company-card">
          <div className="company-card-header">
            <h3>Talent Acquisition & HR Feed</h3>
            <span className="company-badge-pill">Realtime</span>
          </div>
          <div className="company-activity-list">
            {recentHiringUpdates.map((m, i) => (
              <div key={i} className="company-activity-item">
                <div className="company-activity-dot" />
                <div className="company-activity-main">
                  <strong>{m.title}</strong>
                  <span>{m.dept} • {m.time}</span>
                </div>
                <span className={`company-status-tag ${m.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="company-card">
          <div className="company-card-header">
            <h3>Quick Operations</h3>
          </div>
          <div className="company-quick-actions-grid">
            <button type="button" className="company-quick-btn" onClick={() => onNavigate("Employees")}>
              <Users size={18} />
              <span>Employees Roster</span>
            </button>
            <button type="button" className="company-quick-btn" onClick={() => onNavigate("Jobs")}>
              <Briefcase size={18} />
              <span>Post New Job</span>
            </button>
            <button type="button" className="company-quick-btn" onClick={() => onNavigate("Training")}>
              <BookOpen size={18} />
              <span>Corporate L&D</span>
            </button>
            <button type="button" className="company-quick-btn" onClick={() => onNavigate("Reports")}>
              <TrendingUp size={18} />
              <span>Talent Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
