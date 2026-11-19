import { useState } from "react";
import { Bell, Check, Globe2, Menu, Moon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar.jsx";
import "./Layout.css";

export default function Layout({
  activeNav, breadcrumb, search, onSearchChange, darkMode, onToggleTheme,
  mobileNavOpen, onOpenMobileNav, onCloseMobileNav, onNavigate, message, children
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className={`institution-app${darkMode ? " institution-app-dark" : ""}`}>
      <div className="institution-shell">
        <Sidebar
          activeNav={activeNav}
          onNavigate={onNavigate}
          open={mobileNavOpen}
          onClose={onCloseMobileNav}
        />

        <main className="institution-main">
          <header className="console-header">
            <button className="icon-button mobile-menu" type="button" onClick={onOpenMobileNav} aria-label="Open navigation">
              <Menu size={19} />
            </button>

            <div className="breadcrumbs">
              <span>Pathwing</span><span>/</span><span>Institution</span><span>/</span>
              <strong>{breadcrumb}</strong>
            </div>

            <div className="header-actions">
              <label className="search-box">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={`Search ${activeNav.toLowerCase()}...`}
                  aria-label={`Search ${activeNav}`}
                />
              </label>

              <div className="notification-wrap">
                <button
                  className="icon-button notification-button"
                  type="button"
                  onClick={() => setNotificationsOpen((open) => !open)}
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
                    <button type="button" onClick={() => setNotificationsOpen(false)}>Dismiss</button>
                  </div>
                )}
              </div>

              <button
                className="icon-button theme-toggle"
                type="button"
                onClick={onToggleTheme}
                aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
              >
                <Moon size={17} />
              </button>

              <Link className="website-button" to="/">
                <Globe2 size={15} /><span>Website</span>
              </Link>
            </div>
          </header>

          <section className="dashboard-content">{children}</section>
        </main>
      </div>

      {mobileNavOpen && (
        <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={onCloseMobileNav} />
      )}
      {message && (
        <div className="status-toast" role="status"><Check size={16} />{message}</div>
      )}
    </div>
  );
}
