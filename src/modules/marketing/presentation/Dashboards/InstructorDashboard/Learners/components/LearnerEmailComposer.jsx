import React, { useState, useEffect } from "react";
import { initials, TEMPLATES, Icon, useLockScroll } from "../learnersConstants.jsx";

export function LearnerEmailComposer({ learner, batch, mode = "email", onClose }) {
  const isMsg = mode === "message";
  const [subject, setSubject] = useState(`Update on your ${batch?.tag === "Py" ? "Python" : batch?.tag || ""} course`);
  const [body, setBody] = useState("");
  const [stage, setStage] = useState("edit");
  const [closing, setClosing] = useState(false);
  useLockScroll();

  const close = () => { setClosing(true); setTimeout(onClose, 260); };
  useEffect(() => {
    const h = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const send = () => {
    if (!body.trim() || !subject.trim()) return;
    setStage("sending");
    setTimeout(() => setStage("sent"), 1400);
    setTimeout(close, 2800);
  };

  return (
    <div className={`lx-overlay ${closing ? "out" : ""}`} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <aside className={`lx-drawer ${closing ? "out" : ""}`} role="dialog" aria-label="Compose email">
        <header>
          <div className="lx-dtitle"><span className="lx-dicon"><Icon n={isMsg ? "msg" : "mail"} /></span>
            <div><h3>{isMsg ? "Send message" : "New email"}</h3><p>{batch.name}</p></div>
          </div>
          <button className="lx-iconbtn" onClick={close} aria-label="Close"><Icon n="x" /></button>
        </header>

        {stage === "sent" ? (
          <div className="lx-sent">
            <svg viewBox="0 0 52 52" width="84" height="84">
              <circle className="c" cx="26" cy="26" r="24" fill="none" stroke="#2563eb" strokeWidth="3" />
              <path className="t" d="M15 27l8 8 14-16" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>{isMsg ? "Message sent" : "Email sent"}</h3>
            <p>Your message is on its way to {learner.name}.</p>
          </div>
        ) : (
          <>
            <div className="lx-form">
              {!isMsg && <div className="lx-row"><label>From</label><span className="lx-muted">instructor@pathwing.com</span></div>}
              <div className="lx-row"><label>To</label>
                <span className="lx-chip"><b>{initials(learner.name)}</b>{learner.name}<small>{learner.email}</small></span>
              </div>
              {!isMsg && <div className="lx-row"><label htmlFor="sub">Subject</label>
                <input id="sub" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
              </div>}
              <div className="lx-tpl">
                <span>Quick templates</span>
                {Object.keys(TEMPLATES).map((t) => (
                  <button key={t} onClick={() => setBody(TEMPLATES[t](learner.name, batch?.name || "the course"))}>{t}</button>
                ))}
              </div>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={`Write your message to ${(learner.name || "").split(" ")[0]}…`} />
            </div>
            <footer>
              <span className="lx-muted">{body.length} characters</span>
              <div>
                <button className="lx-btn ghost" onClick={close}>Discard</button>
                <button className={`lx-btn primary ${stage === "sending" ? "busy" : ""}`} onClick={send} disabled={!body.trim() || stage === "sending"}>
                  {stage === "sending" ? <span className="lx-spin" /> : <Icon n="send" s={16} />}
                  {stage === "sending" ? "Sending…" : isMsg ? "Send message" : "Send email"}
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
