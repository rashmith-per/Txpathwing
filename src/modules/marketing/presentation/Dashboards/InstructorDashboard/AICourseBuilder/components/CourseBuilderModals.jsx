import React from "react";
import {
  EditTopicModal,
  AddTopicModal,
  DeleteConfirmation,
  ModuleFormModal,
  DeleteModuleConfirmation
} from "../../MyCourses/components/Syllabus/index.js";
import {
  EditCourseModal,
  DeleteCourseConfirmation
} from "../../MyCourses/components/CourseManagement/index.js";

export function CourseBuilderModals({
  activeCourseObj,
  generatedSyllabus,
  isSubmitting,
  // Course Modals
  isEditCourseOpen,
  closeEditCourseModal,
  saveCourseMetadata,
  deleteCourseModalState,
  closeDeleteCourseModal,
  confirmDeleteOrDiscardCourse,
  // Module Modals
  moduleFormState,
  closeModuleModal,
  saveModuleForm,
  deletingModule,
  closeDeleteModule,
  confirmDeleteModule,
  // Topic Modals
  editingTopic,
  closeEditTopic,
  saveEditTopic,
  addingToModule,
  closeAddTopic,
  saveAddTopic,
  deletingTopic,
  closeDeleteTopic,
  confirmDeleteTopic
}) {
  return (
    <>
      {/* Edit Course Metadata Modal */}
      <EditCourseModal
        isOpen={isEditCourseOpen}
        course={activeCourseObj}
        onClose={closeEditCourseModal}
        onSave={saveCourseMetadata}
        isSubmitting={isSubmitting}
      />

      {/* Delete / Archive Course or Discard Draft Confirmation */}
      <DeleteCourseConfirmation
        isOpen={Boolean(deleteCourseModalState?.isOpen)}
        course={activeCourseObj}
        impact={deleteCourseModalState?.impact}
        onClose={closeDeleteCourseModal}
        onConfirm={confirmDeleteOrDiscardCourse}
        isSubmitting={isSubmitting}
      />

      {/* Add / Edit Module Modal */}
      <ModuleFormModal
        isOpen={Boolean(moduleFormState)}
        mode={moduleFormState?.mode || "add"}
        module={moduleFormState?.module || null}
        modulesCount={generatedSyllabus?.modules?.length || 0}
        onClose={closeModuleModal}
        onSave={saveModuleForm}
        isSubmitting={isSubmitting}
      />

      {/* Delete Module Confirmation */}
      <DeleteModuleConfirmation
        isOpen={Boolean(deletingModule)}
        module={deletingModule}
        onClose={closeDeleteModule}
        onConfirm={confirmDeleteModule}
        isSubmitting={isSubmitting}
      />

      {/* Topic Management Dialogs */}
      <EditTopicModal
        isOpen={Boolean(editingTopic)}
        module={editingTopic?.module}
        topic={editingTopic?.topic}
        onClose={closeEditTopic}
        onSave={saveEditTopic}
        isSubmitting={isSubmitting}
      />

      <AddTopicModal
        isOpen={Boolean(addingToModule)}
        module={addingToModule}
        onClose={closeAddTopic}
        onAdd={saveAddTopic}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmation
        isOpen={Boolean(deletingTopic)}
        module={deletingTopic?.module}
        topic={deletingTopic?.topic}
        onClose={closeDeleteTopic}
        onConfirm={confirmDeleteTopic}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
