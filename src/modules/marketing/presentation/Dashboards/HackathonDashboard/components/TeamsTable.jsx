import React from "react";
import { Check, X, Clock3 } from "lucide-react";
import {
  getRegistrationId,
  getTeamLead,
  getAllMemberDetails,
  getTechnology,
  getChallenge,
  isPresent,
  isAbsent
} from "../dashboardHelpers";

export function TeamsTable({
  filteredTeams,
  activeFilter,
  handleAttendance,
  onSelectTeam
}) {
  return (
    <div className="teams-table-card">
      <div className="teams-table-wrapper">
        <table className="teams-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>PARTICIPANT REG</th>
              <th>TEAM LEAD</th>
              <th>TEAM MEMBERS</th>
              <th>TECH / CHALLENGE</th>
              <th>TEAM STATUS</th>
              <th>ATTENDANCE</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.map((team, index) => {
              const attStatus = isPresent(team) ? "Present" : isAbsent(team) ? "Absent" : "Pending";
              const memberDetails = getAllMemberDetails(team);

              return (
                <tr key={getRegistrationId(team) || index}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="registration">
                      {getRegistrationId(team) || `REG-${String(index + 1).padStart(3, "0")}`}
                    </span>
                  </td>
                  <td>
                    <strong>{getTeamLead(team) || "—"}</strong>
                  </td>
                  <td>
                    <button
                      className="team-members-badge-btn"
                      onClick={() => onSelectTeam(team)}
                      title="Click to view team member details popup"
                    >
                      {memberDetails.length}
                    </button>
                  </td>
                  <td>
                    <div className="tech-challenge">
                      <strong>{getTechnology(team) || "—"}</strong>
                      <span>{getChallenge(team) || "—"}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`team-status status-${attStatus.toLowerCase()}`}>
                      {attStatus === "Present" && <Check size={14} />}
                      {attStatus === "Absent" && <X size={14} />}
                      {attStatus === "Pending" && <Clock3 size={14} />}
                      {attStatus}
                    </span>
                  </td>
                  <td>
                    <div className="attendance-actions">
                      {activeFilter === "all" ? (
                        isPresent(team) ? (
                          <button
                            className="attendance-btn present-btn selected"
                            onClick={() => handleAttendance(team, "Present")}
                          >
                            <Check size={14} /> Present
                          </button>
                        ) : isAbsent(team) ? (
                          <button
                            className="attendance-btn absent-btn selected"
                            onClick={() => handleAttendance(team, "Absent")}
                          >
                            <X size={14} /> Absent
                          </button>
                        ) : (
                          <>
                            <button
                              className="attendance-btn present-btn"
                              onClick={() => handleAttendance(team, "Present")}
                            >
                              <Check size={14} /> Present
                            </button>
                            <button
                              className="attendance-btn absent-btn"
                              onClick={() => handleAttendance(team, "Absent")}
                            >
                              <X size={14} /> Absent
                            </button>
                          </>
                        )
                      ) : (
                        <>
                          <button
                            className={`attendance-btn present-btn ${isPresent(team) ? "selected" : ""}`}
                            onClick={() => handleAttendance(team, "Present")}
                          >
                            <Check size={14} /> Present
                          </button>
                          <button
                            className={`attendance-btn absent-btn ${isAbsent(team) ? "selected" : ""}`}
                            onClick={() => handleAttendance(team, "Absent")}
                          >
                            <X size={14} /> Absent
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTeams.length === 0 && (
          <div className="teams-empty">No teams found for this filter.</div>
        )}
      </div>
    </div>
  );
}
