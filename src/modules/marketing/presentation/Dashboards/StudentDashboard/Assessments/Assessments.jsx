import React from "react";
import "./Assessments.css";

import { ASSESSMENT_EXAMS } from "./data/assessmentExams.data";
import { useAssessmentSession } from "./hooks/useAssessmentSession";

import PortalSelectView from "./components/PortalSelect/PortalSelectView";
import PracticeCatalogView from "./components/PracticeMode/PracticeCatalogView";
import { PracticeSessionContainer } from "./components/PracticeMode/PracticeSessionContainer";
import OfficialExamCatalogView from "./components/TopicExams/OfficialExamCatalogView";
import ActiveExamSessionView from "./components/ActiveExam/ActiveExamSessionView";
import ExamCompletedPopup from "./components/CompletedPopup/ExamCompletedPopup";

export default function Assessments({ onBack, onExamActiveChange }) {
  const session = useAssessmentSession({ onExamActiveChange });

  const {
    assessmentView, setAssessmentView,
    selectedCategory, setSelectedCategory,
    instructionExam,
    examStage,
    activeExam,
    completedExams,
    secondsRemaining,
    submissionReason,
    currentQIndex, setCurrentQIndex,
    selectedAnswers,
    flaggedQuestions,
    activePracticeCourse,
    practiceQIndex, setPracticeQIndex,
    practiceAnswers, setPracticeAnswers,
    showPracticeResult, setShowPracticeResult,
    isExamPaused,
    isSecondPersonDetected,
    isFsBlocked,
    activeQuestions,
    currentQuestion,
    timeSpentSeconds,
    currentAnsweredCount,
    handleSubmitAssessment,
    handleReEnterFullscreen,
    handleOpenInstructions,
    handleStartExam,
    handleDoneExam,
    handleSelectOption,
    handleToggleFlag,
    handleNext,
    handlePrevious,
    handleStartPracticeCourse,
    proctoring
  } = session;

  if (assessmentView === "portal_select") {
    return (
      <PortalSelectView
        onSelectMode={(mode) => setAssessmentView(mode)}
        onBack={onBack}
      />
    );
  }

  if (assessmentView === "practice_catalog") {
    return (
      <PracticeCatalogView
        exams={ASSESSMENT_EXAMS}
        onSelectCourse={handleStartPracticeCourse}
        onBack={() => setAssessmentView("portal_select")}
      />
    );
  }

  if (assessmentView === "practice_active" && activePracticeCourse) {
    return (
      <PracticeSessionContainer
        activePracticeCourse={activePracticeCourse}
        practiceQIndex={practiceQIndex}
        setPracticeQIndex={setPracticeQIndex}
        practiceAnswers={practiceAnswers}
        setPracticeAnswers={setPracticeAnswers}
        showPracticeResult={showPracticeResult}
        setShowPracticeResult={setShowPracticeResult}
        onBackToCatalog={() => setAssessmentView("practice_catalog")}
      />
    );
  }

  if (examStage === "start") {
    return (
      <OfficialExamCatalogView
        exams={ASSESSMENT_EXAMS}
        completedExams={completedExams}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        instructionExam={instructionExam}
        onOpenInstructions={handleOpenInstructions}
        onCloseInstructions={() => session.setInstructionExam(null)}
        onStartExam={handleStartExam}
        onBackToPortal={() => setAssessmentView("portal_select")}
      />
    );
  }

  if (examStage === "completed") {
    const latestComp = completedExams[activeExam?.id];

    return (
      <ExamCompletedPopup
        activeExam={activeExam}
        latestComp={latestComp}
        submissionReason={submissionReason}
        timeSpentSeconds={timeSpentSeconds}
        activeQuestions={activeQuestions}
        onDone={handleDoneExam}
      />
    );
  }

  return (
    <ActiveExamSessionView
      isFsBlocked={isFsBlocked}
      onReEnterFullscreen={handleReEnterFullscreen}
      isSecondPersonDetected={isSecondPersonDetected}
      faceConfidence={proctoring.faceConfidence}
      forceSingleCandidateResume={proctoring.forceSingleCandidateResume}
      activeExam={activeExam}
      activeQuestions={activeQuestions}
      currentAnsweredCount={currentAnsweredCount}
      secondsRemaining={secondsRemaining}
      isExamPaused={isExamPaused}
      onSubmitAssessment={handleSubmitAssessment}
      warningMessage={proctoring.warningMessage}
      currentQIndex={currentQIndex}
      currentQuestion={currentQuestion}
      selectedAnswers={selectedAnswers}
      flaggedQuestions={flaggedQuestions}
      onSelectOption={handleSelectOption}
      onToggleFlag={handleToggleFlag}
      onSelectQuestionIndex={setCurrentQIndex}
      onPrevious={handlePrevious}
      onNext={handleNext}
      cameraActive={proctoring.cameraActive}
      cameraStarting={proctoring.cameraStarting}
      cameraError={proctoring.cameraError}
      micActive={proctoring.micActive}
      audioLevel={proctoring.audioLevel}
      faceDetectionState={proctoring.faceDetectionState}
      simulatedMode={proctoring.simulatedMode}
      setSimulatedMode={proctoring.setSimulatedMode}
      videoRef={proctoring.videoRef}
      canvasRef={proctoring.canvasRef}
      overlayCanvasRef={proctoring.overlayCanvasRef}
      startCameraAndMic={proctoring.startCameraAndMic}
    />
  );
}
