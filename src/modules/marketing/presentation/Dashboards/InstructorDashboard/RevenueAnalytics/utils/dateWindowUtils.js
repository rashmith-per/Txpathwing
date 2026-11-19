import { DATE_RANGE_PRESETS, formatDateKey, parseDateKey, shiftDateKey } from "./revenueFormatters";

export { DATE_RANGE_PRESETS };

export function resolveDateWindow(
  { preset = "30d", customStart = "", customEnd = "" } = {},
  referenceDate = new Date()
) {
  const todayKey = formatDateKey(referenceDate);

  let startDateStr;
  let endDateStr = todayKey;

  if (preset === "custom") {
    if (!customStart || !customEnd) {
      return {
        isValid: false,
        error: "Select both start and end dates for a custom range.",
        preset
      };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(customStart) || !/^\d{4}-\d{2}-\d{2}$/.test(customEnd)) {
      return {
        isValid: false,
        error: "Invalid custom date format.",
        preset
      };
    }
    if (customStart > customEnd) {
      return {
        isValid: false,
        error: "Start date must be on or before end date.",
        preset
      };
    }
    startDateStr = customStart;
    endDateStr = customEnd;
  } else if (preset === "6m") {
    const endParsed = parseDateKey(todayKey);
    const sixMonthsStart = new Date(
      endParsed.getFullYear(),
      endParsed.getMonth() - 5,
      1,
      0,
      0,
      0,
      0
    );
    startDateStr = formatDateKey(sixMonthsStart);
  } else {
    const presetMeta = DATE_RANGE_PRESETS.find((p) => p.id === preset);
    const days = presetMeta?.days || 30;
    startDateStr = shiftDateKey(todayKey, -(days - 1));
  }

  const startMs = parseDateKey(startDateStr).getTime();
  const endMs = parseDateKey(endDateStr).getTime();
  const daysCount = Math.max(1, Math.round((endMs - startMs) / 86400000) + 1);

  const prevEndDateStr = shiftDateKey(startDateStr, -1);
  const prevStartDateStr = shiftDateKey(prevEndDateStr, -(daysCount - 1));

  return {
    isValid: true,
    error: null,
    preset,
    startDateStr,
    endDateStr,
    prevStartDateStr,
    prevEndDateStr,
    daysCount,
    granularity: daysCount > 45 ? "monthly" : "daily"
  };
}

export function computeGrowthDelta(current, previous, comparisonText = "vs prior period") {
  const curr = Number(current) || 0;
  const prev = Number(previous) || 0;

  const rawPct =
    prev === 0
      ? (curr > 0 ? 100 : 0)
      : ((curr - prev) / Math.abs(prev)) * 100;

  const rounded = Number(rawPct.toFixed(1));
  const direction = rounded > 0 ? "up" : rounded < 0 ? "down" : "flat";
  const tone = rounded > 0 ? "positive" : rounded < 0 ? "danger" : "neutral";
  const prefix = rounded > 0 ? "▲ +" : rounded < 0 ? "▼ " : "● ";

  return {
    percent: rounded,
    label: `${prefix}${rounded}% ${comparisonText}`,
    tone,
    direction
  };
}

export function buildDayKeys(startDateStr, endDateStr) {
  const result = [];
  let cursor = startDateStr;
  let guard = 0;
  while (cursor <= endDateStr && guard < 800) {
    result.push(cursor);
    cursor = shiftDateKey(cursor, 1);
    guard += 1;
  }
  return result;
}

export function buildMonthKeys(startDateStr, endDateStr) {
  const start = parseDateKey(startDateStr);
  const end = parseDateKey(endDateStr);
  const result = [];
  let y = start.getFullYear();
  let m = start.getMonth();
  const endY = end.getFullYear();
  const endM = end.getMonth();

  let guard = 0;
  while ((y < endY || (y === endY && m <= endM)) && guard < 60) {
    result.push(`${y}-${String(m + 1).padStart(2, "0")}`);
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    guard += 1;
  }
  return result;
}

export function shiftMonthKey(monthKey, deltaMonths) {
  const [y, m] = monthKey.split("-").map(Number);
  const d = new Date(y, m - 1 + deltaMonths, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
