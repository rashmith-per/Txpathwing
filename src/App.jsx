import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Header from "./modules/marketing/presentation/components/Header/Header";
import Footer from "./modules/marketing/presentation/components/Footer/Footer";

import Home from "./modules/marketing/presentation/pages/Home/Home";
import LearnerJourney from "./modules/marketing/presentation/pages/Learner_journey/Learner_journey";
import About from "./modules/marketing/presentation/pages/About/About";

import Marketplace from "./modules/marketing/presentation/pages/MarketPlace/MarketPlace";
import Blog from "./modules/marketing/presentation/pages/Blog/Blog";
import CareersHero from "./modules/marketing/presentation/pages/Careers/Careers";
import Organization from "./modules/marketing/presentation/pages/Contact/Contact";
import Cart from "./modules/marketing/presentation/pages/Cart/Cart";
import CourseDetail from "./modules/marketing/presentation/pages/CourseDetails/CourseDetails";

import DashboardSelectionModal from "./modules/marketing/presentation/components/DashboardSelection/DashboardSelectionModal";
import Login from "./modules/marketing/presentation/components/Login/Login";
import Signin from "./modules/marketing/presentation/components/Login/signin";
import ProtectedRoute from "./modules/marketing/routes/ProtectedRoute";

import RegistrationForm from "./modules/marketing/presentation/components/HackathonRegistration/RegistrationForm";
import Events from "./modules/marketing/presentation/pages/Events/Events.jsx";

// Hackathon Dashboard (Preserved 100%)
import HackathonDashboard from "./modules/marketing/presentation/pages/HackathonDashboard/HackathonDashboard.jsx";
// Student Dashboard (with Sidebar + Assessments + Certificates)
import Dashboard from "./modules/marketing/presentation/pages/StudentDashboard/Dashboard/Dashboard.jsx";
import Assessments from "./modules/marketing/presentation/pages/StudentDashboard/Assessments/Assessments.jsx";
import Certificates from "./modules/marketing/presentation/pages/StudentDashboard/Certificates/Certificates.jsx";

// Platform Admin Dashboard
import AdminDashboard from "./modules/marketing/presentation/pages/AdminDashboard/AdminDashboard.jsx";

// Instructor Dashboard (Advanced Monolithic Model)
import InstructorDashboard from "./modules/marketing/presentation/pages/instructor";

// Institution Dashboard (Modular Domain Monolith)
import InstitutionDashboard from "./modules/institution";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Dedicated LoginPage wrapper component for direct /login or /signin access
 * Immediately pops up "WELCOME TO PATHWING PORTAL" over the page
 */
function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const portalParam =
    searchParams.get("portal") || searchParams.get("role") || "";

  const [selectionOpen, setSelectionOpen] = useState(!portalParam);
  const [loginOpen, setLoginOpen] = useState(Boolean(portalParam));
  const [selectedRole, setSelectedRole] = useState(portalParam || "student");

  useEffect(() => {
    if (portalParam) {
      setSelectedRole(portalParam);
      setSelectionOpen(false);
      setLoginOpen(true);
    } else {
      setSelectionOpen(true);
      setLoginOpen(false);
    }
  }, [portalParam]);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setSelectionOpen(false);
    setLoginOpen(true);
  };

  const handleBackToSelection = () => {
    setLoginOpen(false);
    setSelectionOpen(true);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <Home />
      {/* WELCOME TO PATHWING PORTAL SELECTION POPUP */}
      <DashboardSelectionModal
        isOpen={selectionOpen}
        onClose={handleClose}
        onSelectRole={handleSelectRole}
      />
      {/* PARTICULAR ROLE SIGN-IN POPUP */}
      <Login
        isOpen={loginOpen}
        selectedRole={selectedRole}
        onClose={handleClose}
        onBack={handleBackToSelection}
      />
    </>
  );
}

function AppLayout() {
  const location = useLocation();

  // Don't show normal website Header/Footer on dashboards
  const hideHeaderFooter =
    location.pathname.startsWith("/hackathon-dashboard") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/student") ||
    location.pathname.toLowerCase().startsWith("/assessments") ||
    location.pathname.toLowerCase().startsWith("/certificates") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/instructor") ||
    location.pathname.startsWith("/instructor-dashboard") ||
    location.pathname.startsWith("/institution") ||
    location.pathname.startsWith("/institution-dashboard");

  return (
    <>
      <ScrollToTop />

      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Explore / Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Course Details */}
        <Route path="/course/:id" element={<CourseDetail />} />

        {/* Other pages */}
        <Route path="/events" element={<Events />} />
        <Route path="/careers" element={<CareersHero />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/learner-journey" element={<LearnerJourney />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Organization />} />

        {/* Login & Signin Routes with Immediate Popup */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/Signin" element={<LoginPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/registration" element={<RegistrationForm />} />

        {/* =====================================
            HACKATHON ADMIN DASHBOARD (PRESERVED)
            ===================================== */}
        <Route
          path="/hackathon-dashboard"
          element={
            <ProtectedRoute allowedRole="hackathon_admin">
              <HackathonDashboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            STUDENT DASHBOARD (PROTECTED)
            ===================================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessments"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assessments"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assessments/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Certificates"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Certificates/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            PLATFORM ADMIN DASHBOARD (PROTECTED)
            ===================================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            INSTRUCTOR DASHBOARD (PROTECTED)
            ===================================== */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute allowedRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard/*"
          element={
            <ProtectedRoute allowedRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            INSTITUTION DASHBOARD (PROTECTED)
            ===================================== */}
        <Route
          path="/institution"
          element={
            <ProtectedRoute allowedRole="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institution/*"
          element={
            <ProtectedRoute allowedRole="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institution-dashboard"
          element={
            <ProtectedRoute allowedRole="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institution-dashboard/*"
          element={
            <ProtectedRoute allowedRole="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
