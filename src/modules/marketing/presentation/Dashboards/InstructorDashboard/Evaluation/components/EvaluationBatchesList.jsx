import React from "react";
import { ArrowLeft, Award, BookOpen, Layers, UserCheck, Users } from "lucide-react";
import { Badge } from "../../common/Badge";

export function EvaluationBatchesList({
  evaluationBatches,
  totalEvaluatedAcrossBatches,
  onBackToHub,
  onNavigate,
  onSelectBatch,
  getBatchStatusTone
}) {
  return (
    <>
      <div className="eval-screen-topbar">
        {typeof onBackToHub === "function" && (
          <button
            type="button"
            className="btn-secondary asmt-back-btn"
            onClick={onBackToHub}
          >
            <ArrowLeft size={15} />
            <span>Back to Assessment &amp; Evaluation</span>
          </button>
        )}
      </div>

      <div className="module-header-row">
        <div>
          <div className="breadcrumb-nav">
            <span>TX Pathwing</span>
            <span className="separator">/</span>
            <span>Assessment &amp; Evaluation</span>
            <span className="separator">/</span>
            <strong className="current">Evaluation</strong>
          </div>
          <h1 className="module-title">Evaluation Batches</h1>
          <p className="module-sub">
            Select a batch to review enrolled students and allot assessment evaluation marks.
          </p>
        </div>

        <div className="asmt-header-summary-pill">
          <Layers size={15} />
          <span>
            {evaluationBatches.length}{" "}
            {evaluationBatches.length === 1 ? "Batch" : "Batches"}
          </span>
          <span className="asmt-pill-divider" />
          <Award size={15} />
          <span>{totalEvaluatedAcrossBatches} Evaluated</span>
        </div>
      </div>

      {evaluationBatches.length === 0 ? (
        <div className="asmt-empty-state-card">
          <div className="asmt-empty-icon-wrap">
            <Layers size={28} />
          </div>
          <h2>No Batches Available</h2>
          <p>
            Create a batch in Batch Management first. Any batch created or updated there
            appears here automatically for student evaluation.
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
        <div className="eval-batches-grid">
          {evaluationBatches.map((item) => (
            <article key={item.batch.id} className="asmt-batch-card eval-batch-card">
              <div className="asmt-batch-card-top">
                <div className="asmt-batch-title-group">
                  <div className="asmt-batch-badges">
                    <Badge tone={getBatchStatusTone(item.status)}>
                      {item.status}
                    </Badge>
                    {item.code && <Badge tone="blue">{item.code}</Badge>}
                  </div>
                  <span className="eval-field-kicker">Batch Name</span>
                  <h2 className="asmt-batch-name">{item.batchName}</h2>
                  <p className="asmt-course-name">
                    <BookOpen size={14} />
                    <span>
                      <strong>Batch Title:</strong> {item.batchTitle}
                    </span>
                  </p>
                </div>
              </div>

              <div className="asmt-batch-stats-grid">
                <div className="asmt-stat-box">
                  <span className="asmt-stat-label">Enrolled Candidates</span>
                  <div className="asmt-stat-value-row">
                    <Users size={15} className="asmt-stat-icon" />
                    <span className="asmt-stat-value">{item.enrolledCandidates}</span>
                  </div>
                </div>

                <div className="asmt-stat-box">
                  <span className="asmt-stat-label">Attended Students</span>
                  <div className="asmt-stat-value-row">
                    <UserCheck size={15} className="asmt-stat-icon" />
                    <span className="asmt-stat-value">{item.attendedStudents}</span>
                  </div>
                </div>
              </div>

              <div className="eval-card-footer">
                <button
                  type="button"
                  className="btn-primary-gradient eval-batch-btn"
                  onClick={() => onSelectBatch(item.batch)}
                >
                  <Award size={15} />
                  <span>Evaluate</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
