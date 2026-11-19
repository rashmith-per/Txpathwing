import { useCallback } from "react";
import { curriculumDraftService } from "../services/curriculumDraftService.js";
import { courseService } from "../../MyCourses/services/courseService.js";
import { syllabusService } from "../../MyCourses/services/syllabusService.js";
import { validateCourseInput } from "../../MyCourses/validation/courseValidation.js";

export function useCurriculumLifecycle({
  generatedSyllabus,
  committedSyllabus,
  instructorId,
  instructorProfile,
  isEmbedded,
  hasEnrolledImpact,
  editingCourse,
  learners,
  batches,
  form = {},
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
  onCloseBuilder,
  onNavigate
}) {
  const isEditingExisting = Boolean(editingCourse);
  const {
    topic,
    code,
    category,
    level,
    targetAudience,
    price,
    totalHours,
    description,
    status,
    builderMode
  } = form;

  const handleSaveDraftChanges = useCallback(() => {
    if (!generatedSyllabus) return;
    const synced = curriculumDraftService.updateCourseMetadata(generatedSyllabus, {
      title: topic,
      code,
      category,
      level,
      targetAudience,
      price,
      totalHours,
      description,
      status
    });
    const saved = curriculumDraftService.commitDraftChanges(synced, instructorId);
    setGeneratedSyllabus(saved);
    setCommittedSyllabus(saved);
    setHasUnsavedChanges(false);
    showSuccess("All course & curriculum changes saved to local draft.");
  }, [
    generatedSyllabus,
    topic,
    code,
    category,
    level,
    targetAudience,
    price,
    totalHours,
    description,
    status,
    instructorId,
    setGeneratedSyllabus,
    setCommittedSyllabus,
    setHasUnsavedChanges,
    showSuccess
  ]);

  const handleCancelDraftChanges = useCallback(() => {
    if (!committedSyllabus) return;
    const restored = isEditingExisting
      ? JSON.parse(JSON.stringify(committedSyllabus))
      : curriculumDraftService.revertWorkingDraft(committedSyllabus, instructorId);
    setGeneratedSyllabus(restored);
    setHasUnsavedChanges(false);
    showSuccess("Reverted unsaved modifications back to last saved curriculum.");
  }, [committedSyllabus, isEditingExisting, instructorId, setGeneratedSyllabus, setHasUnsavedChanges, showSuccess]);

  const confirmDeleteOrDiscardCourse = useCallback(
    async ({ forceArchive = false } = {}) => {
      if (isSubmitting) return;
      try {
        setIsSubmitting(true);
        if (isEditingExisting && editingCourse) {
          if (typeof onDeleteCourse === "function") {
            await onDeleteCourse(editingCourse.id, { forceArchive });
          } else {
            await courseService.deleteOrArchiveCourse(editingCourse.id, {
              forceArchive,
              learners,
              batches,
              instructorIdentity: instructorProfile || instructorId
            });
          }
          if (modals?.closeDeleteCourseModal) modals.closeDeleteCourseModal();
          if (typeof onCloseBuilder === "function") {
            onCloseBuilder();
          }
        } else {
          curriculumDraftService.clearDraft(instructorId);
          setGeneratedSyllabus(null);
          setCommittedSyllabus(null);
          setHasUnsavedChanges(false);
          if (modals?.closeDeleteCourseModal) modals.closeDeleteCourseModal();
          showSuccess("Cleared current draft curriculum.");
        }
      } catch (err) {
        showError?.(err?.message || "Unable to complete course removal.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting,
      setIsSubmitting,
      isEditingExisting,
      editingCourse,
      onDeleteCourse,
      learners,
      batches,
      instructorProfile,
      instructorId,
      modals,
      onCloseBuilder,
      setGeneratedSyllabus,
      setCommittedSyllabus,
      setHasUnsavedChanges,
      showSuccess,
      showError
    ]
  );

  const handlePublishCourse = useCallback(async () => {
    if (isSubmitting) return;

    const mergedMetadata = {
      title: topic,
      code,
      category,
      level,
      targetAudience,
      description,
      status,
      price: Number(price),
      totalHours: Number(totalHours)
    };

    const validation = validateCourseInput(mergedMetadata);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0] || "Please fix course form errors.";
      showError?.(firstError);
      return;
    }

    if (!generatedSyllabus || !Array.isArray(generatedSyllabus.modules)) {
      showError?.("Please generate or initialize at least one module before saving.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditingExisting && editingCourse) {
        const savedModules = await syllabusService.saveCourseSyllabus(
          editingCourse.id,
          generatedSyllabus.modules
        );
        const { course } = await courseService.updateCourse(
          editingCourse.id,
          {
            ...mergedMetadata,
            modulesCount: savedModules.length,
            topicsCount: savedModules.reduce(
              (sum, m) => sum + (Array.isArray(m.topics) ? m.topics.length : 0),
              0
            ),
            modules: savedModules
          },
          instructorProfile || instructorId
        );

        if (typeof onSaveCourse === "function") {
          await onSaveCourse(course, { isUpdate: true });
        }
        setCommittedSyllabus({ ...generatedSyllabus, ...mergedMetadata, modules: savedModules });
        setHasUnsavedChanges(false);
        showSuccess(`Course "${course.title}" and syllabus saved successfully.`);
        if (typeof onCloseBuilder === "function") {
          onCloseBuilder(`Course "${course.title}" updated successfully.`);
        }
      } else {
        const mergedSyllabus = {
          ...generatedSyllabus,
          ...mergedMetadata,
          generationMode: builderMode === "manual" ? "manual" : "ai"
        };
        const newCourse = await curriculumDraftService.publishCourseCurriculum(
          mergedSyllabus,
          instructorProfile || instructorId
        );

        if (typeof onSaveCourse === "function") {
          await onSaveCourse(newCourse, { isUpdate: false });
        }

        setGeneratedSyllabus(null);
        setCommittedSyllabus(null);
        setHasUnsavedChanges(false);
        if (typeof onCloseBuilder === "function") {
          onCloseBuilder(`Course "${newCourse.title}" created and added to My Courses.`);
        } else if (typeof onNavigate === "function") {
          showSuccess("Course curriculum published with your edits to My Courses!");
          onNavigate("My Courses");
        }
      }
    } catch (err) {
      showError?.(err.message || "Failed to save course curriculum.");
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    setIsSubmitting,
    topic,
    code,
    category,
    level,
    targetAudience,
    description,
    status,
    price,
    totalHours,
    generatedSyllabus,
    isEditingExisting,
    editingCourse,
    builderMode,
    instructorProfile,
    instructorId,
    onSaveCourse,
    onCloseBuilder,
    onNavigate,
    setCommittedSyllabus,
    setGeneratedSyllabus,
    setHasUnsavedChanges,
    showSuccess,
    showError
  ]);

  return {
    handleSaveDraftChanges,
    handleCancelDraftChanges,
    confirmDeleteOrDiscardCourse,
    handlePublishCourse
  };
}
