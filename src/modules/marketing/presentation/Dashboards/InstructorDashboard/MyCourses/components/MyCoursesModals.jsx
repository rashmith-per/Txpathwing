import React from "react";
import { ViewCourseModal } from "./CourseManagement/ViewCourseModal.jsx";
import { SyllabusModal } from "./Syllabus/SyllabusModal.jsx";
import { EditCourseModal } from "./CourseManagement/EditCourseModal.jsx";
import { DeleteCourseConfirmation } from "./CourseManagement/DeleteCourseConfirmation.jsx";

export function MyCoursesModals({
  viewingCourse,
  setViewingCourseId,
  selectedSyllabusCourse,
  setSelectedSyllabusCourseId,
  editingCourse,
  setEditingCourse,
  deleteTarget,
  setDeleteTarget,
  handleRequestDeleteOrArchive,
  handleRestoreCourseClick,
  handleTogglePublishCourse,
  handleOpenStudioForCourse,
  handleSaveCourseMetadata,
  handleConfirmDeleteOrArchive,
  onSyncSyllabus,
  isSubmitting,
}) {
  return (
    <>
      {viewingCourse && (
        <ViewCourseModal
          course={viewingCourse}
          onClose={() => setViewingCourseId(null)}
          onEditCourse={(c) => setEditingCourse(c)}
          onDeleteOrArchive={(c) => handleRequestDeleteOrArchive(c)}
          onRestoreCourse={(c) => handleRestoreCourseClick(c)}
          onTogglePublish={(c) => handleTogglePublishCourse(c)}
          onOpenStudio={(c) => handleOpenStudioForCourse(c)}
          onSyllabusChange={onSyncSyllabus}
          isSubmitting={isSubmitting}
        />
      )}

      {selectedSyllabusCourse && (
        <SyllabusModal
          course={selectedSyllabusCourse}
          onClose={() => setSelectedSyllabusCourseId(null)}
          onSyllabusChange={onSyncSyllabus}
          onOpenStudio={(c) => handleOpenStudioForCourse(c)}
        />
      )}

      <EditCourseModal
        isOpen={Boolean(editingCourse)}
        course={editingCourse}
        onClose={() => setEditingCourse(null)}
        onSave={handleSaveCourseMetadata}
        isSubmitting={isSubmitting}
      />

      <DeleteCourseConfirmation
        isOpen={Boolean(deleteTarget?.course)}
        course={deleteTarget?.course}
        impact={deleteTarget?.impact}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDeleteOrArchive}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
