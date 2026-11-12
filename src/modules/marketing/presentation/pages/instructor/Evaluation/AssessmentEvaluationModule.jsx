import { ArrowLeft } from "lucide-react";
import { Assessments } from "../Assessments/Assessments";
import { AssessmentEvaluationHub } from "./AssessmentEvaluationHub";
import { Evaluation } from "./Evaluation";
import "./Evaluation.css";

/**
 * Orchestrator for the "Assessment & Evaluation" sidebar section.
 * Coordinates navigation between the two-card Hub, the existing Assessments
 * module (preserved untouched), and the new Evaluation module.
 */
export function AssessmentEvaluationModule({
  batches = [],
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  studentEvaluations = [],
  onCreateAssessment,
  onAssignAssessmentStudents,
  onSaveEvaluation,
  subView = "hub",
  onChangeSubView,
  onNavigate
}) {
  if (subView === "assessments") {
    return (
      <div className="ae-assessments-container">
        <div className="ae-module-topbar">
          <button
            type="button"
            className="btn-secondary asmt-back-btn"
            onClick={() => onChangeSubView?.("hub")}
          >
            <ArrowLeft size={15} />
            <span>Back to Assessment &amp; Evaluation</span>
          </button>

          <div className="breadcrumb-nav">
            <span>Assessment &amp; Evaluation</span>
            <span className="separator">/</span>
            <strong className="current">Assessments</strong>
          </div>
        </div>

        <Assessments
          batches={batches}
          courses={courses}
          learners={learners}
          batchAssessments={batchAssessments}
          assessmentAssignments={assessmentAssignments}
          onCreateAssessment={onCreateAssessment}
          onAssignAssessmentStudents={onAssignAssessmentStudents}
          onNavigate={onNavigate}
        />
      </div>
    );
  }

  if (subView === "evaluation") {
    return (
      <Evaluation
        batches={batches}
        courses={courses}
        learners={learners}
        batchAssessments={batchAssessments}
        assessmentAssignments={assessmentAssignments}
        studentEvaluations={studentEvaluations}
        onSaveEvaluation={onSaveEvaluation}
        onBackToHub={() => onChangeSubView?.("hub")}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <AssessmentEvaluationHub
      batchesCount={batches.length}
      assessmentsCount={batchAssessments.length}
      evaluationsCount={studentEvaluations.length}
      onOpenAssessments={() => onChangeSubView?.("assessments")}
      onOpenEvaluation={() => onChangeSubView?.("evaluation")}
    />
  );
}

export default AssessmentEvaluationModule;
