import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import txIcon from "../../../../../../assets/tx-icon.jpg";
import { NotificationBell } from "../Notifications";

export function InstructorTopbar({ mobileNav, setMobileNav, onNavigate }) {
  return (
    <header className="instructor-topbar">
      {/* Brand Cluster */}
      <div className="brand-cluster">
        <Link
          to="/"
          className="topbar-brand-link"
          title="Return to Website Home"
        >
          <div className="topbar-brand-mark">
            <img
              src={txIcon}
              alt="TX Pathwing Logo"
              className="brand-logo-img"
            />
          </div>
          <div className="topbar-brand-name">
            <span className="brand-title-gradient">
              TX Pathwing
            </span>
          </div>
        </Link>
      </div>

      {/* Topbar Right Actions */}
      <div className="topbar-right">
        <NotificationBell onNavigate={onNavigate} />

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMobileNav((prev) => !prev)}
          title={mobileNav ? "Close navigation menu" : "Open navigation menu"}
          aria-label="Toggle navigation"
          aria-expanded={mobileNav}
        >
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
