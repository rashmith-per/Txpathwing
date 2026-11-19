import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Award,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  IndianRupee,
  Layers,
  LayoutDashboard,
  Radio,
  Settings as SettingsIcon,
  Star,
  Users
} from "lucide-react";
import "./styles.css";

import { Sidebar } from "./common/Sidebar";
import { InstructorTopbar } from "./components/InstructorTopbar";
import { InstructorContentDispatcher } from "./components/InstructorContentDispatcher";
import { useInstructorProfile } from "./hooks/useInstructorProfile";
import { useInstructorData } from "./hooks/useInstructorData";

export function InstructorDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState("Dashboard");
  const [assessmentSubView, setAssessmentSubView] = useState("hub");
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingOpenCreateCourse, setPendingOpenCreateCourse] = useState(false);

  const { profile, setProfile, instructorIdentity, handleUpdateProfile } = useInstructorProfile();

  const {
    courses,
    earnings,
    attentionItems,
    learners,
    reviews,
    assignments,
    batches,
    batchAssessments,
    assessmentAssignments,
    studentEvaluations,
    liveSessions,
    qna,
    certificates,
    analytics,
    activeCoursesCount,
    handleCreateCourse,
    handleUpdateCourse,
    handleDeleteOrArchiveCourse,
    handleRestoreCourse,
    handleSyncCourseSyllabus,
    handleAddBatch,
    handleDeleteBatch,
    handleUpdateBatch,
    handleGradeAssignment,
    handleCreateBatchAssessment,
    handleAssignAssessmentStudents,
    handleSaveStudentEvaluation,
    handleAddLiveSession,
    handleIssueCertificate,
    handleAnswerQnA,
    handleResolveAttentionItem
  } = useInstructorData({ instructorIdentity, setProfile });

  const navConfig = useMemo(() => [
    {
      group: "TEACH & CURRICULUM",
      items: [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "My Courses", icon: BookOpen, badge: activeCoursesCount, badgeTone: "blue" },
        { name: "Batches", icon: Layers, badge: batches.length, badgeTone: "neutral" }
      ]
    },
    {
      group: "STUDENTS & GRADING",
      items: [
        {
          name: "Learners",
          icon: Users,
          badge: learners.length > 0 ? learners.length : 1428,
          badgeTitle: `${(learners.length > 0 ? learners.length : 1428).toLocaleString("en-IN")} Enrolled Learners`,
          badgeTone: "neutral"
        },
        {
          name: "Assessment & Evaluation",
          icon: ClipboardCheck,
          badge: batchAssessments.length || undefined,
          badgeTone: "blue"
        },
        {
          name: "Live Sessions",
          icon: Radio,
          badge: liveSessions.filter((item) => item.status === "Upcoming").length || undefined,
          badgeTone: "danger"
        },
        { name: "Certificates", icon: Award, badge: certificates.length, badgeTone: "neutral" }
      ]
    },
    {
      group: "COMMUNITY & INSIGHTS",
      items: [
        {
          name: "Q&A Forum",
          icon: HelpCircle,
          badge: qna.filter((item) => item.status === "Pending").length || undefined,
          badgeTone: "warning"
        },
        { name: "Reviews", icon: Star, badge: "4.9★", badgeTone: "purple" },
        { name: "Analytics", icon: Activity },
        { name: "Revenue Analytics", icon: IndianRupee },
        { name: "Settings", icon: SettingsIcon }
      ]
    }
  ], [activeCoursesCount, batches.length, learners.length, batchAssessments.length, liveSessions, certificates.length, qna]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Pathwing Instructor Console · ${page}`;
    return () => {
      document.title = previousTitle;
    };
  }, [page]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileNav(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

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

  const handleNavigate = (targetPage) => {
    if (targetPage === "Assessment") {
      setPage("Assessment & Evaluation");
      setAssessmentSubView("assessments");
    } else if (targetPage === "Assessment & Evaluation") {
      setPage("Assessment & Evaluation");
      setAssessmentSubView("hub");
    } else {
      setPage(targetPage);
    }
    setMobileNav(false);
  };

  return (
    <div className="instructor-app-shell blue-white-theme">
      <div className="ambient-glow-orb glow-orb-1" aria-hidden="true" />
      <div className="ambient-glow-orb glow-orb-2" aria-hidden="true" />
      <div className="ambient-glow-orb glow-orb-3" aria-hidden="true" />

      <InstructorTopbar
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        onNavigate={setPage}
      />

      <div className="instructor-layout">
        <Sidebar
          navConfig={navConfig}
          page={page}
          onNavigate={handleNavigate}
          mobileNav={mobileNav}
          setMobileNav={setMobileNav}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          instructorProfile={profile}
          onLogout={handleLogout}
        />

        <InstructorContentDispatcher
          page={page}
          profile={profile}
          courses={courses}
          earnings={earnings}
          attentionItems={attentionItems}
          learners={learners}
          reviews={reviews}
          assignments={assignments}
          batches={batches}
          batchAssessments={batchAssessments}
          assessmentAssignments={assessmentAssignments}
          studentEvaluations={studentEvaluations}
          liveSessions={liveSessions}
          qna={qna}
          certificates={certificates}
          analytics={analytics}
          assessmentSubView={assessmentSubView}
          setAssessmentSubView={setAssessmentSubView}
          pendingOpenCreateCourse={pendingOpenCreateCourse}
          setPendingOpenCreateCourse={setPendingOpenCreateCourse}
          handleNavigate={handleNavigate}
          handleCreateCourse={handleCreateCourse}
          handleUpdateCourse={handleUpdateCourse}
          handleDeleteOrArchiveCourse={handleDeleteOrArchiveCourse}
          handleRestoreCourse={handleRestoreCourse}
          handleSyncCourseSyllabus={handleSyncCourseSyllabus}
          handleAddBatch={handleAddBatch}
          handleDeleteBatch={handleDeleteBatch}
          handleUpdateBatch={handleUpdateBatch}
          handleGradeAssignment={handleGradeAssignment}
          handleCreateBatchAssessment={handleCreateBatchAssessment}
          handleAssignAssessmentStudents={handleAssignAssessmentStudents}
          handleSaveStudentEvaluation={handleSaveStudentEvaluation}
          handleAddLiveSession={handleAddLiveSession}
          handleIssueCertificate={handleIssueCertificate}
          handleAnswerQnA={handleAnswerQnA}
          handleResolveAttentionItem={handleResolveAttentionItem}
          handleUpdateProfile={handleUpdateProfile}
        />
      </div>
    </div>
  );
}

export default InstructorDashboard;
