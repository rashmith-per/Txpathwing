import { useState, useCallback } from "react";

export function useSyllabusDialogs(setError) {
  const [moduleFormState, setModuleFormState] = useState(null);
  const [deletingModule, setDeletingModule] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [addingToModule, setAddingToModule] = useState(null);
  const [deletingTopic, setDeletingTopic] = useState(null);

  const openAddModule = useCallback(() => {
    if (setError) setError(null);
    setModuleFormState({ mode: "add", module: null });
  }, [setError]);

  const openEditModule = useCallback((mod) => {
    if (setError) setError(null);
    setModuleFormState({ mode: "edit", module: mod });
  }, [setError]);

  const closeModuleModal = useCallback(() => {
    setModuleFormState(null);
    if (setError) setError(null);
  }, [setError]);

  const openDeleteModule = useCallback((mod) => {
    if (setError) setError(null);
    setDeletingModule(mod);
  }, [setError]);

  const closeDeleteModule = useCallback(() => {
    setDeletingModule(null);
    if (setError) setError(null);
  }, [setError]);

  const openEditTopic = useCallback((module, topic) => {
    if (setError) setError(null);
    setEditingTopic({ module, topic });
  }, [setError]);

  const closeEditTopic = useCallback(() => {
    setEditingTopic(null);
    if (setError) setError(null);
  }, [setError]);

  const openAddTopic = useCallback((module) => {
    if (setError) setError(null);
    setAddingToModule(module);
  }, [setError]);

  const closeAddTopic = useCallback(() => {
    setAddingToModule(null);
    if (setError) setError(null);
  }, [setError]);

  const openDeleteTopic = useCallback((module, topic) => {
    if (setError) setError(null);
    setDeletingTopic({ module, topic });
  }, [setError]);

  const closeDeleteTopic = useCallback(() => {
    setDeletingTopic(null);
    if (setError) setError(null);
  }, [setError]);

  return {
    moduleFormState,
    setModuleFormState,
    openAddModule,
    openEditModule,
    closeModuleModal,
    deletingModule,
    setDeletingModule,
    openDeleteModule,
    closeDeleteModule,
    editingTopic,
    setEditingTopic,
    openEditTopic,
    closeEditTopic,
    addingToModule,
    setAddingToModule,
    openAddTopic,
    closeAddTopic,
    deletingTopic,
    setDeletingTopic,
    openDeleteTopic,
    closeDeleteTopic,
  };
}
