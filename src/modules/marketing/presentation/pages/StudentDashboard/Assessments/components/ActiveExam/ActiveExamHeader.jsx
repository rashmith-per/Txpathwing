import React from "react";
import { ChevronLeft, Clock, CheckCircle2 } from "lucide-react";
import { formatTimer } from "../../services/scoreCalculator.service";

export default function ActiveExamHeader({
  activeExam,
  activeQuestions,
  currentAnsweredCount,
  secondsRemaining,
  onBack,
  onSubmit
}) {
  return (
    <div className="quiz-header-row">
      <div className="quiz-header-left">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="btn-back-dashboard"
              title="Back to Dashboard"
            >
              <ChevronLeft size={16} />
              <span>Dashboard</span>
            </button>
          )}
          <span className="quiz-eyebrow">ATTEMPT IN PROGRESS • PROCTORED</span>
        </div>
        <h1 className="quiz-title">{activeExam?.examTitle || activeExam?.title}</h1>
        <p className="quiz-meta-sub">
          {activeQuestions.length} questions • Answered: {currentAnsweredCount} / {activeQuestions.length} • Proctored Exam
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="quiz-timer-pill">
          <Clock size={16} />
          <span>{formatTimer(secondsRemaining)} remaining</span>
        </div>

        <button
          type="button"
          className="btn-submit-assessment"
          onClick={() => onSubmit("manual")}
        >
          <CheckCircle2 size={16} />
          <span>Submit Assessment</span>
        </button>
      </div>
    </div>
  );
}
