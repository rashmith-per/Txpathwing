import React, { useState } from "react";
import {
  LayoutGrid,
  Users2,
  UserCheck,
  Layers,
  BookOpen,
  Target,
  CalendarDays,
  FileText,
  Settings,
} from "lucide-react";
import PortalDashboardLayout from "../../layouts/PortalDashboardLayout/PortalDashboardLayout";
import OrgOverviewModule from "./OrgOverviewModule";
import OrgTeamsMembersModule from "./OrgTeamsMembersModule";
import OrgDepartmentsTrainingModule from "./OrgDepartmentsTrainingModule";
import OrgActivitiesEventsReportsModule from "./OrgActivitiesEventsReportsModule";
import OrgSettingsModule from "./OrgSettingsModule";
import { getActivePortalUser } from "../../../services/portalAuth/portalStorage";
import "./PortalOrganizationDashboard.css";

const ORGANIZATION_NAV_MODULES = [
  { id: "Overview", label: "Dashboard Overview", icon: LayoutGrid },
  { id: "Teams", label: "Teams", icon: Users2, badge: "18" },
  { id: "Members", label: "Members", icon: UserCheck, badge: "840" },
  { id: "Departments", label: "Departments", icon: Layers },
  { id: "Training", label: "Training Programs", icon: BookOpen, badge: "14" },
  { id: "Activities", label: "Learning Activities", icon: Target },
  { id: "Events", label: "Events", icon: CalendarDays, badge: "6" },
  { id: "Reports", label: "Reports", icon: FileText },
  { id: "Settings", label: "Settings", icon: Settings },
];

export default function PortalOrganizationDashboard() {
  const [activeModule, setActiveModule] = useState("Overview");
  const [search, setSearch] = useState("");
  const user = getActivePortalUser() || {
    username: "Rajesh",
    entityName: "Global Tech Foundation",
    category: "organization",
    categoryTitle: "Organization",
    email: "contact@globaltech.org",
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "Overview":
        return <OrgOverviewModule user={user} onNavigate={setActiveModule} />;
      case "Teams":
        return <OrgTeamsMembersModule mode="teams" search={search} />;
      case "Members":
        return <OrgTeamsMembersModule mode="members" search={search} />;
      case "Departments":
        return <OrgDepartmentsTrainingModule mode="departments" search={search} />;
      case "Training":
        return <OrgDepartmentsTrainingModule mode="training" search={search} />;
      case "Activities":
        return <OrgActivitiesEventsReportsModule mode="activities" search={search} />;
      case "Events":
        return <OrgActivitiesEventsReportsModule mode="events" search={search} />;
      case "Reports":
        return <OrgActivitiesEventsReportsModule mode="reports" search={search} />;
      case "Settings":
        return <OrgSettingsModule user={user} />;
      default:
        return <OrgOverviewModule user={user} onNavigate={setActiveModule} />;
    }
  };

  return (
    <PortalDashboardLayout
      user={user}
      category="organization"
      modules={ORGANIZATION_NAV_MODULES}
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      search={search}
      onSearchChange={setSearch}
    >
      {renderModuleContent()}
    </PortalDashboardLayout>
  );
}
