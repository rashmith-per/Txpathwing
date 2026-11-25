import React, { useState } from "react";
import { CheckCircle, AlertTriangle, Award, BookOpen } from "lucide-react";

export default function InstAttendanceProgramsModule({ mode = "attendance", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const programs = [
    { degree: "B.Tech", name: "Bachelor of Technology in Computer Science", duration: "4 Years / 8 Semesters", accreditation: "NBA Tier 1", seats: 240, status: "Accredited" },
    { degree: "B.Tech", name: "Bachelor of Technology in AI & Data Science", duration: "4 Years / 8 Semesters", accreditation: "AICTE Approved", seats: 120, status: "Accredited" },
    { degree: "M.Tech", name: "Master of Technology in Cloud & Cyber Systems", duration: "2 Years / 4 Semesters", accreditation: "NBA Tier 1", seats: 36, status: "Accredited" },
    { degree: "MBA", name: "Master of Business Administration", duration: "2 Years / 4 Trimesters", accreditation: "NAAC A++", seats: 120, status: "Accredited" },
    { degree: "Ph.D.", name: "Doctoral Program in Engineering & Sciences", duration: "3 - 5 Years", accreditation: "UGC Recognized", seats: 24, status: "Active" },
  ];

  const deptAttendance = [
    { dept: "Computer Science & Engineering", rate: "92.4%", status: "Optimal", count: 960 },
    { dept: "AI & Machine Learning", rate: "94.1%", status: "Optimal", count: 480 },
    { dept: "Electronics & Communication", rate: "86.5%", status: "Good", count: 720 },
    { dept: "Mechanical Engineering", rate: "78.2%", status: "Needs Attention", count: 360 },
    { dept: "Civil Engineering", rate: "81.0%", status: "Good", count: 320 },
    { dept: "School of Management (MBA)", rate: "89.3%", status: "Optimal", count: 240 },
  ];

  const filteredPrograms = programs.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.degree.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          <CheckCircle size={16} />
          <span>Attendance Analytics</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "programs" ? "active" : ""}`}
          onClick={() => setActiveTab("programs")}
        >
          <Award size={16} />
          <span>Academic Programs ({programs.length})</span>
        </button>
      </div>

      {activeTab === "attendance" ? (
        <div className="attendance-layout">
          <div className="attendance-summary-card">
            <div className="att-kpi">
              <span className="att-kpi-label">Institution-wide Average Attendance</span>
              <strong className="att-kpi-val">87.6%</strong>
              <span className="att-kpi-sub">Across 3,480 enrolled students</span>
            </div>
            <div className="att-threshold-box">
              <AlertTriangle size={18} className="text-warning" />
              <div>
                <strong>Mandatory 75% Cutoff Policy</strong>
                <p>Students with attendance below 75% are automatically flagged for academic advisory counseling.</p>
              </div>
            </div>
          </div>

          <div className="table-card">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Academic Department</th>
                  <th>Student Strength</th>
                  <th>Average Attendance</th>
                  <th>Health Status</th>
                </tr>
              </thead>
              <tbody>
                {deptAttendance.map((d, i) => (
                  <tr key={i}>
                    <td><strong>{d.dept}</strong></td>
                    <td>{d.count} Students</td>
                    <td><strong>{d.rate}</strong></td>
                    <td>
                      <span className={`status-pill ${d.status === "Optimal" ? "honors" : d.status === "Good" ? "good-standing" : "low-attendance"}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="program-grid">
          {filteredPrograms.map((p, idx) => (
            <div key={idx} className="program-card">
              <div className="program-top">
                <span className="program-degree-tag">{p.degree}</span>
                <span className="program-status">{p.status}</span>
              </div>
              <h3 className="program-name">{p.name}</h3>
              <p className="program-accreditation">Accreditation: <strong>{p.accreditation}</strong></p>
              <div className="program-meta">
                <span>{p.duration}</span>
                <span>•</span>
                <span>{p.seats} Approved Intake</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
