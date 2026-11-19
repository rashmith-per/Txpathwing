import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Timer,
  BarChart3,
  Trophy,
  FileBarChart,
  Menu
} from "lucide-react";
import Overview from "./Overview";
import Teams from "./Teams";
import Round1 from "./Round1";
import Round2 from "./Round2";
import Round3 from "./Round3";
import Reports from "./Reports";
import { HackathonSidebar } from "./components/HackathonSidebar";
import { getRound1Teams, getRound2Teams, getRound3Teams } from "./HackethonApi";
import "./HackathonDashboard.css";

const HackathonDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [badges, setBadges] = useState({ round1: 0, round2: 0, round3: 0 });

  const navigate = useNavigate();

  const updateBadges = async () => {
    try {
      const [r1Res, r2Res, r3Res] = await Promise.all([
        getRound1Teams().catch(() => []),
        getRound2Teams().catch(() => []),
        getRound3Teams().catch(() => [])
      ]);

      setBadges({
        round1: Array.isArray(r1Res) ? r1Res.length : 0,
        round2: Array.isArray(r2Res) ? r2Res.length : 0,
        round3: Array.isArray(r3Res) ? r3Res.length : 0
      });
    } catch (e) {
      console.warn("Failed to update sidebar badges:", e);
    }
  };

  useEffect(() => {
    updateBadges();

    const handleDataChange = () => {
      updateBadges();
    };

    window.addEventListener("hackathon_attendance_changed", handleDataChange);
    window.addEventListener("hackathon_evaluation_changed", handleDataChange);

    return () => {
      window.removeEventListener("hackathon_attendance_changed", handleDataChange);
      window.removeEventListener("hackathon_evaluation_changed", handleDataChange);
    };
  }, []);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "teams",
      label: "Teams",
      icon: Users
    },
    {
      id: "round1",
      label: "Round 1",
      icon: Timer,
      badge: badges.round1,
      color: "violet"
    },
    {
      id: "round2",
      label: "Round 2",
      icon: BarChart3,
      badge: badges.round2,
      color: "amber"
    },
    {
      id: "round3",
      label: "Round 3",
      icon: Trophy,
      badge: badges.round3,
      color: "emerald"
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileBarChart
    }
  ];

  return (
    <div className="hackathon-dashboard-wrapper">
      <HackathonSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navItems={navItems}
        active={active}
        setActive={setActive}
        onLogout={() => navigate("/")}
      />

      <div className="hd-main">
        <div className="hd-mobile-topbar">
          <button
            onClick={() => setMobileOpen(true)}
            className="hd-menu-btn"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="hd-mobile-brand">INNOVATE 2025</div>
        </div>

        {active === "dashboard" && (
          <div className="hd-content">
            <Overview />
          </div>
        )}

        {active === "teams" && (
          <div className="hd-content">
            <Teams />
          </div>
        )}

        {active === "round1" && (
          <div className="hd-content">
            <Round1 />
          </div>
        )}

        {active === "round2" && (
          <div className="hd-content">
            <Round2 />
          </div>
        )}

        {active === "round3" && (
          <div className="hd-content">
            <Round3 />
          </div>
        )}

        {active === "reports" && (
          <div className="hd-content">
            <Reports />
          </div>
        )}

        {active !== "dashboard" &&
          active !== "teams" &&
          active !== "round1" &&
          active !== "round2" &&
          active !== "round3" &&
          active !== "reports" && (
            <div className="hd-empty-wrapper">
              <div className="hd-empty-box">
                <div className="hd-empty-icon">
                  {(() => {
                    const ActiveIcon = navItems.find((item) => item.id === active)?.icon;
                    return ActiveIcon ? <ActiveIcon size={32} /> : null;
                  })()}
                </div>
                <h2 className="hd-empty-title">{active}</h2>
                <p className="hd-empty-text">Empty screen - {active} page content will go here</p>
                <div className="hd-empty-tag">Left sidebar navigation working</div>
              </div>
            </div>
          )}
      </div>

      {mobileOpen && (
        <div className="hd-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
};

export default HackathonDashboard;
