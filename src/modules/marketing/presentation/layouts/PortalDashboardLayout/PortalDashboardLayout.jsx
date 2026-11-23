import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortalDashboardHeader from "./PortalDashboardHeader";
import PortalDashboardSidebar from "./PortalDashboardSidebar";
import PortalUserProfileModal from "./PortalUserProfileModal";
import {
  getActivePortalUser,
  clearActivePortalUser,
} from "../../../services/portalAuth/portalStorage";
import "./PortalDashboardLayout.css";

export default function PortalDashboardLayout({
  user: propUser,
  category = "institution",
  modules = [],
  activeModule,
  onSelectModule,
  search,
  onSearchChange,
  children,
}) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(propUser || getActivePortalUser());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      const active = getActivePortalUser();
      if (active) {
        setCurrentUser(active);
      }
    }
  }, [currentUser]);

  const handleLogout = () => {
    clearActivePortalUser();
    navigate("/", { replace: true });
  };

  return (
    <div className={`pdb-shell theme-${category}`}>
      {/* Mobile backdrop */}
      {isMobileNavOpen && (
        <div
          className="pdb-mobile-scrim"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <PortalDashboardSidebar
        user={currentUser}
        modules={modules}
        activeModule={activeModule}
        onSelectModule={onSelectModule}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Body */}
      <div className="pdb-main-body">
        <PortalDashboardHeader
          user={currentUser}
          activeModule={activeModule}
          search={search}
          onSearchChange={onSearchChange}
          onToggleMobileNav={() => setIsMobileNavOpen((o) => !o)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
        />

        <main className="pdb-content-area">{children}</main>
      </div>

      {/* User Profile Modal */}
      <PortalUserProfileModal
        isOpen={isProfileOpen}
        user={currentUser}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}
