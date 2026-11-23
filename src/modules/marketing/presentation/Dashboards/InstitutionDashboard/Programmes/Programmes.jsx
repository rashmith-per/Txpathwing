import { useEffect, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { matchesSearch } from "../utils.js";
import { learningApi } from "../Learnings/services/learningApi.js";
import AddProgramModal from "../Learnings/components/AddProgramModal.jsx";
import ProgramDetailsModal from "../Learnings/components/ProgramDetailsModal.jsx";
import "./Programmes.css";

export default function Programmes({ search, showMessage }) {
  const [programmesList, setProgrammesList] = useState([]);
  const [stats, setStats] = useState({
    activePrograms: 0,
    totalEnrolledLearners: 0,
    completedPrograms: 0
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const fetchProgrammes = () => {
      Promise.all([
        learningApi.getPrograms(),
        learningApi.getStatistics()
      ]).then(([progs, st]) => {
        if (!isCurrent) return;
        setProgrammesList(progs || []);
        setStats(st || {});
      }).catch(() => {});
    };

    fetchProgrammes();

    window.addEventListener("institution_learning_updated", fetchProgrammes);
    return () => {
      isCurrent = false;
      window.removeEventListener("institution_learning_updated", fetchProgrammes);
    };
  }, []);

  const visibleProgrammes = programmesList.filter((programme) => matchesSearch(programme, search));

  const summaryItems = [
    { value: stats.activePrograms?.toString() || "0", label: "Active programmes" },
    { value: stats.totalEnrolledLearners?.toString() || "0", label: "Enrolled learners" },
    { value: `${stats.totalPrograms ? Math.round((stats.completedPrograms / (stats.totalEnrolledLearners || 1)) * 100) : 72}%`, label: "Average completion" },
    { value: `${Math.max(0, 400 - (stats.totalEnrolledLearners || 0))}`, label: "Seats remaining" }
  ];

  return (
    <>
      <PageHeading
        eyebrow="ACADEMICS · PROGRAMMES"
        title="Programmes"
        description="Manage structured learning pathways, cohorts, capacity, and term progress."
      >
        <button className="primary-action" type="button" onClick={() => setIsAddOpen(true)}>
          <Plus size={16} />New programme
        </button>
      </PageHeading>

      <SummaryStrip items={summaryItems} />

      <div className="programme-list">
        {visibleProgrammes.map((programme, index) => (
          <article className="panel programme-card" key={programme.code}>
            <div className="programme-index">0{index + 1}</div>
            <div className="programme-main">
              <div className="programme-code">{programme.code} <StatusTag>{programme.state || programme.status}</StatusTag></div>
              <h2>{programme.name || programme.title}</h2>
              <p>{programme.duration} · {programme.department || programme.departments || "All departments"}</p>
              <div className="programme-progress-label">
                <span>Cohort completion</span><strong>{programme.completion || programme.progress || 0}%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${programme.completion || programme.progress || 0}%` }} />
              </div>
            </div>
            <div className="programme-count">
              <strong>{programme.learners || 0}</strong><span>learners</span>
            </div>
            <button
              className="icon-button record-action"
              type="button"
              aria-label={`View ${programme.name || programme.title}`}
              onClick={() => setSelectedProgram(programme)}
            >
              <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
      {!visibleProgrammes.length && <div className="panel table-empty">No programmes match your search.</div>}

      <AddProgramModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={() => window.dispatchEvent(new CustomEvent("institution_learning_updated"))}
        showMessage={showMessage}
      />

      <ProgramDetailsModal
        isOpen={Boolean(selectedProgram)}
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onRefresh={() => window.dispatchEvent(new CustomEvent("institution_learning_updated"))}
        showMessage={showMessage}
      />
    </>
  );
}
