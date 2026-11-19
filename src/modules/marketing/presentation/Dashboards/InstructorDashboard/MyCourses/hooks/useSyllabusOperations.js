import { useCallback } from "react";
import { syllabusService } from "../services/syllabusService.js";
import { validateTopicInput } from "../validation/topicValidation.js";

export function useSyllabusOperations({
  course,
  isSubmitting,
  setIsSubmitting,
  setError,
  applyModulesUpdate,
  dialogs
}) {
  const { closeEditTopic, closeAddTopic, deletingTopic, closeDeleteTopic } = dialogs;

  const saveTopic = useCallback(
    async (targetModule, topicData, existingTopic = null) => {
      if (!course || !targetModule) return;

      const validation = validateTopicInput({
        title: topicData.title,
        duration: topicData.duration,
        description: topicData.description
      });
      if (!validation.isValid) throw validation.errors;

      try {
        setIsSubmitting(true);
        setError(null);
        let updatedModules;
        if (existingTopic) {
          updatedModules = await syllabusService.updateTopic(
            course.id,
            targetModule.id,
            existingTopic.id,
            topicData
          );
          closeEditTopic();
          applyModulesUpdate(updatedModules, `Topic "${topicData.title}" updated.`);
        } else {
          updatedModules = await syllabusService.addTopic(course.id, targetModule.id, topicData);
          closeAddTopic();
          applyModulesUpdate(updatedModules, `Topic "${topicData.title}" added.`);
        }
      } catch (err) {
        console.error("[useSyllabus] Error saving topic:", err);
        setError(err.message || "Failed to save topic.");
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [course, closeEditTopic, closeAddTopic, applyModulesUpdate, setIsSubmitting, setError]
  );

  const confirmDeleteTopic = useCallback(async () => {
    if (!deletingTopic || !course) return;
    const { module: mod, topic } = deletingTopic;
    try {
      setIsSubmitting(true);
      setError(null);
      const updatedModules = await syllabusService.deleteTopic(course.id, mod.id, topic.id);
      closeDeleteTopic();
      applyModulesUpdate(updatedModules, `Topic "${topic.title}" removed.`);
    } catch (err) {
      console.error("[useSyllabus] Error deleting topic:", err);
      setError(err.message || "Failed to delete topic.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [deletingTopic, course, closeDeleteTopic, applyModulesUpdate, setIsSubmitting, setError]);

  const reorderTopic = useCallback(
    async (mod, topic, direction) => {
      if (!course || !mod || !topic || isSubmitting) return;
      try {
        setIsSubmitting(true);
        setError(null);
        const updatedModules = await syllabusService.reorderTopic(course.id, mod.id, topic.id, direction);
        applyModulesUpdate(updatedModules, `Reordered topic.`);
      } catch (err) {
        console.error("[useSyllabus] Error reordering topic:", err);
        setError(err.message || "Failed to reorder topic.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [course, isSubmitting, applyModulesUpdate, setIsSubmitting, setError]
  );

  return { saveTopic, confirmDeleteTopic, reorderTopic };
}
