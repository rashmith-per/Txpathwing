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
                      >
                        <Eye size={16} />
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
  );
}
