import React from "react";
import { BarChart3, CheckCircle2, Clock, Layers, BookOpen } from "lucide-react";

export function LearningMetricsGrid({ progressMetrics }) {
  return (
    <section className="metrics-grid-row">
      <div className="metric-stat-card featured">
        <div className="metric-card-top">
          <span className="metric-title-label">Overall Progress</span>
          <BarChart3 size={18} className="metric-icon-small" />
        </div>
        <div className="metric-value-huge">{progressMetrics.overallProgressPercent}%</div>
        <div className="metric-subtitle-text">
          {progressMetrics.completedTopics} of {progressMetrics.totalTopics} topics completed
        </div>
      </div>

      <div className="metric-stat-card">
        <div className="metric-card-top">
          <span className="metric-title-label">Completed Topics</span>
          <CheckCircle2 size={18} color="#10b981" />
        </div>
        <div className="metric-value-huge">{progressMetrics.completedTopics}</div>
        <div className="metric-subtitle-text">Topics mastered</div>
      </div>

      <div className="metric-stat-card">
        <div className="metric-card-top">
          <span className="metric-title-label">Remaining Topics</span>
          <Clock size={18} color="#f59e0b" />
        </div>
        <div className="metric-value-huge">{progressMetrics.remainingTopics}</div>
        <div className="metric-subtitle-text">Topics left to finish</div>
      </div>

      <div className="metric-stat-card">
        <div className="metric-card-top">
          <span className="metric-title-label">Total Modules</span>
          <Layers size={18} color="#8b5cf6" />
        </div>
        <div className="metric-value-huge">{progressMetrics.totalModules}</div>
        <div className="metric-subtitle-text">{progressMetrics.totalTopics} total topics</div>
      </div>

      <div className="metric-stat-card">
        <div className="metric-card-top">
          <span className="metric-title-label">Current Module</span>
          <BookOpen size={18} color="#2563eb" />
        </div>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>
          {progressMetrics.currentModule}
        </div>
        <div className="metric-subtitle-text">Active learning phase</div>
      </div>

      <div className="metric-stat-card">
        <div className="metric-card-top">
          <span className="metric-title-label">Est. Remaining Time</span>
          <Clock size={18} color="#64748b" />
        </div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>
          {progressMetrics.estimatedRemainingDuration}
        </div>
        <div className="metric-subtitle-text">Based on lesson lengths</div>
      </div>
    </section>
  );
}
