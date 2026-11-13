/**
 * Utility & Scoring Service for Assessments
 */

export function formatTimer(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function calculateExamResults(questions, selectedAnswers) {
  const totalQuestions = questions.length;
  const answeredCount = questions.filter((q) => Boolean(selectedAnswers[q.id])).length;
  const correctCount = questions.filter((q) => selectedAnswers[q.id] === q.correct).length;

  const answeredPct = Math.round((answeredCount / totalQuestions) * 100);
  const scorePct = Math.round((correctCount / totalQuestions) * 100);

  // If student answered questions, percentage reflects their score (or completion if testing)
  const percentage = answeredCount === 0 ? 0 : correctCount > 0 ? scorePct : answeredPct;

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    answeredPct,
    scorePct,
    percentage
  };
}
