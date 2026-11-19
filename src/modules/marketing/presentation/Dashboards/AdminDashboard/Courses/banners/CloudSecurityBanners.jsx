import React from "react";

// 1. Cloud & AWS Banner
export function BannerCloud() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloud-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#07152b" />
          <stop offset="60%" stopColor="#0d2c54" />
          <stop offset="100%" stopColor="#061730" />
        </linearGradient>
        <linearGradient id="cloud-neon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <radialGradient id="cloud-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#cloud-bg)" />

      <g stroke="#1e3a8a" strokeWidth="0.7" opacity="0.35">
        <line x1="0" y1="130" x2="400" y2="130" />
        <line x1="0" y1="145" x2="400" y2="145" />
        <line x1="0" y1="160" x2="400" y2="160" />
        <line x1="120" y1="120" x2="40" y2="170" />
        <line x1="180" y1="120" x2="150" y2="170" />
        <line x1="220" y1="120" x2="250" y2="170" />
        <line x1="280" y1="120" x2="360" y2="170" />
      </g>

      <circle cx="200" cy="85" r="75" fill="url(#cloud-glow)" />

      <g transform="translate(138, 28)" filter="url(#neon-glow)">
        <path
          d="M 32,78 
             C 14,78 0,64 0,48 
             C 0,33 11,20 25,18 
             C 32,6 48,-2 64,1 
             C 76,3 87,11 92,22 
             C 96,20 102,19 107,19 
             C 122,19 134,31 134,46 
             C 134,47 134,48 134,50 
             C 142,52 148,60 148,69 
             C 148,79 140,87 130,87 
             L 32,87 Z"
          fill="none"
          stroke="url(#cloud-neon)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 74,80 L 74,42 M 60,54 L 74,38 L 88,54"
          fill="none"
          stroke="url(#cloud-neon)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// 2. Cybersecurity Banner
export function BannerSecurity() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sec-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#040b17" />
          <stop offset="50%" stopColor="#0a1f3d" />
          <stop offset="100%" stopColor="#030813" />
        </linearGradient>
        <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <radialGradient id="sec-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
        <filter id="shield-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#sec-bg)" />

      <g stroke="#0284c7" strokeWidth="1" opacity="0.35">
        <path d="M60,40 L120,40 L140,65" fill="none" />
        <circle cx="60" cy="40" r="2.5" fill="#38bdf8" />
        <path d="M340,40 L280,40 L260,65" fill="none" />
        <circle cx="340" cy="40" r="2.5" fill="#38bdf8" />
        <path d="M50,130 L110,130 L140,105" fill="none" />
        <circle cx="50" cy="130" r="2.5" fill="#38bdf8" />
        <path d="M350,130 L290,130 L260,105" fill="none" />
        <circle cx="350" cy="130" r="2.5" fill="#38bdf8" />
        <circle cx="200" cy="85" r="68" fill="none" stroke="#0369a1" strokeDasharray="4 4" />
        <circle cx="200" cy="85" r="95" fill="none" stroke="#0369a1" strokeDasharray="3 5" opacity="0.5" />
      </g>

      <circle cx="200" cy="85" r="75" fill="url(#sec-glow)" />

      <g transform="translate(162, 32)" filter="url(#shield-glow)">
        <path
          d="M 38,4 L 72,16 C 72,56 54,82 38,94 C 22,82 4,56 4,16 Z"
          fill="#0c2340"
          stroke="url(#cyan-glow)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M 28,45 L 28,34 C 28,28 48,28 48,34 L 48,45"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="23" y="44" width="30" height="24" rx="4" fill="#ffffff" />
        <circle cx="38" cy="53" r="2.5" fill="#0c2340" />
        <path d="M 36.5,53 L 39.5,53 L 40,62 L 36,62 Z" fill="#0c2340" />
      </g>
    </svg>
  );
}
