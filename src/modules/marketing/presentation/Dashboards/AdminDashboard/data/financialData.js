export const initialPayments = [
  {
    id: "pay-1",
    txnId: "TXN_PW_984102948",
    customer: "KITS Warangal",
    type: "Tenant Subscription",
    amount: "₹4,50,000",
    numericAmount: 450000,
    platformFee: "₹1,31,850",
    payoutAmount: "₹3,18,150",
    gateway: "Razorpay Enterprise",
    date: "14 Oct 2026, 14:22",
    status: "Successful",
    settlementStatus: "Settled",
    invoiceId: "INV-2026-1049"
  },
  {
    id: "pay-2",
    txnId: "TXN_PW_884210391",
    customer: "Deloitte USI Learning",
    type: "Course Licensing Batch",
    amount: "₹12,80,000",
    numericAmount: 1280000,
    platformFee: "₹3,75,000",
    payoutAmount: "₹9,05,000",
    gateway: "Stripe Connect",
    date: "12 Oct 2026, 11:05",
    status: "Successful",
    settlementStatus: "Settled",
    invoiceId: "INV-2026-1048"
  },
  {
    id: "pay-3",
    txnId: "TXN_PW_772910482",
    customer: "Aarav Sharma",
    type: "Individual Course Purchase",
    amount: "₹4,999",
    numericAmount: 4999,
    platformFee: "₹1,499",
    payoutAmount: "₹3,500",
    gateway: "Razorpay UPI",
    date: "15 Oct 2026, 09:14",
    status: "Successful",
    settlementStatus: "Pending Settlement",
    invoiceId: "INV-2026-1050"
  },
  {
    id: "pay-4",
    txnId: "TXN_PW_662810394",
    customer: "Tanvox Technologies",
    type: "Seat Add-on Pack",
    amount: "₹75,000",
    numericAmount: 75000,
    platformFee: "₹22,000",
    payoutAmount: "₹53,000",
    gateway: "HDFC NetBanking",
    date: "10 Oct 2026, 16:45",
    status: "Successful",
    settlementStatus: "Settled",
    invoiceId: "INV-2026-1042"
  },
  {
    id: "pay-5",
    txnId: "TXN_PW_551910283",
    customer: "Student Refund - R. Gupta",
    type: "Course Refund",
    amount: "-₹4,999",
    numericAmount: -4999,
    platformFee: "-₹1,499",
    payoutAmount: "-₹3,500",
    gateway: "Razorpay Refund",
    date: "08 Oct 2026, 18:30",
    status: "Refunded",
    settlementStatus: "Reconciled",
    invoiceId: "REF-2026-0031"
  }
];

export const initialSubscriptions = [
  {
    id: "sub-1",
    planName: "Enterprise LMS",
    monthlyPrice: "₹3,99,000",
    annualBilling: true,
    maxSeats: "Unlimited (Custom)",
    activeOrganizations: 4,
    features: ["Dedicated tenant data boundary", "Custom domain & white-label branding", "SSO (SAML 2.0 / Okta / Azure AD)", "DRM Video Protection & CDN", "Direct API & Webhook access", "24/7 dedicated Technical Account Manager"],
    status: "Active"
  },
  {
    id: "sub-2",
    planName: "Professional",
    monthlyPrice: "₹1,49,000",
    annualBilling: true,
    maxSeats: "Up to 2,000 learners",
    activeOrganizations: 16,
    features: ["Multi-tenant isolation", "Custom subdomain", "Integrated payment gateway", "Coding sandbox & auto-grader", "Standard email/SMS notifications", "Business hours support SLA"],
    status: "Active"
  },
  {
    id: "sub-3",
    planName: "Basic",
    monthlyPrice: "₹49,000",
    annualBilling: false,
    maxSeats: "Up to 500 learners",
    activeOrganizations: 12,
    features: ["Pathwing shared domain", "Course catalog access", "Basic student progress reports", "Standard certificate generation", "Community support"],
    status: "Active"
  }
];

export const initialCoupons = [
  {
    id: "cpn-1",
    code: "WELCOME10",
    discount: "10%",
    discountType: "Percentage",
    validUntil: "31 Dec 2026",
    usageCount: 342,
    maxUsage: 1000,
    status: "Active",
    description: "Introductory 10% discount for all newly registered students across platform courses."
  },
  {
    id: "cpn-2",
    code: "CAMPUS500",
    discount: "₹500 OFF",
    discountType: "Fixed Amount",
    validUntil: "15 Nov 2026",
    usageCount: 180,
    maxUsage: 250,
    status: "Active",
    description: "Exclusive student subsidy for university campus partner enrollments."
  },
  {
    id: "cpn-3",
    code: "SUMMER26",
    discount: "25%",
    discountType: "Percentage",
    validUntil: "31 Aug 2026",
    usageCount: 500,
    maxUsage: 500,
    status: "Expired",
    description: "Seasonal summer discount promotion for full stack tracks."
  },
  {
    id: "cpn-4",
    code: "DIWALI2026",
    discount: "20%",
    discountType: "Percentage",
    validUntil: "10 Nov 2026",
    usageCount: 64,
    maxUsage: 500,
    status: "Active",
    description: "Festival learning promotion applicable to all live bootcamp registrations."
  }
];
