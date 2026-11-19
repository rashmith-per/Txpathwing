import React from "react";
import { CheckCircle2, Layers, Plus, X } from "lucide-react";
import { CATEGORY_META } from "./batchUtils.js";
import { BatchCard } from "./components/BatchCard.jsx";
import { BatchMetrics } from "./components/BatchMetrics.jsx";
import { BatchFilterBar } from "./components/BatchFilterBar.jsx";
import { CreateBatchModal } from "./components/CreateBatchModal.jsx";
import { ManageBatchModal } from "./components/ManageBatchModal.jsx";
import { useBatchesState } from "./hooks/useBatchesState.js";
import "./Batches.css";

export function Batches({
  batches = [],
  onAddBatch,
  onDeleteBatch,
  onUpdateBatch,
  courses = [],
  onNavigate
}) {
  const s = useBatchesState({
    batches,
    courses,
    onAddBatch,
    onUpdateBatch,
    onDeleteBatch
  });

  return (
    <div className="batches-container">
      {/* Top Header Row */}
      <div className="batches-header-row">
        <div className="batches-header-info">
          <div className="breadcrumb-nav">
            <span>TX Pathwing</span>
            <span>/</span>
            <span>Instructor</span>
            <span>/</span>
            <strong className="current">Batches</strong>
          </div>
          <h1 className="module-title">Batches</h1>
          <p className="module-sub">
            Track active batches, capacity allocations, and live schedule calendars categorized by course discipline.
          </p>
        </div>
        <button
          type="button"
          className="btn-create-cohort-top"
          onClick={() => {
            s.setFormError("");
            s.setShowCreateModal(true);
          }}
        >
          <Plus size={16} />
          <span>Create New Batch</span>
        </button>
      </div>

      {/* Success Toast Banner */}
      {s.toastMessage && (
        <div className="batch-toast-banner" role="status">
          <div className="batch-toast-left">
            <CheckCircle2 size={18} />
            <span>{s.toastMessage}</span>
          </div>
          <button
            type="button"
            className="batch-toast-close"
            onClick={() => s.setToastMessage(null)}
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* KPI Metrics */}
      <BatchMetrics
        activeCount={s.activeCount}
        totalEnrolled={s.totalEnrolled}
        overallFill={s.overallFill}
        avgProgress={s.avgProgress}
        totalCategories={s.totalCategories}
      />

      {/* Filters & View Mode */}
      <BatchFilterBar
        search={s.search}
        setSearch={s.setSearch}
        statusFilter={s.statusFilter}
        setStatusFilter={s.setStatusFilter}
        viewMode={s.viewMode}
        setViewMode={s.setViewMode}
        selectedCategory={s.selectedCategory}
        setSelectedCategory={s.setSelectedCategory}
        categoriesList={s.categoriesList}
        processedBatches={s.processedBatches}
      />

      {/* Batches Cards / Grid Display */}
      {s.filteredBatches.length === 0 ? (
        <div className="cohorts-empty-box">
          <Layers size={44} color="#94a3b8" />
          <h3>
            {s.processedBatches.length === 0
              ? "No Batches Created Yet"
              : "No Batches Match Your Search Filter"}
          </h3>
          <p>
            {s.processedBatches.length === 0
              ? "You have not created any batches yet. Click the button below to launch your first batch."
              : "Try adjusting your search query, status chip, or category filter to view other batches."}
          </p>
          <button
            type="button"
            className="btn-create-cohort-top"
            onClick={() => {
              s.setSearch("");
              s.setStatusFilter("All");
              s.setSelectedCategory("All");
              s.setFormError("");
              s.setShowCreateModal(true);
            }}
          >
            <Plus size={16} />
            <span>Create New Batch</span>
          </button>
        </div>
      ) : s.viewMode === "grouped" ? (
        Object.entries(s.groupedBatches).map(([category, catBatches]) => {
          const meta = CATEGORY_META[category] || CATEGORY_META["General"];
          return (
            <div key={category} className="category-section-block">
              <div className="category-section-banner">
                <div className="category-banner-left">
                  <span className="category-banner-icon">{meta.icon}</span>
                  <h2 className="category-banner-title">{category}</h2>
                </div>
                <span className="category-banner-badge">
                  {catBatches.length} {catBatches.length === 1 ? "Batch" : "Batches"}
                </span>
              </div>

              <div className="cohorts-grid-layout">
                {catBatches.map((batch) => (
                  <BatchCard
                    key={batch.id}
                    batch={batch}
                    onSelect={s.setSelectedBatch}
                    onDelete={s.handleDelete}
                  />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="cohorts-grid-layout">
          {s.filteredBatches.map((batch) => (
            <BatchCard
              key={batch.id}
              batch={batch}
              onSelect={s.setSelectedBatch}
              onDelete={s.handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal 1: Create New Batch */}
      <CreateBatchModal
        isOpen={s.showCreateModal}
        onClose={() => s.setShowCreateModal(false)}
        formError={s.formError}
        newBatchName={s.newBatchName}
        setNewBatchName={s.setNewBatchName}
        newCourseName={s.newCourseName}
        setNewCourseName={s.setNewCourseName}
        newSchedule={s.newSchedule}
        setNewSchedule={s.setNewSchedule}
        newCapacity={s.newCapacity}
        setNewCapacity={s.setNewCapacity}
        availableCourses={s.availableCourses}
        onSubmit={s.handleCreateSubmit}
      />

      {/* Modal 2: Manage Batch */}
      <ManageBatchModal
        selectedBatch={s.selectedBatch}
        onClose={() => {
          s.setSelectedBatch(null);
          s.setEditMode(false);
        }}
        editMode={s.editMode}
        setEditMode={s.setEditMode}
        editEnrolled={s.editEnrolled}
        setEditEnrolled={s.setEditEnrolled}
        editCapacity={s.editCapacity}
        setEditCapacity={s.setEditCapacity}
        editCompletion={s.editCompletion}
        setEditCompletion={s.setEditCompletion}
        editSchedule={s.editSchedule}
        setEditSchedule={s.setEditSchedule}
        editStatus={s.editStatus}
        setEditStatus={s.setEditStatus}
        onSaveEdits={s.handleSaveBatchEdits}
        onDelete={s.handleDelete}
      />
    </div>
  );
}

export { getCategoryForCourse } from "./batchUtils.js";
export default Batches;
