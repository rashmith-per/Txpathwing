import React, { useState, useEffect } from "react";
import "./Learner_journey.css";

const STAGES = [
  { num: "01", title: "Discovery", desc: "Landing page, catalogue, search and filters — plus a recommendation feed built from what similar learners actually finished.", isAI: true },
  { num: "02", title: "Onboarding", desc: "Email or mobile sign-up, OTP verification, then education, skills and career goal captured once.", isAI: false },
  { num: "03", title: "Enrolment", desc: "Free courses grant access directly. Paid ones route through the gateway, then enrolment activates on webhook.", isAI: false },
  { num: "04", title: "Learning", desc: "DRM video, downloadable resources, resume-from-last-position, and progress written on every lesson close.", isAI: false },
  { num: "05", title: "AI tutoring", desc: "Ask about the lesson on screen and get an answer scoped to your syllabus, not the open internet.", isAI: true },
  { num: "06", title: "Practice", desc: "Quizzes, coding labs in a sandbox, assignments and practice tests — generated against your weak areas.", isAI: true },
  { num: "07", title: "Examination", desc: "Timed exams with AI proctoring. Auto-evaluation for objective items, human evaluation for the rest.", isAI: true },
  { num: "08", title: "Certification", desc: "Eligibility check on completion and score, then a certificate with a unique ID and QR verification URL.", isAI: false },
  { num: "09", title: "Skill profile", desc: "Scores and completions become a structured skill vector — the platform record of what you can do.", isAI: true },
  { num: "10", title: "Job matching", desc: "Your skill vector is scored against live openings. You see the fit percentage and the exact gap.", isAI: true },
  { num: "11", title: "Placement", desc: "Apply, interview, get selected, joining tracked — then the loop restarts at the next skill gap.", isAI: false },
  { num: "↺", title: "Back to 01", desc: "A new goal or a new skill gap re-enters the loop at discovery. That return is the business model.", isAI: false, isLoop: true },
];

export default function ElevenStages() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance along the learning route map every 3 seconds (smooth relaxed pace)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-wrap">
      <main className="page-body">
        {/* Hero Section */}
        <div className="hero-block">
          <div className="label-wrap">
            <div className="hero-label mono-font">
              THE LEARNER JOURNEY
            </div>
          </div>

          <h1 className="hero-title">
            <span className="line-wrap">
              <span className="hero-line line-first">Eleven stages.</span>
              <span className="title-rule rule-first" />
            </span>{" "}
            <span className="line-wrap">
              <span className="hero-line line-second">One record.</span>
              <span className="title-rule rule-second" />
            </span>
          </h1>

          <div className="desc-wrap fade-in">
            <p className="hero-desc">
              <span className="desc-sentence">
                This is a <span className="desc-strong">real sequence</span>, not a feature list — each stage consumes what the previous one produced.
              </span>
              <span className="desc-sentence">
                Stages marked{" "}
                <span className="ai-tag mono-font">
                  <span className="tag-dot" />
                  AI
                </span>{" "}
                are where the{" "}
                <span className="layer-chip mono-font">
                  AI layer
                </span>{" "}
                reads or writes.
              </span>
            </p>
          </div>
        </div>

        {/* Route Map Stepper Ribbon */}
        <div className="route-map">
          <div className="map-header">
            <div className="header-left">
              <div className="logo-box">
                <img src="/tx-logo.png" alt="TX Logo" className="logo-mark" />
              </div>
              <div key={activeStep} className="stage-banner slide-in">
                <div className="banner-top">
                  <span className="map-label mono-font">
                    Learning Route Map
                  </span>
                  <span className="stage-counter mono-font">
                    <span className="dot-small" />
                    Stage {STAGES[activeStep].num} of {STAGES.length}
                  </span>
                  {STAGES[activeStep].isAI && (
                    <span className="layer-tag tag-large mono-font">
                      <span className="layer-dot" />
                      AI LAYER
                    </span>
                  )}
                </div>
                <div className="title-row">
                  <span className="banner-heading">
                    {STAGES[activeStep].title}
                  </span>
                  <span className="title-separator">•</span>
                  <span className="banner-desc">
                    {STAGES[activeStep].desc}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Waypoints Trail */}
          <div className="progress-trail">
            <div className="trail-inner">
              <div className="progress-track">
                <div className="track-base" style={{ left: `${(0.5 / STAGES.length) * 100}%`, width: `${((STAGES.length - 1) / STAGES.length) * 100}%` }} />
                <div className="track-fill" style={{ left: `${(0.5 / STAGES.length) * 100}%`, width: `${(activeStep / STAGES.length) * 100}%` }} />
                <div className="progress-runner" style={{ left: `${((activeStep + 0.5) / STAGES.length) * 100}%` }} />
                <div className="progress-steps">
                  {STAGES.map((stage, idx) => {
                    const isCurrent = idx === activeStep;
                    const isPassed = idx < activeStep;
                    return (
                      <button key={stage.num + idx} type="button" onClick={() => setActiveStep(idx)} className="progress-step" title={`Step ${stage.num}: ${stage.title}`}>
                        <div className={`step-circle ${isCurrent ? "is-current" : isPassed ? "is-passed" : ""}`}>
                          {isPassed ? "✓" : stage.isLoop ? "↺" : stage.num}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="progress-labels">
                {STAGES.map((stage, idx) => (
                  <button key={`lbl-${stage.num}-${idx}`} type="button" onClick={() => setActiveStep(idx)} className="label-button">
                    <span className={`label-text mono-font ${idx === activeStep ? "is-current" : idx < activeStep ? "is-passed" : ""}`}>
                      {stage.title.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6x2 Cards Grid */}
        <div className="stages-panel">
          <div className="stages-grid">
            {STAGES.map((stage, i) => {
              const isLoop = stage.isLoop;
              const isCurrent = i === activeStep;
              const isPassed = i < activeStep;

              return (
                <div key={stage.num + i} style={{ "--i": i }} onClick={() => setActiveStep(i)} className={`stage-card ${isLoop ? "is-loop" : ""} ${isCurrent ? "is-current" : isPassed ? "is-passed" : ""}`}>
                  <div className="card-inner">
                    <div>
                      <div className="card-top">
                        <div className="top-left">
                          <span className="mono-font stage-number">{stage.num}</span>
                          {isCurrent && <span className="status-label status-current mono-font"><span className="dot-white" />CURRENT</span>}
                          {isPassed && <span className="status-label status-done mono-font">✓ PASSED</span>}
                        </div>
                        <div className="top-right">
                          {stage.isAI && !isLoop && (
                            <span className="layer-tag tag-small mono-font">
                              <span className="layer-dot" />AI LAYER
                            </span>
                          )}
                          {isLoop && (
                            <span className="loop-icon">
                              ↻
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="stage-title">{stage.title}</h3>
                      <p className="stage-description">{stage.desc}</p>
                    </div>
                    <div className="card-footer">
                      <span className="footer-text mono-font">
                        {isLoop ? (
                          <span className="loop-label">↻ RE-ENTERS 01</span>
                        ) : (
                          <><span>STAGE {stage.num}</span><span className="arrow-glyph">➔</span><span>{STAGES[i + 1]?.num}</span></>
                        )}
                      </span>
                      <span className="arrow-icon">
                        {isCurrent ? "●" : "↗"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
