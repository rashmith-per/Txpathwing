import React from "react";
import { Overview } from "../Overview/Overview";
import { Instructors } from "../Instructors/Instructors";
import { Tenants as OrganizationsModule } from "../Tenants/Tenants";
import { UsersModule } from "../Users/Users";
import { Courses } from "../Courses/Courses";
import { Moderation } from "../Moderation/Moderation";
import { Approvals } from "../Approvals/Approvals";
import Internships from "../Internships/Internships.jsx";
import { Events } from "../Events/Events";
import { TrainingPrograms } from "../TrainingPrograms/TrainingPrograms";
import { Certificates } from "../Certificates/Certificates";
import { Batches } from "../Batches/Batches";
import { Payments } from "../Payments/Payments";
import { Subscriptions } from "../Subscriptions/Subscriptions";
import Coupons from "../Coupons/Coupons.jsx";
import { Reports } from "../ReportsAnalytics/ReportsAnalytics";
import { SecurityAudit } from "../SecurityAudit/SecurityAudit";
import { RolesPermissions } from "../RolesPermissions/RolesPermissions";
import { Notifications } from "../Notifications/Notifications";
import { Helpdesk } from "../Helpdesk/Helpdesk";
import { Settings } from "../Settings/Settings";

export function AdminPageRouter({
  page,
  setPage,
  tenants,
  setTenants,
  instructors,
  setInstructors,
  users,
  setUsers,
  courses,
  setCourses,
  approvals,
  setApprovals,
  internships,
  setInternships,
  events,
  setEvents,
  trainingPrograms,
  setTrainingPrograms,
  certificates,
  setCertificates,
  batches,
  setBatches,
  payments,
  setPayments,
  subscriptions,
  setSubscriptions,
  coupons,
  setCoupons,
  securityEvents,
  setSecurityEvents,
  helpdeskTickets,
  setHelpdeskTickets,
  roles,
  setRoles,
  notifications,
  setNotifications,
  settings,
  setSettings,
  selectedTenant,
  setSelectedTenant,
  selectedCourse,
  setSelectedCourse,
  selectedModerationCourse,
  setSelectedModerationCourse,
  setNotice
}) {
  switch (page) {
    case "Overview":
      return (
        <Overview
          tenants={tenants}
          courses={courses}
          users={users}
          payments={payments}
          helpdeskTickets={helpdeskTickets}
          setPage={setPage}
          onSelectTenant={(t) => {
            setSelectedTenant(t);
            setPage("Organizations");
          }}
          onSelectCourse={(c) => {
            setSelectedModerationCourse(c);
            setPage("Moderation");
          }}
        />
      );

    case "Organizations":
    case "Tenants":
      return (
        <OrganizationsModule
          tenants={tenants}
          setTenants={setTenants}
          selectedTenant={selectedTenant}
          setSelectedTenant={setSelectedTenant}
          setNotice={setNotice}
        />
      );

    case "Instructors":
    case "Instructor":
      return (
        <Instructors
          instructors={instructors}
          setInstructors={setInstructors}
          setNotice={setNotice}
          setPage={setPage}
        />
      );

    case "Users":
      return (
        <UsersModule
          users={users}
          setUsers={setUsers}
          tenants={tenants}
          setNotice={setNotice}
        />
      );

    case "Courses":
      return (
        <Courses
          courses={courses}
          setCourses={setCourses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          setNotice={setNotice}
          setPage={setPage}
        />
      );

    case "Moderation":
      return (
        <Moderation
          courses={courses}
          setCourses={setCourses}
          selectedModerationCourse={selectedModerationCourse}
          setSelectedModerationCourse={setSelectedModerationCourse}
          setNotice={setNotice}
        />
      );

    case "Approvals":
      return (
        <Approvals
          approvals={approvals}
          setApprovals={setApprovals}
          setNotice={setNotice}
        />
      );

    case "Internships":
      return (
        <Internships
          internships={internships}
          setInternships={setInternships}
          setNotice={setNotice}
        />
      );

    case "Events":
      return (
        <Events
          events={events}
          setEvents={setEvents}
          setNotice={setNotice}
        />
      );

    case "Training programs":
      return (
        <TrainingPrograms
          trainingPrograms={trainingPrograms}
          setTrainingPrograms={setTrainingPrograms}
          setNotice={setNotice}
          setPage={setPage}
        />
      );

    case "Certificates":
      return (
        <Certificates
          certificates={certificates}
          setCertificates={setCertificates}
          setNotice={setNotice}
        />
      );

    case "Batches":
      return (
        <Batches
          batches={batches}
          setBatches={setBatches}
          setNotice={setNotice}
        />
      );

    case "Payments":
      return (
        <Payments
          payments={payments}
          setPayments={setPayments}
          setNotice={setNotice}
        />
      );

    case "Subscriptions":
      return (
        <Subscriptions
          subscriptions={subscriptions}
          tenants={tenants}
          setTenants={setTenants}
          setNotice={setNotice}
        />
      );

    case "Coupons":
      return (
        <Coupons
          coupons={coupons}
          setCoupons={setCoupons}
          setNotice={setNotice}
        />
      );

    case "Reports & analytics":
      return (
        <Reports
          tenants={tenants}
          courses={courses}
          setNotice={setNotice}
        />
      );

    case "Security & audit":
      return (
        <SecurityAudit
          securityEvents={securityEvents}
          setSecurityEvents={setSecurityEvents}
          setNotice={setNotice}
        />
      );

    case "Roles & permissions":
      return (
        <RolesPermissions
          roles={roles}
          setRoles={setRoles}
          setNotice={setNotice}
        />
      );

    case "Notifications":
      return (
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
          setNotice={setNotice}
        />
      );

    case "Helpdesk":
      return (
        <Helpdesk
          helpdeskTickets={helpdeskTickets}
          setHelpdeskTickets={setHelpdeskTickets}
          setNotice={setNotice}
        />
      );

    case "Settings":
      return (
        <Settings
          settings={settings}
          setSettings={setSettings}
          setNotice={setNotice}
        />
      );

    default:
      return null;
  }
}
