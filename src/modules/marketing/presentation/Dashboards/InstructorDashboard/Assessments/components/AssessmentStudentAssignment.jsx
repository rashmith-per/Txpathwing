import React from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Info,
  Send,
  UserCheck
} from "lucide-react";
import { Badge } from "../../common/Badge";

export function AssessmentStudentAssignment({
  activeAssessment,
  activeBatch,
  activeCourseInfo,
  activeSummary,
  activeRoster,
  isPracticeActive,
  activeTypeLabel,
  activeTypeLower,
  onBack,
  onAssignSingle,
  onOpenBulkConfirm,
  getAttendanceTone
}) {
  return (
    <div className="asmt-assignment-screen">
      <div className="asmt-screen-topbar">
        <button
          type="button"
          className="btn-secondary asmt-back-btn"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          <span>Back to Batches</span>
        </button>
      </div>

      <div className="asmt-assignment-header-card">
        <div className="asmt-assignment-title-block">
          {!isPracticeActive && (
            <div className="asmt-batch-badges">
              <Badge tone="blue">{activeBatch.name}</Badge>
              {activeCourseInfo?.courseName && (
                <Badge tone="neutral">{activeCourseInfo.courseName}</Badge>
              )}
            </div>
          )}
          <h1 className="module-title">{activeAssessment.title}</h1>
          <p className="module-sub">
            Assign this {activeTypeLower} to individual students or across {activeBatch.name}.
          </p>
        </div>

        <div className="asmt-summary-metrics">
          <div className="asmt-summary-kpi">
            <span className="asmt-summary-kpi-label">Batch Name</span>
            <strong className="asmt-summary-kpi-value">{activeBatch.name}</strong>
          </div>
          <div className="asmt-summary-kpi">
            <span className="asmt-summary-kpi-label">
              {isPracticeActive ? "Assessment Type" : "Assessment Title"}
            </span>
            <strong className="asmt-summary-kpi-value">{activeAssessment.title}</strong>
          </div>
          <div className="asmt-summary-kpi">
            <span className="asmt-summary-kpi-label">Total Enrolled Students</span>
            <strong className="asmt-summary-kpi-value">{activeSummary.totalStudents}</strong>
          </div>
          <div className="asmt-summary-kpi kpi-success">
            <span className="asmt-summary-kpi-label">Assigned Students</span>
            <strong className="asmt-summary-kpi-value">{activeSummary.assignedCount}</strong>
          </div>
          <div className="asmt-summary-kpi kpi-warning">
            <span className="asmt-summary-kpi-label">Pending Students</span>
            <strong className="asmt-summary-kpi-value">{activeSummary.pendingCount}</strong>
          </div>
        </div>
      </div>

      {activeRoster.matchSource === "course_fallback" && (
        <div className="asmt-data-note-banner">
          <Info size={16} />
          <span>
            Displaying existing learners enrolled in <strong>{activeCourseInfo?.courseName}</strong>.
            Direct per-batch IDs and attendance logs are not present in the existing frontend learner records.
          </span>
        </div>
      )}

      <div className="submissions-table-card asmt-student-table-wrap">
        {activeRoster.students.length === 0 ? (
          <div className="asmt-table-empty">
            <AlertCircle size={26} />
            <h3>No Enrolled Student Records Found</h3>
            <p>
              No learner records in the existing frontend dataset are associated with{" "}
              <strong>{activeBatch.name}</strong> ({activeCourseInfo?.courseName}).
            </p>
          </div>
        ) : (
          <table className="dark-pro-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Attendance Status</th>
                <th>Assessment Assignment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeRoster.students.map((student) => {
                const isAssigned = activeSummary.assignedStudentIds.has(student.id);
                return (
                  <tr key={student.id}>
                    <td className="asmt-student-id-cell">{student.id}</td>
                    <td>
                      <span className="table-main-title">{student.name}</span>
                      {student.email && (
                        <span className="asmt-student-sub">{student.email}</span>
                      )}
                    </td>
                    <td>
                      <Badge tone={getAttendanceTone(student.attendanceStatus)}>
                        {student.attendanceStatus}
                      </Badge>
                    </td>
                    <td>
                      {isAssigned ? (
                        <Badge tone="success">Assigned</Badge>
                      ) : (
                        <Badge tone="warning">Pending</Badge>
                      )}
                    </td>
                    <td>
                      {isAssigned ? (
                        <button
                          type="button"
                          className="asmt-assigned-btn"
                          disabled
                        >
                          <UserCheck size={14} />
                          <span>Assigned</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-action-sm asmt-assign-test-btn"
                          onClick={() => onAssignSingle(student)}
                        >
                          <Send size={13} />
                          <span>Assign Test</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="asmt-bulk-footer-bar">
        <div className="asmt-bulk-footer-status">
          {activeSummary.allAssigned ? (
            <div className="asmt-all-assigned-notice">
              <CheckCircle2 size={18} />
              <span>
                {activeTypeLabel} has already been assigned to all students in {activeBatch.name}.
              </span>
            </div>
          ) : activeRoster.students.length > 0 ? (
            <div className="asmt-pending-hint">
              <Clock size={16} />
              <span>
                {activeSummary.pendingCount} pending student
                {activeSummary.pendingCount === 1 ? "" : "s"} will receive this{" "}
                {activeTypeLower} when bulk assigned (all attendance statuses included).
              </span>
            </div>
          ) : (
            <div className="asmt-pending-hint">
              <Info size={16} />
              <span>
                Assign {activeTypeLabel} to {activeBatch.name} becomes active when student
                records exist for this batch.
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn-primary-gradient asmt-bulk-btn"
          disabled={activeRoster.students.length === 0 || activeSummary.allAssigned}
          onClick={onOpenBulkConfirm}
        >
          <ClipboardCheck size={16} />
          <span>
            Assign {activeTypeLabel} to {activeBatch.name}
          </span>
        </button>
      </div>
    </div>
  );
}
