import React from "react";
import { Trophy, Download, RefreshCw, XCircle } from "lucide-react";
import { useReportsData } from "./helpers/useReportsData";
import { ReportCardsGrid } from "./components/ReportCardsGrid";
import { ReportTable } from "./components/ReportTable";
import "./Reports.css";

const Reports = () => {
  const {
    selectedRound,
    setSelectedRound,
    loading,
    error,
    loadData,
    activeList,
    winner,
    runnerUp,
    stats
  } = useReportsData();

  const exportToCSV = () => {
    if (activeList.length === 0) return alert("No data available to export.");

    const headers = ["Rank", "Registration ID", "Team Lead", "Project Title", "Score (/30)", "Status"];
    const rows = activeList.map((t, idx) => [
      idx + 1,
      `"${t.regId}"`,
      `"${t.lead}"`,
      `"${t.project}"`,
      `${t.score}/30`,
      `"${t.status}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Final_Hackathon_Report_${selectedRound}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="final-reports-wrapper">
        <div className="final-reports-loading">
          <RefreshCw className="spin-icon" size={32} />
          <h3>Loading Final Reports</h3>
          <p>Fetching Round 3 evaluations and results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="final-reports-wrapper">
        <div className="final-reports-error">
          <XCircle size={40} />
          <h3>Unable to load reports</h3>
          <p>{error}</p>
          <button onClick={loadData}>
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="final-reports-wrapper">
      <div className="fr-top-bar">
        <h1 className="fr-page-title">Final Reports</h1>
        <div className="fr-round-pills">
          {["r1", "r2", "r3", "final"].map((roundKey) => (
            <button
              key={roundKey}
              className={`fr-pill-btn ${selectedRound === roundKey ? "active" : ""}`}
              onClick={() => setSelectedRound(roundKey)}
            >
              {roundKey === "final" ? "Final Result" : `Round ${roundKey.replace("r", "")} Result`}
            </button>
          ))}
        </div>
      </div>

      <div className="fr-subheader">
        <div className="fr-subheader-left">
          <div className="fr-icon-box">
            <Trophy size={18} />
          </div>
          <div>
            <h2 className="fr-section-title">
              {selectedRound === "final"
                ? "Final Result"
                : `Round ${selectedRound.replace("r", "")} Result`}
            </h2>
            <p className="fr-section-sub">Hackathon results and participant details</p>
          </div>
        </div>

        <button className="fr-export-btn" onClick={exportToCSV}>
          <Download size={15} /> Export CSV
        </button>
      </div>

      <ReportCardsGrid winner={winner} runnerUp={runnerUp} stats={stats} />

      <ReportTable activeList={activeList} />
    </div>
  );
};

export default Reports;
