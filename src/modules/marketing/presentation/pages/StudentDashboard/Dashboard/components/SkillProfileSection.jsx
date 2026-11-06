import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Sparkles, Award, Layers } from "lucide-react";
import { studentApi } from "../services/studentApi";

export default function SkillProfileSection() {
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState("All");

  const loadSkills = useCallback(async () => {
    try {
      const data = await studentApi.getSkillProfile();
      setSkills(data);
    } catch (err) {
      console.warn("Failed to load skill profile:", err);
    }
  }, []);

  useEffect(() => {
    loadSkills();

    const handleUpdate = () => loadSkills();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("topicProgressChanged", handleUpdate);
    window.addEventListener("enrollmentChanged", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("topicProgressChanged", handleUpdate);
      window.removeEventListener("enrollmentChanged", handleUpdate);
    };
  }, [loadSkills]);

  const filteredSkills = useMemo(() => {
    if (filter === "All") return skills;
    if (filter === "In Progress") {
      return skills.filter(
        (s) => s.status === "Learning" || s.status === "Developing" || s.status === "Proficient"
      );
    }
    if (filter === "Completed") {
      return skills.filter((s) => s.status === "Completed");
    }
    if (filter === "Not Started") {
      return skills.filter((s) => s.status === "Not Started");
    }
    return skills;
  }, [skills, filter]);

  return (
    <section className="dash-card-section skill-profile-section">
      <div className="section-head-row">
        <div className="section-title-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <h3 style={{ margin: 0 }}>Skill Profile</h3>
            <span
              style={{
                fontSize: "0.72rem",
                background: "#eff6ff",
                color: "#2563eb",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "999px",
              }}
            >
              {skills.length} Skills
            </span>
          </div>
          <p>Dynamically derived from syllabus topic completions</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "14px",
          flexWrap: "wrap",
        }}
      >
        {["All", "In Progress", "Completed", "Not Started"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            style={{
              background: filter === tab ? "#0f172a" : "#f1f5f9",
              color: filter === tab ? "#ffffff" : "#475569",
              border: "none",
              borderRadius: "6px",
              padding: "4px 9px",
              fontSize: "0.72rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="skill-list-wrap">
        {filteredSkills.length === 0 ? (
          <div
            style={{
              padding: "20px 0",
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "0.85rem",
            }}
          >
            {skills.length === 0
              ? "Enroll in courses to unlock skills in your profile."
              : `No skills in "${filter}" category.`}
          </div>
        ) : (
          filteredSkills.map((skill) => {
            const badge = skill.badgeStyle;

            return (
              <div
                key={skill.name}
                className="skill-card-item"
                style={{
                  background: "#ffffff",
                  border: "1px solid #f1f5f9",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  marginBottom: "10px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                {/* Top Row: Skill Name & Status Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {skill.name}
                  </span>

                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: badge?.bg || "#f8fafc",
                      color: badge?.text || "#64748b",
                      border: `1px solid ${badge?.border || "#e2e8f0"}`,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {skill.status}
                  </span>
                </div>

                {/* Course Association */}
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  title={`Taught in: ${skill.associatedCourses}`}
                >
                  <span style={{ fontWeight: 500 }}>Course:</span>
                  <span
                    style={{
                      color: "#334155",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {skill.associatedCourses}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: "6px",
                    width: "100%",
                    background: "#f1f5f9",
                    borderRadius: "999px",
                    overflow: "hidden",
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      width: `${skill.progressPercent}%`,
                      height: "100%",
                      background: skill.color || "#2563eb",
                      borderRadius: "999px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>

                {/* Bottom details */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.72rem",
                    color: "#64748b",
                  }}
                >
                  <span>
                    {skill.completedTopics} of {skill.totalTopics} topics ({skill.remainingTopics} remaining)
                  </span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>
                    {skill.progressPercent}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
