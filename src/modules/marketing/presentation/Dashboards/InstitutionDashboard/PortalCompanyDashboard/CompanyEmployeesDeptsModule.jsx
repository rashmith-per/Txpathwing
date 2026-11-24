import React, { useState } from "react";
import { Users, Layers, Search, Briefcase, Award } from "lucide-react";

export default function CompanyEmployeesDeptsModule({ mode = "employees", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const employees = [
    { id: "EMP-1001", name: "Rohan Deshmukh", dept: "Engineering", role: "Lead Distributed Systems Architect", tenure: "4 Yrs", band: "Top Tier", status: "Active" },
    { id: "EMP-1002", name: "Ananya Roy", dept: "Product & Design", role: "Staff Product Manager", tenure: "3 Yrs", band: "Exceeds Expectations", status: "Active" },
    { id: "EMP-1003", name: "Karthik Verma", dept: "AI & Innovation Labs", role: "Senior ML Engineer", tenure: "2 Yrs", band: "High Potential", status: "Active" },
    { id: "EMP-1004", name: "Pooja Reddy", dept: "Human Resources", role: "Talent Acquisition Lead", tenure: "5 Yrs", band: "Exceeds Expectations", status: "Active" },
    { id: "EMP-1005", name: "Aditya Nair", dept: "Customer Success & Ops", role: "Enterprise Solution Architect", tenure: "3 Yrs", band: "Meets Expectations", status: "Active" },
  ];

  const departments = [
    { name: "Software Engineering & Tech", lead: "Sandeep Nair", count: 640, openRoles: 12, budget: "₹18.5 Cr" },
    { name: "Artificial Intelligence & R&D", lead: "Dr. Vikram Patel", count: 220, openRoles: 6, budget: "₹12.0 Cr" },
    { name: "Product Strategy & UX", lead: "Ananya Roy", count: 180, openRoles: 3, budget: "₹7.5 Cr" },
    { name: "Enterprise Sales & Growth", lead: "Rakesh Menon", count: 240, openRoles: 4, budget: "₹9.0 Cr" },
    { name: "People Operations & HR", lead: "Pooja Reddy", count: 80, openRoles: 2, budget: "₹4.0 Cr" },
    { name: "Global Finance & Legal", lead: "Srinivas Rao", count: 60, openRoles: 1, budget: "₹3.5 Cr" },
  ];

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.lead.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          <Users size={16} />
          <span>Employee Directory ({employees.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "departments" ? "active" : ""}`}
          onClick={() => setActiveTab("departments")}
        >
          <Layers size={16} />
          <span>Departments ({departments.length})</span>
        </button>
      </div>

      {activeTab === "employees" ? (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Role Designation</th>
                <th>Tenure</th>
                <th>Performance Band</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e) => (
                <tr key={e.id}>
                  <td><strong>{e.id}</strong></td>
                  <td><strong>{e.name}</strong></td>
                  <td><span className="badge-pill">{e.dept}</span></td>
                  <td>{e.role}</td>
                  <td>{e.tenure}</td>
                  <td>
                    <span className="status-pill honors">{e.band}</span>
                  </td>
                  <td><span className="badge-pill">{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Corporate Department</th>
                <th>Department Head</th>
                <th>Headcount</th>
                <th>Open Roles</th>
                <th>Annual Budget</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((d, i) => (
                <tr key={i}>
                  <td><strong>{d.name}</strong></td>
                  <td>{d.lead}</td>
                  <td><strong>{d.count} Employees</strong></td>
                  <td><span className="badge-pill">{d.openRoles} Positions</span></td>
                  <td><strong>{d.budget}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
