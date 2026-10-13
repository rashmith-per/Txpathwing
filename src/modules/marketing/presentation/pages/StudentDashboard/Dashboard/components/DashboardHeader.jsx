import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, ExternalLink, Menu } from "lucide-react";

export default function DashboardHeader({
  activeTab = "Dashboard",
  searchQuery = "",
  onSearchChange,
  onOpenMobile,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Live Workshop: Agentic AI Systems", time: "This Saturday 4:00 PM", unread: true },
    { id: 2, title: "5-Day Learning Streak achieved!", time: "Today", unread: false },
    { id: 3, title: "New course recommendations added", time: "Yesterday", unread: false },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="dashboard-top-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={onOpenMobile}
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>
        <div className="breadcrumb-nav">
          <span className="breadcrumb-root">Dashboard</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{activeTab}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Search Courses Input */}
        <div className="header-search-box">
          <Search size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="notifications-dropdown-wrap">
          <button
            type="button"
            className="notifications-trigger-btn"
            onClick={() => setNotifOpen((v) => !v)}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-badge-pill">{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className="notifications-popover">
              <div className="notif-header">
                <span>Notifications</span>
                <span className="notif-mark-read" onClick={handleMarkAllRead}>
                  Mark all read
                </span>
              </div>
              <div className="notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    <div className="notif-dot" />
                    <div>
                      <div className="notif-text">{n.title}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Website Link */}
        <Link to="/" className="website-link-pill" title="Return to Pathwing Main Website">
          <ExternalLink size={14} />
          <span>Visit Website</span>
        </Link>
      </div>
    </header>
  );
}
