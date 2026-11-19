import { useState, useCallback, useRef, useEffect } from "react";
import { curriculumDraftService } from "../services/curriculumDraftService.js";
import { courseService } from "../../MyCourses/services/courseService.js";
import { useCurriculumBuilderModals } from "./useCurriculumBuilderModals.js";
import { useCurriculumCrudOperations } from "./useCurriculumCrudOperations.js";
import { useCurriculumLifecycle } from "./useCurriculumLifecycle.js";
import { useCurriculumForm } from "./useCurriculumForm.js";

export function useCurriculumBuilder({
  initialTopic = "",
  initialMode = "ai",
  editingCourse = null,
  learners = [],
  batches = [],
  instructorProfile = null,
  embedded = false,
  onSaveCourse,
  onDeleteCourse,
  onCloseBuilder
}) {
  const isEmbedded = Boolean(embedded);
  const instructorId = instructorProfile?.id || "inst-ramana-1";

  const [initialDraft] = useState(() =>
    !editingCourse ? curriculumDraftService.loadDraftState(instructorId) : null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedSyllabus, setGeneratedSyllabus] = useState(() => {
    if (editingCourse) return curriculumDraftService.createManualCourseBlueprint(editingCourse);
    return initialDraft?.working || null;
  });

  const [committedSyllabus, setCommittedSyllabus] = useState(() => {
    if (editingCourse) return curriculumDraftService.createManualCourseBlueprint(editingCourse);
    return initialDraft?.committed || null;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(() =>
    !editingCourse ? Boolean(initialDraft?.isDirty) : false
  );

  const [feedback, setFeedback] = useState(null);
  const feedbackTimeoutRef = useRef(null);

  const clearFeedback = useCallback(() => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(null);
  }, []);

  const showSuccess = useCallback((message) => {
    clearFeedback();
    setFeedback({ type: "success", message });
    feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 4500);
  }, [clearFeedback]);

  const showError = useCallback((message) => {
    clearFeedback();
    setFeedback({ type: "error", message });
    feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 6000);
  }, [clearFeedback]);

  const form = useCurriculumForm({
    editingCourse,
    initialDraft,
    initialMode,
    instructorId,
    generatedSyllabus,
    committedSyllabus,
    setGeneratedSyllabus,
    setCommittedSyllabus,
    setHasUnsavedChanges,
    showSuccess,
    showError,
    clearFeedback
  });

  const modals = useCurriculumBuilderModals();
  const crudOps = useCurriculumCrudOperations({
    generatedSyllabus,
    stageWorkingUpdate: form.stageWorkingUpdate,
    showSuccess,
    modals
  });

  const enrollmentImpact = courseService.checkCourseEnrollmentImpact(
    editingCourse || generatedSyllabus,
    { learners, batches }
  );
  const hasEnrolledImpact = Boolean(enrollmentImpact.requiresArchive);

  const lifecycle = useCurriculumLifecycle({
    generatedSyllabus,
    committedSyllabus,
    instructorId,
    instructorProfile,
    isEmbedded,
    hasEnrolledImpact,
    editingCourse,
    learners,
    batches,
    form,
    isSubmitting,
    setIsSubmitting,
    setCommittedSyllabus,
    setGeneratedSyllabus,
    setHasUnsavedChanges,
    showSuccess,
    showError,
    modals,
    onSaveCourse,
    onDeleteCourse,
    onCloseBuilder
  });

  return {
    builderMode: form.builderMode,
    switchBuilderMode: form.switchBuilderMode,
    topic: form.topic,
    setTopic: form.setTopic,
    code: form.code,
    setCode: form.setCode,
    codeTouched: form.codeTouched,
    level: form.level,
    setLevel: form.setLevel,
    category: form.category,
    setCategory: form.setCategory,
    targetAudience: form.targetAudience,
    setTargetAudience: form.setTargetAudience,
    status: form.status,
    setStatus: form.setStatus,
    price: form.price,
    setPrice: form.setPrice,
    totalHours: form.totalHours,
    setTotalHours: form.setTotalHours,
    description: form.description,
    setDescription: form.setDescription,
    fieldErrors: form.fieldErrors,
    isGenerating: form.isGenerating,
    isSubmitting,
    generatedSyllabus,
    committedSyllabus,
    hasUnsavedChanges,
    feedback,
    clearFeedback,
    handleGenerate: form.handleGenerate,
    handleInitializeManual: form.handleInitializeManual,
    handleSaveDraftChanges: lifecycle.handleSaveDraftChanges,
    handleCancelDraftChanges: lifecycle.handleCancelDraftChanges,
    handlePublishCourse: lifecycle.handlePublishCourse,
    openDeleteOrDiscardCourse: modals.openDeleteOrDiscardCourse,
    closeDeleteCourseModal: modals.closeDeleteCourseModal,
    confirmDeleteOrDiscardCourse: lifecycle.confirmDeleteOrDiscardCourse,
    deleteCourseConfirmOpen: modals.deleteCourseConfirmOpen,
    unsavedLeaveModalOpen: modals.unsavedLeaveModalOpen,
    setUnsavedLeaveModalOpen: modals.setUnsavedLeaveModalOpen,
    enrollmentImpact,
    editingCourseModalOpen: modals.editingCourseModalOpen,
    openEditCourseModal: modals.openEditCourseModal,
    closeEditCourseModal: modals.closeEditCourseModal,
    saveCourseMetadata: crudOps.saveCourseMetadata,
    moduleFormState: modals.moduleFormState,
    openAddModule: modals.openAddModule,
    openEditModule: modals.openEditModule,
    closeModuleModal: modals.closeModuleModal,
    saveModuleForm: crudOps.saveModuleForm,
    deletingModule: modals.deletingModule,
    openDeleteModule: modals.openDeleteModule,
    closeDeleteModule: modals.closeDeleteModule,
    confirmDeleteModule: crudOps.confirmDeleteModule,
    handleReorderModule: crudOps.handleReorderModule,
    topicFormState: modals.topicFormState,
    openEditTopic: modals.openEditTopic,
    closeEditTopic: modals.closeEditTopic,
    openAddTopic: modals.openAddTopic,
    closeAddTopic: modals.closeAddTopic,
    saveEditTopic: crudOps.saveEditTopic,
    saveAddTopic: crudOps.saveAddTopic,
    deletingTopic: modals.deletingTopic,
    openDeleteTopic: modals.openDeleteTopic,
    closeDeleteTopic: modals.closeDeleteTopic,
    confirmDeleteTopic: crudOps.confirmDeleteTopic,
    handleReorderTopic: crudOps.handleReorderTopic
  };
}
