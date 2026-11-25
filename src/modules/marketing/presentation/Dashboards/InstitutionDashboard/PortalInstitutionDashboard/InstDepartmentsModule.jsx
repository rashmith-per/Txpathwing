import React, { useState } from "react";
import { Plus, Search, Layers, Users, GraduationCap, Building } from "lucide-react";

export default function InstDepartmentsModule({ search = "" }) {
  const [departments, setDepartments] = useState([
    { id: "dept-1", code: "CSE", name: "Computer Science & Engineering", hod: "Dr. K. Srinivas", faculty: 36, students: 960, labs: 8, status: "Active" },
    { id: "dept-2", code: "AIML", name: "Artificial Intelligence & Data Science", hod: "Dr. P. Varma", faculty: 22, students: 480, labs: 5, status: "Active" },
    { id: "dept-3", code: "ECE", name: "Electronics & Communication", hod: "Dr. R. Ramana", faculty: 28, students: 720, labs: 6, status: "Active" },
    { id: "dept-4", code: "MECH", name: "Mechanical Engineering", hod: "Dr. S. K. Gupta", faculty: 18, students: 360, labs: 7, status: "Active" },
    { id: "dept-5", code: "CIVIL", name: "Civil & Environmental Engineering", hod: "Dr. M. Chary", faculty: 16, students: 320, labs: 5, status: "Active" },
    { id: "dept-6", code: "MBA", name: "School of Management Studies", hod: "Dr. Ananya Sen", faculty: 14, students: 240, labs: 2, status: "Active" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDept, setNewDept] = useState({ code: "", name: "", hod: "", faculty: "", students: "", labs: "" });

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase()) ||
    d.hod.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code) return;
    setDepartments((prev) => [
      ...prev,
      {
        id: `dept-${Date.now()}`,
        code: newDept.code.toUpperCase(),
        name: newDept.name,
        hod: newDept.hod || "Faculty Lead",
        faculty: Number(newDept.faculty) || 12,
        students: Number(newDept.students) || 120,
        labs: Number(newDept.labs) || 3,
        status: "Active",
      },
    ]);
    setNewDept({ code: "", name: "", hod: "", faculty: "", students: "", labs: "" });
    setShowAddModal(false);
  };

  return (
    <div className="portal-module-container">
      <div className="module-header-row">
        <div>
          <h2>Academic Departments</h2>
          <p>Organize faculties, curricula, laboratory facilities, and student distribution.</p>
        </div>
        <button type="button" className="inst-primary-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          <span>Add Department</span>
        </button>
      </div>

      <div className="dept-grid">
        {filtered.map((dept) => (
          <div key={dept.id} className="dept-card">
            <div className="dept-card-top">
              <span className="dept-code-pill">{dept.code}</span>
              <span className="dept-status-badge">{dept.status}</span>
            </div>
            <h3 className="dept-name">{dept.name}</h3>
            <p className="dept-hod">Head of Department: <strong>{dept.hod}</strong></p>

            <div className="dept-metrics-row">
              <div className="dept-metric">
                <Users size={14} />
                <span>{dept.faculty} Faculty</span>
              </div>
              <div className="dept-metric">
                <GraduationCap size={14} />
                <span>{dept.students} Students</span>
              </div>
              <div className="dept-metric">
                <Building size={14} />
                <span>{dept.labs} Labs</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Department</h3>
            <form onSubmit={handleAdd} className="modal-form">
              <label>Department Code (e.g. IT, EEE)</label>
              <input
                type="text"
                required
                value={newDept.code}
                onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
              />
              <label>Department Name</label>
              <input
                type="text"
                required
                value={newDept.name}
                onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
              />
              <label>HOD / Department Chair</label>
              <input
                type="text"
                value={newDept.hod}
                onChange={(e) => setNewDept({ ...newDept, hod: e.target.value })}
              />
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-save-btn">
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
