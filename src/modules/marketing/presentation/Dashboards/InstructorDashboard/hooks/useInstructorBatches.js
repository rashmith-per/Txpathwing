import { useState, useEffect } from "react";
import { initialBatches } from "../data/mockData";
import {
  ASSESSMENT_STORAGE_KEYS,
  assignStudentsToAssessment,
  normalizeText
} from "../Assessments/assessmentUtils";
import {
  EVALUATION_STORAGE_KEYS,
  upsertStudentEvaluation
} from "../Evaluation/evaluationUtils";

export function useInstructorBatches() {
  const [batches, setBatches] = useState(() => {
    try {
      const saved = localStorage.getItem("instructor_batches");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter(
            (b) => b && !["batch-1", "batch-2", "batch-3", "batch-4"].includes(b.id) && b.name
          );
          const seen = new Set();
          const unique = [];
          for (const item of filtered) {
            const key = item.name.trim().toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              unique.push(item);
            }
          }
          if (unique.length > 0) return unique;
        }
      }
    } catch (e) {
      console.warn("Failed to load batches from localStorage", e);
    }
    return initialBatches || [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("instructor_batches", JSON.stringify(batches));
    } catch (e) {
      console.warn("Failed to persist batches to localStorage", e);
    }
  }, [batches]);

  const [batchAssessments, setBatchAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSESSMENT_STORAGE_KEYS.ASSESSMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load batch assessments from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ASSESSMENT_STORAGE_KEYS.ASSESSMENTS, JSON.stringify(batchAssessments));
    } catch (e) {
      console.warn("Failed to persist batch assessments to localStorage", e);
    }
  }, [batchAssessments]);

  const [assessmentAssignments, setAssessmentAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSESSMENT_STORAGE_KEYS.ASSIGNMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load assessment assignments from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ASSESSMENT_STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assessmentAssignments));
    } catch (e) {
      console.warn("Failed to persist assessment assignments to localStorage", e);
    }
  }, [assessmentAssignments]);

  const [studentEvaluations, setStudentEvaluations] = useState(() => {
    try {
      const saved = localStorage.getItem(EVALUATION_STORAGE_KEYS.EVALUATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to load student evaluations from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(EVALUATION_STORAGE_KEYS.EVALUATIONS, JSON.stringify(studentEvaluations));
    } catch (e) {
      console.warn("Failed to persist student evaluations to localStorage", e);
    }
  }, [studentEvaluations]);

  const handleAddBatch = (newBatch) => {
    setBatches((prev) => {
      if (prev.some((b) => b.id === newBatch.id || b.name.trim().toLowerCase() === newBatch.name.trim().toLowerCase())) {
        return prev;
      }
      return [newBatch, ...prev];
    });
  };

  const handleDeleteBatch = (batchId) => {
    setBatches((prev) => prev.filter((b) => b.id !== batchId));
    setBatchAssessments((prev) => prev.filter((a) => a.batchId !== batchId));
    setAssessmentAssignments((prev) => prev.filter((r) => r.batchId !== batchId));
    setStudentEvaluations((prev) => prev.filter((ev) => ev.batchId !== batchId));
  };

  const handleUpdateBatch = (updatedBatch) => {
    setStudentEvaluations((prev) =>
      prev.map((ev) =>
        ev.batchId === updatedBatch.id
          ? { ...ev, batchName: updatedBatch.name ?? ev.batchName, courseName: updatedBatch.courseName ?? ev.courseName }
          : ev
      )
    );
    setBatches((prev) => prev.map((b) => (b.id === updatedBatch.id ? { ...b, ...updatedBatch } : b)));
    setBatchAssessments((prev) =>
      prev.map((a) =>
        a.batchId === updatedBatch.id
          ? {
              ...a,
              batchName: updatedBatch.name ?? a.batchName,
              courseId: updatedBatch.courseId ?? a.courseId,
              courseName: updatedBatch.courseName ?? a.courseName
            }
          : a
      )
    );
  };

  const handleCreateBatchAssessment = (newAssessment) => {
    setBatchAssessments((prev) => {
      if (
        prev.some(
          (a) =>
            a.id === newAssessment.id ||
            (a.batchId === newAssessment.batchId &&
              (a.kind || "assessment") === (newAssessment.kind || "assessment") &&
              normalizeText(a.title) === normalizeText(newAssessment.title))
        )
      ) {
        return prev;
      }
      return [newAssessment, ...prev];
    });
  };

  const handleAssignAssessmentStudents = ({ assessmentId, batchId, students }) => {
    setAssessmentAssignments((prev) => assignStudentsToAssessment(prev, { assessmentId, batchId, students }).assignments);
  };

  const handleSaveStudentEvaluation = (payload) => {
    const result = upsertStudentEvaluation(studentEvaluations, payload);
    if (!result.error) setStudentEvaluations(result.evaluations);
    return result;
  };

  return {
    batches,
    batchAssessments,
    assessmentAssignments,
    studentEvaluations,
    handleAddBatch,
    handleDeleteBatch,
    handleUpdateBatch,
    handleCreateBatchAssessment,
    handleAssignAssessmentStudents,
    handleSaveStudentEvaluation
  };
}
