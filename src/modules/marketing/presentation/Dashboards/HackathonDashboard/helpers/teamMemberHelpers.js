import { getField, getTeamLead } from "./teamFieldHelpers";

export const parseMemberDetailsString = (text) => {
  if (!text || typeof text !== "string") return [];
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  let blocks = normalized.split(/\n\s*---\s*\n/).filter((b) => b.trim());
  if (blocks.length <= 1 && /#\d+/.test(normalized)) {
    blocks = normalized.split(/(?=#\d+)/).filter((b) => b.trim());
  }

  const results = [];
  blocks.forEach((block, index) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lines.length) return;

    let role = index === 0 ? "Team Lead" : `Member ${index + 1}`;
    let name = "";
    let email = "";
    let phone = "";
    let altContact = "";
    let college = "";
    let department = "";
    let year = "";
    let studentId = "";
    let skills = "";

    lines.forEach((line) => {
      if (/^#\d+/.test(line)) {
        if (/team\s*leader/i.test(line) || /lead/i.test(line)) {
          role = "Team Lead";
        } else {
          const matchNum = line.match(/^#(\d+)/);
          role = matchNum ? `Member ${matchNum[1]}` : `Member ${index + 1}`;
        }
        return;
      }

      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) {
        if (!name && !line.startsWith("#") && !line.startsWith("---")) {
          name = line;
        }
        return;
      }

      const key = line.slice(0, colonIdx).trim().toLowerCase();
      const val = line.slice(colonIdx + 1).trim();

      if (key === "name" || key === "full name" || key === "member name") {
        name = val;
      } else if (key === "email" || key === "email address") {
        email = val;
      } else if (key === "mobile" || key === "phone" || key === "contact") {
        phone = val;
      } else if (key.includes("alt") || key.includes("alternate")) {
        altContact = val;
      } else if (key === "college" || key === "institution" || key === "university") {
        college = val;
      } else if (key === "dept" || key === "department") {
        if (val.includes("|")) {
          val.split("|").forEach((p) => {
            const cIdx = p.indexOf(":");
            if (cIdx !== -1) {
              const pk = p.slice(0, cIdx).trim().toLowerCase();
              const pv = p.slice(cIdx + 1).trim();
              if (pk === "dept" || pk === "department") department = pv;
              if (pk === "year" || pk === "year of study") year = pv;
            } else {
              department = p.trim();
            }
          });
        } else {
          department = val;
        }
      } else if (key === "year" || key === "year of study") {
        year = val;
      } else if (key.includes("student id") || key.includes("roll")) {
        studentId = val;
      } else if (key.includes("skills") || key.includes("primary skills")) {
        skills = val;
      }
    });

    if (name) {
      results.push({
        name,
        role,
        email,
        phone,
        altContact,
        college,
        department,
        year,
        studentId,
        skills
      });
    }
  });

  return results;
};

export const getAllMemberDetails = (team) => {
  if (!team) return [];

  const rawDetails = getField(team, [
    "Team Members Details",
    "Team_Members_Details",
    "team_members_details",
    "Team Member Details",
    "members_details"
  ]);

  if (rawDetails && typeof rawDetails === "string" && rawDetails.trim()) {
    const parsed = parseMemberDetailsString(rawDetails);
    if (parsed.length > 0) {
      return parsed;
    }
  }

  if (Array.isArray(team.members) && team.members.length > 0) {
    return team.members
      .map((m, idx) => {
        if (typeof m === "string" && m.trim()) {
          return {
            name: m.trim(),
            role: idx === 0 ? "Team Lead" : `Member ${idx + 1}`,
            email: "",
            phone: "",
            college: ""
          };
        }
        if (typeof m === "object" && m !== null) {
          return {
            name: m.name || m.fullName || `Member ${idx + 1}`,
            role: m.role || (idx === 0 ? "Team Lead" : `Member ${idx + 1}`),
            email: m.email || "",
            phone: m.mobile || m.phone || "",
            altContact: m.alternateContact || m.altContact || "",
            college: m.college || "",
            department: m.department || "",
            year: m.year || "",
            studentId: m.studentId || "",
            skills: m.skills || ""
          };
        }
        return null;
      })
      .filter((m) => m && m.name);
  }

  const list = [];
  const addedNames = new Set();

  const addMember = (name, role, extra = {}) => {
    if (!name || name === "-" || name === "null" || name === "undefined") return;
    const cleanName = String(name).trim();
    if (!cleanName || /^\d+$/.test(cleanName)) return;

    const norm = cleanName.toLowerCase();
    if (addedNames.has(norm)) return;
    addedNames.add(norm);

    list.push({
      name: cleanName,
      role: role || (list.length === 0 ? "Team Lead" : `Member ${list.length + 1}`),
      email: extra.email || getField(team, ["Email", "Lead Email", "Email Address", "student_email", "lead_email"]),
      phone: extra.phone || getField(team, ["Phone", "Mobile", "Mobile Number", "Contact Number", "student_phone", "lead_phone"]),
      college: extra.college || getField(team, ["College", "Institution", "University", "College / University", "student_college", "lead_college"]),
      department: extra.department || getField(team, ["Department", "lead_department"]),
      year: extra.year || getField(team, ["Year of Study", "Year", "lead_year"]),
      studentId: extra.studentId || getField(team, ["Student ID / Roll No", "Student ID", "lead_studentId"]),
      skills: extra.skills || getField(team, ["Skills", "Selected Tech Domains", "lead_skills"]),
      ...extra
    });
  };

  [1, 2, 3, 4, 5].forEach((num) => {
    const val = getField(team, [
      `Member ${num}`,
      `Member ${num} Name`,
      `Member_${num}`,
      `member_${num}_name`,
      `members_${num - 1}_name`
    ]);
    if (val) {
      addMember(val, num === 1 ? "Team Lead" : `Member ${num}`, {
        email: getField(team, [`Member ${num} Email`, `members_${num - 1}_email`]),
        phone: getField(team, [`Member ${num} Mobile`, `Member ${num} Phone`, `members_${num - 1}_mobile`]),
        college: getField(team, [`Member ${num} College`, `members_${num - 1}_college`])
      });
    }
  });

  const rawMembers = getField(team, ["Team Members", "Members", "Team Member"]);
  if (typeof rawMembers === "string" && rawMembers.trim()) {
    const splitNames = rawMembers
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s && !/^\d+$/.test(s) && !s.toLowerCase().startsWith("name:") && !s.toLowerCase().startsWith("email:"));
    splitNames.forEach((n) => addMember(n));
  }

  if (list.length === 0) {
    const leadName = getTeamLead(team);
    if (leadName && leadName !== "-") {
      addMember(leadName, "Team Lead");
    }
  }

  return list;
};

export const getMembers = (team) => {
  const details = getAllMemberDetails(team);
  if (details.length > 0) {
    return details.map((m) => m.name).join(", ");
  }
  return getField(
    team,
    [
      "Team Members Details",
      "Team_Members_Details",
      "Team Members",
      "Members",
      "Team Member"
    ],
    "-"
  );
};
