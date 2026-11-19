import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";
import "./styles.css";

import { navConfig, pageDescriptions } from "./adminNavConfig";
import { AdminTopbar } from "./components/AdminTopbar";
import { AdminPageRouter } from "./components/AdminPageRouter";
import { Badge } from "./common/Badge";
import { Sidebar } from "./common/Sidebar";
import { useAdminDashboardState } from "./hooks/useAdminDashboardState";

function AdminDashboard() {
  const navigate = useNavigate();
  const state = useAdminDashboardState();

  const {
    page, setPage,
    mobileNav, setMobileNav,
    sidebarCollapsed, setSidebarCollapsed,
    notice, setNotice,
    showNotifMenu, setShowNotifMenu,
    showRoleMenu, setShowRoleMenu,
    currentRole, setCurrentRole,
    tenants, setTenants,
    instructors, setInstructors,
    users, setUsers,
    courses, setCourses,
    approvals, setApprovals,
    internships, setInternships,
    events, setEvents,
    trainingPrograms, setTrainingPrograms,
    certificates, setCertificates,
    batches, setBatches,
    payments, setPayments,
    subscriptions, setSubscriptions,
    coupons, setCoupons,
    securityEvents, setSecurityEvents,
    helpdeskTickets, setHelpdeskTickets,
    roles, setRoles,
    notifications, setNotifications,
    settings, setSettings,
    selectedTenant, setSelectedTenant,
    selectedCourse, setSelectedCourse,
    selectedModerationCourse, setSelectedModerationCourse,
    moderationCount, approvalsCount, securityAlertsCount, helpdeskOpenCount,
    systemAlerts
  } = state;

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => {
      setNotice("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [notice, setNotice]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "TX-Pathwing Admin Console";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMobileNav(false);
        setShowNotifMenu(false);
        setShowRoleMenu(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setMobileNav, setShowNotifMenu, setShowRoleMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMobileNav(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileNav]);

  function handleNavigate(targetPage) {
    setPage(targetPage);
    setMobileNav(false);
    setShowNotifMenu(false);
    setShowRoleMenu(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isPlatformAdmin");
    localStorage.removeItem("isHackathonAdmin");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const activeRecordName = useMemo(() => {
    if ((page === "Organizations" || page === "Tenants") && selectedTenant) return selectedTenant.name;
    if (page === "Courses" && selectedCourse) return selectedCourse.title;
    if (page === "Moderation" && selectedModerationCourse) return selectedModerationCourse.title;
    return null;
  }, [page, selectedTenant, selectedCourse, selectedModerationCourse]);

  return (
    <div className="app-shell">
      <AdminTopbar
        systemAlerts={systemAlerts}
        moderationCount={moderationCount}
        showNotifMenu={showNotifMenu}
        setShowNotifMenu={setShowNotifMenu}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        onNavigate={handleNavigate}
      />

      <div className="layout">
        <Sidebar
          navConfig={navConfig}
          page={page}
          onNavigate={handleNavigate}
          mobileNav={mobileNav}
          setMobileNav={setMobileNav}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          showRoleMenu={showRoleMenu}
          setShowRoleMenu={setShowRoleMenu}
          onLogout={handleLogout}
          counts={{
            tenants: tenants.length + 32,
            instructors: instructors.length,
            moderation: moderationCount,
            approvals: approvalsCount,
            security: securityAlertsCount,
            helpdesk: helpdeskOpenCount
          }}
        />

        <main className="main">
          <div className="breadcrumb">
            <span>Pathwing</span>
            <span>/</span>
            <span>Platform</span>
            <span>/</span>
            <strong
              className="clickable-crumb"
              onClick={() => {
                if (activeRecordName) {
                  setSelectedTenant(null);
                  setSelectedCourse(null);
                  setSelectedModerationCourse(null);
                }
              }}
            >
              {page}
            </strong>
            {activeRecordName && (
              <>
                <span>/</span>
                <strong className="text-blue">{activeRecordName}</strong>
              </>
            )}
          </div>

          <div className="page-content">
            {page !== "Courses" && (
              <div className="page-head">
                <div>
                  <h1>{page === "Overview" ? "Platform Overview" : page}</h1>
                  <p>{pageDescriptions[page] || "Platform Administration Console"}</p>
                </div>
                {page === "Overview" && (
                  <Badge tone="success">
                    <CheckCircle2 size={13} /> All systems operational
                  </Badge>
                )}
              </div>
            )}

            {notice && (
              <div className="adm-toast-popup" role="alert">
                <div className="adm-toast-icon">
                  <CheckCircle2 size={18} />
                </div>
                <div className="adm-toast-content">
                  <span className="adm-toast-message">{notice}</span>
                </div>
                <button
                  className="adm-toast-close"
                  onClick={() => setNotice("")}
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
                <div className="adm-toast-progress" />
              </div>
            )}

            <AdminPageRouter
              page={page}
              setPage={setPage}
              tenants={tenants}
              setTenants={setTenants}
              instructors={instructors}
              setInstructors={setInstructors}
              users={users}
              setUsers={setUsers}
              courses={courses}
              setCourses={setCourses}
              approvals={approvals}
              setApprovals={setApprovals}
              internships={internships}
              setInternships={setInternships}
              events={events}
              setEvents={setEvents}
              trainingPrograms={trainingPrograms}
              setTrainingPrograms={setTrainingPrograms}
              certificates={certificates}
              setCertificates={setCertificates}
              batches={batches}
              setBatches={setBatches}
              payments={payments}
              setPayments={setPayments}
              subscriptions={subscriptions}
              setSubscriptions={setSubscriptions}
              coupons={coupons}
              setCoupons={setCoupons}
              securityEvents={securityEvents}
              setSecurityEvents={setSecurityEvents}
              helpdeskTickets={helpdeskTickets}
              setHelpdeskTickets={setHelpdeskTickets}
              roles={roles}
              setRoles={setRoles}
              notifications={notifications}
              setNotifications={setNotifications}
              settings={settings}
              setSettings={setSettings}
              selectedTenant={selectedTenant}
              setSelectedTenant={setSelectedTenant}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedModerationCourse={selectedModerationCourse}
              setSelectedModerationCourse={setSelectedModerationCourse}
              setNotice={setNotice}
            />

            <footer>
              TX-PATHWING PLATFORM ADMIN CONSOLE
              <span>Super Admin Operations · Multi-Tenant Architecture</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
