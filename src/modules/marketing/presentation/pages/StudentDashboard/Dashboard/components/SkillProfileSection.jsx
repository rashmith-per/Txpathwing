import React from "react";

export default function SkillProfileSection() {
  const skills = [
    { name: "Full Stack & React", pct: 92, color: "#2563eb" },
    { name: "JavaScript & TypeScript", pct: 88, color: "#3b82f6" },
    { name: "Python & Backend APIs", pct: 82, color: "#8b5cf6" },
    { name: "Cloud & AWS DevOps", pct: 75, color: "#f59e0b" },
    { name: "System Architecture", pct: 70, color: "#10b981" },
  ];

  return (
    <section className="dash-card-section">
      <div className="section-head-row">
        <div className="section-title-wrap">
          <h3>Skill Profile</h3>
          <p>Derived from course labs & milestones</p>
        </div>
      </div>

      <div className="skill-list-wrap">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-bar-row">
            <div className="skill-label-split">
              <span>{skill.name}</span>
              <span className="skill-pct">{skill.pct}%</span>
            </div>
            <div className="skill-track">
              <div
                className="skill-fill-colored"
                style={{ width: `${skill.pct}%`, background: skill.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
