import React, { useState, useRef } from 'react';
import './Internship.css';
import { 
  Layers, 
  Zap, 
  Clock, 
  Code2, 
  Building2, 
  Award, 
  Users, 
  Target, 
  Briefcase, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const cards = [
  {
    badge: "FOUNDATION SPRINT",
    title: "3-Month Internship",
    desc: "Kickstart your journey with focused skill building on real tools and guided development.",
    icon: Layers,
    perks: [
      "Real Tools Project Learning",
      "Industry Tech Stack Exposure",
      "Certificate Plus Portfolio",
      "Mentor Guided Development"
    ],
    perkIcons: [Code2, Building2, Award, Users],
    cta: "Explore Sprint",
    popular: false
  },
  {
    badge: "CAREER ACCELERATOR",
    title: "6-Month Internship",
    desc: "Most chosen path for serious career switch with client work and placement support.",
    icon: Zap,
    perks: [
      "Live Client Projects",
      "One To One Mentorship",
      "LOR And Experience Letter",
      "PPO And Placement Support",
      "Full Stack Exposure"
    ],
    perkIcons: [Building2, Users, Award, Target, Code2],
    cta: "Begin Accelerator",
    popular: true
  },
  {
    badge: "FLEX PROGRAM",
    title: "Occasional Opportunities",
    desc: "Seasonal openings on trending stacks with flexible remote friendly work style.",
    icon: Clock,
    perks: [
      "Seasonal Trending Tech Openings",
      "Remote Friendly Flexible Timings",
      "Referral Based Shortlisting",
      "Real Time Project Contributions"
    ],
    perkIcons: [Zap, Clock, Users, Briefcase],
    cta: "View Openings",
    popular: false
  }
];

function InternCard({ data, mounted }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`intern-card ${data.popular ? 'popular' : ''} ${hover ? 'hovered' : ''}`}
    >
      {/* Header Badges */}
      <div className="card-header">
        <span className={`badge ${data.popular ? 'badge-blue-solid' : 'badge-blue-light'}`}>
          {data.badge}
        </span>
        {data.popular && (
          <span className="popular-badge">
            <span className="dot" /> POPULAR
          </span>
        )}
      </div>

      {/* Title & Icon Row */}
      <div className="title-row">
        <div className="icon-box">
          <data.icon size={20} />
        </div>
        <div className="title-info">
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
        </div>
      </div>

      {/* Perks List */}
      <div className="perks">
        {data.perks.map((perk, i) => {
          const PIcon = data.perkIcons[i];
          return (
            <div className="perk" key={i}>
              <div className="perk-icon">
                <PIcon size={13} />
              </div>
              <span className="perk-text">{perk}</span>
              <span className="perk-dot" />
            </div>
          );
        })}
      </div>

      {/* CTA Button & Subtext */}
      <div className="cta-wrap">
        <button className={`cta-btn ${data.popular ? 'primary' : 'secondary'}`}>
          <span>{data.cta}</span>
          <ArrowUpRight size={15} />
        </button>
        <div className="cta-note">
          <span className="note-dot" /> No enrollment fee for preview
        </div>
      </div>
    </div>
  );
}

export default function InternshipsSection() {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="internship-section">
      <div className="container">
        {/* Category Tag */}
        <span className="internship-subtitle-tag">INTERNSHIP</span>

        {/* Main Section Title */}
        <h2 className="main-title">Learning Progresses Into Practical Experience</h2>

        {/* Description */}
        <p className="intro-50">
          Transform theoretical knowledge into professional expertise through our structured internship ecosystem. Gain hands-on experience with live projects, mentorship from industry engineers, client exposure, and portfolio development. Designed for B.Tech and all degree graduates seeking real-world skills, career growth, and confident transition into full-time IT roles with proven placement support today.
        </p>

        {/* 3 Cards Grid */}
        <div className="cards-grid">
          {cards.map((c, i) => (
            <InternCard key={i} data={c} mounted={mounted} />
          ))}
        </div>
      </div>
    </section>
  );
}