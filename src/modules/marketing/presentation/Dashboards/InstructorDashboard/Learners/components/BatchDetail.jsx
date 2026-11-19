import React, { useState, useMemo } from "react";
import {
  statusOf,
  STATUS_LABEL,
  avg,
  initials,
  Icon,
  Ring,
  Bar,
  Pill
} from "../learnersConstants.jsx";

export function BatchDetail({ batch, onBack, onContact, onProfile }) {
  const [view, setView] = useState("cards");
  const [q, setQ] = useState("");
  const [f, setF] = useState("all");
  const L = batch.learners;

  const list = useMemo(
    () =>
      L.filter(
        (l) =>
          (f === "all" || statusOf(l) === f) &&
          (l.name + l.email).toLowerCase().includes(q.toLowerCase())
      ),
    [L, q, f]
  );

  const stats = [
    { icon: "users", label: "Learners", val: L.length },
    { icon: "clock", label: "Avg progress", val: `${avg(L, "progress")}%` },
    { icon: "quiz", label: "Avg quiz score", val: `${avg(L, "quiz")}%` },
    { icon: "alert", label: "Need support", val: L.filter((l) => statusOf(l) === "support").length },
  ];

  return (
    <>
      <button className="lx-back" onClick={onBack}>
        <Icon n="back" s={16} />
        All batches
      </button>
      <div className="lx-head">
        <div>
          <h1>{batch.name}</h1>
          <p>
            {batch.cohort} · Started {batch.start}
          </p>
        </div>
      </div>

      <div className="lx-grid stats">
        {stats.map((s, i) => (
          <div className="lx-card lx-stat" style={{ "--i": i }} key={s.label}>
            <span className="lx-ic">
              <Icon n={s.icon} />
            </span>
            <div>
              <b>{s.val}</b>
              <small>{s.label}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="lx-toolbar">
        <label className="lx-search">
          <Icon n="search" s={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email…"
          />
        </label>
        <div className="lx-filters">
          {["all", "active", "support", "completed"].map((k) => (
            <button
              key={k}
              className={f === k ? "on" : ""}
              onClick={() => setF(k)}
            >
              {k === "all" ? "All" : STATUS_LABEL[k]}
            </button>
          ))}
          <span className="lx-seg" role="group" aria-label="View">
            <button
              className={view === "cards" ? "on" : ""}
              onClick={() => setView("cards")}
              aria-label="Card view"
            >
              <Icon n="grid" s={16} />
            </button>
            <button
              className={view === "list" ? "on" : ""}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <Icon n="list" s={16} />
            </button>
          </span>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="lx-empty">No learners match this filter. Try clearing the search.</div>
      ) : view === "cards" ? (
        <div className="lx-grid learners" key={"c" + f + q}>
          {list.map((l, i) => (
            <article className="lx-card lx-learner" style={{ "--i": i }} key={l.id}>
              <div className="lx-who">
                <button
                  className="lx-avatar"
                  onClick={() => onProfile(l)}
                  aria-label={`Open ${l.name}`}
                >
                  {initials(l.name)}
                </button>
                <div>
                  <h4>
                    <button className="lx-name" onClick={() => onProfile(l)}>
                      {l.name}
                    </button>
                  </h4>
                  <p>{l.email}</p>
                </div>
                <Pill s={statusOf(l)} />
              </div>
              <div className="lx-mid">
                <Ring value={l.progress} />
                <ul>
                  <li>
                    <Icon n="quiz" s={15} />
                    <span>Quiz average</span>
                    <b>{l.quiz}%</b>
                  </li>
                  <li>
                    <Icon n="file" s={15} />
                    <span>Assignments</span>
                    <b>{l.assign}</b>
                  </li>
                  <li>
                    <Icon n="clock" s={15} />
                    <span>Last active</span>
                    <b>{l.last}</b>
                  </li>
                </ul>
              </div>
              <Bar value={l.progress} />
              <div className="lx-acts">
                <button
                  className="lx-btn primary"
                  onClick={() => onContact(l, "email")}
                >
                  <Icon n="mail" s={16} />
                  Email
                </button>
                <button
                  className="lx-btn outline"
                  onClick={() => onContact(l, "message")}
                >
                  <Icon n="msg" s={16} />
                  Message
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="lx-list" key={"l" + f + q}>
          <div className="lx-lrow head">
            <span>Learner</span>
            <span>Progress</span>
            <span>Quiz</span>
            <span>Status</span>
            <span>Last active</span>
            <span />
          </div>
          {list.map((l, i) => (
            <div className="lx-lrow" style={{ "--i": i }} key={l.id}>
              <div className="lx-nm">
                <span className="lx-avatar sm">{initials(l.name)}</span>
                <div>
                  <button className="lx-name" onClick={() => onProfile(l)}>
                    {l.name}
                  </button>
                  <p>{l.email}</p>
                </div>
              </div>
              <div className="lx-pg">
                <Bar value={l.progress} />
                <b>{l.progress}%</b>
              </div>
              <b>{l.quiz}%</b>
              <Pill s={statusOf(l)} />
              <span className="lx-muted">{l.last}</span>
              <div className="lx-ac">
                <button
                  className="lx-iconbtn sq"
                  title="Email"
                  aria-label="Email"
                  onClick={() => onContact(l, "email")}
                >
                  <Icon n="mail" s={16} />
                </button>
                <button
                  className="lx-iconbtn sq"
                  title="Message"
                  aria-label="Message"
                  onClick={() => onContact(l, "message")}
                >
                  <Icon n="msg" s={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
