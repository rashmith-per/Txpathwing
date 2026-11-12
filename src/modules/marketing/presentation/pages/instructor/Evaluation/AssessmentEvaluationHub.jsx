import { ArrowRight, Award, ClipboardCheck, Layers, Users } from "lucide-react";
import "./Evaluation.css";

/**
 * Hub page for the "Assessment & Evaluation" sidebar item.
 * Presents two module cards: Assessments and Evaluation.
 */
export function AssessmentEvaluationHub({
  batchesCount = 0,
  assessmentsCount = 0,
  evaluationsCount = 0,
  onOpenAssessments,
  onOpenEvaluation
}) {
  return (
    <div className="ae-hub-page">
      <div className="module-header-row">
        <div>
          <div className="breadcrumb-nav">
            <span>TX Pathwing</span>
            <span className="separator">/</span>
            <span>Instructor</span>
            <span className="separator">/</span>
            <strong className="current">Assessment &amp; Evaluation</strong>
          </div>
          <h1 className="module-title">Assessment &amp; Evaluation</h1>
          <p className="module-sub">
            Choose a module to manage batch assessments or evaluate enrolled student performance.
          </p>
        </div>

        <div className="asmt-header-summary-pill">
          <Layers size={15} />
          <span>
            {batchesCount} {batchesCount === 1 ? "Batch" : "Batches"}
          </span>
          <span className="asmt-pill-divider" />
          <ClipboardCheck size={15} />
          <span>
            {assessmentsCount} {assessmentsCount === 1 ? "Assessment" : "Assessments"}
          </span>
        </div>
      </div>

      <div className="ae-hub-grid">
        {/* Card 1: Assessments */}
        <article
          className="card ae-module-card"
          onClick={onOpenAssessments}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenAssessments?.();
            }
          }}
        >
          <div className="ae-card-head">
            <div className="ae-icon-badge ae-icon-blue">
              <ClipboardCheck size={26} />
            </div>
            <span className="ae-module-meta-pill">
              <Layers size={13} />
              <span>
                {batchesCount} {batchesCount === 1 ? "Batch" : "Batches"}
              </span>
            </span>
          </div>

          <div className="ae-card-body">
            <h2 className="ae-card-title">Assessments</h2>
            <p className="ae-card-desc">Manage existing assessments and batches.</p>
          </div>

          <div className="ae-card-footer">
            <button
              type="button"
              className="btn-primary-gradient ae-open-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAssessments?.();
              }}
            >
              <span>Open Module</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </article>

        {/* Card 2: Evaluation */}
        <article
          className="card ae-module-card ae-card-eval"
          onClick={onOpenEvaluation}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenEvaluation?.();
            }
          }}
        >
          <div className="ae-card-head">
            <div className="ae-icon-badge ae-icon-emerald">
              <Award size={26} />
            </div>
            <span className="ae-module-meta-pill ae-meta-emerald">
              <Users size={13} />
              <span>{evaluationsCount} Evaluated</span>
            </span>
          </div>

          <div className="ae-card-body">
            <h2 className="ae-card-title">Evaluation</h2>
            <p className="ae-card-desc">View batches and evaluate students.</p>
          </div>

          <div className="ae-card-footer">
            <button
              type="button"
              className="btn-primary-gradient ae-open-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenEvaluation?.();
              }}
            >
              <span>Open Module</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default AssessmentEvaluationHub;
