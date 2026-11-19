import {
  getRegistrationId,
  getTeamLead,
  getProjectTitle,
  getTechnology,
  normalize
} from "./teamFieldHelpers";
import { isPresent, isAbsent } from "./teamStatusHelpers";

export function buildMergedRoundList(roundNum, roundTeams, mainTeams, localKey) {
  const mainTeamMap = new Map();
  for (const t of mainTeams) {
    const id = getRegistrationId(t);
    if (id) mainTeamMap.set(String(id).trim(), t);
  }

  const mergedList = [];
  const localEvals = JSON.parse(localStorage.getItem(localKey) || "{}");

  if (roundNum === 1) {
    const candidateMap = new Map();

    mainTeams.forEach((mTeam) => {
      const regId = getRegistrationId(mTeam);
      if (regId && isPresent(mTeam)) {
        candidateMap.set(String(regId).trim(), { ...mTeam });
      }
    });

    roundTeams.forEach((rTeam) => {
      const regId = getRegistrationId(rTeam);
      if (regId) {
        const cleanId = String(regId).trim();
        if (!isAbsent(rTeam)) {
          const existing = candidateMap.get(cleanId) || mainTeamMap.get(cleanId) || {};
          candidateMap.set(cleanId, { ...existing, ...rTeam });
        }
      }
    });

    candidateMap.forEach((teamObj, regId) => {
      const mainTeamRow = mainTeamMap.get(regId) || {};
      const mergedObj = { ...mainTeamRow, ...teamObj };

      const lead =
        getTeamLead(teamObj) !== "-"
          ? getTeamLead(teamObj)
          : getTeamLead(mainTeamRow) !== "-"
          ? getTeamLead(mainTeamRow)
          : getTeamLead(mergedObj);

      const project =
        getProjectTitle(teamObj) !== "Untitled Project"
          ? getProjectTitle(teamObj)
          : getProjectTitle(mainTeamRow) !== "Untitled Project"
          ? getProjectTitle(mainTeamRow)
          : getProjectTitle(mergedObj);

      const tech =
        getTechnology(teamObj) !== "-"
          ? getTechnology(teamObj)
          : getTechnology(mainTeamRow) !== "-"
          ? getTechnology(mainTeamRow)
          : getTechnology(mergedObj);

      if (localEvals[regId]) {
        const evalData = localEvals[regId];
        mergedObj.Innovation = evalData.innovation;
        mergedObj.Technical = evalData.technical;
        mergedObj.Presentation = evalData.presentation;
        mergedObj.Total = evalData.total;
        mergedObj["Round 1 Status"] = evalData.status;
        mergedObj.Comments = evalData.comments;
      }

      mergedList.push({
        ...mergedObj,
        _computedLead: lead,
        _computedProject: project,
        _computedTech: tech
      });
    });

    return mergedList;
  }

  const candidateMap = new Map();
  roundTeams.forEach((rTeam) => {
    const regId = getRegistrationId(rTeam);
    if (regId) {
      const cleanId = String(regId).trim();
      candidateMap.set(cleanId, { ...(mainTeamMap.get(cleanId) || {}), ...rTeam });
    }
  });

  if (roundNum === 2) {
    const r1Evals = JSON.parse(localStorage.getItem("tx_hackathon_round1_evaluations") || "{}");
    Object.keys(r1Evals).forEach((regId) => {
      const ev = r1Evals[regId];
      const st = normalize(ev.decision || ev.status);
      if (["qualified", "r1qualified", "pass"].includes(st)) {
        const existing = candidateMap.get(regId) || mainTeamMap.get(regId) || {};
        candidateMap.set(regId, { ...existing });
      }
    });
  }

  if (roundNum === 3) {
    const r2Evals = JSON.parse(localStorage.getItem("tx_hackathon_round2_evaluations") || "{}");
    Object.keys(r2Evals).forEach((regId) => {
      const ev = r2Evals[regId];
      const st = normalize(ev.decision || ev.status);
      if (["qualified", "r2qualified", "pass"].includes(st)) {
        const existing = candidateMap.get(regId) || mainTeamMap.get(regId) || {};
        candidateMap.set(regId, { ...existing });
      }
    });
  }

  if (candidateMap.size === 0) {
    mainTeams.forEach((mTeam) => {
      const regId = getRegistrationId(mTeam);
      if (regId) candidateMap.set(String(regId).trim(), { ...mTeam });
    });
  }

  candidateMap.forEach((teamObj, regId) => {
    const mainTeamRow = mainTeamMap.get(regId) || {};
    const mergedObj = { ...mainTeamRow, ...teamObj };

    const lead =
      getTeamLead(teamObj) !== "-"
        ? getTeamLead(teamObj)
        : getTeamLead(mainTeamRow) !== "-"
        ? getTeamLead(mainTeamRow)
        : getTeamLead(mergedObj);

    const project =
      getProjectTitle(teamObj) !== "Untitled Project"
        ? getProjectTitle(teamObj)
        : getProjectTitle(mainTeamRow) !== "Untitled Project"
        ? getProjectTitle(mainTeamRow)
        : getProjectTitle(mergedObj);

    const tech =
      getTechnology(teamObj) !== "-"
        ? getTechnology(teamObj)
        : getTechnology(mainTeamRow) !== "-"
        ? getTechnology(mainTeamRow)
        : getTechnology(mergedObj);

    if (localEvals[regId]) {
      const evalData = localEvals[regId];
      mergedObj.Innovation = evalData.innovation;
      mergedObj.Technical = evalData.technical;
      mergedObj.Presentation = evalData.presentation;
      mergedObj.Total = evalData.total;
      if (roundNum === 2) mergedObj["Round 2 Status"] = evalData.status;
      if (roundNum === 3) {
        mergedObj["Round 3 Status"] = evalData.status;
        mergedObj["Status"] = evalData.status;
      }
      mergedObj.Comments = evalData.comments;
    }

    mergedList.push({
      ...mergedObj,
      _computedLead: lead,
      _computedProject: project,
      _computedTech: tech
    });
  });

  return mergedList;
}
