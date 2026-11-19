import React, { useState, useEffect } from "react";
import {
  statusOf,
  initials,
  Icon,
  Ring,
  Bar,
  Pill,
  useLockScroll
} from "../learnersConstants.jsx";

const MODULES = ["Foundations", "Core concepts", "Hands-on projects", "Capstone"];

export function LearnerProfileModal({ learner, batch, onClose, onContact }) {
  const [closing, setClosing] = useState(false);
  useLockScroll();
  const close = () => { setClosing(true); setTimeout(onClose, 220); };
  useEffect(() => {
    const h = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
  const s = statusOf(learner);
  const mods = MODULES.map((m, i) => ({
    m, v: learner.progress >= 100 ? 100 : Math.max(0, Math.min(100, Math.round(learner.progress * (1.5 - i * 0.35)))),
  }));
  const tiles = [
    { icon: "book", label: "Enrolled course", val: batch.name },
    { icon: "users", label: "Cohort", val: batch.cohort },
    { icon: "cal", label: "Joined", val: batch.start },
    { icon: "clock", label: "Last active", val: learner.last || "Recently" },
    { icon: "quiz", label: "Quiz average", val: `${learner.quiz || learner.quizScore || 85}%` },
    { icon: "file", label: "Assignments", val: learner.assign || "8/10" },
  ];
  const activity = [
    { t: "Completed a quiz in Core concepts", w: learner.last || "Recently" },
    { t: "Submitted an assignment", w: "2 days ago" },
    { t: "Joined a live session", w: "4 days ago" },
  ];

  return (
    <div className={`lx-overlay center ${closing ? "out" : ""}`} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <section className={`lx-modal ${closing ? "out" : ""}`} role="dialog" aria-label={`${learner.name} details`}>
        <button className="lx-iconbtn lx-mclose" onClick={close} aria-label="Close"><Icon n="x" /></button>

        <div className="lx-mhead">
          <span className="lx-avatar big">{initials(learner.name)}</span>
          <div><h2>{learner.name}</h2><p>{learner.email}</p><Pill s={s} /></div>
          <Ring value={learner.progress} size={88} />
        </div>

        <div className="lx-mgrid">
          {tiles.map((t) => (
            <div className="lx-tile" key={t.label}>
              <span className="lx-ic"><Icon n={t.icon} /></span>
              <div><small>{t.label}</small><b>{t.val}</b></div>
            </div>
          ))}
        </div>

        <h5>Module progress</h5>
        {mods.map((x) => (
          <div className="lx-mod" key={x.m}><span>{x.m}</span><Bar value={x.v} /><b>{x.v}%</b></div>
        ))}

        <h5>Recent activity</h5>
        <ul className="lx-tl">
          {activity.map((a) => <li key={a.t}>{a.t}<small>{a.w}</small></li>)}
        </ul>

        <div className="lx-mactions">
          <button className="lx-btn primary" onClick={() => onContact(learner, "email")}><Icon n="mail" s={16} />Email</button>
          <button className="lx-btn outline" onClick={() => onContact(learner, "message")}><Icon n="msg" s={16} />Message</button>
        </div>
      </section>
    </div>
  );
}
