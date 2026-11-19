import { useState } from "react";
import {
  initialEarningsData,
  initialAttentionItems,
  initialLearners,
  initialReviews,
  initialLiveSessions,
  initialQnA,
  initialCertificates,
  initialCourseAnalytics,
  initialAssignments
} from "../data/mockData";
import { useInstructorCourses } from "./useInstructorCourses";
import { useInstructorBatches } from "./useInstructorBatches";

export function useInstructorData({ instructorIdentity, setProfile }) {
  const [earnings] = useState(initialEarningsData);
  const [attentionItems, setAttentionItems] = useState(initialAttentionItems);
  const [learners] = useState(initialLearners);
  const [reviews] = useState(initialReviews);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [liveSessions, setLiveSessions] = useState(initialLiveSessions);
  const [qna, setQnA] = useState(initialQnA);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [analytics] = useState(initialCourseAnalytics);

  const batchesState = useInstructorBatches();

  const coursesState = useInstructorCourses({
    instructorIdentity,
    learners,
    batches: batchesState.batches,
    setProfile
  });

  const handleGradeAssignment = (assignmentId, score, feedback) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, score, feedback, status: "Graded" } : a))
    );
  };

  const handleAddLiveSession = (newSession) => setLiveSessions((prev) => [newSession, ...prev]);
  const handleIssueCertificate = (newCertificate) => setCertificates((prev) => [newCertificate, ...prev]);
  const handleAnswerQnA = (questionId, answer) => {
    setQnA((prev) => prev.map((q) => (q.id === questionId ? { ...q, answer, status: "Answered" } : q)));
  };

  const handleResolveAttentionItem = (itemId) => {
    if (!attentionItems.some((item) => item.id === itemId)) return;
    setAttentionItems((prev) => prev.filter((item) => item.id !== itemId));
    setProfile((prev) => ({
      ...prev,
      openQuestionsCount: Math.max(0, (prev.openQuestionsCount || 0) - 1)
    }));
  };

  return {
    ...coursesState,
    ...batchesState,
    earnings,
    attentionItems,
    learners,
    reviews,
    assignments,
    liveSessions,
    qna,
    certificates,
    analytics,
    handleGradeAssignment,
    handleAddLiveSession,
    handleIssueCertificate,
    handleAnswerQnA,
    handleResolveAttentionItem
  };
}
