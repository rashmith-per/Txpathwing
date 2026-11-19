import React from "react";

// 1. Data Science Banner
export function BannerDataScience() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ds-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#041412" />
          <stop offset="60%" stopColor="#0a2a24" />
          <stop offset="100%" stopColor="#03120f" />
        </linearGradient>
        <linearGradient id="ds-bar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <radialGradient id="ds-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <filter id="ds-neon" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#ds-bg)" />

      <g stroke="#064e3b" strokeWidth="0.8" opacity="0.4">
        <line x1="30" y1="40" x2="370" y2="40" />
        <line x1="30" y1="75" x2="370" y2="75" />
        <line x1="30" y1="110" x2="370" y2="110" />
        <line x1="30" y1="140" x2="370" y2="140" strokeWidth="1.5" stroke="#047857" />
      </g>

      <circle cx="200" cy="90" r="80" fill="url(#ds-glow)" />

      <g transform="translate(85, 25)" filter="url(#ds-neon)">
        <rect x="25" y="70" width="22" height="45" rx="4" fill="url(#ds-bar)" />
        <rect x="60" y="50" width="22" height="65" rx="4" fill="url(#ds-bar)" />
        <rect x="95" y="60" width="22" height="55" rx="4" fill="url(#ds-bar)" />
        <rect x="130" y="30" width="22" height="85" rx="4" fill="url(#ds-bar)" />
        <rect x="165" y="42" width="22" height="73" rx="4" fill="url(#ds-bar)" />
        <rect x="200" y="10" width="22" height="105" rx="4" fill="url(#ds-bar)" />

        <path
          d="M 36,65 Q 71,45 106,55 T 141,25 T 176,38 T 211,8"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <circle cx="36" cy="65" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <circle cx="71" cy="45" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <circle cx="106" cy="55" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <circle cx="141" cy="25" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <circle cx="176" cy="38" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <circle cx="211" cy="8" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

// 2. UI/UX Design Banner
export function BannerDesign() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ui-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#190d2e" />
          <stop offset="60%" stopColor="#2b1156" />
          <stop offset="100%" stopColor="#140826" />
        </linearGradient>
        <radialGradient id="ui-glow" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#ui-bg)" />

      <circle cx="240" cy="85" r="85" fill="url(#ui-glow)" />

      <rect x="50" y="30" width="90" height="110" rx="10" fill="#2d1754" opacity="0.4" />
      <rect x="60" y="42" width="70" height="16" rx="4" fill="#4c1d95" opacity="0.6" />
      <rect x="60" y="66" width="30" height="24" rx="4" fill="#4c1d95" opacity="0.5" />
      <rect x="96" y="66" width="34" height="24" rx="4" fill="#4c1d95" opacity="0.5" />

      <g transform="translate(130, 22)">
        <rect x="0" y="0" width="70" height="126" rx="12" fill="#0f0720" stroke="#7c3aed" strokeWidth="2.5" />
        <rect x="24" y="4" width="22" height="4" rx="2" fill="#7c3aed" />
        <circle cx="20" cy="24" r="7" fill="#8b5cf6" />
        <rect x="34" y="20" width="24" height="8" rx="3" fill="#a78bfa" />
        <rect x="12" y="38" width="46" height="28" rx="6" fill="#3b0764" stroke="#6d28d9" strokeWidth="1" />
        <rect x="12" y="72" width="46" height="16" rx="4" fill="#4c1d95" />
        <rect x="12" y="94" width="46" height="16" rx="4" fill="#4c1d95" />
      </g>

      <g transform="translate(245, 60)" filter="url(#purple-glow)">
        <rect x="-10" y="-10" width="105" height="64" rx="14" fill="#3b0764" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.85" />
        <text
          x="42"
          y="34"
          fill="#ffffff"
          fontSize="26"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1"
          textAnchor="middle"
        >
          UI/UX
        </text>
      </g>
    </svg>
  );
}

// 3. Business & Management Banner
export function BannerBusiness() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="biz-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0f05" />
          <stop offset="50%" stopColor="#2e1a06" />
          <stop offset="100%" stopColor="#140b02" />
        </linearGradient>
        <linearGradient id="biz-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id="biz-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <filter id="biz-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#biz-bg)" />

      <g stroke="#78350f" strokeWidth="0.8" opacity="0.3">
        <line x1="20" y1="40" x2="380" y2="40" />
        <line x1="20" y1="80" x2="380" y2="80" />
        <line x1="20" y1="120" x2="380" y2="120" />
      </g>

      <circle cx="200" cy="85" r="75" fill="url(#biz-glow)" />

      <g transform="translate(155, 30)" filter="url(#biz-filter)">
        <path d="M 30,34 L 30,22 C 30,16 60,16 60,22 L 60,34" fill="none" stroke="url(#biz-gold)" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="10" y="34" width="70" height="50" rx="8" fill="#3b2308" stroke="url(#biz-gold)" strokeWidth="3.5" />
        <line x1="10" y1="58" x2="80" y2="58" stroke="url(#biz-gold)" strokeWidth="2.5" />
        <rect x="36" y="52" width="18" height="12" rx="3" fill="#fef08a" />
        <path d="M 75,30 L 98,8 M 80,8 L 98,8 L 98,26" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
