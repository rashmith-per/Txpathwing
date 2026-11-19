import React from "react";
import { CheckCircle, FolderKanban, Layers, Users } from "lucide-react";

export function BatchMetrics({
  activeCount,
  totalEnrolled,
  overallFill,
  avgProgress,
  totalCategories
}) {
  return (
    <div className="batches-metrics-grid">
      <div className="batch-metric-box">
        <div className="metric-info">
          <span className="metric-label">ACTIVE BATCHES</span>
          <strong className="metric-val">{activeCount}</strong>
          <span className="metric-note">
            {activeCount > 0 ? "● Real-time batches running" : "● No active batches running"}
          </span>
        </div>
        <div className="metric-icon-wrap blue">
          <Layers size={22} />
        </div>
      </div>

      <div className="batch-metric-box">
        <div className="metric-info">
          <span className="metric-label">TOTAL ENROLLED</span>
          <strong className="metric-val">{totalEnrolled}</strong>
          <span className="metric-note">▲ {overallFill}% capacity fill rate</span>
        </div>
        <div className="metric-icon-wrap green">
          <Users size={22} />
        </div>
      </div>

      <div className="batch-metric-box">
        <div className="metric-info">
          <span className="metric-label">AVERAGE PROGRESS</span>
          <strong className="metric-val">{avgProgress}%</strong>
          <span className="metric-note">Above platform benchmark</span>
        </div>
        <div className="metric-icon-wrap purple">
          <CheckCircle size={22} />
        </div>
      </div>

      <div className="batch-metric-box">
        <div className="metric-info">
          <span className="metric-label">CATEGORIES</span>
          <strong className="metric-val">{totalCategories}</strong>
          <span className="metric-note">Curriculum disciplines</span>
        </div>
        <div className="metric-icon-wrap amber">
          <FolderKanban size={22} />
        </div>
      </div>
    </div>
  );
}
