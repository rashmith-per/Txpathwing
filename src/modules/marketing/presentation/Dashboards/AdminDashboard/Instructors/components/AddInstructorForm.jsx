import React, { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export function AddInstructorForm({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Lead Instructor");
  const [organization, setOrganization] = useState("Tech Academy");
  const [domain, setDomain] = useState("Software Development");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Hyderabad, Telangana");
  const [bio, setBio] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: `inst-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@pathwing.in`,
      role,
      organization: organization.trim() || "Tech Academy",
      domain,
      specialization: specialization.trim() || domain,
      rating: 4.8,
      studentsCount: 0,
      coursesCount: 1,
      status: "Active",
      joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      phone: phone.trim() || "+91 98000 12345",
      city: city.trim() || "Hyderabad, Telangana",
      bio: bio.trim() || "Faculty instructor teaching specialized technical curricula on the platform.",
      qualifications: ["Industry Verified Faculty", "Pedagogical Specialist"]
    });
  }

  return (
    <form className="card onboard-form inline-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <div>
          <h2>Register New Instructor</h2>
          <p>Onboard a certified teaching instructor, faculty mentor, or enterprise coach.</p>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close form">
          <X size={18} />
        </button>
      </div>

      <div className="form-grid">
        <label>
          Instructor Full Name *
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Dr. A. Sharma"
          />
        </label>
        <label>
          Email Address *
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="faculty@academy.edu.in"
          />
        </label>
        <label>
          Faculty Role / Title
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option>Lead Instructor</option>
            <option>Senior Faculty</option>
            <option>Professor & HOD</option>
            <option>Cloud Architect</option>
            <option>Data Scientist</option>
            <option>Security Lead</option>
            <option>Design Lead</option>
          </select>
        </label>
        <label>
          Organization / Academy *
          <input
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            required
            placeholder="e.g. Tech Academy or KITS Warangal"
          />
        </label>
        <label>
          Subject Domain
          <select value={domain} onChange={e => setDomain(e.target.value)}>
            <option>Software Development</option>
            <option>Web Development</option>
            <option>Cloud & DevOps</option>
            <option>Cybersecurity</option>
            <option>Data Science & AI</option>
            <option>UI/UX Design</option>
          </select>
        </label>
        <label>
          Specialization & Topics
          <input
            value={specialization}
            onChange={e => setSpecialization(e.target.value)}
            placeholder="e.g. Enterprise Java, Spring Boot 3 & Kafka"
          />
        </label>
        <label>
          Phone Contact
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+91 98450 12345"
          />
        </label>
        <label>
          City & Campus
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="e.g. Hyderabad, Telangana"
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary" type="submit">
          <CheckCircle2 size={16} /> Complete Instructor Registration
        </button>
        <button type="button" className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
