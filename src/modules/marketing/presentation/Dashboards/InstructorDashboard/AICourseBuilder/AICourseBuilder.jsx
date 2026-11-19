import React from "react";
import { Sparkles, CheckCircle2, AlertCircle, X, ArrowLeft, BookOpen } from "lucide-react";
import { ActionButton, IconButton } from "../common/ActionButton.jsx";
import { useCurriculumBuilder } from "./hooks/useCurriculumBuilder.js";
import { CurriculumSpecificationPanel } from "./components/CurriculumSpecificationPanel.jsx";
import { CourseBuilderForm } from "./components/CourseBuilderForm.jsx";
import { CourseBuilderModals } from "./components/CourseBuilderModals.jsx";
import "../MyCourses/styles/syllabus.css";
import "./AICourseBuilder.css";

export function AICourseBuilder({
  instructorProfile,
  embedded = true,
  initialMode = "ai",
  editingCourse = null,
  learners = [],
  batches = [],
  onSaveCourse,
  onDeleteCourse,
  onCloseBuilder,
  onNavigate
}) {
  const b = useCurriculumBuilder({
    instructorProfile,
    initialMode,
    editingCourse,
    learners,
    batches,
    onSaveCourse,
    onDeleteCourse,
    onCloseBuilder,
    onNavigate
  });

  const activeCourseObj = b.generatedSyllabus || {
    id: editingCourse?.id || "draft-course",
    code: b.code,
    title: b.topic,
    category: b.category,
    level: b.level,
    status: b.status,
    price: b.price,
    totalHours: b.totalHours,
    targetAudience: b.targetAudience,
    description: b.description,
    generationMode: b.builderMode,
    modulesCount: b.generatedSyllabus?.modules?.length || 0,
    enrolledLearners: editingCourse?.enrolledLearners || 0
  };

  return (
    <div className="ai-builder-container">
      {/* Header */}
      <div className="ai-builder-header">
        <div className="breadcrumb-nav">
          <span>TX Pathwing</span>
          <span className="separator">/</span>
          <span>Instructor</span>
          <span className="separator">/</span>
          <span>My Courses</span>
          <span className="separator">/</span>
          <strong className="current">
            {b.isEditingExisting ? "Edit Course & Curriculum" : "Create Course"}
          </strong>
        </div>

        <div className="title-row">
          <div className="inst-cb-title-group">
            {embedded && typeof onCloseBuilder === "function" && (
              <ActionButton
                icon={ArrowLeft}
                variant="secondary"
                size="sm"
                onClick={() => onCloseBuilder()}
                tooltip="Return to My Courses"
              >
                Back to My Courses
              </ActionButton>
            )}
            <div>
              <h1 className="module-title">
                {b.isEditingExisting
                  ? `Manage Course: ${editingCourse.title}`
                  : "Create Course & Curriculum"}
              </h1>
              <p className="module-sub">
                Author course details manually or generate a syllabus outline with AI, then refine
                modules and topics freely.
              </p>
            </div>
          </div>

          {!b.isEditingExisting && (
            <div className="inst-cb-mode-switcher" role="tablist" aria-label="Course creation mode">
              <button
                type="button"
                role="tab"
                aria-selected={b.builderMode === "ai"}
                className={`inst-cb-mode-tab ${b.builderMode === "ai" ? "active" : ""}`}
                onClick={() => b.switchBuilderMode("ai")}
              >
                <Sparkles size={14} />
                <span>Create with AI</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={b.builderMode === "manual"}
                className={`inst-cb-mode-tab ${b.builderMode === "manual" ? "active" : ""}`}
                onClick={() => b.switchBuilderMode("manual")}
              >
                <BookOpen size={14} />
                <span>Manual Setup</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {b.successNotice && (
        <div className="builder-success-banner" role="status">
          <CheckCircle2 size={18} />
          <span>{b.successNotice}</span>
          <IconButton
            icon={X}
            size="xs"
            variant="ghost"
            className="inst-cb-banner-dismiss"
            onClick={b.clearFeedback}
            tooltip="Dismiss notification"
            ariaLabel="Dismiss notification"
          />
        </div>
      )}

      {b.errorNotice && (
        <div className="builder-error-banner" role="alert">
          <AlertCircle size={18} />
          <span>{b.errorNotice}</span>
          <IconButton
            icon={X}
            size="xs"
            variant="ghost"
            className="inst-cb-banner-dismiss"
            onClick={b.clearFeedback}
            tooltip="Dismiss error"
            ariaLabel="Dismiss error"
          />
        </div>
      )}

      {/* Two Column Layout: Specifications on Left, Interactive Curriculum on Right */}
      <div className="builder-dual-layout">
        <CourseBuilderForm
          topic={b.topic}
          setTopic={b.setTopic}
          code={b.code}
          setCode={b.setCode}
          status={b.status}
          setStatus={b.setStatus}
          category={b.category}
          setCategory={b.setCategory}
          level={b.level}
          setLevel={b.setLevel}
          price={b.price}
          setPrice={b.setPrice}
          totalHours={b.totalHours}
          setTotalHours={b.setTotalHours}
          targetAudience={b.targetAudience}
          setTargetAudience={b.setTargetAudience}
          description={b.description}
          setDescription={b.setDescription}
          builderMode={b.builderMode}
          isGenerating={b.isGenerating}
          handleGenerate={b.handleGenerate}
          handleInitializeManual={b.handleInitializeManual}
          openAddModule={b.openAddModule}
          generatedSyllabus={b.generatedSyllabus}
          isEditingExisting={b.isEditingExisting}
        />

        <CurriculumSpecificationPanel
          syllabus={b.generatedSyllabus}
          isEditingExisting={b.isEditingExisting}
          existingCourseEnrolled={Boolean(b.existingCourseImpact?.requiresArchive)}
          hasUnsavedChanges={b.hasUnsavedChanges}
          isSubmitting={b.isSubmitting}
          onOpenEditCourse={b.openEditCourseModal}
          onOpenDeleteOrDiscardCourse={b.openDeleteOrDiscardCourse}
          onAddModule={b.openAddModule}
          onEditModule={b.openEditModule}
          onDeleteModule={b.openDeleteModule}
          onReorderModule={b.handleReorderModule}
          onAddTopic={b.openAddTopic}
          onEditTopic={b.openEditTopic}
          onDeleteTopic={b.openDeleteTopic}
          onReorderTopic={b.handleReorderTopic}
          onSaveDraftChanges={b.handleSaveDraftChanges}
          onCancelDraftChanges={b.handleCancelDraftChanges}
          onPublishCourse={b.handlePublishCourse}
        />
      </div>

      <CourseBuilderModals
        activeCourseObj={activeCourseObj}
        generatedSyllabus={b.generatedSyllabus}
        isSubmitting={b.isSubmitting}
        isEditCourseOpen={b.isEditCourseOpen}
        closeEditCourseModal={b.closeEditCourseModal}
        saveCourseMetadata={b.saveCourseMetadata}
        deleteCourseModalState={b.deleteCourseModalState}
        closeDeleteCourseModal={b.closeDeleteCourseModal}
        confirmDeleteOrDiscardCourse={b.confirmDeleteOrDiscardCourse}
        moduleFormState={b.moduleFormState}
        closeModuleModal={b.closeModuleModal}
        saveModuleForm={b.saveModuleForm}
        deletingModule={b.deletingModule}
        closeDeleteModule={b.closeDeleteModule}
        confirmDeleteModule={b.confirmDeleteModule}
        editingTopic={b.editingTopic}
        closeEditTopic={b.closeEditTopic}
        saveEditTopic={b.saveEditTopic}
        addingToModule={b.addingToModule}
        closeAddTopic={b.closeAddTopic}
        saveAddTopic={b.saveAddTopic}
        deletingTopic={b.deletingTopic}
        closeDeleteTopic={b.closeDeleteTopic}
        confirmDeleteTopic={b.confirmDeleteTopic}
      />
    </div>
  );
}

export default AICourseBuilder;
