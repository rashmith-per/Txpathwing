import { useState, useEffect, useCallback } from "react";
import { ASSESSMENT_EXAMS } from "../data/assessmentExams.data";
import { EXAM_QUESTIONS_BY_TOPIC } from "../data/examQuestions.data";
import { calculateExamResults } from "../services/scoreCalculator.service";
import { useProctoring } from "./useProctoring";

export function useAssessmentSession({ onExamActiveChange }) {
  const [assessmentView, setAssessmentView] = useState("portal_select");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [instructionExam, setInstructionExam] = useState(null);

  const [examStage, setExamStage] = useState("start");
  const [activeExam, setActiveExam] = useState(ASSESSMENT_EXAMS[0]);
  const [completedExams, setCompletedExams] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(352);
  const [submissionReason, setSubmissionReason] = useState("");

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});

  const [activePracticeCourse, setActivePracticeCourse] = useState(null);
  const [practiceQIndex, setPracticeQIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [showPracticeResult, setShowPracticeResult] = useState(false);
  const [isFsBlocked, setIsFsBlocked] = useState(false);

  const isExamActive = examStage === "active";
  const proctoring = useProctoring(isExamActive);
  const { setWarningMessage, stopCameraAndMic } = proctoring;

  const isSecondPersonDetected = isExamActive && proctoring.faceDetectionState === "multiple";
  const isExamPaused = isExamActive && isSecondPersonDetected;

  const activeQuestions =
    EXAM_QUESTIONS_BY_TOPIC[activeExam?.id] || EXAM_QUESTIONS_BY_TOPIC.java;
  const currentQuestion =
    activeQuestions[currentQIndex] || activeQuestions[0];
  const currentDurationSec = activeExam?.durationSeconds || 352;
  const timeSpentSeconds = Math.max(1, currentDurationSec - secondsRemaining);
  const currentAnsweredCount = activeQuestions.filter((q) =>
    Boolean(selectedAnswers[q.id])
  ).length;

  const handleSubmitAssessment = useCallback(
    (reason = "manual") => {
      stopCameraAndMic();
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch (err) {
        console.warn("Fullscreen exit error:", err);
      }
      onExamActiveChange?.(false);
      const timeUsed = Math.max(1, (activeExam?.durationSeconds || 352) - secondsRemaining);
      const mins = Math.floor(timeUsed / 60);
      const secs = timeUsed % 60;
      const formattedTimeTaken = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      const examQuestions = EXAM_QUESTIONS_BY_TOPIC[activeExam?.id] || EXAM_QUESTIONS_BY_TOPIC.java;
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
            submissionType: reason === "timeout" ? "Auto-Submitted (Timer 00:00)" : "Manual Submission",
            completedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            cameraStatus: "Stopped & Disconnected",
            examStatus: "Completed & Verified"
          }
        }));
      }
      setSubmissionReason(reason);
      setWarningMessage("");
      setExamStage("completed");
    },
    [stopCameraAndMic, onExamActiveChange, activeExam, secondsRemaining, selectedAnswers, setWarningMessage]
  );

  useEffect(() => {
    if (!isExamActive || isExamPaused) return;

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
  }, [isExamActive, isExamPaused]);

  useEffect(() => {
    if (isExamActive && !isExamPaused && secondsRemaining === 0) {
      handleSubmitAssessment("timeout");
    }
  }, [secondsRemaining, isExamActive, isExamPaused, handleSubmitAssessment]);

  useEffect(() => {
    if (!isExamActive) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
      setWarningMessage("⚠️ Navigation is locked during the official exam. You cannot use the back button until the exam ends.");
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Exam attempt in progress. Leaving will forfeit your answers.";
      return e.returnValue;
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.code === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setWarningMessage("⚠️ ESC key is disabled. Fullscreen mode is strictly required during the exam.");
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isExamActive, setWarningMessage]);

  useEffect(() => {
    if (!isExamActive) {
      setIsFsBlocked(false);
      return;
    }

    const checkFs = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      if (!isFs) {
        setIsFsBlocked(true);
        setWarningMessage("⚠️ Fullscreen required! Escape is disabled. Re-enter full screen to continue.");
      } else {
        setIsFsBlocked(false);
      }
    };

    document.addEventListener("fullscreenchange", checkFs);
    return () => document.removeEventListener("fullscreenchange", checkFs);
  }, [isExamActive, setWarningMessage]);

  const handleReEnterFullscreen = () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().then(() => setIsFsBlocked(false)).catch(() => {});
      }
    } catch (err) {
      console.warn("Re-enter fullscreen error:", err);
    }
  };

  const handleOpenInstructions = (exam) => {
    setInstructionExam(exam || ASSESSMENT_EXAMS[0]);
  };

  const handleStartExam = (exam) => {
    const chosenExam = exam || instructionExam || ASSESSMENT_EXAMS[0];
    setInstructionExam(null);
    setActiveExam(chosenExam);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSubmissionReason("");
    setSecondsRemaining(chosenExam.durationSeconds || 352);
    setWarningMessage("");
    setExamStage("active");

    onExamActiveChange?.(true);

    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (err) {}
  };

  const handleDoneExam = () => {
    stopCameraAndMic();
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (err) {}
    onExamActiveChange?.(false);
    setSubmissionReason("");
    setWarningMessage("");
    setExamStage("start");
  };

  const handleSelectOption = (optId) => {
    if (!isExamActive || isExamPaused) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId
    }));
  };

  const handleToggleFlag = () => {
    if (!isExamActive || isExamPaused) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleNext = () => {
    if (isExamPaused) return;
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (isExamPaused) return;
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const handleStartPracticeCourse = (course) => {
    setActivePracticeCourse(course);
    setPracticeQIndex(0);
    setPracticeAnswers({});
    setShowPracticeResult(false);
    setAssessmentView("practice_active");
  };

  return {
    assessmentView, setAssessmentView,
    selectedCategory, setSelectedCategory,
    instructionExam, setInstructionExam,
    examStage, setExamStage,
    activeExam, setActiveExam,
    completedExams, setCompletedExams,
    secondsRemaining, setSecondsRemaining,
    submissionReason, setSubmissionReason,
    currentQIndex, setCurrentQIndex,
    selectedAnswers, setSelectedAnswers,
    flaggedQuestions, setFlaggedQuestions,
    activePracticeCourse, setActivePracticeCourse,
    practiceQIndex, setPracticeQIndex,
    practiceAnswers, setPracticeAnswers,
    showPracticeResult, setShowPracticeResult,
    isExamActive,
    isExamPaused,
    isSecondPersonDetected,
    isFsBlocked,
    activeQuestions,
    currentQuestion,
    currentDurationSec,
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
  };
}
