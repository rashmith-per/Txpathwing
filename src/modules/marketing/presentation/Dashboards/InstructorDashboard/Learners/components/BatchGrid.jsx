import React from "react";
import {
  BATCHES,
  statusOf,
  avg,
  initials,
  Icon,
  Bar
} from "../learnersConstants.jsx";

export function BatchGrid({ onOpen }) {
  const total = BATCHES.reduce((n, b) => n + b.learners.length, 0);
  return (
    <>
      <div className="lx-head">
        <div>
          <h1>Learners</h1>
          <p>Pick a batch to see how each learner is progressing.</p>
        </div>
        <span className="lx-badge">
          <Icon n="users" s={16} />
          {total} learners · {BATCHES.length} batches
        </span>
      </div>

      <div className="lx-grid batches">
        {BATCHES.map((b, i) => {
          const sup = b.learners.filter((l) => statusOf(l) === "support").length;
          const pr = avg(b.learners, "progress");
          return (
            <div
              key={b.id}
              className="lx-card lx-batch"
              style={{ "--i": i }}
              role="button"
              tabIndex={0}
              onClick={() => onOpen(b)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(b);
                }
              }}
            >
              <div className="lx-top">
                <span className={`lx-logo ${b.tag.length > 2 ? "long" : ""}`}>{b.tag}</span>
                <span className="lx-cohort">{b.cohort}</span>
              </div>
              <h3>{b.name}</h3>
              <p className="lx-muted">
                Started {b.start} · {b.lessons} lessons
              </p>

              <div className="lx-prog">
                <span>Average progress</span>
                <b>{pr}%</b>
              </div>
              <Bar value={pr} />

              <div className="lx-foot">
                <div className="lx-stack">
                  {b.learners.slice(0, 4).map((l) => (
                    <span className="lx-sav" key={l.id}>
                      {initials(l.name)}
                    </span>
                  ))}
                  <span className="lx-scount">{b.learners.length} learners</span>
                </div>
                {sup > 0 ? (
                  <span className="lx-pill support">{sup} need support</span>
                ) : (
                  <span className="lx-pill active">On track</span>
                )}
              </div>

              <div className="lx-open">
                View learners
                <span className="lx-go">
                  <Icon n="arrow" s={16} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
