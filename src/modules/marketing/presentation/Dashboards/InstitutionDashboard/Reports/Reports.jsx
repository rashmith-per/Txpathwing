import { ArrowDownToLine, FileText } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { departments } from "../Overview/overviewData.js";
import { reports } from "./reportsData.js";
import { downloadCsv, matchesSearch } from "../utils.js";
import "./Reports.css";

const SUMMARY = [
  { value: "72%", label: "Programme completion" },
  { value: "614", label: "Certified this term" },
  { value: "418", label: "Placement-ready" },
  { value: "+6 pts", label: "Vs last term" }
];

export default function Reports({ search }) {
  const visibleReports = reports.filter((report) => matchesSearch(report, search));

  const downloadSummary = () =>
    downloadCsv("kits-term-summary.csv", [
      ["Department", "Completion"],
      ...departments.map((department) => [department.name, `${department.completion}%`])
    ]);

  const downloadReport = (report) =>
    downloadCsv(`${report.name.toLowerCase().replaceAll(" ", "-")}.csv`, [
      ["Report", "Period", "Updated"],
      [report.name, report.period, report.updated]
    ]);

  return (
    <>
      <PageHeading
        eyebrow="INSIGHTS · REPORTS"
        title="Reports"
        description="Review institutional outcomes and export term data for your teams."
      >
        <button className="primary-action" type="button" onClick={downloadSummary}>
          <ArrowDownToLine size={16} />Download summary
        </button>
      </PageHeading>

      <SummaryStrip items={SUMMARY} />

      <section className="panel report-chart-panel">
        <header className="panel-header">
          <div>
            <h2>Completion by department</h2>
            <p>Current academic term</p>
          </div>
          <span>2026–27</span>
        </header>
        <div className="report-bars">
          {departments.map((department) => (
            <div className="report-bar-row" key={department.name}>
              <span>{department.name}</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${department.completion}%` }} />
              </div>
              <strong>{department.completion}%</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel page-panel report-list-panel">
        <div className="table-toolbar">
          <div>
            <h2>Available reports</h2>
            <p>Download a CSV snapshot for local analysis.</p>
          </div>
          <FileText size={18} />
        </div>
        <div className="report-list">
          {visibleReports.map((report) => (
            <article className="report-row" key={report.name}>
              <div className="report-file-icon"><FileText size={18} /></div>
              <div className="report-copy">
                <strong>{report.name}</strong>
                <span>{report.period} · Updated {report.updated}</span>
              </div>
              <span className="format-tag">{report.format}</span>
              <button
                className="icon-button record-action"
                type="button"
                aria-label={`Download ${report.name}`}
                onClick={() => downloadReport(report)}
              >
                <ArrowDownToLine size={16} />
              </button>
            </article>
          ))}
        </div>
        {!visibleReports.length && <p className="empty-events">No matching reports.</p>}
      </section>
    </>
  );
}
