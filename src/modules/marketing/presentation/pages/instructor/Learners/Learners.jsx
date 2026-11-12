import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import "./Learners.css";

/* ------------------------------------------------------------------ */
/*  DATA  (replace with your API later)                                */
/* ------------------------------------------------------------------ */
const BATCHES = [
  {
    id: "java", name: "Java Full Stack Development", tag: "Java", cohort: "Batch 2026-A",
    start: "12 Jan 2026", lessons: 48,
    learners: [
      { id: 1, name: "Vikram Patel", email: "vpatel@txhub.org", progress: 65, quiz: 84, assign: "7/10", last: "Yesterday" },
      { id: 2, name: "Karan Johar", email: "karan.j@anurag.edu.in", progress: 52, quiz: 78, assign: "5/10", last: "3 days ago" },
      { id: 3, name: "Neha Iyer", email: "neha.iyer@kitsw.pathwing.in", progress: 100, quiz: 96, assign: "10/10", last: "1 hour ago" },
      { id: 4, name: "Rohit Menon", email: "rohit.m@student.valuelabs.com", progress: 71, quiz: 88, assign: "8/10", last: "5 hours ago" },
    ],
  },
  {
    id: "python", name: "Python & Data Science", tag: "Py", cohort: "Batch 2026-B",
    start: "03 Feb 2026", lessons: 42,
    learners: [
      { id: 5, name: "Ananya Rao", email: "ananya.rao@gmail.com", progress: 82, quiz: 91, assign: "9/10", last: "20 mins ago" },
      { id: 6, name: "Siddharth Nair", email: "sid.nair@student.iiit.ac.in", progress: 45, quiz: 72, assign: "4/10", last: "4 days ago" },
      { id: 7, name: "Meera Krishnan", email: "meera.k@deloitte.com", progress: 93, quiz: 97, assign: "10/10", last: "2 hours ago" },
    ],
  },
  {
    id: "aws", name: "AWS DevOps Engineer", tag: "AWS", cohort: "Batch 2026-B",
    start: "20 Feb 2026", lessons: 36,
    learners: [
      { id: 8, name: "Sneha Reddy", email: "sneha.reddy@student.valuelabs.com", progress: 88, quiz: 95, assign: "9/10", last: "45 mins ago" },
      { id: 9, name: "Arjun Das", email: "arjun.das@infosys.com", progress: 60, quiz: 81, assign: "6/10", last: "Yesterday" },
    ],
  },
  {
    id: "react", name: "React 19 & Next.js Full Stack", tag: "Rx", cohort: "Batch 2026-A",
    start: "05 Mar 2026", lessons: 40,
    learners: [
      { id: 10, name: "Aarav Sharma", email: "aarav.sharma@kitsw.pathwing.in", progress: 74, quiz: 92, assign: "8/10", last: "2 hours ago" },
      { id: 11, name: "Pooja Varma", email: "p.varma@deloitte.com", progress: 91, quiz: 98, assign: "10/10", last: "30 mins ago" },
      { id: 12, name: "Ishaan Gupta", email: "ishaan.g@student.jntuh.ac.in", progress: 38, quiz: 69, assign: "3/10", last: "6 days ago" },
    ],
  },
];

const statusOf = (l) => (l.progress >= 100 ? "completed" : l.quiz < 80 || l.progress < 55 ? "support" : "active");
const STATUS_LABEL = { active: "Active", support: "Needs support", completed: "Completed" };
const avg = (arr, k) => Math.round(arr.reduce((s, x) => s + x[k], 0) / (arr.length || 1));
const initials = (n) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

const TEMPLATES = {
  "Progress check-in": (n, c) => `Hi ${n.split(" ")[0]},\n\nI was reviewing the ${c} batch and wanted to check in on your progress. How are the lessons going? Let me know if anything is unclear and we can set up a quick call.\n\nBest regards,\nDr. R. Ramana`,
  "Needs support": (n, c) => `Hi ${n.split(" ")[0]},\n\nI noticed you've been falling a little behind in ${c}. That's completely okay — let's fix it together. Reply with a time that suits you this week and I'll walk you through the topics you're stuck on.\n\nBest regards,\nDr. R. Ramana`,
  "Well done": (n, c) => `Hi ${n.split(" ")[0]},\n\nGreat work in ${c}! Your quiz scores and consistency are really standing out. Keep going — you're setting a strong example for the batch.\n\nBest regards,\nDr. R. Ramana`,
};

/* ------------------------------------------------------------------ */
/*  ICONS                                                              */
/* ------------------------------------------------------------------ */
const P = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  back: "M15 5l-7 7 7 7",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 19c0-3 3-5 6-5s6 2 6 5M16 5.5a3 3 0 010 5.5M18 14c2 .6 3 2.2 3 5",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  x: "M6 6l12 12M18 6L6 18",
  send: "M4 12l16-8-6 16-2-7z",
  check: "M5 12.5l4.5 4.5L19 7",
  arrow: "M9 5l7 7-7 7",
  quiz: "M9 12l2 2 4-4M12 21a9 9 0 100-18 9 9 0 000 18z",
  file: "M7 3h7l4 4v14H7zM14 3v4h4",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  msg: "M4 5h16v11H9l-5 4z",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 19V5",
  alert: "M12 8v5M12 16.5v.5M10.3 4l-8 14a2 2 0 001.7 3h16a2 2 0 001.7-3l-8-14a2 2 0 00-3.4 0z",
};
const Icon = ({ n, s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={P[n]} />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  SMALL PIECES                                                       */
/* ------------------------------------------------------------------ */
function useMounted(delay = 80) {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), delay); return () => clearTimeout(t); }, [delay]);
  return m;
}

function Ring({ value, size = 76 }) {
  const on = useMounted(200);
  const h = size / 2, r = (size - 10) / 2, c = 2 * Math.PI * r;
  return (
    <svg className="lx-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${value}% complete`}>
      <defs>
        <linearGradient id="lxg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#60a5fa" /><stop offset="1" stopColor="#2563eb" /></linearGradient>
      </defs>
      <g transform={`rotate(-90 ${h} ${h})`}>
        <circle cx={h} cy={h} r={r} fill="none" stroke="#e6eefc" strokeWidth="7" />
        <circle cx={h} cy={h} r={r} fill="none" stroke="url(#lxg)" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={on ? c * (1 - value / 100) : c}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)" }} />
      </g>
      <text x={h} y={h} textAnchor="middle" dominantBaseline="central" fontSize={size * 0.22} fontWeight="800" fill="#0f1d3a">{value}%</text>
    </svg>
  );
}

/* Renders pop-ups on <body> so they always cover the whole screen */
function Portal({ children }) {
  return createPortal(<div className="lx lx-portal">{children}</div>, document.body);
}
function useLockScroll() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
}

function Bar({ value }) {
  const on = useMounted(150);
  return <div className="lx-bar"><i style={{ width: on ? `${value}%` : 0 }} /></div>;
}

const Pill = ({ s }) => <span className={`lx-pill ${s}`}>{STATUS_LABEL[s]}</span>;

/* ------------------------------------------------------------------ */
/*  EMAIL COMPOSER                                                     */
/* ------------------------------------------------------------------ */
function Composer({ learner, batch, mode = "email", onClose }) {
  const isMsg = mode === "message";
  const [subject, setSubject] = useState(`Update on your ${batch.tag === "Py" ? "Python" : batch.tag} course`);
  const [body, setBody] = useState("");
  const [stage, setStage] = useState("edit"); // edit | sending | sent
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
                  <button key={t} onClick={() => setBody(TEMPLATES[t](learner.name, batch.name))}>{t}</button>
                ))}
              </div>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={`Write your message to ${learner.name.split(" ")[0]}…`} />
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

const MODULES = ["Foundations", "Core concepts", "Hands-on projects", "Capstone"];

function Profile({ learner, batch, onClose, onContact }) {
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
    { icon: "clock", label: "Last active", val: learner.last },
    { icon: "quiz", label: "Quiz average", val: `${learner.quiz}%` },
    { icon: "file", label: "Assignments", val: learner.assign },
  ];
  const activity = [
    { t: "Completed a quiz in Core concepts", w: learner.last },
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

/* ------------------------------------------------------------------ */
/*  BATCH CARDS VIEW                                                   */
/* ------------------------------------------------------------------ */
function BatchGrid({ onOpen }) {
  const total = BATCHES.reduce((n, b) => n + b.learners.length, 0);
  return (
    <>
      <div className="lx-head">
        <div>
          <h1>Learners</h1>
          <p>Pick a batch to see how each learner is progressing.</p>
        </div>
        <span className="lx-badge"><Icon n="users" s={16} />{total} learners · {BATCHES.length} batches</span>
      </div>

      <div className="lx-grid batches">
        {BATCHES.map((b, i) => {
          const sup = b.learners.filter((l) => statusOf(l) === "support").length;
          const pr = avg(b.learners, "progress");
          return (
            <div key={b.id} className="lx-card lx-batch" style={{ "--i": i }} role="button" tabIndex={0}
              onClick={() => onOpen(b)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(b); } }}>
              <div className="lx-top">
                <span className={`lx-logo ${b.tag.length > 2 ? "long" : ""}`}>{b.tag}</span>
                <span className="lx-cohort">{b.cohort}</span>
              </div>
              <h3>{b.name}</h3>
              <p className="lx-muted">Started {b.start} · {b.lessons} lessons</p>

              <div className="lx-prog"><span>Average progress</span><b>{pr}%</b></div>
              <Bar value={pr} />

              <div className="lx-foot">
                <div className="lx-stack">
                  {b.learners.slice(0, 4).map((l) => <span className="lx-sav" key={l.id}>{initials(l.name)}</span>)}
                  <span className="lx-scount">{b.learners.length} learners</span>
                </div>
                {sup > 0 ? <span className="lx-pill support">{sup} need support</span> : <span className="lx-pill active">On track</span>}
              </div>

              <div className="lx-open">View learners<span className="lx-go"><Icon n="arrow" s={16} /></span></div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BATCH DETAIL VIEW                                                  */
/* ------------------------------------------------------------------ */
function BatchDetail({ batch, onBack, onContact, onProfile }) {
  const [view, setView] = useState("cards");
  const [q, setQ] = useState("");
  const [f, setF] = useState("all");
  const L = batch.learners;

  const list = useMemo(
    () => L.filter((l) => (f === "all" || statusOf(l) === f) && (l.name + l.email).toLowerCase().includes(q.toLowerCase())),
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
      <button className="lx-back" onClick={onBack}><Icon n="back" s={16} />All batches</button>
      <div className="lx-head">
        <div>
          <h1>{batch.name}</h1>
          <p>{batch.cohort} · Started {batch.start}</p>
        </div>
      </div>

      <div className="lx-grid stats">
        {stats.map((s, i) => (
          <div className="lx-card lx-stat" style={{ "--i": i }} key={s.label}>
            <span className="lx-ic"><Icon n={s.icon} /></span>
            <div><b>{s.val}</b><small>{s.label}</small></div>
          </div>
        ))}
      </div>

      <div className="lx-toolbar">
        <label className="lx-search"><Icon n="search" s={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email…" />
        </label>
        <div className="lx-filters">
          {["all", "active", "support", "completed"].map((k) => (
            <button key={k} className={f === k ? "on" : ""} onClick={() => setF(k)}>
              {k === "all" ? "All" : STATUS_LABEL[k]}
            </button>
          ))}
          <span className="lx-seg" role="group" aria-label="View">
            <button className={view === "cards" ? "on" : ""} onClick={() => setView("cards")} aria-label="Card view"><Icon n="grid" s={16} /></button>
            <button className={view === "list" ? "on" : ""} onClick={() => setView("list")} aria-label="List view"><Icon n="list" s={16} /></button>
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
                <button className="lx-avatar" onClick={() => onProfile(l)} aria-label={`Open ${l.name}`}>{initials(l.name)}</button>
                <div>
                  <h4><button className="lx-name" onClick={() => onProfile(l)}>{l.name}</button></h4>
                  <p>{l.email}</p>
                </div>
                <Pill s={statusOf(l)} />
              </div>
              <div className="lx-mid">
                <Ring value={l.progress} />
                <ul>
                  <li><Icon n="quiz" s={15} /><span>Quiz average</span><b>{l.quiz}%</b></li>
                  <li><Icon n="file" s={15} /><span>Assignments</span><b>{l.assign}</b></li>
                  <li><Icon n="clock" s={15} /><span>Last active</span><b>{l.last}</b></li>
                </ul>
              </div>
              <Bar value={l.progress} />
              <div className="lx-acts">
                <button className="lx-btn primary" onClick={() => onContact(l, "email")}><Icon n="mail" s={16} />Email</button>
                <button className="lx-btn outline" onClick={() => onContact(l, "message")}><Icon n="msg" s={16} />Message</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="lx-list" key={"l" + f + q}>
          <div className="lx-lrow head"><span>Learner</span><span>Progress</span><span>Quiz</span><span>Status</span><span>Last active</span><span /></div>
          {list.map((l, i) => (
            <div className="lx-lrow" style={{ "--i": i }} key={l.id}>
              <div className="lx-nm">
                <span className="lx-avatar sm">{initials(l.name)}</span>
                <div><button className="lx-name" onClick={() => onProfile(l)}>{l.name}</button><p>{l.email}</p></div>
              </div>
              <div className="lx-pg"><Bar value={l.progress} /><b>{l.progress}%</b></div>
              <b>{l.quiz}%</b>
              <Pill s={statusOf(l)} />
              <span className="lx-muted">{l.last}</span>
              <div className="lx-ac">
                <button className="lx-iconbtn sq" title="Email" aria-label="Email" onClick={() => onContact(l, "email")}><Icon n="mail" s={16} /></button>
                <button className="lx-iconbtn sq" title="Message" aria-label="Message" onClick={() => onContact(l, "message")}><Icon n="msg" s={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function Learners() {
  const [batch, setBatch] = useState(null);
  const [mail, setMail] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    <div className="lx">
      <nav className="lx-crumbs">
        <span>TX Pathwing</span>/<span>Instructor</span>/
        <button onClick={() => setBatch(null)} className={!batch ? "cur" : ""}>Learners</button>
        {batch && <><span>/</span><span className="cur">{batch.tag === "Py" ? "Python" : batch.tag}</span></>}
      </nav>

      <div key={batch ? batch.id : "home"} className="lx-view">
        {batch ? <BatchDetail batch={batch} onBack={() => setBatch(null)} onContact={(l, mode) => setMail({ l, mode })} onProfile={setProfile} /> : <BatchGrid onOpen={setBatch} />}
      </div>

      {profile && <Portal><Profile learner={profile} batch={batch} onClose={() => setProfile(null)} onContact={(l, mode) => setMail({ l, mode })} /></Portal>}
      {mail && <Portal><Composer learner={mail.l} mode={mail.mode} batch={batch} onClose={() => setMail(null)} /></Portal>}
    </div>
  );
}

/* Works with both import styles:
   import Learners from "./Learners";
   import { Learners } from "./Learners";  (or { LearnersPage }) */
export { Learners, Learners as LearnersPage };