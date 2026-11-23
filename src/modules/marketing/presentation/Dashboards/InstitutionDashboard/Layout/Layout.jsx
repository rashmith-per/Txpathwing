
import { useState } from "react";
import {
  Bell,
  Check,
  Menu,
  Search,
} from "lucide-react";

import Sidebar from "../Sidebar.jsx";
import "./Layout.css";

export default function Layout({
  activeNav,
  breadcrumb,
  search,
  onSearchChange,
  darkMode,
  mobileNavOpen,
  onOpenMobileNav,
  onCloseMobileNav,
  onNavigate,
  onLogout,
  message,
  children,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div
      className={`institution-app${
        darkMode ? " institution-app-dark" : ""
      }`}
    >
      <div className="institution-shell">

        {/* Sidebar */}
        <Sidebar
          activeNav={activeNav}
          onNavigate={onNavigate}
          open={mobileNavOpen}
          onClose={onCloseMobileNav}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <main className="institution-main">

          {/* Header */}
          <header className="console-header">
            <button
              className="icon-button mobile-menu"
              type="button"
              onClick={onOpenMobileNav}
              aria-label="Open navigation"
            >
              <Menu size={19} />
            </button>

            <div className="breadcrumbs">
              <span>Pathwing</span>
              <span>/</span>
              <span>Institution</span>
              <span>/</span>
              <strong>{breadcrumb}</strong>
            </div>

            <div className="header-actions">

              {/* Search */}
              <label className="search-box">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) =>
                    onSearchChange(event.target.value)
                  }
                  placeholder={`Search ${activeNav.toLowerCase()}...`}
                  aria-label={`Search ${activeNav}`}
                />
              </label>

              {/* Notifications */}
              <div className="notification-wrap">
                <button
                  className="icon-button notification-button"
                  type="button"
                  onClick={() =>
                    setNotificationsOpen((open) => !open)
                  }
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                >
                  <Bell size={18} />
                  <span className="notification-count">3</span>
                </button>

                {notificationsOpen && (
                  <div className="notification-menu">
                    <strong>Notifications</strong>
                    <p>3 learners need profile verification.</p>
                    <p>Compliance report due 30 Sep.</p>

                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

             

             

            </div>
          </header>

          {/* Dashboard Pages */}
          <section className="dashboard-content">
            {children}
          </section>

        </main>
      </div>

      {/* Mobile Backdrop */}
      {mobileNavOpen && (
        <button
          className="mobile-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={onCloseMobileNav}
        />
      )}

      {/* Status Toast */}
      {message && (
        <div className="status-toast" role="status">
          <Check size={16} />
          {message}
        </div>
      )}
    </div>
  );
}
