import React from "react";
import { BookOpen, ClipboardCheck, Layers, Play, Users } from "lucide-react";
import { Badge } from "../../common/Badge";

export function AssessmentBatchesGrid({
  batches,
  batchAssessments,
  enrichedBatches,
  onPracticeClick,
  onOpenCreateModal,
  onNavigate
}) {
  return (
    <>
      <div className="module-header-row">
        <div>
          <h1 className="module-title">Assessment</h1>
          <p className="module-sub">
            Select a batch to create assessments and assign tests directly to enrolled students.
          </p>
        </div>
        <div className="asmt-header-summary-pill">
          <Layers size={15} />
          <span>{batches.length} {batches.length === 1 ? "Batch" : "Batches"}</span>
          <span className="asmt-pill-divider" />
          <ClipboardCheck size={15} />
          <span>
            {batchAssessments.length} Saved {batchAssessments.length === 1 ? "Assessment" : "Assessments"}
          </span>
        </div>
      </div>

      {enrichedBatches.length === 0 ? (
        <div className="asmt-empty-state-card">
          <div className="asmt-empty-icon-wrap">
            <Layers size={28} />
          </div>
          <h2>No Batches Available</h2>
          <p>
            Create a batch in Batch Management first. Any batch created, updated, or removed
            there appears here automatically.
          </p>
          {typeof onNavigate === "function" && (
            <button
              type="button"
              className="btn-primary-gradient"
              onClick={() => onNavigate("Batches")}
            >
              Go to Batches
            </button>
          )}
        </div>
      ) : (
        <div className="asmt-batches-grid">
          {enrichedBatches.map(({ batch, syllabus, enrolledCount }) => (
            <article key={batch.id} className="asmt-batch-card">
              <div className="asmt-batch-card-top">
                <div className="asmt-batch-title-group">
                  <div className="asmt-batch-badges">
                    {batch.code && <Badge tone="blue">{batch.code}</Badge>}
                    {batch.status && (
                      <Badge tone={String(batch.status).toLowerCase() === "active" ? "success" : "neutral"}>
                        {batch.status}
                      </Badge>
                    )}
                  </div>
                  <h2 className="asmt-batch-name">{batch.name}</h2>
                  <p className="asmt-course-name">
                    <BookOpen size={14} />
                    <span>{syllabus.courseName}</span>
                  </p>
                </div>
              </div>

              <div className="asmt-batch-stats-grid">
                <div className="asmt-stat-box">
                  <span className="asmt-stat-label">Enrolled Students</span>
                  <div className="asmt-stat-value-row">
                    <Users size={15} className="asmt-stat-icon" />
                    <span className="asmt-stat-value">{enrolledCount}</span>
                  </div>
                </div>

                <div className="asmt-stat-box">
                  <span className="asmt-stat-label">Covered Syllabus</span>
                  <div className="asmt-stat-value-row">
                    <ClipboardCheck size={15} className="asmt-stat-icon" />
                    <span className="asmt-stat-value">{syllabus.syllabusLabel}</span>
                  </div>
                </div>
              </div>

              <div className="asmt-progress-section">
                <div className="asmt-progress-header">
                  <span>Syllabus Completion</span>
                  <strong>{syllabus.completionPercentage}%</strong>
                </div>
                <div className="asmt-progress-track">
                  <div
                    className="asmt-progress-fill"
                    style={{ width: `${syllabus.completionPercentage}%` }}
                  />
                </div>
              </div>

              <div className="asmt-batch-actions">
                <button
                  type="button"
                  className="btn-secondary asmt-btn-half"
                  onClick={() => onPracticeClick(batch)}
                >
                  <Play size={14} />
                  <span>Practice</span>
                </button>
                <button
                  type="button"
                  className="btn-primary-gradient asmt-btn-half asmt-btn-center"
                  onClick={() => onOpenCreateModal(batch)}
                >
                  <ClipboardCheck size={15} />
                  <span>Assessment</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
