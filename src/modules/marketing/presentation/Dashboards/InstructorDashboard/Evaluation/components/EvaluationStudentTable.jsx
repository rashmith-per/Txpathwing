import React from "react";
import { AlertCircle, ArrowLeft, Award, ClipboardCheck, Clock, Edit3 } from "lucide-react";
import { Badge } from "../../common/Badge";

export function EvaluationStudentTable({
  selectedBatch,
  studentDetailsData,
  onBackToBatches,
  onSelectAssessmentId,
  onOpenEvaluationModal,
  getBatchStatusTone
}) {
  return (
    <div className="eval-details-screen">
      <div className="eval-screen-topbar">
        <button
          type="button"
          className="btn-secondary asmt-back-btn"
          onClick={onBackToBatches}
        >
          <ArrowLeft size={15} />
          <span>Back to Batches</span>
        </button>

        <div className="breadcrumb-nav">
          <span>Assessment &amp; Evaluation</span>
          <span className="separator">/</span>
          <span>Evaluation</span>
          <span className="separator">/</span>
          <strong className="current">{selectedBatch.name}</strong>
        </div>
      </div>

      <div className="asmt-assignment-header-card">
        <div className="eval-details-header-row">
          <div className="asmt-assignment-title-block">
            <div className="asmt-batch-badges">
              <Badge tone={getBatchStatusTone(selectedBatch.status || "Active")}>
                {selectedBatch.status || "Active"}
              </Badge>
              <Badge tone="blue">{selectedBatch.name}</Badge>
            </div>
            <h1 className="module-title">Student Details</h1>
            <p className="module-sub">
              Evaluate students in <strong>{selectedBatch.name}</strong>, allot marks, and
              update saved evaluations.
            </p>
          </div>

          {studentDetailsData.assessmentsForBatch.length > 1 && (
            <div className="eval-assessment-selector">
              <label htmlFor="eval-assessment-select">Active Assessment</label>
              <select
                id="eval-assessment-select"
                value={studentDetailsData.activeAssessment?.id || ""}
                onChange={(e) => onSelectAssessmentId(e.target.value)}
              >
                {studentDetailsData.assessmentsForBatch.map((asmt) => (
                  <option key={asmt.id} value={asmt.id}>
                    {asmt.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="eval-summary-metrics">
          <div className="asmt-summary-kpi">
            <span className="asmt-summary-kpi-label">Selected Batch Name</span>
            <strong className="asmt-summary-kpi-value">{selectedBatch.name}</strong>
          </div>
          <div className="asmt-summary-kpi">
            <span className="asmt-summary-kpi-label">Total Students</span>
            <strong className="asmt-summary-kpi-value">
              {studentDetailsData.totalStudents}
            </strong>
          </div>
          <div className="asmt-summary-kpi kpi-success">
            <span className="asmt-summary-kpi-label">Evaluated Students</span>
            <strong className="asmt-summary-kpi-value">
              {studentDetailsData.evaluatedStudents}
            </strong>
          </div>
          <div className="asmt-summary-kpi kpi-warning">
            <span className="asmt-summary-kpi-label">Pending Evaluations</span>
            <strong className="asmt-summary-kpi-value">
              {Math.max(
                0,
                studentDetailsData.totalStudents - studentDetailsData.evaluatedStudents
              )}
            </strong>
          </div>
        </div>
      </div>

      <div className="submissions-table-card asmt-student-table-wrap">
        {studentDetailsData.rows.length === 0 ? (
          <div className="asmt-table-empty">
            <AlertCircle size={26} />
            <h3>No Enrolled Students Found</h3>
            <p>
              No learner records are currently associated with{" "}
              <strong>{selectedBatch.name}</strong>.
            </p>
          </div>
        ) : (
          <table className="dark-pro-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Assessment Title</th>
                <th>Time Duration</th>
                <th>Total Marks</th>
                <th>Evaluation Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentDetailsData.rows.map((row) => (
                <tr key={row.rowKey}>
                  <td>
                    <span className="table-main-title">{row.studentName}</span>
                    {row.studentEmail && (
                      <span className="asmt-student-sub">{row.studentEmail}</span>
                    )}
                  </td>
                  <td>
                    <span className="eval-course-label">{row.courseName}</span>
                  </td>
                  <td>
                    <span className="eval-assessment-title-cell">
                      <ClipboardCheck size={14} />
                      <span>{row.assessmentTitle}</span>
                    </span>
                  </td>
                  <td>
                    <span className="date-tag">
                      <Clock size={12} />
                      <span>{row.timeDuration}</span>
                    </span>
                  </td>
                  <td>
                    <strong className="eval-total-marks">{row.totalMarks}</strong>
                  </td>
                  <td>
                    <div className="eval-status-stack">
                      {row.isEvaluated ? (
                        <>
                          <Badge tone="success">Evaluated</Badge>
                          <span className="eval-obtained-marks-pill">
                            Obtained: <strong>{row.marksObtained}</strong> / {row.totalMarks}
                          </span>
                        </>
                      ) : (
                        <Badge tone="warning">Pending</Badge>
                      )}
                    </div>
                  </td>
                  <td className="text-right">
                    {row.isEvaluated ? (
                      <button
                        type="button"
                        className="btn-action-sm eval-edit-btn"
                        onClick={() => onOpenEvaluationModal(row)}
                      >
                        <Edit3 size={13} />
                        <span>Edit Evaluation</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-action-sm eval-action-btn"
                        onClick={() => onOpenEvaluationModal(row)}
                      >
                        <Award size={13} />
                        <span>Evaluate</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
