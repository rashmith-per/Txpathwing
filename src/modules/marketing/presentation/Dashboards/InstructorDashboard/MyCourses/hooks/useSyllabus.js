import { useState, useEffect, useCallback, useRef } from "react";
import { syllabusService } from "../services/syllabusService.js";
import { validateModuleInput } from "../validation/topicValidation.js";
import { useSyllabusDialogs } from "./useSyllabusDialogs.js";
import { useSyllabusOperations } from "./useSyllabusOperations.js";

export function useSyllabus(course, options = {}) {
  const { onSyllabusChange } = options;

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successNotice, setSuccessNotice] = useState(null);

  const dialogs = useSyllabusDialogs(setError);
  const {
    moduleFormState,
    openAddModule,
    openEditModule,
    closeModuleModal,
    deletingModule,
    openDeleteModule,
    closeDeleteModule,
    editingTopic,
    openEditTopic,
    closeEditTopic,
    addingToModule,
    openAddTopic,
    closeAddTopic,
    deletingTopic,
    openDeleteTopic,
    closeDeleteTopic
  } = dialogs;

  const noticeTimeoutRef = useRef(null);
  const onSyllabusChangeRef = useRef(onSyllabusChange);

  useEffect(() => {
    onSyllabusChangeRef.current = onSyllabusChange;
  }, [onSyllabusChange]);

  const clearNotice = useCallback(() => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setSuccessNotice(null);
  }, []);

  const triggerSuccess = useCallback((message) => {
    clearNotice();
    setSuccessNotice(message);
    setError(null);
    noticeTimeoutRef.current = setTimeout(() => setSuccessNotice(null), 3500);
  }, [clearNotice]);

  const courseId = course?.id;

  const applyModulesUpdate = useCallback(
    (updatedModules, successMessage) => {
      setModules(updatedModules);
      if (typeof onSyllabusChangeRef.current === "function" && courseId) {
        onSyllabusChangeRef.current(courseId, updatedModules);
      }
      if (successMessage) triggerSuccess(successMessage);
    },
    [courseId, triggerSuccess]
  );

  const loadSyllabus = useCallback(async () => {
    if (!course || !course.id) {
      setModules([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await syllabusService.getCourseSyllabus(course);
      setModules(data);
    } catch (err) {
      console.error("[useSyllabus] Error loading syllabus:", err);
      setError("Failed to load course syllabus. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [course]);

  useEffect(() => {
    let active = true;
    if (!course || !course.id) return undefined;

    syllabusService
      .getCourseSyllabus(course)
      .then((data) => {
        if (!active) return;
        setModules(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error("[useSyllabus] Error loading syllabus:", err);
        setError("Failed to load course syllabus. Please try again.");
        setLoading(false);
      });

    return () => {
      active = false;
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, [course]);

  useEffect(() => {
    const handleUpdate = (event) => {
      if (
        course &&
        event.detail &&
        event.detail.courseId === course.id &&
        Array.isArray(event.detail.modules)
      ) {
        setModules(event.detail.modules);
      }
    };

    window.addEventListener("tx_syllabus_updated", handleUpdate);
    return () => window.removeEventListener("tx_syllabus_updated", handleUpdate);
  }, [course]);

  const saveModuleForm = useCallback(
    async (formData) => {
      if (!moduleFormState || !course) return;

      const validation = validateModuleInput({
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        order: formData.order,
        maxOrder: modules.length
      });

      if (!validation.isValid) throw validation.errors;

      try {
        setIsSubmitting(true);
        setError(null);
        let updatedModules;
        if (moduleFormState.mode === "edit" && moduleFormState.module) {
          updatedModules = await syllabusService.updateModule(
            course.id,
            moduleFormState.module.id,
            formData
          );
          closeModuleModal();
          applyModulesUpdate(updatedModules, `Module "${formData.title}" updated successfully.`);
        } else {
          updatedModules = await syllabusService.addModule(course.id, formData);
          closeModuleModal();
          applyModulesUpdate(updatedModules, `Module "${formData.title}" added to syllabus.`);
        }
      } catch (err) {
        console.error("[useSyllabus] Error saving module:", err);
        setError(err.message || "Failed to save module changes.");
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [moduleFormState, course, modules.length, closeModuleModal, applyModulesUpdate]
  );

  const confirmDeleteModule = useCallback(async () => {
    if (!deletingModule || !course) return;
    const target = deletingModule;
    try {
      setIsSubmitting(true);
      setError(null);
      const updatedModules = await syllabusService.deleteModule(course.id, target.id);
      closeDeleteModule();
      applyModulesUpdate(updatedModules, `Module "${target.title}" was deleted.`);
    } catch (err) {
      console.error("[useSyllabus] Error deleting module:", err);
      setError(err.message || "Failed to delete module.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [deletingModule, course, closeDeleteModule, applyModulesUpdate]);

  const reorderModule = useCallback(
    async (mod, direction) => {
      if (!course || !mod || isSubmitting) return;
      try {
        setIsSubmitting(true);
        setError(null);
        const updatedModules = await syllabusService.reorderModule(course.id, mod.id, direction);
        applyModulesUpdate(updatedModules, `Moved Module ${mod.num} ${direction}.`);
      } catch (err) {
        console.error("[useSyllabus] Error reordering module:", err);
        setError(err.message || "Failed to reorder module.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [course, isSubmitting, applyModulesUpdate]
  );

  const { saveTopic, confirmDeleteTopic, reorderTopic } = useSyllabusOperations({
    course,
    isSubmitting,
    setIsSubmitting,
    setError,
    applyModulesUpdate,
    dialogs
  });

  const resetToDefaults = useCallback(async () => {
    if (!course || !course.id) return;
    try {
      setIsSubmitting(true);
      setError(null);
      const defaults = await syllabusService.resetCourseSyllabus(course);
      applyModulesUpdate(defaults, "Syllabus reset to default template.");
    } catch (err) {
      console.error("[useSyllabus] Error resetting syllabus:", err);
      setError(err.message || "Failed to reset syllabus.");
    } finally {
      setIsSubmitting(false);
    }
  }, [course, applyModulesUpdate]);

  return {
    modules,
    loading,
    isSubmitting,
    error,
    successNotice,
    clearError: () => setError(null),
    clearNotice,
    refreshSyllabus: loadSyllabus,
    resetToDefaults,
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
    addingToModule,
    openAddTopic,
    closeAddTopic,
    saveTopic,
    deletingTopic,
    openDeleteTopic,
    closeDeleteTopic,
    confirmDeleteTopic,
    reorderTopic
  };
}
