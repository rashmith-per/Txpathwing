
import {
  useState,
  useEffect,
  useMemo
} from "react";

import { useNavigate, Link } from "react-router-dom";

import txIcon from "../../../../../assets/tx-icon.jpg";

import {
  Activity,
  Award,
  BookOpen,
  FileCheck,
  HelpCircle,
  IndianRupee,
  Layers,
  LayoutDashboard,
  Menu,
  Radio,
  Settings as SettingsIcon,
  Star,
  Users,
  X
} from "lucide-react";

import "./styles.css";

// Notifications Module
import { NotificationBell } from "./Notifications";

// Services
import { courseService } from "./MyCourses/services/courseService";

// Canonical Datasets
import {
  instructorProfile as initialProfile,
  initialEarningsData,
  initialAttentionItems,
  initialInstructorCourses,
  initialLearners,
  initialReviews,
  initialBatches,
  initialAssignments,
  initialLiveSessions,
  initialQnA,
  initialCertificates,
  initialCourseAnalytics
} from "./data/mockData";

// Dashboard Components
import { Sidebar } from "./common/Sidebar";
import { Overview } from "./Overview/Overview";
import { MyCourses } from "./MyCourses/MyCourses";
import { Batches } from "./Batches/Batches";
import { Learners } from "./Learners/Learners";
import { Assignments } from "./Assignments/Assignments";
import { LiveSessions } from "./LiveSessions/LiveSessions";
import { Certificates } from "./Certificates/Certificates";
import { QnA } from "./QnA/QnA";
import { Reviews } from "./Reviews/Reviews";
import { Analytics } from "./Analytics/Analytics";
import { RevenueAnalytics } from "./RevenueAnalytics";
import { Settings } from "./Settings/Settings";


export function InstructorDashboard() {
  const navigate = useNavigate();

  // ==========================================
  // MAIN NAVIGATION STATE
  // ==========================================

  const [page, setPage] = useState("Dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingOpenCreateCourse, setPendingOpenCreateCourse] = useState(false);


  // ==========================================
  // INSTRUCTOR PROFILE
  // ==========================================

  const [profile, setProfile] = useState(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");

    const effectiveEmail = storedEmail || initialProfile.email;

    const effectiveName = storedName
      ? storedName.replace(" (Lead Instructor)", "")
      : (
          storedEmail && !storedEmail.includes("ramana")
            ? storedEmail.split("@")[0]
            : initialProfile.name
        );

    const initials = effectiveName
      .replace(/Dr\.\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "RR";

    return {
      ...initialProfile,
      email: effectiveEmail,
      name: effectiveName,
      avatarInitials: initials
    };
  });


  // ==========================================
  // MASTER DASHBOARD DATASETS
  // ==========================================

  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("tx_instructor_courses_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial seeded catalog
    }
    return initialInstructorCourses;
  });
  const [earnings] = useState(initialEarningsData);
  const [attentionItems, setAttentionItems] = useState(initialAttentionItems);
  const [learners] = useState(initialLearners);
  const [reviews] = useState(initialReviews);
  const [batches, setBatches] = useState(initialBatches);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [liveSessions, setLiveSessions] = useState(initialLiveSessions);
  const [qna, setQnA] = useState(initialQnA);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [analytics] = useState(initialCourseAnalytics);


  // ==========================================
  // SYNC PROFILE WITH LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    const handleStorageUpdate = () => {
      const storedEmail = localStorage.getItem("userEmail");
      const storedName = localStorage.getItem("userName");

      if (storedEmail || storedName) {
        const effectiveName = storedName
          ? storedName.replace(" (Lead Instructor)", "")
          : storedEmail?.split("@")[0];

        setProfile((prev) => ({
          ...prev,

          email: storedEmail || prev.email,

          name: effectiveName || prev.name,

          avatarInitials: (effectiveName || storedEmail || prev.name)
            .replace(/Dr\.\s*/i, "")
            .split(" ")
            .filter(Boolean)
            .map((name) => name[0])
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

  // Sync persisted course catalog & listen for service updates
  const instructorIdentity = useMemo(
    () => ({ id: profile.id || "inst-ramana-1", email: profile.email }),
    [profile.id, profile.email]
  );

  useEffect(() => {
    let active = true;
    courseService
      .getCourses(instructorIdentity)
      .then((persisted) => {
        if (!active || !Array.isArray(persisted)) return;
        setCourses(persisted);
        const activeCount = persisted.filter(
          (c) => String(c.status || "").toLowerCase() !== "archived"
        ).length;
        setProfile((prev) => ({
          ...prev,
          publishedCoursesCount: activeCount
        }));
      })
      .catch(() => {});

    const handleCoursesSync = (event) => {
      const updatedList = event?.detail?.courses;
      if (!Array.isArray(updatedList)) return;
      setCourses(updatedList);
      const activeCount = updatedList.filter(
        (c) => String(c.status || "").toLowerCase() !== "archived"
      ).length;
      setProfile((prev) => ({
        ...prev,
        publishedCoursesCount: activeCount
      }));
    };

    window.addEventListener("tx_instructor_courses_updated", handleCoursesSync);
    return () => {
      active = false;
      window.removeEventListener("tx_instructor_courses_updated", handleCoursesSync);
    };
  }, [instructorIdentity]);

  const activeCoursesCount = useMemo(
    () =>
      courses.filter((c) => String(c.status || "").toLowerCase() !== "archived").length,
    [courses]
  );


  // ==========================================
  // DYNAMIC NAVIGATION CONFIGURATION
  // ==========================================

  const navConfig = useMemo(() => [
    {
      group: "TEACH & CURRICULUM",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard
        },
        {
          name: "My Courses",
          icon: BookOpen,
          badge: activeCoursesCount,
          badgeTone: "blue"
        },
       
        {
          name: "Batches",
          icon: Layers,
          badge: batches.length,
          badgeTone: "neutral"
        }
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
          name: "Assignments",
          icon: FileCheck,
          badge:
            assignments.filter(
              (item) => item.status === "Pending Review"
            ).length || undefined,
          badgeTone: "warning"
        },
        {
          name: "Live Sessions",
          icon: Radio,
          badge:
            liveSessions.filter(
              (item) => item.status === "Upcoming"
            ).length || undefined,
          badgeTone: "danger"
        },
        {
          name: "Certificates",
          icon: Award,
          badge: certificates.length,
          badgeTone: "neutral"
        }
      ]
    },

    {
      group: "COMMUNITY & INSIGHTS",
      items: [
        {
          name: "Q&A Forum",
          icon: HelpCircle,
          badge:
            qna.filter(
              (item) => item.status === "Pending"
            ).length || undefined,
          badgeTone: "warning"
        },
        {
          name: "Reviews",
          icon: Star,
          badge: "4.9★",
          badgeTone: "purple"
        },
        {
          name: "Analytics",
          icon: Activity
        },
        {
          name: "Revenue Analytics",
          icon: IndianRupee
        },
        {
          name: "Settings",
          icon: SettingsIcon
        }
      ]
    }
  ], [
    activeCoursesCount,
    batches.length,
    learners.length,
    assignments,
    liveSessions,
    certificates.length,
    qna
  ]);


  // ==========================================
  // DOCUMENT TITLE
  // ==========================================

  useEffect(() => {
    const previousTitle = document.title;

    document.title = `Pathwing Instructor Console · ${page}`;

    return () => {
      document.title = previousTitle;
    };
  }, [page]);


  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileNav(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  // ==========================================
  // PREVENT BACKGROUND SCROLL ON MOBILE
  // ==========================================

  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);


  // ==========================================
  // LOGOUT HANDLER
  // ==========================================

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


  // ==========================================
  // COURSE HANDLERS (UNIFIED PERSISTENT CRUD)
  // ==========================================

  const applyCourseListState = (nextCourses) => {
    setCourses(nextCourses);
    const activeCount = nextCourses.filter(
      (c) => String(c.status || "").toLowerCase() !== "archived"
    ).length;
    setProfile((prev) => ({
      ...prev,
      publishedCoursesCount: activeCount
    }));
  };

  const handleCreateCourse = async (coursePayload) => {
    const existingList = await courseService.getCourses(instructorIdentity);
    if (coursePayload?.id && existingList.some((c) => c.id === coursePayload.id)) {
      applyCourseListState(existingList);
      return existingList;
    }

    const result = await courseService.createCourse(
      coursePayload,
      coursePayload?.modules || [],
      instructorIdentity
    );
    applyCourseListState(result.courses);
    return result.courses;
  };

  const handleUpdateCourse = async (courseId, updatedFields) => {
    const result = await courseService.updateCourse(
      courseId,
      updatedFields,
      instructorIdentity
    );
    applyCourseListState(result.courses);
    return result;
  };

  const handleDeleteOrArchiveCourse = async (courseId, options = {}) => {
    const result = await courseService.deleteOrArchiveCourse(courseId, {
      ...options,
      learners,
      batches,
      instructorIdentity
    });
    applyCourseListState(result.courses);
    return result;
  };

  const handleRestoreCourse = async (courseId) => {
    const result = await courseService.restoreCourse(courseId, instructorIdentity);
    applyCourseListState(result.courses);
    return result;
  };

  const handleSyncCourseSyllabus = async (courseId, updatedModules) => {
    const result = await courseService.syncCourseSyllabusSummary(
      courseId,
      updatedModules,
      instructorIdentity
    );
    if (result?.courses) {
      applyCourseListState(result.courses);
    }
    return result;
  };


  // ==========================================
  // BATCH HANDLERS
  // ==========================================

  const handleAddBatch = (newBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
  };


  // ==========================================
  // ASSIGNMENT HANDLERS
  // ==========================================

  const handleGradeAssignment = (assignmentId, score, feedback) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              score,
              feedback,
              status: "Graded"
            }
          : assignment
      )
    );
  };


  // ==========================================
  // LIVE SESSION HANDLERS
  // ==========================================

  const handleAddLiveSession = (newSession) => {
    setLiveSessions((prev) => [newSession, ...prev]);
  };


  // ==========================================
  // CERTIFICATE HANDLERS
  // ==========================================

  const handleIssueCertificate = (newCertificate) => {
    setCertificates((prev) => [newCertificate, ...prev]);
  };


  // ==========================================
  // Q&A HANDLERS
  // ==========================================

  const handleAnswerQnA = (questionId, answer) => {
    setQnA((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answer,
              status: "Answered"
            }
          : question
      )
    );
  };


  // ==========================================
  // PROFILE HANDLERS
  // ==========================================

  const handleUpdateProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };


  // ==========================================
  // DASHBOARD ATTENTION HANDLER
  // ==========================================

  const handleResolveAttentionItem = (itemId) => {
    const itemExists = attentionItems.some(
      (item) => item.id === itemId
    );

    if (!itemExists) return;

    setAttentionItems((prev) =>
      prev.filter((item) => item.id !== itemId)
    );

    setProfile((prev) => ({
      ...prev,
      openQuestionsCount: Math.max(
        0,
        (prev.openQuestionsCount || 0) - 1
      )
    }));
  };


  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <div className="instructor-app-shell blue-white-theme">

      {/* Atmospheric Ambient Glow Background */}

      <div
        className="ambient-glow-orb glow-orb-1"
        aria-hidden="true"
      />

      <div
        className="ambient-glow-orb glow-orb-2"
        aria-hidden="true"
      />

      <div
        className="ambient-glow-orb glow-orb-3"
        aria-hidden="true"
      />


      {/* ======================================
          TOP NAVIGATION BAR
      ====================================== */}

      <header className="instructor-topbar">

        {/* Brand */}

        <div className="brand-cluster">

          <Link
            to="/"
            className="topbar-brand-link"
            title="Return to Website Home"
          >

            <div className="topbar-brand-mark">
              <img
                src={txIcon}
                alt="TX Pathwing Logo"
                className="brand-logo-img"
              />
            </div>

            <div className="topbar-brand-name">
              <span className="brand-title-gradient">
                TX Pathwing
              </span>
            </div>

          </Link>

        </div>


        {/* Topbar Right Actions */}

        <div className="topbar-right">

          {/* Notification System */}

          <NotificationBell onNavigate={setPage} />


          {/* Mobile Navigation Toggle */}

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileNav((prev) => !prev)}
            title={mobileNav ? "Close navigation menu" : "Open navigation menu"}
            aria-label="Toggle navigation"
            aria-expanded={mobileNav}
          >
            {mobileNav ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

      </header>


      {/* ======================================
          MAIN LAYOUT
      ====================================== */}

      <div className="instructor-layout">


        {/* Sidebar */}

        <Sidebar
          navConfig={navConfig}
          page={page}
          onNavigate={(targetPage) => {
            setPage(targetPage);
            setMobileNav(false);
          }}
          mobileNav={mobileNav}
          setMobileNav={setMobileNav}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          instructorProfile={profile}
          onLogout={handleLogout}
        />


        {/* ======================================
            MAIN CONTENT / PAGE DISPATCHER
        ====================================== */}

        <main className="instructor-main">

          {/* Dashboard Overview */}

          {page === "Dashboard" && (

            <Overview
              instructorProfile={profile}
              earningsData={earnings}
              attentionItems={attentionItems}
              reviews={reviews}
              onNavigate={setPage}
              onCreateCourse={() => {
                setPendingOpenCreateCourse(true);
                setPage("My Courses");
              }}
              onResolveItem={handleResolveAttentionItem}
            />

          )}


          {/* My Courses (Unified Course & Syllabus Management + Embedded Course Studio) */}

          {page === "My Courses" && (

            <MyCourses
              courses={courses}
              learners={learners}
              batches={batches}
              instructorProfile={profile}
              initialOpenCreate={pendingOpenCreateCourse}
              onConsumeOpenCreate={() => setPendingOpenCreateCourse(false)}
              onCreateCourse={handleCreateCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteOrArchiveCourse={handleDeleteOrArchiveCourse}
              onRestoreCourse={handleRestoreCourse}
              onSyncSyllabus={handleSyncCourseSyllabus}
              onNavigate={setPage}
            />

          )}


          {/* Batches */}

          {page === "Batches" && (

            <Batches
              batches={batches}
              onAddBatch={handleAddBatch}
            />

          )}


          {/* Learners */}

          {page === "Learners" && (

            <Learners
              learners={learners}
            />

          )}


          {/* Assignments */}

          {page === "Assignments" && (

            <Assignments
              assignments={assignments}
              onGradeAssignment={handleGradeAssignment}
            />

          )}


          {/* Live Sessions */}

          {page === "Live Sessions" && (

            <LiveSessions
              sessions={liveSessions}
              onAddSession={handleAddLiveSession}
            />

          )}


          {/* Certificates */}

          {page === "Certificates" && (

            <Certificates
              certificates={certificates}
              onIssueCertificate={handleIssueCertificate}
            />

          )}


          {/* Q&A Forum */}

          {page === "Q&A Forum" && (

            <QnA
              questions={qna}
              onAnswerQuestion={handleAnswerQnA}
            />

          )}


          {/* Reviews */}

          {page === "Reviews" && (

            <Reviews
              reviews={reviews}
            />

          )}


          {/* Analytics */}

          {page === "Analytics" && (

            <Analytics
              analytics={analytics}
            />

          )}


          {/* Revenue Analytics */}

          {page === "Revenue Analytics" && (

            <RevenueAnalytics
              instructorProfile={profile}
              courses={courses}
              batches={batches}
            />

          )}


          {/* Settings */}

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
