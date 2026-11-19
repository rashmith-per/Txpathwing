import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { X, ListVideo } from "lucide-react";
import { getCourseByIdOrCode, DEMO_VIDEOS } from "../services/courseCatalogue.data.js";
import { studentApi } from "../services/studentApi";
import { VideoControls } from "./components/VideoControls";
import { VideoPlaylistSidebar } from "./components/VideoPlaylistSidebar";
import { VideoLessonInfo } from "./components/VideoLessonInfo";
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

  const [topicProgress, setTopicProgress] = useState(() => {
    const all = studentApi.getAllTopicProgress();
    return all[courseId] || { lastAccessedTopicId: null, topics: {} };
  });

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
  const [savedIndicator, setSavedIndicator] = useState(false);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackRate;
    }
    studentApi.setLastAccessedTopic(courseId, activeLesson.id);
  }, [activeLesson.id, courseId, playbackRate]);

  const saveProgress = useCallback(
    async (markCompleted = false) => {
      try {
        const status = markCompleted ? "completed" : "in-progress";
        const res = await studentApi.updateTopicProgress({
          courseId,
          topicId: activeLesson.id,
          status,
        });
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
    if (videoRef.current) videoRef.current.currentTime = val;
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
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const changeRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
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

        <div className="player-content-split">
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

            <VideoControls
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              handlePrev={handlePrev}
              hasPrev={hasPrev}
              handleNext={handleNext}
              hasNext={hasNext}
              isMuted={isMuted}
              toggleMute={toggleMute}
              volume={volume}
              handleVolume={handleVolume}
              currentTime={currentTime}
              duration={duration}
              handleSeek={handleSeek}
              formatTime={formatTime}
              speed={playbackRate}
              changeSpeed={changeRate}
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
              isCurrentLessonCompleted={isCurrentLessonCompleted}
              handleMarkComplete={() => saveProgress(!isCurrentLessonCompleted)}
            />

            <VideoLessonInfo activeLesson={activeLesson} />
          </div>

          {playlistOpen && (
            <VideoPlaylistSidebar
              playlist={playlist}
              activeLesson={activeLesson}
              topicProgress={topicProgress}
              onSelectLesson={(les) => {
                saveProgress(false);
                setActiveLesson(les);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
