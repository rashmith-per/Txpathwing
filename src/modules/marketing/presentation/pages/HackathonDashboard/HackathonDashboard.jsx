import React, { useState, useEffect } from "react";
import Round1 from "./Round1";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  Timer,
  BarChart3,
  Trophy,
  Sparkles,
  LogOut,
  Menu,
  X,
  FileBarChart,
  School,
  CheckCircle2
} from "lucide-react";
import Overview from "./Overview";
import Teams from "./teams";
import Round1 from "./Round1";
import Round2 from "./Round2";
import Round3 from "./Round3";
import Reports from "./Reports";
import txIcon from "../../../../../assets/tx-icon.jpg";
import { getRound1Teams, getRound2Teams, getRound3Teams } from "./HackethonApi";

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
      <aside className={`hd-sidebar ${mobileOpen ? "hd-sidebar-open" : ""}`}>
        <div className="hd-sidebar-header">
          <div className="hd-logo">
            <img src={txIcon} alt="TX Logo" style={{ width: "28px", height: "28px", objectFit: "contain", borderRadius: "4px" }} />
          </div>

          <div className="hd-brand">
            <div className="hd-brand-title">Hackathon</div>
            <div className="hd-brand-sub">Portal & Evaluation</div>
          </div>

          <button className="hd-mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <nav className="hd-nav">
          {navItems.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setMobileOpen(false);
                }}
                className={`hd-nav-item ${isActive ? "hd-nav-active" : ""}`}
              >
                <Icon className="hd-nav-icon" />
                <span className="hd-nav-label">{item.label}</span>

                <span className="hd-nav-label">
                  {item.label}
                </span>

                {typeof item.badge === "number" && item.badge > 0 && (
                  <span
                    className={`hd-badge hd-badge-${item.color} ${
                      isActive ? "hd-badge-active" : ""
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="hd-sidebar-footer">
          <div className="hd-user-card">
            <div className="hd-user-avatar">J</div>
            <div className="hd-user-info">
              <div className="hd-user-email">coordinator@hackathon.com</div>
              <div className="hd-user-role">Event Lead</div>
            </div>
            <button className="hd-logout-btn" onClick={() => navigate("/")} title="Exit to Home">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div className="hd-main">
        <div className="hd-mobile-topbar">
          <button onClick={() => setMobileOpen(true)} className="hd-menu-btn">
            <Menu size={20} />
          </button>
          <div className="hd-mobile-brand">TX HACKATHON 2026</div>
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
            <div style={{ padding: "8px 0 30px" }}>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 700, color: "#64748b", letterSpacing: "1px" }}>
                  RESULTS SUMMARY
                </p>
                <h1 style={{ margin: 0, fontSize: "28px", color: "#1e293b", fontWeight: 750 }}>
                  Finalists & Leaderboard
                </h1>
                <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>
                  Teams that passed all three evaluation rounds and earned Finalist status.
                </p>
              </div>

              {finalistTeams.length === 0 ? (
                <div style={{ padding: "60px 20px", textAlign: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#64748b" }}>
                  <Trophy size={48} style={{ margin: "0 auto 12px", opacity: 0.5, color: "#d97706" }} />
                  <h3 style={{ margin: "0 0 6px", color: "#1e293b" }}>No Finalists Declared Yet</h3>
                  <p style={{ margin: 0, fontSize: "14px" }}>
                    Teams evaluated as Qualified in Round 3 will appear here as official Finalists.
                  </p>
                </div>
              ) : (
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
                    <thead>
                      <tr style={{ background: "#059669", color: "#fff", fontSize: "12px", textTransform: "uppercase" }}>
                        <th style={{ padding: "16px", textAlign: "left" }}>Rank</th>
                        <th style={{ padding: "16px", textAlign: "left" }}>Registration ID</th>
                        
                        <th style={{ padding: "16px", textAlign: "left" }}>Team Lead</th>
                        <th style={{ padding: "16px", textAlign: "left" }}>College</th>
                        <th style={{ padding: "16px", textAlign: "left" }}>Project</th>
                        <th style={{ padding: "16px", textAlign: "center" }}>Status</th>
                        <th style={{ padding: "16px", textAlign: "left" }}>Judge Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalistTeams.map((team, idx) => (
                        <tr key={getRegistrationId(team) || idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "16px", fontWeight: 700, color: "#d97706" }}>#{idx + 1}</td>
                          <td style={{ padding: "16px", fontWeight: 700, color: "#059669" }}>{getRegistrationId(team)}</td>
                          
                          <td style={{ padding: "16px", color: "#334155" }}>{getTeamLead(team)}</td>
                          <td style={{ padding: "16px", color: "#64748b" }}>{getCollege(team)}</td>
                          <td style={{ padding: "16px", color: "#334155" }}>{getProjectTitle(team)}</td>
                          <td style={{ padding: "16px", textAlign: "center" }}>
                            <span style={{ padding: "4px 12px", background: "#fefcbf", color: "#b7791f", borderRadius: "20px", fontWeight: 750, fontSize: "12px" }}>
                              🏆 Finalist
                            </span>
                          </td>
                          <td style={{ padding: "16px", color: "#64748b", fontSize: "13px" }}>
                            {getJudgeRemarks(team) || "Qualified for finals"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {mobileOpen && <div className="hd-overlay" onClick={() => setMobileOpen(false)} />}
    </div>
  );
};

export default HackathonDashboard;