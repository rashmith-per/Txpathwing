
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "./Layout/Layout.jsx";
import Overview from "./Overview/Overview.jsx";
import Learners from "./Learners/Learners.jsx";
import Learnings from "./Learnings/Learnings.jsx";
import Programmes from "./Programmes/Programmes.jsx";
import Events from "./Events/Events.jsx";
import Compliance from "./Compliance/Compliance.jsx";
import Reports from "./Reports/Reports.jsx";

import "./InstitutionDashboard.css";

export default function InstitutionDashboard() {
  const navigateTo = useNavigate();

  const [activeNav, setActiveNav] = useState("Overview");
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
    setActiveNav(page);
    setMobileNavOpen(false);
    setSearch("");
    setSelectedEvent(null);
  }, []);

  // Event selection
  const selectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setActiveNav("Events");
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
      {pages[activeNav]}
    </Layout>
  );
}
