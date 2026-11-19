import React from "react";
import { Users, UserCheck, CheckCircle2, XCircle, Clock3 } from "lucide-react";
import { getRegistrationId, getTeamLead, normalize } from "../dashboardHelpers";

export function OverviewTeamsTable({
  recentTeams,
  total,
  processingId,
  isTeamPresent,
  isTeamAbsent,
  getR1Status,
  getR2Status,
  getR3Status,
  handleMarkPresent
}) {
  return (
    <div className="overview-table-card">
      <div className="overview-table-header">
        <div>
          <h2>Teams Overview</h2>
          <p>Latest registered teams and multi-round qualification status</p>
        </div>
        <div className="overview-total-badge">{total} Teams</div>
      </div>

      {recentTeams.length === 0 ? (
        <div className="overview-empty">
          <Users size={40} />
          <h3>No teams found</h3>
          <p>Teams registered in Google Sheets will appear here.</p>
        </div>
      ) : (
        <div className="overview-table-wrapper">
          <table className="overview-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Registration No</th>
                <th>Team Lead</th>
                <th>Attendance</th>
                <th>Action</th>
                <th>Round 1</th>
                <th>Round 2</th>
                <th>Round 3</th>
              </tr>
            </thead>
            <tbody>
              {recentTeams.map((team, index) => {
                const registration = getRegistrationId(team);
                const lead = getTeamLead(team);
                const teamPresent = isTeamPresent(team);
                const teamAbsent = isTeamAbsent(team);
                const attendance = teamPresent ? "Present" : teamAbsent ? "Absent" : "Pending";
                const isProcessing = processingId === registration;

                const r1Status = getR1Status(registration);
                const r2Status = getR2Status(registration);
                const r3Status = getR3Status(registration);

                return (
                  <tr key={registration || index}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="registration-number">
                        {registration || `REG-${index + 1}`}
                      </span>
                    </td>
                    <td>
                      <strong>{lead || "—"}</strong>
                    </td>
                    <td>
                      <span className={`status-pill attendance-${normalize(attendance)}`}>
                        {attendance === "Present" && <CheckCircle2 size={14} />}
                        {attendance === "Absent" && <XCircle size={14} />}
                        {attendance === "Pending" && <Clock3 size={14} />}
                        {attendance}
                      </span>
                    </td>
                    <td>
                      {teamPresent ? (
                        <button className="overview-action-btn added" disabled>
                          <CheckCircle2 size={14} /> Added
                        </button>
                      ) : (
                        <button
                          className="overview-action-btn present"
                          disabled={isProcessing}
                          onClick={() => handleMarkPresent(team)}
                        >
                          <UserCheck size={14} />
                          {isProcessing ? "Adding..." : "Present"}
                        </button>
                      )}
                    </td>
                    <td>
                      <span className={r1Status === "Qualified" ? "qualified" : r1Status === "Eliminated" ? "not-qualified" : ""}>
                        {r1Status}
                      </span>
                    </td>
                    <td>
                      <span className={r2Status === "Qualified" ? "qualified" : r2Status === "Eliminated" ? "not-qualified" : ""}>
                        {r2Status}
                      </span>
                    </td>
                    <td>
                      <span className={r3Status === "Finalist" || r3Status === "Qualified" ? "qualified" : r3Status === "Eliminated" ? "not-qualified" : ""}>
                        {r3Status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
