import { Building2, X } from "lucide-react";
import txIcon from "../../../../../assets/tx-icon.jpg"; // src/assets/tx-icon.jpg — adjust if yours differs
import { navigation } from "./sidebarData.js";
import "./Sidebar.css";

export default function Sidebar({ activeNav, onNavigate, open, onClose }) {
  return (
    <aside className={`institution-sidebar${open ? " institution-sidebar-open" : ""}`}>
      <div className="institution-brand">
        <img src={txIcon} alt="TX Pathwing" />
        <span>Pathwing</span>
        <button className="icon-button mobile-close" type="button" onClick={onClose} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <div className="signed-in-label">SIGNED IN AS</div>
      <div className="institution-context">
        <Building2 size={17} />
        <div>
          <span>Institution</span>
          <strong>KITS Warangal</strong>
        </div>
      </div>

      <nav className="institution-nav" aria-label="Institution navigation">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              {item.group && <div className="nav-group-label">{item.group}</div>}
              <button
                type="button"
                className={`nav-item${activeNav === item.label ? " nav-item-active" : ""}`}
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

      <div className="sidebar-profile">
        <div className="profile-avatar">RS</div>
        <div>
          <strong>R. Sathyanarayana</strong>
          <span>Tenant admin · KITS Warangal</span>
        </div>
      </div>
    </aside>
  );
}
