import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { readCartCount } from "./navLinks";

export function useHeaderAuth() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(readCartCount);
  const [isInstitutionLoggedIn, setIsInstitutionLoggedIn] = useState(
    () => localStorage.getItem("institutionLoggedIn") === "true"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("isAdmin") === "true"
  );
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") || ""
  );

  const getDashboardDestination = () => {
    const isPlatformAdmin = localStorage.getItem("isPlatformAdmin") === "true";
    if (userRole === "platform_admin" || isPlatformAdmin) return "/admin-dashboard";
    if (userRole === "institution" || userRole === "institution_admin") return "/institution-dashboard";
    if (userRole === "instructor") return "/instructor-dashboard";
    if (userRole === "hackathon_admin" || isAdmin) return "/hackathon-dashboard";
    return "/dashboard";
  };

  const getDashboardText = () => {
    const isPlatformAdmin = localStorage.getItem("isPlatformAdmin") === "true";
    if (userRole === "platform_admin" || isPlatformAdmin) return "Admin Console";
    if (userRole === "institution" || userRole === "institution_admin") return "Institution Portal";
    if (userRole === "instructor") return "Instructor Portal";
    if (userRole === "hackathon_admin" || isAdmin) return "Hackathon Portal";
    return "Dashboard";
  };

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
      setIsInstitutionLoggedIn(localStorage.getItem("institutionLoggedIn") === "true");
      setUserRole(localStorage.getItem("userRole") || "");
    };
    window.addEventListener("authChanged", syncAuth);
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("authChanged", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const updateCartCount = () => setCartCount(readCartCount());
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, [location.pathname]);

  return {
    location,
    scrolled,
    cartCount,
    isInstitutionLoggedIn,
    isLoggedIn,
    getDashboardDestination,
    getDashboardText,
  };
}
