import React from "react";
import { Target, UserCheck, CheckCircle2, Clock, Star, Flame, Trophy, ArrowRight } from "lucide-react";
import { renderTopicIcon } from "./TopicExamCard";

export default function TopicProgressWidgets({
  totalCompletedCount,
  totalExamsCount,
  overallPercent,
  recommendedExam,
  onStartExam
}) {
  return (
    <aside className="topic-exams-right-col">
      {/* Widget 1: Your Progress */}
      <div className="topic-widget-card">
        <div className="widget-header-row">
          <Target size={16} color="#2563eb" />
          <h4 className="widget-title">Your Progress</h4>
        </div>

        <div className="your-progress-body">
          <div className="big-donut-wrap">
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="36" stroke="#e2e8f0" strokeWidth="8" fill="none" />
              <circle
                cx="44"
                cy="44"
                r="36"
                stroke="#2563eb"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 36}
                strokeDashoffset={2 * Math.PI * 36 * (1 - overallPercent / 100)}
                transform="rotate(-90 44 44)"
              />
            </svg>
            <span className="big-donut-pct">{overallPercent}%</span>
          </div>

          <div className="your-progress-info">
            <span className="progress-info-label">Total Exams Completed</span>
            <strong className="progress-info-count">
              {totalCompletedCount} / {totalExamsCount}
            </strong>
            <div className="progress-linear-track">
              <div
                className="progress-linear-fill"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Widget 2: Quick Stats */}
      <div className="topic-widget-card">
        <div className="widget-header-row">
          <UserCheck size={16} color="#2563eb" />
          <h4 className="widget-title">Quick Stats</h4>
        </div>

        <div className="quick-stats-grid">
          <div className="quick-stat-box">
            <div className="stat-top-line">
              <CheckCircle2 size={18} color="#16a34a" />
              <span className="stat-big-num">{totalCompletedCount}</span>
            </div>
            <span className="stat-sub-label">Completed</span>
          </div>

          <div className="quick-stat-box">
            <div className="stat-top-line">
              <Clock size={18} color="#6366f1" />
              <span className="stat-big-num">
                {Math.max(0, totalExamsCount - totalCompletedCount)}
              </span>
            </div>
            <span className="stat-sub-label">Remaining</span>
          </div>

          <div className="quick-stat-box">
            <div className="stat-top-line">
              <Star size={18} color="#eab308" fill="#eab308" />
              <span className="stat-big-num">3</span>
            </div>
            <span className="stat-sub-label">Certificates</span>
          </div>

          <div className="quick-stat-box">
            <div className="stat-top-line">
              <Flame size={18} color="#f97316" fill="#f97316" />
              <span className="stat-big-num">3</span>
            </div>
            <span className="stat-sub-label">Streak Days</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Recommended Next */}
      <div className="topic-widget-card">
        <div className="widget-header-row">
          <Trophy size={16} color="#2563eb" />
          <h4 className="widget-title">Recommended Next</h4>
        </div>

        <div className="recommended-next-body">
          <div className="recommended-icon-tile" style={{ backgroundColor: "#fff1f2" }}>
            {renderTopicIcon(recommendedExam?.id || "java")}
          </div>
          <div className="recommended-info">
            <h5 className="recommended-name">{recommendedExam?.title || "Java"} – OOPs Concepts</h5>
            <p className="recommended-desc">
              Deep dive into Object-Oriented Programming principles with real-world examples.
            </p>
            <button
              type="button"
              className="btn-recommended-start"
              onClick={() => onStartExam(recommendedExam)}
            >
              <span>Start Exam</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Widget 4: Motivational Card */}
      <div className="topic-motivation-card">
        <div className="motivation-left">
          <div className="motivation-target-icon">
            <Target size={22} color="#2563eb" />
          </div>
          <p className="motivation-quote">
            Small steps every day lead to <strong>big results.</strong>
          </p>
        </div>
      </div>
    </aside>
  );
}
