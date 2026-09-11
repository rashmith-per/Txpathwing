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
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance along the learning route map every 2 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div
      className="min-h-screen w-full text-[#0F172A] selection:bg-[#EDE9FE] antialiased overflow-x-hidden relative"
      style={{ background: "linear-gradient(160deg, #F8FAFC 0%, #F5F3FF 50%, #EFF6FF 100%)" }}
    >
      <main className="mx-auto max-w-[1440px] px-3 sm:px-5 pt-1.5 pb-2">
        {/* Hero Section */}
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
          <div className="flex justify-center overflow-hidden">
            <div className="header-label-anim mono text-[10px] font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-[#2563EB] to-[#0084FF]" style={{ letterSpacing: "0.2em" }}>
              THE LEARNER JOURNEY
            </div>
          </div>

          <h1 className="hero-h1 text-center mt-2 sm:mt-2.5">
            <span className="hero-line-wrap">
              <span className="line1 hero-line">Eleven stages.</span>
              <span className="hero-underline u1" />
            </span>{" "}
            <span className="hero-line-wrap">
              <span className="line2 hero-line">One record.</span>
              <span className="hero-underline u2" />
            </span>
          </h1>

          <div className="mt-2 sm:mt-2.5 max-w-[640px] desc-anim mx-auto text-center">
            <p className="text-[12.5px] sm:text-[13px] leading-[1.5] text-[#475569] font-[400] tracking-[-0.01em]">
              This is a <span className="font-bold text-[#111827]">real sequence</span>, not a feature list — each stage consumes what the previous one produced.
              Stages marked{" "}
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F5F3FF] to-[#EFF6FF] border border-[#DDD6FE] text-[#6D28D9] text-[10px] font-bold mono shadow-xs align-middle">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                AI
              </span>{" "}
              are where the{" "}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] font-bold text-[11px] mono align-middle">
                AI layer
              </span>{" "}
              reads or writes.
            </p>
          </div>
        </div>

        {/* Route Map Stepper Ribbon */}
        <div className="mt-2.5 rounded-[12px] border border-[#DDD6FE] bg-white/95 backdrop-blur-md p-2 sm:p-2.5 px-3 shadow-[0_2px_12px_rgba(109,40,217,0.06)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-[#EDE9FE]">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white border border-[#DDD6FE] p-0.5 flex items-center justify-center shadow-xs shrink-0">
                <img src="/tx-logo.png" alt="TX Logo" className="h-7 w-auto object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-[#2563EB] to-[#0084FF] mono">
                    Learning Route Map
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-bold mono bg-gradient-to-r from-[#F5F3FF] to-[#EFF6FF] text-[#6D28D9] border border-[#DDD6FE]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                    Stage {STAGES[activeStep].num} of {STAGES.length}
                  </span>
                  {STAGES[activeStep].isAI && (
                    <span className="ai-badge inline-flex items-center gap-1 rounded-full px-2 py-0.5 mono text-[8px] font-semibold">
                      <span className="ai-dot h-1 w-1 rounded-full" />
                      AI LAYER
                    </span>
                  )}
                </div>
                <div className="text-[13px] font-bold text-[#0F172A] mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#0084FF]">
                    {STAGES[activeStep].title}
                  </span>
                  <span className="text-[#CBD5E1] hidden sm:inline">•</span>
                  <span className="text-[11.5px] font-normal text-[#64748B]">
                    {STAGES[activeStep].desc}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <button type="button" onClick={() => { setIsPlaying(false); setActiveStep((p) => (p - 1 + STAGES.length) % STAGES.length); }} className="px-2 py-0.5 rounded-md border border-[#BFDBFE] bg-[#F8FAFC] hover:bg-[#F5F3FF] text-[#1D4ED8] hover:text-[#6D28D9] text-[10.5px] font-semibold mono transition-all cursor-pointer" title="Previous Milestone">
                ◀ Prev
              </button>
              <button type="button" onClick={() => setIsPlaying(!isPlaying)} className={`px-3 py-0.5 rounded-md text-[10.5px] font-semibold mono transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${isPlaying ? "bg-gradient-to-r from-[#6D28D9] via-[#2563EB] to-[#0084FF] text-white shadow-indigo-400/25 hover:opacity-95" : "bg-[#F5F3FF] border border-[#C4B5FD] text-[#6D28D9] hover:bg-[#EDE9FE]"}`}>
                {isPlaying ? <><span className="text-[9px]">⏸</span> Pause Tour</> : <><span className="text-[9px]">▶</span> Play Tour</>}
              </button>
              <button type="button" onClick={() => { setIsPlaying(false); setActiveStep((p) => (p + 1) % STAGES.length); }} className="px-2 py-0.5 rounded-md border border-[#BFDBFE] bg-[#F8FAFC] hover:bg-[#F5F3FF] text-[#1D4ED8] hover:text-[#6D28D9] text-[10.5px] font-semibold mono transition-all cursor-pointer" title="Next Milestone">
                Next ▶
              </button>
            </div>
          </div>

          {/* Connected Waypoints Trail */}
          <div className="pt-2 relative overflow-x-auto pb-0.5">
            <div className="min-w-[620px] relative py-1 px-3">
              <div className="absolute top-[14px] left-6 right-6 h-[3px] bg-[#E2E8F0] rounded-full -z-0" />
              <div className="absolute top-[14px] left-6 h-[3px] bg-gradient-to-r from-[#6D28D9] via-[#2563EB] to-[#0084FF] rounded-full transition-all duration-500 -z-0" style={{ width: `calc(${activeStep / (STAGES.length - 1)} * (100% - 48px))` }} />
              <div className="flex items-center justify-between relative z-10">
                {STAGES.map((stage, idx) => {
                  const isCurrent = idx === activeStep;
                  const isPassed = idx < activeStep;
                  return (
                    <button key={stage.num + idx} type="button" onClick={() => { setActiveStep(idx); setIsPlaying(false); }} className={`flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none ${isCurrent ? "scale-110" : "hover:scale-105"}`} title={`Step ${stage.num}: ${stage.title}`}>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold mono transition-all duration-300 ${isCurrent ? "bg-gradient-to-tr from-[#6D28D9] to-[#0084FF] text-white ring-2 ring-indigo-200 shadow-sm" : isPassed ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white" : "bg-white border-2 border-[#CBD5E1] text-[#64748B]"}`}>
                        {isPassed ? "✓" : stage.isLoop ? "↺" : stage.num}
                      </div>
                      <span className={`text-[8.5px] mono font-medium mt-0.5 tracking-tight ${isCurrent ? "text-[#6D28D9] font-bold" : isPassed ? "text-[#475569]" : "text-[#94A3B8]"}`}>
                        {stage.title.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 6x2 Cards Grid */}
        <div className="mt-2.5 rounded-[12px] border border-[#DDD6FE] bg-white/90 backdrop-blur-sm p-2 shadow-[0_2px_12px_rgba(109,40,217,0.06),0_1px_3px_rgba(37,99,235,0.06)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
            {STAGES.map((stage, i) => {
              const isLoop = stage.isLoop;
              const isCurrent = i === activeStep;
              const isPassed = i < activeStep;

              return (
                <div key={stage.num + i} style={{ "--i": i }} onClick={() => { setActiveStep(i); setIsPlaying(false); }} className={`card-outer group ${isLoop ? "loop" : ""} ${isCurrent ? "is-active-step" : isPassed ? "is-passed-step" : ""}`}>
                  <div className="card-inner">
                    <div>
                      <div className="flex items-start justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="mono text-[11px] font-semibold tracking-wide card-num">{stage.num}</span>
                          {isCurrent && <span className="step-status-badge active mono inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white" />CURRENT</span>}
                          {isPassed && <span className="step-status-badge completed mono inline-flex items-center gap-0.5">✓ PASSED</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          {stage.isAI && !isLoop && (
                            <span className="ai-badge inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 mono text-[8.5px] font-medium tracking-[0.06em]">
                              <span className="ai-dot h-1 w-1 rounded-full" />AI LAYER
                            </span>
                          )}
                          {isLoop && (
                            <span className="loop-icon inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-[11px] font-bold">
                              ↻
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="card-title mt-1.5 tracking-[-0.01em] leading-tight">{stage.title}</h3>
                      <p className="card-desc mt-1 text-[10.5px] leading-[1.38]">{stage.desc}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-[#EDE9FE] pt-1.5">
                      <span className="card-foot mono text-[9.5px] flex items-center gap-1">
                        {isLoop ? (
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#0084FF] font-bold">↻ RE-ENTERS 01</span>
                        ) : (
                          <><span>STAGE {stage.num}</span><span className="text-[#6D28D9] font-bold">➔</span><span>{STAGES[i + 1]?.num}</span></>
                        )}
                      </span>
                      <span className="card-arrow h-4.5 w-4.5 rounded-full flex items-center justify-center text-[10px]">
                        {isCurrent ? "●" : "↗"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Spec Strip */}
        <div className="mt-2 flex flex-col sm:flex-row gap-2 justify-between text-[10.5px] mono">
          <span className="text-[#94A3B8]">
            <span className="text-[#6D28D9] font-semibold">TX Path</span> • Royal Indigo & Electric Blue • white #FFFFFF top 3px #2563EB → active #7C3AED top 4px #0084FF
          </span>
          <span className="text-[#2563EB] font-medium">TX brand gradient • #6D28D9 ➔ #2563EB ➔ #0084FF</span>
        </div>
      </main>
    </div>
  );
}
