import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, LogOut, Shield, Building2 } from "lucide-react";
import txIcon from "../../../../../assets/tx-icon.jpg";
import "./PortalDashboardSidebar.css";

export default function PortalDashboardSidebar({
  user,
  category = "institution",
  modules = [],
  activeModule,
  onSelectModule,
  isOpen,
  onClose,
  onLogout,
  onOpenProfile,
}) {
  const [logoLoadError, setLogoLoadError] = useState(false);

  const entityLogo =
    user?.logo ||
    (typeof window !== "undefined"
      ? localStorage.getItem("userLogo") || localStorage.getItem("institutionLogo")
      : null);

  useEffect(() => {
    setLogoLoadError(false);
  }, [user?.logo]);

  return (
    <aside className={`pdb-sidebar ${isOpen ? "open" : ""}`}>
      {/* Brand Header */}
      <div className="pdb-sidebar-brand">
        <Link
          to="/"
          className="pdb-sidebar-brand-link"
          title="Pathwing"
        >
          <img
            src={txIcon}
            alt="TX Pathwing"
            className="pdb-sidebar-logo pdb-default-logo"
          />
          <span className="pdb-sidebar-brand-name">
            Pathwing
          </span>
        </Link>
        <button
          type="button"
          className="pdb-sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Signed-in Account Context */}
      <div className="pdb-signed-in-box">
        <div className="pdb-signed-tag">SIGNED IN AS</div>
        <div className="pdb-signed-entity">
          <div className="pdb-entity-avatar">
            {entityLogo && !logoLoadError ? (
              <img
                src={entityLogo}
                alt={user?.entityName || "Uploaded Logo"}
                className="pdb-entity-logo-img"
                onError={() => setLogoLoadError(true)}
              />
            ) : (
              <div className="pdb-entity-fallback">
                {user?.entityName ? (
                  <span>{user.entityName.trim().charAt(0).toUpperCase()}</span>
                ) : (
                  <Building2 size={16} />
                )}
              </div>
            )}
          </div>
          <div className="pdb-entity-info">
            <strong title={user?.entityName}>{user?.entityName || "Entity"}</strong>
            <span>{user?.categoryTitle || user?.category} Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="pdb-nav" aria-label="Portal Navigation">
        {modules.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`pdb-nav-item ${isActive ? "active" : ""}`}
              onClick={() => {
                onSelectModule(item.id);
                if (onClose) onClose();
              }}
            >
              <div className="pdb-nav-item-left">
                <Icon size={17} className="pdb-nav-icon" />
                <span>{item.label}</span>
              </div>
              {item.badge && <span className="pdb-nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Profile & Logout Footer */}
      <div className="pdb-sidebar-footer">
        <div
          className="pdb-sidebar-profile-card"
          onClick={onOpenProfile}
          role="button"
          tabIndex={0}
          title="View account profile"
        >
          <div className="pdb-profile-icon-wrap">
            <Shield size={16} />
          </div>
          <div className="pdb-profile-details">
            <strong>{user?.username || "Admin"}</strong>
            <span>{user?.email || "admin@workspace.com"}</span>
          </div>
        </div>

        <button
          type="button"
          className="pdb-sidebar-logout-btn"
          onClick={onLogout}
          title="Sign out from dashboard"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
