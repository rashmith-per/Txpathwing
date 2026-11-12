import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Header from "./modules/marketing/presentation/components/Header/Header";
import Footer from "./modules/marketing/presentation/components/Footer/Footer";
import DashboardSelectionModal from "./modules/marketing/presentation/components/DashboardSelection/DashboardSelectionModal";
import Login from "./modules/marketing/presentation/components/Login/Login";
import ProtectedRoute from "./modules/marketing/routes/ProtectedRoute";

const InstitutionDashboard = lazy(() => import("./App"));
const InstitutionSignIn = lazy(() => import("./modules/marketing/presentation/pages/InstitutionSignIn/InstitutionSignIn"));
const Signin = lazy(() => import("./modules/marketing/presentation/components/Login/signin"));
const RegistrationForm = lazy(() => import("./modules/marketing/presentation/components/HackathonRegistration/RegistrationForm"));
const FAQ = lazy(() => import("./modules/marketing/presentation/components/FAQ/FAQ"));
const Pricing = lazy(() => import("./modules/marketing/presentation/components/Pricing/Pricing"));
const About = lazy(() => import("./modules/marketing/presentation/pages/About/About"));
const Blog = lazy(() => import("./modules/marketing/presentation/pages/Blog/Blog"));
const Cart = lazy(() => import("./modules/marketing/presentation/pages/Cart/Cart"));
const Careers = lazy(() => import("./modules/marketing/presentation/pages/Careers/Careers"));
const CourseDetail = lazy(() => import("./modules/marketing/presentation/pages/CourseDetails/CourseDetails"));
const Organization = lazy(() => import("./modules/marketing/presentation/pages/Contact/Contact"));
const Events = lazy(() => import("./modules/marketing/presentation/pages/Events/Events.jsx"));
const HackathonDashboard = lazy(() => import("./modules/marketing/presentation/pages/HackathonDashboard/HackathonDashboard"));
const Home = lazy(() => import("./modules/marketing/presentation/pages/Home/Home"));
const LearnerJourney = lazy(() => import("./modules/marketing/presentation/pages/Learner_journey/Learner_journey"));
const Marketplace = lazy(() => import("./modules/marketing/presentation/pages/MarketPlace/MarketPlace"));
const StudentDashboard = lazy(() => import("./modules/marketing/presentation/pages/StudentDashboard/Dashboard/Dashboard"));
const AdminDashboard = lazy(() => import("./modules/marketing/presentation/pages/AdminDashboard/AdminDashboard"));
const InstructorDashboard = lazy(() => import("./modules/marketing/presentation/pages/instructor"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LoginPageContent({ portalParam }) {
  const navigate = useNavigate();
  const [selectionOpen, setSelectionOpen] = useState(!portalParam);
  const [loginOpen, setLoginOpen] = useState(Boolean(portalParam));
  const [selectedRole, setSelectedRole] = useState(portalParam || "student");

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
      <DashboardSelectionModal
        isOpen={selectionOpen}
        onClose={handleClose}
        onSelectRole={handleSelectRole}
      />
      <Login
        isOpen={loginOpen}
        selectedRole={selectedRole}
        onClose={handleClose}
        onBack={handleBackToSelection}
      />
    </>
  );
}

function LoginPage() {
  const [searchParams] = useSearchParams();
  const portalParam = searchParams.get("portal") || searchParams.get("role") || "";

  return <LoginPageContent key={portalParam} portalParam={portalParam} />;
}

function InstitutionDashboardRoute() {
  const userRole = localStorage.getItem("userRole") || "";
  const isInstitutionSession =
    localStorage.getItem("institutionLoggedIn") === "true" ||
    (localStorage.getItem("isLoggedIn") === "true" &&
      (userRole === "institution" || userRole === "institution_admin"));

  if (!isInstitutionSession) {
    return <Navigate to="/institution-signin" replace />;
  }

  return <InstitutionDashboard />;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isConsole = pathname === "/institution"
    || pathname.startsWith("/institution/")
    || pathname.startsWith("/institution-dashboard");
  const isPrivateDashboard = pathname.startsWith("/hackathon-dashboard")
    || pathname.startsWith("/dashboard")
    || pathname.startsWith("/student")
    || pathname.toLowerCase().startsWith("/assessments")
    || pathname.toLowerCase().startsWith("/certificates")
    || pathname.startsWith("/admin")
    || pathname.startsWith("/admin-dashboard")
    || pathname.startsWith("/instructor")
    || pathname.startsWith("/instructor-dashboard");
  const showWebsiteChrome = !isConsole && !isPrivateDashboard;

  return <>
    <ScrollToTop />
    {showWebsiteChrome && <Header />}
    <Suspense fallback={<div className="route-loading" role="status">Loading page...</div>}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/events" element={<Events />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Organization />} />
      <Route path="/learner-journey" element={<LearnerJourney />} />
      <Route path="/programs" element={<LearnerJourney />} />
      <Route path="/for-students" element={<LearnerJourney />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/solutions/colleges" element={<Organization />} />
      <Route path="/solutions/companies" element={<Organization />} />
      <Route path="/solutions/instructors" element={<Organization />} />
      <Route path="/solutions/employers" element={<Organization />} />
      <Route path="/for-institutions" element={<Organization />} />
      <Route path="/for-corporate" element={<Organization />} />
      <Route path="/for-instructors" element={<Organization />} />
      <Route path="/industry-partners" element={<Organization />} />
      <Route path="/placement-network" element={<Careers />} />
      <Route path="/ai-layer" element={<Marketplace />} />
      <Route path="/resources/student-handbook" element={<LearnerJourney />} />
      <Route path="/resources/internship-handbook" element={<Events />} />
      <Route path="/resources/corporate-catalogue" element={<Marketplace />} />
      <Route path="/resources/college-brochure" element={<Organization />} />
      <Route path="/help" element={<Organization />} />
      <Route path="/security" element={<About />} />
      <Route path="/privacy" element={<About />} />
      <Route path="/terms" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/institution-signin" element={<InstitutionSignIn />} />
      <Route path="/institution/*" element={<InstitutionDashboardRoute />} />
      <Route path="/institution-dashboard/*" element={<InstitutionDashboardRoute />} />
      <Route path="/hackathon-dashboard/*" element={<HackathonDashboard />} />
      <Route path="/dashboard/*" element={<StudentDashboard />} />
      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/student-dashboard/*" element={<StudentDashboard />} />
      <Route path="/assessments/*" element={<StudentDashboard />} />
      <Route path="/Assessments/*" element={<StudentDashboard />} />
      <Route path="/certificates/*" element={<StudentDashboard />} />
      <Route path="/Certificates/*" element={<StudentDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      <Route
        path="/instructor/*"
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
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
    {showWebsiteChrome && <Footer />}
  </>;
}

export default function SiteApp() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
