import React from "react";
import { CheckCircle2, RotateCcw, ArrowLeft } from "lucide-react";
import "./PracticeResultView.css";

export default function PracticeResultView({
  activePracticeCourse,
  scoredMarks,
  totalMarks,
  percentage,
  correctCount,
  totalAnswered,
  questions,
  practiceAnswers,
  onRetake,
  onBackToCourses
}) {
  return (
    <div className="topic-exams-page practice-result-centered-viewport">
      <div className="practice-result-box-small">
        <div className="practice-result-icon-small">
          <CheckCircle2 size={24} color="#16a34a" />
        </div>

        <h1 className="practice-result-title-small">
          Practice Completed!
        </h1>
        <p className="practice-result-subtitle-small">
          Performance summary for <strong>{activePracticeCourse?.title}</strong>
        </p>

        <div className="practice-result-stats-row">
          <div className="practice-stat-card-small">
            <div className="practice-stat-label-small">TOTAL SCORE</div>
            <div className="practice-stat-val-small" style={{ color: "#2563eb" }}>{scoredMarks} / {totalMarks}</div>
            <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: "2px" }}>({percentage}%)</div>
          </div>

          <div className="practice-stat-card-small">
            <div className="practice-stat-label-small">CORRECT</div>
            <div className="practice-stat-val-small" style={{ color: "#16a34a" }}>{correctCount} / {questions.length}</div>
            <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: "2px" }}>Questions</div>
          </div>

          <div className="practice-stat-card-small">
            <div className="practice-stat-label-small">ANSWERED</div>
            <div className="practice-stat-val-small">{totalAnswered} / {questions.length}</div>
            <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: "2px" }}>Attempted</div>
          </div>
        </div>

        {/* Answer review list */}
        <div className="practice-review-scroll-small">
          <h3 style={{ fontSize: "13px", fontWeight: "700", marginBottom: "10px", color: "#0f172a" }}>
            Answers &amp; Explanations
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {questions.map((q, idx) => {
              const userAns = practiceAnswers[q.id];
              const isCorrect = userAns === q.correct;
              return (
                <div
                  key={q.id}
                  className="practice-review-card-small"
                  style={{
                    border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
                    background: isCorrect ? "#f0fdf4" : "#fef2f2"
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "3px" }}>
                    Q{idx + 1}: {q.prompt}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#334155", marginBottom: "2px" }}>
                    Your answer: <strong>{userAns || "None"}</strong> &bull; Correct: <strong>{q.correct}</strong>
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b", fontStyle: "italic" }}>
                    💡 {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn-practice-retake-small"
            onClick={onRetake}
          >
            <RotateCcw size={14} />
            <span>Retake</span>
          </button>

          <button
            type="button"
            className="btn-practice-back-small"
            onClick={onBackToCourses}
          >
            <ArrowLeft size={14} />
            <span>Back to Courses</span>
          </button>
        </div>
      </div>
    </div>
  );
}
