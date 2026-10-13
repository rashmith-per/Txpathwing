import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { useStudentAuth } from "./hooks/useStudentAuth";
import { useStudentCourses } from "./hooks/useStudentCourses";
import { useStudentStats } from "./hooks/useStudentStats";

import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import WelcomeHero from "./components/WelcomeHero";
import StatsCards from "./components/StatsCards";
import ContinueLearning from "./components/ContinueLearning";
import RecommendedSection from "./components/RecommendedSection";
import SkillProfileSection from "./components/SkillProfileSection";
import ComingUpSection from "./components/ComingUpSection";
import AchievementsSection from "./components/AchievementsSection";
import AIAssistantTab from "./components/AIAssistantTab";
import CodingLabTab from "./components/CodingLabTab";
import CareersTab from "./components/CareersTab";

import MyCourses from "../MyCourses/MyCourses";
import VideoPlayer from "./VideoPlayer";
import "./Dashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Custom Modular Hooks
  const { userProfile, logout } = useStudentAuth();
  const {
    enrollments,
    filteredEnrollments,
    recommendedCourses,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    enrollInCourse,
    updateProgress,
  } = useStudentCourses();
  const { activeCoursesCount, streakDays, learningHours } = useStudentStats(enrollments);

  // Tab State & Deep Link Routing
  const getInitialTab = useCallback(() => {
    const path = location.pathname;
    if (path.includes("courses")) return "My courses";
    if (path.includes("coding-lab")) return "Coding lab";
    if (path.includes("ai-assistant")) return "AI assistant";
    if (path.includes("careers")) return "Careers";
    return "Dashboard";
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideoCourse, setActiveVideoCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  }, []);

  // Synchronize Tab with Location
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [getInitialTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    if (tabName === "Dashboard") navigate("/dashboard");
    else if (tabName === "My courses") navigate("/dashboard/courses");
    else if (tabName === "AI assistant") navigate("/dashboard/ai-assistant");
    else if (tabName === "Coding lab") navigate("/dashboard/coding-lab");
    else if (tabName === "Careers") navigate("/dashboard/careers");
  };

  const handleResumeLesson = (courseObj) => {
    const target = courseObj || enrollments[0];
    if (typeof target === "string") {
      const found = enrollments.find(
        (e) => e.courseId === target || e.id === target || e.courseCode === target
      );
      setActiveVideoCourse(found || enrollments[0]);
    } else {
      setActiveVideoCourse(target);
    }
  };

  const handleQuickEnroll = (course) => {
    const res = enrollInCourse(course);
    showToast(res.message);
  };
