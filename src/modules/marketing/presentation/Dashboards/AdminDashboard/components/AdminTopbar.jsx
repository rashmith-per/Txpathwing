import React from "react";
import { Bell, Menu, ShieldAlert } from "lucide-react";
import { Badge } from "../common/Badge";

export function AdminTopbar({
  systemAlerts = [],
  moderationCount = 0,
  showNotifMenu,
  setShowNotifMenu,
  mobileNav,
  setMobileNav,
  onNavigate
}) {
  return (
    <header className="topbar">
      <div className="brand-mark">
        <img src="/logo.png" alt="TX Logo" className="brand-logo-img" />
      </div>
      <div className="brand-name">
        TX-Pathwing <span>PLATFORM CONSOLE</span>
      </div>

      <div className="topbar-right">
        <Badge tone="blue"> ADMIN</Badge>

        <div className="topbar-relative">
          <button
            className="icon-button"
            aria-label="Notifications"
            onClick={() => setShowNotifMenu(!showNotifMenu)}
          >
            <Bell size={18} />
            {moderationCount > 0 && <span className="notification-dot" />}
          </button>

          {showNotifMenu && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-head">
                <span>Platform System Alerts</span>
                <Badge tone="danger">{systemAlerts.length} Active</Badge>
              </div>
              <div className="notification-list">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="notification-item clickable-row"
                    onClick={() => {
                      onNavigate(alert.link);
                      setShowNotifMenu(false);
                    }}
                  >
                    <ShieldAlert size={16} className="text-danger" />
                    <div>
                      <strong>{alert.title}</strong>
                      <small>{alert.sub}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMobileNav(!mobileNav)}
          aria-label="Toggle navigation"
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
