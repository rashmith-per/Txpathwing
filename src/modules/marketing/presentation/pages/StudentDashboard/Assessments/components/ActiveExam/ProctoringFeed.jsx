import React from "react";
import {
  Video,
  Camera,
  VideoOff,
  RefreshCw,
  Eye,
  UserCheck,
  Users,
  UserX,
  CheckCircle2,
  AlertTriangle,
  Mic,
  MicOff
} from "lucide-react";

export default function ProctoringFeed({
  cameraActive,
  cameraStarting,
  cameraError,
  micActive,
  audioLevel,
  faceDetectionState,
  faceConfidence,
  simulatedMode,
  setSimulatedMode,
  videoRef,
  canvasRef,
  overlayCanvasRef,
  onRetryCamera
}) {
  return (
    <aside className="proctoring-panel">
      <div className="proctoring-card">
        <div className="proctoring-header">
          <div className="proctoring-title-group">
            <Video size={17} color="#2563eb" />
            <h3 className="proctoring-title">Proctoring</h3>
          </div>
          <span className="badge-monitoring">Monitoring</span>
        </div>

        {/* Live Camera Feed */}
        <div className="camera-feed-box">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            className="proctoring-video"
            style={{ display: cameraActive ? "block" : "none" }}
          />

          {/* Hidden pixel analysis canvas */}
          <canvas ref={canvasRef} className="proctoring-canvas" />

          {/* Live AI Face Tracking Bounding-Box Overlay Canvas */}
          <canvas
            ref={overlayCanvasRef}
            width={280}
            height={200}
            className="proctoring-overlay-canvas"
            style={{ display: cameraActive ? "block" : "none" }}
          />

          {/* Fallback placeholder when camera is starting or permission blocked */}
          {!cameraActive && (
            <div className="no-cam-placeholder">
              {cameraStarting ? (
                <>
                  <Camera size={28} className="cam-pulse-icon" />
                  <span>Starting live camera...</span>
                </>
              ) : (
                <>
                  <VideoOff size={26} color="#ef4444" />
                  <span>{cameraError || "Camera permission required"}</span>
                  <button
                    type="button"
                    className="btn-retry-cam"
                    onClick={onRetryCamera}
                  >
                    <RefreshCw size={12} />
                    <span>Enable Camera</span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* REC Pulsating Badge */}
          <div className="rec-badge">
            <span className="rec-dot" />
            <span>REC</span>
          </div>

          {/* Dashed Oval Face Guide with Center Eye */}
          <div className="face-guide-overlay">
            <div
              className={`dashed-oval-frame ${
                faceDetectionState === "single"
                  ? "valid"
                  : faceDetectionState === "none" || faceDetectionState === "multiple"
                  ? "warning"
                  : ""
              }`}
            >
              <Eye size={22} />
            </div>
          </div>

          {/* Live Detection Pill inside Bottom of Camera Box */}
          {cameraActive && (
            <div
              className={`cam-live-status-pill ${
                faceDetectionState === "single" ? "pill-ok" : "pill-err"
              }`}
            >
              <span className="cam-pill-dot" />
              <span>
                {faceDetectionState === "single"
                  ? `Face Detected (${faceConfidence}%)`
                  : faceDetectionState === "multiple"
                  ? "Multiple Faces Detected!"
                  : "No Face Detected!"}
              </span>
            </div>
          )}
        </div>

        {/* Proctoring Validations List */}
        <div className="proctoring-validations-list">
          {/* 1. Identity Verified */}
          <div className="validation-row">
            <div className="validation-left">
              <UserCheck size={16} color="#64748b" />
              <span>Identity verified</span>
            </div>
            <div className="validation-right status-valid">
              <span>✓ 13:58 IST</span>
            </div>
          </div>

          {/* 2. Face Detection Validation */}
          <div className="validation-row">
            <div className="validation-left">
              {faceDetectionState === "single" ? (
                <UserCheck size={16} color="#16a34a" />
              ) : faceDetectionState === "multiple" ? (
                <Users size={16} color="#dc2626" />
              ) : (
                <UserX size={16} color="#dc2626" />
              )}
              <span>
                {faceDetectionState === "single"
                  ? "Single face in frame"
                  : faceDetectionState === "multiple"
                  ? "Multiple faces in frame"
                  : "No face detected"}
              </span>
            </div>
            <div
              className={`validation-right ${
                faceDetectionState === "single" ? "status-valid" : "status-error"
              }`}
            >
              {faceDetectionState === "single" ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertTriangle size={15} />
              )}
            </div>
          </div>

          {/* 3. Microphone Active */}
          <div className="validation-row">
            <div className="validation-left">
              {micActive ? (
                <Mic size={16} color="#64748b" />
              ) : (
                <MicOff size={16} color="#dc2626" />
              )}
              <span>Microphone active</span>
            </div>
            <div className="validation-right">
              <div className="audio-meter-bar" title="Live audio monitor">
                <div
                  className="meter-line"
                  style={{ height: `${Math.max(4, (audioLevel * 0.4) % 12)}px` }}
                />
                <div
                  className="meter-line"
                  style={{ height: `${Math.max(6, (audioLevel * 0.8) % 12)}px` }}
                />
                <div
                  className="meter-line"
                  style={{ height: `${Math.max(3, (audioLevel * 0.6) % 12)}px` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Test & Simulation Controls Toolbar */}
        <div className="proctoring-test-toolbar">
          <span className="test-toolbar-header">Camera Detection Mode</span>
          <div className="test-btn-group">
            <button
              type="button"
              className={`test-btn ${simulatedMode === "live" ? "active" : ""}`}
              onClick={() => setSimulatedMode("live")}
            >
              📷 Live Camera AI
            </button>
            <button
              type="button"
              className={`test-btn ${simulatedMode === "single" ? "active" : ""}`}
              onClick={() => setSimulatedMode("single")}
            >
              ✓ 1 Face (Normal)
            </button>
            <button
              type="button"
              className={`test-btn ${simulatedMode === "none" ? "active" : ""}`}
              onClick={() => setSimulatedMode("none")}
            >
              ⚠️ 0 Faces (No Face)
            </button>
            <button
              type="button"
              className={`test-btn ${simulatedMode === "multiple" ? "active" : ""}`}
              onClick={() => setSimulatedMode("multiple")}
            >
              ⚠️ 2+ Faces (Multiple)
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
