export const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_.-]+/g, "");

export const getField = (team, names, fallback = "") => {
  if (!team) return fallback;

  for (const name of names) {
    if (
      team[name] !== undefined &&
      team[name] !== null &&
      String(team[name]).trim() !== ""
    ) {
      return String(team[name]).trim();
    }
  }

  const keys = Object.keys(team);
  const normalizedNames = names.map(normalize);

  for (const key of keys) {
    const val = team[key];
    if (val !== undefined && val !== null && String(val).trim() !== "") {
      const normKey = normalize(key);
      if (normalizedNames.some((n) => normKey === n || normKey.includes(n) || n.includes(normKey))) {
        return String(val).trim();
      }
    }
  }

  return fallback;
};

export const getRegistrationId = (team) =>
  getField(team, [
    "Registration ID",
    "registrationId",
    "Registration Number",
    "Registration No",
    "Reg No",
    "Participant Reg",
    "id"
  ]);

export const getTeamName = (team) => getField(team, ["Team Name", "Team"]);

export const getTeamLead = (team) => {
  if (!team) return "-";
  if (typeof team.lead === "string" && team.lead.trim()) return team.lead.trim();
  if (typeof team.lead === "object" && team.lead !== null) {
    if (team.lead.fullName) return team.lead.fullName;
    if (team.lead.name) return team.lead.name;
  }
  if (typeof team.student === "object" && team.student !== null) {
    if (team.student.fullName) return team.student.fullName;
    if (team.student.name) return team.student.name;
  }

  const priorityKeys = [
    "Team Lead", "Team_Lead", "Team Leader", "Team_Leader",
    "Team Lead Name", "Team_Lead_Name", "Team Leader Name", "Team_Leader_Name",
    "Lead Name", "Lead_Name", "Leader Name", "Leader_Name",
    "Lead / Student Full Name", "Participant / Team Leader Name",
    "Participant Name", "Participant_Name", "Full Name", "Full_Name",
    "lead_fullName", "student_fullName", "lead_name", "student_name",
    "leadFullName", "studentFullName", "leadName", "studentName",
    "Name", "name", "Lead", "lead"
  ];

  for (const k of priorityKeys) {
    if (team[k] !== undefined && team[k] !== null && String(team[k]).trim() !== "" && String(team[k]).trim() !== "-") {
      return String(team[k]).trim();
    }
  }

  const membersVal = getField(team, ["Team Members", "Members", "members", "team_members"]);
  if (membersVal) {
    const first = membersVal.split(",")[0];
    if (first && first.trim()) return first.trim();
  }

  return "-";
};

export const getProjectTitle = (team) => {
  if (!team) return "Untitled Project";
  if (typeof team.project === "string" && team.project.trim()) return team.project.trim();
  if (typeof team.project === "object" && team.project?.title) return team.project.title;

  const val = getField(team, [
    "Project Title",
    "Project / Solution Title",
    "idea_projectTitle",
    "idea_title",
    "challenge_challengeTitle",
    "challenge_title",
    "Team Name",
    "Team",
    "Challenge Title",
    "Project",
    "Title"
  ]);

  return val || "Untitled Project";
};

export const getTechnology = (team) => {
  if (!team) return "-";
  if (typeof team.technology === "string" && team.technology.trim()) return team.technology.trim();

  const val = getField(team, [
    "Technology",
    "Technologies",
    "technology_skills",
    "technology_domains",
    "Tech Stack",
    "Tech",
    "Technologies / Languages",
    "Selected Tech Domains",
    "Technology / Skill Domains",
    "Skills"
  ]);

  return val || "-";
};

export const getChallenge = (team) =>
  getField(team, [
    "Challenge Title",
    "Challenge",
    "Problem Statement",
    "idea_projectTitle",
    "idea_title",
    "challenge_challengeTitle",
    "challenge_title"
  ], "-");
