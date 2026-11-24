import { useState } from "react";
import { X, CheckCircle2, Circle, Clock, ChevronDown, ChevronRight, FolderOpen, Folder } from "lucide-react";
import { INITIAL_PROGRAMS } from "../learningsData.js";
import StatusTag from "../../Layout/StatusTag.jsx";

export default function TopicProgressModal({ isOpen, enrollment, onClose, onRefresh, showMessage }) {
  const [completedTopicIds, setCompletedTopicIds] = useState(() => enrollment?.completedTopicIds || []);
  const [collapsedModules, setCollapsedModules] = useState({});

  if (!isOpen || !enrollment) return null;

  const program = INITIAL_PROGRAMS.find((p) => p.id === enrollment.programId) || INITIAL_PROGRAMS[0];
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

  const handleToggleTopic = (topicId) => {
    const nextSet = new Set(completedSet);
    if (nextSet.has(topicId)) {
      nextSet.delete(topicId);
    } else {
      nextSet.add(topicId);
    }
    const nextList = Array.from(nextSet);
    setCompletedTopicIds(nextList);

    const allTopicsCount = (program?.modules || []).reduce((acc, m) => acc + (m.topics?.length || 0), 0) || 1;
    const progressPct = Math.round((nextList.length / allTopicsCount) * 100);

    if (showMessage) showMessage(`Topic completion updated. Progress is now ${progressPct}%.`);
    if (onRefresh) onRefresh();
  };

  const allTopicsCount = (program?.modules || []).reduce((acc, m) => acc + (m.topics?.length || 0), 0);
  const currentProgressPct = allTopicsCount > 0 ? Math.round((completedTopicIds.length / allTopicsCount) * 100) : 0;

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "760px" }} onClick={(e) => e.stopPropagation()}>
        {/* Banner Header */}
        <div className="staff-profile-banner">
          <button className="icon-button modal-close-btn profile-banner-close" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
          <div className="profile-banner-content">
            <div className="profile-banner-info">
              <div className="profile-banner-title-row">
                <h2>{enrollment.learnerName}</h2>
                <StatusTag>{enrollment.status}</StatusTag>
              </div>
              <p className="profile-banner-role-line">
                <span>{enrollment.programTitle}</span>
                <span className="bullet-sep">•</span>
                <span>Batch {enrollment.batch}</span>
                <span className="bullet-sep">•</span>
                <span>{enrollment.department}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Progress summary bar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)", background: "#fafafa" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: 650, color: "var(--ink)" }}>Overall Curriculum Progress</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--blue)" }}>
              {completedTopicIds.length} / {allTopicsCount} Topics ({currentProgressPct}%)
            </span>
          </div>
          <div className="progress-track" style={{ height: "8px" }}>
            <div className="progress-fill" style={{ width: `${currentProgressPct}%`, background: "var(--blue)" }} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="staff-modal-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>Click any topic below to mark complete or in-progress.</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button type="button" className="secondary-action" style={{ height: "26px", fontSize: "11px", padding: "0 8px" }} onClick={expandAll}>
                <FolderOpen size={12} /> Expand
              </button>
              <button type="button" className="secondary-action" style={{ height: "26px", fontSize: "11px", padding: "0 8px" }} onClick={collapseAll}>
                <Folder size={12} /> Collapse
              </button>
            </div>
          </div>

          {(program?.modules || []).map((mod, index) => {
            const isCollapsed = Boolean(collapsedModules[mod.id]);
            const modTopics = mod.topics || [];
            const modCompleted = modTopics.filter((t) => completedSet.has(t.id)).length;
            const isAllDone = modTopics.length > 0 && modCompleted === modTopics.length;

            return (
              <div className="curriculum-module-box" key={mod.id}>
                <div
                  className="curriculum-module-header"
                  style={{ cursor: "pointer", background: isAllDone ? "#f0fdf4" : undefined }}
                  onClick={() => toggleModule(mod.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                    <button
                      type="button"
                      className="icon-button"
                      style={{ width: "22px", height: "22px" }}
                      aria-label="Toggle module"
                    >
                      {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "12.5px", fontWeight: 700, color: "var(--ink)" }}>
                        Module {index + 1}: {mod.title}
                      </h3>
                      <span style={{ fontSize: "10.5px", color: isAllDone ? "#166534" : "var(--muted)" }}>
                        {modCompleted} of {modTopics.length} topics completed
                      </span>
                    </div>
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="curriculum-topic-list">
                    {modTopics.map((topic) => {
                      const isDone = completedSet.has(topic.id);
                      return (
                        <div
                          key={topic.id}
                          className="curriculum-topic-row"
                          style={{ cursor: "pointer", background: isDone ? "#f8fafc" : "#ffffff" }}
                          onClick={() => handleToggleTopic(topic.id)}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {isDone ? (
                              <CheckCircle2 size={16} color="#16a34a" />
                            ) : (
                              <Circle size={16} color="#94a3b8" />
                            )}
                            <span style={{ fontSize: "12px", color: isDone ? "var(--ink)" : "var(--muted)", textDecoration: isDone ? "line-through" : "none" }}>
                              {topic.title}
                            </span>
                          </div>
                          <span style={{ fontSize: "11px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <Clock size={11} /> {topic.durationMinutes}m
                          </span>
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
          <button type="button" className="secondary-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
