import { useEffect, useState } from "react";
import { getTeams } from "../HackethonApi";
import { getRegistrationId } from "./teamFieldHelpers";
import { buildMergedRoundList } from "./roundMergeHelper";

export const useRoundData = (roundNum, getRoundTeamsApi, saveEvaluationApi, localKey) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [evaluationOpen, setEvaluationOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      let roundTeams = [];
      let mainTeams = [];

      try {
        const rData = await getRoundTeamsApi();
        if (Array.isArray(rData)) roundTeams = rData;
      } catch (err) {
        console.warn(`getRound${roundNum}Teams failed, falling back to getTeams:`, err);
      }

      try {
        const teamsData = await getTeams();
        if (Array.isArray(teamsData)) mainTeams = teamsData;
      } catch (err) {
        console.warn("getTeams failed in loadData:", err);
      }

      const mergedList = buildMergedRoundList(roundNum, roundTeams, mainTeams, localKey);
      setTeams(mergedList);
    } catch (err) {
      console.error(err);
      setError(err.message || `Unable to load Round ${roundNum} teams`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleAttendanceChange = () => loadData();
    const handleEvalChange = () => loadData();
    window.addEventListener("hackathon_attendance_changed", handleAttendanceChange);
    window.addEventListener("hackathon_evaluation_changed", handleEvalChange);
    return () => {
      window.removeEventListener("hackathon_attendance_changed", handleAttendanceChange);
      window.removeEventListener("hackathon_evaluation_changed", handleEvalChange);
    };
  }, []);

  const handleOpenEvaluation = (team) => {
    setSelectedTeam(team);
    setEvaluationOpen(true);
  };

  const handleCloseEvaluation = () => {
    setEvaluationOpen(false);
    setSelectedTeam(null);
  };

  const handleReviewSubmit = async (data) => {
    if (!selectedTeam) return;
    const regId = getRegistrationId(selectedTeam);
    if (!regId) return;

    const localEvals = JSON.parse(localStorage.getItem(localKey) || "{}");
    localEvals[regId] = {
      innovation: data.innovation,
      technical: data.technical,
      presentation: data.presentation,
      total: data.total,
      comments: data.comments,
      status: data.decision,
      decision: data.decision,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(localKey, JSON.stringify(localEvals));

    setTeams((prev) =>
      prev.map((t) => {
        if (getRegistrationId(t) === regId) {
          const updated = {
            ...t,
            Innovation: data.innovation,
            Technical: data.technical,
            Presentation: data.presentation,
            Total: data.total,
            Comments: data.comments,
            Status: data.decision
          };
          if (roundNum === 1) updated["Round 1 Status"] = data.decision;
          if (roundNum === 2) updated["Round 2 Status"] = data.decision;
          if (roundNum === 3) {
            updated["Round 3 Status"] = data.decision;
            updated["Status"] = data.decision;
          }
          return updated;
        }
        return t;
      })
    );

    window.dispatchEvent(
      new CustomEvent("hackathon_evaluation_changed", {
        detail: { registrationId: regId, round: roundNum }
      })
    );

    try {
      await saveEvaluationApi(
        regId,
        data.innovation,
        data.technical,
        data.presentation,
        data.total,
        data.comments,
        data.decision
      );
    } catch (err) {
      console.warn(`Failed backend sync for Round ${roundNum}:`, err);
    }

    handleCloseEvaluation();
  };

  return {
    teams,
    loading,
    error,
    selectedTeam,
    evaluationOpen,
    loadData,
    handleOpenEvaluation,
    handleCloseEvaluation,
    handleReviewSubmit
  };
};
