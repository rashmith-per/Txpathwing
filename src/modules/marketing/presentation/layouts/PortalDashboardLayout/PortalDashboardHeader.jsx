import React from "react";
import {
  Bell,
  Building2,
  LogOut,
  Menu,
  Search,
  User,
  Shield,
} from "lucide-react";
import txIcon from "../../../../../assets/tx-icon.jpg";
import "./PortalDashboardLayout.css";

export default function PortalDashboardHeader({
  user,
  category = "institution",
  activeModule,
  search,
  onSearchChange,
  onToggleMobileNav,
  onOpenProfile,
  onLogout,
}) {
  return (
    <header className="pdb-header">
      <div className="pdb-header-left">
        <button
          type="button"
          className="pdb-mobile-toggle"
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        {/* Dynamic Registered Entity Banner: TX Pathwing Logo Only */}
        <div className="pdb-brand-display">
          <div className="pdb-logo-frame">
            <img
              src={txIcon}
              alt="TX Pathwing"
              className="pdb-uploaded-logo pdb-default-logo"
            />
          </div>
        </div>
      </div>

      <div className="pdb-header-right">
        {/* Module Search Bar */}
        <label className="pdb-search-wrap">
          <Search size={15} className="pdb-search-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${activeModule.toLowerCase()}...`}
            aria-label={`Search ${activeModule}`}
          />
        </label>

        {/* Notifications Icon */}
        <button
          type="button"
          className="pdb-icon-action-btn"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="pdb-notif-badge">2</span>
        </button>

        {/* User Profile Trigger Button */}
        <button
          type="button"
          className="pdb-user-profile-btn"
          onClick={onOpenProfile}
          title="View account profile"
          aria-label="View account profile"
        >
          <div className="pdb-user-avatar">
            <User size={15} />
          </div>
          <div className="pdb-user-names">
            <span className="pdb-user-name-text">{user?.username || "Account"}</span>
            <span className="pdb-user-role-text">{user?.categoryTitle || user?.category}</span>
          </div>
        </button>
      </div>
    </header>
  );
}
