import React from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  CheckCircle
} from "lucide-react";

export function VideoControls({
  isPlaying,
  togglePlay,
  handlePrev,
  hasPrev,
  handleNext,
  hasNext,
  isMuted,
  toggleMute,
  volume,
  handleVolume,
  currentTime,
  duration,
  handleSeek,
  formatTime,
  speed,
  changeSpeed,
  isFullscreen,
  toggleFullscreen,
  isCurrentLessonCompleted,
  handleMarkComplete
}) {
  return (
    <div className="player-controls-container">
      <div className="player-scrub-bar">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.5}
          value={currentTime}
          onChange={handleSeek}
          className="player-scrub-slider"
          aria-label="Seek video slider"
        />
        <div
          className="player-scrub-progress"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      <div className="player-controls-actions">
        <div className="controls-group-left">
          <button type="button" className="ctrl-action-btn play-circle" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#ffffff" />}
          </button>

          <button type="button" className="ctrl-action-btn" onClick={handlePrev} disabled={!hasPrev} title="Previous Topic" aria-label="Previous Topic">
            <SkipBack size={17} />
          </button>

          <button type="button" className="ctrl-action-btn" onClick={handleNext} disabled={!hasNext} title="Next Topic" aria-label="Next Topic">
            <SkipForward size={17} />
          </button>

          <div className="volume-slider-group">
            <button type="button" className="ctrl-action-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="volume-input"
              aria-label="Volume slider"
            />
          </div>

          <span className="player-time-label">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="controls-group-right">
          <div className="speed-dropdown-wrapper">
            <select
              value={speed}
              onChange={(e) => changeSpeed(parseFloat(e.target.value))}
              className="speed-toggle"
              aria-label="Playback speed"
            >
              {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={`complete-toggle-btn ${isCurrentLessonCompleted ? "done" : ""}`}
            onClick={handleMarkComplete}
            title={isCurrentLessonCompleted ? "Topic completed!" : "Mark this topic complete"}
          >
            <CheckCircle size={15} />
            <span>{isCurrentLessonCompleted ? "Completed ✓" : "Mark as Done"}</span>
          </button>

          <button type="button" className="ctrl-action-btn" onClick={toggleFullscreen} title="Toggle Fullscreen" aria-label="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>
    </div>
  );
}
