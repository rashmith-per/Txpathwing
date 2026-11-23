import { useState, useEffect } from "react";
import { X, CheckCircle2, Circle, Clock, Check, ChevronDown, ChevronRight, FolderOpen, Folder } from "lucide-react";
import { learningApi } from "../services/learningApi.js";
import StatusTag from "../../Layout/StatusTag.jsx";

export default function TopicProgressModal({ isOpen, enrollment, onClose, onRefresh, showMessage }) {
  const [program, setProgram] = useState(null);
  const [completedTopicIds, setCompletedTopicIds] = useState(() => enrollment?.completedTopicIds || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [collapsedModules, setCollapsedModules] = useState({});

  useEffect(() => {
    let isCurrent = true;
    if (enrollment?.programId) {
      learningApi.getProgramById(enrollment.programId).then((prog) => {
        if (isCurrent) setProgram(prog);
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [enrollment?.programId]);

  if (!isOpen || !enrollment) return null;

  const completedSet = new Set(completedTopicIds);

  const toggleModule = (modId) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const collapseAll = () => {
    const all = {};
    program?.modules?.forEach((m) => {
      all[m.id] = true;
    });
    setCollapsedModules(all);
  };

  const expandAll = () => {
    setCollapsedModules({});
  };

  const handleToggleTopic = async (topicId) => {
    try {
      setIsUpdating(true);
      const res = await learningApi.toggleTopicCompletion(enrollment.id, topicId);
      setCompletedTopicIds(res.enrollment.completedTopicIds || []);
      showMessage(`Topic completion updated. Progress is now ${res.computed.progressPercentage}%.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showMessage(`Error updating progress: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const totalTopics = program?.modules?.reduce((acc, m) => acc + (m.topics?.length || 0), 0) || 0;
  const completedCount = completedTopicIds.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "720px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-profile-banner">
          <button className="icon-button modal-close-btn profile-banner-close" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
          <div className="profile-banner-content">
            <div className="profile-banner-info">
              <div className="profile-banner-title-row">
                <h2>{enrollment.learnerName}</h2>
                <StatusTag>{progressPercent === 100 ? "Completed" : progressPercent > 0 ? "In Progress" : "Enrolled"}</StatusTag>
              </div>
              <p className="profile-banner-role-line">
                <span className="profile-banner-id">{enrollment.learnerId}</span>
                <span className="bullet-sep">•</span>
                <span>{enrollment.programTitle}</span>
                <span className="bullet-sep">•</span>
                <span>Batch {enrollment.batch}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="staff-modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
          {/* Progress summary banner */}
          <div style={{ marginBottom: "16px", padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--ink)" }}>
                Curriculum Progress ({completedCount} of {totalTopics} topics completed)
              </span>
              <strong style={{ fontSize: "16px", color: "var(--blue)", fontVariantNumeric: "tabular-nums" }}>{progressPercent}%</strong>
            </div>
            <div className="progress-track" style={{ height: "8px" }}>
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <small style={{ color: "var(--muted)", display: "block", marginTop: "8px", fontSize: "11px" }}>
              Click any topic below to mark it completed or pending. Progress updates mathematically across all reports and badges.
            </small>
          </div>

          {/* Module controls toolbar */}
          {program?.modules && program.modules.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)" }}>
                Modules ({program.modules.length})
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="secondary-action"
                  style={{ height: "26px", fontSize: "11px", padding: "0 8px" }}
                  onClick={expandAll}
                >
                  <FolderOpen size={12} /> Expand All
                </button>
                <button
                  type="button"
                  className="secondary-action"
                  style={{ height: "26px", fontSize: "11px", padding: "0 8px" }}
                  onClick={collapseAll}
                >
                  <Folder size={12} /> Collapse All
                </button>
              </div>
            </div>
          )}

          {/* Module & Topics Checklist */}
          {program?.modules?.map((mod, mIndex) => {
            const modTopics = mod.topics || [];
            const modCompleted = modTopics.filter((t) => completedSet.has(t.id)).length;
            const isModComplete = modTopics.length > 0 && modCompleted === modTopics.length;
            const isCollapsed = Boolean(collapsedModules[mod.id]);

            return (
              <div className="curriculum-module-box" key={mod.id}>
                <div
                  className="curriculum-module-header"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleModule(mod.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                    <button
                      type="button"
                      className="icon-button"
                      style={{ width: "22px", height: "22px", minWidth: "22px" }}
                      aria-label={isCollapsed ? "Expand module" : "Collapse module"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModule(mod.id);
                      }}
                    >
                      {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <div className="module-title-area">
                      <h3 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                        Module {mIndex + 1}: {mod.title}
                      </h3>
                      <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--muted)" }}>
                        {modCompleted} of {modTopics.length} topics completed
                      </p>
                    </div>
                  </div>

                  <div>
                    {isModComplete ? (
                      <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <CheckCircle2 size={14} /> Module Completed
                      </span>
                    ) : (
                      <span style={{ fontSize: "11px", color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                        {modTopics.length > 0 ? `${Math.round((modCompleted / modTopics.length) * 100)}%` : "0%"}
                      </span>
                    )}
                  </div>
                </div>

                {!isCollapsed && (
                  <div style={{ padding: "8px 12px" }}>
                    {modTopics.length === 0 && (
                      <p style={{ margin: "6px 0", fontSize: "11px", color: "var(--muted)", fontStyle: "italic" }}>
                        No topics in this module.
                      </p>
                    )}
                    {modTopics.map((topic) => {
                      const isDone = completedSet.has(topic.id);
                      return (
                        <div
                          key={topic.id}
                          className={`topic-check-item ${isDone ? "done" : ""}`}
                          onClick={() => !isUpdating && handleToggleTopic(topic.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {isDone ? (
                              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#16a34a", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Check size={13} />
                              </span>
                            ) : (
                              <Circle size={18} color="#94a3b8" />
                            )}
                            <strong style={{ fontSize: "12px", color: isDone ? "#166534" : "var(--ink)", textDecoration: isDone ? "line-through" : "none" }}>
                              {topic.title}
                            </strong>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span className={`topic-type-tag type-${(topic.type || "reading").toLowerCase()}`}>{topic.type}</span>
                            <span style={{ fontSize: "11px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <Clock size={11} /> {topic.durationMinutes}m
                            </span>
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

        <div className="staff-modal-footer">
          <button type="button" className="primary-action" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
