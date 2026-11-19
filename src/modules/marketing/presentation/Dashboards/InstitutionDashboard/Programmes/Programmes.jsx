import { ArrowRight, Plus } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { programmes } from "./programmesData.js";
import { matchesSearch } from "../utils.js";
import "./Programmes.css";

const SUMMARY = [
  { value: "4", label: "Active programmes" },
  { value: "2,140", label: "Enrolled learners" },
  { value: "72%", label: "Average completion" },
  { value: "360", label: "Seats remaining" }
];

export default function Programmes({ search, showMessage }) {
  const visibleProgrammes = programmes.filter((programme) => matchesSearch(programme, search));

  return (
    <>
      <PageHeading
        eyebrow="ACADEMICS · PROGRAMMES"
        title="Programmes"
        description="Manage structured learning pathways, cohorts, capacity, and term progress."
      >
        <button className="primary-action" type="button" onClick={() => showMessage("New programme draft created.")}>
          <Plus size={16} />New programme
        </button>
      </PageHeading>

      <SummaryStrip items={SUMMARY} />

      <div className="programme-list">
        {visibleProgrammes.map((programme, index) => (
          <article className="panel programme-card" key={programme.code}>
            <div className="programme-index">0{index + 1}</div>
            <div className="programme-main">
              <div className="programme-code">{programme.code} <StatusTag>{programme.state}</StatusTag></div>
              <h2>{programme.name}</h2>
              <p>{programme.duration} · {programme.departments}</p>
              <div className="programme-progress-label">
                <span>Cohort completion</span><strong>{programme.progress}%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${programme.progress}%` }} />
              </div>
            </div>
            <div className="programme-count">
              <strong>{programme.learners}</strong><span>learners</span>
            </div>
            <button
              className="icon-button record-action"
              type="button"
              aria-label={`View ${programme.name}`}
              onClick={() => showMessage(`${programme.name}: ${programme.learners} learners enrolled`)}
            >
              <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
      {!visibleProgrammes.length && <div className="panel table-empty">No programmes match your search.</div>}
    </>
  );
}
