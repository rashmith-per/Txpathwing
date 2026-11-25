import React, { useState } from "react";
import { BookOpen, TrendingUp, Award, CheckCircle } from "lucide-react";

export default function CompanyTrainingPerformanceModule({ mode = "training", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const trainingModules = [
    { title: "Enterprise Zero Trust & Information Security", type: "Mandatory Annual Compliance", enrolled: 1420, completion: "98.5%", status: "Active" },
    { title: "Agentic AI & LLM Systems for Engineers", type: "Upskilling Certification", enrolled: 320, completion: "92.0%", status: "Active" },
    { title: "Strategic Leadership & Agile Delivery", type: "Management Development", enrolled: 85, completion: "89.4%", status: "Active" },
    { title: "High-Throughput Distributed Microservices", type: "Advanced Tech Track", enrolled: 210, completion: "95.1%", status: "Active" },
  ];

  const performanceBands = [
    { department: "Software Engineering", reviewCycle: "Q3 2026", goalAttainment: "94.2%", topPerformers: 42, distribution: "8% Top, 84% Meets, 8% Low" },
    { department: "Artificial Intelligence R&D", reviewCycle: "Q3 2026", goalAttainment: "96.5%", topPerformers: 28, distribution: "12% Top, 85% Meets, 3% Low" },
    { department: "Product & UX Design", reviewCycle: "Q3 2026", goalAttainment: "91.8%", topPerformers: 16, distribution: "10% Top, 82% Meets, 8% Low" },
    { department: "Enterprise Sales & Growth", reviewCycle: "Q3 2026", goalAttainment: "104.2%", topPerformers: 36, distribution: "15% Top, 80% Meets, 5% Low" },
  ];

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "training" ? "active" : ""}`}
          onClick={() => setActiveTab("training")}
        >
          <BookOpen size={16} />
          <span>Enterprise L&D Training ({trainingModules.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "performance" ? "active" : ""}`}
          onClick={() => setActiveTab("performance")}
        >
          <TrendingUp size={16} />
          <span>Performance & KPI Analytics</span>
        </button>
      </div>

      {activeTab === "training" ? (
        <div className="program-grid">
          {trainingModules.map((m, i) => (
            <div key={i} className="program-card">
              <div className="program-top">
                <span className="program-degree-tag">{m.type}</span>
                <span className="program-status">{m.status}</span>
              </div>
              <h3 className="program-name">{m.title}</h3>
              <div className="program-meta">
                <span>{m.enrolled} Employees Enrolled</span>
                <span>•</span>
                <span><strong>{m.completion}</strong> Completion</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Appraisal Cycle</th>
                <th>Goal Attainment</th>
                <th>Exceeding Target</th>
                <th>Performance Distribution</th>
              </tr>
            </thead>
            <tbody>
              {performanceBands.map((p, idx) => (
                <tr key={idx}>
                  <td><strong>{p.department}</strong></td>
                  <td>{p.reviewCycle}</td>
                  <td><strong>{p.goalAttainment}</strong></td>
                  <td><span className="badge-pill">{p.topPerformers} Staff</span></td>
                  <td>{p.distribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
