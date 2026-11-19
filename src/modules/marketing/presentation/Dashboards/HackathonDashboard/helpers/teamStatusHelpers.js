import { getLocalAttendanceMap } from "../HackethonApi";
import { normalize, getField, getRegistrationId } from "./teamFieldHelpers";

export const getAttendance = (team) => {
  const regId = getRegistrationId(team);
  const localMap = getLocalAttendanceMap();
  if (regId && localMap[String(regId).trim()]) {
    return localMap[String(regId).trim()];
  }
  const sheetAtt = getField(team, [
    "Attendance",
    "Attendance Status",
    "Attendance_Status",
    "attendance",
    "Presence"
  ]);
  const norm = normalize(sheetAtt);
  if (["present", "attended", "yes", "true", "1"].includes(norm)) return "Present";
  if (["absent", "no", "false", "0"].includes(norm)) return "Absent";
  return "Pending";
};

export const isPresent = (team) => normalize(getAttendance(team)) === "present";
export const isAbsent = (team) => normalize(getAttendance(team)) === "absent";

export const getRoundStatus = (team, roundNum) => {
  if (!team) return { label: "Pending", type: "pending" };

  const regId = getRegistrationId(team);
  let rawStatus = "";

  if (regId) {
    try {
      const localKey = `tx_hackathon_round${roundNum}_evaluations`;
      const localEvals = JSON.parse(localStorage.getItem(localKey) || "{}");
      if (localEvals[String(regId).trim()]) {
        rawStatus =
          localEvals[String(regId).trim()].decision ||
          localEvals[String(regId).trim()].status;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!rawStatus) {
    if (roundNum === 1) {
      rawStatus =
        team["Round 1 Status"] ||
        team["Round1 Status"] ||
        team["Round 1"] ||
        team["R1 Status"];
    } else if (roundNum === 2) {
      rawStatus =
        team["Round 2 Status"] ||
        team["Round2 Status"] ||
        team["Round 2"] ||
        team["R2 Status"];
    } else if (roundNum === 3) {
      rawStatus =
        team["Round 3 Status"] ||
        team["Round3 Status"] ||
        team["Round 3"] ||
        team["R3 Status"];
    }
  }

  if (!rawStatus && team.Status && typeof team.Status === "string") {
    const s = team.Status.trim();
    const sLower = s.toLowerCase();
    if (roundNum === 1 && !sLower.includes("r2") && !sLower.includes("r3")) {
      rawStatus = s;
    } else if (roundNum === 2 && sLower.includes("r2")) {
      rawStatus = s;
    } else if (roundNum === 3 && sLower.includes("r3")) {
      rawStatus = s;
    }
  }

  const norm = normalize(rawStatus);

  if (
    norm.includes("notqualified") ||
    norm.includes("eliminated") ||
    norm.includes("fail") ||
    norm.includes("reject")
  ) {
    return {
      label: "Eliminated",
      type: "eliminated"
    };
  }

  if (
    norm.includes("qualified") ||
    norm.includes("pass") ||
    norm.includes("selected")
  ) {
    return {
      label: `R${roundNum} Qualified`,
      type: "qualified"
    };
  }

  if (
    norm.includes("clarification") ||
    norm.includes("review")
  ) {
    return {
      label: "Clarification",
      type: "clarification"
    };
  }

  return {
    label: "Pending",
    type: "pending"
  };
};
