import { useCallback } from "react";
import { curriculumDraftService } from "../services/curriculumDraftService.js";
import { validateModuleInput, validateTopicInput } from "../../MyCourses/validation/topicValidation.js";

export function useCurriculumCrudOperations({
  generatedSyllabus,
  stageWorkingUpdate,
  showSuccess,
  modals
}) {
  const {
    closeEditCourseModal,
    moduleFormState,
    closeModuleModal,
    deletingModule,
    closeDeleteModule,
    closeEditTopic,
    closeAddTopic,
    deletingTopic,
    closeDeleteTopic
  } = modals;

  const saveCourseMetadata = useCallback(
    (updatedFields) => {
      if (!generatedSyllabus) return;
      const updated = curriculumDraftService.updateCourseMetadata(
        generatedSyllabus,
        updatedFields
      );
      stageWorkingUpdate(updated);
      closeEditCourseModal();
      showSuccess(`Updated course metadata for "${updatedFields.title || updated.title}".`);
    },
    [generatedSyllabus, stageWorkingUpdate, closeEditCourseModal, showSuccess]
  );

  const saveModuleForm = useCallback(
    (formData) => {
      if (!moduleFormState || !generatedSyllabus) return;
      const validation = validateModuleInput({
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        order: formData.order,
        maxOrder: (generatedSyllabus.modules || []).length
      });
      if (!validation.isValid) throw validation.errors;

      let updated;
      if (moduleFormState.mode === "edit" && moduleFormState.module) {
        updated = curriculumDraftService.updateModuleInSyllabus(
          generatedSyllabus,
          moduleFormState.module.id,
          formData
        );
        closeModuleModal();
        stageWorkingUpdate(updated);
        showSuccess(`Module "${formData.title}" updated.`);
      } else {
        updated = curriculumDraftService.addModuleToSyllabus(generatedSyllabus, formData);
        closeModuleModal();
        stageWorkingUpdate(updated);
        showSuccess(`Module "${formData.title}" added to blueprint.`);
      }
    },
    [moduleFormState, generatedSyllabus, closeModuleModal, stageWorkingUpdate, showSuccess]
  );

  const confirmDeleteModule = useCallback(async () => {
    if (!deletingModule || !generatedSyllabus) return;
    const target = deletingModule;
    const updated = curriculumDraftService.deleteModuleFromSyllabus(
      generatedSyllabus,
      target.id
    );
    closeDeleteModule();
    stageWorkingUpdate(updated);
    showSuccess(`Module "${target.title}" was removed.`);
  }, [deletingModule, generatedSyllabus, closeDeleteModule, stageWorkingUpdate, showSuccess]);

  const handleReorderModule = useCallback(
    (mod, direction) => {
      if (!generatedSyllabus || !mod) return;
      const updated = curriculumDraftService.reorderModuleInSyllabus(
        generatedSyllabus,
        mod.id,
        direction
      );
      stageWorkingUpdate(updated);
      showSuccess(`Moved Module ${mod.num || ""} ${direction}.`);
    },
    [generatedSyllabus, stageWorkingUpdate, showSuccess]
  );

  const saveEditTopic = useCallback(
    (topicData) => {
      if (!modals.topicFormState?.module || !modals.topicFormState?.topic || !generatedSyllabus) return;
      const validation = validateTopicInput(topicData);
      if (!validation.isValid) throw validation.errors;

      const updated = curriculumDraftService.updateTopicInSyllabus(
        generatedSyllabus,
        modals.topicFormState.module.id,
        modals.topicFormState.topic.id,
        topicData
      );
      closeEditTopic();
      stageWorkingUpdate(updated);
      showSuccess(`Topic "${topicData.title}" updated.`);
    },
    [modals.topicFormState, generatedSyllabus, closeEditTopic, stageWorkingUpdate, showSuccess]
  );

  const saveAddTopic = useCallback(
    (topicData) => {
      if (!modals.topicFormState?.module || !generatedSyllabus) return;
      const validation = validateTopicInput(topicData);
      if (!validation.isValid) throw validation.errors;

      const updated = curriculumDraftService.addTopicToSyllabus(
        generatedSyllabus,
        modals.topicFormState.module.id,
        topicData
      );
      closeAddTopic();
      stageWorkingUpdate(updated);
      showSuccess(`Topic "${topicData.title}" added.`);
    },
    [modals.topicFormState, generatedSyllabus, closeAddTopic, stageWorkingUpdate, showSuccess]
  );

  const confirmDeleteTopic = useCallback(async () => {
    if (!deletingTopic || !generatedSyllabus) return;
    const { module: mod, topic: top } = deletingTopic;
    const updated = curriculumDraftService.deleteTopicFromSyllabus(
      generatedSyllabus,
      mod.id,
      top.id
    );
    closeDeleteTopic();
    stageWorkingUpdate(updated);
    showSuccess(`Topic "${top.title}" removed.`);
  }, [deletingTopic, generatedSyllabus, closeDeleteTopic, stageWorkingUpdate, showSuccess]);

  const handleReorderTopic = useCallback(
    (mod, top, direction) => {
      if (!generatedSyllabus || !mod || !top) return;
      const updated = curriculumDraftService.reorderTopicInSyllabus(
        generatedSyllabus,
        mod.id,
        top.id,
        direction
      );
      stageWorkingUpdate(updated);
      showSuccess(`Reordered topic.`);
    },
    [generatedSyllabus, stageWorkingUpdate, showSuccess]
  );

  return {
    saveCourseMetadata,
    saveModuleForm,
    confirmDeleteModule,
    handleReorderModule,
    saveEditTopic,
    saveAddTopic,
    confirmDeleteTopic,
    handleReorderTopic
  };
}
