import React from "react";
import { Code2, GraduationCap, TrendingUp, HeartHandshake, Palette, Briefcase, ArrowRight } from "lucide-react";
import { departmentCards } from "../Careers/Career";
import "./CareerTeams.css";

const iconMap = {
  Code2: Code2,
  GraduationCap: GraduationCap,
  TrendingUp: TrendingUp,
  HeartHandshake: HeartHandshake,
  Palette: Palette,
  Briefcase: Briefcase
};

const CareerTeams = ({ onSelectDepartment }) => {
  const handleViewRoles = (deptName) => {
    if (onSelectDepartment) {
      onSelectDepartment(deptName);
    }
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="career-teams-section" aria-labelledby="teams-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">TEAMS & DEPARTMENTS</span>
          <h2 id="teams-heading" className="section-title">
            Find Your Team
          </h2>
          <p className="section-subtitle">
            Different skills. One mission.
          </p>
        </div>

        <div className="teams-grid">
          {departmentCards.map((team) => {
            const Icon = iconMap[team.icon] || Briefcase;
            return (
              <article key={team.id} className="team-card">
                <div className="team-card-header">
                  <div className="team-icon-wrapper">
                    <Icon size={22} className="team-icon" />
                  </div>
                  <h3 className="team-name">{team.department}</h3>
                </div>

                <p className="team-desc">{team.description}</p>

                <div className="team-roles-box">
                  <span className="team-roles-label">Sample Roles:</span>
                  <ul className="team-roles-list">
                    {team.roles.map((role, i) => (
                      <li key={i} className="team-role-item">
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="team-view-btn"
                  onClick={() => handleViewRoles(team.department)}
                  aria-label={`View roles in ${team.department}`}
                >
                  <span>View Roles</span>
                  <ArrowRight size={15} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerTeams;
