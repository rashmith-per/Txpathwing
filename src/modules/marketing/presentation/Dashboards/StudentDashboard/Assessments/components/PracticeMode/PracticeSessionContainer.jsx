import React from "react";
import { PRACTICE_QUESTIONS_BY_COURSE } from "../../data/practiceQuestions.data";
import PracticeActiveSessionView from "./PracticeActiveSessionView";
import PracticeResultView from "./PracticeResultView";

export function PracticeSessionContainer({
  activePracticeCourse,
  practiceQIndex,
  setPracticeQIndex,
  practiceAnswers,
  setPracticeAnswers,
  showPracticeResult,
  setShowPracticeResult,
  onBackToCatalog
}) {
  const questions = PRACTICE_QUESTIONS_BY_COURSE[activePracticeCourse?.id] || PRACTICE_QUESTIONS_BY_COURSE.java;
  const currentQ = questions[practiceQIndex] || questions[0];
  const selectedOpt = practiceAnswers[currentQ?.id];
  const totalAnswered = Object.keys(practiceAnswers).length;

  const correctCount = questions.filter((q) => practiceAnswers[q.id] === q.correct).length;
  const totalMarks = questions.length * 4;
  const scoredMarks = correctCount * 4;
  const percentage = Math.round((scoredMarks / totalMarks) * 100);

  if (showPracticeResult) {
    return (
      <PracticeResultView
        activePracticeCourse={activePracticeCourse}
        scoredMarks={scoredMarks}
        totalMarks={totalMarks}
        percentage={percentage}
        correctCount={correctCount}
        totalAnswered={totalAnswered}
        questions={questions}
        practiceAnswers={practiceAnswers}
        onRetake={() => {
          setPracticeAnswers({});
          setPracticeQIndex(0);
          setShowPracticeResult(false);
        }}
        onBackToCourses={onBackToCatalog}
      />
    );
  }

  return (
    <PracticeActiveSessionView
      activePracticeCourse={activePracticeCourse}
      questions={questions}
      practiceQIndex={practiceQIndex}
      practiceAnswers={practiceAnswers}
      selectedOpt={selectedOpt}
      totalAnswered={totalAnswered}
      onSelectIndex={setPracticeQIndex}
      onSelectOption={(questionId, optId) => {
        setPracticeAnswers((prev) => ({
          ...prev,
          [questionId]: optId
        }));
      }}
      onPrevious={() => setPracticeQIndex((prev) => Math.max(0, prev - 1))}
      onNext={() => setPracticeQIndex((prev) => prev + 1)}
      onFinish={() => setShowPracticeResult(true)}
      onBackToCourses={onBackToCatalog}
    />
  );
}
