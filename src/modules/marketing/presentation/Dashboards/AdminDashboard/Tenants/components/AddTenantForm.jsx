import React, { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export function AddTenantForm({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Institution");
  const [seats, setSeats] = useState("1000");
  const [plan, setPlan] = useState("Enterprise LMS");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const domainSlug = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    onAdd({
      id: `tnt-${Date.now()}`,
      name: name.trim(),
      type,
      domain: `${domainSlug}.pathwing.in`,
      seats: Math.max(1, Number(seats) || 500),
      used: 0,
      contract: "Nov 26 – Oct 27",
      status: "Onboarding",
      plan,
      contactName: contactName.trim() || undefined,
      contactEmail: contactEmail.trim() || undefined,
      phone: undefined,
      city: city.trim() || undefined,
      onboardingProgress: 40,
      documentsSubmitted: ["Tenant Intake Application", "Registration Copy"],
      coursesOffered: 0,
      activeBatches: 0,
      createdAt: new Date().toISOString().split("T")[0]
    });
  }

  return (
    <form className="card onboard-form inline-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <div>
          <h2>Add Organization</h2>
          <p>Create a dedicated organization workspace, LMS subdomain, and contracted seats.</p>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close form">
          <X size={18} />
        </button>
      </div>

      <div className="form-grid">
        <label>
          Organization Name *
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Osmania University or Wipro Tech"
          />
        </label>
        <label>
          Organization Type *
          <select value={type} onChange={e => setType(e.target.value)}>
            <option>Institution</option>
            <option>Corporate</option>
            <option>Training provider</option>
          </select>
        </label>
        <label>
          Plan Tier
          <select value={plan} onChange={e => setPlan(e.target.value)}>
            <option>Enterprise LMS</option>
            <option>Professional</option>
            <option>Basic</option>
          </select>
        </label>
        <label>
          Contracted Seats *
          <input
            type="number"
            min="10"
            step="10"
            value={seats}
            onChange={e => setSeats(e.target.value)}
            required
          />
        </label>
        <label>
          Contact Person
          <input
            value={contactName}
            onChange={e => setContactName(e.target.value)}
            placeholder="e.g. Dr. K. Sharma"
          />
        </label>
        <label>
          Contact Email
          <input
            type="email"
            value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
            placeholder="admin@institution.edu.in"
          />
        </label>
        <label>
          City & State
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="e.g. Hyderabad, Telangana"
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary" type="submit">
          <CheckCircle2 size={16} /> Add Organization
        </button>
        <button type="button" className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
