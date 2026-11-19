import { normalizeTopicRecord } from "./topicOperations.js";

export function addTopicToModules(modules, moduleId, topicData) {
  if (!moduleId) {
    throw new Error("Module ID is required.");
  }
  if (!topicData || !topicData.title || !topicData.title.trim()) {
    throw new Error("Topic title is required and cannot be empty.");
  }

  const nextModules = cloneModules(modules);
  const targetModule = nextModules.find((m) => m.id === moduleId);
  if (!targetModule) {
    throw new Error(`Module ${moduleId} not found in course syllabus.`);
  }

  const uniqueSuffix = Math.random().toString(36).slice(2, 6);
  const newTopic = {
    id: `top-${moduleId}-${Date.now()}-${uniqueSuffix}`,
    title: topicData.title.trim(),
    description: topicData.description ? topicData.description.trim() : "",
    duration:
      topicData.duration && topicData.duration.trim()
        ? topicData.duration.trim()
        : "45 mins",
    order: targetModule.topics.length + 1
  };

  const requestedOrder = Number(topicData.order);
  const insertIdx =
    Number.isInteger(requestedOrder) && requestedOrder >= 1
      ? Math.max(0, Math.min(targetModule.topics.length, requestedOrder - 1))
      : targetModule.topics.length;

  targetModule.topics.splice(insertIdx, 0, newTopic);
  renumberTopics(targetModule.topics);

  return nextModules;
}

/**
 * Update an existing topic inside a module cleanly.
 */
export function updateTopicInModules(modules, moduleId, topicId, updatedFields) {
  if (!moduleId || !topicId) {
    throw new Error("Module ID and Topic ID are required.");
  }
  if (updatedFields?.title !== undefined && !updatedFields.title.trim()) {
    throw new Error("Topic title cannot be empty.");
  }

  const nextModules = cloneModules(modules);
  const targetModule = nextModules.find((m) => m.id === moduleId);
  if (!targetModule) {
    throw new Error(`Module ${moduleId} not found.`);
  }

  const currentIdx = targetModule.topics.findIndex((t) => t.id === topicId);
  if (currentIdx === -1) {
    throw new Error(`Topic ${topicId} not found in module.`);
  }

  const targetTopic = { ...targetModule.topics[currentIdx] };

  if (updatedFields.title !== undefined) {
    targetTopic.title = updatedFields.title.trim();
  }
  if (updatedFields.description !== undefined) {
    targetTopic.description = updatedFields.description.trim();
  }
  if (updatedFields.duration !== undefined) {
    targetTopic.duration = updatedFields.duration.trim() || "45 mins";
  }

  if (updatedFields.order !== undefined) {
    const requestedOrder = Number(updatedFields.order);
    if (Number.isInteger(requestedOrder) && requestedOrder >= 1) {
      targetModule.topics.splice(currentIdx, 1);
      const insertIdx = Math.max(
        0,
        Math.min(targetModule.topics.length, requestedOrder - 1)
      );
      targetModule.topics.splice(insertIdx, 0, targetTopic);
    } else {
      targetModule.topics[currentIdx] = targetTopic;
    }
  } else {
    targetModule.topics[currentIdx] = targetTopic;
  }

  renumberTopics(targetModule.topics);

  return nextModules;
}

/**
 * Delete an existing topic from a module and re-index order positions.
 */
export function deleteTopicFromModules(modules, moduleId, topicId) {
  if (!moduleId || !topicId) {
    throw new Error("Module ID and Topic ID are required.");
  }

  const nextModules = cloneModules(modules);
  const targetModule = nextModules.find((m) => m.id === moduleId);
  if (!targetModule) {
    throw new Error(`Module ${moduleId} not found.`);
  }

  const initialCount = targetModule.topics.length;
  targetModule.topics = targetModule.topics.filter((t) => t.id !== topicId);

  if (targetModule.topics.length === initialCount) {
    throw new Error(`Topic ${topicId} was not found to delete.`);
  }

  renumberTopics(targetModule.topics);

  return nextModules;
}

/**
 * Reorder a topic one slot "up" or "down" within its parent module.
 */
export function reorderTopicInModules(modules, moduleId, topicId, direction) {
  if (!moduleId || !topicId) {
    throw new Error("Module ID and Topic ID are required.");
  }
  if (direction !== "up" && direction !== "down") {
    throw new Error("Reorder direction must be 'up' or 'down'.");
  }

  const nextModules = cloneModules(modules);
  const targetModule = nextModules.find((m) => m.id === moduleId);
  if (!targetModule) {
    throw new Error(`Module ${moduleId} not found.`);
  }

  const currentIdx = targetModule.topics.findIndex((t) => t.id === topicId);
  if (currentIdx === -1) {
    throw new Error(`Topic ${topicId} not found in module.`);
  }

  const targetIdx = direction === "up" ? currentIdx - 1 : currentIdx + 1;
  if (targetIdx < 0 || targetIdx >= targetModule.topics.length) {
    return nextModules;
  }

  const [moved] = targetModule.topics.splice(currentIdx, 1);
  targetModule.topics.splice(targetIdx, 0, moved);
  renumberTopics(targetModule.topics);

  return nextModules;
}

