import React, { useState } from "react";
import {
  LayoutGrid,
  Layers,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Award,
  Briefcase,
  FileText,
} from "lucide-react";
import PortalDashboardLayout from "../../layouts/PortalDashboardLayout/PortalDashboardLayout";
import InstOverviewModule from "./InstOverviewModule";
import InstDepartmentsModule from "./InstDepartmentsModule";
import InstStudentsFacultyModule from "./InstStudentsFacultyModule";
import InstCoursesBatchesModule from "./InstCoursesBatchesModule";
import InstAttendanceProgramsModule from "./InstAttendanceProgramsModule";
import InstPlacementsReportsSettingsModule from "./InstPlacementsReportsSettingsModule";
import { getActivePortalUser } from "../../../services/portalAuth/portalStorage";
import "./PortalInstitutionDashboard.css";

const INSTITUTION_NAV_MODULES = [
  { id: "Overview", label: "Dashboard Overview", icon: LayoutGrid },
  { id: "Departments", label: "Departments", icon: Layers, badge: "8" },
  { id: "Students", label: "Students", icon: GraduationCap, badge: "3.4k" },
  { id: "Faculty", label: "Faculty", icon: Users, badge: "142" },
  { id: "Courses", label: "Courses", icon: BookOpen, badge: "64" },
  { id: "Batches", label: "Batches", icon: Calendar },
  { id: "Attendance", label: "Attendance", icon: CheckCircle },
  { id: "Programs", label: "Academic Programs", icon: Award },
  { id: "Placements", label: "Placements", icon: Briefcase, badge: "91%" },
  { id: "Reports", label: "Reports", icon: FileText },
];

export default function PortalInstitutionDashboard() {
  const [activeModule, setActiveModule] = useState("Overview");
  const [search, setSearch] = useState("");
  const user = getActivePortalUser() || {
    username: "Administrator",
    entityName: "ABC Engineering College",
    category: "institution",
    categoryTitle: "Institution",
    email: "admin@institution.edu",
    logo: localStorage.getItem("institutionLogo") || localStorage.getItem("userLogo") || "",
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "Overview":
        return <InstOverviewModule user={user} onNavigate={setActiveModule} />;
      case "Departments":
        return <InstDepartmentsModule search={search} />;
      case "Students":
        return <InstStudentsFacultyModule mode="students" search={search} />;
      case "Faculty":
        return <InstStudentsFacultyModule mode="faculty" search={search} />;
      case "Courses":
        return <InstCoursesBatchesModule mode="courses" search={search} />;
      case "Batches":
        return <InstCoursesBatchesModule mode="batches" search={search} />;
      case "Attendance":
        return <InstAttendanceProgramsModule mode="attendance" search={search} />;
      case "Programs":
        return <InstAttendanceProgramsModule mode="programs" search={search} />;
      case "Placements":
        return <InstPlacementsReportsSettingsModule mode="placements" user={user} search={search} />;
      case "Reports":
        return <InstPlacementsReportsSettingsModule mode="reports" user={user} search={search} />;
      case "Settings":
        return <InstPlacementsReportsSettingsModule mode="settings" user={user} search={search} />;
      default:
        return <InstOverviewModule user={user} onNavigate={setActiveModule} />;
    }
  };

  return (
    <PortalDashboardLayout
      user={user}
      category={user?.category || "institution"}
      modules={INSTITUTION_NAV_MODULES}
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      search={search}
      onSearchChange={setSearch}
    >
      {renderModuleContent()}
    </PortalDashboardLayout>
  );
}
