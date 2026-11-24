import React, { useState } from "react";
import { Layers, BookOpen, Clock, Users, Award } from "lucide-react";

export default function OrgDepartmentsTrainingModule({ mode = "departments", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const departments = [
    { name: "Engineering & Applied Technology", head: "Sunil Verma", count: 280, budget: "₹1.4 Cr", initiatives: 8 },
    { name: "AI Research & Emerging Tools", head: "Dr. Ananya Sen", count: 140, budget: "₹95 L", initiatives: 5 },
    { name: "Product Design & Innovation", head: "Karan Johar", count: 120, budget: "₹60 L", initiatives: 4 },
    { name: "Global Operations & Governance", head: "Priya Varma", count: 160, budget: "₹75 L", initiatives: 6 },
    { name: "Community Partnerships & L&D", head: "Rajesh Sharma", count: 140, budget: "₹50 L", initiatives: 7 },
  ];

  const trainingPrograms = [
    { id: "TRN-01", title: "Enterprise Full Stack Engineering Bootcamp", format: "12-Week Intensive", enrolled: 120, completion: "94%", certs: 112 },
    { id: "TRN-02", title: "Production Agentic AI & LLM Systems", format: "8-Week Sprint", enrolled: 85, completion: "88%", certs: 74 },
    { id: "TRN-03", title: "Cloud Native Microservices & Kubernetes", format: "6-Week Masterclass", enrolled: 95, completion: "91%", certs: 86 },
    { id: "TRN-04", title: "Cybersecurity & Zero Trust Architecture", format: "4-Week Workshop", enrolled: 60, completion: "96%", certs: 58 },
  ];

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.head.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPrograms = trainingPrograms.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.format.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "departments" ? "active" : ""}`}
          onClick={() => setActiveTab("departments")}
        >
          <Layers size={16} />
          <span>Organization Departments ({departments.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "training" ? "active" : ""}`}
          onClick={() => setActiveTab("training")}
        >
          <BookOpen size={16} />
          <span>Training Programs & Bootcamps ({trainingPrograms.length})</span>
        </button>
      </div>

      {activeTab === "departments" ? (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Department Division</th>
                <th>Division Head</th>
                <th>Team Members</th>
                <th>Annual Budget</th>
                <th>Active Initiatives</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((d, i) => (
                <tr key={i}>
                  <td><strong>{d.name}</strong></td>
                  <td>{d.head}</td>
                  <td><strong>{d.count} Members</strong></td>
                  <td>{d.budget}</td>
                  <td><span className="badge-pill">{d.initiatives} Initiatives</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="program-grid">
          {filteredPrograms.map((p) => (
            <div key={p.id} className="program-card">
              <div className="program-top">
                <span className="program-degree-tag">{p.format}</span>
                <span className="program-status">Active</span>
              </div>
              <h3 className="program-name">{p.title}</h3>
              <div className="program-meta">
                <span>{p.enrolled} Enrolled</span>
                <span>•</span>
                <span>{p.completion} Completion</span>
                <span>•</span>
                <span>{p.certs} Certified</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
