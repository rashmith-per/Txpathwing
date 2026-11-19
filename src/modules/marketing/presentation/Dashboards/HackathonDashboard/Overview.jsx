import React, { useEffect, useState } from "react";
import { RefreshCw, XCircle } from "lucide-react";
import {
  getTeams,
  getRound1Teams,
  getRound2Teams,
  getRound3Teams,
  saveAttendance,
  getLocalAttendanceMap
} from "./HackethonApi";
import {
  getRegistrationId,
  getField,
  normalize
} from "./dashboardHelpers";
import { OverviewStats } from "./components/OverviewStats";
import { OverviewTeamsTable } from "./components/OverviewTeamsTable";
import "./Overview.css";

const getLocalMap = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};

const Overview = () => {
  const [teams, setTeams] = useState([]);
  const [r1SheetTeams, setR1SheetTeams] = useState([]);
  const [r2SheetTeams, setR2SheetTeams] = useState([]);
  const [r3SheetTeams, setR3SheetTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const [mainRes, r1Res, r2Res, r3Res] = await Promise.all([
        getTeams().catch(() => []),
        getRound1Teams().catch(() => []),
        getRound2Teams().catch(() => []),
        getRound3Teams().catch(() => [])
      ]);

      setTeams(Array.isArray(mainRes) ? mainRes : []);
      setR1SheetTeams(Array.isArray(r1Res) ? r1Res : []);
      setR2SheetTeams(Array.isArray(r2Res) ? r2Res : []);
      setR3SheetTeams(Array.isArray(r3Res) ? r3Res : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    const handleDataChange = () => loadAllData();
    window.addEventListener("hackathon_attendance_changed", handleDataChange);
    window.addEventListener("hackathon_evaluation_changed", handleDataChange);
    return () => {
      window.removeEventListener("hackathon_attendance_changed", handleDataChange);
      window.removeEventListener("hackathon_evaluation_changed", handleDataChange);
    };
  }, []);

  const handleMarkPresent = async (team) => {
    const regId = getRegistrationId(team);
    if (!regId) return alert("Registration ID missing for team.");

    try {
      setProcessingId(regId);
      await saveAttendance(regId, "Present");
      loadAllData();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to mark attendance.");
    } finally {
      setProcessingId(null);
    }
  };

  const attendanceMap = getLocalAttendanceMap();
  const r1Evals = getLocalMap("tx_hackathon_round1_evaluations");
  const r2Evals = getLocalMap("tx_hackathon_round2_evaluations");
  const r3Evals = getLocalMap("tx_hackathon_round3_evaluations");

  const isTeamPresent = (team) => {
    const regId = String(getRegistrationId(team) || "").trim();
    if (regId && attendanceMap[regId]) {
      const norm = normalize(attendanceMap[regId]);
      if (["present", "yes", "true", "1", "attended"].includes(norm)) return true;
      if (["absent", "no", "false", "0", "notpresent"].includes(norm)) return false;
    }
    if (r1SheetTeams.some((t) => String(getRegistrationId(t)).trim() === regId)) return true;
    const sheetAtt = normalize(getField(team, ["Attendance", "Attendance Status", "attendance"]));
    return ["present", "attended", "yes"].includes(sheetAtt);
  };

  const isTeamAbsent = (team) => {
    const regId = String(getRegistrationId(team) || "").trim();
    if (regId && attendanceMap[regId]) return normalize(attendanceMap[regId]) === "absent";
    const sheetAtt = normalize(getField(team, ["Attendance", "Attendance Status", "attendance"]));
    return sheetAtt === "absent";
  };

  const getR1Status = (regId) => {
    if (!regId) return "Pending";
    const cleanId = String(regId).trim();
    if (r1Evals[cleanId]) {
      const dec = normalize(r1Evals[cleanId].decision || r1Evals[cleanId].status);
      if (["qualified", "r1qualified", "pass"].includes(dec)) return "Qualified";
      if (["not_qualified", "eliminated"].includes(dec)) return "Eliminated";
    }
    const r1Row = r1SheetTeams.find((t) => String(getRegistrationId(t)).trim() === cleanId);
    if (r1Row) {
      const st = normalize(getField(r1Row, ["Status", "status"]));
      if (["qualified", "r1qualified", "pass"].includes(st)) return "Qualified";
      if (["eliminated", "not_qualified"].includes(st)) return "Eliminated";
    }
    if (r2SheetTeams.some((t) => String(getRegistrationId(t)).trim() === cleanId)) return "Qualified";
    return "Pending";
  };

  const getR2Status = (regId) => {
    if (!regId) return "Pending";
    const cleanId = String(regId).trim();
    if (r2Evals[cleanId]) {
      const dec = normalize(r2Evals[cleanId].decision || r2Evals[cleanId].status);
      if (["qualified", "r2qualified", "pass"].includes(dec)) return "Qualified";
      if (["not_qualified", "eliminated"].includes(dec)) return "Eliminated";
    }
    const r2Row = r2SheetTeams.find((t) => String(getRegistrationId(t)).trim() === cleanId);
    if (r2Row) {
      const st = normalize(getField(r2Row, ["Status", "status"]));
      if (["qualified", "r2qualified", "pass"].includes(st)) return "Qualified";
      if (["eliminated", "not_qualified"].includes(st)) return "Eliminated";
    }
    if (r3SheetTeams.some((t) => String(getRegistrationId(t)).trim() === cleanId)) return "Qualified";
    if (getR1Status(cleanId) === "Qualified") return "Pending";
    return "—";
  };

  const getR3Status = (regId) => {
    if (!regId) return "Pending";
    const cleanId = String(regId).trim();
    if (r3Evals[cleanId]) {
      const dec = normalize(r3Evals[cleanId].decision || r3Evals[cleanId].status);
      if (["qualified", "r3qualified", "pass"].includes(dec)) return "Finalist";
      if (["not_qualified", "eliminated"].includes(dec)) return "Eliminated";
    }
    const r3Row = r3SheetTeams.find((t) => String(getRegistrationId(t)).trim() === cleanId);
    if (r3Row) {
      const st = normalize(getField(r3Row, ["Status", "status"]));
      if (["qualified", "r3qualified", "pass"].includes(st)) return "Finalist";
      if (["eliminated", "not_qualified"].includes(st)) return "Eliminated";
    }
    if (getR2Status(cleanId) === "Qualified" || r3SheetTeams.some((t) => String(getRegistrationId(t)).trim() === cleanId)) return "Pending";
    return "—";
  };

  const total = teams.length;
  const present = teams.filter(isTeamPresent).length;
  const absent = teams.filter(isTeamAbsent).length;
  const pending = Math.max(total - present - absent, 0);

  const round1Qualified = teams.filter((t) => getR1Status(getRegistrationId(t)) === "Qualified").length;
  const round2Qualified = teams.filter((t) => getR2Status(getRegistrationId(t)) === "Qualified").length;
  const round3Finalists = teams.filter((t) => getR3Status(getRegistrationId(t)) === "Finalist" || r3SheetTeams.some((r3) => String(getRegistrationId(r3)).trim() === String(getRegistrationId(t)).trim())).length;

  const recentTeams = teams.slice(0, 15);

  if (loading) {
    return (
      <div className="overview-page">
        <div className="overview-loading">
          <RefreshCw className="overview-spin" size={32} />
          <h3>Loading Dashboard</h3>
          <p>Fetching hackathon data across Round 1, 2, and 3...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overview-page">
        <div className="overview-error">
          <XCircle size={45} />
          <h3>Unable to load dashboard</h3>
          <p>{error}</p>
          <button onClick={loadAllData}>
            <RefreshCw size={17} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-page">
      <div className="overview-header">
        <div>
          <p className="overview-eyebrow">HACKATHON OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="overview-description">
            Monitor team registration, attendance, and evaluation progress across Round 1, Round 2, and Round 3.
          </p>
        </div>
        <button className="overview-refresh" onClick={loadAllData}>
          <RefreshCw size={17} /> Refresh
        </button>
      </div>

      <OverviewStats
        total={total}
        present={present}
        absent={absent}
        pending={pending}
        round1Qualified={round1Qualified}
        round2Qualified={round2Qualified}
        round3Finalists={round3Finalists}
      />

      <OverviewTeamsTable
        recentTeams={recentTeams}
        total={total}
        processingId={processingId}
        isTeamPresent={isTeamPresent}
        isTeamAbsent={isTeamAbsent}
        getR1Status={getR1Status}
        getR2Status={getR2Status}
        getR3Status={getR3Status}
        handleMarkPresent={handleMarkPresent}
      />
    </div>
  );
};

export default Overview;
