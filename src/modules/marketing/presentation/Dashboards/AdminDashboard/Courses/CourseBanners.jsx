import React from "react";

// 1. Java Banner
export function BannerJava() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="java-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#070c18" />
          <stop offset="60%" stopColor="#0c1d38" />
          <stop offset="100%" stopColor="#081427" />
        </linearGradient>
        <linearGradient id="java-orange" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="java-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background */}
      <rect width="100%" height="100%" fill="url(#java-bg)" />
      
      {/* Matrix code lines in background */}
      <g fill="#1e3a8a" opacity="0.3" fontSize="10" fontFamily="monospace">
        <text x="20" y="30">public class Application &#123;</text>
        <text x="35" y="48">public static void main(String[] args) &#123;</text>
        <text x="50" y="66">SpringApplication.run(App.class);</text>
        <text x="35" y="84">&#125;</text>
        <text x="20" y="102">&#125;</text>
        <text x="270" y="40">@RestController</text>
        <text x="270" y="58">@RequestMapping</text>
        <text x="270" y="76">ResponseEntity&lt;?&gt;</text>
        <text x="270" y="94">docker-compose.yml</text>
      </g>

      {/* Subtle Grid */}
      <path d="M0,130 L400,130 M0,150 L400,150 M100,0 L100,170 M300,0 L300,170" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />

      {/* Central Orange Radial Glow */}
      <circle cx="200" cy="85" r="75" fill="url(#java-glow)" />

      {/* Java Coffee Cup and Steam */}
      <g transform="translate(160, 32)" filter="url(#glow-filter)">
        {/* Steam Wisps */}
        <path d="M30,35 C38,20 22,10 32,-2 C36,-7 42,-5 42,-5" fill="none" stroke="url(#java-orange)" strokeWidth="3" strokeLinecap="round" />
        <path d="M45,35 C55,18 38,10 48,-5 C52,-11 58,-8 58,-8" fill="none" stroke="url(#java-orange)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M58,35 C66,22 52,14 62,2 C65,-2 70,0 70,0" fill="none" stroke="url(#java-orange)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Coffee Cup Body */}
        <path d="M15,44 L65,44 C65,65 57,80 40,80 C23,80 15,65 15,44 Z" fill="none" stroke="url(#java-orange)" strokeWidth="4" strokeLinejoin="round" />
        {/* Cup Handle */}
        <path d="M65,48 C76,48 76,68 63,68" fill="none" stroke="url(#java-orange)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Saucer */}
        <path d="M8,84 L72,84" fill="none" stroke="url(#java-orange)" strokeWidth="4" strokeLinecap="round" />
        {/* Cup Inner coffee level */}
        <path d="M22,50 Q40,55 58,50" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
      </g>
    </svg>
  );
}

// 2. Python / Full Stack Banner
export function BannerPython() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="py-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#061124" />
          <stop offset="50%" stopColor="#0b2342" />
          <stop offset="100%" stopColor="#05152e" />
        </linearGradient>
        <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <radialGradient id="py-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#py-bg)" />

      {/* Cyber circuitry lines */}
      <path d="M40,20 L120,20 L150,50 L150,110" fill="none" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
      <path d="M360,150 L280,150 L250,120 L250,60" fill="none" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
      <circle cx="120" cy="20" r="3" fill="#38bdf8" opacity="0.6" />
      <circle cx="280" cy="150" r="3" fill="#fbbf24" opacity="0.6" />

      {/* Blue Radial Glow */}
      <circle cx="200" cy="85" r="80" fill="url(#py-glow)" />

      {/* Python Logo */}
      <g transform="translate(162, 34) scale(0.95)">
        {/* Top / Blue Snake */}
        <path
          d="M 39.8,2 C 18.2,2 19.3,11.3 19.3,11.3 L 19.3,21 L 40.4,21 L 40.4,24.1 L 10.9,24.1 C 10.9,24.1 2,22.9 2,44.7 C 2,66.5 9.7,64.2 9.7,64.2 L 15.6,64.2 L 15.6,56.1 C 15.6,56.1 15.3,46.5 25.1,46.5 L 46.1,46.5 C 46.1,46.5 54.8,46.8 54.8,38.3 L 54.8,10.5 C 54.8,10.5 56.4,2 39.8,2 Z"
          fill="url(#py-blue)"
        />
        <circle cx="28" cy="10" r="3" fill="#ffffff" />

        {/* Bottom / Yellow Snake */}
        <path
          d="M 41.5,82 C 63.1,82 62,72.7 62,72.7 L 62,63 L 40.9,63 L 40.9,59.9 L 70.4,59.9 C 70.4,59.9 79.3,61.1 79.3,39.3 C 79.3,17.5 71.6,19.8 71.6,19.8 L 65.7,19.8 L 65.7,27.9 C 65.7,27.9 66,37.5 56.2,37.5 L 35.2,37.5 C 35.2,37.5 26.5,37.2 26.5,45.7 L 26.5,73.5 C 26.5,73.5 24.9,82 41.5,82 Z"
          fill="url(#py-yellow)"
        />
        <circle cx="53" cy="74" r="3" fill="#1e293b" />
      </g>
    </svg>
  );
}

// 3. Cloud Fundamentals & AWS Banner
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

      {/* Perspective Grid Floor */}
      <g stroke="#1e3a8a" strokeWidth="0.7" opacity="0.35">
        <line x1="0" y1="130" x2="400" y2="130" />
        <line x1="0" y1="145" x2="400" y2="145" />
        <line x1="0" y1="160" x2="400" y2="160" />
        <line x1="120" y1="120" x2="40" y2="170" />
        <line x1="180" y1="120" x2="150" y2="170" />
        <line x1="220" y1="120" x2="250" y2="170" />
        <line x1="280" y1="120" x2="360" y2="170" />
      </g>

      {/* Soft Glow */}
      <circle cx="200" cy="85" r="75" fill="url(#cloud-glow)" />

      {/* Cloud with Up Arrow */}
      <g transform="translate(138, 28)" filter="url(#neon-glow)">
        {/* Cloud Outline */}
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

        {/* Upward Arrow Inside */}
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

// 4. Cybersecurity Banner
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

      {/* Cyber Circuit traces radiating */}
      <g stroke="#0284c7" strokeWidth="1" opacity="0.35">
        <path d="M60,40 L120,40 L140,65" fill="none" />
        <circle cx="60" cy="40" r="2.5" fill="#38bdf8" />
        <path d="M340,40 L280,40 L260,65" fill="none" />
        <circle cx="340" cy="40" r="2.5" fill="#38bdf8" />
        <path d="M50,130 L110,130 L140,105" fill="none" />
        <circle cx="50" cy="130" r="2.5" fill="#38bdf8" />
        <path d="M350,130 L290,130 L260,105" fill="none" />
        <circle cx="350" cy="130" r="2.5" fill="#38bdf8" />
        {/* Concentric subtle radar rings */}
        <circle cx="200" cy="85" r="68" fill="none" stroke="#0369a1" strokeDasharray="4 4" />
        <circle cx="200" cy="85" r="95" fill="none" stroke="#0369a1" strokeDasharray="3 5" opacity="0.5" />
      </g>

      {/* Blue Radial Glow */}
      <circle cx="200" cy="85" r="75" fill="url(#sec-glow)" />

      {/* Shield and Lock */}
      <g transform="translate(162, 32)" filter="url(#shield-glow)">
        {/* Shield Frame */}
        <path
          d="M 38,4 L 72,16 C 72,56 54,82 38,94 C 22,82 4,56 4,16 Z"
          fill="#0c2340"
          stroke="url(#cyan-glow)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Inner Lock Shackle */}
        <path
          d="M 28,45 L 28,34 C 28,28 48,28 48,34 L 48,45"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Lock Body */}
        <rect x="23" y="44" width="30" height="24" rx="4" fill="#ffffff" />
        {/* Keyhole */}
        <circle cx="38" cy="53" r="2.5" fill="#0c2340" />
        <path d="M 36.5,53 L 39.5,53 L 40,62 L 36,62 Z" fill="#0c2340" />
      </g>
    </svg>
  );
}

// 5. Data Science Banner
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

      {/* Grid Lines */}
      <g stroke="#064e3b" strokeWidth="0.8" opacity="0.4">
        <line x1="30" y1="40" x2="370" y2="40" />
        <line x1="30" y1="75" x2="370" y2="75" />
        <line x1="30" y1="110" x2="370" y2="110" />
        <line x1="30" y1="140" x2="370" y2="140" strokeWidth="1.5" stroke="#047857" />
      </g>

      {/* Soft Glow */}
      <circle cx="200" cy="90" r="80" fill="url(#ds-glow)" />

      {/* 3D Vertical Bar Chart */}
      <g transform="translate(85, 25)" filter="url(#ds-neon)">
        {/* Bar 1 */}
        <rect x="25" y="70" width="22" height="45" rx="4" fill="url(#ds-bar)" />
        {/* Bar 2 */}
        <rect x="60" y="50" width="22" height="65" rx="4" fill="url(#ds-bar)" />
        {/* Bar 3 */}
        <rect x="95" y="60" width="22" height="55" rx="4" fill="url(#ds-bar)" />
        {/* Bar 4 */}
        <rect x="130" y="30" width="22" height="85" rx="4" fill="url(#ds-bar)" />
        {/* Bar 5 */}
        <rect x="165" y="42" width="22" height="73" rx="4" fill="url(#ds-bar)" />
        {/* Bar 6 */}
        <rect x="200" y="10" width="22" height="105" rx="4" fill="url(#ds-bar)" />

        {/* Upward Growth Curve Line */}
        <path
          d="M 36,65 Q 71,45 106,55 T 141,25 T 176,38 T 211,8"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Data points */}
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

// 6. UI/UX Design Fundamentals Banner
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

      {/* Ambient Glow */}
      <circle cx="240" cy="85" r="85" fill="url(#ui-glow)" />

      {/* Floating UI Elements in background */}
      <rect x="50" y="30" width="90" height="110" rx="10" fill="#2d1754" opacity="0.4" />
      <rect x="60" y="42" width="70" height="16" rx="4" fill="#4c1d95" opacity="0.6" />
      <rect x="60" y="66" width="30" height="24" rx="4" fill="#4c1d95" opacity="0.5" />
      <rect x="96" y="66" width="34" height="24" rx="4" fill="#4c1d95" opacity="0.5" />

      {/* Mobile Device Frame in foreground */}
      <g transform="translate(130, 22)">
        <rect x="0" y="0" width="70" height="126" rx="12" fill="#0f0720" stroke="#7c3aed" strokeWidth="2.5" />
        {/* Notch */}
        <rect x="24" y="4" width="22" height="4" rx="2" fill="#7c3aed" />
        {/* Wireframe items */}
        <circle cx="20" cy="24" r="7" fill="#8b5cf6" />
        <rect x="34" y="20" width="24" height="8" rx="3" fill="#a78bfa" />
        <rect x="12" y="38" width="46" height="28" rx="6" fill="#3b0764" stroke="#6d28d9" strokeWidth="1" />
        <rect x="12" y="72" width="46" height="16" rx="4" fill="#4c1d95" />
        <rect x="12" y="94" width="46" height="16" rx="4" fill="#4c1d95" />
      </g>

      {/* "UI/UX" Glowing Typography Badge */}
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

// 7. Business & Management Banner
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

      {/* Grid Lines */}
      <g stroke="#78350f" strokeWidth="0.8" opacity="0.3">
        <line x1="20" y1="40" x2="380" y2="40" />
        <line x1="20" y1="80" x2="380" y2="80" />
        <line x1="20" y1="120" x2="380" y2="120" />
      </g>

      <circle cx="200" cy="85" r="75" fill="url(#biz-glow)" />

      {/* Briefcase & Growth Chart */}
      <g transform="translate(155, 30)" filter="url(#biz-filter)">
        {/* Briefcase Handle */}
        <path d="M 30,34 L 30,22 C 30,16 60,16 60,22 L 60,34" fill="none" stroke="url(#biz-gold)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Briefcase Body */}
        <rect x="10" y="34" width="70" height="50" rx="8" fill="#3b2308" stroke="url(#biz-gold)" strokeWidth="3.5" />
        {/* Horizontal Strap */}
        <line x1="10" y1="58" x2="80" y2="58" stroke="url(#biz-gold)" strokeWidth="2.5" />
        {/* Central Lock */}
        <rect x="36" y="52" width="18" height="12" rx="3" fill="#fef08a" />

        {/* Upward Growth Arrow */}
        <path d="M 75,30 L 98,8 M 80,8 L 98,8 L 98,26" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// 8. Web Development / React & Code Banner
export function BannerWeb() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="web-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#051026" />
          <stop offset="60%" stopColor="#0c234a" />
          <stop offset="100%" stopColor="#040b1a" />
        </linearGradient>
        <linearGradient id="web-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <radialGradient id="web-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
        <filter id="web-neon" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#web-bg)" />
      
      {/* Code matrix & tags in background */}
      <g fill="#164e63" opacity="0.4" fontSize="11" fontFamily="monospace">
        <text x="30" y="38">&lt;div className="app"&gt;</text>
        <text x="45" y="58">&lt;Header nav=&#123;true&#125; /&gt;</text>
        <text x="45" y="78">&lt;Routes&gt;&lt;Route /&gt;&lt;/Routes&gt;</text>
        <text x="30" y="98">&lt;/div&gt;</text>
        <text x="260" y="45">npm install react</text>
        <text x="260" y="68">const [data, set] = ...</text>
        <text x="260" y="91">useEffect(() =&gt; &#123;&#125;)</text>
      </g>

      <circle cx="200" cy="85" r="75" fill="url(#web-glow)" />

      {/* Code Brackets and Slash */}
      <g transform="translate(145, 36)" filter="url(#web-neon)">
        {/* Left Bracket < */}
        <path d="M 32,25 L 8,48 L 32,71" fill="none" stroke="url(#web-cyan)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Slash / */}
        <path d="M 64,18 L 46,78" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
        {/* Right Bracket > */}
        <path d="M 78,25 L 102,48 L 78,71" fill="none" stroke="url(#web-cyan)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// Automatically detect the best banner theme based on course title and category
export function detectBannerType(title = "", category = "") {
  const text = `${title} ${category}`.toLowerCase();

  // 1. Java & Backend
  if (text.includes("java") && !text.includes("javascript")) {
    return "java";
  }

  // 2. Data Science & AI & ML
  if (
    text.includes("data science") ||
    text.includes("machine learning") ||
    text.includes("deep learning") ||
    text.includes("artificial intelligence") ||
    text.includes("big data") ||
    text.includes("analytics") ||
    text.includes("data analytics")
  ) {
    return "datascience";
  }

  // 3. Cybersecurity & Ethical Hacking
  if (
    text.includes("cyber") ||
    text.includes("security") ||
    text.includes("hacking") ||
    text.includes("soc") ||
    text.includes("penetration") ||
    text.includes("network security") ||
    text.includes("infosec")
  ) {
    return "security";
  }

  // 4. Cloud Computing, AWS, Azure, DevOps
  if (
    text.includes("cloud") ||
    text.includes("aws") ||
    text.includes("azure") ||
    text.includes("devops") ||
    text.includes("docker") ||
    text.includes("kubernetes") ||
    text.includes("gcp")
  ) {
    return "cloud";
  }

  // 5. UI/UX & Design
  if (
    text.includes("ui/ux") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("design") ||
    text.includes("figma") ||
    text.includes("product design") ||
    text.includes("wireframe")
  ) {
    return "uiux";
  }

  // 6. Business, Finance, Management
  if (
    text.includes("business") ||
    text.includes("management") ||
    text.includes("marketing") ||
    text.includes("finance") ||
    text.includes("mba") ||
    text.includes("startup")
  ) {
    return "business";
  }

  // 7. Python & Django
  if (text.includes("python") && !text.includes("data science")) {
    return "python";
  }

  // 8. Full Stack, Web, React, Node, Frontend
  if (
    text.includes("full stack") ||
    text.includes("mern") ||
    text.includes("mean") ||
    text.includes("web") ||
    text.includes("react") ||
    text.includes("frontend") ||
    text.includes("backend") ||
    text.includes("node") ||
    text.includes("javascript")
  ) {
    return "fullstack";
  }

  // Category-based fallback
  const cat = (category || "").toLowerCase();
  if (cat.includes("program") || cat.includes("software") || cat.includes("web")) return "fullstack";
  if (cat.includes("data")) return "datascience";
  if (cat.includes("cloud")) return "cloud";
  if (cat.includes("security") || cat.includes("cyber")) return "security";
  if (cat.includes("design")) return "uiux";
  if (cat.includes("business")) return "business";

  return "cloud";
}

// Map helper to pick the vector card images matching each course
export function CourseBanner({ type, title = "", category = "", imageUrl = "", image = "" }) {
  // If user explicitly provided a custom image, show it
  const customImg = imageUrl || image;
  if (customImg && typeof customImg === "string" && (customImg.startsWith("http") || customImg.startsWith("data:"))) {
    return (
      <img
        src={customImg}
        alt={title || "Course banner"}
        className="adm-banner-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />
    );
  }

  // Otherwise, render the matching glowing vector card graphic based on course title & category!
  let resolvedKey = (type || "").toLowerCase();

  if (!resolvedKey || resolvedKey === "auto") {
    resolvedKey = detectBannerType(title, category);
  }

  switch (resolvedKey) {
    case "java":
      return <BannerJava />;
    case "python":
    case "fullstack":
      return <BannerPython />;
    case "web":
      return <BannerWeb />;
    case "cloud":
    case "aws":
      return <BannerCloud />;
    case "security":
    case "cyber":
    case "cybersecurity":
      return <BannerSecurity />;
    case "datascience":
    case "data":
    case "ai":
      return <BannerDataScience />;
    case "uiux":
    case "design":
      return <BannerDesign />;
    case "business":
      return <BannerBusiness />;
    default: {
      const fallback = detectBannerType(title, category);
      if (fallback === "java") return <BannerJava />;
      if (fallback === "datascience") return <BannerDataScience />;
      if (fallback === "security") return <BannerSecurity />;
      if (fallback === "uiux") return <BannerDesign />;
      if (fallback === "business") return <BannerBusiness />;
      if (fallback === "python" || fallback === "fullstack") return <BannerPython />;
      return <BannerCloud />;
    }
  }
}
