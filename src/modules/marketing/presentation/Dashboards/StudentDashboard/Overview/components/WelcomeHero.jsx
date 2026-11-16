import React from "react";
import { Sparkles, Play, Clock } from "lucide-react";

export default function WelcomeHero({
  userName = "Learner",
  streakDays = 5,
  learningHours = 28,
  activeCoursesCount = 0,
  lastCourse,
  onResume,
}) {
  return (
    <section className="welcome-hero-card">
      <div className="welcome-info">
        <span className="welcome-tagline">
          <Sparkles size={13} />
          LEARNING DASHBOARD
        </span>
        <h1 className="welcome-title">Welcome back, {userName}!</h1>
        <p className="welcome-subtitle">
          🔥 {streakDays} Day Streak · ⏱ {learningHours} Hours Studied · 📚 {activeCoursesCount} Active Courses Enrolled
        </p>
      </div>

      <div className="welcome-action-box">
        <button
          type="button"
          className="resume-hero-btn"
          onClick={() => onResume && onResume(lastCourse)}
        >
          <Play size={16} fill="#2563eb" />
          <span>Resume Last Lesson</span>
        </button>
        <span className="last-lesson-meta">
          <Clock size={12} />
          {lastCourse?.title || "Full Stack Development"}
        </span>
      </div>
    </section>
  );
}
