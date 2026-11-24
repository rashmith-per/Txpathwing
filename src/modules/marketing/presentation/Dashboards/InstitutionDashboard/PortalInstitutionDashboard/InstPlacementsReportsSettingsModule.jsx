import React, { useState } from "react";
import { Briefcase, FileText, Settings, Award, CheckCircle2, Building2 } from "lucide-react";

export default function InstPlacementsReportsSettingsModule({
  mode = "placements",
  user,
  search = "",
}) {
  const [activeTab, setActiveTab] = useState(mode);
  const [institutionName, setInstitutionName] = useState(user?.entityName || "ABC Engineering College");
  const [savedNotice, setSavedNotice] = useState("");

  const placements = [
    { company: "Google Cloud", offers: 14, role: "Software Engineer", ctc: "₹36.0 LPA", tier: "Dream Super" },
    { company: "Microsoft India", offers: 18, role: "SDE I & Support Engg", ctc: "₹28.5 LPA", tier: "Dream Super" },
    { company: "Amazon AWS", offers: 22, role: "Cloud Support Associate", ctc: "₹22.0 LPA", tier: "Dream" },
    { company: "Deloitte Digital", offers: 48, role: "Technology Analyst", ctc: "₹9.5 LPA", tier: "Prime" },
    { company: "Tech Mahindra", offers: 120, role: "Associate Software Engg", ctc: "₹6.5 LPA", tier: "Core Mass" },
    { company: "Infosys Wings", offers: 140, role: "Systems Engineer", ctc: "₹6.0 LPA", tier: "Core Mass" },
  ];

  const reports = [
    { title: "NAAC Institutional Accreditation Self-Study (SSR)", cycle: "Cycle 3", date: "Oct 2026", status: "Verified" },
    { title: "National Institutional Ranking Framework (NIRF) Dossier", cycle: "2026 Edition", date: "Nov 2026", status: "Submitted" },
    { title: "NBA Compliance & Outcome-Based Education Audit", cycle: "B.Tech Tier 1", date: "Sep 2026", status: "Approved" },
    { title: "Annual Campus Placement & Career Trajectory Report", cycle: "Batch 2025-26", date: "Nov 2026", status: "Published" },
  ];

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedNotice("Institution workspace settings updated successfully.");
    setTimeout(() => setSavedNotice(""), 3000);
  };

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "placements" ? "active" : ""}`}
          onClick={() => setActiveTab("placements")}
        >
          <Briefcase size={16} />
          <span>Placement Operations</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          <FileText size={16} />
          <span>Accreditation & Audit Reports</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={16} />
          <span>Institution Settings</span>
        </button>
      </div>

      {activeTab === "placements" ? (
        <div className="placements-layout">
          <div className="placement-kpis">
            <div className="placement-kpi-card">
              <span className="pk-label">Overall Placement Rate</span>
              <strong className="pk-val">91.8%</strong>
              <span className="pk-sub">642 / 700 eligible students</span>
            </div>
            <div className="placement-kpi-card">
              <span className="pk-label">Highest Package</span>
              <strong className="pk-val">₹42.0 LPA</strong>
              <span className="pk-sub">International Cloud Security</span>
            </div>
            <div className="placement-kpi-card">
              <span className="pk-label">Average CTC</span>
              <strong className="pk-val">₹8.4 LPA</strong>
              <span className="pk-sub">Median: ₹7.2 LPA</span>
            </div>
            <div className="placement-kpi-card">
              <span className="pk-label">Corporate Hiring Partners</span>
              <strong className="pk-val">84 Companies</strong>
              <span className="pk-sub">Campus drives completed</span>
            </div>
          </div>

          <div className="table-card">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Hiring Organization</th>
                  <th>Designation Role</th>
                  <th>Offers Count</th>
                  <th>CTC Package</th>
                  <th>Category Tier</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((p, idx) => (
                  <tr key={idx}>
                    <td><strong>{p.company}</strong></td>
                    <td>{p.role}</td>
                    <td><strong>{p.offers} Students</strong></td>
                    <td><strong>{p.ctc}</strong></td>
                    <td><span className="badge-pill">{p.tier}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "reports" ? (
        <div className="reports-grid">
          {reports.map((r, i) => (
            <div key={i} className="report-card">
              <div className="report-card-top">
                <FileText size={20} className="report-icon" />
                <span className="report-status-badge">{r.status}</span>
              </div>
              <h3 className="report-title">{r.title}</h3>
              <div className="report-meta">
                <span>Cycle: {r.cycle}</span>
                <span>•</span>
                <span>Generated: {r.date}</span>
              </div>
              <button type="button" className="report-download-btn">
                <span>Download PDF Audit</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="settings-form-card">
          <h3>Institution Configuration & Workspace Profile</h3>
          {savedNotice && (
            <div className="reg-alert success" role="status">
              <CheckCircle2 size={16} />
              <span>{savedNotice}</span>
            </div>
          )}
          <form onSubmit={handleSaveSettings} className="settings-form">
            <div className="settings-field">
              <label>Institution / College Official Name</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                required
              />
            </div>
            <div className="settings-field">
              <label>Administrative Contact Email</label>
              <input type="email" defaultValue={user?.email || "admin@institution.edu"} readOnly />
            </div>
            <div className="settings-field">
              <label>Affiliating University / Board</label>
              <input type="text" defaultValue="State Technological University / Autonomous" />
            </div>
            <div className="settings-field">
              <label>Accreditation Status</label>
              <input type="text" defaultValue="NAAC A++ Grade, NBA Tier 1 Accredited" />
            </div>
            <button type="submit" className="inst-primary-btn">
              <span>Save Workspace Changes</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
