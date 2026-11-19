import { useState, useCallback } from "react";
import { suggestCourseCode } from "../../MyCourses/validation/courseValidation.js";
import { curriculumDraftService } from "../services/curriculumDraftService.js";

export function useCurriculumForm({
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
}) {
  const isEditingExisting = Boolean(editingCourse);

  const [topic, setTopicState] = useState(() =>
    editingCourse?.title ||
    initialDraft?.working?.title ||
    "Autonomous AI Agents & Multi-Agent Orchestration"
  );
  const [code, setCodeState] = useState(() =>
    editingCourse?.code || initialDraft?.working?.code || "AGENT-AI"
  );
  const [codeTouched, setCodeTouched] = useState(() =>
    Boolean(editingCourse?.code || initialDraft?.working?.code)
  );
  const [level, setLevel] = useState(
    () => editingCourse?.level || initialDraft?.working?.level || "Advanced"
  );
  const [category, setCategory] = useState(
    () => editingCourse?.category || initialDraft?.working?.category || "Artificial Intelligence & Systems"
  );
  const [targetAudience, setTargetAudience] = useState(
    () =>
      editingCourse?.targetAudience ||
      initialDraft?.working?.targetAudience ||
      "Software Engineers & Full Stack Developers"
  );
  const [status, setStatus] = useState(
    () => editingCourse?.status || initialDraft?.working?.status || "Published"
  );
  const [price, setPrice] = useState(
    () => editingCourse?.price ?? initialDraft?.working?.price ?? 19999
  );
  const [totalHours, setTotalHours] = useState(
    () => editingCourse?.totalHours || initialDraft?.working?.totalHours || 52
  );
  const [description, setDescription] = useState(
    () => editingCourse?.description || initialDraft?.working?.description || ""
  );

  const [builderMode, setBuilderMode] = useState(initialMode || "ai");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const setTopic = useCallback(
    (nextTitle) => {
      setTopicState(nextTitle);
      if (!codeTouched && !isEditingExisting) {
        setCodeState(suggestCourseCode(nextTitle, "COURSE-101"));
      }
      if (generatedSyllabus) {
        setGeneratedSyllabus((prev) =>
          curriculumDraftService.updateCourseMetadata(prev, {
            title: nextTitle,
            code: !codeTouched && !isEditingExisting ? suggestCourseCode(nextTitle, "COURSE-101") : code
          })
        );
        setHasUnsavedChanges(true);
      }
    },
    [codeTouched, isEditingExisting, generatedSyllabus, code, setGeneratedSyllabus, setHasUnsavedChanges]
  );

  const setCode = useCallback(
    (nextCode) => {
      const normalized = String(nextCode || "").toUpperCase();
      setCodeTouched(true);
      setCodeState(normalized);
      if (generatedSyllabus) {
        setGeneratedSyllabus((prev) =>
          curriculumDraftService.updateCourseMetadata(prev, { code: normalized })
        );
        setHasUnsavedChanges(true);
      }
    },
    [generatedSyllabus, setGeneratedSyllabus, setHasUnsavedChanges]
  );

  const stageWorkingUpdate = useCallback(
    (nextSyllabus, successMsg) => {
      if (!isEditingExisting) {
        curriculumDraftService.saveWorkingDraft(
          nextSyllabus,
          committedSyllabus || nextSyllabus,
          instructorId
        );
      }
      setGeneratedSyllabus(nextSyllabus);
      setHasUnsavedChanges(true);
      if (successMsg) showSuccess(successMsg);
    },
    [isEditingExisting, committedSyllabus, instructorId, showSuccess, setGeneratedSyllabus, setHasUnsavedChanges]
  );

  const switchBuilderMode = useCallback(
    (nextMode) => {
      setBuilderMode(nextMode);
      clearFeedback();
      if (nextMode === "manual" && !generatedSyllabus && !isEditingExisting) {
        const manualBlank = curriculumDraftService.createManualCourseBlueprint({
          title: topic,
          code,
          category,
          level,
          targetAudience,
          price,
          totalHours,
          description,
          status: status || "Draft"
        });
        const committed = curriculumDraftService.commitDraftChanges(manualBlank, instructorId);
        setGeneratedSyllabus(committed);
        setCommittedSyllabus(committed);
        setHasUnsavedChanges(false);
      }
    },
    [
      clearFeedback,
      generatedSyllabus,
      isEditingExisting,
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
      setHasUnsavedChanges
    ]
  );

  const handleInitializeManual = useCallback(() => {
    const manualBlueprint = curriculumDraftService.createManualCourseBlueprint({
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
    const committed = curriculumDraftService.commitDraftChanges(manualBlueprint, instructorId);
    setGeneratedSyllabus(committed);
    setCommittedSyllabus(committed);
    setHasUnsavedChanges(false);
    showSuccess("Initialized manual course structure. Add modules and topics on the right.");
  }, [
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

  const handleGenerate = useCallback(() => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    clearFeedback();

    setTimeout(() => {
      const blueprint = curriculumDraftService.generateSyllabusBlueprint({
        topic,
        code,
        category,
        level,
        targetAudience,
        price,
        totalHours,
        description,
        status
      });
      if (isEditingExisting && editingCourse?.id) {
        blueprint.existingCourseId = editingCourse.id;
        setGeneratedSyllabus(blueprint);
        setHasUnsavedChanges(true);
      } else {
        const committed = curriculumDraftService.commitDraftChanges(blueprint, instructorId);
        setGeneratedSyllabus(committed);
        setCommittedSyllabus(committed);
        setCodeState(committed.code);
        setHasUnsavedChanges(false);
      }
      setIsGenerating(false);
      showSuccess(
        "AI curriculum specification generated. Edit course details, modules, and topics before saving."
      );
    }, 650);
  }, [
    topic,
    code,
    category,
    level,
    targetAudience,
    price,
    totalHours,
    description,
    status,
    isEditingExisting,
    editingCourse,
    instructorId,
    setGeneratedSyllabus,
    setCommittedSyllabus,
    setHasUnsavedChanges,
    clearFeedback,
    showSuccess
  ]);

  return {
    topic, setTopic,
    code, setCode,
    codeTouched,
    level, setLevel,
    category, setCategory,
    targetAudience, setTargetAudience,
    status, setStatus,
    price, setPrice,
    totalHours, setTotalHours,
    description, setDescription,
    builderMode, setBuilderMode,
    switchBuilderMode,
    fieldErrors, setFieldErrors,
    isGenerating,
    handleGenerate,
    handleInitializeManual,
    stageWorkingUpdate
  };
}
