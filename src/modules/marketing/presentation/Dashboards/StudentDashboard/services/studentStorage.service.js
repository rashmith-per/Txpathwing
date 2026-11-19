export const STORAGE_KEYS = {
  ENROLLED_COURSES: "enrolledCourses",
  TOPIC_PROGRESS: "tx_student_topic_progress",
  DEMO_SEEDED: "tx_student_demo_seeded_v2",
};

export function ensureDemoProgressSeeded() {
  try {
    const isSeeded = localStorage.getItem(STORAGE_KEYS.DEMO_SEEDED);
    if (!isSeeded) {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS) || "{}");

      if (!existing["java-fs"]) {
        existing["java-fs"] = {
          lastAccessedTopicId: "top-java-4",
          topics: {
            "top-java-1": { status: "completed", completedAt: Date.now() - 86400000 * 3 },
            "top-java-2": { status: "completed", completedAt: Date.now() - 86400000 * 2 },
            "top-java-3": { status: "completed", completedAt: Date.now() - 86400000 * 1 },
            "top-java-4": { status: "in-progress", completedAt: null },
          },
        };
      }

      if (!existing["aws-dop"]) {
        existing["aws-dop"] = {
          lastAccessedTopicId: "top-aws-1",
          topics: {
            "top-aws-1": { status: "in-progress", completedAt: null },
          },
        };
      }

      localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(existing));
      localStorage.setItem(STORAGE_KEYS.DEMO_SEEDED, "true");
    }
  } catch (err) {
    console.warn("Could not seed demo progress:", err);
  }
}

export function getAllTopicProgress() {
  ensureDemoProgressSeeded();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS) || "{}");
  } catch {
    return {};
  }
}

export function saveAllTopicProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("topicProgressChanged", { detail: data }));
  } catch (err) {
    console.warn("Failed to persist topic progress:", err);
  }
}
