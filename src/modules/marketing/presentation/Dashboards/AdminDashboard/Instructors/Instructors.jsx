import React, { useMemo, useState } from "react";
import "./Instructors.css";
import {
  GraduationCap, CheckCircle2, Eye, Plus, Search,
  SearchX, Star, Users, BookOpen, ArrowRight, X, Mail, Phone,
  MapPin, Building2, Trash2, LayoutGrid, List, ChevronDown, Sparkles
} from "lucide-react";
import { Badge, getStatusTone } from "../common/Badge";
import { Metric } from "../common/Metric";
import { DetailField, InlineDetailView } from "../common/DetailSection";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #4f46e5, #7c3aed)",
  "linear-gradient(135deg, #0ea5e9, #2563eb)",
  "linear-gradient(135deg, #059669, #10b981)",
  "linear-gradient(135deg, #d97706, #f59e0b)",
  "linear-gradient(135deg, #db2777, #ec4899)",
  "linear-gradient(135deg, #7c3aed, #c026d3)"
];

function getInitials(name) {
  if (!name) return "IN";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Instructors({
  instructors,
  setInstructors,
  setNotice,
  setPage
}) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" (Design Box) | "list" (Table)
  const [showAddForm, setShowAddForm] = useState(false);

  // New Instructor Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Lead Instructor");
  const [organization, setOrganization] = useState("Tech Academy");
  const [domain, setDomain] = useState("Software Development");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Hyderabad, Telangana");
  const [bio, setBio] = useState("");

  const filtered = useMemo(() => {
    return instructors.filter(inst => {
      const query = search.trim().toLowerCase();
      const matchSearch =
        !query ||
        `${inst.name} ${inst.email} ${inst.organization} ${inst.domain} ${inst.specialization || ""} ${inst.city || ""}`
          .toLowerCase()
          .includes(query);
      const matchDomain = domainFilter === "All" || inst.domain === domainFilter;
      const matchStatus = statusFilter === "All" || inst.status === statusFilter;
      return matchSearch && matchDomain && matchStatus;
    });
  }, [instructors, search, domainFilter, statusFilter]);

  const activeCount = instructors.filter(i => i.status === "Active").length;
  const totalStudents = instructors.reduce((acc, i) => acc + (Number(i.studentsCount) || 0), 0);
  const totalCourses = instructors.reduce((acc, i) => acc + (Number(i.coursesCount) || 0), 0);

  function handleAddInstructor(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const newInst = {
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
      joinedDate: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }),
      phone: phone.trim() || "+91 98000 12345",
      city: city.trim() || "Hyderabad, Telangana",
      bio: bio.trim() || "Faculty instructor teaching specialized technical curricula on the platform.",
      qualifications: ["Industry Verified Faculty", "Pedagogical Specialist"]
    };

    setInstructors(prev => [newInst, ...prev]);
    setShowAddForm(false);
    setName("");
    setEmail("");
    setSpecialization("");
    setBio("");
    if (setNotice) setNotice(`Instructor "${newInst.name}" has been successfully added.`);
  }

  function handleToggleStatus(instId) {
    setInstructors(prev =>
      prev.map(i => {
        if (i.id === instId) {
          const updated = {
            ...i,
            status: i.status === "Active" ? "Inactive" : "Active"
          };
          if (selectedInstructor && selectedInstructor.id === instId) {
            setSelectedInstructor(updated);
          }
          return updated;
        }
        return i;
      })
    );
    if (setNotice) setNotice(`Instructor status updated.`);
  }

  function handleDeleteInstructor(instId) {
    const inst = instructors.find(i => i.id === instId);
    setInstructors(prev => prev.filter(i => i.id !== instId));
    if (selectedInstructor && selectedInstructor.id === instId) {
      setSelectedInstructor(null);
    }
    if (setNotice) setNotice(`Instructor "${inst?.name || "record"}" has been deleted.`);
  }

  return (
    <>
      {/* 1. Top Metrics Grid */}
      <div className="metrics-grid four instructor-metrics">
        <Metric label="TOTAL INSTRUCTORS" value={String(instructors.length)} foot="Registered teaching faculty" icon={GraduationCap} />
        <Metric label="ACTIVE FACULTY" value={String(activeCount)} foot="Currently taking cohorts" icon={CheckCircle2} />
        <Metric label="COURSES MENTORED" value={String(totalCourses)} foot="Active curricula" icon={BookOpen} />
        <Metric label="STUDENTS TAUGHT" value={totalStudents.toLocaleString("en-IN")} foot="Platform aggregate" icon={Users} />
      </div>

      {/* 2. Add Instructor Inline Form */}
      {showAddForm && (
        <form className="card onboard-form inline-form" onSubmit={handleAddInstructor}>
          <div className="form-head">
            <div>
              <h2>Register New Instructor</h2>
              <p>Onboard a certified teaching instructor, faculty mentor, or enterprise coach.</p>
            </div>
            <button type="button" className="icon-button" onClick={() => setShowAddForm(false)} aria-label="Close form">
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
            <button type="button" className="secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* 3. Detail View or Directory Content */}
      {selectedInstructor ? (
        <InlineDetailView
          title={selectedInstructor.name}
          subtitle={`${selectedInstructor.role} · ${selectedInstructor.organization}`}
          status={selectedInstructor.status}
          id={selectedInstructor.id}
          onBack={() => setSelectedInstructor(null)}
          actions={
            <>
              <button
                className="secondary btn-sm"
                onClick={() => handleToggleStatus(selectedInstructor.id)}
              >
                {selectedInstructor.status === "Active" ? "Suspend Account" : "Activate Account"}
              </button>
              <button
                className="secondary btn-sm"
                style={{ color: "#dc2626", borderColor: "#fecaca" }}
                onClick={() => handleDeleteInstructor(selectedInstructor.id)}
              >
                <Trash2 size={14} /> Delete Instructor
              </button>
              <button
                className="primary btn-sm"
                onClick={() => setPage("Courses")}
              >
                View Assigned Courses <ArrowRight size={14} />
              </button>
            </>
          }
        >
          <div className="detail-grid">
            <div className="detail-col">
              <h3>Faculty Profile & Qualifications</h3>
              <div className="detail-fields-list">
                <DetailField label="Full Name" value={selectedInstructor.name} />
                <DetailField label="Academic / Industry Role" value={selectedInstructor.role} />
                <DetailField label="Affiliated Organization" value={selectedInstructor.organization} />
                <DetailField label="Subject Domain" value={selectedInstructor.domain} />
                <DetailField label="Specialization" value={selectedInstructor.specialization} />
                <DetailField label="Date Onboarded" value={selectedInstructor.joinedDate} />
              </div>
            </div>

            <div className="detail-col">
              <h3>Contact & Campus Location</h3>
              <div className="detail-fields-list">
                <DetailField label="Email Address" value={selectedInstructor.email} mono />
                <DetailField label="Phone Number" value={selectedInstructor.phone} />
                <DetailField label="Location" value={selectedInstructor.city} />
                <DetailField label="Active Courses" value={`${selectedInstructor.coursesCount || 0} Courses`} />
                <DetailField label="Total Students Mentored" value={`${(selectedInstructor.studentsCount || 0).toLocaleString("en-IN")} Learners`} />
                <DetailField label="Student Satisfaction Rating">
                  <span className="rating-pill">
                    <Star size={13} className="text-warning fill-warning" /> {selectedInstructor.rating || 4.8} / 5.0
                  </span>
                </DetailField>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Professional Biography</h3>
            <p className="detail-prose">{selectedInstructor.bio}</p>
          </div>

          <div className="detail-section">
            <h3>Verified Academic Credentials & Certifications</h3>
            {selectedInstructor.qualifications && selectedInstructor.qualifications.length > 0 ? (
              <div className="doc-pills">
                {selectedInstructor.qualifications.map((q, idx) => (
                  <span className="doc-pill" key={idx}>
                    <CheckCircle2 size={13} className="text-success" /> {q}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted italic">No certificates attached.</p>
            )}
          </div>
        </InlineDetailView>
      ) : (
        <>
          {/* Toolbar: Filters & View Switcher */}
          <div className="inst-toolbar">
            <div className="inst-filters-left">
              {/* Search Bar */}
              <div className="inst-search-wrap">
                <Search size={16} className="inst-search-icon" />
                <input
                  type="text"
                  className="inst-search-input"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search instructors, domain, academy, city..."
                />
                {search && (
                  <button className="inst-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Domain Dropdown */}
              <div className="inst-select-box">
                <select
                  className="inst-dropdown-select"
                  value={domainFilter}
                  onChange={e => setDomainFilter(e.target.value)}
                >
                  <option value="All">All Domains</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
                <ChevronDown size={14} className="inst-chevron" />
              </div>

              {/* Status Dropdown */}
              <div className="inst-select-box">
                <select
                  className="inst-dropdown-select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown size={14} className="inst-chevron" />
              </div>
            </div>

            {/* Toolbar Right: View Switcher & Add Button */}
            <div className="inst-toolbar-right">
              <div className="inst-view-switch">
                <button
                  type="button"
                  className={`inst-view-btn-icon ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Design Box View"
                  aria-label="Design Box View"
                >
                  <LayoutGrid size={17} />
                </button>
                <button
                  type="button"
                  className={`inst-view-btn-icon ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="Table View"
                  aria-label="Table View"
                >
                  <List size={17} />
                </button>
              </div>

              <button className="inst-add-btn" onClick={() => setShowAddForm(true)}>
                <Plus size={16} />
                <span>Add Instructor</span>
              </button>
            </div>
          </div>

          {/* Directory Content Area */}
          {instructors.length === 0 ? (
            <div className="inst-empty-container">
              <div className="inst-empty-icon-circle">
                <GraduationCap size={36} />
              </div>
              <h3 className="inst-empty-title">No instructors added yet</h3>
              <p className="inst-empty-desc">
                The instructor directory is currently empty. Click the button below to register and save your first faculty instructor.
              </p>
              <button className="inst-add-btn" onClick={() => setShowAddForm(true)}>
                <Plus size={16} />
                <span>Add Instructor</span>
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="inst-empty-container">
              <SearchX size={36} style={{ color: "#94a3b8" }} />
              <h3 className="inst-empty-title">No matching instructors found</h3>
              <p className="inst-empty-desc">No faculty records match your current search or filter criteria.</p>
              <button
                className="inst-action-btn toggle"
                style={{ border: "1px solid #cbd5e1", padding: "8px 16px" }}
                onClick={() => {
                  setSearch("");
                  setDomainFilter("All");
                  setStatusFilter("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* DESIGN BOX VIEW (High-Clarity Card Boxes) */
            <div className="inst-cards-grid">
              {filtered.map((inst, index) => {
                const initials = getInitials(inst.name);
                const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
                const isOnline = inst.status === "Active";

                return (
                  <div
                    key={inst.id || inst.name}
                    className="inst-design-box"
                    onClick={() => setSelectedInstructor(inst)}
                  >
                    {/* Top Status & Domain Bar */}
                    <div className="inst-box-top-bar">
                      <div className={`inst-status-chip ${isOnline ? "active" : "inactive"}`}>
                        <span className="inst-status-dot" />
                        <span>{inst.status}</span>
                      </div>
                      <span className="inst-domain-chip" title={inst.domain}>
                        {inst.domain}
                      </span>
                    </div>

                    {/* Profile Header with Avatar */}
                    <div className="inst-box-profile">
                      <div className="inst-avatar" style={{ background: gradient }}>
                        <span>{initials}</span>
                        {isOnline && <span className="inst-avatar-online-dot" />}
                      </div>

                      <div className="inst-profile-meta">
                        <h3 className="inst-name" title={inst.name}>{inst.name}</h3>
                        <p className="inst-role-org">
                          <span className="inst-role">{inst.role}</span>
                          <span className="inst-sep">•</span>
                          <span className="inst-org" title={inst.organization}>
                            <Building2 size={12} className="inline-icon" /> {inst.organization}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="inst-contact-strip">
                      {inst.email && (
                        <div className="inst-contact-item" title={inst.email}>
                          <Mail size={13} className="inst-contact-icon" />
                          <span className="truncate">{inst.email}</span>
                        </div>
                      )}
                      {inst.city && (
                        <div className="inst-contact-item" title={inst.city}>
                          <MapPin size={13} className="inst-contact-icon" />
                          <span className="truncate">{inst.city}</span>
                        </div>
                      )}
                    </div>

                    {/* Clarity Output Metric Tiles */}
                    <div className="inst-metrics-grid">
                      <div className="inst-metric-tile">
                        <div className="inst-metric-icon-wrap indigo">
                          <BookOpen size={14} />
                        </div>
                        <div className="inst-metric-info">
                          <strong className="inst-metric-val">{inst.coursesCount || 1}</strong>
                          <span className="inst-metric-lbl">Course{inst.coursesCount !== 1 ? "s" : ""}</span>
                        </div>
                      </div>

                      <div className="inst-metric-tile">
                        <div className="inst-metric-icon-wrap emerald">
                          <Users size={14} />
                        </div>
                        <div className="inst-metric-info">
                          <strong className="inst-metric-val">{(inst.studentsCount || 0).toLocaleString("en-IN")}</strong>
                          <span className="inst-metric-lbl">Students</span>
                        </div>
                      </div>

                      <div className="inst-metric-tile">
                        <div className="inst-metric-icon-wrap amber">
                          <Star size={14} className="star-filled" />
                        </div>
                        <div className="inst-metric-info">
                          <strong className="inst-metric-val">{inst.rating || 4.8}</strong>
                          <span className="inst-metric-lbl">Rating</span>
                        </div>
                      </div>
                    </div>

                    {/* Specialization Highlight Strip */}
                    {inst.specialization && (
                      <div className="inst-specialty-box" title={inst.specialization}>
                        <Sparkles size={13} className="inst-specialty-icon" />
                        <span className="inst-specialty-text">{inst.specialization}</span>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="inst-box-footer">
                      <div className="inst-box-actions-left">
                        <button
                          type="button"
                          className="inst-action-btn delete"
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteInstructor(inst.id);
                          }}
                          title="Delete Instructor"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                        <button
                          type="button"
                          className="inst-action-btn toggle"
                          onClick={e => {
                            e.stopPropagation();
                            handleToggleStatus(inst.id);
                          }}
                          title="Toggle Status"
                        >
                          <span>{inst.status === "Active" ? "Suspend" : "Activate"}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="inst-view-btn"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedInstructor(inst);
                        }}
                      >
                        <span>View Profile</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* HIGH-CLARITY MODERN TABLE VIEW */
            <section className="card instructor-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Instructor</th>
                      <th>Organization</th>
                      <th>Domain & Specialization</th>
                      <th>Courses</th>
                      <th>Students</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((inst, index) => {
                      const initials = getInitials(inst.name);
                      const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

                      return (
                        <tr
                          key={inst.id || inst.name}
                          className="hoverable-row"
                          onClick={() => setSelectedInstructor(inst)}
                        >
                          <td>
                            <div className="inst-table-profile">
                              <div className="inst-table-avatar" style={{ background: gradient }}>
                                {initials}
                              </div>
                              <div className="instructor-name">
                                <strong>{inst.name}</strong>
                                <small className="row-sub">{inst.role} · {inst.email}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="inst-table-org">
                              <Building2 size={13} style={{ color: "#4f46e5" }} /> {inst.organization}
                            </span>
                          </td>
                          <td>
                            <span className="inst-domain-badge">{inst.domain}</span>
                            {inst.specialization && (
                              <small className="row-sub">{inst.specialization}</small>
                            )}
                          </td>
                          <td>
                            <span className="inst-stat-chip">
                              <BookOpen size={13} style={{ color: "#4f46e5" }} /> {inst.coursesCount || 1}
                            </span>
                          </td>
                          <td>
                            <span className="inst-stat-chip">
                              <Users size={13} style={{ color: "#059669" }} /> {(inst.studentsCount || 0).toLocaleString("en-IN")}
                            </span>
                          </td>
                          <td>
                            <span className="inst-rating-cell">
                              <Star size={13} className="text-warning fill-warning" /> {inst.rating || 4.8}
                            </span>
                          </td>
                          <td>
                            <Badge tone={getStatusTone(inst.status)}>{inst.status}</Badge>
                          </td>
                          <td>
                            <div className="inst-action-boxes-wrap">
                              <button
                                type="button"
                                className="inst-box-btn view"
                                onClick={e => {
                                  e.stopPropagation();
                                  setSelectedInstructor(inst);
                                }}
                                title="View Profile"
                                aria-label="View Profile"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                type="button"
                                className="inst-box-btn delete"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleDeleteInstructor(inst.id);
                                }}
                                title="Delete Instructor"
                                aria-label="Delete Instructor"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
