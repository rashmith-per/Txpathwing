import React from "react";
import "./OnePlatform.css";
const oneplatform = [
  {
    number: "01",
    icon: "👤",
    label: "INDIVIDUALS",
    title: "Learners & Job Seekers",
    description:
      "Gain skills, get certified, and start your IT career with confidence.",
    features: [
      "Buy single courses or subscribe",
      "AI tutor on every lesson",
      "Verifiable certificate wallet",
      "Job matching from day one",
    ],
    button: "See the learner console",
    accent: "blue",
  },
  {
    number: "02",
    icon: "🎓",
    label: "COLLEGES",
    title: "Institutions",
    description:
      "Own tenant, domain and branding with industry-ready curriculum.",
    features: [
      "Bulk-import students by department",
      "Industry-academia curriculum",
      "Placement drive management",
      "Track learning outcomes",
    ],
    button: "See the institution console",
    accent: "sky",
  },
  {
    number: "03",
    icon: "🏢",
    label: "COMPANIES",
    title: "Corporate L&D",
    description:
      "Build job-ready talent pipelines for your organization.",
    features: [
      "Mandatory & compliance training",
      "Department dashboards for managers",
      "Skill paths mapped to job families",
      "Completion reports for audit",
    ],
    button: "See the corporate console",
    accent: "indigo",
  },
  {
    number: "04",
    icon: "👥",
    label: "CREATORS",
    title: "Instructors",
    description:
      "Share your expertise and make an impact at scale.",
    features: [
      "AI-assisted course authoring",
      "Set your own price and cohorts",
      "Transparent revenue split",
      "Monthly payouts with statements",
    ],
    button: "See the instructor console",
    accent: "cyan",
  },
];

function OnePlatform() {
  return (
    <section className="oneplatform-section">

      {/* Background decoration */}
      <div className="bg-orb orb-one"></div>
      <div className="bg-orb orb-two"></div>
      <div className="bg-orb orb-three"></div>

      <div className="wave wave-one"></div>
      <div className="wave wave-two"></div>

      {/* Decorative dots */}
      <div className="dot-pattern dots-left"></div>
      <div className="dot-pattern dots-right"></div>

      {/* Main container */}
      <div className="oneplatform-container">

        {/* Header */}
        <div className="oneplatform-header">

          <div className="eyebrow">
            <span></span>
            WHO RUNS ON TX PATHWING
            <span></span>
          </div>

          <h2>
            One platform,
            <span> four commercial relationships</span>
          </h2>

          <p>
            Connecting learners, institutions, corporates and instructors
            to create real career outcomes.
          </p>

        </div>

        {/* Cards */}
        <div className="oneplatform-grid">

          {oneplatform.map((item, index) => (
            <article
              className={`oneplatform-card ${item.accent}`}
              key={item.number}
              style={{
                "--delay": `${index * 120}ms`,
              }}
            >

              {/* Card top */}
              <div className="card-top">

                <div className="icon-wrapper">
                  <div className="icon">
                    {item.icon}
                  </div>
                </div>

                <span className="card-number">
                  {item.number}
                </span>

              </div>

              {/* Card content */}
              <div className="card-content">

                <div className="card-label">
                  {item.label}
                </div>

                <h3>{item.title}</h3>

                <p className="card-description">
                  {item.description}
                </p>

                {/* Features */}
                <ul className="feature-list">

                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>

                      <span className="check">
                        ✓
                      </span>

                      <span>
                        {feature}
                      </span>

                    </li>
                  ))}

                </ul>

              </div>

              {/* CTA */}
              <button className="card-button">

                <span>{item.button}</span>

                <span className="button-arrow">
                  →
                </span>

              </button>

            </article>
          ))}

        </div>

        {/* Bottom tagline */}
        <div className="bottom-tagline">

          <span></span>

          <p>
            SKILLS TODAY
            <b>•</b>
            BRIGHTER TOMORROW
          </p>

          <span></span>

        </div>

      </div>

      {/* Floating paper plane */}
      <div className="paper-plane">
        ➤
      </div>

      {/* Side text */}
      <div className="side-note left-note">
        <span>Your</span>
        <span>Career</span>
        <span>Partner</span>
        <b>↘</b>
      </div>

      <div className="side-note right-note">
        <span>Learn</span>
        <span>Upskill</span>
        <span>Get Hired</span>
        <b>↙</b>
      </div>

    </section>
  );
}

export default OnePlatform;