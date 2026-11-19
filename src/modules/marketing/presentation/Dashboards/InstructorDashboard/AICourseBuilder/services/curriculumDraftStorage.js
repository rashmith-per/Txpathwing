export const DRAFT_STORAGE_KEY = "tx_instructor_curriculum_draft_v1";

export function storageKeyFor(instructorId) {
  return `${DRAFT_STORAGE_KEY}_${instructorId || "default"}`;
}

export function readEnvelope(instructorId) {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(storageKeyFor(instructorId));
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn("[CurriculumDraftService] Storage read error:", err);
  }
  return null;
}

export function writeEnvelope(instructorId, envelope) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(storageKeyFor(instructorId), JSON.stringify(envelope));
    }
  } catch (err) {
    console.warn("[CurriculumDraftService] Storage write error:", err);
  }
}

export function clearDraftStorage(instructorId) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(storageKeyFor(instructorId));
    }
  } catch (err) {
    console.warn("[CurriculumDraftService] Storage clear error:", err);
  }
}

export function loadDraftState(instructorId) {
  const envelope = readEnvelope(instructorId);
  if (!envelope || !envelope.committed) {
    return { working: null, committed: null, isDirty: false };
  }
  const committed = envelope.committed;
  const working = envelope.working || committed;
  const isDirty = Boolean(envelope.isDirty);
  return { working, committed, isDirty };
}

export function saveWorkingDraft(workingSyllabus, committedSyllabus, instructorId) {
  const envelope = {
    version: 1,
    savedAt: new Date().toISOString(),
    isDirty: true,
    committed: committedSyllabus || workingSyllabus,
    working: workingSyllabus
  };
  writeEnvelope(instructorId, envelope);
  return envelope;
}

export function commitDraftChanges(syllabus, instructorId) {
  const clean = syllabus ? JSON.parse(JSON.stringify(syllabus)) : null;
  const envelope = {
    version: 1,
    savedAt: new Date().toISOString(),
    isDirty: false,
    committed: clean,
    working: clean
  };
  writeEnvelope(instructorId, envelope);
  return envelope;
}

export function revertWorkingDraft(committedSyllabus, instructorId) {
  const clean = committedSyllabus ? JSON.parse(JSON.stringify(committedSyllabus)) : null;
  const envelope = {
    version: 1,
    savedAt: new Date().toISOString(),
    isDirty: false,
    committed: clean,
    working: clean
  };
  writeEnvelope(instructorId, envelope);
  return clean;
}
