import React from "react";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Clock
} from "lucide-react";
import { ActionButton, IconButton } from "../../../common/ActionButton.jsx";
import { SyllabusTopic } from "./SyllabusTopic.jsx";

export function SyllabusModuleCard({
  mod,
  idx,
  modKey,
  isExpanded,
  isFirstMod,
  isLastMod,
  isSubmitting,
  toggleModuleExpand,
  openAddTopic,
  reorderModule,
  openEditModule,
  openDeleteModule,
  openEditTopic,
  openDeleteTopic,
  reorderTopic
}) {
  const topicsList = Array.isArray(mod.topics) ? mod.topics : [];

  return (
    <div className={`inst-syllabus-module-card ${!isExpanded ? "is-collapsed" : ""}`}>
      <div className="inst-module-header">
        <div className="inst-module-meta-wrap">
          <span className="inst-module-badge">Module {mod.num || idx + 1}</span>
          <strong className="inst-module-title">{mod.title}</strong>
          <span className="inst-module-hours">
            <Clock size={12} /> {mod.duration || "8 hours"}
          </span>
          <span className="inst-module-topic-pill">
            {topicsList.length} {topicsList.length === 1 ? "Topic" : "Topics"}
          </span>
        </div>

        <div className="inst-module-controls">
          <ActionButton
            icon={PlusCircle}
            variant="outline-blue"
            size="sm"
            onClick={() => openAddTopic(mod)}
            disabled={isSubmitting}
            tooltip={`Add a new topic to Module ${mod.num || idx + 1}`}
          >
            Add Topic
          </ActionButton>

          <IconButton
            icon={ArrowUp}
            size="xs"
            variant="neutral"
            onClick={() => reorderModule(mod, "up")}
            disabled={isFirstMod || isSubmitting}
            tooltip="Move module up"
            ariaLabel={`Move Module ${mod.num || idx + 1} up`}
          />

          <IconButton
            icon={ArrowDown}
            size="xs"
            variant="neutral"
            onClick={() => reorderModule(mod, "down")}
            disabled={isLastMod || isSubmitting}
            tooltip="Move module down"
            ariaLabel={`Move Module ${mod.num || idx + 1} down`}
          />

          <IconButton
            icon={Pencil}
            size="sm"
            variant="edit"
            onClick={() => openEditModule(mod)}
            disabled={isSubmitting}
            tooltip={`Edit Module ${mod.num || idx + 1}`}
            ariaLabel={`Edit Module ${mod.title}`}
          />

          <IconButton
            icon={Trash2}
            size="sm"
            variant="delete"
            onClick={() => openDeleteModule(mod)}
            disabled={isSubmitting}
            tooltip={`Delete Module ${mod.num || idx + 1}`}
            ariaLabel={`Delete Module ${mod.title}`}
          />

          <IconButton
            icon={isExpanded ? ChevronUp : ChevronDown}
            size="sm"
            variant="neutral"
            onClick={() => toggleModuleExpand(modKey)}
            aria-expanded={isExpanded}
            tooltip={isExpanded ? "Collapse module" : "Expand module"}
            ariaLabel={`${isExpanded ? "Collapse" : "Expand"} Module ${mod.title}`}
          />
        </div>
      </div>

      {isExpanded && (
        <>
          {mod.description && (
            <p className="inst-module-description">{mod.description}</p>
          )}

          {topicsList.length > 0 ? (
            <div className="inst-module-topics-list">
              {topicsList.map((top, topIdx) => (
                <SyllabusTopic
                  key={top.id}
                  topic={top}
                  module={mod}
                  isFirst={topIdx === 0}
                  isLast={topIdx === topicsList.length - 1}
                  isSubmitting={isSubmitting}
                  onEdit={openEditTopic}
                  onDelete={openDeleteTopic}
                  onReorder={reorderTopic}
                />
              ))}
            </div>
          ) : (
            <div className="inst-module-topics-empty">
              <p>No topics in this module yet.</p>
              <ActionButton
                icon={PlusCircle}
                variant="outline-blue"
                size="sm"
                onClick={() => openAddTopic(mod)}
              >
                Add First Topic
              </ActionButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}
