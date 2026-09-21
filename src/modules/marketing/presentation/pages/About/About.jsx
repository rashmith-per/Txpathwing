import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Users, BookOpen, Star, TrendingUp, Target, Compass, CheckCircle2, Sparkles,
  ArrowRight, BadgeCheck, BriefcaseBusiness, HeartHandshake, Code2, Radio, Video, CalendarDays,
  Laptop, GraduationCap, Building2, Trophy, X, ShieldCheck, Globe2, Rocket
} from "lucide-react";
import "./About.css";
import txLogo from "../../../../../assets/tx-icon.jpg";

const HERO_STATS = [
  { icon: Users, value: "1000+", label: "Active Learners", bgClass: "stat-blue", iconColor: "#0284C7" },
  { icon: BookOpen, value: "Expert", label: "Mentors & Trainers", bgClass: "stat-teal", iconColor: "#0D9488" },
  { icon: Star, value: "100%", label: "Support & Guidance", bgClass: "stat-amber", iconColor: "#D97706" },
  { icon: TrendingUp, value: "Infinite", label: "Growth Opportunities", bgClass: "stat-purple", iconColor: "#9333EA" }
];
const ORBIT_NODES = [
  { label: "Start", short: "Start", emoji: "💻", angle: 0 }, { label: "Learning", short: "Learning", emoji: "🎓", angle: 60 },
  { label: "Practice", short: "Practice", emoji: "💪", angle: 120 }, { label: "Projects", short: "Projects", emoji: "🚀", angle: 180 },
  { label: "Skills", short: "Skills", emoji: "⚡", angle: 240 }, { label: "Career", short: "Career", emoji: "📈", angle: 300 }
];
const ORBIT_CYCLE_DURATION = 8000;

function AboutOrbitAnimation() {
  const [progress, setProgress] = useState(0);
  const [isHired, setIsHired] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [confetti, setConfetti] = useState([]);
  const animRef = useRef(null), startTimeRef = useRef(0), prevProgressRef = useRef(0), hiredTimerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loop = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const norm = ((timestamp - startTimeRef.current) % ORBIT_CYCLE_DURATION) / ORBIT_CYCLE_DURATION;
      if (prevProgressRef.current > 0.88 && norm < 0.12) {
        setIsHired(true);
        setConfetti(Array.from({ length: 14 }, (_, idx) => ({
          x: (Math.random() - 0.5) * 160, y: (Math.random() - 0.5) * 160, r: 4 + Math.random() * 6,
          c: ["#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#EFF6FF"][idx % 5], d: Math.random() * 360
        })));
        if (hiredTimerRef.current) window.clearTimeout(hiredTimerRef.current);
        hiredTimerRef.current = window.setTimeout(() => { setIsHired(false); setConfetti([]); }, 1800);
      }
      prevProgressRef.current = norm;
      setProgress(norm);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); if (hiredTimerRef.current) clearTimeout(hiredTimerRef.current); };
  }, []);

  const isMobile = windowWidth < 768, isTablet = windowWidth >= 768 && windowWidth < 1200;
  const stageSize = isMobile ? 340 : isTablet ? 410 : 490;
  const radius = Math.round(stageSize * 0.365);
  const nodeSize = isMobile ? 44 : isTablet ? 48 : 52, hubSize = isMobile ? 74 : isTablet ? 84 : 94;
  const viewBoxSize = 520, centerCoord = viewBoxSize / 2, svgRadius = 190;
  const activeNodeIdx = Math.floor(progress * ORBIT_NODES.length + 0.18);
  const headAngleRad = (-90 + progress * 360) * (Math.PI / 180);
  const headX = Math.cos(headAngleRad) * radius, headY = Math.sin(headAngleRad) * radius;
  const trailDots = [0.022, 0.045].map((offset) => {
    const angle = (-90 + ((progress - offset + 1) % 1) * 360) * (Math.PI / 180);
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });

  return (
    <div className="about-orbit-wrapper">
      <div className="about-orbit-box">
        <div className="about-orbit-stage" style={{ width: stageSize, height: stageSize }}>
          <svg className="about-orbit-svg" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
            <circle className="about-orbit-dash-bg" cx={centerCoord} cy={centerCoord} r={svgRadius} fill="none" stroke="#C7D9FF" strokeWidth="0.8" />
            <circle className="about-orbit-glow-stroke" cx={centerCoord} cy={centerCoord} r={svgRadius} fill="none" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * svgRadius} strokeDashoffset={2 * Math.PI * svgRadius * (1 - progress)} transform={`rotate(-90 ${centerCoord} ${centerCoord})`} />
          </svg>
          {ORBIT_NODES.map((item, idx) => {
            const rad = (-90 + item.angle) * (Math.PI / 180);
            const x = Math.cos(rad) * radius, y = Math.sin(rad) * radius;
            const isActive = idx <= activeNodeIdx, isCurrent = idx === activeNodeIdx;
            const pillDist = radius + (isMobile ? 32 : 42);
            const pillX = Math.cos(rad) * pillDist, pillY = Math.sin(rad) * pillDist;
            return (
              <div key={item.label} className="about-orbit-node-anchor" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, zIndex: isActive ? 3 : 2 }}>
                <div className={`about-orbit-node-bubble ${isActive ? "is-active" : ""} ${isCurrent && isActive ? "is-current" : ""}`} style={{ width: nodeSize, height: nodeSize }}>
                  <span className="about-orbit-emoji" style={{ fontSize: isMobile ? 18 : 22, filter: isActive ? "brightness(1.08) saturate(1.05)" : "saturate(0.85) brightness(1.05)" }}>{item.emoji}</span>
                  <div className="about-orbit-node-badge" style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(0.4)" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>
                <div className="about-orbit-pill-anchor" style={{ transform: `translate(calc(-50% + ${pillX - x}px), calc(-50% + ${pillY - y}px))`, zIndex: 4 }}>
                  <div className={`about-orbit-pill ${isActive ? "is-active" : ""}`} style={{ fontSize: isMobile ? 11 : 12 }}>{item.short}</div>
                </div>
              </div>
            );
          })}
          {trailDots.map((pos, idx) => (
            <div key={idx} className="about-orbit-trail-dot" style={{ width: idx === 0 ? 6 : 3.5, height: idx === 0 ? 6 : 3.5, transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`, opacity: idx === 0 ? 0.35 : 0.18 }} />
          ))}
          <div className="about-orbit-head-anchor" style={{ transform: `translate(calc(-50% + ${headX}px), calc(-50% + ${headY}px))`, zIndex: 10 }}>
            <div className="about-orbit-head-blur-outer" /><div className="about-orbit-head-blur-inner" /><div className="about-orbit-head-dot"><div className="about-orbit-head-spark" /></div>
          </div>
          <div className="about-orbit-center-anchor" style={{ width: hubSize, height: hubSize, animation: isHired ? "centerBounceHired 720ms cubic-bezier(0.34, 1.56, 0.64, 1)" : undefined }}>
            <div className={`about-orbit-center-card ${isHired ? "is-hired" : ""}`}><img src={txLogo} alt="TX Pathwing Logo" className="about-orbit-center-img" /></div>
            {confetti.map((p, idx) => (
              <div key={idx} className="about-orbit-confetti" style={{ width: p.r, height: p.r, backgroundColor: p.c, "--tx": `${p.x}px`, "--ty": `${p.y}px`, "--rot": `${p.d}deg`, animation: `confettiPop 900ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 28}ms forwards` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PILLARS = [
  { icon: Code2, title: "Practical, Real-Time Learning", desc: "We prioritize building software over memorizing syntax. Our curriculum centers on real-world industry projects, live telemetry, and modern frameworks." },
  { icon: HeartHandshake, title: "Personalized 1-on-1 Mentorship", desc: "Every learner receives hands-on guidance from industry veterans, code reviews, and tailored learning tracks to ensure steady technical progress." },
  { icon: Users, title: "Vibrant Community of Creators", desc: "Surround yourself with passionate peers, join collaborative hackathons, and tap into an active alumni network thriving across top tech enterprises." },
  { icon: BriefcaseBusiness, title: "Dedicated Career Outcomes", desc: "From resume crafting and system design mock interviews to mega offline placement drives, we support your job search every step of the way." }
];
const JOURNEY_MILESTONES = [
  { num: "01", title: "Foundations First", desc: "Master computational logic, data structures, and core web fundamentals with daily guided practice." },
  { num: "02", title: "Specialized Career Tracks", desc: "Choose MERN, Java Full Stack, Python with GenAI, or Cloud Engineering aligned with hiring demands." },
  { num: "03", title: "Portfolio Production", desc: "Build deployable full-stack apps with authentication, cloud persistence, and third-party APIs." },
  { num: "04", title: "Career Placement", desc: "Up to 16 months of placement support, AI mock rounds, and direct access to 1000+ hiring partners." }
];
const OFFERING_CATEGORIES = [
  { id: "all", label: "All Offerings" }, { id: "learning", label: "Learning Tracks" },
  { id: "experience", label: "Hands-on & Labs" }, { id: "career", label: "Career & Credentials" }
];
const ABOUT_OFFERINGS = [
  { id: "courses", category: "learning", icon: BookOpen, tag: "Self-Paced", title: "Courses", desc: "Industry-relevant online courses", details: "Structured self-paced modules across Full-Stack, AI, Cloud, and DevOps with hands-on practice quizzes and coding exercises.", theme: "theme-blue" },
  { id: "live-training", category: "learning", icon: Radio, tag: "Interactive", title: "Live Training", desc: "Interactive live classes with experts", details: "Direct instructor-led training with doubt-clearing sessions, live coding walkthroughs, and peer collaboration.", theme: "theme-green" },
  { id: "recorded-courses", category: "learning", icon: Video, tag: "On-Demand", title: "Recorded Courses", desc: "Learn at your own pace", details: "High-definition video lectures available 24/7 on demand with downloadable source codes and reference notes.", theme: "theme-red" },
  { id: "training-programs", category: "experience", icon: Users, tag: "Bootcamps", title: "Training Programs", desc: "Online, Offline, Hybrid modes", details: "Comprehensive multi-month bootcamps with flexible scheduling, continuous mentor reviews, and career assistance.", theme: "theme-purple" },
  { id: "internships", category: "experience", icon: BriefcaseBusiness, tag: "Real Experience", title: "Internships", desc: "Real-world work experience", details: "Work on production sprint cycles, submit pull requests, and earn verified internship credentials for your resume.", theme: "theme-orange" },
  { id: "events", category: "career", icon: CalendarDays, tag: "Community", title: "Events", desc: "Hackathons, webinars & more", details: "National-level hackathons, tech tech-talks from industry leaders, and weekend coding sprint competitions.", theme: "theme-cyan" },
  { id: "certifications", category: "career", icon: BadgeCheck, tag: "Verified", title: "Certifications", desc: "Industry-recognized certificates", details: "Cryptographically verified credentials with tamper-proof QR codes recognized by corporate hiring partners.", theme: "theme-yellow" },
  { id: "virtual-labs", category: "experience", icon: Laptop, tag: "Cloud Sandbox", title: "Virtual Labs", desc: "Hands-on practice environments", details: "Instant browser-based coding sandboxes for Python, Java, Linux, and Cloud—zero local software installation needed.", theme: "theme-indigo" }
];
const OFFERING_STATS = [
  { icon: GraduationCap, value: "500+", label: "Courses" }, { icon: Users, value: "50K+", label: "Students" },
  { icon: Building2, value: "100+", label: "Colleges & Institutions" }, { icon: BadgeCheck, value: "200+", label: "Industry Experts" },
  { icon: BriefcaseBusiness, value: "1K+", label: "Internship Opportunities" }, { icon: Trophy, value: "50+", label: "Events Conducted" }
];
const MISSION_PILLARS = [
  { tag: "Outcome Driven", title: "Bridge Academic-Industry Gap", desc: "We replace outdated passive theory with modern full-stack workflows, system design foundations, and production-level code hygiene.", foot: "Real-world tools, CI/CD, and industry standards" },
  { tag: "Experiential Learning", title: "Live, Project-First Environments", desc: "Every learner architects and deploys complex microservices, scalable databases, and responsive web products under direct engineer mentorship.", foot: "1:1 mentor feedback & code quality reviews" },
  { tag: "Career Acceleration", title: "End-to-End Career Transition", desc: "From resume hardening and mock technical interviews to soft skills training and direct introductions to our hiring partner network.", foot: "Dedicated placement support & portfolio vetting" }
];
const VISION_CARDS = [
  { icon: Users, tag: "Target Horizon", metric: "100,000+", heading: "Engineers Empowered", text: "Democratizing access to high-caliber software engineering careers across Tier-1, Tier-2, and Tier-3 institutions nationwide.", featured: false },
  { icon: Rocket, tag: "Strategic Core", metric: "Tier-1 Ready", heading: "Technological Capability", text: "Cultivating engineering excellence in modern distributed cloud systems, scalable architectures, full-stack craft, and generative AI.", featured: true },
  { icon: Globe2, tag: "Global Impact", metric: "Global Reach", heading: "Partner Credibility", text: "Establishing trusted relationships with premier technology employers, hyper-growth startups, and international enterprise innovators.", featured: false }
];

export default function About() {
  const [activeOfferingsTab, setActiveOfferingsTab] = useState("all");
  const [showOfferingsModal, setShowOfferingsModal] = useState(false);
  const filteredOfferings = activeOfferingsTab === "all" ? ABOUT_OFFERINGS : ABOUT_OFFERINGS.filter((item) => item.category === activeOfferingsTab);

  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="about-container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <div className="about-hero-eyebrow"><span className="about-eyebrow-line" />ABOUT US</div>
              <h1 className="about-hero-title">More Than Learning <br /><span className="about-hero-highlight">A Journey Toward Your Future</span></h1>
              <p className="about-hero-subtitle">We are TX-PathWing — a community of learners, creators and dreamers, building a better tomorrow.</p>
              <p className="about-hero-desc">At TX-PathWing, we believe education is not just about learning from books, but about growing through experiences. Our platform combines quality learning, mentorship, and a <strong className="about-bold-highlight">vibrant community</strong> to help you build skills, gain confidence, and achieve your goals.</p>
              <div className="about-hero-stats">
                {HERO_STATS.map((st) => { const Icon = st.icon; return (
                  <div key={st.label} className="about-stat-item">
                    <div className={`about-stat-icon-wrap ${st.bgClass}`}><Icon className="about-stat-icon" style={{ color: st.iconColor }} /></div>
                    <div className="about-stat-info"><div className="about-stat-val">{st.value}</div><div className="about-stat-lbl">{st.label}</div></div>
                  </div>
                );})}
              </div>
              <div className="about-hero-actions">
                <Link to="/" className="about-hero-btn-primary">Explore Programs <ArrowRight className="about-btn-icon" /></Link>
                <Link to="/learner-journey" className="about-hero-btn-secondary">View 3-Step Journey</Link>
              </div>
              <div className="about-hero-trust-strip">
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>Industry-Aligned Curriculum</span></div>
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>Live Capstone Projects</span></div>
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>1-on-1 Mentor Guidance</span></div>
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>Dedicated Career Placement</span></div>
              </div>
            </div>
            <div className="about-hero-orbit-col"><AboutOrbitAnimation /></div>
          </div>
        </div>
        <div className="about-hero-wave">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,32 C360,70 1080,0 1440,32 L1440,80 L0,80 Z" fill="#ffffff" /></svg>
        </div>
      </section>

      <section className="about-mission-section" id="our-mission">
        <div className="about-container">
          <div className="about-mission-layout">
            <div className="about-mission-manifesto">
              <div className="about-mission-pill"><span>Our Mission & Purpose</span></div>
              <h2 className="about-mission-headline">Empowering Ambitious Learners Into <span className="text-highlight-blue">Industry-Ready</span> Engineers</h2>
              <p className="about-mission-lead">To democratize elite technical education by transforming ambitious learners into job-ready software professionals through industry-grade projects, mentor-led guidance, and structured accountability.</p>
              <div className="about-mission-proof-card">
                <div className="about-proof-card-icon-wrap"><ShieldCheck size={22} className="about-proof-card-icon" /></div>
                <div className="about-proof-card-body">
                  <h4 className="about-proof-card-title">The TX-PathWing Commitment</h4>
                  <p className="about-proof-card-text">100% project-first curriculum, live mentor code reviews, production git workflows, and direct career placement accountability.</p>
                </div>
              </div>
            </div>
            <div className="about-mission-pillars">
              {MISSION_PILLARS.map((p, i) => (
                <div key={p.title} className="about-mission-pillar-card">
                  <div className="about-mission-pillar-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="about-mission-pillar-content">
                    <div className="about-mission-pillar-top"><span className="about-pillar-tag">{p.tag}</span><h3 className="about-mission-pillar-title">{p.title}</h3></div>
                    <p className="about-mission-pillar-desc">{p.desc}</p>
                    <div className="about-mission-pillar-footer"><CheckCircle2 size={15} className="about-pillar-check" /><span>{p.foot}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-vision-section" id="our-vision">
        <div className="about-container">
          <div className="about-vision-header">
            <div className="about-vision-badge"><Compass className="about-vision-badge-icon" size={16} /><span>OUR NORTH STAR • 2030 HORIZON</span></div>
            <h2 className="about-vision-title">Connecting Global Potential to <span className="text-highlight-blue">Limitless Opportunity</span></h2>
            <p className="about-vision-manifesto">"To be the preeminent education-to-employment bridge that connects aspirational talent from every tier and background directly to world-class software engineering careers and global tech leadership."</p>
          </div>
          <div className="about-vision-cards-grid">
            {VISION_CARDS.map((c) => { const Icon = c.icon; return (
              <div key={c.heading} className={`about-vision-card ${c.featured ? "vision-card-featured" : ""}`}>
                <div className="about-vision-card-header">
                  <div className={`about-vision-icon-wrap ${c.featured ? "featured-icon-wrap" : ""}`}><Icon size={22} className="about-vision-card-icon" /></div>
                  <span className={`about-vision-target-tag ${c.featured ? "featured-tag" : ""}`}>{c.tag}</span>
                </div>
                <div className={`about-vision-metric ${c.featured ? "featured-metric" : ""}`}>{c.metric}</div>
                <h3 className="about-vision-card-heading">{c.heading}</h3>
                <p className="about-vision-card-text">{c.text}</p>
                <div className={`about-vision-card-accent ${c.featured ? "featured-accent" : ""}`} />
              </div>
            );})}
          </div>
        </div>
      </section>

      <section className="about-offerings-section">
        <div className="about-container">
          <div className="about-offerings-header-row">
            <div className="about-offerings-header-content">
              <div className="about-offerings-tagline"><span className="about-tagline-bar" /><span className="about-tagline-label">OUR OFFERINGS</span></div>
              <h2 className="about-offerings-title">Explore What You Can Do</h2>
              <p className="about-offerings-subtitle">Everything you need to learn, grow, and get industry ready — in one place.</p>
            </div>
            <button type="button" className="about-offerings-view-all-btn" onClick={() => setShowOfferingsModal(true)}><span>View All</span><ArrowRight size={15} /></button>
          </div>
          <div className="about-offerings-filters">
            {OFFERING_CATEGORIES.map((cat) => (
              <button key={cat.id} type="button" className={`about-offerings-pill-btn ${activeOfferingsTab === cat.id ? "active" : ""}`} onClick={() => setActiveOfferingsTab(cat.id)}>{cat.label}</button>
            ))}
          </div>
          <div className="about-offerings-grid">
            {filteredOfferings.map((item) => { const Icon = item.icon; return (
              <div key={item.id} className={`about-offering-tile ${item.theme}`} onClick={() => setShowOfferingsModal(true)}>
                <div className="about-offering-tile-header"><div className="about-offering-tile-icon-box"><Icon size={22} className="about-offering-tile-icon" /></div><span className="about-offering-tile-tag">{item.tag}</span></div>
                <h3 className="about-offering-tile-title">{item.title}</h3>
                <p className="about-offering-tile-desc">{item.desc}</p>
              </div>
            );})}
          </div>
          <div className="about-offerings-stats-strip">
            {OFFERING_STATS.map((stat, idx) => { const Icon = stat.icon; return (
              <div key={idx} className="about-offering-stat-box">
                <div className="about-offering-stat-icon-wrap"><Icon className="about-offering-stat-icon" size={18} /></div>
                <div className="about-offering-stat-texts"><span className="about-offering-stat-val">{stat.value}</span><span className="about-offering-stat-lbl">{stat.label}</span></div>
              </div>
            );})}
          </div>
        </div>
      </section>

     

      <section className="about-pillars-section">
        <div className="about-container">
          <div className="about-section-head">
            <div className="about-section-eyebrow"> OUR PHILOSOPHY</div>
            <h2 className="about-section-title">The Four Pillars of TX-PathWing</h2>
            <p className="about-section-subtitle">Built by engineers and educators who know firsthand what it takes to succeed in today's demanding technical workforce.</p>
          </div>
          <div className="about-pillars-grid">
            {PILLARS.map((p, idx) => { const Icon = p.icon; return (
              <div key={p.title} className="about-pillar-card" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="about-pillar-icon-box"><Icon className="about-pillar-icon" /></div>
                <h3 className="about-pillar-title">{p.title}</h3>
                <p className="about-pillar-desc">{p.desc}</p>
              </div>
            );})}
          </div>
        </div>
      </section>

      <section className="about-journey-section">
        <div className="about-container">
          <div className="about-section-head">
            <div className="about-section-eyebrow"><BadgeCheck className="about-icon-sparkle" /> PROVEN FRAMEWORK</div>
            <h2 className="about-section-title">Your Blueprint to Tech Success</h2>
            <p className="about-section-subtitle">A compounding step-by-step model designed to take you from fundamentals to confident software engineering.</p>
          </div>
          <div className="about-milestones-grid">
            {JOURNEY_MILESTONES.map((m) => (
              <div key={m.num} className="about-milestone-card">
                <div className="about-milestone-num">{m.num}</div>
                <h3 className="about-milestone-title">{m.title}</h3>
                <p className="about-milestone-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-box">
            <div className="about-cta-glow" />
            <div className="about-cta-content">
              <span className="about-cta-pill">Ready to Start?</span>
              <h2 className="about-cta-title">Begin Your Journey With TX-PathWing Today</h2>
              <p className="about-cta-desc">Take the first step towards an extraordinary career in tech. Explore our comprehensive learning tracks or experience our structured learner journey.</p>
              <div className="about-cta-actions">
                <Link to="/" className="about-btn-primary">Explore Programs <ArrowRight className="about-btn-icon" /></Link>
                <Link to="/learner-journey" className="about-btn-secondary">View 3-Step Journey</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}