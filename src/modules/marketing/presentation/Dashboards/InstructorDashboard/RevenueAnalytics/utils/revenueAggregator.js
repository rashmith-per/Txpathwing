import {
  parseDateKey,
  shiftDateKey,
  extractTransactionDateKey,
  formatShortDayLabel,
  formatMonthLabel,
  formatINR
} from "./revenueFormatters";
import { computeGrowthDelta, buildDayKeys, buildMonthKeys, shiftMonthKey } from "./dateWindowUtils";

export function aggregateRevenueAnalytics({
  transactions = [],
  instructorId,
  window: dateWindow,
  courses = [],
  batches = []
}) {
  if (!instructorId) {
    throw new Error("Instructor identity is required to access revenue analytics.");
  }

  const courseLookup = new Map(courses.map((c) => [c.id, c]));
  const batchLookup = new Map(batches.map((b) => [b.id, b]));

  // Strict authorization scoping: only retain transactions belonging to the authenticated instructor
  const instructorTx = transactions.filter((tx) => tx && tx.instructorId === instructorId);
  const paidInstructorTx = instructorTx.filter((tx) => tx.status === "paid");

  const { startDateStr, endDateStr, prevStartDateStr, prevEndDateStr, granularity } = dateWindow;

  const currentPaidTx = paidInstructorTx.filter((tx) => {
    const key = extractTransactionDateKey(tx);
    return key >= startDateStr && key <= endDateStr;
  });

  const previousPaidTx = paidInstructorTx.filter((tx) => {
    const key = extractTransactionDateKey(tx);
    return key >= prevStartDateStr && key <= prevEndDateStr;
  });

  const currentRefundedCount = instructorTx.filter((tx) => {
    const key = extractTransactionDateKey(tx);
    return tx.status === "refunded" && key >= startDateStr && key <= endDateStr;
  }).length;

  const sumMetrics = (list) => {
    return list.reduce(
      (acc, tx) => {
        const net = Number(tx.netAmount ?? tx.net_amount ?? 0);
        const gross = Number(tx.grossAmount ?? tx.gross_amount ?? net);
        acc.net += net;
        acc.gross += gross;
        acc.count += 1;
        return acc;
      },
      { net: 0, gross: 0, count: 0 }
    );
  };

  const currTotals = sumMetrics(currentPaidTx);
  const prevTotals = sumMetrics(previousPaidTx);

  // Latest active calendar month bounded within [startDateStr, endDateStr]
  const latestMonthKey = endDateStr.slice(0, 7);
  const prevCalendarMonthKey = shiftMonthKey(latestMonthKey, -1);

  const currentMonthInFilterNet = currentPaidTx
    .filter((tx) => extractTransactionDateKey(tx).slice(0, 7) === latestMonthKey)
    .reduce((sum, tx) => sum + Number(tx.netAmount ?? 0), 0);

  // Compare against immediately preceding calendar month across instructor records
  const priorMonthNet = paidInstructorTx
    .filter((tx) => extractTransactionDateKey(tx).slice(0, 7) === prevCalendarMonthKey)
    .reduce((sum, tx) => sum + Number(tx.netAmount ?? 0), 0);

  const currAvgPerEnrollment =
    currTotals.count > 0 ? Math.round(currTotals.net / currTotals.count) : 0;
  const prevAvgPerEnrollment =
    prevTotals.count > 0 ? Math.round(prevTotals.net / prevTotals.count) : 0;

  const kpis = {
    totalRevenue: {
      value: currTotals.net,
      grossValue: currTotals.gross,
      formattedValue: formatINR(currTotals.net),
      delta: computeGrowthDelta(currTotals.net, prevTotals.net, "vs previous period"),
      subtitle: `Gross ${formatINR(currTotals.gross)} before platform fee`
    },
    monthlyRevenue: {
      value: currentMonthInFilterNet,
      monthLabel: formatMonthLabel(latestMonthKey),
      formattedValue: formatINR(currentMonthInFilterNet),
      delta: computeGrowthDelta(
        currentMonthInFilterNet,
        priorMonthNet,
        `vs ${formatMonthLabel(prevCalendarMonthKey)}`
      ),
      subtitle: `${formatMonthLabel(latestMonthKey)} net inside selected range`
    },
    totalTransactions: {
      value: currTotals.count,
      refundedCount: currentRefundedCount,
      formattedValue: currTotals.count.toLocaleString("en-IN"),
      delta: computeGrowthDelta(currTotals.count, prevTotals.count, "vs previous period"),
      subtitle:
        currentRefundedCount > 0
          ? `${currentRefundedCount} refunded excluded`
          : "Completed learner enrollments"
    },
    avgRevenuePerEnrollment: {
      value: currAvgPerEnrollment,
      formattedValue: formatINR(currAvgPerEnrollment),
      delta: computeGrowthDelta(currAvgPerEnrollment, prevAvgPerEnrollment, "vs previous period"),
      subtitle: "Net revenue per paid enrollment"
    }
  };

  // Chart 1: Revenue Over Time (Daily or Monthly buckets)
  let overTime;
  if (granularity === "daily") {
    const dayKeys = buildDayKeys(startDateStr, endDateStr);
    const dayMap = new Map(
      dayKeys.map((k) => [k, { net: 0, gross: 0, count: 0 }])
    );
    currentPaidTx.forEach((tx) => {
      const k = extractTransactionDateKey(tx);
      const bucket = dayMap.get(k);
      if (bucket) {
        bucket.net += Number(tx.netAmount ?? 0);
        bucket.gross += Number(tx.grossAmount ?? 0);
        bucket.count += 1;
      }
    });
    overTime = {
      granularity: "daily",
      keys: dayKeys,
      labels: dayKeys.map(formatShortDayLabel),
      netSeries: dayKeys.map((k) => dayMap.get(k).net),
      grossSeries: dayKeys.map((k) => dayMap.get(k).gross),
      txCounts: dayKeys.map((k) => dayMap.get(k).count)
    };
  } else {
    const monthKeys = buildMonthKeys(startDateStr, endDateStr);
    const monthMap = new Map(
      monthKeys.map((k) => [k, { net: 0, gross: 0, count: 0 }])
    );
    currentPaidTx.forEach((tx) => {
      const mKey = extractTransactionDateKey(tx).slice(0, 7);
      const bucket = monthMap.get(mKey);
      if (bucket) {
        bucket.net += Number(tx.netAmount ?? 0);
        bucket.gross += Number(tx.grossAmount ?? 0);
        bucket.count += 1;
      }
    });
    overTime = {
      granularity: "monthly",
      keys: monthKeys,
      labels: monthKeys.map(formatMonthLabel),
      netSeries: monthKeys.map((k) => monthMap.get(k).net),
      grossSeries: monthKeys.map((k) => monthMap.get(k).gross),
      txCounts: monthKeys.map((k) => monthMap.get(k).count)
    };
  }

  // Chart 2: Monthly Revenue Comparison (filtered months + prior month comparison baseline)
  const filteredMonthKeys = buildMonthKeys(startDateStr, endDateStr);
  const allMonthNetTotals = new Map();
  paidInstructorTx.forEach((tx) => {
    const mKey = extractTransactionDateKey(tx).slice(0, 7);
    if (mKey) {
      allMonthNetTotals.set(
        mKey,
        (allMonthNetTotals.get(mKey) || 0) + Number(tx.netAmount ?? 0)
      );
    }
  });

  const filteredMonthSums = new Map(filteredMonthKeys.map((m) => [m, 0]));
  currentPaidTx.forEach((tx) => {
    const mKey = extractTransactionDateKey(tx).slice(0, 7);
    if (filteredMonthSums.has(mKey)) {
      filteredMonthSums.set(mKey, filteredMonthSums.get(mKey) + Number(tx.netAmount ?? 0));
    }
  });

  const monthlyComparison = {
    keys: filteredMonthKeys,
    labels: filteredMonthKeys.map(formatMonthLabel),
    currentSeries: filteredMonthKeys.map((m) => filteredMonthSums.get(m) || 0),
    priorBaselineSeries: filteredMonthKeys.map(
      (m) => allMonthNetTotals.get(shiftMonthKey(m, -1)) || 0
    )
  };

  // Chart 3: Revenue by Course (Doughnut with percentages)
  const courseAccumulator = new Map();
  currentPaidTx.forEach((tx) => {
    const cId = tx.courseId || "crs-unassigned";
    const matchedCourse = courseLookup.get(cId);
    const title = matchedCourse?.title || tx.courseTitle || "Other Course";
    const code = matchedCourse?.code || tx.courseCode || "COURSE";
    const prev = courseAccumulator.get(cId) || {
      courseId: cId,
      code,
      title,
      netRevenue: 0,
      grossRevenue: 0,
      transactions: 0
    };
    prev.netRevenue += Number(tx.netAmount ?? 0);
    prev.grossRevenue += Number(tx.grossAmount ?? 0);
    prev.transactions += 1;
    courseAccumulator.set(cId, prev);
  });

  const byCourse = Array.from(courseAccumulator.values())
    .sort((a, b) => b.netRevenue - a.netRevenue)
    .map((item) => ({
      ...item,
      percentage:
        currTotals.net > 0
          ? Number(((item.netRevenue / currTotals.net) * 100).toFixed(1))
          : 0
    }));

  // Chart 4: Revenue by Batch (Bar)
  const batchAccumulator = new Map();
  currentPaidTx.forEach((tx) => {
    const bId = tx.batchId || "batch-self";
    const matchedBatch = batchLookup.get(bId);
    const name =
      matchedBatch?.name ||
      tx.batchName ||
      (bId === "batch-self" ? "Direct / Self-Paced Enrollment" : "Unassigned Cohort");
    const code =
      matchedBatch?.code ||
      tx.batchCode ||
      (bId === "batch-self" ? "SELF-PACED" : bId);
    const courseName = matchedBatch?.courseName || tx.courseTitle || "";

    const prev = batchAccumulator.get(bId) || {
      batchId: bId,
      code,
      name,
      courseName,
      netRevenue: 0,
      transactions: 0
    };
    prev.netRevenue += Number(tx.netAmount ?? 0);
    prev.transactions += 1;
    batchAccumulator.set(bId, prev);
  });

  const byBatch = Array.from(batchAccumulator.values()).sort(
    (a, b) => b.netRevenue - a.netRevenue
  );

  return {
    instructorId,
    window: dateWindow,
    isEmpty: currentPaidTx.length === 0,
    transactionCount: currentPaidTx.length,
    kpis,
    charts: {
      overTime,
      monthlyComparison,
      byCourse,
      byBatch
    }
  };
}

