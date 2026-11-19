import React, { useState, useEffect, useMemo } from "react";
import {
  COURSES,
  DURATIONS,
  ymd,
  hm,
  startOf,
  Icon
} from "../liveSessionsData.js";
import { SessionCard } from "./SessionCard.jsx";

export const Field = ({ id, label, opt, err, children }) => (
  <div className="ls-field">
    <label htmlFor={id}>
      {label}
      {opt && <span className="ls-opt">Optional</span>}
    </label>
    {children}
    {err && <small className="ls-err">{err}</small>}
  </div>
);

export function ScheduleSessionPage({ onBack, onSave, onDirty }) {
  const h = new Date(Date.now() + 3600000);
  h.setMinutes(0, 0, 0);

  const [f, setF] = useState({
    title: "",
    course: "",
    desc: "",
    date: ymd(h),
    time: hm(h),
    duration: 60,
    capacity: 100,
    link: ""
  });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);

  const dirty = Boolean(f.title.trim() || f.desc.trim() || f.link.trim() || f.course);
  useEffect(() => {
    onDirty(dirty);
  }, [dirty, onDirty]);

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    setErr((p) => ({ ...p, [k]: null }));
  };

  const startNow = () => {
    const d = new Date();
    setF((p) => ({ ...p, date: ymd(d), time: hm(d) }));
    setErr((p) => ({ ...p, date: null, time: null }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.title.trim()) er.title = "Give the session a title.";
    if (!f.course) er.course = "Choose a course or batch.";
    if (!f.date) er.date = "Pick a date.";
    if (!f.time) er.time = "Pick a start time.";
    if (!(+f.capacity >= 1)) er.capacity = "Enter at least 1 seat.";
    if (f.date && f.time && startOf(f) < new Date(Date.now() - 300000)) {
      er.time = "That time has already passed.";
    }
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setTimeout(() => {
      onSave({
        id: Date.now(),
        ...f,
        capacity: Math.round(+f.capacity),
        title: f.title.trim(),
        desc: f.desc.trim(),
        link: f.link.trim(),
        registered: 0
      });
    }, 700);
  };

  const preview = useMemo(() => {
    const ok = f.date && f.time;
    const d = new Date(Date.now() + 3600000);
    return {
      id: 7,
      registered: 0,
      link: "",
      title: f.title.trim() || "Your session title",
      course: f.course || "Select a course",
      desc: f.desc.trim() || "What you will cover will appear here for learners.",
      date: ok ? f.date : ymd(d),
      time: ok ? f.time : hm(d),
      duration: f.duration,
      capacity: Math.max(1, Math.round(+f.capacity) || 1)
    };
  }, [f]);

  return (
    <div className="ls-sched">
      <form className="ls-formcard" onSubmit={submit} noValidate>
        <div className="ls-fhead">
          <span className="ls-hicon">
            <Icon n="video" s={22} />
          </span>
          <div>
            <h2>Session details</h2>
            <p>Learners in the chosen course will see this on their dashboard.</p>
          </div>
        </div>
        <div className="ls-body">
          <Field id="t" label="Session title" err={err.title}>
            <input
              id="t"
              autoFocus
              className={err.title ? "bad" : ""}
              value={f.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Mastering Event-Driven Sagas"
            />
          </Field>
          <Field id="c" label="Course / batch" err={err.course}>
            <select
              id="c"
              className={err.course ? "bad" : ""}
              value={f.course}
              onChange={(e) => set("course", e.target.value)}
            >
              <option value="">Select a course</option>
              {COURSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field id="d" label="What will you cover?" opt>
            <textarea
              id="d"
              rows="3"
              value={f.desc}
              onChange={(e) => set("desc", e.target.value)}
              placeholder="Short summary learners will read before joining"
            />
          </Field>
          <div className="ls-two">
            <Field id="dt" label="Date" err={err.date}>
              <input
                id="dt"
                type="date"
                min={ymd(new Date())}
                className={err.date ? "bad" : ""}
                value={f.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </Field>
            <Field id="tm" label="Start time" err={err.time}>
              <input
                id="tm"
                type="time"
                className={err.time ? "bad" : ""}
                value={f.time}
                onChange={(e) => set("time", e.target.value)}
              />
            </Field>
          </div>
          <button type="button" className="ls-now" onClick={startNow}>
            <Icon n="bolt" s={14} />
            Start right now
          </button>
          <Field label="Duration">
            <div className="ls-chips" role="radiogroup">
              {DURATIONS.map((d) => (
                <button
                  type="button"
                  key={d}
                  role="radio"
                  aria-checked={f.duration === d}
                  className={f.duration === d ? "on" : ""}
                  onClick={() => set("duration", d)}
                >
                  {d} min
                </button>
              ))}
            </div>
          </Field>
          <Field id="cp" label="Max attendees" err={err.capacity}>
            <input
              id="cp"
              type="number"
              min="1"
              className={err.capacity ? "bad" : ""}
              value={f.capacity}
              onChange={(e) => set("capacity", e.target.value)}
            />
          </Field>
          <Field id="lk" label="Meeting link" opt>
            <div className="ls-ic">
              <Icon n="link" s={16} />
              <input
                id="lk"
                value={f.link}
                onChange={(e) => set("link", e.target.value)}
                placeholder="https://meet.example.com/your-room"
              />
            </div>
          </Field>
        </div>
        <footer>
          <button
            type="button"
            className="ls-btn ghost"
            onClick={onBack}
            disabled={busy}
          >
            <Icon n="back" s={16} />
            Back
          </button>
          <button type="submit" className="ls-btn primary" disabled={busy}>
            {busy ? <span className="ls-spin" /> : <Icon n="cal" s={16} />}
            {busy ? "Scheduling…" : "Schedule session"}
          </button>
        </footer>
      </form>
      <aside className="ls-previewcol">
        <div className="ls-previewlabel">
          <Icon n="sparkle" s={15} />
          Live preview
        </div>
        <SessionCard preview s={preview} i={0} now={new Date()} notify={() => {}} />
      </aside>
    </div>
  );
}
