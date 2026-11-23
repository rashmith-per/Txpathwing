import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  BookOpen,
  CheckCircle2,
  Edit2,
  GraduationCap,
  Plus,
  Power,
  RefreshCw,
  Search,
  Trash2,
  UserPlus,
  Users
} from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import DataTable from "../Layout/DataTable.jsx";
import { PROGRAM_CATEGORIES, PROGRAM_STATUSES } from "./backend/models/LearningProgramModel.js";
import { BATCHES } from "../Learners/backend/models/LearnerModel.js";
import { learningApi } from "./services/learningApi.js";
import { downloadCsv } from "../utils.js";

// Modals
import AddProgramModal from "./components/AddProgramModal.jsx";
import EditProgramModal from "./components/EditProgramModal.jsx";
import ProgramDetailsModal from "./components/ProgramDetailsModal.jsx";
import ProgramDeleteModal from "./components/ProgramDeleteModal.jsx";
import EnrollLearnerModal from "./components/EnrollLearnerModal.jsx";
import TopicProgressModal from "./components/TopicProgressModal.jsx";

import "./Learnings.css";

export default function Learnings({ search = "", showMessage }) {
  const [activeTab, setActiveTab] = useState("programs"); // "programs" | "enrollments"
  const [programsList, setProgramsList] = useState([]);
  const [enrollmentsList, setEnrollmentsList] = useState([]);
  const [stats, setStats] = useState({
    totalPrograms: 0,
    activePrograms: 0,
    totalEnrolledLearners: 0,
    completedPrograms: 0,
    inProgressPrograms: 0
  });

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [batchFilter, setBatchFilter] = useState("All batches");
  const [programFilter, setProgramFilter] = useState("All programs");
  const [localSearch, setLocalSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);
  const [selectedProgramForDelete, setSelectedProgramForDelete] = useState(null);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedEnrollmentForProgress, setSelectedEnrollmentForProgress] = useState(null);

  const effectiveSearch = localSearch || search;

  const refreshLearning = () => {
    window.dispatchEvent(new CustomEvent("institution_learning_updated"));
  };

  useEffect(() => {
    let isCurrent = true;

    const fetchLearningData = () => {
      Promise.all([
        learningApi.getPrograms({
          search: effectiveSearch,
          category: categoryFilter,
          status: statusFilter
        }),
        learningApi.getEnrollments({
          search: effectiveSearch,
          batch: batchFilter,
          programId: programFilter === "All programs" ? "" : programFilter
        }),
        learningApi.getStatistics()
      ])
        .then(([progs, enrs, st]) => {
          if (!isCurrent) return;
          setProgramsList(progs || []);
          setEnrollmentsList(enrs || []);
          setStats(st || {});

          if (selectedProgramForDetails) {
            const updated = progs.find((p) => p.id === selectedProgramForDetails.id);
            if (updated) setSelectedProgramForDetails(updated);
          }
        })
        .catch((err) => {
          if (!isCurrent) return;
          if (showMessage) showMessage(`Error loading learning data: ${err.message}`);
        })
        .finally(() => {
          if (isCurrent) setIsLoading(false);
        });
    };

    fetchLearningData();

    window.addEventListener("institution_learning_updated", fetchLearningData);
    return () => {
      isCurrent = false;
      window.removeEventListener("institution_learning_updated", fetchLearningData);
    };
  }, [effectiveSearch, categoryFilter, statusFilter, batchFilter, programFilter, showMessage, selectedProgramForDetails]);

  // Status toggle handler
  const handleToggleStatus = async (programId) => {
    try {
      const updated = await learningApi.toggleProgramStatus(programId);
      showMessage(`Program "${updated.name}" is now ${updated.status}.`);
      refreshLearning();
    } catch (err) {
      showMessage(`Failed to toggle program status: ${err.message}`);
    }
  };

  // Export catalogue to CSV
  const handleExportCatalogue = () => {
    if (!programsList.length) {
      showMessage("No courses available to export.");
      return;
    }

    const headers = ["Code", "Program Name", "Category", "Department", "Duration", "Instructor", "Status", "Enrolled Learners", "Avg Completion"];
    const rows = programsList.map((p) => [
      p.code,
      p.name || p.title,
      p.category,
      p.department,
      p.duration,
      p.instructor,
      p.status || p.state,
      p.learners || 0,
      `${p.completion || 0}%`
    ]);

    downloadCsv(`learning-catalogue-${new Date().toISOString().split("T")[0]}.csv`, [headers, ...rows]);
    showMessage("Course catalogue downloaded.");
  };

  const summaryItems = [
    { value: stats.totalPrograms?.toString() || "0", label: "Learning programs" },
    { value: stats.activePrograms?.toString() || "0", label: "Active programs" },
    { value: stats.totalEnrolledLearners?.toString() || "0", label: "Enrolled learners" },
    { value: stats.completedPrograms?.toString() || "0", label: "Completed programs" },
    { value: stats.inProgressPrograms?.toString() || "0", label: "In-progress programs" }
  ];

  // Enrollment table rows
  const enrollmentRows = enrollmentsList.map((enr) => ({
    key: enr.id,
    cells: [
      <div className="person-cell">
        <strong>{enr.learnerName}</strong>
        <small>{enr.learnerEmail}</small>
      </div>,
      enr.programTitle,
      enr.batch,
      <span style={{ fontWeight: 650, color: "#166534" }}>{enr.completedModules || 0} modules</span>,
      <span style={{ color: "var(--muted)" }}>{enr.remainingModules || 0} modules</span>,
      <div className="table-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${enr.progressPercentage || 0}%` }} />
        </div>
        <span>{enr.progressPercentage || 0}%</span>
      </div>,
      <StatusTag>{enr.status}</StatusTag>,
      <button
        type="button"
        className="secondary-action"
        style={{ height: "28px", fontSize: "11px", padding: "0 8px" }}
        onClick={() => setSelectedEnrollmentForProgress(enr)}
      >
        <BookOpen size={12} /> Progress & Topics
      </button>
    ]
  }));

  return (
    <>
      <PageHeading
        eyebrow="ACADEMICS · LEARNING MANAGEMENT"
        title="Learning"
        description="Deliver structured learning programs, curriculum modules, and monitor verified completion outcomes."
      >
        <div className="learner-toolbar-actions">
          <button
            className="secondary-action"
            type="button"
            onClick={handleExportCatalogue}
          >
            <ArrowDownToLine size={15} /> Export Catalogue
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => setIsEnrollOpen(true)}
          >
            <UserPlus size={15} /> Enroll Learner
          </button>
          <button
            className="primary-action"
            type="button"
            onClick={() => setIsAddProgramOpen(true)}
          >
            <Plus size={16} /> Add Program
          </button>
        </div>
      </PageHeading>

      <SummaryStrip items={summaryItems} />

      {/* Tabs navigation */}
      <div className="profile-tabs-nav" style={{ marginBottom: "18px", borderBottom: "1px solid var(--line)" }}>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "programs" ? "profile-tab-active" : ""}`}
          onClick={() => setActiveTab("programs")}
        >
          Programs & Curriculum ({programsList.length})
        </button>
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === "enrollments" ? "profile-tab-active" : ""}`}
          onClick={() => setActiveTab("enrollments")}
        >
          Learner Enrollments & Progress ({enrollmentsList.length})
        </button>
      </div>

      {activeTab === "programs" && (
        <>
          {/* Programs toolbar */}
          <div className="panel" style={{ padding: "12px 18px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div className="filter-control" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search programs, code, instructor..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{ paddingLeft: "26px", minWidth: "220px", height: "30px", borderRadius: "6px", border: "1px solid var(--line)", fontSize: "11px" }}
              />
              <Search size={13} style={{ position: "absolute", left: "8px", top: "8px", color: "var(--muted)" }} />
            </div>

            <div className="learner-toolbar-filters">
              <label className="filter-control">
                <span>Category</span>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option>All categories</option>
                  {PROGRAM_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>

              <label className="filter-control">
                <span>Status</span>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option>All statuses</option>
                  {PROGRAM_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <button
                type="button"
                className="icon-button"
                title="Refresh list"
                onClick={refreshLearning}
                disabled={isLoading}
              >
                <RefreshCw size={14} className={isLoading ? "spinner-inline" : ""} />
              </button>
            </div>
          </div>

          {/* Programs Card Grid */}
          <div className="institution-course-grid">
            {programsList.map((course) => (
              <article className="panel institution-course-card" key={course.id || course.name}>
                <div className={`institution-course-accent institution-course-accent-${course.tone || "blue"}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <GraduationCap size={20} />
                    <span>{course.category}</span>
                  </div>
                  <span className="course-code-badge" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                    {course.code}
                  </span>
                </div>

                <div className="institution-course-card-body">
                  <div className="course-card-top-row">
                    <StatusTag>{course.state || course.status}</StatusTag>
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>{course.duration}</span>
                  </div>

                  <h2>{course.name || course.title}</h2>
                  <p>Delivered by {course.instructor} · {course.department}</p>

                  <div className="institution-course-meta">
                    <span><Users size={14} />{course.learners || 0} enrolled</span>
                    <span><CheckCircle2 size={14} />{course.completion || 0}% avg completion</span>
                    <span><BookOpen size={14} />{course.modules?.length || 0} modules</span>
                  </div>

                  <div className="institution-course-progress">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${course.completion || 0}%` }} />
                    </div>
                  </div>

                  <div className="course-actions-footer">
                    <button
                      className="institution-course-link"
                      type="button"
                      onClick={() => setSelectedProgramForDetails(course)}
                    >
                      <BookOpen size={14} /> Manage Curriculum & Topics
                    </button>

                    <div className="card-btn-cluster">
                      <button
                        type="button"
                        className="learner-action-btn"
                        title={course.status === "Active" ? "Deactivate Program" : "Activate Program"}
                        onClick={() => handleToggleStatus(course.id)}
                      >
                        <Power size={13} color={course.status === "Active" ? "#16a34a" : "#94a3b8"} />
                      </button>
                      <button
                        type="button"
                        className="learner-action-btn"
                        title="Edit Program"
                        onClick={() => setSelectedProgramForEdit(course)}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        className="learner-action-btn btn-delete"
                        title="Delete Program"
                        onClick={() => setSelectedProgramForDelete(course)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!isLoading && programsList.length === 0 && (
            <div className="panel table-empty" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
              No learning programs match your search or filter.
            </div>
          )}
        </>
      )}

      {activeTab === "enrollments" && (
        <section className="panel page-panel">
          <div className="table-toolbar">
            <div>
              <h2>Learner enrollments & progress tracking</h2>
              <p>Tracking progress calculated from verified topic and module completion.</p>
            </div>

            <div className="learner-toolbar-filters">
              <label className="filter-control">
                <span>Program</span>
                <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)}>
                  <option>All programs</option>
                  {programsList.map((p) => <option key={p.id} value={p.id}>{p.name || p.title}</option>)}
                </select>
              </label>

              <label className="filter-control">
                <span>Batch</span>
                <select value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)}>
                  <option>All batches</option>
                  {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>

              <button
                type="button"
                className="icon-button"
                title="Refresh list"
                onClick={refreshLearning}
                disabled={isLoading}
              >
                <RefreshCw size={14} className={isLoading ? "spinner-inline" : ""} />
              </button>
            </div>
          </div>

          <DataTable
            columns={[
              "LEARNER",
              "PROGRAMME",
              "BATCH",
              "COMPLETED",
              "REMAINING",
              "PROGRESS",
              "STATUS",
              "ACTIONS"
            ]}
            rows={enrollmentRows}
          />

          {!isLoading && enrollmentsList.length === 0 && (
            <div className="panel table-empty" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
              No enrollments found matching the criteria. Click "Enroll Learner" to register a learner into a program.
            </div>
          )}
        </section>
      )}

      {/* Add Program Modal */}
      <AddProgramModal
        isOpen={isAddProgramOpen}
        onClose={() => setIsAddProgramOpen(false)}
        onSuccess={refreshLearning}
        showMessage={showMessage}
      />

      {/* Edit Program Modal */}
      <EditProgramModal
        key={selectedProgramForEdit?.id}
        isOpen={Boolean(selectedProgramForEdit)}
        program={selectedProgramForEdit}
        onClose={() => setSelectedProgramForEdit(null)}
        onSuccess={refreshLearning}
        showMessage={showMessage}
      />

      {/* Program Curriculum Details Modal */}
      <ProgramDetailsModal
        key={selectedProgramForDetails?.id}
        isOpen={Boolean(selectedProgramForDetails)}
        program={selectedProgramForDetails}
        onClose={() => setSelectedProgramForDetails(null)}
        onRefresh={refreshLearning}
        showMessage={showMessage}
      />

      {/* Program Delete Modal */}
      <ProgramDeleteModal
        key={selectedProgramForDelete?.id}
        isOpen={Boolean(selectedProgramForDelete)}
        program={selectedProgramForDelete}
        onClose={() => setSelectedProgramForDelete(null)}
        onSuccess={refreshLearning}
        showMessage={showMessage}
      />

      {/* Enroll Learner Modal */}
      <EnrollLearnerModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        onSuccess={refreshLearning}
        showMessage={showMessage}
      />

      {/* Topic Progress Checklist Modal */}
      <TopicProgressModal
        key={selectedEnrollmentForProgress?.id}
        isOpen={Boolean(selectedEnrollmentForProgress)}
        enrollment={selectedEnrollmentForProgress}
        onClose={() => setSelectedEnrollmentForProgress(null)}
        onRefresh={refreshLearning}
        showMessage={showMessage}
      />
    </>
  );
}
