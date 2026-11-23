import { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FolderOpen,
  Folder
} from "lucide-react";
import { TOPIC_TYPES } from "../backend/models/LearningProgramModel.js";
import { learningApi } from "../services/learningApi.js";

export default function ProgramDetailsModal({ isOpen, program, onClose, onRefresh, showMessage }) {
  // Adding module form state
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

  // Adding topic form state (target moduleId)
  const [addingTopicForModule, setAddingTopicForModule] = useState(null);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicType, setTopicType] = useState("Video");
  const [topicDuration, setTopicDuration] = useState("45");

  // Editing state
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editModuleTitle, setEditModuleTitle] = useState("");

  // Collapsible accordion state: { [moduleId]: boolean }
  const [collapsedModules, setCollapsedModules] = useState({});

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !program) return null;

  const modules = program.modules || [];

  const toggleModule = (modId) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const collapseAll = () => {
    const all = {};
    modules.forEach((m) => {
      all[m.id] = true;
    });
    setCollapsedModules(all);
  };

  const expandAll = () => {
    setCollapsedModules({});
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    try {
      setIsSaving(true);
      setError("");
      await learningApi.addModule(program.id, {
        title: moduleTitle,
        description: moduleDesc
      });
      setModuleTitle("");
      setModuleDesc("");
      setIsAddingModule(false);
      showMessage("Module added to curriculum.");
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message || "Failed to add module");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateModule = async (moduleId) => {
    if (!editModuleTitle.trim()) return;
    try {
      setIsSaving(true);
      await learningApi.updateModule(program.id, moduleId, { title: editModuleTitle });
      setEditingModuleId(null);
      showMessage("Module updated.");
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message || "Failed to update module");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm("Are you sure you want to delete this module and all its topics?")) return;
    try {
      setIsSaving(true);
      await learningApi.deleteModule(program.id, moduleId);
      showMessage("Module deleted.");
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message || "Failed to delete module");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTopic = async (moduleId) => {
    if (!topicTitle.trim()) return;
    try {
      setIsSaving(true);
      setError("");
      await learningApi.addTopic(program.id, moduleId, {
        title: topicTitle,
        type: topicType,
        durationMinutes: topicDuration
      });
      setTopicTitle("");
      setAddingTopicForModule(null);
      // Ensure module is expanded so new topic is visible
      setCollapsedModules((prev) => ({ ...prev, [moduleId]: false }));
      showMessage("Topic added to module.");
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message || "Failed to add topic");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTopic = async (moduleId, topicId) => {
    try {
      setIsSaving(true);
      await learningApi.deleteTopic(program.id, moduleId, topicId);
      showMessage("Topic removed.");
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message || "Failed to delete topic");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorderTopic = async (moduleId, topicId, direction) => {
    try {
      setIsSaving(true);
      await learningApi.reorderTopic(program.id, moduleId, topicId, direction);
      showMessage(`Topic moved ${direction}.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message || "Failed to reorder topic");
    } finally {
      setIsSaving(false);
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "Video": return "type-video";
      case "Lab": return "type-lab";
      case "Quiz": return "type-quiz";
      default: return "type-reading";
    }
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "820px" }} onClick={(e) => e.stopPropagation()}>
        {/* Banner Header */}
        <div className="staff-profile-banner">
          <button className="icon-button modal-close-btn profile-banner-close" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
          <div className="profile-banner-content">
            <div className="profile-banner-info">
              <div className="profile-banner-title-row">
                <h2>{program.name || program.title}</h2>
                <span className="course-code-badge">{program.code}</span>
              </div>
              <p className="profile-banner-role-line">
                <span>{program.category}</span>
                <span className="bullet-sep">•</span>
                <span>{program.department}</span>
                <span className="bullet-sep">•</span>
                <span>{program.duration}</span>
                <span className="bullet-sep">•</span>
                <span>Lead: {program.instructor}</span>
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="staff-error-banner" style={{ margin: "14px 20px 0" }}>
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Modal Body: Curriculum Management */}
        <div className="staff-modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>Curriculum & Learning Modules</h3>
              <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--muted)" }}>
                {modules.length} modules · {modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0)} total topics
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {modules.length > 0 && (
                <>
                  <button
                    type="button"
                    className="secondary-action"
                    style={{ height: "30px", fontSize: "11px", padding: "0 9px" }}
                    onClick={expandAll}
                    title="Expand all modules"
                  >
                    <FolderOpen size={13} /> Expand All
                  </button>
                  <button
                    type="button"
                    className="secondary-action"
                    style={{ height: "30px", fontSize: "11px", padding: "0 9px" }}
                    onClick={collapseAll}
                    title="Collapse all modules"
                  >
                    <Folder size={13} /> Collapse All
                  </button>
                </>
              )}
              {!isAddingModule && (
                <button
                  type="button"
                  className="primary-action"
                  style={{ height: "30px", fontSize: "11px", padding: "0 12px" }}
                  onClick={() => setIsAddingModule(true)}
                >
                  <Plus size={14} /> Add Module
                </button>
              )}
            </div>
          </div>

          {/* Add Module Inline Form */}
          {isAddingModule && (
            <form onSubmit={handleAddModule} style={{ padding: "14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid var(--line)", marginBottom: "16px" }}>
              <div style={{ fontWeight: 650, fontSize: "12px", marginBottom: "10px", color: "var(--ink)" }}>
                Add New Module
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Module Title (e.g. Frontend Architecture)"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Module Description (optional)"
                  value={moduleDesc}
                  onChange={(e) => setModuleDesc(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button type="button" className="secondary-action" onClick={() => setIsAddingModule(false)}>Cancel</button>
                <button type="submit" className="primary-action" disabled={isSaving}>Save Module</button>
              </div>
            </form>
          )}

          {/* List of Modules (Collapsible Accordions) */}
          {modules.map((mod, index) => {
            const isCollapsed = Boolean(collapsedModules[mod.id]);
            const topicCount = mod.topics?.length || 0;

            return (
              <div className="curriculum-module-box" key={mod.id}>
                <div className="curriculum-module-header" style={{ cursor: "pointer" }} onClick={() => toggleModule(mod.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                    <button
                      type="button"
                      className="icon-button"
                      style={{ width: "24px", height: "24px", minWidth: "24px" }}
                      aria-label={isCollapsed ? "Expand module" : "Collapse module"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModule(mod.id);
                      }}
                    >
                      {isCollapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
                    </button>

                    <div className="module-title-area" style={{ flex: 1, minWidth: 0 }}>
                      {editingModuleId === mod.id ? (
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editModuleTitle}
                            onChange={(e) => setEditModuleTitle(e.target.value)}
                            style={{ height: "28px", fontSize: "12px", minWidth: "220px" }}
                          />
                          <button type="button" className="primary-action" style={{ padding: "0 8px", height: "28px" }} onClick={() => handleUpdateModule(mod.id)}>
                            <CheckCircle2 size={13} />
                          </button>
                          <button type="button" className="secondary-action" style={{ padding: "0 8px", height: "28px" }} onClick={() => setEditingModuleId(null)}>
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <h3 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                            Module {index + 1}: {mod.title}
                          </h3>
                          <span style={{ fontSize: "10.5px", padding: "1px 7px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--muted)" }}>
                            {topicCount} {topicCount === 1 ? "topic" : "topics"}
                          </span>
                          {mod.description && (
                            <p style={{ width: "100%", margin: "2px 0 0", fontSize: "11px", color: "var(--muted)" }}>
                              {mod.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }} onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="learner-action-btn"
                      title="Add Topic"
                      onClick={() => {
                        if (isCollapsed) toggleModule(mod.id);
                        setAddingTopicForModule(addingTopicForModule === mod.id ? null : mod.id);
                      }}
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      type="button"
                      className="learner-action-btn"
                      title="Edit Module"
                      onClick={() => {
                        setEditingModuleId(mod.id);
                        setEditModuleTitle(mod.title);
                      }}
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      type="button"
                      className="learner-action-btn btn-delete"
                      title="Delete Module"
                      onClick={() => handleDeleteModule(mod.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Collapsible Content */}
                {!isCollapsed && (
                  <>
                    {/* Add Topic Inline Form */}
                    {addingTopicForModule === mod.id && (
                      <div style={{ padding: "10px 16px", background: "#f1f5f9", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: 650, fontSize: "11px", marginBottom: "6px" }}>Add Topic to Module {index + 1}</div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                          <input
                            type="text"
                            placeholder="Topic Title (e.g. React Hooks)"
                            value={topicTitle}
                            onChange={(e) => setTopicTitle(e.target.value)}
                            style={{ flex: "1 1 200px", height: "30px", fontSize: "11px" }}
                          />
                          <select
                            value={topicType}
                            onChange={(e) => setTopicType(e.target.value)}
                            style={{ height: "30px", fontSize: "11px" }}
                          >
                            {TOPIC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <input
                            type="number"
                            placeholder="Mins"
                            value={topicDuration}
                            onChange={(e) => setTopicDuration(e.target.value)}
                            style={{ width: "60px", height: "30px", fontSize: "11px" }}
                          />
                          <button type="button" className="primary-action" style={{ height: "30px" }} onClick={() => handleAddTopic(mod.id)}>
                            Add Topic
                          </button>
                          <button type="button" className="secondary-action" style={{ height: "30px" }} onClick={() => setAddingTopicForModule(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Topic List */}
                    <div className="curriculum-topic-list">
                      {(!mod.topics || mod.topics.length === 0) && (
                        <p style={{ margin: "6px 0", fontSize: "11px", color: "var(--muted)", fontStyle: "italic" }}>
                          No topics added yet. Click + above to add learning topics.
                        </p>
                      )}
                      {mod.topics?.map((topic, tIndex) => (
                        <div className="curriculum-topic-row" key={topic.id}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "11px", color: "var(--muted)", width: "16px", textAlign: "right" }}>{tIndex + 1}.</span>
                            <strong style={{ fontSize: "12px", color: "var(--ink)" }}>{topic.title}</strong>
                          </div>
                          <div className="topic-meta-strip">
                            <span className={`topic-type-tag ${getTypeClass(topic.type)}`}>{topic.type}</span>
                            <span style={{ fontSize: "11px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <Clock size={11} /> {topic.durationMinutes}m
                            </span>

                            {/* Reordering topic arrows */}
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                              <button
                                type="button"
                                className="learner-action-btn"
                                style={{ width: "22px", height: "22px", padding: 0 }}
                                title="Move Topic Up"
                                disabled={tIndex === 0 || isSaving}
                                onClick={() => handleReorderTopic(mod.id, topic.id, "up")}
                              >
                                <ChevronUp size={12} />
                              </button>
                              <button
                                type="button"
                                className="learner-action-btn"
                                style={{ width: "22px", height: "22px", padding: 0 }}
                                title="Move Topic Down"
                                disabled={tIndex === mod.topics.length - 1 || isSaving}
                                onClick={() => handleReorderTopic(mod.id, topic.id, "down")}
                              >
                                <ChevronDown size={12} />
                              </button>
                            </div>

                            <button
                              type="button"
                              className="learner-action-btn btn-delete"
                              style={{ width: "22px", height: "22px" }}
                              title="Delete Topic"
                              disabled={isSaving}
                              onClick={() => handleDeleteTopic(mod.id, topic.id)}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {modules.length === 0 && !isAddingModule && (
            <div style={{ textAlign: "center", padding: "32px", color: "var(--muted)" }}>
              <Layers size={28} style={{ margin: "0 auto 8px", opacity: 0.5 }} />
              <p>No modules created for this program yet.</p>
              <button type="button" className="primary-action" onClick={() => setIsAddingModule(true)}>
                Add First Module
              </button>
            </div>
          )}
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
