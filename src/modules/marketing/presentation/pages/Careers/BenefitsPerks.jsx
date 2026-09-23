import React from "react";
import { BookOpen, TrendingUp, Users, Clock, Award } from "lucide-react";
import { benefitsList } from "../Careers/Career";
import "./BenefitsPerks.css";

const iconMap = {
  BookOpen: BookOpen,
  TrendingUp: TrendingUp,
  Users: Users,
  Clock: Clock,
  Award: Award
};

const BenefitsPerks = () => {
  return (
    <section className="benefits-perks-section" aria-labelledby="benefits-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">PERKS & CULTURE</span>
          <h2 id="benefits-heading" className="section-title">
            Benefits & Perks
          </h2>
          <p className="section-subtitle">
            We support your growth, well-being, and professional journey.
          </p>
        </div>

        <div className="benefits-grid">
          {benefitsList.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <article key={item.id} className="benefit-card">
                <div className="benefit-icon-box">
                  <Icon size={22} className="benefit-icon" />
                </div>
                <h3 className="benefit-title">{item.title}</h3>
                <p className="benefit-desc">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsPerks;
