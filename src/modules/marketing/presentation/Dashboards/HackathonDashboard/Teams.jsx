import React, { useEffect, useState } from "react";
import { Download, Filter } from "lucide-react";
import { getTeams, saveAttendance } from "./HackethonApi";
import {
  getRegistrationId,
  getTeamName,
  getTeamLead,
  getMembers,
  getTechnology,
  getChallenge,
  getAttendance,
  isPresent,
  isAbsent
} from "./dashboardHelpers";
import { TeamsTable } from "./components/TeamsTable";
import { TeamMembersModal } from "./components/TeamMembersModal";
import "./Teams.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeamForModal, setSelectedTeamForModal] = useState(null);

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedTeamForModal(null);
    };
    if (selectedTeamForModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedTeamForModal]);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTeams();
      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load teams");
    } finally {
      setLoading(false);
    }
  };

  const handleAttendance = async (team, status) => {
    const registrationId = getRegistrationId(team);
    if (!registrationId) {
      alert("Registration ID is missing for this team.");
      return;
    }

    setTeams((current) =>
      current.map((item) =>
        getRegistrationId(item) === registrationId ? { ...item, Attendance: status } : item
      )
    );

    try {
      await saveAttendance(registrationId, status);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save attendance.");
    }
  };

  const filteredTeams = teams.filter((team) => {
    if (activeFilter === "present") return isPresent(team);
    if (activeFilter === "absent") return isAbsent(team);
    return true;
  });

  const exportCSV = () => {
    const headers = ["S.No", "Registration No", "Team Name", "Team Lead", "Team Members", "Technology", "Challenge", "Attendance"];
    const rows = filteredTeams.map((team, index) => [
      index + 1,
      getRegistrationId(team),
      getTeamName(team),
      getTeamLead(team),
      getMembers(team),
      getTechnology(team),
      getChallenge(team),
      getAttendance(team) || "Pending"
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hackathon-teams.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="teams-loading">Loading teams...</div>;

  if (error) {
    return (
      <div className="teams-error">
        <h2>Unable to load teams</h2>
        <p>{error}</p>
        <button onClick={loadTeams}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="teams-page">
      <div className="teams-header">
        <h1>Team's Section</h1>
        <button className="export-btn" onClick={exportCSV}>
          <Download size={17} /> Export CSV
        </button>
      </div>

      <div className="teams-filters">
        {["all", "present", "absent"].map((filterKey) => (
          <button
            key={filterKey}
            className={`teams-filter ${activeFilter === filterKey ? "active" : ""}`}
            onClick={() => setActiveFilter(filterKey)}
          >
            <Filter size={15} />
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
          </button>
        ))}
      </div>

      <TeamsTable
        filteredTeams={filteredTeams}
        activeFilter={activeFilter}
        handleAttendance={handleAttendance}
        onSelectTeam={setSelectedTeamForModal}
      />

      <TeamMembersModal
        team={selectedTeamForModal}
        onClose={() => setSelectedTeamForModal(null)}
      />
    </section>
  );
};

export default Teams;
