import React from "react";
import { User, Quote } from "lucide-react";
import { employeeStories } from "../Careers/Career";
import "./EmployeeStories.css";

const EmployeeStories = () => {
  return (
    <section className="stories-section" aria-labelledby="stories-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">VOICES OF PATHWING</span>
          <h2 id="stories-heading" className="section-title">
            Meet Our People
          </h2>
          <p className="section-subtitle">
            Real stories. Real growth.
          </p>
        </div>

        <div className="stories-grid">
          {employeeStories.map((item) => (
            <article key={item.id} className="story-card">
              <div className="story-quote-icon">
                <Quote size={24} />
              </div>

              <div className="story-text-wrap">
                <p className="story-placeholder-text">
                  "{item.testimonial}"
                </p>
                <small className="story-notice">
                  (Verified employee testimonial placeholder — updates regularly)
                </small>
              </div>

              <div className="story-author-row">
                <div className="story-avatar-box">
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} className="story-avatar-img" />
                  ) : (
                    <User size={22} className="story-default-avatar" />
                  )}
                </div>
                <div className="story-author-info">
                  <h4 className="story-author-name">{item.name}</h4>
                  <p className="story-author-role">{item.role}</p>
                  <span className="story-author-dept">{item.department}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeStories;
