import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Award, Briefcase, Search, UserCheck, Users } from "lucide-react";
import "./Internships.css";

/* ------------------------------------------------------------------
   Adapter: accepts your existing mockData records even if the key
   names differ (organization / org, applicants / apps, ...).
   When we update a record we write back the short keys (short, status),
   which normalize() reads first, so both shapes stay in sync.
------------------------------------------------------------------- */
const pick = (o, keys, fallback) => {
  for (const k of keys) if (o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  return fallback;
};
const toNum = (v) => {
  const n = parseInt(String(v).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
};
const normalize = (r) => ({
  id: r.id,
  title: pick(r, ["title", "name"], "Untitled internship"),
  org: pick(r, ["org", "organization", "company", "sponsor"], "—"),
  type: pick(r, ["type", "programType", "category"], "Official Internship"),
  loc: pick(r, ["loc", "location", "mode"], "—"),
  dur: pick(r, ["dur", "duration"], "—"),
  stipend: pick(r, ["stipend"], "—"),
  seats: toNum(pick(r, ["seats", "allocatedSeats", "totalSeats"], 0)),
  apps: toNum(pick(r, ["apps", "applicants", "totalApplicants"], 0)),
  short: toNum(pick(r, ["short", "shortlisted"], 0)),
  status: pick(r, ["status"], "Draft"),
  mentor: pick(r, ["mentor", "supervisingMentor"], "To be assigned"),
  deadline: pick(r, ["deadline", "applicationDeadline"], "—"),
  elig: pick(r, ["elig", "eligibility", "requirements"], "—"),
  roles: pick(r, ["roles", "responsibilities"], "—"),
  certs: toNum(pick(r, ["certs", "certificatesIssued"], 0)),
});

function useCountUp(target, ms = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => {
      t0 = t0 ?? t;
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}

function Stat({ icon: Icon, label, value, note }) {
  const n = useCountUp(value);
  return (
    <div className="ip-stat">
      <div className="ip-stat-top">
        <small>{label}</small>
        <span className="ip-stat-ico"><Icon size={18} /></span>
      </div>
      <strong>{n.toLocaleString("en-US")}</strong>
      <em>{note}</em>
    </div>
  );
}

const Pill = ({ status }) => <span className={`ip-pill ip-${status}`}>{status}</span>;

const Field = ({ label, value, wide, third }) => (
  <div className={`ip-field${wide ? " ip-wide" : ""}${third ? " ip-third" : ""}`}>
    <span>{label}</span>
    <b>{value}</b>
  </div>
);

function Card({ item, index, onOpen }) {
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article className="ip-card" style={{ "--i": index }} onMouseMove={spotlight}>
      <div className="ip-card-top">
        <div className="ip-ico">{String(item.org).charAt(0)}</div>
        <Pill status={item.status} />
      </div>
      <h3>{item.title}</h3>
      <p className="ip-org">{item.org} · {item.type}</p>
      <div className="ip-fields">
        <Field label="Duration" value={item.dur} />
        <Field label="Stipend" value={item.stipend} />
        <Field label="Seats" value={item.seats} third />
        <Field label="Applicants" value={item.apps} third />
        <Field label="Shortlisted" value={item.short} third />
        <Field label="Deadline" value={item.deadline} />
        <Field label="Mentor" value={item.mentor} />
        <Field label="Location" value={item.loc} wide />
      </div>
      <button className="ip-btn" onClick={() => onOpen(item.id)}>View Details</button>
    </article>
  );
}

const Row = ({ label, children }) => (
  <div className="ip-row"><span>{label}</span><b>{children}</b></div>
);

function Detail({ item, onBack, onPatch, notify }) {
  const pct = item.seats ? Math.min(100, Math.round((item.short / item.seats) * 100)) : 0;
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);
  const isDraft = item.status === "Draft";

  return (
    <section className="ip-detail">
      <button className="ip-btn ip-ghost" onClick={onBack}>
        <ArrowLeft size={16} /> Back to list
      </button>
      <div className="ip-panel">
        <div className="ip-idrow"><span className="ip-id">ID: {item.id}</span></div>
        <div className="ip-ph">
          <div><h2>{item.title}</h2><p>{item.type} · {item.org}</p></div>
          <div className="ip-acts">
            <Pill status={item.status} />
            <button
              className="ip-btn ip-danger"
              onClick={() => {
                onPatch({ status: isDraft ? "Active" : "Draft" });
                notify(isDraft ? `Applications opened for ${item.title}` : `Applications closed for ${item.title}`);
              }}
            >
              {isDraft ? "Open Applications" : "Close Applications"}
            </button>
            <button
              className="ip-btn"
              onClick={() => {
                onPatch({ short: Math.min(item.seats, item.short + 5) });
                notify(`Shortlisted 5 more candidates for ${item.title}`);
              }}
            >
              <UserCheck size={16} /> Shortlist Next 5
            </button>
          </div>
        </div>

        <div className="ip-prog">
          <div><span>Shortlist progress</span><span>{item.short} of {item.seats} seats ({pct}%)</span></div>
          <div className="ip-track"><div className="ip-fill" style={{ width: `${w}%` }} /></div>
        </div>

        <div className="ip-cols">
          <div>
            <h4>Program overview</h4>
            <Row label="Internship Title">{item.title}</Row>
            <Row label="Sponsoring Organization">{item.org}</Row>
            <Row label="Program Type">{item.type}</Row>
            <Row label="Duration">{item.dur}</Row>
            <Row label="Monthly Stipend">{item.stipend}</Row>
            <Row label="Location">{item.loc}</Row>
            <Row label="Application Deadline">{item.deadline}</Row>
          </div>
          <div>
            <h4>Seats &amp; mentor mentorship</h4>
            <Row label="Supervising Mentor">{item.mentor}</Row>
            <Row label="Allocated Seats">{item.seats} Seats</Row>
            <Row label="Total Applicants">{item.apps} Candidates</Row>
            <Row label="Shortlisted">{item.short} Evaluated</Row>
            <Row label="Program Status"><Pill status={item.status} /></Row>
          </div>
        </div>

        <div className="ip-txt"><h4>Eligibility &amp; requirements</h4><p>{item.elig}</p></div>
        <div className="ip-txt"><h4>Roles &amp; key responsibilities</h4><p>{item.roles}</p></div>
      </div>
    </section>
  );
}

export function Internships({ internships = [], setInternships, setNotice, certificatesCount = 0 }) {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [animKey, setAnimKey] = useState(0);

  const items = useMemo(() => internships.map(normalize), [internships]);
  const selected = items.find((i) => i.id === selectedId);
  const filters = useMemo(() => ["All", ...new Set(items.map((i) => i.status))], [items]);

  const visible = items.filter(
    (i) =>
      (filter === "All" || i.status === filter) &&
      `${i.title} ${i.org} ${i.mentor}`.toLowerCase().includes(query.toLowerCase())
  );

  const stats = {
    active: items.filter((i) => i.status === "Active").length,
    applicants: items.reduce((s, i) => s + i.apps, 0),
    seatsLeft: items.reduce((s, i) => s + i.seats, 0),
  };
  const certTotal = certificatesCount || items.reduce((s, i) => s + i.certs, 0);

  const notify = (msg) => setNotice && setNotice(msg);
  const patch = (changes) =>
    setInternships((list) => list.map((r) => (r.id === selectedId ? { ...r, ...changes } : r)));
  const open = (id) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ip-page">
      <div className="ip-stats">
        <Stat icon={Briefcase} label="Active programs" value={stats.active} note="Official & research tracks" />
        <Stat icon={Users} label="Total applicants" value={stats.applicants} note="Student submissions" />
        <Stat icon={UserCheck} label="Available seats" value={stats.seatsLeft} note="Across industry partners" />
        <Stat icon={Award} label="Certificates" value={certTotal} note="Issued upon completion" />
      </div>

      {selected ? (
        <Detail item={selected} onBack={() => setSelectedId(null)} onPatch={patch} notify={notify} />
      ) : (
        <section className="ip-list">
          <div className="ip-head">
            <h2>Internship Opportunities &amp; Cohorts</h2>
            <span className="ip-count">{visible.length} shown</span>
          </div>

          <div className="ip-bar">
            <label className="ip-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search internship title, organization, mentor…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="ip-chips">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`ip-chip${filter === f ? " ip-on" : ""}`}
                  onClick={() => { setFilter(f); setAnimKey((k) => k + 1); }}
                >
                  {f === "All" ? "All statuses" : f}
                </button>
              ))}
            </div>
          </div>

          <div key={animKey} className="ip-grid ip-anim">
            {visible.length ? (
              visible.map((it, i) => <Card key={it.id} item={it} index={i} onOpen={open} />)
            ) : (
              <div className="ip-empty">No internships match your search.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Internships;