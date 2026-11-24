import React, { useState } from "react";
import { Target, CalendarDays, FileText, CheckCircle2 } from "lucide-react";

export default function OrgActivitiesEventsReportsModule({ mode = "activities", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const activities = [
    { name: "Autonomous Agent Coding Sprint", type: "Collaborative Sprint", participants: 78, duration: "3 Days", status: "Active" },
    { name: "Quarterly Open Source Contribution Drive", type: "Community Challenge", participants: 140, duration: "2 Weeks", status: "Active" },
    { name: "Secure Systems Red Team Simulation", type: "Security Lab", participants: 45, duration: "1 Day", status: "Completed" },
    { name: "Frontend Micro-Frontend Refactoring Clinic", type: "Code Review", participants: 60, duration: "4 Hours", status: "Completed" },
  ];

  const events = [
    { title: "Global Developer Innovation Summit 2026", date: "Dec 18, 2026", type: "Annual Conference", venue: "Main Auditorium & Hybrid Stream", attendees: 620 },
    { title: "Agentic AI & Next-Gen Orchestration Panel", date: "Dec 05, 2026", type: "Expert Webinar", venue: "Virtual Stage", attendees: 340 },
    { title: "Winter Team Hackathon & Project Showcase", date: "Jan 10, 2027", type: "Internal Hackathon", venue: "Pathwing Innovation Hub", attendees: 180 },
  ];

  const reports = [
    { title: "Organizational Skill Competency & Matrix Audit", period: "Q3 2026", status: "Published", score: "94/100" },
    { title: "Member Training Hours & Certification Log", period: "2026 YTD", status: "Verified", score: "14,200 Hrs" },
    { title: "Community Impact & Activity Engagement Report", period: "Annual", status: "Approved", score: "High Impact" },
  ];

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "activities" ? "active" : ""}`}
          onClick={() => setActiveTab("activities")}
        >
          <Target size={16} />
          <span>Learning Activities</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          <CalendarDays size={16} />
          <span>Organization Events ({events.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          <FileText size={16} />
          <span>Reports & Audits</span>
        </button>
      </div>

      {activeTab === "activities" ? (
        <div className="team-grid">
          {activities.map((a, i) => (
            <div key={i} className="team-card">
              <div className="team-card-top">
                <span className="team-status-tag">{a.status}</span>
                <span className="team-domain-tag">{a.type}</span>
              </div>
              <h3 className="team-name">{a.name}</h3>
              <div className="team-meta-row">
                <span>{a.participants} Participants</span>
                <span>•</span>
                <span>{a.duration}</span>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === "events" ? (
        <div className="team-grid">
          {events.map((e, idx) => (
            <div key={idx} className="team-card">
              <div className="team-card-top">
                <span className="team-status-tag">{e.type}</span>
                <span className="batch-year">{e.date}</span>
              </div>
              <h3 className="team-name">{e.title}</h3>
              <p className="dept-hod">Venue: <strong>{e.venue}</strong></p>
              <div className="team-meta-row">
                <span>{e.attendees} Registered Attendees</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((r, i) => (
            <div key={i} className="report-card">
              <div className="report-card-top">
                <FileText size={20} className="report-icon" />
                <span className="report-status-badge">{r.status}</span>
              </div>
              <h3 className="report-title">{r.title}</h3>
              <div className="report-meta">
                <span>Period: {r.period}</span>
                <span>•</span>
                <span>Metric: {r.score}</span>
              </div>
              <button type="button" className="report-download-btn">
                <span>Download Report</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
