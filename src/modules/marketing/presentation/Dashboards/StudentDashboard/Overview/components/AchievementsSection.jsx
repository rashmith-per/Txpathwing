import React from "react";

export default function AchievementsSection() {
  const badges = [
    { icon: "🔥", title: "5-Day Streak", pts: "500 XP" },
    { icon: "⚡", title: "Fast Starter", pts: "250 XP" },
    { icon: "💻", title: "Code Lab Pro", pts: "400 XP" },
    { icon: "🚀", title: "Full Stack", pts: "750 XP" },
  ];

  return (
    <section className="dash-card-section">
      <div className="section-head-row">
        <div className="section-title-wrap">
          <h3>Achievements & Badges</h3>
          <p>Unlocked milestones</p>
        </div>
      </div>

      <div className="badges-grid-wrap badges-grid-3">
        {badges.map((b, i) => (
          <div key={i} className="achievement-badge-card">
            <div className="badge-icon-bubble">{b.icon}</div>
            <div className="badge-title">{b.title}</div>
            <div className="badge-pts">{b.pts}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
