import { useState, useEffect, useMemo } from "react";
import {
  initialTenants,
  initialInstructors,
  initialUsers,
  initialCourses,
  initialApprovals,
  initialInternships,
  initialEvents,
  initialTrainingPrograms,
  initialCertificates,
  initialBatches,
  initialPayments,
  initialSubscriptions,
  initialCoupons,
  initialSecurityEvents,
  initialHelpdeskTickets,
  initialRoles,
  initialNotifications,
  initialPlatformSettings
} from "../data/mockData";

export function useAdminDashboardState() {
  const [page, setPage] = useState("Overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notice, setNotice] = useState("");
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [currentRole, setCurrentRole] = useState("Super admin — Platform");

  const [tenants, setTenants] = useState(initialTenants);
  const [instructors, setInstructors] = useState(() => {
    try {
      const saved = localStorage.getItem("tx_admin_instructors_active");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialInstructors;
  });

  useEffect(() => {
    try {
      localStorage.setItem("tx_admin_instructors_active", JSON.stringify(instructors));
    } catch (e) {
      console.error(e);
    }
  }, [instructors]);

  const [users, setUsers] = useState(initialUsers);
  const [courses, setCourses] = useState(() => {
    try {
      localStorage.removeItem("tx_admin_courses");
      const saved = localStorage.getItem("tx_admin_courses_active");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialCourses;
  });

  useEffect(() => {
    try {
      localStorage.setItem("tx_admin_courses_active", JSON.stringify(courses));
    } catch (e) {
      console.error(e);
    }
  }, [courses]);

  const [approvals, setApprovals] = useState(initialApprovals);
  const [internships, setInternships] = useState(initialInternships);
  const [events, setEvents] = useState(initialEvents);
  const [trainingPrograms, setTrainingPrograms] = useState(initialTrainingPrograms);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [batches, setBatches] = useState(initialBatches);
  const [payments, setPayments] = useState(initialPayments);
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [securityEvents, setSecurityEvents] = useState(initialSecurityEvents);
  const [helpdeskTickets, setHelpdeskTickets] = useState(initialHelpdeskTickets);
  const [roles, setRoles] = useState(initialRoles);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [settings, setSettings] = useState(initialPlatformSettings);

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModerationCourse, setSelectedModerationCourse] = useState(null);

  const moderationCount = courses.filter((c) => c.status === "Overdue" || c.status === "Pending Review").length;
  const approvalsCount = approvals.filter((a) => a.status === "Pending" || a.status === "Overdue").length;
  const securityAlertsCount = securityEvents.filter((e) => e.severity === "High" || e.severity === "Critical").length;
  const helpdeskOpenCount = helpdeskTickets.filter((t) => t.status === "Open" || t.status === "In Progress").length;

  const systemAlerts = useMemo(() => [
    { id: 1, title: `${moderationCount} Courses in Moderation`, sub: "Oldest past SLA window", link: "Moderation" },
    { id: 2, title: "Organization Seat Alert: TX Hub Academy", sub: "At 99% of contracted capacity", link: "Organizations" },
    { id: 3, title: `${securityAlertsCount} Open Security Alerts`, sub: "Sandbox queue depth spike", link: "Security & audit" }
  ], [moderationCount, securityAlertsCount]);

  return {
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
  };
}
