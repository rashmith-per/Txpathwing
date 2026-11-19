import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building, MapPin, DollarSign, ExternalLink, CheckCircle2, Award } from "lucide-react";

const MATCHED_JOBS = [
  {
    id: 1,
    title: "Junior Full Stack Engineer",
    company: "Darwinbox",
    location: "Hyderabad, India (Hybrid)",
    salary: "₹8 - ₹12 LPA",
    tags: ["React", "Node.js", "PostgreSQL"],
    type: "Full-Time",
    matchScore: "95% Match"
  },
  {
    id: 2,
    title: "Cloud & DevOps Associate",
    company: "Oracle",
    location: "Bengaluru, India",
    salary: "₹10 - ₹14 LPA",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    type: "Full-Time",
    matchScore: "92% Match"
  },
  {
    id: 3,
    title: "Python Software Developer Intern",
    company: "Tech Mahindra",
    location: "Remote / Pune",
    salary: "₹35,000 / month Stipend",
    tags: ["Python", "FastAPI", "REST APIs"],
    type: "Internship -> PPO",
    matchScore: "88% Match"
  },
  {
    id: 4,
    title: "Frontend Developer (UI/UX Systems)",
    company: "ValueLabs",
    location: "Hyderabad, India",
    salary: "₹7.5 - ₹10 LPA",
    tags: ["React", "TypeScript", "TailwindCSS"],
    type: "Full-Time",
    matchScore: "85% Match"
  }
];

export default function CareersTab() {
  const [appliedJobs, setAppliedJobs] = useState({});

  const handleApply = (id) => {
    setAppliedJobs((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="careers-container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="careers-header" style={{ marginBottom: 0 }}>
        <Briefcase size={24} color="#2563eb" />
        <div>
          <h2 className="careers-title">Career &amp; Placement Tracks</h2>
          <p className="careers-desc" style={{ margin: 0 }}>
            Connect directly with 50+ hiring partners, track applications, and practice mock technical rounds.
          </p>
        </div>
      </div>

      {/* Placement Readiness Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: "#ffffff",
          borderRadius: "14px",
          padding: "24px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <Award size={18} color="#f59e0b" />
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#f59e0b", letterSpacing: "1px" }}>
              PLACEMENT READINESS SCORE: 92/100
            </span>
          </div>
          <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: "800" }}>
            You're Eligible for Direct Campus Drives!
          </h3>
          <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
            Completed proctored assessments and coursework qualify you for exclusive fast-track hiring pipelines.
          </p>
        </div>

        <Link
          to="/careers"
          style={{
            background: "#2563eb",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "13px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          View All Positions <ExternalLink size={14} />
        </Link>
      </div>

      {/* Matched Job Opportunities */}
      <div>
        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>
          Recommended Roles for Your Profile
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {MATCHED_JOBS.map((job) => {
            const hasApplied = Boolean(appliedJobs[job.id]);
            return (
              <div
                key={job.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "14px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div>
                      <h4 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>
                        {job.title}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#475569", fontWeight: "600" }}>
                        <Building size={14} color="#64748b" /> {job.company}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#16a34a",
                        background: "#dcfce7",
                        padding: "3px 8px",
                        borderRadius: "10px"
                      }}
                    >
                      {job.matchScore}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <DollarSign size={12} /> {job.salary}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          background: "#f1f5f9",
                          color: "#334155",
                          padding: "2px 8px",
                          borderRadius: "6px"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleApply(job.id)}
                  disabled={hasApplied}
                  style={{
                    width: "100%",
                    padding: "9px 0",
                    background: hasApplied ? "#16a34a" : "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "13px",
                    cursor: hasApplied ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle2 size={15} /> Application Submitted
                    </>
                  ) : (
                    "Apply with Pathwing Profile"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
