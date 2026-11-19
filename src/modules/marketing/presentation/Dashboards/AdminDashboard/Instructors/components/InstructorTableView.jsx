import React from "react";
import { Building2, BookOpen, Users, Star, Eye, Trash2 } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";
import { AVATAR_GRADIENTS, getInitials } from "../instructorsConstants";
import "../Instructors.css";

export function InstructorTableView({
  instructors,
  onSelect,
  onDelete
}) {
  return (
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
            {instructors.map((inst, index) => {
              const initials = getInitials(inst.name);
              const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

              return (
                <tr
                  key={inst.id || inst.name}
                  className="hoverable-row"
                  onClick={() => onSelect(inst)}
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
                          onSelect(inst);
                        }}
                        title="View Profile"
                        aria-label="View Profile"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          minWidth: "36px",
                          borderRadius: "10px",
                          border: "1px solid #bfdbfe",
                          backgroundColor: "#eff6ff",
                          color: "#2563eb",
                          cursor: "pointer",
                          boxShadow: "0 1px 3px rgba(37, 99, 235, 0.08)",
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                      >
                        <Eye size={17} strokeWidth={2.1} />
                      </button>
                      <button
                        type="button"
                        className="inst-box-btn delete"
                        onClick={e => {
                          e.stopPropagation();
                          onDelete(inst.id);
                        }}
                        title="Delete Instructor"
                        aria-label="Delete Instructor"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          minWidth: "36px",
                          borderRadius: "10px",
                          border: "1px solid #fecaca",
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          cursor: "pointer",
                          boxShadow: "0 1px 3px rgba(220, 38, 38, 0.08)",
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                      >
                        <Trash2 size={17} strokeWidth={2.1} />
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
  );
}
