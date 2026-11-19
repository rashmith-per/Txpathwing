import React from "react";
import {
  Users,
  Award,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  IdCard,
  Sparkles,
  X
} from "lucide-react";
import {
  getRegistrationId,
  getTeamName,
  getTeamLead,
  getAllMemberDetails,
  getTechnology,
  getChallenge,
  getAttendance,
  normalize
} from "../dashboardHelpers";

export function TeamMembersModal({ team, onClose }) {
  if (!team) return null;

  const memberDetails = getAllMemberDetails(team);

  return (
    <div className="members-modal-backdrop" onClick={onClose}>
      <div className="members-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="members-modal-header">
          <div className="members-modal-header-left">
            <div className="modal-icon-badge">
              <Users size={22} />
            </div>
            <div>
              <h2 className="members-modal-title">Team Member Details</h2>
              <p className="members-modal-subtitle">
                <span className="modal-reg-id">
                  {getRegistrationId(team) || "REG-000"}
                </span>
                <span className="modal-dot">•</span>
                <span>
                  {getTeamName(team) || getTeamLead(team)}
                </span>
              </p>
            </div>
          </div>
          <button
            className="members-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="members-modal-body">
          <div className="members-modal-overview-card">
            <div className="overview-item">
              <span className="overview-label">Team Lead</span>
              <strong className="overview-val">{getTeamLead(team) || "—"}</strong>
            </div>
            <div className="overview-item">
              <span className="overview-label">Tech Stack</span>
              <strong className="overview-val">{getTechnology(team) || "—"}</strong>
            </div>
            <div className="overview-item">
              <span className="overview-label">Challenge Title</span>
              <strong className="overview-val">{getChallenge(team) || "—"}</strong>
            </div>
            <div className="overview-item">
              <span className="overview-label">Attendance</span>
              <span className={`team-status status-${normalize(getAttendance(team))}`}>
                {getAttendance(team)}
              </span>
            </div>
          </div>

          <div className="members-modal-list-wrapper">
            <div className="members-modal-list-title">
              <Users size={16} />
              <span>All Team Members ({memberDetails.length})</span>
            </div>
            <div className="members-modal-grid">
              {memberDetails.map((member, idx) => (
                <div key={idx} className={`member-detail-card ${idx === 0 ? "lead-card-style" : ""}`}>
                  <div className="member-card-left">
                    <div className={`member-avatar ${idx === 0 ? "lead-avatar" : ""}`}>
                      {idx === 0 ? <Award size={18} /> : <User size={18} />}
                    </div>
                  </div>
                  <div className="member-card-right">
                    <div className="member-card-name-row">
                      <h3 className="member-name">{member.name}</h3>
                      <span className={`member-badge ${idx === 0 ? "badge-lead" : "badge-member"}`}>
                        {member.role}
                      </span>
                    </div>
                    <div className="member-card-details-grid">
                      {member.email && (
                        <div className="member-info-row">
                          <Mail size={13} />
                          <span>{member.email}</span>
                        </div>
                      )}
                      {member.phone && (
                        <div className="member-info-row">
                          <Phone size={13} />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.altContact && (
                        <div className="member-info-row">
                          <Phone size={13} />
                          <span>Alt: {member.altContact}</span>
                        </div>
                      )}
                      {member.college && (
                        <div className="member-info-row">
                          <Building size={13} />
                          <span>{member.college}</span>
                        </div>
                      )}
                      {(member.department || member.year) && (
                        <div className="member-info-row">
                          <GraduationCap size={13} />
                          <span>
                            {[member.department, member.year].filter(Boolean).join(" • ")}
                          </span>
                        </div>
                      )}
                      {member.studentId && (
                        <div className="member-info-row">
                          <IdCard size={13} />
                          <span>ID: {member.studentId}</span>
                        </div>
                      )}
                      {member.skills && (
                        <div className="member-info-row">
                          <Sparkles size={13} />
                          <span>Skills: {member.skills}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="members-modal-footer">
          <button
            className="members-modal-close-action"
            onClick={onClose}
          >
            Close Popup
          </button>
        </div>
      </div>
    </div>
  );
}
