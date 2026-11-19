import React from "react";
import {
  Building2, Mail, MapPin, BookOpen, Users,
  Star, Sparkles, Trash2, ArrowRight
} from "lucide-react";
import { AVATAR_GRADIENTS, getInitials } from "../instructorsConstants";

export function InstructorGridView({
  instructors,
  onSelect,
  onDelete,
  onToggleStatus
}) {
  return (
    <div className="inst-cards-grid">
      {instructors.map((inst, index) => {
        const initials = getInitials(inst.name);
        const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
        const isOnline = inst.status === "Active";

        return (
          <div
            key={inst.id || inst.name}
            className="inst-design-box"
            onClick={() => onSelect(inst)}
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
                    onDelete(inst.id);
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
                    onToggleStatus(inst.id);
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
                  onSelect(inst);
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
  );
}
