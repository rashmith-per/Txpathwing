export async function initMediaStream() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Webcam API not available in this browser.");
  }

  let stream = null;
  let hasAudio = true;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      audio: true
    });
  } catch {
    hasAudio = false;
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      audio: false
    });
  }

  return { stream, hasAudio };
}

export function setupAudioAnalyser(stream, onLevelUpdate) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animId = null;

    const updateAudioMeter = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avg = sum / dataArray.length;
      onLevelUpdate(Math.min(100, Math.max(15, avg * 1.5)));
      animId = requestAnimationFrame(updateAudioMeter);
    };
    updateAudioMeter();

    return {
      audioCtx,
      cancel: () => {
        if (animId) cancelAnimationFrame(animId);
        audioCtx.close().catch(() => {});
      }
    };
  } catch (err) {
    console.warn("Audio meter init issue:", err);
    return null;
  }
}
