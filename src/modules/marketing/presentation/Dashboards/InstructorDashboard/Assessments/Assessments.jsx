import React from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { useAssessmentsManagement } from "./hooks/useAssessmentsManagement.js";
import { AssessmentBatchesGrid } from "./components/AssessmentBatchesGrid.jsx";
import { AssessmentStudentAssignment } from "./components/AssessmentStudentAssignment.jsx";
import { AssessmentModals } from "./components/AssessmentModals.jsx";
import "./Assessments.css";

export function Assessments({
  batches = [],
  courses = [],
  learners = [],
  batchAssessments = [],
  assessmentAssignments = [],
  onCreateAssessment,
  onAssignAssessmentStudents,
  onNavigate
}) {
  const m = useAssessmentsManagement({
    batches,
    courses,
    learners,
    batchAssessments,
    assessmentAssignments,
    onCreateAssessment,
    onAssignAssessmentStudents
  });

  return (
    <div className="instructor-assessments-page">
      {m.feedbackNotice && (
        <div
          className={`asmt-toast-banner ${m.feedbackNotice.type}`}
          role="status"
          aria-live="polite"
        >
          <div className="asmt-toast-content">
            {m.feedbackNotice.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <Info size={18} />
            )}
            <span>{m.feedbackNotice.message}</span>
          </div>
          <div className="asmt-toast-actions">
            {m.feedbackNotice.showNavActions && typeof onNavigate === "function" && (
              <>
                <button
                  type="button"
                  className="asmt-toast-link"
                  onClick={() => onNavigate("My Courses")}
                >
                  My Courses
                </button>
                <button
                  type="button"
                  className="asmt-toast-link"
                  onClick={() => onNavigate("Batches")}
                >
                  Batches
                </button>
              </>
            )}
            <button
              type="button"
              className="asmt-toast-close"
              onClick={() => m.setFeedbackNotice(null)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {!m.activeAssessment || !m.activeBatch ? (
        <AssessmentBatchesGrid
          batches={batches}
          batchAssessments={batchAssessments}
          enrichedBatches={m.enrichedBatches}
          onPracticeClick={m.handlePracticeClick}
          onOpenCreateModal={m.handleOpenCreateModal}
          onNavigate={onNavigate}
        />
      ) : (
        <AssessmentStudentAssignment
          activeAssessment={m.activeAssessment}
          activeBatch={m.activeBatch}
          activeCourseInfo={m.activeCourseInfo}
          activeSummary={m.activeSummary}
          activeRoster={m.activeRoster}
          isPracticeActive={m.isPracticeActive}
          activeTypeLabel={m.activeTypeLabel}
          activeTypeLower={m.activeTypeLower}
          onBack={() => {
            m.setActiveSelection(null);
            m.setStudentToAssign(null);
            m.setIsBulkConfirmOpen(false);
          }}
          onAssignSingle={(student) => m.setStudentToAssign(student)}
          onOpenBulkConfirm={() => m.setIsBulkConfirmOpen(true)}
          getAttendanceTone={m.getAttendanceTone}
        />
      )}

      <AssessmentModals
        activeCreateTargetBatch={m.activeCreateTargetBatch}
        assessmentTitleInput={m.assessmentTitleInput}
        createFormError={m.createFormError}
        onCloseCreateModal={m.handleCloseCreateModal}
        onCreateSubmit={m.handleCreateSubmit}
        onTitleInputChange={(e) => {
          m.setAssessmentTitleInput(e.target.value);
          if (m.createFormError) m.setCreateFormError("");
        }}
        studentToAssign={m.studentToAssign}
        activeAssessment={m.activeAssessment}
        activeBatch={m.activeBatch}
        isPracticeActive={m.isPracticeActive}
        activeTypeLabel={m.activeTypeLabel}
        activeTypeLower={m.activeTypeLower}
        onCloseAssignSingle={() => m.setStudentToAssign(null)}
        onConfirmAssignSingle={m.handleConfirmIndividualAssignment}
        isBulkConfirmOpen={m.isBulkConfirmOpen}
        activeSummary={m.activeSummary}
        onCloseBulkConfirm={() => m.setIsBulkConfirmOpen(false)}
        onConfirmBulkAssignment={m.handleConfirmBulkAssignment}
      />
    </div>
  );
}

export default Assessments;
