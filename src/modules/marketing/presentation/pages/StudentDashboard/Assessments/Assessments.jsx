import React, { useState, useEffect, useCallback } from "react";
import "./Assessments.css";

// Modular Domain Datasets
import { ASSESSMENT_EXAMS } from "./data/assessmentExams.data";
import { EXAM_QUESTIONS_BY_TOPIC } from "./data/examQuestions.data";

// Modular Services & Hooks
import { calculateExamResults } from "./services/scoreCalculator.service";
import { useProctoring } from "./hooks/useProctoring";

// Modular Presentation Components
import TopicExamCard from "./components/TopicExams/TopicExamCard";
import TopicProgressWidgets from "./components/TopicExams/TopicProgressWidgets";
import ActiveExamHeader from "./components/ActiveExam/ActiveExamHeader";
import QuestionCard from "./components/ActiveExam/QuestionCard";
import ProctoringFeed from "./components/ActiveExam/ProctoringFeed";
import ExamCompletedPopup from "./components/CompletedPopup/ExamCompletedPopup";

export default function Assessments({ onBack }) {
  // Question & Navigation States
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});

  // Exam Workflow Lifecycle: "start" -> "active" -> "completed" -> "start"
  const [examStage, setExamStage] = useState("start");
  const [activeExam, setActiveExam] = useState(ASSESSMENT_EXAMS[0]);
  const [completedExams, setCompletedExams] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(352);
  const [submissionReason, setSubmissionReason] = useState("");

  // Proctoring Hardware & AI Detection Hook
  const isExamActive = examStage === "active";
  const {
    cameraActive,
    cameraStarting,
    cameraError,
    micActive,
    audioLevel,
    faceDetectionState,
    faceConfidence,
    simulatedMode,
    setSimulatedMode,
    warningMessage,
    setWarningMessage,
    videoRef,
    canvasRef,
    overlayCanvasRef,
    startCameraAndMic,
    stopCameraAndMic
  } = useProctoring(isExamActive);

  // Active topic questions
  const activeQuestions =
    EXAM_QUESTIONS_BY_TOPIC[activeExam?.id] || EXAM_QUESTIONS_BY_TOPIC.java;
  const currentQuestion =
    activeQuestions[currentQIndex] || activeQuestions[0];
  const currentDurationSec = activeExam?.durationSeconds || 352;
  const timeSpentSeconds = Math.max(1, currentDurationSec - secondsRemaining);
  const currentAnsweredCount = activeQuestions.filter((q) =>
    Boolean(selectedAnswers[q.id])
  ).length;

  // Submit Exam Handler -> stops camera & audio, calculates percentage, opens completed popup
  const handleSubmitAssessment = useCallback(
    (reason = "manual") => {
      stopCameraAndMic();
      const timeUsed = Math.max(1, (activeExam?.durationSeconds || 352) - secondsRemaining);
      const mins = Math.floor(timeUsed / 60);
      const secs = timeUsed % 60;
      const formattedTimeTaken = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

      const examQuestions =
        EXAM_QUESTIONS_BY_TOPIC[activeExam?.id] || EXAM_QUESTIONS_BY_TOPIC.java;
      const results = calculateExamResults(examQuestions, selectedAnswers);

      if (activeExam) {
        setCompletedExams((prev) => ({
          ...prev,
          [activeExam.id]: {
            percentage: results.percentage,
            answeredCount: results.answeredCount,
            correctCount: results.correctCount,
            totalQuestions: results.totalQuestions,
            timeTaken: formattedTimeTaken,
            submissionType:
              reason === "timeout" ? "Auto-Submitted (Timer 00:00)" : "Manual Submission",
            completedAt: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),
            cameraStatus: "Stopped & Disconnected",
            examStatus: "Completed & Verified"
          }
        }));
      }

      setSubmissionReason(reason);
      setWarningMessage("");
      setExamStage("completed");
    },
    [stopCameraAndMic, activeExam, secondsRemaining, selectedAnswers, setWarningMessage]
  );

  // Countdown Timer
  useEffect(() => {
    if (!isExamActive) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isExamActive]);

  // Auto-submit on 00:00
  useEffect(() => {
    if (isExamActive && secondsRemaining === 0) {
      handleSubmitAssessment("timeout");
    }
  }, [secondsRemaining, isExamActive, handleSubmitAssessment]);

  // Step 1 -> Step 2: Start Proctored Exam
  const handleStartExam = (exam) => {
    const chosenExam = exam || ASSESSMENT_EXAMS[0];
    setActiveExam(chosenExam);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSubmissionReason("");
    setSecondsRemaining(chosenExam.durationSeconds || 352);
    setWarningMessage("");
    setExamStage("active");
  };

  // Step 3 -> Step 1: Done Button
  const handleDoneExam = () => {
    stopCameraAndMic();
    setSubmissionReason("");
    setWarningMessage("");
    setExamStage("start");
  };

  // Option selection
  const handleSelectOption = (optId) => {
    if (!isExamActive) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId
    }));
  };

  // Toggle flag
  const handleToggleFlag = () => {
    if (!isExamActive) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  // Navigation Next / Previous
  const handleNext = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  // =========================================================================
  // STAGE 1: TOPIC-WISE EXAMS UI (Percentage shown ONLY after completing exam)
  // =========================================================================
  if (examStage === "start") {
    const completedExamList = Object.values(completedExams);
    const completedSessionCount = completedExamList.length;
    const totalCompletedCount = completedSessionCount;
    const overallPercent =
      completedSessionCount > 0
        ? Math.round(
            completedExamList.reduce((acc, item) => acc + (item.percentage || 0), 0) /
              completedSessionCount
          )
        : 0;

    return (
      <div className="topic-exams-page">
        <div className="topic-exams-content-grid">
          {/* Left Column: Topic Exam Cards List */}
          <div className="topic-exams-main-col">
            <div className="topic-cards-list">
              {ASSESSMENT_EXAMS.map((exam) => (
                <TopicExamCard
                  key={exam.id}
                  exam={exam}
                  compData={completedExams[exam.id]}
                  onStartExam={handleStartExam}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Progress & Stats Widgets */}
          <TopicProgressWidgets
            totalCompletedCount={totalCompletedCount}
            totalExamsCount={ASSESSMENT_EXAMS.length}
            overallPercent={overallPercent}
            recommendedExam={ASSESSMENT_EXAMS[0]}
            onStartExam={handleStartExam}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // STAGE 3: EXAM COMPLETED POPUP
  // =========================================================================
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

  // =========================================================================
  // STAGE 2: ACTIVE PROCTORED EXAM (Camera ON, Face AI, Audio Meter, Questions)
  // =========================================================================
  return (
    <div className="proctored-assessment-wrapper">
      <main className="assessment-center-area">
        {/* Active Header with Timer & Submit */}
        <ActiveExamHeader
          activeExam={activeExam}
          activeQuestions={activeQuestions}
          currentAnsweredCount={currentAnsweredCount}
          secondsRemaining={secondsRemaining}
          onBack={onBack}
          onSubmit={handleSubmitAssessment}
        />

        {/* Warning incident alert banner */}
        {warningMessage && (
          <div className="proctoring-incident-alert incident-warning">
            <span>{warningMessage}</span>
            <span style={{ fontSize: "11px", opacity: 0.85 }}>Live Monitored</span>
          </div>
        )}

        {/* Main Question Card */}
        <QuestionCard
          activeQuestions={activeQuestions}
          currentQIndex={currentQIndex}
          currentQuestion={currentQuestion}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          currentAnsweredCount={currentAnsweredCount}
          onSelectOption={handleSelectOption}
          onToggleFlag={handleToggleFlag}
          onSelectQuestionIndex={setCurrentQIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmitAssessment}
        />
      </main>

      {/* Right Proctoring Panel */}
      <ProctoringFeed
        cameraActive={cameraActive}
        cameraStarting={cameraStarting}
        cameraError={cameraError}
        micActive={micActive}
        audioLevel={audioLevel}
        faceDetectionState={faceDetectionState}
        faceConfidence={faceConfidence}
        simulatedMode={simulatedMode}
        setSimulatedMode={setSimulatedMode}
        videoRef={videoRef}
        canvasRef={canvasRef}
        overlayCanvasRef={overlayCanvasRef}
        onRetryCamera={startCameraAndMic}
      />
    </div>
  );
}
