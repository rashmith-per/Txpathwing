import React from "react";
import { BookOpen, Clock, Flame } from "lucide-react";

export default function StatsCards({
  activeCoursesCount = 0,
  learningHours = 0,
  streakDays = 5,
}) {
  return (
    <section className="stats-grid-container stats-grid-3">
      <div className="stat-metric-card">
        <div className="stat-icon-wrapper icon-blue">
          <BookOpen size={20} />
        </div>
        <div className="stat-details">
          <h3 className="stat-value">{activeCoursesCount}</h3>
          <p className="stat-label">Active Courses</p>
        </div>
      </div>

      <div className="stat-metric-card">
        <div className="stat-icon-wrapper icon-purple">
          <Clock size={20} />
        </div>
        <div className="stat-details">
          <h3 className="stat-value">{learningHours}h</h3>
          <p className="stat-label">Learning Hours</p>
        </div>
      </div>

      <div className="stat-metric-card">
        <div className="stat-icon-wrapper icon-amber">
          <Flame size={20} />
        </div>
        <div className="stat-details">
          <h3 className="stat-value">{streakDays} Days</h3>
          <p className="stat-label">Day Streak</p>
        </div>
      </div>
    </section>
  );
}
