import React from "react";
import { CheckCircle2, VideoOff } from "lucide-react";
import { formatTimer } from "../../services/scoreCalculator.service";

export default function ExamCompletedPopup({
  activeExam,
  latestComp,
  submissionReason,
  timeSpentSeconds,
  activeQuestions,
  onDone
}) {
  return (
    <div className="exam-completed-popup-wrapper">
      <div className="exam-completed-popup-card">
        <div className="exam-completed-top-badge">
          PROCTORED ASSESSMENT • OFFICIAL SUBMISSION
        </div>

        <div className="exam-completed-icon-circle">
          <CheckCircle2 size={42} color="#16a34a" />
        </div>

        <h1 className="exam-completed-heading">
          {submissionReason === "timeout"
            ? "Time Completed — Exam Submitted!"
            : "Exam Successfully Completed!"}
        </h1>

        <p className="exam-completed-subtitle">
          Your responses for <strong>{activeExam?.examTitle || activeExam?.title}</strong> have been
          securely recorded and your proctoring camera &amp; microphone have been turned off.
        </p>

        {/* Formatted Exam Summary Table */}
        <div className="exam-completed-summary-box">
          <div className="summary-item-row">
            <span className="summary-label">Assessment Name</span>
            <span className="summary-value">{activeExam?.examTitle || activeExam?.title}</span>
          </div>
          <div className="summary-item-row">
            <span className="summary-label">Questions Answered</span>
            <span className="summary-value">
              {latestComp?.answeredCount ?? 0} / {latestComp?.totalQuestions ?? activeQuestions.length} Questions
            </span>
          </div>
          <div className="summary-item-row">
            <span className="summary-label">Exam Percentage</span>
            <span
              className="summary-value"
              style={{ color: "#16a34a", fontWeight: 800, fontSize: "15px" }}
            >
              {latestComp?.percentage ?? 0}%
            </span>
          </div>
          <div className="summary-item-row">
            <span className="summary-label">Submission Type</span>
            <span className="summary-value">
              {submissionReason === "timeout"
                ? "Auto-Submitted (Timer 00:00)"
                : "Manual Submission"}
            </span>
          </div>
          <div className="summary-item-row">
            <span className="summary-label">Time Taken</span>
            <span className="summary-value">
              {formatTimer(timeSpentSeconds)} / {activeExam?.durationLabel || "05:52"}
            </span>
          </div>
          <div className="summary-item-row">
            <span className="summary-label">Proctoring Camera &amp; Mic</span>
            <span className="summary-value status-pill-stopped">
              <VideoOff size={13} />
              <span>Stopped &amp; Disconnected</span>
            </span>
          </div>
          <div className="summary-item-row">
            <span className="summary-label">Exam Status</span>
            <span className="summary-value status-pill-verified">
              <CheckCircle2 size={13} />
              <span>Completed &amp; Verified</span>
            </span>
          </div>
        </div>

        <div className="exam-completed-footer-note">
          Thank you for completing the proctored assessment. Click <strong>Done</strong> to return to the Topic-wise Exams page and view your percentage on the exam card.
        </div>

        <div className="exam-completed-actions">
          <button
            type="button"
            className="btn-retake-exam-popup"
            onClick={onDone}
            style={{ background: "#16a34a", borderColor: "#15803d" }}
          >
            <CheckCircle2 size={16} />
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
