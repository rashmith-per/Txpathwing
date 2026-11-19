import { useState, useEffect, useMemo } from "react";
import { instructorProfile as initialProfile } from "../data/mockData";

export function useInstructorProfile() {
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

  const instructorIdentity = useMemo(
    () => ({ id: profile.id || "inst-ramana-1", email: profile.email }),
    [profile.id, profile.email]
  );

  const handleUpdateProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  return {
    profile,
    setProfile,
    instructorIdentity,
    handleUpdateProfile
  };
}
