import { useState, useMemo } from "react";
import { Calendar, Clock, Plus, Search, ChevronRight, Send, X } from "lucide-react";
import { Badge } from "../common/Badge";
import { ActionButton, IconButton } from "../common/ActionButton.jsx";

export function Batches({ batches = [], onAddBatch }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New batch form state
  const [newBatchName, setNewBatchName] = useState("");
  const [newCourseName, setNewCourseName] = useState("Java Full Stack Development");
  const [newSchedule, setNewSchedule] = useState("Mon, Wed, Fri · 6:00 PM - 8:00 PM");
  const [newCapacity, setNewCapacity] = useState(120);

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchSearch = (b.name + " " + b.courseName + " " + b.code).toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [batches, search, statusFilter]);

  const activeCount = batches.filter((b) => b.status === "Active").length;
  const totalEnrolled = batches.reduce((sum, b) => sum + (b.enrolled || 0), 0);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;
    const newB = {
      id: `batch-${Date.now()}`,
      name: newBatchName,
      code: `BATCH-${Math.floor(100 + Math.random() * 900)}`,
      courseId: "crs-custom",
      courseName: newCourseName,
      schedule: newSchedule,
      enrolled: 1,
      capacity: Number(newCapacity) || 100,
      startDate: "Today",
      endDate: "In 3 Months",
      status: "Active",
      completion: 0
    };
    if (onAddBatch) onAddBatch(newB);
    setShowCreateModal(false);
    setNewBatchName("");
  };

  return (
    <div className="batches-container">
      {/* Header */}
      <div className="module-header-row">
        <div>
          <div className="breadcrumb-nav">
            <span>TX Pathwing</span> / <span>Instructor</span> / <strong className="current">Batches & Cohorts</strong>
          </div>
          <h1 className="module-title">Batch & Cohort Orchestration</h1>
          <p className="module-sub">Track active learning cohorts, capacity allocations, and live schedule calendars.</p>
        </div>
        <ActionButton
          icon={Plus}
          variant="primary"
          size="md"
          onClick={() => setShowCreateModal(true)}
          tooltip="Create a new learning cohort"
        >
          Create New Cohort
        </ActionButton>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="card inst-kpi-card kpi-active-learners">
          <span className="inst-kpi-label">ACTIVE BATCHES</span>
          <strong className="inst-kpi-value">{activeCount}</strong>
          <small className="inst-kpi-foot positive">● Real-time cohorts running</small>
        </div>
        <div className="card inst-kpi-card kpi-completion-rate">
          <span className="inst-kpi-label">TOTAL ENROLLED LEARNERS</span>
          <strong className="inst-kpi-value">{totalEnrolled}</strong>
          <small className="inst-kpi-foot positive">▲ 14.8% capacity fill rate</small>
        </div>
        <div className="card inst-kpi-card kpi-average-rating">
          <span className="inst-kpi-label">AVERAGE COMPLETION</span>
          <strong className="inst-kpi-value">76%</strong>
          <small className="inst-kpi-foot positive">Above platform benchmark</small>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card filter-bar-card">
        <div className="search-input-box">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search cohort title, code, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <IconButton
              icon={X}
              size="xs"
              variant="ghost"
              onClick={() => setSearch("")}
              tooltip="Clear search"
              ariaLabel="Clear batch search"
            />
          )}
        </div>
        <div className="filter-chips">
          {["All", "Active", "Upcoming"].map((st) => (
            <button
              key={st}
              type="button"
              className={`filter-chip ${statusFilter === st ? "active" : ""}`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Cohorts Grid */}
      <div className="cohorts-grid">
        {filteredBatches.map((batch) => {
          const fillPercent = Math.min(100, Math.round((batch.enrolled / batch.capacity) * 100));
          return (
            <div key={batch.id} className="card cohort-card">
              <div className="cohort-top">
                <div>
                  <span className="cohort-code">{batch.code}</span>
                  <h3 className="cohort-name">{batch.name}</h3>
                  <span className="cohort-course">{batch.courseName}</span>
                </div>
                <Badge tone={batch.status === "Active" ? "success" : "purple"}>{batch.status}</Badge>
              </div>

              <div className="cohort-schedule-pill">
                <Clock size={13} />
                <span>{batch.schedule}</span>
              </div>

              <div className="cohort-dates">
                <span><Calendar size={12} /> {batch.startDate} - {batch.endDate}</span>
              </div>

              {/* Progress & Capacity Fill */}
              <div className="cohort-stats-row">
                <div className="cohort-stat">
                  <span>Capacity Filled</span>
                  <strong>{batch.enrolled} / {batch.capacity} ({fillPercent}%)</strong>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${fillPercent}%` }} />
                  </div>
                </div>

                <div className="cohort-stat">
                  <span>Curriculum Progress</span>
                  <strong>{batch.completion}% Completed</strong>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill purple" style={{ width: `${batch.completion}%` }} />
                  </div>
                </div>
              </div>

              <ActionButton
                trailingIcon={ChevronRight}
                variant="outline-blue"
                size="sm"
                className="btn-cohort-details"
                onClick={() => setSelectedBatch(batch)}
                tooltip={`Manage cohort ${batch.code}`}
              >
                Manage Cohort
              </ActionButton>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedBatch && (
        <div className="modal-backdrop" onClick={() => setSelectedBatch(null)}>
          <div className="card modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="cohort-code">{selectedBatch.code}</span>
                <h2>{selectedBatch.name}</h2>
              </div>
              <IconButton
                icon={X}
                size="sm"
                variant="neutral"
                onClick={() => setSelectedBatch(null)}
                tooltip="Close"
                ariaLabel="Close cohort details"
              />
            </div>
            <div className="modal-body">
              <p><strong>Course:</strong> {selectedBatch.courseName}</p>
              <p><strong>Schedule:</strong> {selectedBatch.schedule}</p>
              <p><strong>Timeline:</strong> {selectedBatch.startDate} to {selectedBatch.endDate}</p>
              <p><strong>Enrollment Status:</strong> {selectedBatch.enrolled} / {selectedBatch.capacity} seats taken</p>
              <p><strong>Progress:</strong> {selectedBatch.completion}% completed</p>
            </div>
            <div className="modal-footer">
              <ActionButton icon={X} variant="secondary" size="md" onClick={() => setSelectedBatch(null)}>
                Close
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {/* Create Batch Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <form className="card modal-dialog" onClick={(e) => e.stopPropagation()} onSubmit={handleCreateSubmit}>
            <div className="modal-header">
              <h2>Create New Learning Cohort</h2>
              <IconButton
                icon={X}
                size="sm"
                variant="neutral"
                onClick={() => setShowCreateModal(false)}
                tooltip="Close"
                ariaLabel="Close create cohort dialog"
              />
            </div>
            <div className="modal-body form-grid">
              <label>
                <span>Cohort Name</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS DevOps Spring Intensive 2027"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                />
              </label>

              <label>
                <span>Associated Course</span>
                <select value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)}>
                  <option value="Java Full Stack Development">Java Full Stack Development</option>
                  <option value="AWS DevOps Engineer Professional">AWS DevOps Engineer Professional</option>
                  <option value="React 19 & Next.js Full Stack Engineering">React 19 & Next.js Full Stack Engineering</option>
                  <option value="Distributed Microservices & Kubernetes Architecture">Distributed Microservices & Kubernetes Architecture</option>
                </select>
              </label>

              <label>
                <span>Weekly Schedule</span>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                />
              </label>

              <label>
                <span>Student Capacity</span>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                />
              </label>
            </div>
            <div className="modal-footer">
              <ActionButton icon={X} variant="secondary" size="md" onClick={() => setShowCreateModal(false)}>
                Cancel
              </ActionButton>
              <ActionButton icon={Send} type="submit" variant="primary" size="md">
                Publish Cohort
              </ActionButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
