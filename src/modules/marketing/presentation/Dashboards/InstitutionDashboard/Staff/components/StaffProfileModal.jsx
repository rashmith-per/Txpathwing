import { useState } from "react";
import {
  X,
  Pencil,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Shield,
  Clock,
  User,
  Briefcase,
  History,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import StaffStatusBadge from "./StaffStatusBadge.jsx";
import { ROLE_DEFINITIONS } from "../backend/models/StaffRoleModel.js";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatTimestamp(isoStr) {
  if (!isoStr) return "—";
  try {
    const d = new Date(isoStr);
    return `${d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })} at ${d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } catch {
    return isoStr;
  }
}

export default function StaffProfileModal({ isOpen, staff, onClose, onEdit, canEdit }) {
  const [activeTab, setActiveTab] = useState("personal");

  if (!isOpen || !staff) return null;

  const roleDef = ROLE_DEFINITIONS[staff.role] || {
    name: staff.roleName || staff.role,
    description: "Standard institution personnel",
    permissions: staff.permissions || [],
  };

  return (
    <div className="staff-modal-scrim" role="dialog" aria-modal="true" aria-labelledby="profile-title">
      <div className="staff-modal-card staff-modal-lg">
        {/* Profile Card Header Banner */}
        <div className="staff-profile-banner">
          <button
            type="button"
            className="modal-close-button profile-banner-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <div className="profile-banner-content">
            <div className="profile-banner-info">
              <div className="profile-banner-title-row">
                <h2 id="profile-title">{staff.name}</h2>
                <StaffStatusBadge status={staff.status} />
              </div>

              <p className="profile-banner-role-line">
                <span className="profile-banner-id">{staff.staffId}</span>
                <span className="bullet-sep">•</span>
                <span className="profile-banner-desig">{staff.designation}</span>
                <span className="bullet-sep">•</span>
                <span className="profile-banner-dept">{staff.department} Engineering</span>
                <span className="bullet-sep">•</span>
                <span className="profile-banner-cat">{staff.category} Staff</span>
              </p>
            </div>

            {canEdit && (
              <button
                type="button"
                className="primary-action profile-edit-btn"
                onClick={() => {
                  onClose();
                  onEdit(staff);
                }}
              >
                <Pencil size={14} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs-nav" role="tablist">
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "personal" ? "active-profile-tab" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            <User size={15} />
            <span>Personal Details</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "professional" ? "active-profile-tab" : ""}`}
            onClick={() => setActiveTab("professional")}
          >
            <Building size={15} />
            <span>Professional Details</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "employment" ? "active-profile-tab" : ""}`}
            onClick={() => setActiveTab("employment")}
          >
            <Briefcase size={15} />
            <span>Employment Info</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "account" ? "active-profile-tab" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <Shield size={15} />
            <span>Account & Permissions</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "activity" ? "active-profile-tab" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            <History size={15} />
            <span>Activity History ({staff.activityLogs?.length || 0})</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="profile-tab-content">
          {/* 1. Personal Details */}
          {activeTab === "personal" && (
            <div className="profile-section-panel">
              <h3 className="profile-section-title">Personal Contact & Demographics</h3>
              <div className="detail-cards-grid">
                <div className="detail-card">
                  <div className="detail-icon"><Mail size={16} /></div>
                  <div>
                    <span className="detail-label">Official Email</span>
                    <strong className="detail-value">{staff.email}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Phone size={16} /></div>
                  <div>
                    <span className="detail-label">Contact Phone</span>
                    <strong className="detail-value">{staff.phone || "Not recorded"}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Calendar size={16} /></div>
                  <div>
                    <span className="detail-label">Date of Birth</span>
                    <strong className="detail-value">{formatDate(staff.dob)}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><User size={16} /></div>
                  <div>
                    <span className="detail-label">Gender</span>
                    <strong className="detail-value">{staff.gender || "Prefer not to say"}</strong>
                  </div>
                </div>
              </div>

              <div className="detail-card address-card full-width-card">
                <div className="detail-icon"><MapPin size={16} /></div>
                <div>
                  <span className="detail-label">Residential / Office Address</span>
                  <p className="detail-text">{staff.address || "KITS Campus Staff Quarters, Warangal, TS"}</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Professional Details */}
          {activeTab === "professional" && (
            <div className="profile-section-panel">
              <h3 className="profile-section-title">Academic & Institutional Placement</h3>
              <div className="detail-cards-grid">
                <div className="detail-card">
                  <div className="detail-icon"><Building size={16} /></div>
                  <div>
                    <span className="detail-label">Assigned Department</span>
                    <strong className="detail-value">{staff.department} Engineering</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Briefcase size={16} /></div>
                  <div>
                    <span className="detail-label">Official Designation</span>
                    <strong className="detail-value">{staff.designation}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><GraduationCap size={16} /></div>
                  <div>
                    <span className="detail-label">Staff Category</span>
                    <strong className="detail-value">{staff.category} Staff</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><User size={16} /></div>
                  <div>
                    <span className="detail-label">Reporting Manager</span>
                    <strong className="detail-value">{staff.reportingManager || "Dean of Academics"}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><GraduationCap size={16} /></div>
                  <div>
                    <span className="detail-label">Highest Qualification</span>
                    <strong className="detail-value">{staff.qualification || "M.Tech / Ph.D."}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Clock size={16} /></div>
                  <div>
                    <span className="detail-label">Prior Experience</span>
                    <strong className="detail-value">{staff.experience || "5+ Years"}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Employment Information */}
          {activeTab === "employment" && (
            <div className="profile-section-panel">
              <h3 className="profile-section-title">Contract & Tenancy Terms</h3>
              <div className="detail-cards-grid">
                <div className="detail-card">
                  <div className="detail-icon"><Briefcase size={16} /></div>
                  <div>
                    <span className="detail-label">Employment Type</span>
                    <strong className="detail-value">{staff.employmentType}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Calendar size={16} /></div>
                  <div>
                    <span className="detail-label">Date of Joining</span>
                    <strong className="detail-value">{formatDate(staff.joiningDate)}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Shield size={16} /></div>
                  <div>
                    <span className="detail-label">Institutional ID</span>
                    <strong className="detail-value">{staff.staffId}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><CheckCircle2 size={16} /></div>
                  <div>
                    <span className="detail-label">Status</span>
                    <StaffStatusBadge status={staff.status} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Account Information */}
          {activeTab === "account" && (
            <div className="profile-section-panel">
              <h3 className="profile-section-title">System Role & Access Privileges</h3>
              <div className="role-summary-box">
                <div className="role-summary-badge">
                  <Shield size={20} />
                  <div>
                    <strong>{roleDef.name}</strong>
                    <span className="role-id-code">{staff.role}</span>
                  </div>
                </div>
                <p className="role-summary-desc">{roleDef.description}</p>
              </div>

              <div className="account-details-grid">
                <div className="detail-card">
                  <div className="detail-icon"><User size={16} /></div>
                  <div>
                    <span className="detail-label">System Username</span>
                    <strong className="detail-value">{staff.username || staff.email.split("@")[0]}</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon"><Mail size={16} /></div>
                  <div>
                    <span className="detail-label">Primary Login Email</span>
                    <strong className="detail-value">{staff.email}</strong>
                  </div>
                </div>
              </div>

              <div className="permissions-granted-box">
                <h4>Authorized Capabilities</h4>
                <div className="permissions-pills-wrap">
                  {(staff.permissions || roleDef.permissions || []).map((perm) => (
                    <span key={perm} className="permission-pill">
                      <CheckCircle2 size={12} />
                      <code>{perm}</code>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. Activity History */}
          {activeTab === "activity" && (
            <div className="profile-section-panel">
              <h3 className="profile-section-title">Audit Log & Event Timeline</h3>
              {(!staff.activityLogs || staff.activityLogs.length === 0) ? (
                <div className="empty-logs-box">
                  <AlertCircle size={20} />
                  <span>No recorded historical activity logs for this profile.</span>
                </div>
              ) : (
                <div className="activity-timeline">
                  {staff.activityLogs.map((log) => (
                    <div key={log.id} className="timeline-item">
                      <div className="timeline-marker" />
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="log-action-tag">{log.action}</span>
                          <span className="log-time">{formatTimestamp(log.timestamp)}</span>
                        </div>
                        <p className="log-details">{log.details}</p>
                        <span className="log-actor">
                          Logged by: <strong>{log.actorName}</strong> ({log.actorEmail || "System"})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="staff-modal-footer">
          <button type="button" className="secondary-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
