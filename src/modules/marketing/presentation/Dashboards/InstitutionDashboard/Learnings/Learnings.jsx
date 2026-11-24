import { useState } from "react";
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
import {
  BATCHES,
  PROGRAM_CATEGORIES,
  PROGRAM_STATUSES,
  INITIAL_PROGRAMS,
  INITIAL_ENROLLMENTS
} from "./learningsData.js";
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
  const [programsList, setProgramsList] = useState(() => INITIAL_PROGRAMS);
  const [enrollmentsList, setEnrollmentsList] = useState(() => INITIAL_ENROLLMENTS);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [batchFilter, setBatchFilter] = useState("All batches");
  const [programFilter, setProgramFilter] = useState("All programs");
  const [localSearch, setLocalSearch] = useState("");

  // Modals
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
  const [selectedProgramForDetails, setSelectedProgramForDetails] = useState(null);
  const [selectedProgramForDelete, setSelectedProgramForDelete] = useState(null);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedEnrollmentForProgress, setSelectedEnrollmentForProgress] = useState(null);

  const effectiveSearch = (localSearch || search).trim().toLowerCase();

  // Reset list to default
  const handleReset = () => {
    setProgramsList(INITIAL_PROGRAMS);
    setEnrollmentsList(INITIAL_ENROLLMENTS);
    if (showMessage) showMessage("Learning records reset to initial sample state.");
  };

  // Add program (in-memory)
  const handleAddProgram = (newProgram) => {
    setProgramsList((prev) => [newProgram, ...prev]);
  };

  // Edit program (in-memory)
  const handleEditProgram = (updatedProgram) => {
    setProgramsList((prev) =>
      prev.map((p) => (p.id === updatedProgram.id ? updatedProgram : p))
    );
  };

  // Delete program (in-memory)
  const handleDeleteProgram = (programId) => {
    setProgramsList((prev) => prev.filter((p) => p.id !== programId));
    setEnrollmentsList((prev) => prev.filter((enr) => enr.programId !== programId));
  };

  // Status toggle handler
  const handleToggleStatus = (programId) => {
    setProgramsList((prev) =>
      prev.map((p) => {
        if (p.id !== programId) return p;
        const current = p.status || p.state || "Active";
        const nextStatus = current === "Active" ? "Draft" : "Active";
        if (showMessage) showMessage(`Program "${p.name || p.title}" is now ${nextStatus}.`);
        return {
          ...p,
          state: nextStatus,
          status: nextStatus
        };
      })
    );
  };

  // Enroll learner (in-memory)
  const handleEnrollLearner = (newEnrollment) => {
    setEnrollmentsList((prev) => [newEnrollment, ...prev]);
    // increment learner count on matching program
    setProgramsList((prev) =>
      prev.map((p) =>
        p.id === newEnrollment.programId
          ? { ...p, learners: (p.learners || 0) + 1 }
          : p
      )
    );
  };

  // Filtered Programs
  const filteredPrograms = programsList.filter((p) => {
    const nameMatch = (p.name || p.title || "").toLowerCase().includes(effectiveSearch);
    const codeMatch = (p.code || "").toLowerCase().includes(effectiveSearch);
    const instrMatch = (p.instructor || "").toLowerCase().includes(effectiveSearch);
    const matchesSearch = !effectiveSearch || nameMatch || codeMatch || instrMatch;

    const matchesCategory = categoryFilter === "All categories" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "All statuses" || (p.status || p.state) === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filtered Enrollments
  const filteredEnrollments = enrollmentsList.filter((enr) => {
    const nameMatch = (enr.learnerName || "").toLowerCase().includes(effectiveSearch);
    const emailMatch = (enr.learnerEmail || "").toLowerCase().includes(effectiveSearch);
    const progMatch = (enr.programTitle || "").toLowerCase().includes(effectiveSearch);
    const matchesSearch = !effectiveSearch || nameMatch || emailMatch || progMatch;

    const matchesBatch = batchFilter === "All batches" || enr.batch === batchFilter;
    const matchesProgram = programFilter === "All programs" || enr.programId === programFilter;

    return matchesSearch && matchesBatch && matchesProgram;
  });

  // Export catalogue to CSV
  const handleExportCatalogue = () => {
    if (!programsList.length) {
      if (showMessage) showMessage("No courses available to export.");
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
    if (showMessage) showMessage("Course catalogue downloaded.");
  };

  const activeProgramsCount = programsList.filter((p) => (p.status || p.state) === "Active").length;
  const totalLearnersCount = programsList.reduce((acc, p) => acc + (p.learners || 0), 0);
  const completedProgramsCount = programsList.filter((p) => (p.completion || 0) >= 100).length;
  const inProgressProgramsCount = programsList.filter((p) => (p.completion || 0) > 0 && (p.completion || 0) < 100).length;

  const summaryItems = [
    { value: programsList.length.toString(), label: "Learning programs" },
    { value: activeProgramsCount.toString(), label: "Active programs" },
    { value: totalLearnersCount.toLocaleString(), label: "Enrolled learners" },
    { value: completedProgramsCount.toString(), label: "Completed programs" },
    { value: inProgressProgramsCount.toString(), label: "In-progress programs" }
  ];

  // Enrollment table rows
  const enrollmentRows = filteredEnrollments.map((enr) => ({
    key: enr.id,
    cells: [
      <div className="person-cell" key="person">
        <strong>{enr.learnerName}</strong>
        <small>{enr.learnerEmail}</small>
      </div>,
      enr.programTitle,
      enr.batch,
      <span key="comp" style={{ fontWeight: 650, color: "#166534" }}>{enr.completedModules || 0} modules</span>,
      <span key="rem" style={{ color: "var(--muted)" }}>{enr.remainingModules || 0} modules</span>,
      <div className="table-progress" key="prog">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${enr.progressPercentage || 0}%` }} />
        </div>
        <span>{enr.progressPercentage || 0}%</span>
      </div>,
      <StatusTag key="status">{enr.status}</StatusTag>,
      <button
        key="btn"
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
                title="Reset list"
                onClick={handleReset}
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Programs Card Grid */}
          <div className="institution-course-grid">
            {filteredPrograms.map((course) => (
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

          {filteredPrograms.length === 0 && (
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
                title="Reset list"
                onClick={handleReset}
              >
                <RefreshCw size={14} />
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

          {filteredEnrollments.length === 0 && (
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
        onSuccess={handleAddProgram}
        showMessage={showMessage}
      />

      {/* Edit Program Modal */}
      <EditProgramModal
        key={selectedProgramForEdit?.id}
        isOpen={Boolean(selectedProgramForEdit)}
        program={selectedProgramForEdit}
        onClose={() => setSelectedProgramForEdit(null)}
        onSuccess={handleEditProgram}
        showMessage={showMessage}
      />

      {/* Program Curriculum Details Modal */}
      <ProgramDetailsModal
        key={selectedProgramForDetails?.id}
        isOpen={Boolean(selectedProgramForDetails)}
        program={selectedProgramForDetails}
        onClose={() => setSelectedProgramForDetails(null)}
        onRefresh={() => {
          // re-trigger local render by shallow copy
          setProgramsList((prev) => [...prev]);
        }}
        showMessage={showMessage}
      />

      {/* Program Delete Modal */}
      <ProgramDeleteModal
        key={selectedProgramForDelete?.id}
        isOpen={Boolean(selectedProgramForDelete)}
        program={selectedProgramForDelete}
        onClose={() => setSelectedProgramForDelete(null)}
        onSuccess={handleDeleteProgram}
        showMessage={showMessage}
      />

      {/* Enroll Learner Modal */}
      <EnrollLearnerModal
        isOpen={isEnrollOpen}
        programs={programsList}
        onClose={() => setIsEnrollOpen(false)}
        onSuccess={handleEnrollLearner}
        showMessage={showMessage}
      />

      {/* Topic Progress Checklist Modal */}
      <TopicProgressModal
        key={selectedEnrollmentForProgress?.id}
        isOpen={Boolean(selectedEnrollmentForProgress)}
        enrollment={selectedEnrollmentForProgress}
        onClose={() => setSelectedEnrollmentForProgress(null)}
        onRefresh={() => {
          // re-trigger local render by shallow copy
          setEnrollmentsList((prev) => [...prev]);
        }}
        showMessage={showMessage}
      />
    </>
  );
}
