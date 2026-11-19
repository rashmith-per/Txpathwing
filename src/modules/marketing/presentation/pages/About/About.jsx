import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Compass,
  ShieldCheck,
} from "lucide-react";
import "./About.css";
import { AboutOrbitAnimation } from "./components/AboutOrbitAnimation";
import {
  HERO_STATS,
  PILLARS,
  JOURNEY_MILESTONES,
  OFFERING_CATEGORIES,
  ABOUT_OFFERINGS,
  OFFERING_STATS,
  MISSION_PILLARS,
  VISION_CARDS,
} from "./aboutData";

export default function About() {
  const [activeOfferingsTab, setActiveOfferingsTab] = useState("all");
  const [, setShowOfferingsModal] = useState(false);
  const filteredOfferings =
    activeOfferingsTab === "all"
      ? ABOUT_OFFERINGS
      : ABOUT_OFFERINGS.filter((item) => item.category === activeOfferingsTab);

  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="about-container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <div className="about-hero-eyebrow">
                <span className="about-eyebrow-line" />
                ABOUT US
              </div>
              <h1 className="about-hero-title">
                More Than Learning <br />
                <span className="about-hero-highlight">A Journey Toward Your Future</span>
              </h1>
              <p className="about-hero-subtitle">
                We are TX-PathWing — a community of learners, creators and dreamers, building a better tomorrow.
              </p>
              <p className="about-hero-desc">
                At TX-PathWing, we believe education is not just about learning from books, but about growing through experiences. Our platform combines quality learning, mentorship, and a <strong className="about-bold-highlight">vibrant community</strong> to help you build skills, gain confidence, and achieve your goals.
              </p>
              <div className="about-hero-stats">
                {HERO_STATS.map((st) => {
                  const Icon = st.icon;
                  return (
                    <div key={st.label} className="about-stat-item">
                      <div className={`about-stat-icon-wrap ${st.bgClass}`}>
                        <Icon className="about-stat-icon" style={{ color: st.iconColor }} />
                      </div>
                      <div className="about-stat-info">
                        <div className="about-stat-val">{st.value}</div>
                        <div className="about-stat-lbl">{st.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="about-hero-actions">
                <Link to="/marketplace" className="about-hero-btn-primary">
                  Explore Programs <ArrowRight className="about-btn-icon" />
                </Link>
                <Link to="/learner-journey" className="about-hero-btn-secondary">
                  View 3-Step Journey
                </Link>
              </div>
              <div className="about-hero-trust-strip">
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>Industry-Aligned Curriculum</span></div>
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>Live Capstone Projects</span></div>
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>1-on-1 Mentor Guidance</span></div>
                <div className="about-hero-trust-item"><CheckCircle2 className="about-trust-check" /><span>Dedicated Career Placement</span></div>
              </div>
            </div>
            <div className="about-hero-orbit-col">
              <AboutOrbitAnimation />
            </div>
          </div>
        </div>
        <div className="about-hero-wave">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32 C360,70 1080,0 1440,32 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <section className="about-mission-section" id="our-mission">
        <div className="about-container">
          <div className="about-mission-layout">
            <div className="about-mission-manifesto">
              <div className="about-mission-pill"><span>Our Mission & Purpose</span></div>
              <h2 className="about-mission-headline">
                Empowering Ambitious Learners Into <span className="text-highlight-blue">Industry-Ready</span> Engineers
              </h2>
              <p className="about-mission-lead">
                To democratize elite technical education by transforming ambitious learners into job-ready software professionals through industry-grade projects, mentor-led guidance, and structured accountability.
              </p>
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
                    <div className="about-mission-pillar-top">
                      <span className="about-pillar-tag">{p.tag}</span>
                      <h3 className="about-mission-pillar-title">{p.title}</h3>
                    </div>
                    <p className="about-mission-pillar-desc">{p.desc}</p>
                    <div className="about-mission-pillar-footer">
                      <CheckCircle2 size={15} className="about-pillar-check" />
                      <span>{p.foot}</span>
                    </div>
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
            <div className="about-vision-badge">
              <Compass className="about-vision-badge-icon" size={16} />
              <span>OUR NORTH STAR • 2030 HORIZON</span>
            </div>
            <h2 className="about-vision-title">Connecting Global Potential to <span className="text-highlight-blue">Limitless Opportunity</span></h2>
            <p className="about-vision-manifesto">
              "To be the preeminent education-to-employment bridge that connects aspirational talent from every tier and background directly to world-class software engineering careers and global tech leadership."
            </p>
          </div>
          <div className="about-vision-cards-grid">
            {VISION_CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.heading} className={`about-vision-card ${c.featured ? "vision-card-featured" : ""}`}>
                  <div className="about-vision-card-header">
                    <div className={`about-vision-icon-wrap ${c.featured ? "featured-icon-wrap" : ""}`}>
                      <Icon size={22} className="about-vision-card-icon" />
                    </div>
                    <span className={`about-vision-target-tag ${c.featured ? "featured-tag" : ""}`}>{c.tag}</span>
                  </div>
                  <div className={`about-vision-metric ${c.featured ? "featured-metric" : ""}`}>{c.metric}</div>
                  <h3 className="about-vision-card-heading">{c.heading}</h3>
                  <p className="about-vision-card-text">{c.text}</p>
                  <div className={`about-vision-card-accent ${c.featured ? "featured-accent" : ""}`} />
                </div>
              );
            })}
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
            <button type="button" className="about-offerings-view-all-btn" onClick={() => setShowOfferingsModal(true)}>
              <span>View All</span>
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="about-offerings-filters">
            {OFFERING_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`about-offerings-pill-btn ${activeOfferingsTab === cat.id ? "active" : ""}`}
                onClick={() => setActiveOfferingsTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="about-offerings-grid">
            {filteredOfferings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`about-offering-tile ${item.theme}`} onClick={() => setShowOfferingsModal(true)}>
                  <div className="about-offering-tile-header">
                    <div className="about-offering-tile-icon-box"><Icon size={22} className="about-offering-tile-icon" /></div>
                    <span className="about-offering-tile-tag">{item.tag}</span>
                  </div>
                  <h3 className="about-offering-tile-title">{item.title}</h3>
                  <p className="about-offering-tile-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="about-offerings-stats-strip">
            {OFFERING_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="about-offering-stat-box">
                  <div className="about-offering-stat-icon-wrap"><Icon className="about-offering-stat-icon" size={18} /></div>
                  <div className="about-offering-stat-texts">
                    <span className="about-offering-stat-val">{stat.value}</span>
                    <span className="about-offering-stat-lbl">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-pillars-section">
        <div className="about-container">
          <div className="about-section-head">
            <div className="about-section-eyebrow">OUR PHILOSOPHY</div>
            <h2 className="about-section-title">The Four Pillars of TX-PathWing</h2>
            <p className="about-section-subtitle">Built by engineers and educators who know firsthand what it takes to succeed in today's demanding technical workforce.</p>
          </div>
          <div className="about-pillars-grid">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="about-pillar-card" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="about-pillar-icon-box"><Icon className="about-pillar-icon" /></div>
                  <h3 className="about-pillar-title">{p.title}</h3>
                  <p className="about-pillar-desc">{p.desc}</p>
                </div>
              );
            })}
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
                <Link to="/marketplace" className="about-btn-primary">Explore Programs <ArrowRight className="about-btn-icon" /></Link>
                <Link to="/learner-journey" className="about-btn-secondary">View 3-Step Journey</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
