import React from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  Play
} from "lucide-react";

export function LearningSyllabusAccordion({
  progressMetrics,
  expandedModules,
  toggleModule,
  toggleAllModules,
  isAllOpen,
  lastAccessedTopicId,
  handleToggleTopicStatus,
  handleLaunchTopic
}) {
  return (
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

              {isOpen && (
                <div className="topics-list-body">
                  {mod.topics.map((topic) => {
                    const isCompleted = topic.status === "completed";
                    const isInProgress = topic.status === "in-progress";
                    const isLastAccessed = lastAccessedTopicId === topic.id;

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
  );
}
