import React from "react";
import { UserCheck, Laptop, Award, Presentation } from "lucide-react";
import { learningCards } from "../Careers/Career";
import "./LearningDevelopment.css";

const iconMap = {
  UserCheck: UserCheck,
  Laptop: Laptop,
  Award: Award,
  Presentation: Presentation
};

const LearningDevelopment = () => {
  return (
    <section className="learning-dev-section" aria-labelledby="learning-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">CONTINUOUS GROWTH</span>
          <h2 id="learning-heading" className="section-title">
            Learn While You Work
          </h2>
          <p className="section-subtitle">
            At TX Pathwing, learning doesn't stop when you get the job.
          </p>
        </div>

        <div className="learning-grid">
          {learningCards.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <article key={item.id} className="learning-card">
                <div className="learning-icon-box">
                  <Icon size={24} className="learning-icon" />
                </div>
                <h3 className="learning-card-title">{item.title}</h3>
                <p className="learning-card-desc">{item.description}</p>
                <div className="learning-card-detail">{item.detail}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningDevelopment;
