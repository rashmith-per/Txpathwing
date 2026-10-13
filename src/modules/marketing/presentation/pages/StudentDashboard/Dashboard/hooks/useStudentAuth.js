import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { studentStorage } from "../services/studentStorage";

export function useStudentAuth() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(() => studentStorage.getSession());

  // Route guard: ensure student is authenticated
  useEffect(() => {
    const session = studentStorage.getSession();
    if (!session.isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Reactive listener to auth changes across tabs/windows
  const syncProfile = useCallback(() => {
    setUserProfile(studentStorage.getSession());
  }, []);

  useEffect(() => {
    window.addEventListener("authChanged", syncProfile);
    window.addEventListener("storage", syncProfile);
    return () => {
      window.removeEventListener("authChanged", syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, [syncProfile]);

  const handleLogout = useCallback(() => {
    studentStorage.logout();
    navigate("/login");
  }, [navigate]);

  return {
    userProfile,
    isLoggedIn: userProfile.isLoggedIn,
    logout: handleLogout,
  };
}
