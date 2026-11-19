import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../liveSessionsData.js";

export function useCountUp(target, dec = 0, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / ms);
      setV(+(target * (1 - (1 - p) ** 3)).toFixed(dec));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, dec, ms]);
  return v;
}

export function useLock() {
  useEffect(() => {
    const p = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = p;
    };
  }, []);
}

export const Portal = ({ children }) =>
  createPortal(<div className="ls ls-portal">{children}</div>, document.body);

export function Toast({ text, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <Portal>
      <div className="ls-toast" role="status">
        <span className="ls-tick">
          <Icon n="check" s={16} />
        </span>
        {text}
      </div>
    </Portal>
  );
}

export function Leave({ onKeep, onLeave }) {
  useLock();
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onKeep();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <Portal>
      <div
        className="ls-overlay"
        onMouseDown={(e) => e.target === e.currentTarget && onKeep()}
      >
        <div className="ls-dialog" role="alertdialog" aria-label="Discard this session?">
          <span className="ls-hicon">
            <Icon n="back" s={22} />
          </span>
          <h3>Discard this session?</h3>
          <p>You have started filling in the details. If you go back now, they will be lost.</p>
          <div className="ls-dbtns">
            <button className="ls-btn ghost" onClick={onKeep}>
              Keep editing
            </button>
            <button className="ls-btn primary" onClick={onLeave}>
              Discard &amp; go back
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export function Stat({ label, val, dec = 0, unit, sub, icon, i }) {
  const n = useCountUp(val, dec);
  return (
    <div className="ls-stat" style={{ "--i": i }}>
      <div className="ls-stat-top">
        <small>{label}</small>
        <span className="ls-stat-ic">
          <Icon n={icon} s={17} />
        </span>
      </div>
      <b>
        {n.toFixed(dec)}
        {unit && <span className="ls-unit">{unit}</span>}
      </b>
      <span className="ls-sub">{sub}</span>
    </div>
  );
}

export function Empty({ onCreate }) {
  return (
    <div className="ls-empty">
      <div className="ls-hero" aria-hidden="true">
        <span className="ls-ring" />
        <span className="ls-ring" />
        <span className="ls-ring" />
        <span>
          <Icon n="cal" s={34} />
        </span>
      </div>
      <span className="ls-badge">
        <Icon n="live" s={13} />
        Live classroom
      </span>
      <h2>No live sessions yet</h2>
      <p>
        Schedule your first live class and it will appear here. Your learners are
        notified the moment you publish a session.
      </p>
      <button className="ls-btn primary big" onClick={onCreate}>
        <Icon n="plus" s={18} />
        Schedule live class
      </button>
    </div>
  );
}
