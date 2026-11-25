import React from "react";
import {
  X,
  User,
  Building2,
  Mail,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Hash,
  Tag,
} from "lucide-react";
import "./PortalUserProfileModal.css";

export default function PortalUserProfileModal({ isOpen, user, onClose, onLogout }) {
  if (!isOpen || !user) return null;

  const avatarLogo =
    user?.logo ||
    (typeof window !== "undefined"
      ? localStorage.getItem("userLogo") || localStorage.getItem("institutionLogo")
      : null);

  return (
    <div className="portal-profile-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="portal-profile-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="portal-profile-close"
          onClick={onClose}
          aria-label="Close user profile"
        >
          <X size={18} />
        </button>

        {/* Profile Card Header */}
        <div className="portal-profile-hero">
          <div className="portal-profile-avatar-wrap">
            {avatarLogo ? (
              <img src={avatarLogo} alt={user?.entityName || "Account Logo"} className="portal-profile-avatar-img" />
            ) : (
              <div className="portal-profile-avatar-fallback">
                <Building2 size={28} />
              </div>
            )}
            <span className="portal-avatar-status-dot" title="Active Account" />
          </div>

          <div className="portal-profile-titles">
            <h2>{user.username}</h2>
            <span className="portal-profile-entity-pill">{user.entityName}</span>
          </div>
        </div>

        {/* Profile Metadata List */}
        <div className="portal-profile-meta-list">
          <div className="portal-meta-item">
            <div className="portal-meta-icon"><Hash size={15} /></div>
            <div className="portal-meta-info">
              <span className="portal-meta-label">User ID</span>
              <strong className="portal-meta-val mono">{user.userId || "usr_inst_verified"}</strong>
            </div>
          </div>

          <div className="portal-meta-item">
            <div className="portal-meta-icon"><Tag size={15} /></div>
            <div className="portal-meta-info">
              <span className="portal-meta-label">Account Category</span>
              <strong className="portal-meta-val capitalize">{user.categoryTitle || user.category}</strong>
            </div>
          </div>

          <div className="portal-meta-item">
            <div className="portal-meta-icon"><Mail size={15} /></div>
            <div className="portal-meta-info">
              <span className="portal-meta-label">Official Email</span>
              <strong className="portal-meta-val">{user.email}</strong>
            </div>
          </div>

          <div className="portal-meta-item">
            <div className="portal-meta-icon"><Calendar size={15} /></div>
            <div className="portal-meta-info">
              <span className="portal-meta-label">Account Creation Date</span>
              <strong className="portal-meta-val">{user.createdAt || "Nov 23, 2026"}</strong>
            </div>
          </div>

          <div className="portal-meta-item">
            <div className="portal-meta-icon"><CheckCircle2 size={15} /></div>
            <div className="portal-meta-info">
              <span className="portal-meta-label">Account Status</span>
              <div className="portal-status-badge active">
                <span className="portal-status-dot" />
                <span>{user.status || "Active"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="portal-profile-footer">
          <button
            type="button"
            className="portal-profile-logout-btn"
            onClick={onLogout}
          >
            <LogOut size={16} />
            <span>Sign Out & Terminate Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
