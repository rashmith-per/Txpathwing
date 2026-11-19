/**
 * Pure formatters, date window resolvers, and revenue aggregation utilities.
 * Decoupled from React and Chart.js so all business math can run cleanly in Node unit tests.
 */

export const DATE_RANGE_PRESETS = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "14d", label: "Last 14 days", days: 14 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "6m", label: "Last 6 months", days: 180 },
  { id: "custom", label: "Custom range", days: null }
];

const MONTH_SHORT_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Format numeric amount consistently in Indian Rupees (₹).
 * @param {number} amount
 * @returns {string}
 */
export function formatINR(amount) {
  const safeNum = Number(amount);
  if (!Number.isFinite(safeNum)) return "₹0";
  const rounded = Math.round(safeNum);
  const absFormatted = Math.abs(rounded).toLocaleString("en-IN");
  return rounded < 0 ? `-₹${absFormatted}` : `₹${absFormatted}`;
}

/**
 * Format compact INR ticks for chart axes (e.g., ₹45K, ₹1.8L).
 * @param {number} amount
 * @returns {string}
 */
export function formatCompactINR(amount) {
  const safeNum = Number(amount);
  if (!Number.isFinite(safeNum) || safeNum === 0) return "₹0";
  const abs = Math.abs(safeNum);
  const sign = safeNum < 0 ? "-" : "";
  if (abs >= 100000) {
    return `${sign}₹${(abs / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  }
  if (abs >= 1000) {
    return `${sign}₹${(abs / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `${sign}₹${Math.round(abs)}`;
}

/**
 * Format local YYYY-MM-DD key from a Date or parseable string.
 * @param {Date|string} input
 * @returns {string}
 */
export function formatDateKey(input) {
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
    return input.trim();
  }
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Parse a YYYY-MM-DD key into a local midnight Date.
 * @param {string} dateKey
 * @returns {Date}
 */
export function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Shift a YYYY-MM-DD key by deltaDays.
 * @param {string} dateKey
 * @param {number} deltaDays
 * @returns {string}
 */
export function shiftDateKey(dateKey, deltaDays) {
  const d = parseDateKey(dateKey);
  d.setDate(d.getDate() + deltaDays);
  return formatDateKey(d);
}

/**
 * Extract YYYY-MM-DD date key from a transaction record.
 * @param {Object} tx
 * @returns {string}
 */
export function extractTransactionDateKey(tx) {
  if (!tx) return "";
  if (tx.paidDate && /^\d{4}-\d{2}-\d{2}$/.test(tx.paidDate)) {
    return tx.paidDate;
  }
  const isoSource = tx.paidAt || tx.paid_at || tx.createdAt;
  return isoSource ? formatDateKey(isoSource) : "";
}

/**
 * Format YYYY-MM-DD key as human-readable label (e.g., "11 Nov").
 * @param {string} dateKey
 * @returns {string}
 */
export function formatShortDayLabel(dateKey) {
  const [, month, day] = dateKey.split("-").map(Number);
  return `${String(day).padStart(2, "0")} ${MONTH_SHORT_NAMES[(month || 1) - 1]}`;
}

/**
 * Format YYYY-MM month key as "Nov 2026".
 * @param {string} monthKey
 * @returns {string}
 */
export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return `${MONTH_SHORT_NAMES[(month || 1) - 1]} ${year}`;
}

/**
 * Resolve date window bounds and comparison window for a preset or custom filter.
 * @param {Object} params
 * @param {"7d"|"14d"|"30d"|"6m"|"custom"} [params.preset]
 * @param {string} [params.customStart]
 * @param {string} [params.customEnd]
 * @param {Date|string} [referenceDate]
 * @returns {Object}
 */

export * from "./dateWindowUtils";
export * from "./revenueAggregator";
