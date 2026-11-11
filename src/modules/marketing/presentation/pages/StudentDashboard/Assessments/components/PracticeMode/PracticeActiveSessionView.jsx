import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import "./PracticeActiveSessionView.css";

export default function PracticeActiveSessionView({
  activePracticeCourse,
  questions,
  practiceQIndex,
  practiceAnswers,
  selectedOpt,
  totalAnswered,
  onSelectIndex,
  onSelectOption,
  onPrevious,
  onNext,
  onFinish,
  onBackToCourses
}) {
  const currentQ = questions[practiceQIndex] || questions[0];

  return (
    <div className="topic-exams-page practice-exam-centered-viewport">
      <div className="practice-exam-centered-container">
        {/* Practice Header with Back Button */}
        <div className="practice-active-header">
          <div className="practice-active-title-group">
            <button
              type="button"
              onClick={onBackToCourses}
              className="practice-session-back-btn"
            >
              <ArrowLeft size={16} />
              <span>Back to Courses</span>
            </button>

            <div>
              <div className="practice-session-tag">PRACTICE MODE &bull; UNRESTRICTED</div>
              <h2 className="practice-session-title">
                {activePracticeCourse?.title} Practice
              </h2>
            </div>
          </div>

          <div className="practice-active-status-group">
            <span className="practice-session-count-label">
              Answered: <strong style={{ color: "#0f172a" }}>{totalAnswered} / {questions.length}</strong>
            </span>
            <button
              type="button"
              onClick={onFinish}
              className="practice-session-finish-btn"
            >
              <CheckCircle2 size={15} />
              <span>Finish Practice</span>
            </button>
          </div>
        </div>

        {/* Question Selector Numbers */}
        <div className="practice-num-pills-row">
          {questions.map((q, idx) => {
            const isAns = Boolean(practiceAnswers[q.id]);
            const isCur = idx === practiceQIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`practice-num-pill ${isCur ? "active" : ""} ${isAns ? "answered" : ""}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Practice Question Card */}
        <div className="question-card practice-question-card">
          <div className="question-card-top">
            <span className="question-meta-text">
              Question {practiceQIndex + 1} of {questions.length} &bull; Choose the correct answer &bull; 4 marks
            </span>
          </div>

          <h2 className="question-prompt-text">{currentQ.prompt}</h2>

          <div className="options-list">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOpt === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`practice-option-btn ${isSelected ? "practice-option-selected" : ""}`}
                  onClick={() => onSelectOption(currentQ.id, opt.id)}
                  aria-pressed={isSelected}
                >
                  <div className="practice-letter-badge">
                    {opt.id}
                  </div>
                  <span className="practice-option-text">{opt.text}</span>
                </button>
              );
            })}
          </div>

          <div className="practice-actions-footer">
            <button
              type="button"
              className="btn-practice-prev"
              onClick={onPrevious}
              disabled={practiceQIndex === 0}
            >
              <ArrowLeft size={15} />
              <span>Previous</span>
            </button>

            {practiceQIndex < questions.length - 1 ? (
              <button
                type="button"
                className="btn-practice-save-next"
                onClick={onNext}
              >
                <span>Save &amp; Next</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-practice-view-results"
                onClick={onFinish}
              >
                <CheckCircle2 size={16} />
                <span>View Results</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
