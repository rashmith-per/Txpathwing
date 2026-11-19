import React, { useState } from "react";
import { UserPlus, X } from "lucide-react";

export function AddUserForm({ tenants = [], onAdd, onClose }) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Student");
  const [newTenant, setNewTenant] = useState(tenants[0]?.name || "KITS Warangal");
  const [newPhone, setNewPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    onAdd({
      id: `usr-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      tenant: newTenant,
      status: "Active",
      joinedDate: "Today",
      lastActive: "Just now",
      coursesEnrolled: newRole === "Student" ? 1 : 0,
      coursesCompleted: 0,
      coursesMentored: newRole === "Mentor" ? 1 : 0,
      phone: newPhone.trim() || undefined,
      city: "Hyderabad"
    });
  }

  return (
    <form className="card onboard-form inline-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <div>
          <h2>Create New User Account</h2>
          <p>Assign tenant membership, authorization role, and login identity.</p>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="form-grid">
        <label>
          Full Name *
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
            placeholder="e.g. Harini Krishnan"
          />
        </label>
        <label>
          Email Address *
          <input
            type="email"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            required
            placeholder="user@domain.com"
          />
        </label>
        <label>
          Role *
          <select value={newRole} onChange={e => setNewRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
            <option value="Org Admin">Organization Admin</option>
            <option value="Super Admin">Platform Super Admin</option>
          </select>
        </label>
        <label>
          Tenant / Organization *
          <select value={newTenant} onChange={e => setNewTenant(e.target.value)}>
            {tenants.map(t => (
              <option key={t.id || t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Contact Phone
          <input
            value={newPhone}
            onChange={e => setNewPhone(e.target.value)}
            placeholder="+91 98765 00000"
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary" type="submit">
          <UserPlus size={16} /> Save User Account
        </button>
        <button type="button" className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
