import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { useStudentAuth } from "./hooks/useStudentAuth";
import { useStudentCourses } from "./hooks/useStudentCourses";
import { useStudentStats } from "./hooks/useStudentStats";

import DashboardSidebar from "./Overview/components/DashboardSidebar";
import DashboardHeader from "./Overview/components/DashboardHeader";
import DashboardOverviewTab from "./Overview/components/DashboardOverviewTab";
import AIAssistantTab from "./Overview/components/AIAssistantTab";
import CodingLabTab from "./Overview/components/CodingLabTab";
import CareersTab from "./Overview/components/CareersTab";
import LeaderboardTab from "./Overview/components/LeaderboardTab";
import CourseLearningDetails from "./Overview/components/CourseLearningDetails";
import RecommendedCourseModal from "./Overview/components/RecommendedCourseModal";

import MyCourses from "./MyCourses/MyCourses";
import Assessments from "./Assessments/Assessments";
import Certificates from "./Certificates/Certificates";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./styles.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

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
    syncCourses,
  } = useStudentCourses();
  const { activeCoursesCount, streakDays, learningHours } = useStudentStats(enrollments);

  const getInitialLearningCourseId = useCallback(() => {
    const path = location.pathname.toLowerCase();
    const match = path.match(/\/(?:dashboard|student)\/learn(?:ing)?\/([a-z0-9-_]+)/i);
    return match ? match[1] : null;
  }, [location.pathname]);

  const getInitialTab = useCallback(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("courses")) return "My courses";
    if (path.includes("coding-lab")) return "Coding lab";
    if (path.includes("chat-instructor") || path.includes("instructor") || path.includes("ai-assistant")) return "Chat Instructor";
    if (path.includes("careers")) return "Careers";
    if (path.includes("leaderboard") || path.includes("leaders")) return "Leaderboard";
    if (path.includes("assessments")) return "Assessments";
    if (path.includes("certificates")) return "Certificates";
    return "Dashboard";
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideoCourse, setActiveVideoCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedLearningCourseId, setSelectedLearningCourseId] = useState(getInitialLearningCourseId);
  const [selectedRecommendedCourse, setSelectedRecommendedCourse] = useState(null);
  
  const [isExamActive, setIsExamActive] = useState(false);
  const isFullscreenExamActive = activeTab === "Assessments" && isExamActive;

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  }, []);

  useEffect(() => {
    setActiveTab(getInitialTab());
    const learnId = getInitialLearningCourseId();
    if (learnId) {
      setSelectedLearningCourseId(learnId);
    } else if (!location.pathname.toLowerCase().includes("learn")) {
      setSelectedLearningCourseId(null);
    }
  }, [location.pathname, getInitialTab, getInitialLearningCourseId]);

  const handleTabClick = (tabName) => {
    setIsExamActive(false);
    setSelectedLearningCourseId(null);
    setActiveTab(tabName);
    const slug = tabName.toLowerCase().replace(/\s+/g, "-");
    navigate(slug === "dashboard" ? "/student/dashboard" : `/student/${slug}`);
  };

  const handleOpenLearningDetails = (course) => {
    const cId = course?.courseId || course?.id || course?.code;
    if (cId) {
      setSelectedLearningCourseId(cId);
      navigate(`/student/learn/${cId}`);
    }
  };

  const handleBackFromLearning = () => {
    setSelectedLearningCourseId(null);
    navigate("/student/courses");
  };

  const handleResumeLesson = (course) => {
    setActiveVideoCourse(course);
  };

  const handleQuickEnroll = async (course) => {
    const res = await enrollInCourse(course);
    showToast(res.message);
    if (res.success) {
      syncCourses();
    }
  };

  const handleOpenRecommendedDetails = (course) => {
    setSelectedRecommendedCourse(course);
  };

  const handleEnrollFromModal = async (course) => {
    const res = await enrollInCourse(course);
    showToast(res.message);
    setSelectedRecommendedCourse(null);
    if (res.success) {
      syncCourses();
    }
  };

  return (
    <div className={`student-dashboard-layout ${isFullscreenExamActive ? "fullscreen-exam-mode" : ""}`}>
      {toastMessage && (
        <aside className="dashboard-toast-notification">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </aside>
      )}

      {activeVideoCourse && (
        <VideoPlayer
          course={activeVideoCourse}
          onClose={() => setActiveVideoCourse(null)}
          onProgressUpdate={(newPercent) => {
            updateProgress(activeVideoCourse.id || activeVideoCourse.courseId, newPercent);
          }}
        />
      )}

      {selectedRecommendedCourse && (
        <RecommendedCourseModal
          course={selectedRecommendedCourse}
          onClose={() => setSelectedRecommendedCourse(null)}
          onEnroll={handleEnrollFromModal}
        />
      )}

      {!isFullscreenExamActive && (
        <DashboardSidebar
          userProfile={userProfile}
          activeTab={selectedLearningCourseId ? "My courses" : activeTab}
          onTabClick={handleTabClick}
          enrollmentsCount={enrollments.length}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          onLogout={logout}
        />
      )}

      <div className="dashboard-viewport">
        {!isFullscreenExamActive && (
          <DashboardHeader
            activeTab={selectedLearningCourseId ? "Course Learning" : activeTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenMobile={() => setMobileMenuOpen(true)}
          />
        )}

        <main className="dashboard-content-scroll">
          {selectedLearningCourseId ? (
            <CourseLearningDetails
              courseId={selectedLearningCourseId}
              onBack={handleBackFromLearning}
              onLaunchTopic={(topicCourse) => setActiveVideoCourse(topicCourse)}
              showToast={showToast}
            />
          ) : (
            <>
              {activeTab === "My courses" && (
                <MyCourses
                  onResumeCourse={handleResumeLesson}
                  onOpenCourseDetails={handleOpenLearningDetails}
                />
              )}

              {(activeTab === "Chat Instructor" || activeTab === "AI assistant") && (
                <AIAssistantTab userName={userProfile.name} />
              )}

              {activeTab === "Coding lab" && (
                <CodingLabTab onOpenSandbox={() => showToast("Launching sandbox environment...")} />
              )}

              {activeTab === "Careers" && <CareersTab />}

              {activeTab === "Leaderboard" && (
                <LeaderboardTab
                  currentUserName={userProfile?.name}
                  currentUserEmail={userProfile?.email}
                />
              )}

              {activeTab === "Assessments" && (
                <Assessments
                  onBack={() => handleTabClick("Dashboard")}
                  onExamActiveChange={(active) => setIsExamActive(active)}
                />
              )}

              {activeTab === "Certificates" && (
                <Certificates userEmail={userProfile?.email} userName={userProfile?.name} />
              )}

              {activeTab === "Dashboard" && (
                <DashboardOverviewTab
                  userProfile={userProfile}
                  streakDays={streakDays}
                  learningHours={learningHours}
                  activeCoursesCount={activeCoursesCount}
                  enrollments={enrollments}
                  filteredEnrollments={filteredEnrollments}
                  recommendedCourses={recommendedCourses}
                  courseFilter={courseFilter}
                  onCourseFilterChange={setCourseFilter}
                  onResumeLesson={handleResumeLesson}
                  onOpenLearningDetails={handleOpenLearningDetails}
                  onQuickEnroll={handleQuickEnroll}
                  onOpenRecommendedDetails={handleOpenRecommendedDetails}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
