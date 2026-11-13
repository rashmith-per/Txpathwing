import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  Circle,
  PlayCircle,
} from "lucide-react";
import { studentApi } from "../services/studentApi";
import "./CourseLearningDetails.css";

export default function CourseLearningDetails({
  courseId,
  onBack,
  onLaunchTopic,
  showToast,
}) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  const loadDetails = async () => {
    try {
      setLoading(true);
      const data = await studentApi.getCourseLearningDetails(courseId);
      setDetails(data);
      setError(null);

      // Auto expand all modules or current module
      if (data.course?.modules) {
        const initialExpanded = {};
        data.course.modules.forEach((m, idx) => {
          // Open first 2 modules by default
          initialExpanded[m.id] = idx < 2;
        });
        setExpandedModules(initialExpanded);
      }
    } catch (err) {
      setError(err.message || "Failed to load course learning details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      loadDetails();
    }
  }, [courseId]);

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const toggleAllModules = () => {
    const allOpen = Object.values(expandedModules).every(Boolean);
    const updated = {};
    details?.course?.modules?.forEach((m) => {
      updated[m.id] = !allOpen;
    });
    setExpandedModules(updated);
  };

  const handleToggleTopicStatus = async (topic) => {
    const nextStatus =
      topic.status === "completed"
        ? "not-started"
        : topic.status === "in-progress"
        ? "completed"
        : "in-progress";

    try {
      await studentApi.updateTopicProgress({
        courseId: details.course.id,
        topicId: topic.id,
        status: nextStatus,
      });

      if (showToast) {
        showToast(`Topic marked as ${nextStatus}!`);
      }
      // Reload fresh metrics
      await loadDetails();
    } catch (err) {
      if (showToast) showToast("Error updating topic progress");
    }
  };

  const handleLaunchTopic = async (topic) => {
    try {
      await studentApi.setLastAccessedTopic(details.course.id, topic.id);
      if (onLaunchTopic) {
        onLaunchTopic({
          ...details.course,
          selectedTopicId: topic.id,
          selectedTopic: topic,
        });
      }
    } catch {
      if (onLaunchTopic) onLaunchTopic(details.course);
    }
  };

  const handleContinueLearning = () => {
    const targetTopic =
      details?.progressMetrics?.lastAccessedTopic ||
      details?.progressMetrics?.nextIncompleteTopic ||
      details?.course?.modules?.[0]?.topics?.[0];

    if (targetTopic) {
      handleLaunchTopic(targetTopic);
    } else if (onLaunchTopic) {
      onLaunchTopic(details?.course);
    }
  };

  if (loading) {
    return (
      <div className="learning-details-container">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#64748b" }}>
          <Sparkles size={32} color="#3b82f6" style={{ margin: "0 auto 12px auto" }} />
          <h3>Loading course learning details...</h3>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="learning-details-container">
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <h3 style={{ color: "#ef4444" }}>{error || "Course not found"}</h3>
          <button
            type="button"
            className="learning-back-btn"
            style={{ margin: "16px auto" }}
            onClick={onBack}
          >
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { course, progressMetrics } = details;
  const isAllOpen = Object.values(expandedModules).every(Boolean);

  const activeTopicTarget =
    progressMetrics.lastAccessedTopic ||
    progressMetrics.nextIncompleteTopic ||
    course.modules?.[0]?.topics?.[0];

  return (
    <div className="learning-details-container">
      {/* Top Breadcrumb Navigation */}
      <div className="learning-breadcrumb-bar">
        <button type="button" className="learning-back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="learning-breadcrumb-text">
          <span>Student Dashboard</span>
          <span>&gt;</span>
          <span>Enrolled Courses</span>
          <span>&gt;</span>
          <span className="crumb-active">{course.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="learning-hero-card">
        <div className="learning-badge-row">
          <span className="learning-code-pill">{course.code}</span>
          <span className="learning-cat-pill">{course.category}</span>
          <span className="learning-level-pill">{course.level}</span>
        </div>

        <h1 className="learning-course-title">{course.title}</h1>
        <p className="learning-course-desc">{course.description}</p>

        <div className="learning-instructor-bar">
          <div className="instructor-avatar-wrap">
            <div className="instructor-avatar-circle">
              {course.instructor.initials || "TX"}
            </div>
            <div>
              <div className="instructor-details-name">{course.instructor.name}</div>
              <div className="instructor-details-role">{course.instructor.role}</div>
            </div>
          </div>

          <div className="learning-meta-stats">
            <div className="meta-stat-item">
              <Calendar size={15} /> <span>{course.duration}</span>
            </div>
            <div className="meta-stat-item">
              <BookOpen size={15} /> <span>{course.lessons}</span>
            </div>
            <div className="meta-stat-item">
              <Layers size={15} /> <span>{progressMetrics.totalModules} Modules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning CTA Action Box */}
      <section className="continue-action-card">
        <div className="continue-card-left">
          <div className="continue-icon-box">
            <Play size={20} fill="#2563eb" />
          </div>
          <div>
            <div className="continue-label-tag">
              {progressMetrics.lastAccessedTopic ? "Resume Last Accessed Topic" : "Next Up In Course"}
            </div>
            <h4 className="continue-topic-heading">
              {activeTopicTarget?.title || "Course Introduction"}
            </h4>
            <div className="continue-module-sub">
              {progressMetrics.currentModule || "Module 1"} • {activeTopicTarget?.duration || "45 mins"}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="continue-big-btn"
          onClick={handleContinueLearning}
        >
          <Play size={16} fill="#ffffff" />
          <span>
            {progressMetrics.lastAccessedTopic ? "Resume Topic" : "Start Next Topic"}
          </span>
        </button>
      </section>

      {/* 6-Metric High-Level Dashboard Grid */}
      <section className="metrics-grid-row">
        {/* Metric 1: Overall Progress */}
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

        {/* Metric 2: Completed Topics */}
        <div className="metric-stat-card">
          <div className="metric-card-top">
            <span className="metric-title-label">Completed Topics</span>
            <CheckCircle2 size={18} color="#10b981" />
          </div>
          <div className="metric-value-huge">{progressMetrics.completedTopics}</div>
          <div className="metric-subtitle-text">Topics mastered</div>
        </div>

        {/* Metric 3: Remaining Topics */}
        <div className="metric-stat-card">
          <div className="metric-card-top">
            <span className="metric-title-label">Remaining Topics</span>
            <Clock size={18} color="#f59e0b" />
          </div>
          <div className="metric-value-huge">{progressMetrics.remainingTopics}</div>
          <div className="metric-subtitle-text">Topics left to finish</div>
        </div>

        {/* Metric 4: Total Modules */}
        <div className="metric-stat-card">
          <div className="metric-card-top">
            <span className="metric-title-label">Total Modules</span>
            <Layers size={18} color="#8b5cf6" />
          </div>
          <div className="metric-value-huge">{progressMetrics.totalModules}</div>
          <div className="metric-subtitle-text">{progressMetrics.totalTopics} total topics</div>
        </div>

        {/* Metric 5: Current Module */}
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

        {/* Metric 6: Remaining Duration */}
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

      {/* Module-Wise Syllabus Section */}
      <section className="syllabus-accordion-section">
        <div className="syllabus-head-controls">
          <div className="syllabus-title-wrap">
            <h3>Module-Wise Learning Syllabus</h3>
            <p>Expand modules to view topics, track status, and launch interactive lessons</p>
          </div>
          <button
            type="button"
            className="accordion-toggle-all-btn"
            onClick={toggleAllModules}
          >
            {isAllOpen ? "Collapse All Modules" : "Expand All Modules"}
          </button>
        </div>

        <div className="syllabus-modules-list">
          {progressMetrics.moduleProgress.map((mod) => {
            const isOpen = Boolean(expandedModules[mod.id]);

            return (
              <div
                key={mod.id}
                className={`module-accordion-card ${isOpen ? "open" : ""}`}
              >
                {/* Expandable Module Header */}
                <div
                  className="module-header-clickable"
                  onClick={() => toggleModule(mod.id)}
                >
                  <div className="module-info-left">
                    {isOpen ? (
                      <ChevronDown size={20} color="#475569" />
                    ) : (
                      <ChevronRight size={20} color="#475569" />
                    )}

                    <span
                      className={`module-indicator-badge ${
                        mod.status === "Completed"
                          ? "completed"
                          : mod.status === "In Progress"
                          ? "in-progress"
                          : ""
                      }`}
                    >
                      {mod.status}
                    </span>

                    <div>
                      <h4 className="module-heading-title">
                        Module {mod.moduleNumber}: {mod.title}
                      </h4>
                      <div className="module-meta-line">
                        <span>⏱ {mod.duration}</span>
                        <span>•</span>
                        <span>📚 {mod.totalTopics} topics</span>
                      </div>
                    </div>
                  </div>

                  <div className="module-progress-right">
                    <div className="mod-progress-summary">
                      <span className="mod-fraction-text">
                        {mod.completedTopics} / {mod.totalTopics} ({mod.progressPercent}%)
                      </span>
                      <div className="mod-progress-track">
                        <div
                          className={`mod-progress-fill ${
                            mod.progressPercent === 100 ? "completed" : ""
                          }`}
                          style={{ width: `${mod.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topics List Body */}
                {isOpen && (
                  <div className="topics-list-body">
                    {mod.topics.map((topic) => {
                      const isCompleted = topic.status === "completed";
                      const isInProgress = topic.status === "in-progress";
                      const isLastAccessed =
                        details.lastAccessedTopicId === topic.id;

                      return (
                        <div
                          key={topic.id}
                          className={`topic-row-item ${
                            isCompleted
                              ? "completed"
                              : isInProgress
                              ? "in-progress"
                              : "not-started"
                          } ${isLastAccessed ? "is-last-accessed" : ""}`}
                        >
                          <div className="topic-left-details">
                            <button
                              type="button"
                              className={`topic-status-icon-btn ${
                                isCompleted
                                  ? "completed"
                                  : isInProgress
                                  ? "in-progress"
                                  : ""
                              }`}
                              onClick={() => handleToggleTopicStatus(topic)}
                              title={`Status: ${topic.status}. Click to cycle status.`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 size={19} />
                              ) : isInProgress ? (
                                <PlayCircle size={19} />
                              ) : (
                                <Circle size={19} />
                              )}
                            </button>

                            <div>
                              <div className="topic-title-text">
                                {topic.topicIndex}. {topic.title}
                                {isLastAccessed && (
                                  <span
                                    style={{
                                      marginLeft: "8px",
                                      fontSize: "0.7rem",
                                      color: "#2563eb",
                                      fontWeight: 600,
                                    }}
                                  >
                                    (Last Accessed)
                                  </span>
                                )}
                              </div>
                              <div className="topic-sub-meta">
                                <span>⏱ {topic.duration}</span>
                                {topic.skills?.map((sk) => (
                                  <span key={sk} className="topic-skill-tag">
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="topic-right-actions">
                            <span
                              className={`topic-status-pill ${
                                isCompleted
                                  ? "completed"
                                  : isInProgress
                                  ? "in-progress"
                                  : "not-started"
                              }`}
                            >
                              {isCompleted
                                ? "Completed ✓"
                                : isInProgress
                                ? "In Progress"
                                : "Not Started"}
                            </span>

                            <button
                              type="button"
                              className="topic-launch-btn"
                              onClick={() => handleLaunchTopic(topic)}
                            >
                              <Play size={13} fill="#0f172a" /> Launch Lesson
                            </button>

                            <button
                              type="button"
                              className="topic-toggle-status-btn"
                              onClick={() => handleToggleTopicStatus(topic)}
                              title="Toggle between Completed, In Progress, and Not Started"
                            >
                              {isCompleted
                                ? "Reset"
                                : isInProgress
                                ? "Mark Done"
                                : "Start"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
