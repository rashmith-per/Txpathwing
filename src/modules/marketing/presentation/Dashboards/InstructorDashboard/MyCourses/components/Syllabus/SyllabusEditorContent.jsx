import { useState } from "react";
import {
  Layers,
  FolderPlus,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  X
} from "lucide-react";
import { ActionButton, IconButton } from "../../../common/ActionButton.jsx";
import { useSyllabus } from "../../hooks/useSyllabus.js";
import { SyllabusModuleCard } from "./SyllabusModuleCard.jsx";
import { SyllabusDialogContainer } from "./SyllabusDialogContainer.jsx";
import "../../styles/syllabus.css";

export function SyllabusEditorContent({ course, onSyllabusChange }) {
  const {
    modules,
    loading,
    isSubmitting,
    error,
    successNotice,
    clearNotice,
    moduleFormState,
    openAddModule,
    openEditModule,
    closeModuleModal,
    saveModuleForm,
    deletingModule,
    openDeleteModule,
    closeDeleteModule,
    confirmDeleteModule,
    reorderModule,
    editingTopic,
    openEditTopic,
    closeEditTopic,
    saveTopic,
    addingToModule,
    openAddTopic,
    closeAddTopic,
    deletingTopic,
    openDeleteTopic,
    closeDeleteTopic,
    confirmDeleteTopic,
    reorderTopic
  } = useSyllabus(course, { onSyllabusChange });

  const [collapsedModuleIds, setCollapsedModuleIds] = useState({});

  const totalTopicsCount = modules.reduce(
    (sum, mod) => sum + (Array.isArray(mod.topics) ? mod.topics.length : 0),
    0
  );

  const getModuleKey = (mod, idx) => mod.id || `mod-idx-${idx}`;

  const allModulesCollapsed =
    modules.length > 0 &&
    modules.every((mod, idx) => Boolean(collapsedModuleIds[getModuleKey(mod, idx)]));

  const toggleModuleExpand = (modKey) => {
    setCollapsedModuleIds((prev) => ({
      ...prev,
      [modKey]: !prev[modKey]
    }));
  };

  const toggleExpandAll = () => {
    if (allModulesCollapsed) {
      setCollapsedModuleIds({});
      return;
    }
    const next = {};
    modules.forEach((mod, idx) => {
      next[getModuleKey(mod, idx)] = true;
    });
    setCollapsedModuleIds(next);
  };

  return (
    <>
      {successNotice && (
        <div className="inst-syllabus-alert success" role="status">
          <CheckCircle2 size={16} />
          <span>{successNotice}</span>
          <IconButton
            icon={X}
            size="xs"
            variant="ghost"
            className="inst-alert-dismiss"
            onClick={clearNotice}
            tooltip="Dismiss notice"
            ariaLabel="Dismiss notice"
          />
        </div>
      )}

      {error && (
        <div className="inst-syllabus-alert danger" role="alert">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="inst-syllabus-modules-list">
        <div className="inst-syllabus-section-bar">
          <h3 className="inst-syllabus-section-lbl">
            <Layers size={16} /> Course Syllabus ({modules.length} Modules · {totalTopicsCount}{" "}
            Topics)
          </h3>

          <div className="inst-syllabus-section-actions">
            {modules.length > 1 && (
              <ActionButton
                icon={allModulesCollapsed ? ChevronDown : ChevronUp}
                variant="secondary"
                size="sm"
                onClick={toggleExpandAll}
                tooltip={allModulesCollapsed ? "Expand all modules" : "Collapse all modules"}
              >
                {allModulesCollapsed ? "Expand All" : "Collapse All"}
              </ActionButton>
            )}

            <ActionButton
              icon={FolderPlus}
              variant="primary"
              size="sm"
              onClick={openAddModule}
              disabled={isSubmitting}
              tooltip="Add a new module to syllabus"
            >
              Add Module
            </ActionButton>
          </div>
        </div>

        {loading ? (
          <div className="inst-syllabus-loading">
            <div className="inst-loading-spinner" />
            <p>Loading course syllabus...</p>
          </div>
        ) : modules.length === 0 ? (
          <div className="inst-syllabus-empty">
            <BookOpen size={36} className="text-muted" />
            <h4>No modules found</h4>
            <p>This course does not have any syllabus modules yet.</p>
            <ActionButton
              icon={FolderPlus}
              variant="primary"
              size="md"
              onClick={openAddModule}
            >
              Add First Module
            </ActionButton>
          </div>
        ) : (
          modules.map((mod, idx) => (
            <SyllabusModuleCard
              key={getModuleKey(mod, idx)}
              mod={mod}
              idx={idx}
              modKey={getModuleKey(mod, idx)}
              isExpanded={!collapsedModuleIds[getModuleKey(mod, idx)]}
              isFirstMod={idx === 0}
              isLastMod={idx === modules.length - 1}
              isSubmitting={isSubmitting}
              toggleModuleExpand={toggleModuleExpand}
              openAddTopic={openAddTopic}
              reorderModule={reorderModule}
              openEditModule={openEditModule}
              openDeleteModule={openDeleteModule}
              openEditTopic={openEditTopic}
              openDeleteTopic={openDeleteTopic}
              reorderTopic={reorderTopic}
            />
          ))
        )}
      </div>

      <SyllabusDialogContainer
        moduleFormState={moduleFormState}
        modulesCount={modules.length}
        closeModuleModal={closeModuleModal}
        saveModuleForm={saveModuleForm}
        deletingModule={deletingModule}
        closeDeleteModule={closeDeleteModule}
        confirmDeleteModule={confirmDeleteModule}
        editingTopic={editingTopic}
        closeEditTopic={closeEditTopic}
        saveEditTopic={(topicData) => saveTopic(editingTopic?.module, topicData, editingTopic?.topic)}
        addingToModule={addingToModule}
        closeAddTopic={closeAddTopic}
        saveAddTopic={(topicData) => saveTopic(addingToModule, topicData, null)}
        deletingTopic={deletingTopic}
        closeDeleteTopic={closeDeleteTopic}
        confirmDeleteTopic={confirmDeleteTopic}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export default SyllabusEditorContent;
