import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  ListVideo,
} from "lucide-react";
import { getCourseByIdOrCode, DEMO_VIDEOS } from "./services/courseCatalogue.data";
import { studentApi } from "./services/studentApi";
import "./VideoPlayer.css";

const FALLBACK_PLAYLIST = [
  { id: "les-1", title: "1.1 Introduction to Course Architecture", duration: "14:20", durationSec: 860, videoUrl: DEMO_VIDEOS[0] },
  { id: "les-2", title: "1.2 Core Components & State Design", duration: "18:45", durationSec: 1125, videoUrl: DEMO_VIDEOS[1] },
  { id: "les-3", title: "2.1 Advanced Implementation Patterns", duration: "22:10", durationSec: 1330, videoUrl: DEMO_VIDEOS[2] },
  { id: "les-4", title: "2.2 Production Build & Deployment", duration: "20:30", durationSec: 1230, videoUrl: DEMO_VIDEOS[3] },
];

export default function VideoPlayer({ course, onClose, onProgressUpdate }) {
  const rawId = course?.courseId || course?.id || course?.code || "java-fs";
  const courseData = useMemo(() => getCourseByIdOrCode(rawId), [rawId]);

  const courseId = courseData?.id || rawId.toLowerCase();
  const courseTitle = courseData?.title || course?.title || "Enrolled Course";
  const currentModule = courseData?.modules?.[0]?.title ? `Module 1: ${courseData.modules[0].title}` : (course?.currentModule || "Module 1");

  // Construct real syllabus playlist from course modules and topics
  const playlist = useMemo(() => {
    if (!courseData || !Array.isArray(courseData.modules) || courseData.modules.length === 0) {
      return FALLBACK_PLAYLIST;
    }

    const items = [];
    courseData.modules.forEach((mod, modIdx) => {
      (mod.topics || []).forEach((topic, topIdx) => {
        items.push({
          id: topic.id,
          title: `M${mod.moduleNumber || modIdx + 1}.${topIdx + 1} ${topic.title}`,
          rawTitle: topic.title,
          moduleTitle: `Module ${mod.moduleNumber || modIdx + 1}: ${mod.title}`,
          duration: topic.duration || "45 mins",
          durationSec: topic.durationSec || 2700,
          videoUrl: topic.videoUrl || DEMO_VIDEOS[(modIdx + topIdx) % DEMO_VIDEOS.length],
          skills: topic.skills || [],
        });
      });
    });

    return items.length > 0 ? items : FALLBACK_PLAYLIST;
  }, [courseData]);

  // Load saved topic progress from studentApi
  const [topicProgress, setTopicProgress] = useState(() => {
    const all = studentApi.getAllTopicProgress();
    return all[courseId] || { lastAccessedTopicId: null, topics: {} };
  });

  // Determine initial active topic
  const [activeLesson, setActiveLesson] = useState(() => {
    if (course?.selectedTopicId) {
      const found = playlist.find((p) => p.id === course.selectedTopicId);
      if (found) return found;
    }
    const all = studentApi.getAllTopicProgress();
    const cProg = all[courseId];
    if (cProg?.lastAccessedTopicId) {
      const found = playlist.find((p) => p.id === cProg.lastAccessedTopicId);
      if (found) return found;
    }
    return playlist[0];
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

  // Restore playback on active lesson change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackRate;
    }
    studentApi.setLastAccessedTopic(courseId, activeLesson.id);
  }, [activeLesson.id, courseId, playbackRate]);

  // Save progress handler
  const saveProgress = useCallback(
    async (markCompleted = false) => {
      try {
        const status = markCompleted ? "completed" : "in-progress";
        const res = await studentApi.updateTopicProgress({
          courseId,
          topicId: activeLesson.id,
          status,
        });

        // Update local state
        const all = studentApi.getAllTopicProgress();
        setTopicProgress(all[courseId] || {});

        setSavedIndicator(true);
        setTimeout(() => setSavedIndicator(false), 2000);

        if (onProgressUpdate && res?.metrics) {
          onProgressUpdate(res.metrics.overallProgressPercent);
        }
      } catch (err) {
        console.warn("Failed to save topic progress:", err);
      }
    },
    [activeLesson.id, courseId, onProgressUpdate]
  );

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
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

  const currentIdx = playlist.findIndex((l) => l.id === activeLesson.id);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < playlist.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      saveProgress(false);
      setActiveLesson(playlist[currentIdx - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      saveProgress(false);
      setActiveLesson(playlist[currentIdx + 1]);
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

  const isCurrentLessonCompleted =
    topicProgress?.topics?.[activeLesson.id]?.status === "completed";

  return (
    <div className="player-modal-backdrop">
      <div className="player-window" ref={playerContainerRef}>
        {/* Header */}
        <header className="player-top-nav">
          <div className="player-course-meta">
            <span className="player-tag">SYLLABUS LESSON</span>
            <div>
              <h3 className="player-heading">{courseTitle}</h3>
              <p className="player-subheading">
                {activeLesson.moduleTitle || currentModule} • {activeLesson.rawTitle || activeLesson.title}
              </p>
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
              <span>{playlistOpen ? "Hide Playlist" : "Show Syllabus"}</span>
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
                <span>Interactive Learning Stream</span> • TX-Pathwing LMS
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

                  <button type="button" className="ctrl-action-btn" onClick={handlePrev} disabled={!hasPrev} title="Previous Topic">
                    <SkipBack size={17} />
                  </button>

                  <button type="button" className="ctrl-action-btn" onClick={handleNext} disabled={!hasNext} title="Next Topic">
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
                    onClick={() => saveProgress(!isCurrentLessonCompleted)}
                  >
                    <CheckCircle size={15} />
                    <span>{isCurrentLessonCompleted ? "Topic Completed ✓" : "Mark as Completed"}</span>
                  </button>

                  <button type="button" className="ctrl-action-btn" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson details description */}
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
          </div>

          {/* Playlist drawer */}
          {playlistOpen && (
            <aside className="player-playlist-panel">
              <div className="playlist-title-bar">
                <h5>Syllabus Topics</h5>
                <span>{playlist.length} Topics</span>
              </div>

              <div className="playlist-items-scroll">
                {playlist.map((les, idx) => {
                  const isCurrent = les.id === activeLesson.id;
                  const isDone = topicProgress?.topics?.[les.id]?.status === "completed";

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
          )}
        </div>
      </div>
    </div>
  );
}
