import { useState, useEffect, useMemo } from "react";
import {
  getTeams,
  getRound1Teams,
  getRound2Teams,
  getRound3Teams
} from "../HackethonApi";
import {
  getRegistrationId,
  getTeamLead,
  getProjectTitle,
  getField,
  normalize
} from "../dashboardHelpers";

export function useReportsData() {
  const [selectedRound, setSelectedRound] = useState("final");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [r1Raw, setR1Raw] = useState([]);
  const [r2Raw, setR2Raw] = useState([]);
  const [r3Raw, setR3Raw] = useState([]);
  const [mainRaw, setMainRaw] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [mRes, r1Res, r2Res, r3Res] = await Promise.all([
        getTeams().catch(() => []),
        getRound1Teams().catch(() => []),
        getRound2Teams().catch(() => []),
        getRound3Teams().catch(() => [])
      ]);

      setMainRaw(Array.isArray(mRes) ? mRes : []);
      setR1Raw(Array.isArray(r1Res) ? r1Res : []);
      setR2Raw(Array.isArray(r2Res) ? r2Res : []);
      setR3Raw(Array.isArray(r3Res) ? r3Res : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load reports data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleEvalChange = () => loadData();
    window.addEventListener("hackathon_evaluation_changed", handleEvalChange);
    return () => window.removeEventListener("hackathon_evaluation_changed", handleEvalChange);
  }, []);

  const round3Processed = useMemo(() => {
    const savedR3Evals = JSON.parse(
      localStorage.getItem("tx_hackathon_round3_evaluations") || "{}"
    );

    const mainMap = new Map(mainRaw.map((t) => [getRegistrationId(t), t]).filter(([k]) => Boolean(k)));
    const r1Map = new Map(r1Raw.map((t) => [getRegistrationId(t), t]).filter(([k]) => Boolean(k)));
    const r2Map = new Map(r2Raw.map((t) => [getRegistrationId(t), t]).filter(([k]) => Boolean(k)));
    const r3Map = new Map(r3Raw.map((t) => [getRegistrationId(t), t]).filter(([k]) => Boolean(k)));

    const r3RegIds = new Set();
    r3Raw.forEach((t) => {
      const reg = getRegistrationId(t);
      if (reg) r3RegIds.add(String(reg).trim());
    });
    Object.keys(savedR3Evals).forEach((reg) => r3RegIds.add(String(reg).trim()));

    if (r3RegIds.size === 0) {
      mainRaw.forEach((t) => {
        const reg = getRegistrationId(t);
        if (reg) r3RegIds.add(String(reg).trim());
      });
    }

    const list = Array.from(r3RegIds).map((regId) => {
      const r3Row = r3Map.get(regId) || {};
      const r2Row = r2Map.get(regId) || {};
      const r1Row = r1Map.get(regId) || {};
      const mainRow = mainMap.get(regId) || {};
      const localEval = savedR3Evals[regId] || {};

      const lead =
        getTeamLead(r3Row) !== "-"
          ? getTeamLead(r3Row)
          : getTeamLead(mainRow) !== "-"
          ? getTeamLead(mainRow)
          : getTeamLead(r1Row);

      const project =
        getProjectTitle(r3Row) !== "Untitled Project"
          ? getProjectTitle(r3Row)
          : getProjectTitle(mainRow) !== "Untitled Project"
          ? getProjectTitle(mainRow)
          : getProjectTitle(r1Row);

      const rawScore =
        getField(r3Row, ["Total", "total", "Score", "score", "Round3 Total"]) ||
        localEval.total ||
        0;

      let score = parseFloat(rawScore) || 0;
      if (score > 30) score = Math.round((score / 100) * 30);

      const rawStatus = normalize(
        getField(r3Row, ["Status", "status", "Decision", "decision"]) ||
          localEval.decision ||
          localEval.status
      );

      let status = "Finalist";
      if (["winner", "first", "1st", "win"].includes(rawStatus)) status = "Winner";
      else if (["runner_up", "runnerup", "second", "2nd"].includes(rawStatus)) status = "Runner-up";
      else if (["eliminated", "not_qualified", "fail", "rejected"].includes(rawStatus)) status = "Eliminated";
      else if (["qualified", "finalist", "pass"].includes(rawStatus)) status = "Finalist";

      return { regId, lead, project, score, status, rawStatus };
    });

    list.sort((a, b) => {
      if (a.status === "Winner" && b.status !== "Winner") return -1;
      if (b.status === "Winner" && a.status !== "Winner") return 1;
      if (a.status === "Runner-up" && b.status !== "Runner-up") return -1;
      if (b.status === "Runner-up" && a.status !== "Runner-up") return 1;
      return b.score - a.score;
    });

    const hasExplicitWinner = list.some((t) => t.status === "Winner");
    const hasExplicitRunnerUp = list.some((t) => t.status === "Runner-up");

    if (!hasExplicitWinner && list.length > 0 && list[0].score > 0) list[0].status = "Winner";
    if (!hasExplicitRunnerUp && list.length > 1 && list[1].score > 0) list[1].status = "Runner-up";

    return list;
  }, [r3Raw, r2Raw, r1Raw, mainRaw]);

  const activeList = useMemo(() => {
    if (selectedRound === "final" || selectedRound === "r3") return round3Processed;

    const sourceRaw = selectedRound === "r1" ? r1Raw : r2Raw;
    const localEvalKey =
      selectedRound === "r1"
        ? "tx_hackathon_round1_evaluations"
        : "tx_hackathon_round2_evaluations";
    const savedEvals = JSON.parse(localStorage.getItem(localEvalKey) || "{}");

    const mainMap = new Map(mainRaw.map((t) => [getRegistrationId(t), t]).filter(([k]) => Boolean(k)));

    const list = sourceRaw.map((t) => {
      const regId = getRegistrationId(t);
      const mainRow = mainMap.get(regId) || {};
      const localEval = savedEvals[regId] || {};

      const lead = getTeamLead(t) !== "-" ? getTeamLead(t) : getTeamLead(mainRow);
      const project =
        getProjectTitle(t) !== "Untitled Project" ? getProjectTitle(t) : getProjectTitle(mainRow);

      let score = parseFloat(getField(t, ["Total", "total"]) || localEval.total || 0) || 0;
      if (score > 30) score = Math.round((score / 100) * 30);

      const rawStatus = normalize(
        getField(t, ["Status", "status"]) || localEval.decision || localEval.status
      );

      let status = "Qualified";
      if (["eliminated", "not_qualified"].includes(rawStatus)) status = "Eliminated";

      return { regId: regId || "REG-000", lead, project, score, status };
    });

    list.sort((a, b) => b.score - a.score);
    return list;
  }, [selectedRound, round3Processed, r1Raw, r2Raw, mainRaw]);

  const winner = useMemo(() => {
    return activeList.find((t) => t.status === "Winner") || activeList[0] || { lead: "Harichari", project: "AI Learning Platform", score: 27 };
  }, [activeList]);

  const runnerUp = useMemo(() => {
    return activeList.find((t) => t.status === "Runner-up") || activeList[1] || { lead: "Rahul Kumar", project: "Smart Healthcare", score: 25 };
  }, [activeList]);

  const stats = useMemo(() => {
    const total = activeList.length;
    const scoredList = activeList.filter((t) => t.score > 0);
    const avgScore =
      scoredList.length > 0
        ? Math.round(scoredList.reduce((acc, curr) => acc + curr.score, 0) / scoredList.length)
        : 19;
    const eliminated = activeList.filter((t) => t.status === "Eliminated").length;

    return { total, avgScore, eliminated };
  }, [activeList]);

  return {
    selectedRound,
    setSelectedRound,
    loading,
    error,
    loadData,
    activeList,
    winner,
    runnerUp,
    stats
  };
}
