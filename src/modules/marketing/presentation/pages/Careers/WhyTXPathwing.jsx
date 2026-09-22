import React from "react";
import { TrendingUp, BookOpen, Cpu, Users, Sparkles } from "lucide-react";
import { whyCards } from "../Careers/Career";
import "./WhyTXPathwing.css";

const iconMap = {
  TrendingUp: TrendingUp,
  BookOpen: BookOpen,
  Cpu: Cpu,
  Users: Users,
  Sparkles: Sparkles
};

const WhyTXPathwing = () => {
  return (
    <section className="why-txpathwing-section" aria-labelledby="why-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">OUR VALUES & CULTURE</span>
          <h2 id="why-heading" className="section-title">
            Why TX Pathwing?
          </h2>
          <p className="section-subtitle">
            More than a job. It's a journey.
          </p>
        </div>

        <div className="why-grid">
          {whyCards.map((card, idx) => {
            const Icon = iconMap[card.icon] || Sparkles;
            return (
              <article key={card.id} className="why-card" style={{ "--card-index": idx }}>
                <div className="why-icon-box">
                  <Icon size={24} className="why-icon" />
                </div>
                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-text">{card.description}</p>
                <div className="why-card-num">0{card.id}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTXPathwing;
