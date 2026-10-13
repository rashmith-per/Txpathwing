import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  CheckCircle,
  X,
  Clock,
  RotateCcw,
  ListVideo,
} from "lucide-react";
import "./VideoPlayer.css";

const DEMO_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

const DEFAULT_PLAYLIST = [
  { id: "les-1", title: "1.1 Introduction to Course Architecture", duration: "14:20", durationSec: 860, videoUrl: DEMO_VIDEOS[0] },
  { id: "les-2", title: "1.2 Core Components & State Design", duration: "18:45", durationSec: 1125, videoUrl: DEMO_VIDEOS[1] },
  { id: "les-3", title: "2.1 Advanced Implementation Patterns", duration: "22:10", durationSec: 1330, videoUrl: DEMO_VIDEOS[2] },
  { id: "les-4", title: "2.2 Production Build & Deployment", duration: "20:30", durationSec: 1230, videoUrl: DEMO_VIDEOS[3] },
];

export default function VideoPlayer({ course, onClose, onProgressUpdate }) {
  const courseId = course?.id || course?.code || "react-fs";
  const courseTitle = course?.title || "Full Stack Development";
  const currentModule = course?.currentModule || "Module 1: Foundations & Architecture";

  // Load saved progress
  const getSavedProgress = () => {
    try {
      const all = JSON.parse(localStorage.getItem("courseProgress") || "{}");
      return all[courseId] || { lastLessonId: DEFAULT_PLAYLIST[0].id, lessons: {}, position: 0 };
    } catch {
      return { lastLessonId: DEFAULT_PLAYLIST[0].id, lessons: {}, position: 0 };
    }
  };

  const [savedData, setSavedData] = useState(getSavedProgress);
  const [activeLesson, setActiveLesson] = useState(() => {
    const init = getSavedProgress();
    return DEFAULT_PLAYLIST.find((l) => l.id === init.lastLessonId) || DEFAULT_PLAYLIST[0];
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(true);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [savedIndicator, setSavedIndicator] = useState(false);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Restore playback position on active lesson change
  useEffect(() => {
    setIsPlaying(false);
    const pos = savedData?.lessons?.[activeLesson.id]?.position || 0;
    setCurrentTime(pos);
    if (videoRef.current) {
      videoRef.current.currentTime = pos;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [activeLesson.id]);

  // Save progress
  const saveProgress = useCallback(
    (completed = false) => {
      if (!videoRef.current) return;
      const pos = Math.round(videoRef.current.currentTime);
      const total = Math.round(videoRef.current.duration || activeLesson.durationSec || 600);

      try {
        const all = JSON.parse(localStorage.getItem("courseProgress") || "{}");
        const cProg = all[courseId] || { lastLessonId: activeLesson.id, lessons: {} };
        const prev = cProg.lessons?.[activeLesson.id] || {};

        const isDone = completed || prev.completed || (total > 0 && pos / total >= 0.92);

        cProg.lastLessonId = activeLesson.id;
        cProg.position = pos;
        if (!cProg.lessons) cProg.lessons = {};
        cProg.lessons[activeLesson.id] = { position: pos, duration: total, completed: isDone };

        // Overall progress percentage
        const completedCount = Object.values(cProg.lessons).filter((l) => l.completed).length;
        const progressPct = Math.min(100, Math.round((completedCount / DEFAULT_PLAYLIST.length) * 100));
        cProg.progressPercent = progressPct;

        all[courseId] = cProg;
        localStorage.setItem("courseProgress", JSON.stringify(all));

        // Update enrolledCourses in localStorage
        const enrollments = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        const updatedEnrollments = enrollments.map((e) => {
          if ((e.id || "").toLowerCase() === courseId.toLowerCase() || (e.code || "").toLowerCase() === courseId.toLowerCase()) {
            return { ...e, progress: progressPct };
          }
          return e;
        });
        localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrollments));

        setSavedData(cProg);
        setSavedIndicator(true);
        setTimeout(() => setSavedIndicator(false), 2000);

        if (onProgressUpdate) onProgressUpdate(progressPct);
      } catch (err) {
        console.warn("Failed to save progress:", err);
      }
    },
    [activeLesson, courseId, onProgressUpdate]
  );

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    const pos = savedData?.lessons?.[activeLesson.id]?.position || 0;
    if (pos > 0 && pos < videoRef.current.duration - 5) {
      videoRef.current.currentTime = pos;
      setCurrentTime(pos);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      saveProgress(false);
    }
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const changeRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setSpeedMenuOpen(false);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const currentIdx = DEFAULT_PLAYLIST.findIndex((l) => l.id === activeLesson.id);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < DEFAULT_PLAYLIST.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      saveProgress(false);
      setActiveLesson(DEFAULT_PLAYLIST[currentIdx - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      saveProgress(false);
      setActiveLesson(DEFAULT_PLAYLIST[currentIdx + 1]);
    }
  };

  const handleClose = () => {
    saveProgress(false);
    if (onClose) onClose();
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isCurrentLessonCompleted = Boolean(savedData?.lessons?.[activeLesson.id]?.completed);

  return (
    <div className="player-modal-backdrop">
      <div className="player-window" ref={playerContainerRef}>
        {/* Header */}
        <header className="player-top-nav">
          <div className="player-course-meta">
            <span className="player-tag">COURSE LESSON</span>
            <div>
              <h3 className="player-heading">{courseTitle}</h3>
              <p className="player-subheading">{currentModule} • {activeLesson.title}</p>
            </div>
          </div>

          <div className="player-top-actions">
            {savedIndicator && <span className="player-save-tag">Progress Saved ✓</span>}
            <button
              type="button"
              className="player-btn-secondary"
              onClick={() => setPlaylistOpen((v) => !v)}
            >
              <ListVideo size={16} />
              <span>{playlistOpen ? "Hide Playlist" : "Show Playlist"}</span>
            </button>
            <button
              type="button"
              className="player-close-icon"
              onClick={handleClose}
              title="Close & Return to Dashboard"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="player-content-split">
          {/* Main Video View */}
          <div className="player-viewport-column">
            <div className="player-video-box">
              <video
                ref={videoRef}
                src={activeLesson.videoUrl}
                className="player-native-video"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                playsInline
              />

              <div className="player-demo-badge">
                <span>Demo Lesson Stream</span> • Pathwing Player
              </div>
            </div>

            {/* Custom Controls */}
            <div className="player-controls-container">
              {/* Seek bar */}
              <div className="player-scrub-bar">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  className="player-scrub-slider"
                />
                <div
                  className="player-scrub-progress"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Buttons */}
              <div className="player-controls-actions">
                <div className="controls-group-left">
                  <button type="button" className="ctrl-action-btn play-circle" onClick={togglePlay}>
                    {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#ffffff" />}
                  </button>

                  <button type="button" className="ctrl-action-btn" onClick={handlePrev} disabled={!hasPrev} title="Previous">
                    <SkipBack size={17} />
                  </button>

                  <button type="button" className="ctrl-action-btn" onClick={handleNext} disabled={!hasNext} title="Next">
                    <SkipForward size={17} />
                  </button>

                  <div className="volume-slider-group">
                    <button type="button" className="ctrl-action-btn" onClick={toggleMute}>
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
                    />
                  </div>

                  <span className="player-time-label">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="controls-group-right">
                  <div className="speed-dropdown-wrapper">
                    <button
                      type="button"
                      className="speed-toggle"
                      onClick={() => setSpeedMenuOpen((v) => !v)}
                    >
                      {playbackRate}x
                    </button>
                    {speedMenuOpen && (
                      <div className="speed-menu">
                        {[0.75, 1, 1.25, 1.5, 2].map((r) => (
                          <button
                            key={r}
                            type="button"
                            className={`speed-item ${playbackRate === r ? "active" : ""}`}
                            onClick={() => changeRate(r)}
                          >
                            {r}x {r === 1 ? "(Normal)" : ""}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`mark-done-btn ${isCurrentLessonCompleted ? "done" : ""}`}
                    onClick={() => saveProgress(true)}
                  >
                    <CheckCircle size={15} />
                    <span>{isCurrentLessonCompleted ? "Completed ✓" : "Mark Complete"}</span>
                  </button>

                  <button type="button" className="ctrl-action-btn" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson details description */}
            <div className="player-lesson-info-box">
              <h4>{activeLesson.title}</h4>
              <p>
                In this lesson, you will master the architectural components and foundational principles for modern web development.
              </p>
            </div>
          </div>

          {/* Playlist drawer */}
          {playlistOpen && (
            <aside className="player-playlist-panel">
              <div className="playlist-title-bar">
                <h5>Course Modules & Lessons</h5>
                <span>{DEFAULT_PLAYLIST.length} Lessons</span>
              </div>

              <div className="playlist-items-scroll">
                {DEFAULT_PLAYLIST.map((les, idx) => {
                  const isCurrent = les.id === activeLesson.id;
                  const isDone = Boolean(savedData?.lessons?.[les.id]?.completed);

                  return (
                    <button
                      key={les.id}
                      type="button"
                      className={`playlist-row ${isCurrent ? "current" : ""} ${isDone ? "done" : ""}`}
                      onClick={() => {
                        saveProgress(false);
                        setActiveLesson(les);
                      }}
                    >
                      <div className="playlist-row-status">
                        {isDone ? (
                          <CheckCircle size={16} className="text-emerald" />
                        ) : isCurrent ? (
                          <Play size={14} className="text-blue" fill="#2563eb" />
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
          )}
        </div>
      </div>
    </div>
  );
}
