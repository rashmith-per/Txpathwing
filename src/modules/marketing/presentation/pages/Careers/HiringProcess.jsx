import React from "react";
import { hiringSteps } from "../Careers/Career";
import "./HiringProcess.css";

const HiringProcess = () => {
  return (
    <section className="hiring-process-section" aria-labelledby="hiring-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">TRANSPARENT RECRUITMENT</span>
          <h2 id="hiring-heading" className="section-title">
            Our Hiring Process
          </h2>
          <p className="section-subtitle">
            Simple. Transparent. Fair.
          </p>
        </div>

        <div className="hiring-timeline-wrapper">
          <div className="hiring-timeline-bar" aria-hidden="true" />

          <div className="hiring-steps-grid">
            {hiringSteps.map((item) => (
              <div key={item.step} className="hiring-step-item">
                <div className="hiring-step-number-wrap">
                  <span className="hiring-step-number">{item.step}</span>
                </div>
                <h3 className="hiring-step-title">{item.title}</h3>
                <p className="hiring-step-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringProcess;
