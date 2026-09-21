import React from "react";
import "./Hero.css";
import heroSkills from "./heroSkills";
import SkillsOrbit from "./SkillsOrbit";

// =========================================================
// INDIVIDUAL HEADING WORD
// =========================================================

function HeroWord({ children, highlight = false }) {
  return (
    <span className={`hero-word ${highlight ? "hero-word-highlight" : ""}`}>
      {children}
    </span>
  );
}

// =========================================================
// SKILL ITEM
// =========================================================

function HeroSkill({ skill }) {
  return (
    <div className="hero-skill">
      <div className="hero-skill-icon">
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>

      <span className="hero-skill-name">{skill.name}</span>
    </div>
  );
}

// =========================================================
// MOVING SKILLS
// =========================================================

// =========================================================
// MOVING HERO SKILLS
// =========================================================

function HeroSkills() {
  return (
    <div className="hero-skills-wrapper">
      <div className="hero-skills-track">
        {/* ===============================================
            GROUP 1
        =============================================== */}

        <div className="hero-skills-group">
          {heroSkills.map((skill) => (
            <HeroSkill key={`group-one-${skill.name}`} skill={skill} />
          ))}
        </div>

        {/* ===============================================
            GROUP 2
            Duplicate for seamless animation
        =============================================== */}

        <div className="hero-skills-group" aria-hidden="true">
          {heroSkills.map((skill) => (
            <HeroSkill key={`group-two-${skill.name}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
// =========================================================
// HERO COMPONENT
// =========================================================

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="hero-left">
          {/* ===============================================
              EYEBROW
          =============================================== */}

          <div className="hero-eyebrow">
            <span>LXP</span>
            <span>·</span>

            <span>LMS</span>
            <span>·</span>

            <span>ASSESSMENT</span>
            <span>·</span>

            <span>CAREERS</span>
            <span>·</span>

            <span>MARKETPLACE</span>
          </div>

          {/* ===============================================
              MAIN HEADING
          =============================================== */}

          <h1 className="hero-title">
            {/* ---------------------------------------------
                LINE 1
            --------------------------------------------- */}

            <span className="hero-title-line">
              <HeroWord>From</HeroWord>

              <HeroWord>first</HeroWord>

              <HeroWord>lesson</HeroWord>
            </span>

            {/* ---------------------------------------------
                LINE 2
            --------------------------------------------- */}

            <span className="hero-title-line">
              <HeroWord>to</HeroWord>

              <HeroWord highlight>first</HeroWord>

              <HeroWord highlight>offer,</HeroWord>

              <HeroWord>on</HeroWord>
            </span>

            {/* ---------------------------------------------
                LINE 3
            --------------------------------------------- */}

            <span className="hero-title-line">
              <HeroWord>one</HeroWord>

              <HeroWord>platform.</HeroWord>
            </span>
          </h1>

          {/* ===============================================
              DESCRIPTION
          =============================================== */}

          <p className="hero-description">
            Pathwing closes the loop between learning and employment. Courses,
            AI tutoring, proctored exams, verifiable credentials and job
            matching all run on one skill graph — so a learner's progress
            becomes an employer's shortlist without anyone re-keying a
            spreadsheet.
          </p>

          {/* ===============================================
              ACTION BUTTONS
          =============================================== */}

          <div className="hero-actions">
            <button type="button" className="hero-button hero-button-primary">
              <span>Explore programs</span>

              <span className="hero-button-arrow">→</span>
            </button>

            <button type="button" className="hero-button hero-button-secondary">
              Book a platform demo
            </button>
          </div>

          {/* ===============================================
              MOVING SKILLS
              DIRECTLY BELOW BUTTONS
          =============================================== */}
          <HeroSkills />
          


        </div>

        {/* =================================================
    RIGHT SIDE
    SKILLS ORBIT
================================================= */}

        <div className="hero-right">
          <SkillsOrbit />
        </div>

      </div>
    </section>
  );
}
