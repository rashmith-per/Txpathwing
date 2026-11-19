import { instructorProfile } from "./instructorProfile.data.js";

function toLocalCalendarDay(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createSeedRevenueTransactions(referenceDate = new Date()) {
  const anchor = new Date(referenceDate);
  const commissionRate = instructorProfile.platformCommissionRate / 100;

  const catalogEntries = [
    {
      courseId: "crs-inst-1",
      courseCode: "JAVA-FS",
      courseTitle: "Java Full Stack Development",
      grossAmount: 18999,
      batchId: "batch-1",
      batchCode: "JFS-26A",
      batchName: "Java Full Stack - Cohort 2026-Alpha"
    },
    {
      courseId: "crs-inst-2",
      courseCode: "AWS-DOP",
      courseTitle: "AWS DevOps Engineer Professional",
      grossAmount: 21999,
      batchId: "batch-2",
      batchCode: "AWS-26B",
      batchName: "AWS DevOps Masterclass - Cohort 2026-B"
    },
    {
      courseId: "crs-inst-3",
      courseCode: "REACT-FS",
      courseTitle: "React 19 & Next.js Full Stack Engineering",
      grossAmount: 15999,
      batchId: "batch-3",
      batchCode: "RCT-26W",
      batchName: "React 19 Next.js Weekend Accelerator"
    },
    {
      courseId: "crs-inst-4",
      courseCode: "MICRO-ARCH",
      courseTitle: "Distributed Microservices & Kubernetes Architecture",
      grossAmount: 24999,
      batchId: "batch-4",
      batchCode: "MIC-26W",
      batchName: "Distributed Microservices Winter Cohort"
    }
  ];

  // [daysAgo, catalogIndex, statusOverride, batchOverride]
  const scheduleOffsets = [
    // Last 7 days (days 0..6) - multiple daily records
    [0, 0, "paid", null],
    [0, 2, "paid", null],
    [1, 1, "paid", null],
    [1, 3, "paid", null],
    [2, 0, "paid", null],
    [3, 1, "paid", null],
    [3, 2, "paid", null],
    [4, 0, "paid", "batch-self"],
    [5, 2, "paid", null],
    [6, 1, "paid", null],
    [6, 3, "paid", null],

    // 8..14 days ago
    [7, 0, "paid", null],
    [8, 2, "paid", null],
    [9, 1, "paid", null],
    [10, 0, "paid", null],
    [11, 3, "paid", null],
    [12, 2, "refunded", null],
    [13, 1, "paid", null],

    // 15..30 days ago
    [15, 0, "paid", null],
    [17, 1, "paid", null],
    [19, 2, "paid", null],
    [21, 0, "paid", null],
    [23, 3, "paid", null],
    [25, 1, "paid", null],
    [27, 2, "paid", null],
    [29, 0, "paid", null],

    // Previous 30-day comparison window (31..60 days ago)
    [32, 0, "paid", null],
    [35, 1, "paid", null],
    [38, 2, "paid", null],
    [41, 0, "paid", null],
    [45, 3, "paid", null],
    [49, 1, "paid", null],
    [53, 2, "paid", "batch-self"],
    [58, 0, "paid", null],

    // Months 3 to 6 (61..175 days ago)
    [65, 1, "paid", null],
    [70, 0, "paid", null],
    [76, 2, "paid", null],
    [82, 3, "paid", null],
    [88, 0, "paid", null],
    [94, 1, "paid", null],
    [101, 2, "paid", null],
    [108, 0, "paid", null],
    [114, 1, "paid", null],
    [121, 3, "paid", null],
    [128, 0, "paid", null],
    [135, 2, "paid", null],
    [142, 1, "paid", null],
    [149, 0, "paid", null],
    [156, 2, "refunded", null],
    [163, 1, "paid", null],
    [170, 0, "paid", null],
    [176, 3, "paid", null],

    // Prior 6-month baseline records (185..220 days ago) for 6m period-over-period delta
    [190, 0, "paid", null],
    [200, 1, "paid", null],
    [210, 2, "paid", null],
    [220, 0, "paid", null]
  ];

  const learnerNames = [
    "Aarav Sharma", "Sneha Reddy", "Vikram Patel", "Pooja Varma",
    "Karthik Nair", "Meera Krishnan", "Rahul Verma", "Ananya Deshmukh",
    "Rohan Kulkarni", "Divya Menon", "Siddharth Joshi", "Neha Gupta"
  ];

  const records = scheduleOffsets.map(([daysAgo, entryIdx, status, batchOverride], idx) => {
    const entry = catalogEntries[entryIdx];
    const txDate = new Date(anchor.getTime());
    txDate.setDate(txDate.getDate() - daysAgo);
    txDate.setHours(9 + (idx % 10), (idx * 13) % 60, 0, 0);

    const platformFee = Math.round(entry.grossAmount * commissionRate);
    const netAmount = entry.grossAmount - platformFee;
    const isSelfPaced = batchOverride === "batch-self";

    return {
      id: `txn-inst-${String(idx + 1).padStart(3, "0")}`,
      instructorId: instructorProfile.id,
      courseId: entry.courseId,
      courseCode: entry.courseCode,
      courseTitle: entry.courseTitle,
      batchId: isSelfPaced ? "batch-self" : entry.batchId,
      batchCode: isSelfPaced ? "SELF-PACED" : entry.batchCode,
      batchName: isSelfPaced ? "Direct / Self-Paced Enrollment" : entry.batchName,
      studentName: learnerNames[idx % learnerNames.length],
      grossAmount: entry.grossAmount,
      platformFee,
      netAmount,
      currency: "INR",
      status,
      paidAt: txDate.toISOString(),
      paidDate: toLocalCalendarDay(txDate)
    };
  });

  // Unrelated instructor records included specifically to verify strict instructor-scoped filtering
  const otherDate = new Date(anchor.getTime());
  otherDate.setDate(otherDate.getDate() - 2);
  records.push(
    {
      id: "txn-other-001",
      instructorId: "inst-other-99",
      courseId: "crs-other-1",
      courseCode: "PY-DATA",
      courseTitle: "Other Instructor Data Science",
      batchId: "batch-other-1",
      batchCode: "OTH-26",
      batchName: "External Instructor Cohort",
      studentName: "External Learner",
      grossAmount: 45000,
      platformFee: 6750,
      netAmount: 38250,
      currency: "INR",
      status: "paid",
      paidAt: otherDate.toISOString(),
      paidDate: toLocalCalendarDay(otherDate)
    }
  );

  return records;
}

export const initialRevenueTransactions = createSeedRevenueTransactions();


