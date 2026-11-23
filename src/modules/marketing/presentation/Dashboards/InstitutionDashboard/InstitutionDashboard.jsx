import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Layout from "./Layout/Layout.jsx";
import Overview from "./Overview/Overview.jsx";
import Learners from "./Learners/Learners.jsx";
import StaffManagement from "./Staff/StaffManagement.jsx";
import Learnings from "./Learnings/Learnings.jsx";
import Programmes from "./Programmes/Programmes.jsx";
import Events from "./Events/Events.jsx";
import Compliance from "./Compliance/Compliance.jsx";
import Reports from "./Reports/Reports.jsx";
import ErrorBoundary from "./Layout/ErrorBoundary.jsx";

import "./InstitutionDashboard.css";

function getNavFromPath(pathname) {
  const p = (pathname || "").toLowerCase();
  if (p.includes("/staff")) return "Staff Management";
  if (p.includes("/learners")) return "Learners";
  if (p.includes("/learning")) return "Learning";
  if (p.includes("/programmes")) return "Programmes";
  if (p.includes("/events")) return "Events";
  if (p.includes("/compliance")) return "Compliance";
  if (p.includes("/reports")) return "Reports";
  return null;
}

export default function InstitutionDashboard() {
  const navigateTo = useNavigate();
  const location = useLocation();

  const pathNav = getNavFromPath(location.pathname);
  const [activeNavState, setActiveNavState] = useState(pathNav || "Overview");
  const activeNav = pathNav || activeNavState;

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toastTimer = useRef(null);

  // Logout: Clear authentication credentials and return to Home
  const handleLogout = useCallback(() => {
    const authKeys = [
      "isLoggedIn",
      "userEmail",
      "userName",
      "userPhone",
      "isAdmin",
      "userRole",
      "isPlatformAdmin",
      "isHackathonAdmin",
    ];

    authKeys.forEach((key) => {
      localStorage.removeItem(key);
    });

    // Notify the application that authentication has changed
    window.dispatchEvent(new Event("authChanged"));

    // Navigate to the main website Home page
    navigateTo("/", { replace: true });
  }, [navigateTo]);

  // Toast helper
  const showMessage = useCallback((text) => {
    clearTimeout(toastTimer.current);
    setMessage(text);

    toastTimer.current = setTimeout(() => {
      setMessage("");
    }, 3200);
  }, []);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  // Dashboard navigation
  const navigate = useCallback((page) => {
    setActiveNavState(page);
    setMobileNavOpen(false);
    setSearch("");
    setSelectedEvent(null);

    // Synchronize URL for browser history and bookmarkability
    const basePath = location.pathname.startsWith("/institution-dashboard")
      ? "/institution-dashboard"
      : "/institution";

    if (page === "Staff Management") {
      navigateTo(`${basePath}/staff`, { replace: false });
    } else if (page === "Overview") {
      navigateTo(`${basePath}`, { replace: false });
    } else if (page === "Learners") {
      navigateTo(`${basePath}/learners`, { replace: false });
    } else if (page === "Learning") {
      navigateTo(`${basePath}/learning`, { replace: false });
    } else if (page === "Programmes") {
      navigateTo(`${basePath}/programmes`, { replace: false });
    } else if (page === "Events") {
      navigateTo(`${basePath}/events`, { replace: false });
    } else if (page === "Compliance") {
      navigateTo(`${basePath}/compliance`, { replace: false });
    } else if (page === "Reports") {
      navigateTo(`${basePath}/reports`, { replace: false });
    }
  }, [location.pathname, navigateTo]);

  // Event selection
  const selectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setActiveNavState("Events");
    setSearch("");
  }, []);

  // Dashboard pages
  const pages = {
    Overview: (
      <Overview
        search={search}
        onNavigate={navigate}
        onSelectEvent={selectEvent}
      />
    ),

    Learners: (
      <Learners
        search={search}
        showMessage={showMessage}
      />
    ),

    "Staff Management": (
      <StaffManagement
        search={search}
        showMessage={showMessage}
      />
    ),

    Learning: (
      <Learnings
        search={search}
        showMessage={showMessage}
      />
    ),

    Programmes: (
      <Programmes
        search={search}
        showMessage={showMessage}
      />
    ),

    Events: (
      <Events
        search={search}
        selectedEvent={selectedEvent}
        onSelectEvent={selectEvent}
        onBack={() => setSelectedEvent(null)}
        showMessage={showMessage}
      />
    ),

    Compliance: (
      <Compliance
        search={search}
        showMessage={showMessage}
      />
    ),

    Reports: (
      <Reports search={search} />
    ),
  };

  return (
    <Layout
      activeNav={activeNav}
      breadcrumb={selectedEvent ? "Event details" : activeNav}
      search={search}
      onSearchChange={setSearch}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode((value) => !value)}
      mobileNavOpen={mobileNavOpen}
      onOpenMobileNav={() => setMobileNavOpen(true)}
      onCloseMobileNav={() => setMobileNavOpen(false)}
      onNavigate={navigate}
      onLogout={handleLogout}
      message={message}
    >
      <ErrorBoundary key={activeNav} onNavigateOverview={() => navigate("Overview")}>
        {pages[activeNav] || pages.Overview}
      </ErrorBoundary>
    </Layout>
  );
}
