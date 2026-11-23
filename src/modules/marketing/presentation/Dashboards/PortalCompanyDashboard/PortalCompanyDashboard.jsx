import React, { useState } from "react";
import {
  LayoutGrid,
  Users,
  Layers,
  UserPlus,
  Briefcase,
  BookOpen,
  TrendingUp,
  FileText,
  Settings,
} from "lucide-react";
import PortalDashboardLayout from "../../layouts/PortalDashboardLayout/PortalDashboardLayout";
import CompanyOverviewModule from "./CompanyOverviewModule";
import CompanyEmployeesDeptsModule from "./CompanyEmployeesDeptsModule";
import CompanyRecruitmentJobsModule from "./CompanyRecruitmentJobsModule";
import CompanyTrainingPerformanceModule from "./CompanyTrainingPerformanceModule";
import CompanyReportsSettingsModule from "./CompanyReportsSettingsModule";
import { getActivePortalUser } from "../../../services/portalAuth/portalStorage";
import "./PortalCompanyDashboard.css";

const COMPANY_NAV_MODULES = [
  { id: "Overview", label: "Dashboard Overview", icon: LayoutGrid },
  { id: "Employees", label: "Employees", icon: Users, badge: "1.4k" },
  { id: "Departments", label: "Departments", icon: Layers, badge: "6" },
  { id: "Recruitment", label: "Recruitment", icon: UserPlus, badge: "186" },
  { id: "Jobs", label: "Job Openings", icon: Briefcase, badge: "24" },
  { id: "Training", label: "Training", icon: BookOpen, badge: "18" },
  { id: "Performance", label: "Performance", icon: TrendingUp },
  { id: "Reports", label: "Reports", icon: FileText },
  { id: "Settings", label: "Settings", icon: Settings },
];

export default function PortalCompanyDashboard() {
  const [activeModule, setActiveModule] = useState("Overview");
  const [search, setSearch] = useState("");
  const user = getActivePortalUser() || {
    username: "Priya",
    entityName: "Acme Technologies Inc.",
    category: "company",
    categoryTitle: "Company",
    email: "careers@acmetech.com",
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "Overview":
        return <CompanyOverviewModule user={user} onNavigate={setActiveModule} />;
      case "Employees":
        return <CompanyEmployeesDeptsModule mode="employees" search={search} />;
      case "Departments":
        return <CompanyEmployeesDeptsModule mode="departments" search={search} />;
      case "Recruitment":
        return <CompanyRecruitmentJobsModule mode="recruitment" search={search} />;
      case "Jobs":
        return <CompanyRecruitmentJobsModule mode="jobs" search={search} />;
      case "Training":
        return <CompanyTrainingPerformanceModule mode="training" search={search} />;
      case "Performance":
        return <CompanyTrainingPerformanceModule mode="performance" search={search} />;
      case "Reports":
        return <CompanyReportsSettingsModule mode="reports" user={user} search={search} />;
      case "Settings":
        return <CompanyReportsSettingsModule mode="settings" user={user} search={search} />;
      default:
        return <CompanyOverviewModule user={user} onNavigate={setActiveModule} />;
    }
  };

  return (
    <PortalDashboardLayout
      user={user}
      category="company"
      modules={COMPANY_NAV_MODULES}
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      search={search}
      onSearchChange={setSearch}
    >
      {renderModuleContent()}
    </PortalDashboardLayout>
  );
}
