import React, { useState } from "react";
import { UserPlus, Briefcase, Clock, CheckCircle } from "lucide-react";

export default function CompanyRecruitmentJobsModule({ mode = "recruitment", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const candidates = [
    { name: "Rahul Verma", role: "Staff AI Engineer", dept: "AI & Innovation", stage: "Final Review", score: "96%", date: "Nov 21, 2026" },
    { name: "Priya Sundaram", role: "Full Stack SDE II", dept: "Engineering", stage: "Technical Round", score: "92%", date: "Nov 22, 2026" },
    { name: "Kiran Joshi", role: "Cloud Security Specialist", dept: "Engineering", stage: "Screening", score: "88%", date: "Nov 23, 2026" },
    { name: "Divya Kapoor", role: "Product Designer", dept: "Product", stage: "Offer Released", score: "98%", date: "Nov 20, 2026" },
  ];

  const jobs = [
    { id: "JOB-101", title: "Principal Distributed Systems Engineer", dept: "Engineering", type: "Full-Time · Hybrid", exp: "8 - 12 Yrs", applicants: 48, status: "Open" },
    { id: "JOB-102", title: "Senior Machine Learning Scientist (LLMs)", dept: "AI Labs", type: "Full-Time · Remote", exp: "5 - 8 Yrs", applicants: 64, status: "Open" },
    { id: "JOB-103", title: "Technical Product Manager", dept: "Product & Strategy", type: "Full-Time · Onsite", exp: "6 - 10 Yrs", applicants: 36, status: "Open" },
    { id: "JOB-104", title: "DevOps & Platform Reliability Engineer", dept: "Cloud Infra", type: "Full-Time · Hybrid", exp: "4 - 7 Yrs", applicants: 28, status: "In Review" },
  ];

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase()) ||
    c.stage.toLowerCase().includes(search.toLowerCase())
  );

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "recruitment" ? "active" : ""}`}
          onClick={() => setActiveTab("recruitment")}
        >
          <UserPlus size={16} />
          <span>Recruitment Pipeline ({candidates.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "jobs" ? "active" : ""}`}
          onClick={() => setActiveTab("jobs")}
        >
          <Briefcase size={16} />
          <span>Active Job Postings ({jobs.length})</span>
        </button>
      </div>

      {activeTab === "recruitment" ? (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Applied Role</th>
                <th>Department</th>
                <th>Pipeline Stage</th>
                <th>Evaluation</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c, i) => (
                <tr key={i}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.role}</td>
                  <td><span className="badge-pill">{c.dept}</span></td>
                  <td>
                    <span className={`status-pill ${c.stage === "Offer Released" ? "honors" : "good-standing"}`}>
                      {c.stage}
                    </span>
                  </td>
                  <td><strong>{c.score}</strong></td>
                  <td>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((j) => (
            <div key={j.id} className="job-card">
              <div className="job-top">
                <span className="job-type-badge">{j.type}</span>
                <span className="job-status-badge">{j.status}</span>
              </div>
              <h3 className="job-title">{j.title}</h3>
              <p className="job-dept">{j.dept} • Experience: <strong>{j.exp}</strong></p>
              <div className="job-meta-row">
                <span><strong>{j.applicants}</strong> Applicants</span>
                <button type="button" className="job-manage-btn">Manage Candidates</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
