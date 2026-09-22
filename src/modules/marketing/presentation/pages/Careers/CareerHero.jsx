import React from "react";
import { ArrowRight, Sparkles, Code2, Terminal, Layers, Cloud, Brain, CheckCircle2 } from "lucide-react";
import contactStudents from "../../../../../assets/contact-students.png";
import HeroSelection from "./imageheroselection";
import "./CareerHero.css";

const floatingTech = [
  { name: "Java", icon: Code2, className: "tech-card-java" },
  { name: "React", icon: Layers, className: "tech-card-react" },
  { name: "Python", icon: Terminal, className: "tech-card-python" },
  { name: "AI/ML", icon: Brain, className: "tech-card-aiml" },
  { name: "Cloud", icon: Cloud, className: "tech-card-cloud" },
];

const CareerHero = ({ onExploreClick, onLifeClick }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="career-hero-section" aria-label="Careers hero">
      <div className="career-hero-glow" aria-hidden="true" />
      <div className="careers-container career-hero-grid">
        {/* Left Column: Copy & Actions */}
        <div className="career-hero-left">
          <div className="career-hero-eyebrow">
            <Sparkles size={14} className="eyebrow-sparkle" />
            <span>CAREERS AT TX PATHWING</span>
          </div>

          <h1 className="career-hero-title">
            Grow With Us. <br />
            <span className="career-hero-gradient">Build What’s Next.</span>
          </h1>

          <p className="career-hero-description">
           Join a team that turns technology, learning, and ideas into real-world impact. Build meaningful products, sharpen your skills, and grow with people who support your journey.
          </p>

          <div className="career-hero-actions">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={() => {
                if (onExploreClick) onExploreClick();
                else scrollToSection("open-positions");
              }}
            >
              <span>Explore Open Positions</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="btn-hero-secondary"
              onClick={() => {
                if (onLifeClick) onLifeClick();
                else scrollToSection("life-at-txpathwing");
              }}
            >
              <span>Life at TX Pathwing</span>
            </button>
          </div>

          <div className="career-hero-stats">
            <div className="hero-stat-item">
              <CheckCircle2 size={16} className="hero-stat-icon" />
              <span>Mentorship Culture</span>
            </div>
            <div className="hero-stat-item">
              <CheckCircle2 size={16} className="hero-stat-icon" />
              <span>Real Product Impact</span>
            </div>
            <div className="hero-stat-item">
              <CheckCircle2 size={16} className="hero-stat-icon" />
              <span>Hyderabad & Hybrid</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual & Floating Tech Cards */}
        <div className="career-hero-right">
          <HeroSelection />
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
