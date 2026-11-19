import { useState, useCallback } from "react";

export function useCurriculumBuilderModals() {
  const [editingCourseModalOpen, setEditingCourseModalOpen] = useState(false);
  const [moduleFormState, setModuleFormState] = useState(null);
  const [deletingModule, setDeletingModule] = useState(null);
  const [topicFormState, setTopicFormState] = useState(null);
  const [deletingTopic, setDeletingTopic] = useState(null);
  const [deleteCourseConfirmOpen, setDeleteCourseConfirmOpen] = useState(false);
  const [unsavedLeaveModalOpen, setUnsavedLeaveModalOpen] = useState(false);

  const openEditCourseModal = useCallback(() => setEditingCourseModalOpen(true), []);
  const closeEditCourseModal = useCallback(() => setEditingCourseModalOpen(false), []);

  const openAddModule = useCallback(() => setModuleFormState({ mode: "add", module: null }), []);
  const openEditModule = useCallback((mod) => setModuleFormState({ mode: "edit", module: mod }), []);
  const closeModuleModal = useCallback(() => setModuleFormState(null), []);

  const openDeleteModule = useCallback((mod) => setDeletingModule(mod), []);
  const closeDeleteModule = useCallback(() => setDeletingModule(null), []);

  const openEditTopic = useCallback((mod, top) => setTopicFormState({ mode: "edit", module: mod, topic: top }), []);
  const closeEditTopic = useCallback(() => setTopicFormState(null), []);

  const openAddTopic = useCallback((mod) => setTopicFormState({ mode: "add", module: mod, topic: null }), []);
  const closeAddTopic = useCallback(() => setTopicFormState(null), []);

  const openDeleteTopic = useCallback((mod, top) => setDeletingTopic({ module: mod, topic: top }), []);
  const closeDeleteTopic = useCallback(() => setDeletingTopic(null), []);

  const openDeleteOrDiscardCourse = useCallback(() => setDeleteCourseConfirmOpen(true), []);
  const closeDeleteCourseModal = useCallback(() => setDeleteCourseConfirmOpen(false), []);

  return {
    editingCourseModalOpen,
    openEditCourseModal,
    closeEditCourseModal,
    moduleFormState,
    openAddModule,
    openEditModule,
    closeModuleModal,
    deletingModule,
    openDeleteModule,
    closeDeleteModule,
    topicFormState,
    openEditTopic,
    closeEditTopic,
    openAddTopic,
    closeAddTopic,
    deletingTopic,
    openDeleteTopic,
    closeDeleteTopic,
    deleteCourseConfirmOpen,
    openDeleteOrDiscardCourse,
    closeDeleteCourseModal,
    unsavedLeaveModalOpen,
    setUnsavedLeaveModalOpen
  };
}
