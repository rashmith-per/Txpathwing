const SPREADSHEET_ID = "1Bm0cZhzV07vcYRrcU38Vng5Jmde_ihSPZGhj4Cohfms";
const MAIN_SHEET_NAME = "Sheet1";
const ROUND1_SHEET_NAME = "Round1";
const ROUND2_SHEET_NAME = "Round2";
const ROUND3_SHEET_NAME = "Round3";

/* =========================================================
   GET REQUEST
========================================================= */
function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : "";

    if (action === "getTeams") {
      return getTeams();
    }

    if (action === "getRound1") {
      return getRound1Teams();
    }

    if (action === "getRound2") {
      return getRound2Teams();
    }

    if (action === "getRound3") {
      return getRound3Teams();
    }

    if (action === "backfillRound2") {
      return backfillRound2MissingData();
    }

    if (action === "backfillRound3") {
      return backfillRound3MissingData();
    }

    if (action === "saveAttendance") {
      return saveAttendance({
        registrationId: e.parameter.registrationId,
        attendance: e.parameter.attendance
      });
    }

    if (action === "saveRound1Evaluation") {
      return saveRound1Evaluation({
        registrationId: e.parameter.registrationId,
        innovation: e.parameter.innovation,
        technical: e.parameter.technical,
        presentation: e.parameter.presentation,
        total: e.parameter.total,
        comments: e.parameter.comments,
        status: e.parameter.status
      });
    }

    if (action === "saveRound2Evaluation") {
      return saveRound2Evaluation({
        registrationId: e.parameter.registrationId,
        innovation: e.parameter.innovation,
        technical: e.parameter.technical,
        presentation: e.parameter.presentation,
        total: e.parameter.total,
        comments: e.parameter.comments,
        status: e.parameter.status
      });
    }

    if (action === "saveRound3Evaluation") {
      return saveRound3Evaluation({
        registrationId: e.parameter.registrationId,
        innovation: e.parameter.innovation,
        technical: e.parameter.technical,
        presentation: e.parameter.presentation,
        total: e.parameter.total,
        comments: e.parameter.comments,
        status: e.parameter.status
      });
    }

    return jsonResponse({
      status: "success",
      message: "Hackathon API is running"
    });
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.message
    });
  }

  const headers =
    values[0];

  const teams =
    values
      .slice(1)
      .map(function(row, index) {
        return buildDashboardTeam(
          headers,
          row,
          index + 2
        );
      })
      .filter(function(team) {
        return (
          normalize(
            team.Attendance
          ) === "present"
        );
      });

  return jsonResponse({
    status: "success",
    round1: teams
  });
}

function buildDashboardTeam(
  headers,
  row,
  rowNumber
) {
  const team = {};

  headers.forEach(
    function(header, index) {
      const key =
        String(header)
          .trim()
          .replace(
            /\s+/g,
            "_"
          );

      team[key] =
        row[index] !== undefined
          ? row[index]
          : "";
    }
  );

  const registrationId =
    String(
      getCell(
        headers,
        row,
        "registrationId"
      ) || ""
    ).trim();

  const participantType =
    String(
      getCell(
        headers,
        row,
        "Participant Type"
      ) || ""
    ).trim();

  const leadRaw =
    parseStoredObject(
      getCell(
        headers,
        row,
        "Team Lead Details"
      )
    );

  const studentRaw =
    parseStoredObject(
      getCell(
        headers,
        row,
        "Student Details"
      )
    );

  const lead =
    Object.keys(leadRaw).length
      ? leadRaw
      : studentRaw;

  const members = [];

  for (
    let i = 1;
    i <= 6;
    i++
  ) {
    const member =
      parseStoredObject(
        getCell(
          headers,
          row,
          "Team Member " +
            i +
            " Details"
        )
      );

    if (
      Object.keys(member).length
    ) {
      members.push(member);
    }
  }

  const project =
    parseStoredObject(
      getCell(
        headers,
        row,
        "Project Idea"
      )
    );

  const challenge =
    parseStoredObject(
      getCell(
        headers,
        row,
        "Challenge Selection"
      )
    );

  const technology =
    parseStoredObject(
      getCell(
        headers,
        row,
        "Technology & Skills"
      )
    );

  const attendance =
    getCell(
      headers,
      row,
      "Attendance"
    ) || "Pending";

  const teamVerified =
    getCell(
      headers,
      row,
      "Team Verified"
    ) || "No";

  const round1Status =
    getCell(
      headers,
      row,
      "Round 1 Status"
    ) || "Not Started";

  const round2Status =
    getCell(
      headers,
      row,
      "Round 2 Status"
    ) || "Not Started";

  const round3Status =
    getCell(
      headers,
      row,
      "Round 3 Status"
    ) || "Not Started";

  const finalStatus =
    getCell(
      headers,
      row,
      "Final Status"
    ) || "Pending";

  team.registrationId =
    registrationId;

  team["Registration ID"] =
    registrationId;

  team["Participant Type"] =
    participantType;

  team["Team Lead"] =
    lead.fullName ||
    "";

  team.teamLead =
    lead.fullName ||
    "";

  team.lead_fullName =
    lead.fullName ||
    "";

  team.student_fullName =
    studentRaw.fullName ||
    "";

  team["Team Lead Details"] =
    formatDetails(
      lead
    );

  team.teamLeadDetails =
    formatDetails(
      lead
    );

  team["Team Members Details"] =
    members
      .map(function(member, index) {
        return (
          "Member " +
          (index + 1) +
          ": " +
          formatDetails(member)
        );
      })
      .join("\n");

  team.teamMembersDetails =
    team["Team Members Details"];

  team.teamMembers =
    members;

  team["College / University"] =
    lead.college ||
    studentRaw.college ||
    "";

  team.lead_college =
    lead.college ||
    "";

  team.student_college =
    studentRaw.college ||
    "";

  team.College =
    lead.college ||
    studentRaw.college ||
    "";

  team.Department =
    lead.department ||
    studentRaw.department ||
    "";

  team.Email =
    lead.email ||
    studentRaw.email ||
    "";

  team.Mobile =
    lead.mobile ||
    studentRaw.mobile ||
    "";

  team["Project / Solution Title"] =
    project.title ||
    "";

  team["Project Title"] =
    project.title ||
    "";

  team.title =
    project.title ||
    "";

  team.projectTitle =
    project.title ||
    "";

  team["Challenge Category"] =
    challenge.category ||
    "";

  team.challengeId =
    challenge.challengeId ||
    "";

  team.challengeTitle =
    challenge.challengeTitle ||
    "";

  team["Technology / Skills"] =
    formatDetails(
      technology
    );

  team.Attendance =
    attendance;

  team.Present =
    attendance;

  team["Team Verified"] =
    teamVerified;

  team.Verified =
    teamVerified;

  team["Round 1"] =
    round1Status;

  team.Round1 =
    round1Status;

  team["Round 1 Status"] =
    round1Status;

  team["Round 2"] =
    round2Status;

  team.Round2 =
    round2Status;

  team["Round 2 Status"] =
    round2Status;

  team["Round 3"] =
    round3Status;

  team.Round3 =
    round3Status;

  team["Round 3 Status"] =
    round3Status;

  team["Final Status"] =
    finalStatus;

  team.FinalStatus =
    finalStatus;

  const round1Details =
    getCell(
      headers,
      row,
      "Round 1 Details"
    );

  const round2Details =
    getCell(
      headers,
      row,
      "Round 2 Details"
    );

  const round3Details =
    getCell(
      headers,
      row,
      "Round 3 Details"
    );

  team["Round 1 Details"] =
    round1Details || "";

  team["Round 2 Details"] =
    round2Details || "";

  team["Round 3 Details"] =
    round3Details || "";

  team["Judge Remarks"] =
    extractRemarks(
      round3Details ||
      round2Details ||
      round1Details
    );

  team.JudgeRemarks =
    team["Judge Remarks"];

  team.Comments =
    team["Judge Remarks"];

  team._rowNumber =
    rowNumber;

  return team;
}

function saveAttendance(data) {
  if (!data.registrationId) {
    throw new Error(
      "Registration ID is required."
    );
  }

  if (!data.attendance) {
    throw new Error(
      "Attendance is required."
    );
  }

  const sheet =
    getSheet();

  const values =
    sheet
      .getDataRange()
      .getValues();

  const headers =
    values[0];

  const rowNumber =
    findRowByRegistrationId(
      values,
      headers,
      data.registrationId
    );

  if (
    rowNumber === -1
  ) {
    throw new Error(
      "Registration not found: " +
      data.registrationId
    );
  }

  const attendance =
    normalize(
      data.attendance
    ) === "present"
      ? "Present"
      : "Absent";

  setCell(
    sheet,
    rowNumber,
    headers,
    "Attendance",
    attendance
  );

  setCell(
    sheet,
    rowNumber,
    headers,
    "AttendanceAt",
    new Date()
  );

  let verified =
    data.verified;

  if (
    verified === undefined ||
    verified === null ||
    verified === ""
  ) {
    verified =
      attendance === "Present"
        ? "Yes"
        : "No";
  }

  setCell(
    sheet,
    rowNumber,
    headers,
    "Team Verified",
    String(
      verified
    )
  );

  setCell(
    sheet,
    rowNumber,
    headers,
    "Team Verified At",
    new Date()
  );

  return jsonResponse({
    status: "success",
    message:
      "Attendance updated successfully.",
    registrationId:
      data.registrationId,
    attendance:
      attendance
  });
}

/* =========================================================
   POST REQUEST

  SpreadsheetApp.flush();

  return jsonResponse({
    status: "success",
    message: "Round3 evaluation saved successfully."
  });
}

/* =========================================================
   BACKFILL MISSING FIELDS IN ROUND 2 SHEET
  }

  return "";
}

function extractTeamLeadValue(headers, row) {
  return extractFieldValue(headers, row, [
    "Team Lead",
    "Team Lead Name",
    "Team Leader",
    "Lead Name",
    "Full Name",
    "lead_fullName",
    "student_fullName",
    "lead_name",
    "student_name"
  ]);
}

function extractFieldValue(headers, row, keys) {
  for (let key of keys) {
    const targetNorm = key.toLowerCase().replace(/[\s_-]+/g, "");
    for (let i = 0; i < headers.length; i++) {
      const hNorm = String(headers[i]).trim().toLowerCase().replace(/[\s_-]+/g, "");
      if (hNorm === targetNorm && row[i] !== undefined && row[i] !== null && String(row[i]).trim() !== "") {
        return row[i];
      }
    }
  }
  return "";
}

function findRegistrationColumn(headers) {
  const possibleNames = [
    "Registration ID", "RegistrationID", "registrationId", "registration_id",
    "Registration_Id", "Registration_ID", "ID", "Id", "id", "Team ID", "TeamID", "teamId"
  ];

  for (const name of possibleNames) {
    const index = headers.findIndex(
      (header) => String(header).trim().toLowerCase() === name.toLowerCase()
    );
    if (index !== -1) return index;
  }
  return 0;
}

function findRegistrationId(headers, row, rowNumber) {
  const column = findRegistrationColumn(headers);
  const value = row[column];
  if (value !== undefined && value !== null && String(value).trim() !== "") {
    return String(value).trim();
  }
  return "ROW-" + rowNumber;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
