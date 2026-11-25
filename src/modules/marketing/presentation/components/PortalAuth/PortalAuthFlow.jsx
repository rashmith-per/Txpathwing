import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSelectionModal from "../DashboardSelection/DashboardSelectionModal";
import Login from "../Login/Login";
import CategorySelectionModal from "./CategorySelectionModal";
import PortalRegistrationModal from "./PortalRegistrationModal";
import PortalLoginModal from "./PortalLoginModal";
import { CATEGORY_CONFIGS } from "../../../services/portalAuth/portalStorage";

/**
 * Unified Portal Authentication Coordinator
 * Orchestrates: 4-role selection -> 3-category selection -> Dynamic Registration -> Login -> Dashboards
 */
export default function PortalAuthFlow({
  isOpen = false,
  initialView = "role-selection", // "role-selection" | "category-selection" | "register" | "login" | "standard-login"
  initialCategory = "institution",
  initialRole = "student",
  onClose,
}) {
  const navigate = useNavigate();

  // Current view in the auth state machine
  const [currentView, setCurrentView] = useState(initialView);
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [prefilledEmail, setPrefilledEmail] = useState("");

  if (!isOpen) return null;

  // Step 2: Handle 4-role selection
  const handleSelectRole = (roleKey) => {
    if (roleKey === "institution") {
      // Step 3 & 4: Open 3-category selection (Institution, Organization, Company)
      setCurrentView("category-selection");
    } else {
      // Standard student, instructor, admin login
      setSelectedRole(roleKey);
      setCurrentView("standard-login");
    }
  };

  // Step 5: Handle category selection (opens Sign In form first)
  const handleSelectCategory = (catKey) => {
    setSelectedCategory(catKey);
    setCurrentView("login");
  };

  // Switch between register and login
  const handleSwitchToLogin = (catKey = selectedCategory, email = "") => {
    if (catKey) setSelectedCategory(catKey);
    if (email) setPrefilledEmail(email);
    setCurrentView("login");
  };

  const handleSwitchToRegister = (catKey = selectedCategory) => {
    if (catKey) setSelectedCategory(catKey);
    setCurrentView("register");
  };

  // Step 10 & 11: After registration, redirect to login page
  const handleRegistrationSuccess = (registeredUser) => {
    setSelectedCategory(registeredUser.category);
    setPrefilledEmail(registeredUser.email);
    setCurrentView("login");
  };

  // Step 14: After successful login, redirect to dashboard based on category
  const handleLoginSuccess = (user) => {
    if (onClose) onClose();
    const targetRoute =
      CATEGORY_CONFIGS[user.category]?.dashboardPath || "/institution-dashboard";
    navigate(targetRoute, { replace: true });
  };

  return (
    <>
      {/* 1. Welcome to Pathwing Portal (4 Roles) */}
      <DashboardSelectionModal
        isOpen={currentView === "role-selection"}
        onClose={onClose}
        onSelectRole={handleSelectRole}
      />

      {/* 2. Standard Login (Student, Instructor, Admin) */}
      <Login
        isOpen={currentView === "standard-login"}
        selectedRole={selectedRole}
        onClose={onClose}
        onBack={() => setCurrentView("role-selection")}
      />

      {/* 3. Institution Category Selection (Institution, Organization, Company) */}
      <CategorySelectionModal
        isOpen={currentView === "category-selection"}
        onClose={onClose}
        onBack={() => setCurrentView("role-selection")}
        onSelectCategory={handleSelectCategory}
        onSwitchToLogin={() => handleSwitchToLogin("institution")}
      />

      {/* 4. Dynamic Registration Form */}
      <PortalRegistrationModal
        isOpen={currentView === "register"}
        category={selectedCategory}
        onClose={onClose}
        onBack={() => setCurrentView("login")}
        onRegistrationSuccess={handleRegistrationSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* 5. Dynamic Login Form */}
      <PortalLoginModal
        isOpen={currentView === "login"}
        initialCategory={selectedCategory}
        initialEmail={prefilledEmail}
        onClose={onClose}
        onBack={() => setCurrentView("category-selection")}
        onSwitchToRegister={handleSwitchToRegister}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
