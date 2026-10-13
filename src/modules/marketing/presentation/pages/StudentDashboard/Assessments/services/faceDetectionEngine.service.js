/**
 * Real-Time Canvas Computer Vision Face Detector
 * Analyzes webcam video frames using YCbCr + RGB skin chrominance,
 * local facial feature edge contrast, and connected-component blob clustering.
 */
export function analyzeVideoFrameForFaces(videoEl, canvasEl) {
  if (!videoEl || !canvasEl || videoEl.readyState < 2 || videoEl.videoWidth === 0) {
    return null;
  }

  const W = 160;
  const H = 120;
  if (canvasEl.width !== W) canvasEl.width = W;
  if (canvasEl.height !== H) canvasEl.height = H;

  const ctx = canvasEl.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  // Draw current video frame onto analysis canvas
  ctx.drawImage(videoEl, 0, 0, W, H);
  const frameData = ctx.getImageData(0, 0, W, H).data;

  // 1. Check overall brightness & variance (detect covered or black camera)
  let totalY = 0;
  let sumSqY = 0;
  const numPixels = W * H;
  const lumaMap = new Float32Array(numPixels);
  const skinMask = new Uint8Array(numPixels);

  for (let i = 0, p = 0; i < frameData.length; i += 4, p++) {
    const r = frameData[i];
    const g = frameData[i + 1];
    const b = frameData[i + 2];

    // YCbCr conversion
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

    lumaMap[p] = y;
    totalY += y;
    sumSqY += y * y;

    // Human skin tone criteria in YCbCr + RGB ratio across diverse skin tones & webcam lighting
    const isYCbCrSkin =
      y > 28 &&
      y < 242 &&
      cb >= 74 &&
      cb <= 134 &&
      cr >= 131 &&
      cr <= 182 &&
      cr > cb &&
      cr - cb >= 10;

    const isRgbSkin =
      r > 45 &&
      g > 25 &&
      b > 15 &&
      r > g &&
      r > b &&
      Math.max(r, g, b) - Math.min(r, g, b) > 12;

    if (isYCbCrSkin && isRgbSkin) {
      skinMask[p] = 1;
    }
  }

  const meanY = totalY / numPixels;
  const varianceY = Math.max(0, sumSqY / numPixels - meanY * meanY);
  const stdY = Math.sqrt(varianceY);

  // Camera lens covered, shutter closed, or pitch black room
  if (meanY < 18 || stdY < 7) {
    return { count: 0, boxes: [], confidence: 0, reason: "Camera covered or too dark" };
  }

  // 2. Partition into a 20 x 15 grid (8x8 pixel cells) and compute skin density & edge contrast
  const GRID_W = 20;
  const GRID_H = 15;
  const CELL = 8;
  const cellSkin = new Uint8Array(GRID_W * GRID_H);
  const cellEdge = new Float32Array(GRID_W * GRID_H);

  for (let gy = 0; gy < GRID_H; gy++) {
    for (let gx = 0; gx < GRID_W; gx++) {
      let skinCount = 0;
      let edgeSum = 0;

      for (let py = gy * CELL; py < (gy + 1) * CELL; py++) {
        for (let px = gx * CELL; px < (gx + 1) * CELL; px++) {
          const idx = py * W + px;
          if (skinMask[idx]) skinCount++;

          if (px < W - 1 && py < H - 1) {
            const dx = Math.abs(lumaMap[idx] - lumaMap[idx + 1]);
            const dy = Math.abs(lumaMap[idx] - lumaMap[idx + W]);
            edgeSum += dx + dy;
          }
        }
      }

      const cellIdx = gy * GRID_W + gx;
      // Mark cell if >= 30% of pixels are skin-toned
      if (skinCount >= 19) {
        cellSkin[cellIdx] = 1;
      }
      cellEdge[cellIdx] = edgeSum / (CELL * CELL);
    }
  }

  // 3. Connected-Component Labeling (8-connectivity BFS) on grid
  const visited = new Uint8Array(GRID_W * GRID_H);
  const blobs = [];

  for (let gy = 0; gy < GRID_H; gy++) {
    for (let gx = 0; gx < GRID_W; gx++) {
      const idx = gy * GRID_W + gx;
      if (!cellSkin[idx] || visited[idx]) continue;

      // New candidate face cluster
      let minGx = gx;
      let maxGx = gx;
      let minGy = gy;
      let maxGy = gy;
      let cellCount = 0;
      let totalEdgeInBlob = 0;

      const queue = [idx];
      visited[idx] = 1;

      while (queue.length > 0) {
        const curr = queue.shift();
        const cy = Math.floor(curr / GRID_W);
        const cx = curr % GRID_W;
        cellCount++;
        totalEdgeInBlob += cellEdge[curr];

        if (cx < minGx) minGx = cx;
        if (cx > maxGx) maxGx = cx;
        if (cy < minGy) minGy = cy;
        if (cy > maxGy) maxGy = cy;

        // 8 Neighbors
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = cy + dy;
            const nx = cx + dx;
            if (nx >= 0 && nx < GRID_W && ny >= 0 && ny < GRID_H) {
              const nidx = ny * GRID_W + nx;
              if (cellSkin[nidx] && !visited[nidx]) {
                visited[nidx] = 1;
                queue.push(nidx);
              }
            }
          }
        }
      }

      const blobW = maxGx - minGx + 1;
      const blobH = maxGy - minGy + 1;
      const aspectRatio = blobH / Math.max(1, blobW);
      const avgEdge = totalEdgeInBlob / Math.max(1, cellCount);

      // A genuine human face blob has:
      // - Minimum 4 cells (not isolated noise pixel)
      // - Plausible portrait aspect ratio (0.75 - 2.5)
      // - Internal facial feature edge contrast (eyes, nose, mouth create edge variation > 4.5)
      if (cellCount >= 4 && aspectRatio >= 0.75 && aspectRatio <= 2.6 && avgEdge >= 4.5) {
        blobs.push({
          x: minGx / GRID_W,
          y: minGy / GRID_H,
          width: blobW / GRID_W,
          height: blobH / GRID_H,
          cellCount,
          avgEdge
        });
      }
    }
  }

  // Deduplicate overlapping blobs
  blobs.sort((a, b) => b.cellCount - a.cellCount);
  const detectedFaces = [];

  blobs.forEach((b) => {
    const overlaps = detectedFaces.some((existing) => {
      const xOverlap = Math.max(0, Math.min(b.x + b.width, existing.x + existing.width) - Math.max(b.x, existing.x));
      const yOverlap = Math.max(0, Math.min(b.y + b.height, existing.y + existing.height) - Math.max(b.y, existing.y));
      return (xOverlap * yOverlap) > (b.width * b.height * 0.4);
    });
    if (!overlaps && detectedFaces.length < 4) {
      detectedFaces.push(b);
    }
  });

  const count = detectedFaces.length;
  let confidence = 0;
  if (count === 1) {
    confidence = Math.min(99, Math.max(92, Math.round(85 + detectedFaces[0].cellCount * 1.2)));
  } else if (count > 1) {
    confidence = 94;
  }

  return {
    count,
    boxes: detectedFaces,
    confidence
  };
}
