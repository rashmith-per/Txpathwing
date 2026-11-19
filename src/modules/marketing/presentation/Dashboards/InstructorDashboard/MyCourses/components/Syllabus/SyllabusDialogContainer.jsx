import React from "react";
import { ModuleFormModal } from "./ModuleFormModal.jsx";
import { DeleteModuleConfirmation } from "./DeleteModuleConfirmation.jsx";
import { EditTopicModal } from "./EditTopicModal.jsx";
import { AddTopicModal } from "./AddTopicModal.jsx";
import { DeleteConfirmation } from "./DeleteConfirmation.jsx";

export function SyllabusDialogContainer({
  moduleFormState,
  modulesCount,
  closeModuleModal,
  saveModuleForm,
  deletingModule,
  closeDeleteModule,
  confirmDeleteModule,
  editingTopic,
  closeEditTopic,
  saveEditTopic,
  addingToModule,
  closeAddTopic,
  saveAddTopic,
  deletingTopic,
  closeDeleteTopic,
  confirmDeleteTopic,
  isSubmitting,
}) {
  return (
    <>
      {moduleFormState && (
        <ModuleFormModal
          isOpen={Boolean(moduleFormState)}
          mode={moduleFormState.mode}
          module={moduleFormState.module}
          modulesCount={modulesCount}
          onClose={closeModuleModal}
          onSave={saveModuleForm}
          isSubmitting={isSubmitting}
        />
      )}

      {deletingModule && (
        <DeleteModuleConfirmation
          isOpen={Boolean(deletingModule)}
          module={deletingModule}
          onClose={closeDeleteModule}
          onConfirm={confirmDeleteModule}
          isSubmitting={isSubmitting}
        />
      )}

      {editingTopic && (
        <EditTopicModal
          isOpen={Boolean(editingTopic)}
          module={editingTopic.module}
          topic={editingTopic.topic}
          onClose={closeEditTopic}
          onSave={saveEditTopic}
          isSubmitting={isSubmitting}
        />
      )}

      {addingToModule && (
        <AddTopicModal
          isOpen={Boolean(addingToModule)}
          module={addingToModule}
          onClose={closeAddTopic}
          onAdd={saveAddTopic}
          isSubmitting={isSubmitting}
        />
      )}

      {deletingTopic && (
        <DeleteConfirmation
          isOpen={Boolean(deletingTopic)}
          module={deletingTopic.module}
          topic={deletingTopic.topic}
          onClose={closeDeleteTopic}
          onConfirm={confirmDeleteTopic}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
