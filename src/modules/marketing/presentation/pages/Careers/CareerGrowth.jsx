import React, { useState } from "react";
import { ChevronRight, ArrowDown } from "lucide-react";
import { careerTracks } from "../Careers/Career";
import "./CareerGrowth.css";

const trackList = ["Technology", "Training", "Design", "Business", "Operations"];

const CareerGrowth = () => {
  const [activeTrack, setActiveTrack] = useState("Technology");

  const steps = careerTracks[activeTrack] || careerTracks.Technology;

  return (
    <section className="career-growth-section" aria-labelledby="growth-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">CAREER TRAJECTORY</span>
          <h2 id="growth-heading" className="section-title">
            Grow Your Career
          </h2>
          <p className="section-subtitle">
            Your journey can grow with us.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="growth-track-tabs" role="tablist" aria-label="Select career track">
          {trackList.map((track) => (
            <button
              key={track}
              type="button"
              role="tab"
              aria-selected={activeTrack === track}
              className={`track-tab-btn ${activeTrack === track ? "active" : ""}`}
              onClick={() => setActiveTrack(track)}
            >
              {track} Track
            </button>
          ))}
        </div>

        {/* Connected Progression Path */}
        <div className="growth-path-container">
          <div className="growth-path-desktop">
            {steps.map((step, idx) => (
              <React.Fragment key={step.level}>
                <div className="growth-node">
                  <div className="growth-node-badge">{step.level}</div>
                  <h4 className="growth-node-title">{step.title}</h4>
                  <p className="growth-node-desc">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="growth-connector-desktop" aria-hidden="true">
                    <div className="connector-line" />
                    <ChevronRight size={18} className="connector-arrow" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Vertical Progression */}
          <div className="growth-path-mobile">
            {steps.map((step, idx) => (
              <div key={step.level} className="growth-node-mobile-wrap">
                <div className="growth-node-mobile">
                  <div className="growth-node-badge-mobile">{step.level}</div>
                  <div className="growth-node-mobile-content">
                    <h4 className="growth-node-title">{step.title}</h4>
                    <p className="growth-node-desc">{step.desc}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="growth-connector-mobile" aria-hidden="true">
                    <div className="connector-line-vertical" />
                    <ArrowDown size={16} className="connector-arrow-vertical" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerGrowth;
