import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Header from "./modules/marketing/presentation/components/Header/Header";
import Footer from "./modules/marketing/presentation/components/Footer/Footer";
import PortalAuthFlow from "./modules/marketing/presentation/components/PortalAuth/PortalAuthFlow";
import { getActivePortalUser } from "./modules/marketing/services/portalAuth/portalStorage";
import { seedDemoAccountsIfEmpty } from "./modules/marketing/services/portalAuth/portalAuthService";

const InstitutionDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/InstitutionDashboard/InstitutionDashboard.jsx"));
const PortalInstitutionDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/InstitutionDashboard/PortalInstitutionDashboard/PortalInstitutionDashboard"));
const PortalOrganizationDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/InstitutionDashboard/PortalOrganizationDashboard/PortalOrganizationDashboard"));
const PortalCompanyDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/InstitutionDashboard/PortalCompanyDashboard/PortalCompanyDashboard"));

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
const HackathonDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/HackathonDashboard/HackathonDashboard.jsx"));
const Home = lazy(() => import("./modules/marketing/presentation/pages/Home/Home"));
const LearnerJourney = lazy(() => import("./modules/marketing/presentation/pages/Learner_journey/Learner_journey"));
const Marketplace = lazy(() => import("./modules/marketing/presentation/pages/MarketPlace/MarketPlace"));
const StudentDashboard = lazy(() =>
  import("./modules/marketing/presentation/Dashboards/StudentDashboard")
);
const AdminDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/AdminDashboard/AdminDashboard"));
const InstructorDashboard = lazy(() => import("./modules/marketing/presentation/Dashboards/InstructorDashboard/InstructorDashboard.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LoginPageContent({ portalParam }) {
  const navigate = useNavigate();

  let initialView = "role-selection";
  if (portalParam === "institution") {
    initialView = "category-selection";
  } else if (portalParam) {
    initialView = "standard-login";
  }

  return (
    <>
      <Home />
      <PortalAuthFlow
        isOpen={true}
        initialView={initialView}
        initialCategory="institution"
        initialRole={portalParam || "student"}
        onClose={() => navigate("/")}
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
      (userRole === "institution" ||
        userRole === "institution_admin" ||
        userRole === "organization" ||
        userRole === "company"));

  if (!isInstitutionSession) {
    return <Navigate to="/login?portal=institution" replace />;
  }

  const activePortalUser = getActivePortalUser();
  if (activePortalUser) {
    return <PortalInstitutionDashboard />;
  }

  return <InstitutionDashboard />;
}

function OrganizationDashboardRoute() {
  return <Navigate to="/institution-dashboard" replace />;
}

function CompanyDashboardRoute() {
  return <Navigate to="/institution-dashboard" replace />;
}

function AppRoutes() {
  const { pathname } = useLocation();

  useEffect(() => {
    seedDemoAccountsIfEmpty();
  }, []);

  const isConsole = pathname === "/institution"
    || pathname.startsWith("/institution/")
    || pathname.startsWith("/institution-dashboard")
    || pathname.startsWith("/organization")
    || pathname.startsWith("/company");
  const isPrivateDashboard = pathname.toLowerCase().startsWith("/hackathon")
    || pathname.toLowerCase().startsWith("/dashboard")
    || pathname.toLowerCase().startsWith("/student")
    || pathname.toLowerCase().startsWith("/assessments")
    || pathname.toLowerCase().startsWith("/certificates")
    || pathname.toLowerCase().startsWith("/admin")
    || pathname.toLowerCase().startsWith("/instructor")
    || pathname.toLowerCase().startsWith("/organization-dashboard")
    || pathname.toLowerCase().startsWith("/company-dashboard");
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
      <Route path="/institution-signin" element={<Navigate to="/login?portal=institution" replace />} />
      <Route path="/institution/*" element={<InstitutionDashboardRoute />} />
      <Route path="/institution-dashboard/*" element={<InstitutionDashboardRoute />} />
      <Route path="/organization/*" element={<OrganizationDashboardRoute />} />
      <Route path="/organization-dashboard/*" element={<OrganizationDashboardRoute />} />
      <Route path="/company/*" element={<CompanyDashboardRoute />} />
      <Route path="/company-dashboard/*" element={<CompanyDashboardRoute />} />
      <Route path="/hackathon-dashboard/*" element={<HackathonDashboard />} />
      <Route path="/dashboard/*" element={<StudentDashboard />} />
      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/student-dashboard/*" element={<StudentDashboard />} />
      <Route path="/studentdashboard/*" element={<StudentDashboard />} />
      <Route path="/Student/*" element={<StudentDashboard />} />
      <Route path="/Student-dashboard/*" element={<StudentDashboard />} />
      <Route path="/Dashboard/*" element={<StudentDashboard />} />
      <Route path="/assessments/*" element={<StudentDashboard />} />
      <Route path="/Assessments/*" element={<StudentDashboard />} />
      <Route path="/certificates/*" element={<StudentDashboard />} />
      <Route path="/Certificates/*" element={<StudentDashboard />} />
      <Route path="/coding-lab/*" element={<StudentDashboard />} />
      <Route path="/codinglab/*" element={<StudentDashboard />} />
      <Route path="/CodingLab/*" element={<StudentDashboard />} />
      <Route path="/Coding-lab/*" element={<StudentDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      <Route path="/instructor/*" element={<InstructorDashboard />} />
      <Route path="/instructor-dashboard/*" element={<InstructorDashboard />} />
      <Route path="/Instructor/*" element={<InstructorDashboard />} />
      <Route path="/Instructor-dashboard/*" element={<InstructorDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
    {showWebsiteChrome && <Footer />}
  </>;
}

export default function SiteApp() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
