import React, { useState, useEffect } from "react";
import {
  statusOf,
  startOf,
  endOf,
  rel,
  clock,
  labelOf,
  whenText,
  NAMES,
  Icon
} from "../liveSessionsData.js";

function useMounted(d = 100) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setM(true), d);
    return () => clearTimeout(t);
  }, [d]);
  return m;
}

export function SessionCard({
  s,
  i,
  now,
  preview,
  fresh,
  leaving,
  confirming,
  onAsk,
  onCancelAsk,
  onDelete,
  notify
}) {
  const st = statusOf(s, now);
  const a = startOf(s);
  const b = endOf(s);
  const on = useMounted(300);

  const pct = st === "live" ? Math.min(100, Math.round(((now - a) / (b - a)) * 100)) : 0;
  const info =
    st === "live"
      ? `${rel(b - now)} left`
      : st === "scheduled"
      ? `Starts in ${rel(a - now)}`
      : `Ended ${rel(now - b)} ago`;

  const seat = Math.min(100, Math.round((s.registered / s.capacity) * 100));
  const shown = Math.min(4, s.registered);
  const extra = s.registered - shown;

  const tilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const untilt = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const enter = () => {
    if (s.link) window.open(s.link, "_blank", "noopener");
    notify(
      s.link
        ? "Opening your live classroom"
        : "Classroom is ready. Add a meeting link to open it."
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(s.link || `${s.title} · ${whenText(s, now)}`);
      notify(s.link ? "Invite link copied" : "Session details copied");
    } catch {
      notify("Couldn't copy. Please copy it manually.");
    }
  };

  return (
    <article
      className={`ls-card ${st} ${preview ? "preview" : ""} ${fresh ? "fresh" : ""} ${
        leaving ? "leaving" : ""
      }`}
      style={{ "--i": Math.min(i, 8) }}
      onMouseMove={tilt}
      onMouseLeave={untilt}
    >
      <div className="ls-row">
        <div className={`ls-date ${st}`} aria-hidden="true">
          <span>{a.toLocaleDateString("en-IN", { weekday: "short" })}</span>
          <b>{a.getDate()}</b>
          <span>{a.toLocaleDateString("en-IN", { month: "short" })}</span>
        </div>
        <div className="ls-main">
          <div className="ls-ctop">
            <span className="ls-course">
              <Icon n="book" s={14} />
              {s.course}
            </span>
            <span className={`ls-pill ${st}`}>
              {st === "live" && <span className="ls-dot" />}
              {labelOf(s, st, now)}
            </span>
          </div>
          <h3>{s.title}</h3>
          {s.desc && <p className="ls-desc">{s.desc}</p>}
        </div>
      </div>
      <div className="ls-meta">
        <span>
          <Icon n="clock" s={15} />
          {clock(a)}
        </span>
        <span>
          <Icon n="video" s={15} />
          {s.duration} mins
        </span>
        <span className={`ls-info ${st}`}>{info}</span>
      </div>
      {st === "live" && (
        <div className="ls-progress">
          <span style={{ width: `${pct}%` }} />
        </div>
      )}
      <div className="ls-seats">
        <div className="ls-seatrow">
          {s.registered > 0 ? (
            <div className="ls-avs">
              {Array.from({ length: shown }, (_, k) => (
                <span key={k} style={{ "--k": k }}>
                  {NAMES[(s.id + k) % NAMES.length]}
                </span>
              ))}
              {extra > 0 && (
                <span className="more" style={{ "--k": shown }}>
                  +{Math.min(extra, 99)}
                </span>
              )}
            </div>
          ) : (
            <span className="ls-faint">No registrations yet</span>
          )}
          <b>
            {s.registered}
            <small> / {s.capacity} seats</small>
          </b>
        </div>
        <div className="ls-bar">
          <span style={{ width: on ? `${seat}%` : 0 }} />
        </div>
      </div>
      {preview ? null : confirming ? (
        <div className="ls-confirm">
          <span>Cancel this session?</span>
          <button className="ls-btn ghost sm" onClick={onCancelAsk}>
            Keep it
          </button>
          <button className="ls-btn primary sm" onClick={onDelete}>
            Yes, cancel
          </button>
        </div>
      ) : (
        <div className="ls-actions">
          {st === "live" && (
            <button className="ls-btn primary grow shine" onClick={enter}>
              <Icon n="live" s={16} />
              Enter live classroom
            </button>
          )}
          {st === "scheduled" && (
            <button className="ls-btn outline grow" onClick={copy}>
              <Icon n="link" s={16} />
              Copy invite
            </button>
          )}
          {st === "completed" && (
            <button
              className="ls-btn outline grow"
              onClick={() => notify("Recording will appear here once it's processed")}
            >
              <Icon n="play" s={16} />
              Watch past recording
            </button>
          )}
          <button
            className="ls-iconbtn"
            onClick={onAsk}
            aria-label="Cancel session"
            title="Cancel session"
          >
            <Icon n="trash" s={17} />
          </button>
        </div>
      )}
    </article>
  );
}
