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
      <rect width="100%" height="100%" fill="url(#java-bg)" />
      
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

      <path d="M0,130 L400,130 M0,150 L400,150 M100,0 L100,170 M300,0 L300,170" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
      <circle cx="200" cy="85" r="75" fill="url(#java-glow)" />

      <g transform="translate(160, 32)" filter="url(#glow-filter)">
        <path d="M30,35 C38,20 22,10 32,-2 C36,-7 42,-5 42,-5" fill="none" stroke="url(#java-orange)" strokeWidth="3" strokeLinecap="round" />
        <path d="M45,35 C55,18 38,10 48,-5 C52,-11 58,-8 58,-8" fill="none" stroke="url(#java-orange)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M58,35 C66,22 52,14 62,2 C65,-2 70,0 70,0" fill="none" stroke="url(#java-orange)" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M15,44 L65,44 C65,65 57,80 40,80 C23,80 15,65 15,44 Z" fill="none" stroke="url(#java-orange)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M65,48 C76,48 76,68 63,68" fill="none" stroke="url(#java-orange)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M8,84 L72,84" fill="none" stroke="url(#java-orange)" strokeWidth="4" strokeLinecap="round" />
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

      <path d="M40,20 L120,20 L150,50 L150,110" fill="none" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />
      <path d="M360,150 L280,150 L250,120 L250,60" fill="none" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.4" />

      <circle cx="200" cy="85" r="75" fill="url(#py-glow)" />

      <g transform="translate(155, 38)">
        <path
          d="M 45,3 L 30,3 C 18,3 8,13 8,25 L 8,36 L 45,36 L 45,42 L 0,42 L 0,25 C 0,8 14,0 30,0 L 45,0 Z"
          fill="url(#py-blue)"
        />
        <circle cx="22" cy="12" r="3.5" fill="#ffffff" />

        <path
          d="M 45,87 L 60,87 C 72,87 82,77 82,65 L 82,54 L 45,54 L 45,48 L 90,48 L 90,65 C 90,82 76,90 60,90 L 45,90 Z"
          fill="url(#py-yellow)"
        />
        <circle cx="68" cy="78" r="3.5" fill="#ffffff" />
      </g>
    </svg>
  );
}

// 3. Web Development / React Banner
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

      <g transform="translate(145, 36)" filter="url(#web-neon)">
        <path d="M 32,25 L 8,48 L 32,71" fill="none" stroke="url(#web-cyan)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 64,18 L 46,78" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 78,25 L 102,48 L 78,71" fill="none" stroke="url(#web-cyan)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
