import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./LiveSessions.css";
import {
  makeSamples,
  load,
  save,
  startOf,
  statusOf,
  whenText,
  LIFETIME_ATTENDEES,
  AVG_RATING,
  SEED_DEMO,
  DEMO_CONTROLS,
  Icon
} from "./liveSessionsData.js";
import { SessionCard } from "./components/SessionCard.jsx";
import { ScheduleSessionPage } from "./components/ScheduleSessionPage.jsx";
import { Stat, Empty, Toast, Leave } from "./components/LiveSessionOverlays.jsx";

export default function LiveSessions({ sessions: propSessions, onAddSession }) {
  const [sessions, setSessions] = useState(() => {
    const loaded = load();
    if (loaded && loaded.length) return loaded;
    if (propSessions && propSessions.length) return propSessions;
    return makeSamples(new Date());
  });

  const [view, setView] = useState("overview");
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [now, setNow] = useState(() => new Date());
  const [toast, setToast] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [freshId, setFreshId] = useState(null);
  const [leavingId, setLeavingId] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [leaveAsk, setLeaveAsk] = useState(false);

  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    save(sessions);
  }, [sessions]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const all = useMemo(() => sessions.map((s) => ({ s, st: statusOf(s, now) })), [sessions, now]);
  const pick = (st) =>
    all.filter((x) => x.st === st && (x.s.title + x.s.course).toLowerCase().includes(q.trim().toLowerCase()));

  const live = pick("live");
  const upcoming = pick("scheduled").sort((x, y) => startOf(x.s) - startOf(y.s));
  const done = pick("completed").sort((x, y) => startOf(y.s) - startOf(x.s));
  const open = all.filter((x) => x.st !== "completed").sort((x, y) => startOf(x.s) - startOf(y.s));
  const nextUp = open[0];

  const groups = (
    filter === "all"
      ? [["Live now", live], ["Coming up", upcoming], ["Past sessions", done]]
      : filter === "upcoming"
      ? [["Upcoming", [...live, ...upcoming]]]
      : [["Past sessions", done]]
  ).filter(([, l]) => l.length);

  const scheduling = view === "schedule";

  const leave = () => {
    setLeaveAsk(false);
    setDirty(false);
    setView("overview");
  };

  const goBack = () => (dirty ? setLeaveAsk(true) : leave());

  const handleSave = (s) => {
    setSessions((p) => (!p.length && SEED_DEMO ? [s, ...makeSamples(new Date())] : [s, ...p]));
    if (typeof onAddSession === "function") {
      try {
        onAddSession(s);
      } catch {
        /* ignore */
      }
    }
    setDirty(false);
    setView("overview");
    setFilter("all");
    setQ("");
    setFreshId(s.id);
    setTimeout(() => setFreshId(null), 2600);
    setToast("Session scheduled");
  };

  const remove = (id) => {
    setConfirmId(null);
    setLeavingId(id);
    setTimeout(() => {
      setSessions((p) => p.filter((x) => x.id !== id));
      setLeavingId(null);
      setToast("Session cancelled");
    }, 320);
  };

  let idx = 0;

  return (
    <div className="ls">
      {scheduling && (
        <button className="ls-back" onClick={goBack}>
          <Icon n="back" s={16} />
          Back
        </button>
      )}
      <nav className="ls-crumbs">
        <span>TX Pathwing</span>/<span>Instructor</span>/
        <span className={scheduling ? "" : "cur"}>Live Classroom &amp; Sessions</span>
        {scheduling && (
          <>
            <span>/</span>
            <span className="cur">Schedule</span>
          </>
        )}
      </nav>
      <div className="ls-head">
        <div>
          <h1>{scheduling ? "Schedule a live class" : "Live Classroom & Interactive Webinars"}</h1>
          <p>
            {scheduling
              ? "Fill in the details. The preview on the right updates as you type."
              : "Host live engineering sessions, teach in real time and keep every learner engaged — all from one calm, focused classroom."}
          </p>
        </div>
        {!scheduling && (
          <button className="ls-btn primary" onClick={() => setView("schedule")}>
            <Icon n="plus" s={17} />
            Schedule Live Class
          </button>
        )}
      </div>

      {scheduling ? (
        <ScheduleSessionPage onBack={goBack} onDirty={setDirty} onSave={handleSave} />
      ) : (
        <>
          <div className="ls-stats">
            <Stat
              i={0}
              icon="cal"
              label="Upcoming sessions"
              val={open.length}
              sub={
                nextUp
                  ? nextUp.st === "live"
                    ? "A session is live right now"
                    : `Next: ${whenText(nextUp.s, now)}`
                  : "Ready when you are"
              }
            />
            <Stat
              i={1}
              icon="users"
              label="Total live attendees"
              val={LIFETIME_ATTENDEES}
              sub="Learners joined live classrooms"
            />
            <Stat
              i={2}
              icon="star"
              label="Session engagement"
              val={AVG_RATING}
              dec={2}
              unit="stars"
              sub="Average learner rating"
            />
          </div>
          {DEMO_CONTROLS && (
            <div className="ls-demo">
              <div>
                <b>Live demo controls</b>
                <p>Preview the empty state first, then switch to a classroom with sessions.</p>
              </div>
              <div className="ls-toggle" role="group" aria-label="Demo mode">
                <button
                  className={sessions.length ? "on" : ""}
                  onClick={() => {
                    if (!sessions.length) {
                      setSessions(makeSamples(new Date()));
                      setFilter("all");
                      setQ("");
                    }
                  }}
                >
                  Show Demo: With Sessions
                </button>
                <button
                  className={!sessions.length ? "on" : ""}
                  onClick={() => {
                    setSessions([]);
                    setQ("");
                  }}
                >
                  Show Demo: No Sessions
                </button>
              </div>
            </div>
          )}
          {!sessions.length ? (
            <Empty onCreate={() => setView("schedule")} />
          ) : (
            <>
              <div className="ls-bar-top">
                <div className="ls-filters" role="tablist">
                  {[
                    ["all", "All", sessions.length],
                    ["upcoming", "Upcoming", open.length],
                    ["completed", "Completed", all.length - open.length]
                  ].map(([k, label, n]) => (
                    <button
                      key={k}
                      role="tab"
                      aria-selected={filter === k}
                      className={filter === k ? "on" : ""}
                      onClick={() => setFilter(k)}
                    >
                      {label}
                      <span className="ls-count">{n}</span>
                    </button>
                  ))}
                </div>
                <label className="ls-search">
                  <Icon n="search" s={16} />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search sessions or courses…"
                  />
                </label>
              </div>
              {!groups.length ? (
                <div className="ls-none">No sessions match your filters.</div>
              ) : (
                <div key={filter + q.length}>
                  {groups.map(([title, list]) => (
                    <section className="ls-sec" key={title}>
                      <h4>
                        <span>{title}</span>
                        <b>{list.length}</b>
                      </h4>
                      <div className="ls-grid">
                        {list.map(({ s }) => (
                          <SessionCard
                            key={s.id}
                            s={s}
                            i={idx++}
                            now={now}
                            fresh={freshId === s.id}
                            leaving={leavingId === s.id}
                            confirming={confirmId === s.id}
                            onAsk={() => setConfirmId(s.id)}
                            onCancelAsk={() => setConfirmId(null)}
                            onDelete={() => remove(s.id)}
                            notify={setToast}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
      {leaveAsk && <Leave onKeep={() => setLeaveAsk(false)} onLeave={leave} />}
      {toast && <Toast key={toast} text={toast} onDone={clearToast} />}
    </div>
  );
}

export { LiveSessions, LiveSessions as LiveSessionsPage };
