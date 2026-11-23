import { useEffect, useRef, useState } from "react";
import {
  FileUp,
  Plus,
  ArrowDownToLine,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search
} from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import DataTable from "../Layout/DataTable.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { departments } from "../Overview/overviewData.js";
import { BATCHES, LEARNER_STATUSES } from "./backend/models/LearnerModel.js";
import { learnerApi } from "./services/learnerApi.js";
import { downloadCsv } from "../utils.js";
import AddLearnerModal from "./components/AddLearnerModal.jsx";
import EditLearnerModal from "./components/EditLearnerModal.jsx";
import LearnerProfileModal from "./components/LearnerProfileModal.jsx";
import LearnerDeleteModal from "./components/LearnerDeleteModal.jsx";
import "./Learner.css";

export default function Learners({ search = "", showMessage }) {
  const [learnersList, setLearnersList] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    activeThisTerm: 0,
    placementReady: 0,
    needSupport: 0
  });

  const [departmentFilter, setDepartmentFilter] = useState("All departments");
  const [batchFilter, setBatchFilter] = useState("All batches");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [localSearch, setLocalSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedLearnerForView, setSelectedLearnerForView] = useState(null);
  const [selectedLearnerForEdit, setSelectedLearnerForEdit] = useState(null);
  const [selectedLearnerForDelete, setSelectedLearnerForDelete] = useState(null);

  const fileInputRef = useRef(null);

  const effectiveSearch = localSearch || search;

  const refreshLearners = () => {
    window.dispatchEvent(new CustomEvent("institution_learners_updated"));
  };

  useEffect(() => {
    let isCurrent = true;

    const fetchLearners = () => {
      Promise.all([
        learnerApi.getLearners({
          search: effectiveSearch,
          department: departmentFilter,
          batch: batchFilter,
          status: statusFilter,
          page,
          limit: 10
        }),
        learnerApi.getStatistics()
      ])
        .then(([listResult, statsResult]) => {
          if (!isCurrent) return;
          setLearnersList(listResult.learners || []);
          setPagination(listResult.pagination || { totalPages: 1, total: 0 });
          setStats(statsResult || {});
        })
        .catch((err) => {
          if (!isCurrent) return;
          if (showMessage) showMessage(`Error loading learners: ${err.message}`);
        })
        .finally(() => {
          if (isCurrent) setIsLoading(false);
        });
    };

    fetchLearners();

    window.addEventListener("institution_learners_updated", fetchLearners);
    return () => {
      isCurrent = false;
      window.removeEventListener("institution_learners_updated", fetchLearners);
    };
  }, [effectiveSearch, departmentFilter, batchFilter, statusFilter, page, showMessage]);

  // Handle CSV file upload & parsing
  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
        if (lines.length < 2) {
          showMessage("CSV file must contain a header and at least one row.");
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
        const records = [];

        for (let i = 1; i < lines.length; i++) {
          const cells = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
          const rowObj = {};
          headers.forEach((h, idx) => {
            rowObj[h] = cells[idx] || "";
          });
          if (rowObj.fullName || rowObj.name || rowObj.Name) {
            records.push(rowObj);
          }
        }

        if (records.length === 0) {
          showMessage("No valid learner rows found in CSV.");
          return;
        }

        const result = await learnerApi.importCsv(records);
        showMessage(`Imported ${result.importedCount} learners successfully. ${result.failedCount ? `(${result.failedCount} skipped)` : ""}`);
        refreshLearners();
      } catch (err) {
        showMessage(`CSV Import Error: ${err.message}`);
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  // Export current list to CSV
  const handleExportCsv = () => {
    if (!learnersList.length) {
      showMessage("No learner records available to export.");
      return;
    }

    const headers = ["Learner ID", "Full Name", "Email", "Phone", "Department", "Course", "Batch", "Progress", "Status"];
    const rows = learnersList.map((l) => [
      l.learnerId,
      l.fullName || l.name,
      l.email,
      l.phone || "",
      l.department,
      l.course || l.programme,
      l.batch,
      `${l.progress || 0}%`,
      l.learningStatus || l.status
    ]);

    downloadCsv(`learners-directory-${new Date().toISOString().split("T")[0]}.csv`, [headers, ...rows]);
    showMessage("Learners exported to CSV.");
  };

  const summaryItems = [
    { value: stats.total ? stats.total.toLocaleString() : "0", label: "Total learners" },
    { value: stats.activeThisTerm ? stats.activeThisTerm.toLocaleString() : "0", label: "Active this term" },
    { value: stats.placementReady ? stats.placementReady.toLocaleString() : "0", label: "Placement ready" },
    { value: stats.needSupport ? stats.needSupport.toLocaleString() : "0", label: "Need support" }
  ];

  const tableRows = learnersList.map((learner) => ({
    key: learner.id || learner.learnerId,
    cells: [
      <span className="learner-id-badge">{learner.learnerId}</span>,
      <div className="person-cell">
        <strong>{learner.fullName || learner.name}</strong>
        <small>{learner.email}</small>
      </div>,
      learner.department,
      learner.course || learner.programme,
      learner.batch,
      <div className="table-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${learner.progress || 0}%` }} />
        </div>
        <span>{learner.progress || 0}%</span>
      </div>,
      <StatusTag>{learner.learningStatus || learner.status || "On track"}</StatusTag>,
      <div className="learner-row-actions">
        <button
          type="button"
          className="learner-action-btn"
          title="View profile"
          onClick={() => setSelectedLearnerForView(learner)}
          aria-label={`View ${learner.fullName}`}
        >
          <Eye size={13} />
        </button>
        <button
          type="button"
          className="learner-action-btn"
          title="Edit learner"
          onClick={() => setSelectedLearnerForEdit(learner)}
          aria-label={`Edit ${learner.fullName}`}
        >
          <Edit2 size={13} />
        </button>
        <button
          type="button"
          className="learner-action-btn btn-delete"
          title="Delete learner"
          onClick={() => setSelectedLearnerForDelete(learner)}
          aria-label={`Delete ${learner.fullName}`}
        >
          <Trash2 size={13} />
        </button>
      </div>
    ]
  }));

  return (
    <>
      <PageHeading
        eyebrow="PEOPLE · LEARNERS"
        title="Learners"
        description="Monitor learner progress, programme enrollment, and academic support needs."
      >
        <div className="learner-toolbar-actions">
          <input
            ref={fileInputRef}
            className="visually-hidden"
            type="file"
            accept=".csv,text/csv"
            onChange={handleCsvUpload}
          />
          <button
            className="secondary-action"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Import learners from CSV"
          >
            <FileUp size={15} /> Import CSV
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={handleExportCsv}
            title="Export filtered records"
          >
            <ArrowDownToLine size={15} /> Export
          </button>
          <button
            className="primary-action"
            type="button"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus size={16} /> Add Learner
          </button>
        </div>
      </PageHeading>

      <SummaryStrip items={summaryItems} />

      <section className="panel page-panel">
        <div className="table-toolbar">
          <div>
            <h2>Learner directory</h2>
            <p>Showing {learnersList.length} of {pagination.total || stats.total} enrolled learners</p>
          </div>

          <div className="learner-toolbar-filters">
            <div className="filter-control" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search name, ID, email..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setPage(1);
                }}
                style={{ paddingLeft: "26px", minWidth: "180px", height: "30px", borderRadius: "6px", border: "1px solid var(--line)", fontSize: "11px" }}
              />
              <Search size={13} style={{ position: "absolute", left: "8px", top: "8px", color: "var(--muted)" }} />
            </div>

            <label className="filter-control">
              <span>Department</span>
              <select
                value={departmentFilter}
                onChange={(event) => {
                  setDepartmentFilter(event.target.value);
                  setPage(1);
                }}
              >
                <option>All departments</option>
                {departments.map((dept) => <option key={dept.name} value={dept.name}>{dept.name}</option>)}
              </select>
            </label>

            <label className="filter-control">
              <span>Batch</span>
              <select
                value={batchFilter}
                onChange={(event) => {
                  setBatchFilter(event.target.value);
                  setPage(1);
                }}
              >
                <option>All batches</option>
                {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>

            <label className="filter-control">
              <span>Status</span>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
              >
                <option>All statuses</option>
                {LEARNER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>

            <button
              type="button"
              className="icon-button"
              title="Refresh list"
              onClick={refreshLearners}
              disabled={isLoading}
            >
              <RefreshCw size={14} className={isLoading ? "spinner-inline" : ""} />
            </button>
          </div>
        </div>

        <DataTable
          columns={["LEARNER ID", "LEARNER NAME", "DEPT.", "PROGRAMME", "BATCH", "PROGRESS", "STATUS", "ACTIONS"]}
          rows={tableRows}
        />

        {!isLoading && learnersList.length === 0 && (
          <div className="panel table-empty" style={{ padding: "32px", textAlign: "center", color: "var(--muted)" }}>
            No learners found matching your criteria. Click "Add Learner" to register one.
          </div>
        )}

        {/* Pagination footer */}
        <div className="learner-pagination-bar">
          <span>
            Page {pagination.page || page} of {pagination.totalPages || 1} ({pagination.total || 0} total)
          </span>
          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              type="button"
              className="pagination-btn"
              onClick={() => setPage((p) => Math.min(pagination.totalPages || 1, p + 1))}
              disabled={page >= (pagination.totalPages || 1)}
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* Add Learner Modal */}
      <AddLearnerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={refreshLearners}
        showMessage={showMessage}
      />

      {/* Edit Learner Modal */}
      <EditLearnerModal
        key={selectedLearnerForEdit?.id}
        isOpen={Boolean(selectedLearnerForEdit)}
        learner={selectedLearnerForEdit}
        onClose={() => setSelectedLearnerForEdit(null)}
        onSuccess={refreshLearners}
        showMessage={showMessage}
      />

      {/* Learner Profile Details Modal */}
      <LearnerProfileModal
        isOpen={Boolean(selectedLearnerForView)}
        learner={selectedLearnerForView}
        onClose={() => setSelectedLearnerForView(null)}
        onEdit={(learner) => setSelectedLearnerForEdit(learner)}
      />

      {/* Learner Delete Confirmation Modal */}
      <LearnerDeleteModal
        isOpen={Boolean(selectedLearnerForDelete)}
        learner={selectedLearnerForDelete}
        onClose={() => setSelectedLearnerForDelete(null)}
        onSuccess={refreshLearners}
        showMessage={showMessage}
      />
    </>
  );
}
