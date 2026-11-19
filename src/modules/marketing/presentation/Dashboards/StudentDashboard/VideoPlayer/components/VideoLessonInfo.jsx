import React from "react";

export function VideoLessonInfo({ activeLesson }) {
  if (!activeLesson) return null;

  return (
    <div className="player-lesson-info-box">
      <h4>{activeLesson.rawTitle || activeLesson.title}</h4>
      <p>
        In this topic, you will master the concepts, code implementations, and design patterns required for enterprise full stack development.
      </p>
      {activeLesson.skills?.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {activeLesson.skills.map((s) => (
            <span
              key={s}
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
