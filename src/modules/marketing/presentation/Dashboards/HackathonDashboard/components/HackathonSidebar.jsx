import React from "react";
import { LogOut, X } from "lucide-react";
import txIcon from "../../../../../../assets/tx-icon.jpg";

export function HackathonSidebar({
  mobileOpen,
  setMobileOpen,
  navItems,
  active,
  setActive,
  onLogout
}) {
  return (
    <aside className={`hd-sidebar ${mobileOpen ? "hd-sidebar-open" : ""}`}>
      <div className="hd-sidebar-header">
        <div className="hd-logo">
          <img
            src={txIcon}
            alt="TX Logo"
            style={{ width: "28px", height: "28px", objectFit: "contain", borderRadius: "4px" }}
          />
        </div>

        <div className="hd-brand">
          <div className="hd-brand-title">Hackathon</div>
          <div className="hd-brand-sub">Judge Portal</div>
        </div>

        <button
          className="hd-mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      <nav className="hd-nav">
        {navItems.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setMobileOpen(false);
              }}
              className={`hd-nav-item ${isActive ? "hd-nav-active" : ""}`}
            >
              <Icon className="hd-nav-icon" />
              <span className="hd-nav-label">{item.label}</span>
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className={`hd-badge hd-badge-${item.color} ${isActive ? "hd-badge-active" : ""}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="hd-sidebar-footer">
        <div className="hd-user-card">
          <div className="hd-user-avatar">J</div>
          <div className="hd-user-info">
            <div className="hd-user-email">judge@hackathon.com</div>
            <div className="hd-user-role">Lead Judge</div>
          </div>
          <button
            className="hd-logout-btn"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
