import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import txIcon from "../../../../../assets/tx-icon.jpg";
import {
  Activity, Award, BookOpen, Calendar, CheckCircle2,
  ClipboardCheck, ExternalLink, Globe, HelpCircle, Layers,
  LayoutDashboard, LogOut, Mail, Menu, MessageSquare, Plus,
  Radio, Settings as SettingsIcon, ShieldCheck, Sparkles, Star,
  TrendingUp, Users, Video, X
} from "lucide-react";
import "./styles.css";

// Canonical Datasets
import {
  instructorProfile as initialProfile,
  initialEarningsData,
  initialAttentionItems,
  initialInstructorCourses,
  initialLearners,
  initialReviews,
  initialBatches,
  initialLiveSessions,
  initialQnA,
  initialCertificates,
  initialCourseAnalytics
} from "./data/mockData";

// Components & Modules (Advanced Monolithic Model)
import { Sidebar } from "./common/Sidebar";
import { Badge } from "./common/Badge";
import { Overview } from "./Overview/Overview";
import { MyCourses } from "./MyCourses/MyCourses";
import { AICourseBuilder } from "./AICourseBuilder/AICourseBuilder";
import { Batches } from "./Batches/Batches";
// Assessment & Evaluation Module Orchestrator
import {
  ASSESSMENT_STORAGE_KEYS,
  assignStudentsToAssessment,
  normalizeText
} from "./Assessments/assessmentUtils";
import { AssessmentEvaluationModule } from "./Evaluation/AssessmentEvaluationModule";

import {
  EVALUATION_STORAGE_KEYS,
  upsertStudentEvaluation
} from "./Evaluation/evaluationUtils";
import { Learners } from "./Learners/Learners";
import { LiveSessions } from "./LiveSessions/LiveSessions";
import { Certificates } from "./Certificates/Certificates";
import { QnA } from "./QnA/QnA";
import { Reviews } from "./Reviews/Reviews";
import { Analytics } from "./Analytics/Analytics";
import { Settings } from "./Settings/Settings";

export function InstructorDashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState("Dashboard");
  const [assessmentSubView, setAssessmentSubView] = useState("hub");
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Master Stateful Datasets
  const [profile, setProfile] = useState(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    const effectiveEmail = storedEmail || initialProfile.email;
    const effectiveName = storedName
      ? storedName.replace(" (Lead Instructor)", "")
      : (storedEmail && !storedEmail.includes("ramana") ? storedEmail.split("@")[0] : initialProfile.name);
    const initials = effectiveName
      .replace(/Dr\.\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "RR";

    return {
      ...initialProfile,
      email: effectiveEmail,
      name: effectiveName,
      avatarInitials: initials,
    };
  });

  const [courses, setCourses] = useState(initialInstructorCourses);
  const [earnings, setEarnings] = useState(initialEarningsData);
  const [attentionItems, setAttentionItems] = useState(initialAttentionItems);
  const [learners, setLearners] = useState(initialLearners);
  const [reviews, setReviews] = useState(initialReviews);
  const [batches, setBatches] = useState(() => {
    try {
      const saved = localStorage.getItem("instructor_batches");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Remove legacy mock cohorts so user starts strictly with their own created batches
          const filtered = parsed.filter(
            (b) => b && !["batch-1", "batch-2", "batch-3", "batch-4"].includes(b.id) && b.name
          );
          // Deduplicate by name
          const seen = new Set();
          const unique = [];
          for (const item of filtered) {
            const key = item.name.trim().toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              unique.push(item);
            }
          }
          return unique;
        }
      }
    } catch (e) {
      console.warn("Failed to load batches from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("instructor_batches", JSON.stringify(batches));
    } catch (e) {
      console.warn("Failed to persist batches to localStorage", e);
    }
  }, [batches]);
  const [batchAssessments, setBatchAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSESSMENT_STORAGE_KEYS.ASSESSMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load batch assessments from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        ASSESSMENT_STORAGE_KEYS.ASSESSMENTS,
        JSON.stringify(batchAssessments)
      );
    } catch (e) {
      console.warn("Failed to persist batch assessments to localStorage", e);
    }
  }, [batchAssessments]);

  const [assessmentAssignments, setAssessmentAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSESSMENT_STORAGE_KEYS.ASSIGNMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load assessment assignments from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        ASSESSMENT_STORAGE_KEYS.ASSIGNMENTS,
        JSON.stringify(assessmentAssignments)
      );
    } catch (e) {
      console.warn("Failed to persist assessment assignments to localStorage", e);
    }
  }, [assessmentAssignments]);

  const [studentEvaluations, setStudentEvaluations] = useState(() => {
    try {
      const saved = localStorage.getItem(EVALUATION_STORAGE_KEYS.EVALUATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load student evaluations from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        EVALUATION_STORAGE_KEYS.EVALUATIONS,
        JSON.stringify(studentEvaluations)
      );
    } catch (e) {
      console.warn("Failed to persist student evaluations to localStorage", e);
    }
  }, [studentEvaluations]);

  const [liveSessions, setLiveSessions] = useState(initialLiveSessions);
  const [qna, setQnA] = useState(initialQnA);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [analytics, setAnalytics] = useState(initialCourseAnalytics);

  // Sync profile when localStorage changes or authChanged fires
  useEffect(() => {
    const handleStorageUpdate = () => {
      const storedEmail = localStorage.getItem("userEmail");
      const storedName = localStorage.getItem("userName");
      if (storedEmail) {
        setProfile((prev) => ({
          ...prev,
          email: storedEmail,
          name: storedName ? storedName.replace(" (Lead Instructor)", "") : prev.name,
          avatarInitials: (storedName || storedEmail)
            .replace(/Dr\.\s*/i, "")
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "RR"
        }));
      }
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("authChanged", handleStorageUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("authChanged", handleStorageUpdate);
    };
  }, []);

  // Dynamic Navigation Configuration for Advanced Monolithic Model
  const navConfig = useMemo(() => [
    {
      group: "TEACH & CURRICULUM",
      items: [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "My Courses", icon: BookOpen, badge: courses.length, badgeTone: "blue" },
        { name: "AI Course Builder", icon: Sparkles },
        { name: "Batches", icon: Layers, badge: batches.length, badgeTone: "neutral" }
      ]
    },
    {
      group: "STUDENTS & GRADING",
      items: [
        { name: "Learners", icon: Users, badge: learners.length > 0 ? learners.length : 1428, badgeTone: "neutral" },
        { name: "Assessment & Evaluation", icon: ClipboardCheck, badge: batchAssessments.length || undefined, badgeTone: "blue" },
        { name: "Live Sessions", icon: Radio, badge: liveSessions.filter(s => s.status === "Upcoming").length || undefined, badgeTone: "danger" },
        { name: "Certificates", icon: Award, badge: certificates.length, badgeTone: "neutral" }
      ]
    },
    {
      group: "COMMUNITY & INSIGHTS",
      items: [
        { name: "Q&A Forum", icon: HelpCircle, badge: qna.filter(q => q.status === "Pending").length || undefined, badgeTone: "warning" },
        { name: "Reviews", icon: Star, badge: "4.9★", badgeTone: "purple" },
        { name: "Analytics", icon: Activity },
        { name: "Settings", icon: SettingsIcon }
      ]
    }
  ], [courses.length, batches.length, learners.length, batchAssessments.length, liveSessions, qna, certificates.length]);

  // Sync document title
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Pathwing Instructor Console · ${page}`;
    return () => {
      document.title = prevTitle;
    };
  }, [page]);

  // Keyboard navigation (Escape to close menus/drawers)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMobileNav(false);
        setShowNotifMenu(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll on mobile open
  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

  // Session Logout Handler
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
    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  // State Action Handlers
  const handleSaveAICourse = (newCourse) => {
    setCourses((prev) => {
      if (prev.some((c) => c.id === newCourse.id)) return prev;
      return [newCourse, ...prev];
    });

    setProfile((prev) => ({
      ...prev,
      publishedCoursesCount: prev.publishedCoursesCount + 1
    }));
  };

  const handleAddBatch = (newBatch) => {
    setBatches((prev) => {
      // Prevent duplicates by ID or name
      if (
        prev.some(
          (b) =>
            b.id === newBatch.id ||
            b.name.trim().toLowerCase() === newBatch.name.trim().toLowerCase()
        )
      ) {
        return prev;
      }
      return [newBatch, ...prev];
    });
  };

  const handleDeleteBatch = (batchId) => {
    setBatches((prev) => prev.filter((b) => b.id !== batchId));

    setBatchAssessments((prev) => prev.filter((a) => a.batchId !== batchId));
    setAssessmentAssignments((prev) => prev.filter((r) => r.batchId !== batchId));
    setStudentEvaluations((prev) => prev.filter((ev) => ev.batchId !== batchId));
  };

  const handleUpdateBatch = (updatedBatch) => {
    setStudentEvaluations((prev) =>
      prev.map((ev) =>
        ev.batchId === updatedBatch.id
          ? {
              ...ev,
              batchName: updatedBatch.name ?? ev.batchName,
              courseName: updatedBatch.courseName ?? ev.courseName
            }
          : ev
      )
    );
    setBatches((prev) =>
      prev.map((b) => (b.id === updatedBatch.id ? { ...b, ...updatedBatch } : b))
    );

    setBatchAssessments((prev) =>
      prev.map((a) =>
        a.batchId === updatedBatch.id
          ? {
              ...a,
              batchName: updatedBatch.name ?? a.batchName,
              courseId: updatedBatch.courseId ?? a.courseId,
              courseName: updatedBatch.courseName ?? a.courseName
            }
          : a
      )
    );
  };

  const handleCreateBatchAssessment = (newAssessment) => {

    setBatchAssessments((prev) => {
      if (
        prev.some(
          (a) =>
            a.id === newAssessment.id ||
            (a.batchId === newAssessment.batchId &&
              (a.kind || "assessment") === (newAssessment.kind || "assessment") &&
              normalizeText(a.title) === normalizeText(newAssessment.title))
        )
      ) {
        return prev;
      }
      return [newAssessment, ...prev];
    });
  };

  const handleAssignAssessmentStudents = ({ assessmentId, batchId, students }) => {
    setAssessmentAssignments((prev) =>
      assignStudentsToAssessment(prev, { assessmentId, batchId, students }).assignments
    );
  };

  const handleSaveStudentEvaluation = (payload) => {
    const result = upsertStudentEvaluation(studentEvaluations, payload);
    if (!result.error) {
      setStudentEvaluations(result.evaluations);
    }
    return result;
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

  const handleAddLiveSession = (newSess) => {
    setLiveSessions((prev) => [newSess, ...prev]);
  };

  const handleIssueCertificate = (newCert) => {
    setCertificates((prev) => [newCert, ...prev]);
  };

  const handleAnswerQnA = (qnaId, answer) => {
    setQnA((prev) =>
      prev.map((q) => (q.id === qnaId ? { ...q, answer, status: "Answered" } : q))
    );
  };

  const handleUpdateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const handleResolveAttentionItem = (itemId) => {
    setAttentionItems((prev) => prev.filter((item) => item.id !== itemId));
    setProfile((prev) => ({
      ...prev,
      openQuestionsCount: Math.max(0, prev.openQuestionsCount - 1)
    }));
  };

  return (
    <div className="instructor-app-shell blue-white-theme">
      {/* Atmospheric Ambient Glow Background */}
      <div className="ambient-glow-orb glow-orb-1" aria-hidden="true" />
      <div className="ambient-glow-orb glow-orb-2" aria-hidden="true" />
      <div className="ambient-glow-orb glow-orb-3" aria-hidden="true" />

      {/* Top Navigation Bar */}
      <header className="instructor-topbar">
        <div className="brand-cluster">
          <Link to="/" className="topbar-brand-link" title="Return to Website Home">
            <div className="topbar-brand-mark">
              <img src={txIcon} alt="TX Pathwing Logo" className="brand-logo-img" />
            </div>
            <div className="topbar-brand-name">
              <span className="brand-title-gradient">TX Pathwing</span>
            </div>
          </Link>
        </div>

        {/* Topbar Right Actions */}
        <div className="topbar-right">
          <Link to="/" className="topbar-link-btn" title="Go to Website">
            <Globe size={15} />
            <span>Visit Website</span>
          </Link>

          <Link to="/admin-dashboard" className="topbar-link-btn" title="Switch to Platform Admin">
            <ShieldCheck size={15} />
            <span>Platform Console</span>
          </Link>

          {/* Logged in Instructor Email */}
          <div className="topbar-user-pill" title={`Signed in as ${profile.email}`}>
            <div className="topbar-user-avatar">
              <Mail size={13} />
            </div>
            <div className="topbar-user-info">
              <span className="topbar-user-email">{profile.email}</span>
            </div>
          </div>

          {/* Mobile Drawer Hamburger */}
          <button
            className="menu-toggle"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="instructor-layout">
        {/* Sidebar */}
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

        {/* View Router Main Area (Monolithic Multi-Module Dispatcher) */}
        <main className="instructor-main">
          {page === "Dashboard" && (
            <Overview
              instructorProfile={profile}
              earningsData={earnings}
              attentionItems={attentionItems}
              reviews={reviews}
              onNavigate={handleNavigate}
              onResolveItem={handleResolveAttentionItem}
            />
          )}

          {page === "My Courses" && (
            <MyCourses
              courses={courses}
              onNavigate={handleNavigate}
              onSelectCourse={(c) => {
                setPage("AI Course Builder");
              }}
    
            />
          )}

          {page === "AI Course Builder" && (
            <AICourseBuilder
              onSaveCourse={handleSaveAICourse}
              onNavigate={handleNavigate}
            />
          )}

          {page === "Batches" && (
            <Batches
              batches={batches}
              onAddBatch={handleAddBatch}
              onDeleteBatch={handleDeleteBatch}
              onUpdateBatch={handleUpdateBatch}
              courses={courses}
              onNavigate={handleNavigate}
            />
          )}

          {page === "Learners" && (
            <Learners learners={learners} />
          )}

          {page === "Assessment & Evaluation" && (
            <AssessmentEvaluationModule
              batches={batches}
              courses={courses}
              learners={learners}
              batchAssessments={batchAssessments}
              assessmentAssignments={assessmentAssignments}
              onCreateAssessment={handleCreateBatchAssessment}
              onAssignAssessmentStudents={handleAssignAssessmentStudents}
              studentEvaluations={studentEvaluations}
              onSaveEvaluation={handleSaveStudentEvaluation}
              subView={assessmentSubView}
              onChangeSubView={setAssessmentSubView}
              onNavigate={handleNavigate}
            />
          )}

          {page === "Live Sessions" && (
            <LiveSessions
              sessions={liveSessions}
              onAddSession={handleAddLiveSession}
            />
          )}

          {page === "Certificates" && (
            <Certificates
              certificates={certificates}
              onIssueCertificate={handleIssueCertificate}
            />
          )}

          {page === "Q&A Forum" && (
            <QnA
              questions={qna}
              onAnswerQuestion={handleAnswerQnA}
            />
          )}

          {page === "Reviews" && (
            <Reviews
              reviews={reviews}
            />
          )}

          {page === "Analytics" && (
            <Analytics
              analytics={analytics}
            />
          )}

          {page === "Settings" && (
            <Settings
              instructorProfile={profile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;
