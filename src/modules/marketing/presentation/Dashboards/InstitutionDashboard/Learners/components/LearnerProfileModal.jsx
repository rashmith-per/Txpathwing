import { useState } from "react";
import { X, Edit, Mail, Phone, Calendar, MapPin, BookOpen, Award, CheckCircle2 } from "lucide-react";
import StatusTag from "../../Layout/StatusTag.jsx";

export default function LearnerProfileModal({ isOpen, learner, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState("personal");

  if (!isOpen || !learner) return null;

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "720px" }} onClick={(e) => e.stopPropagation()}>
        {/* Clean text-based banner header */}
        <div className="staff-profile-banner">
          <button className="icon-button modal-close-btn profile-banner-close" type="button" onClick={onClose} aria-label="Close profile">
            <X size={17} />
          </button>
          <div className="profile-banner-content">
            <div className="profile-banner-info">
              <div className="profile-banner-title-row">
                <h2>{learner.fullName || learner.name}</h2>
                <StatusTag>{learner.learningStatus || learner.status || "On track"}</StatusTag>
              </div>
              <p className="profile-banner-role-line">
                <span className="profile-banner-id">{learner.learnerId}</span>
                <span className="bullet-sep">•</span>
                <span>{learner.department}</span>
                <span className="bullet-sep">•</span>
                <span>Batch {learner.batch}</span>
                <span className="bullet-sep">•</span>
                <span>{learner.course || learner.programme}</span>
              </p>
            </div>
            {onEdit && (
              <button
                type="button"
                className="secondary-action profile-edit-btn"
                onClick={() => {
                  onClose();
                  onEdit(learner);
                }}
              >
                <Edit size={14} /> Edit Learner
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs-nav">
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "personal" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            1. Personal Details
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "academic" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("academic")}
          >
            2. Academic Details
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "progress" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("progress")}
          >
            3. Progress & Outcomes
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "account" ? "profile-tab-active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            4. Account Info
          </button>
        </div>

        {/* Tab Body */}
        <div className="staff-modal-body" style={{ minHeight: "300px" }}>
          {activeTab === "personal" && (
            <div className="profile-tab-pane">
              <div className="detail-key-val-grid">
                <div className="detail-item">
                  <span className="detail-key"><Mail size={13} /> Official Email</span>
                  <span className="detail-val">{learner.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key"><Phone size={13} /> Phone Number</span>
                  <span className="detail-val">{learner.phone || "—"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key"><Calendar size={13} /> Date of Birth</span>
                  <span className="detail-val">{learner.dob || "—"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Gender</span>
                  <span className="detail-val">{learner.gender || "—"}</span>
                </div>
                <div className="detail-item full-width-item">
                  <span className="detail-key"><MapPin size={13} /> Address</span>
                  <span className="detail-val">{learner.address || "—"}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="profile-tab-pane">
              <div className="detail-key-val-grid">
                <div className="detail-item">
                  <span className="detail-key">Learner ID</span>
                  <span className="detail-val" style={{ fontFamily: "monospace", fontWeight: 700 }}>
                    {learner.learnerId}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Institution</span>
                  <span className="detail-val">{learner.institution || "KITS Warangal"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Department</span>
                  <span className="detail-val">{learner.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key"><BookOpen size={13} /> Enrolled Course</span>
                  <span className="detail-val">{learner.course || learner.programme}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Batch Cohort</span>
                  <span className="detail-val">{learner.batch}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key"><Calendar size={13} /> Enrollment Date</span>
                  <span className="detail-val">{learner.enrollmentDate || "—"}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="profile-tab-pane">
              <div style={{ marginBottom: "20px", padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)" }}>Overall Program Completion</span>
                  <strong style={{ fontSize: "16px", color: "var(--blue)" }}>{learner.progress || 0}%</strong>
                </div>
                <div className="progress-track" style={{ height: "8px" }}>
                  <div className="progress-fill" style={{ width: `${learner.progress || 0}%` }} />
                </div>
              </div>

              <div className="detail-key-val-grid">
                <div className="detail-item">
                  <span className="detail-key"><Award size={13} /> Learning Status</span>
                  <span className="detail-val"><StatusTag>{learner.learningStatus || learner.status || "On track"}</StatusTag></span>
                </div>
                <div className="detail-item">
                  <span className="detail-key"><CheckCircle2 size={13} /> Placement Readiness</span>
                  <span className="detail-val">
                    {(learner.learningStatus === "Placement ready" || learner.status === "Placement ready") ? "Ready for Interviews" : "In Progress"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="profile-tab-pane">
              <div className="detail-key-val-grid">
                <div className="detail-item">
                  <span className="detail-key">Login Email</span>
                  <span className="detail-val">{learner.loginEmail || learner.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Account Status</span>
                  <span className="detail-val">{learner.accountStatus || "Active"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Assigned Role</span>
                  <span className="detail-val">{learner.assignedRole || "student"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-key">Registered At</span>
                  <span className="detail-val">{learner.createdAt ? new Date(learner.createdAt).toLocaleString() : "—"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="staff-modal-footer">
          <button type="button" className="secondary-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
