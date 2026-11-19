export function drawFaceOverlay(overlayCanvas, boxes, status) {
  if (!overlayCanvas) return;
  const W = overlayCanvas.width || 300;
  const H = overlayCanvas.height || 200;
  const ctx = overlayCanvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, W, H);
  if (!boxes || boxes.length === 0) return;

  const strokeColor = status === "single" ? "#22c55e" : "#ef4444";
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2.5;

  boxes.forEach((box) => {
    const mirroredX = 1 - (box.x + box.width);
    const rx = Math.max(12, mirroredX * W);
    const ry = Math.max(12, box.y * H);
    const rw = Math.min(W - rx - 12, box.width * W);
    const rh = Math.min(H - ry - 12, box.height * H);
    const corner = 14;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(rx, ry + corner);
    ctx.lineTo(rx, ry);
    ctx.lineTo(rx + corner, ry);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(rx + rw - corner, ry);
    ctx.lineTo(rx + rw, ry);
    ctx.lineTo(rx + rw, ry + corner);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(rx, ry + rh - corner);
    ctx.lineTo(rx, ry + rh);
    ctx.lineTo(rx + corner, ry + rh);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(rx + rw - corner, ry + rh);
    ctx.lineTo(rx + rw, ry + rh);
    ctx.lineTo(rx + rw, ry + rh - corner);
    ctx.stroke();
  });
}
