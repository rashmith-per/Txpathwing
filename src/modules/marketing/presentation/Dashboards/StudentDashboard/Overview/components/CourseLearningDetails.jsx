import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { studentApi } from "../../services/studentApi";
import { LearningHeroCard } from "./learningDetails/LearningHeroCard";
import { LearningMetricsGrid } from "./learningDetails/LearningMetricsGrid";
import { LearningSyllabusAccordion } from "./learningDetails/LearningSyllabusAccordion";
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

      if (data.course?.modules) {
        const initialExpanded = {};
        data.course.modules.forEach((m, idx) => {
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

      <LearningHeroCard course={course} progressMetrics={progressMetrics} />

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

      <LearningMetricsGrid progressMetrics={progressMetrics} />

      <LearningSyllabusAccordion
        progressMetrics={progressMetrics}
        expandedModules={expandedModules}
        toggleModule={toggleModule}
        toggleAllModules={toggleAllModules}
        isAllOpen={isAllOpen}
        lastAccessedTopicId={details.lastAccessedTopicId}
        handleToggleTopicStatus={handleToggleTopicStatus}
        handleLaunchTopic={handleLaunchTopic}
      />
    </div>
  );
}
