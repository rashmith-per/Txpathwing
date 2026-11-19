import { useState, useRef, useEffect, useCallback } from "react";
import { analyzeVideoFrameForFaces } from "../services/faceDetectionEngine.service";
import { drawFaceOverlay } from "../services/proctoringOverlay.service";
import { initMediaStream, setupAudioAnalyser } from "../services/proctoringMedia.service";

export function useProctoring(isExamActive) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const [faceDetectionState, setFaceDetectionState] = useState("single");
  const [faceConfidence, setFaceConfidence] = useState(98);
  const [simulatedMode, setSimulatedMode] = useState("live");
  const [warningMessage, setWarningMessage] = useState("");
  const [tabSwitches, setTabSwitches] = useState(0);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const audioHandleRef = useRef(null);
  const historyRef = useRef(["single", "single", "single"]);

  const forceSingleCandidateResume = useCallback(() => {
    historyRef.current = ["single", "single", "single", "single", "single"];
    setFaceDetectionState("single");
    setFaceConfidence(98);
    setWarningMessage("");
  }, []);

  const stopCameraAndMic = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
      audioHandleRef.current = null;
    }
    if (overlayCanvasRef.current) {
      const ctx = overlayCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      }
    }
    setCameraActive(false);
    setCameraStarting(false);
    setMicActive(false);
    setAudioLevel(0);
  }, []);

  const attachStreamToVideo = useCallback(async (stream) => {
    if (!videoRef.current || !stream) return;
    if (videoRef.current.srcObject !== stream) {
      videoRef.current.srcObject = stream;
    }
    try {
      await videoRef.current.play();
    } catch (playErr) {
      console.warn("Video play warning:", playErr);
    }
  }, []);

  const startCameraAndMic = useCallback(async () => {
    setCameraStarting(true);
    setCameraError("");

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const { stream, hasAudio } = await initMediaStream();

      streamRef.current = stream;
      setMicActive(hasAudio);
      setCameraActive(true);
      setCameraStarting(false);
      setCameraError("");

      await attachStreamToVideo(stream);

      if (hasAudio && stream.getAudioTracks().length > 0) {
        audioHandleRef.current = setupAudioAnalyser(stream, setAudioLevel);
      }
    } catch (err) {
      console.warn("Media stream init error:", err);
      setCameraActive(false);
      setCameraStarting(false);
      setCameraError(err.message || "Camera access denied. Click Retry to allow webcam.");
    }
  }, [attachStreamToVideo]);

  useEffect(() => {
    if (isExamActive) {
      startCameraAndMic();
    } else {
      stopCameraAndMic();
    }

    return () => {
      stopCameraAndMic();
    };
  }, [isExamActive, startCameraAndMic, stopCameraAndMic]);

  useEffect(() => {
    if (isExamActive && cameraActive && streamRef.current && videoRef.current) {
      attachStreamToVideo(streamRef.current);
    }
  }, [cameraActive, isExamActive, attachStreamToVideo]);

  useEffect(() => {
    if (!isExamActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => {
          const next = prev + 1;
          setWarningMessage(`⚠️ Tab switch detected! Proctored incident #${next}. Please remain focused on exam.`);
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isExamActive]);

  useEffect(() => {
    if (!isExamActive) return;

    let nativeDetector = null;
    let nativeSupported = false;

    if (typeof window !== "undefined" && "FaceDetector" in window) {
      try {
        nativeDetector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 4 });
        nativeSupported = true;
      } catch {
        nativeSupported = false;
      }
    }

    const detectionInterval = setInterval(async () => {
      if (!isExamActive) return;

      if (simulatedMode !== "live") {
        setFaceDetectionState(simulatedMode);
        if (simulatedMode === "none") {
          setFaceConfidence(0);
          drawFaceOverlay(overlayCanvasRef.current, [], "none");
          setWarningMessage("⚠️ Proctored Alert: No face detected in frame! Please look at the camera.");
        } else if (simulatedMode === "multiple") {
          setFaceConfidence(94);
          drawFaceOverlay(
            overlayCanvasRef.current,
            [
              { x: 0.12, y: 0.2, width: 0.3, height: 0.55 },
              { x: 0.56, y: 0.22, width: 0.3, height: 0.55 }
            ],
            "multiple"
          );
          setWarningMessage("⚠️ Proctored Alert: Multiple faces detected! Only the registered student is permitted.");
        } else {
          setFaceConfidence(98);
          drawFaceOverlay(overlayCanvasRef.current, [{ x: 0.32, y: 0.18, width: 0.36, height: 0.62 }], "single");
          setWarningMessage("");
        }
        return;
      }

      if (!cameraActive || !videoRef.current || videoRef.current.readyState < 2) {
        return;
      }

      let detectedCount = null;
      let detectedBoxes = [];
      let confidence = 96;

      if (canvasRef.current) {
        const cvResult = analyzeVideoFrameForFaces(videoRef.current, canvasRef.current);
        if (cvResult) {
          detectedCount = cvResult.count;
          detectedBoxes = cvResult.boxes || [];
          confidence = cvResult.confidence || 96;
        }
      }

      if (nativeSupported && nativeDetector) {
        try {
          const nativeFaces = await nativeDetector.detect(videoRef.current);
          if (nativeFaces && nativeFaces.length >= 2) {
            detectedCount = Math.max(detectedCount || 0, nativeFaces.length);
          } else if (nativeFaces && nativeFaces.length === 1 && (detectedCount === null || detectedCount === 0)) {
            detectedCount = 1;
          }
        } catch {
          nativeSupported = false;
        }
      }

      if (detectedCount === null) return;

      const stateSample = detectedCount === 0 ? "none" : detectedCount >= 2 ? "multiple" : "single";
      historyRef.current = [...historyRef.current.slice(-2), stateSample];

      let multipleCount = 0;
      let noneCount = 0;
      historyRef.current.forEach((s) => {
        if (s === "multiple") multipleCount++;
        else if (s === "none") noneCount++;
      });

      let smoothedState = "single";
      if (multipleCount >= 2) {
        smoothedState = "multiple";
      } else if (noneCount >= 3) {
        smoothedState = "none";
      } else {
        smoothedState = "single";
      }

      setFaceDetectionState(smoothedState);
      setFaceConfidence(smoothedState === "none" ? 0 : confidence);
      drawFaceOverlay(overlayCanvasRef.current, detectedBoxes, smoothedState);

      if (smoothedState === "none") {
        setWarningMessage("⚠️ Proctored Alert: No face detected in camera frame! Please stay in front of the webcam.");
      } else if (smoothedState === "multiple") {
        setWarningMessage("⚠️ Proctored Alert: Multiple faces detected in frame! Only one candidate is allowed.");
      } else {
        setWarningMessage("");
      }
    }, 300);

    return () => clearInterval(detectionInterval);
  }, [simulatedMode, cameraActive, isExamActive]);

  return {
    cameraActive,
    cameraStarting,
    cameraError,
    micActive,
    audioLevel,
    faceDetectionState,
    faceConfidence,
    simulatedMode,
    setSimulatedMode,
    warningMessage,
    setWarningMessage,
    tabSwitches,
    videoRef,
    canvasRef,
    overlayCanvasRef,
    startCameraAndMic,
    stopCameraAndMic,
    forceSingleCandidateResume
  };
}
