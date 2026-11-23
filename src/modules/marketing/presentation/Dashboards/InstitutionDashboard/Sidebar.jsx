
import { Building2, X, LogOut, Shield } from "lucide-react";
import txIcon from "../../../../../assets/tx-icon.jpg";
import { navigation } from "./sidebarData.js";
import "./Sidebar.css";

export default function Sidebar({
  activeNav,
  onNavigate,
  open,
  onClose,
  onLogout,
}) {
  return (
    <aside
      className={`institution-sidebar${
        open ? " institution-sidebar-open" : ""
      }`}
    >
      {/* Brand */}
      <div className="institution-brand">
        <img src={txIcon} alt="TX Pathwing" />
        <span>Pathwing</span>

        <button
          className="icon-button mobile-close"
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Institution Information */}
      <div className="signed-in-label">SIGNED IN AS</div>

      <div className="institution-context">
        <Building2 size={17} />
        <div>
          <span>Institution</span>
          <strong>KITS Warangal</strong>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="institution-nav"
        aria-label="Institution navigation"
      >
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label}>
              {item.group && (
                <div className="nav-group-label">
                  {item.group}
                </div>
              )}

              <button
                type="button"
                className={`nav-item${
                  activeNav === item.label
                    ? " nav-item-active"
                    : ""
                }`}
                onClick={() => onNavigate(item.label)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.count && <small>{item.count}</small>}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Profile and Logout */}
      <div className="sidebar-profile">
        <div className="profile-role-badge">
          <Shield size={15} />
        </div>

        <div className="profile-details">
          <strong>R. Sathyanarayana</strong>
          <span>Admin · KITS Warangal</span>
        </div>

        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={onLogout}
          title="Sign out & Exit"
          aria-label="Sign out & Exit"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
