import React from "react";
import { CheckCircle, Play, Clock } from "lucide-react";

export function VideoPlaylistSidebar({
  playlist,
  activeLesson,
  topicProgress,
  onSelectLesson,
}) {
  return (
    <aside className="player-playlist-panel">
      <div className="playlist-title-bar">
        <h5>Syllabus Topics</h5>
        <span>{playlist.length} Topics</span>
      </div>

      <div className="playlist-items-scroll">
        {playlist.map((les, idx) => {
          const isCurrent = les.id === activeLesson?.id;
          const isDone = topicProgress?.topics?.[les.id]?.status === "completed";

          return (
            <button
              key={les.id}
              type="button"
              className={`playlist-row ${isCurrent ? "current" : ""} ${isDone ? "done" : ""}`}
              onClick={() => onSelectLesson(les)}
            >
              <div className="playlist-row-status">
                {isDone ? (
                  <CheckCircle size={16} color="#10b981" />
                ) : isCurrent ? (
                  <Play size={14} color="#2563eb" fill="#2563eb" />
                ) : (
                  <span className="circle-dot">{idx + 1}</span>
                )}
              </div>
              <div className="playlist-row-text">
                <span className="playlist-row-title">{les.title}</span>
                <span className="playlist-row-time">
                  <Clock size={11} /> {les.duration}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
