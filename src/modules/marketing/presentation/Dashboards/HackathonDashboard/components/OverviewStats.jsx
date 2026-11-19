import React from "react";
import { Users, UserCheck, UserX, Clock3, Trophy, Medal, Award } from "lucide-react";

export function OverviewStats({
  total,
  present,
  absent,
  pending,
  round1Qualified,
  round2Qualified,
  round3Finalists
}) {
  return (
    <>
      <div className="overview-stat-grid">
        {[
          { icon: Users, color: "blue", label: "Total Teams", val: total, sub: "Registered teams" },
          { icon: UserCheck, color: "green", label: "Present", val: present, sub: "Teams attended" },
          { icon: UserX, color: "red", label: "Absent", val: absent, sub: "Teams not present" },
          { icon: Clock3, color: "orange", label: "Pending", val: pending, sub: "Attendance pending" }
        ].map((item, i) => (
          <div key={i} className="overview-stat-card">
            <div className={`overview-stat-icon ${item.color}`}>
              <item.icon size={23} />
            </div>
            <div className="overview-stat-content">
              <span>{item.label}</span>
              <strong>{item.val}</strong>
              <small>{item.sub}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-section-title">
        <div>
          <h2>Evaluation Progress</h2>
          <p>Current qualification status by round</p>
        </div>
      </div>

      <div className="overview-round-grid">
        {[
          { icon: Trophy, color: "violet", label: "Round 1", val: round1Qualified, sub: "Qualified for R2" },
          { icon: Medal, color: "amber", label: "Round 2", val: round2Qualified, sub: "Qualified for R3" },
          { icon: Award, color: "emerald", label: "Round 3", val: round3Finalists, sub: "Finalists" }
        ].map((item, i) => (
          <div key={i} className="overview-round-card">
            <div className={`round-icon ${item.color}`}>
              <item.icon size={22} />
            </div>
            <div>
              <span>{item.label}</span>
              <strong>{item.val}</strong>
              <small>{item.sub}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
