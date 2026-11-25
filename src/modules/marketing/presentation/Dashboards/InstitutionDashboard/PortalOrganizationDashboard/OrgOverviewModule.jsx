import React from "react";
import {
  Users2,
  UserCheck,
  BookOpen,
  CalendarDays,
  Target,
  Award,
  ArrowUpRight,
} from "lucide-react";

export default function OrgOverviewModule({ user, onNavigate }) {
  const stats = [
    { label: "Active Project Teams", value: "18 Teams", change: "+3 New", icon: Users2, color: "#2563eb" },
    { label: "Total Organization Members", value: "840", change: "+18% MoM", icon: UserCheck, color: "#059669" },
    { label: "Training Bootcamps", value: "14 Active", change: "92% Completion", icon: BookOpen, color: "#7c3aed" },
    { label: "Learning Activities", value: "32 Cohorts", change: "+8 Running", icon: Target, color: "#ea580c" },
    { label: "Organization Events", value: "6 Upcoming", change: "Global Summit", icon: CalendarDays, color: "#0891b2" },
    { label: "Issued Certifications", value: "1,260", change: "Verified", icon: Award, color: "#d97706" },
  ];

  const recentMilestones = [
    { title: "Agentic AI Developer Sprint — Cohort Alpha", time: "3 hours ago", status: "Ongoing", team: "AI & Innovation Labs" },
    { title: "Quarterly Tech Upskilling Assessment", time: "Today, 02:00 PM", status: "Evaluation", team: "Technical Operations" },
    { title: "Cross-Functional Design Thinking Workshop", time: "Yesterday", status: "Completed", team: "Product & UI" },
    { title: "Annual Foundation Hackathon 2026", time: "Dec 12 - 15", status: "Scheduled", team: "Executive Committee" },
  ];

  return (
    <div className="portal-module-container">
      <div className="org-hero-banner">
        <div>
          <h2>Welcome to {user?.entityName || "Organization Workspace"}</h2>
          <p>
            Manage organizational teams, learning bootcamps, upskilling cohorts, and collaborative hackathons.
          </p>
        </div>
        <div className="org-banner-action">
          <button type="button" className="org-banner-btn" onClick={() => onNavigate("Training")}>
            <span>View Active Bootcamps</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <div className="org-stats-grid">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="org-stat-card">
              <div className="org-stat-icon-wrap" style={{ background: `${s.color}15`, color: s.color }}>
                <Icon size={22} />
              </div>
              <div className="org-stat-body">
                <span className="org-stat-label">{s.label}</span>
                <strong className="org-stat-val">{s.value}</strong>
                <span className="org-stat-change">{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="org-content-split">
        <div className="org-card">
          <div className="org-card-header">
            <h3>Recent Organizational Milestones</h3>
            <span className="org-badge-pill">Activity</span>
          </div>
          <div className="org-activity-list">
            {recentMilestones.map((m, i) => (
              <div key={i} className="org-activity-item">
                <div className="org-activity-dot" />
                <div className="org-activity-main">
                  <strong>{m.title}</strong>
                  <span>{m.team} • {m.time}</span>
                </div>
                <span className={`org-status-tag ${m.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="org-card">
          <div className="org-card-header">
            <h3>Management Shortcuts</h3>
          </div>
          <div className="org-quick-actions-grid">
            <button type="button" className="org-quick-btn" onClick={() => onNavigate("Teams")}>
              <Users2 size={18} />
              <span>Manage Teams</span>
            </button>
            <button type="button" className="org-quick-btn" onClick={() => onNavigate("Members")}>
              <UserCheck size={18} />
              <span>Member Roster</span>
            </button>
            <button type="button" className="org-quick-btn" onClick={() => onNavigate("Events")}>
              <CalendarDays size={18} />
              <span>Create Event</span>
            </button>
            <button type="button" className="org-quick-btn" onClick={() => onNavigate("Reports")}>
              <Target size={18} />
              <span>Impact Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
