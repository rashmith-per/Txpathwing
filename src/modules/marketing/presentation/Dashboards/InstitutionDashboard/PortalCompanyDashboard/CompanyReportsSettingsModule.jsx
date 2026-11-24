import React, { useState } from "react";
import { FileText, Settings, CheckCircle2, Building2 } from "lucide-react";

export default function CompanyReportsSettingsModule({
  mode = "reports",
  user,
  search = "",
}) {
  const [activeTab, setActiveTab] = useState(mode);
  const [companyName, setCompanyName] = useState(user?.entityName || "Acme Technologies Inc.");
  const [savedNotice, setSavedNotice] = useState("");

  const reports = [
    { title: "Annual Headcount & Workforce Retention Dossier", period: "2026 Annual", status: "Published", score: "96.2% Retention" },
    { title: "Recruitment Velocity & Time-to-Hire Benchmarks", period: "Q3 2026", status: "Verified", score: "18 Days Avg" },
    { title: "Diversity, Equity & Inclusion (DEI) Corporate Metrics", period: "2026 Audit", status: "Approved", score: "Exemplary" },
    { title: "Enterprise L&D ROI & Certification Completion Audit", period: "YTD 2026", status: "Verified", score: "₹3.2x ROI" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice("Company workspace configuration updated successfully.");
    setTimeout(() => setSavedNotice(""), 3000);
  };

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          <FileText size={16} />
          <span>Talent Analytics & Reports</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={16} />
          <span>Company Settings</span>
        </button>
      </div>

      {activeTab === "reports" ? (
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
                <span>Metric: <strong>{r.score}</strong></span>
              </div>
              <button type="button" className="report-download-btn">
                <span>Download Report</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="settings-form-card">
          <h3>Company Workspace Configuration</h3>
          {savedNotice && (
            <div className="reg-alert success" role="status">
              <CheckCircle2 size={16} />
              <span>{savedNotice}</span>
            </div>
          )}
          <form onSubmit={handleSave} className="settings-form">
            <div className="settings-field">
              <label>Company Legal Entity Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="settings-field">
              <label>Corporate Administrative Email</label>
              <input type="email" defaultValue={user?.email || "careers@company.com"} readOnly />
            </div>
            <div className="settings-field">
              <label>Corporate Headquarters</label>
              <input type="text" defaultValue="Hyderabad Tech City / Bangalore Campus" />
            </div>
            <div className="settings-field">
              <label>Recruitment Portal Status</label>
              <input type="text" defaultValue="Active · Integrated with Pathwing University Network" readOnly />
            </div>
            <button type="submit" className="company-primary-btn">
              <span>Save Company Configuration</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
