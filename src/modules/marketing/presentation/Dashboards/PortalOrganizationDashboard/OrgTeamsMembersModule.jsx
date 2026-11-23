import React, { useState } from "react";
import { Users2, UserCheck, Search, Plus, Shield } from "lucide-react";

export default function OrgTeamsMembersModule({ mode = "teams", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const teams = [
    { name: "AI Core Research Team", lead: "Dr. Vikram Patel", members: 28, domain: "Agentic AI & ML", projects: 4, status: "Active" },
    { name: "Full Stack Platform Group", lead: "Kavita Rao", members: 42, domain: "Web & Microservices", projects: 6, status: "Active" },
    { name: "Cloud Infrastructure & SRE", lead: "Arjun Nair", members: 24, domain: "DevOps & Kubernetes", projects: 3, status: "Active" },
    { name: "Community Outreach & Events", lead: "Sneha Sen", members: 16, domain: "Workshops & Summits", projects: 5, status: "Active" },
    { name: "Product Design & Experience", lead: "Rohan Roy", members: 18, domain: "UX Architecture", projects: 2, status: "Active" },
  ];

  const members = [
    { id: "MEM-01", name: "Vikram Patel", email: "vpatel@org.org", team: "AI Core Research", role: "Team Lead", skills: "PyTorch, Agentic AI, Python", status: "Active" },
    { id: "MEM-02", name: "Kavita Rao", email: "krao@org.org", team: "Full Stack Platform", role: "Principal Architect", skills: "React, Node.js, GraphQL", status: "Active" },
    { id: "MEM-03", name: "Arjun Nair", email: "anair@org.org", team: "Cloud Infrastructure", role: "Staff DevOps Lead", skills: "AWS, Terraform, Docker", status: "Active" },
    { id: "MEM-04", name: "Meera Krishnan", email: "mkrish@org.org", team: "AI Core Research", role: "Research Associate", skills: "Transformers, NLP", status: "Active" },
    { id: "MEM-05", name: "Suresh Pillai", email: "spillai@org.org", team: "Full Stack Platform", role: "Senior Developer", skills: "Java, Spring, PostgreSQL", status: "Active" },
  ];

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.lead.toLowerCase().includes(search.toLowerCase()) ||
    t.domain.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.team.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "teams" ? "active" : ""}`}
          onClick={() => setActiveTab("teams")}
        >
          <Users2 size={16} />
          <span>Active Teams ({teams.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "members" ? "active" : ""}`}
          onClick={() => setActiveTab("members")}
        >
          <UserCheck size={16} />
          <span>Organization Members ({members.length})</span>
        </button>
      </div>

      {activeTab === "teams" ? (
        <div className="team-grid">
          {filteredTeams.map((team, idx) => (
            <div key={idx} className="team-card">
              <div className="team-card-top">
                <span className="team-status-tag">{team.status}</span>
                <span className="team-domain-tag">{team.domain}</span>
              </div>
              <h3 className="team-name">{team.name}</h3>
              <p className="team-lead">Team Lead: <strong>{team.lead}</strong></p>
              <div className="team-meta-row">
                <span><strong>{team.members}</strong> Members</span>
                <span>•</span>
                <span><strong>{team.projects}</strong> Active Projects</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Full Name</th>
                <th>Official Email</th>
                <th>Assigned Team</th>
                <th>Role Designation</th>
                <th>Core Skills</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr key={m.id}>
                  <td><strong>{m.id}</strong></td>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.email}</td>
                  <td><span className="badge-pill">{m.team}</span></td>
                  <td>{m.role}</td>
                  <td>{m.skills}</td>
                  <td>
                    <span className="status-pill honors">{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
