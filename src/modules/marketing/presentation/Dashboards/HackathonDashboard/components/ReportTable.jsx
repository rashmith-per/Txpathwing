import React from "react";
import { normalize } from "../dashboardHelpers";

export function ReportTable({ activeList }) {
  return (
    <div className="fr-table-card">
      <table className="fr-table">
        <thead>
          <tr>
            <th>RANK</th>
            <th>REGISTRATION ID</th>
            <th>TEAM LEAD</th>
            <th>PROJECT TITLE</th>
            <th>SCORE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {activeList.length === 0 ? (
            <tr>
              <td colSpan="6" className="fr-empty-cell">
                No participant records found.
              </td>
            </tr>
          ) : (
            activeList.map((item, idx) => (
              <tr key={item.regId || idx}>
                <td className="rank-cell">#{idx + 1}</td>
                <td>
                  <span className="reg-link">{item.regId}</span>
                </td>
                <td className="lead-cell">
                  <strong>{item.lead}</strong>
                </td>
                <td className="project-cell">{item.project}</td>
                <td className="score-cell">{item.score}/30</td>
                <td>
                  <span className={`fr-status-pill status-${normalize(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
