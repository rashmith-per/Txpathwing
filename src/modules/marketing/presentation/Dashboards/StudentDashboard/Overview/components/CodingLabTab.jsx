import { useState, useRef, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { JAVA, PY, AWS, SQL, REACT, DSA, COURSES } from "./codingLabProblems.js";
import "./CodingLabTab.css";

// false = sends code to RUN_URL; your backend must return { stdout, stderr }
const DEMO_MODE = true;
const RUN_URL = "http://localhost:5000/api/run";

const MONACO_LANG = { java: "java", python: "python", aws: "python", sql: "sql", react: "javascript", dsa: "java" };
const clean = (s) => (s || "").trim();

async function runTest(courseId, problem, code, input) {
  const t0 = performance.now();
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 250));
    const solved = !code.includes("write your solution here");
    return { out: solved ? null : problem.dflt, pass: solved, ms: solved ? 8 + Math.floor(Math.random() * 30) : 12 };
  }
  try {
    const res = await fetch(RUN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course: courseId, code, stdin: input }),
    });
    const d = await res.json();
    return { out: d.stderr ? d.stderr : clean(d.stdout), err: !!d.stderr, ms: Math.round(performance.now() - t0) };
  } catch {
    return { out: `Cannot reach the code runner at ${RUN_URL}.`, err: true, ms: 0 };
  }
}

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

/** registeredCourseIds: optional array like ["java","python"]. Omit to show every course. */
export default function CodingLabTab({ registeredCourseIds }) {
  const [course, setCourse] = useState(null);
  const [problem, setProblem] = useState(null);
  const [filter, setFilter] = useState("All");
  const [codes, setCodes] = useState(() => load("cl-codes", {}));
  const [solved, setSolved] = useState(() => load("cl-solved", {}));
  const [results, setResults] = useState({});
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [split, setSplit] = useState(42);   // left pane width, %
  const [editorH, setEditorH] = useState(60); // editor height inside right pane, %
  const bodyRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => { localStorage.setItem("cl-codes", JSON.stringify(codes)); }, [codes]);
  useEffect(() => { localStorage.setItem("cl-solved", JSON.stringify(solved)); }, [solved]);

  const courses = registeredCourseIds ? COURSES.filter((c) => registeredCourseIds.includes(c.id)) : COURSES;
  const code = problem ? codes[problem.id] ?? problem.code : "";
  const res = problem ? results[problem.id] : null;
  const passed = res ? res.filter((r) => r.pass).length : 0;

  const startDrag = useCallback((ref, axis, set, min, max) => (e) => {
    e.preventDefault();
    document.body.style.userSelect = "none";
    const move = (ev) => {
      const b = ref.current.getBoundingClientRect();
      const horizontal = axis === "x" && window.innerWidth > 760;
      const v = horizontal ? ((ev.clientX - b.left) / b.width) * 100 : ((ev.clientY - b.top) / b.height) * 100;
      set(Math.min(max, Math.max(min, v)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }, []);

  const openProblem = (p) => { setProblem(p); setActive(0); };
  const setCode = (v) => setCodes((c) => ({ ...c, [problem.id]: v ?? "" }));
  const reset = () => { setCode(problem.code); setResults((r) => ({ ...r, [problem.id]: null })); };
  const fillSample = () => setCode(problem.code.replace(problem.stub, problem.sol));

  const run = async () => {
    setRunning(true);
    const out = await Promise.all(
      problem.tests.map(async ([input, expected]) => {
        const r = await runTest(course.id, problem, code, input);
        if (DEMO_MODE) return { ...r, out: r.pass ? expected : r.out };
        return { ...r, pass: !r.err && r.out === expected };
      })
    );
    setResults((p) => ({ ...p, [problem.id]: out }));
    if (out.every((o) => o.pass)) setSolved((s) => ({ ...s, [problem.id]: true }));
    const fail = out.findIndex((o) => !o.pass);
    setActive(fail === -1 ? 0 : fail);
    setRunning(false);
  };

  /* ---------- 1. Registered courses ---------- */
  if (!course) {
    return (
      <div className="cl">
        <div className="cl-wrap">
          <div className="cl-crumb"><b>Coding Lab</b></div>
          <h1 className="cl-h1">Interactive Coding Lab</h1>
          <p className="cl-sub">Practice problems for the courses you have registered for. Choose a course to begin.</p>
          <div className="cl-grid">
            {courses.map((c) => {
              const n = c.P.length, s = c.P.filter((p) => solved[p.id]).length;
              return (
                <button key={c.id} className="cl-card" onClick={() => { setCourse(c); setFilter("All"); }}>
                  <div className="cl-row"><div className="cl-ic">{c.ic}</div><span className="cl-reg">Registered</span></div>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                  <div className="cl-bar"><i style={{ width: `${n ? (s / n) * 100 : 0}%` }} /></div>
                  <div className="cl-row"><span>{s}/{n} solved</span><span className="cl-go">Open</span></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- 2. Problems of the chosen course ---------- */
  const list = course.P.filter((p) => filter === "All" || p.lv === filter);
  const done = course.P.filter((p) => solved[p.id]).length;

  return (
    <div className="cl">
      <div className="cl-wrap">
        <div className="cl-crumb">
          <button onClick={() => setCourse(null)}>Coding Lab</button>›<b>{course.name}</b>
        </div>
        <h1 className="cl-h1">{course.name}</h1>
        <p className="cl-sub">{done} of {course.P.length} problems solved. Pick a difficulty and start solving.</p>
        <div className="cl-tabs">
          {["All", "Easy", "Medium", "Hard"].map((f) => (
            <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="cl-grid">
          {list.map((p) => (
            <button key={p.id} className="cl-card" onClick={() => openProblem(p)}>
              <div className="cl-row">
                <span className={`cl-pill ${p.lv}`}>{p.lv}</span>
                {solved[p.id] && <span className="cl-done">Solved ✓</span>}
              </div>
              <h3>{p.t}</h3>
              <p>{p.d.slice(0, 100)}…</p>
              <div className="cl-row"><span>{p.topic}</span><span className="cl-go">Solve</span></div>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- 3. Full-screen workspace ---------- */}
      {problem && (
        <div className="cl-ws">
          <div className="cl-top">
            <button className="cl-ghost" onClick={() => setProblem(null)}>‹ Back to problems</button>
            <div className="cl-title">
              <span className="cl-mut">{course.name} ›</span>
              <strong>{problem.t}</strong>
              <span className={`cl-pill ${problem.lv}`}>{problem.lv}</span>
            </div>
            <div className="cl-actions">
              <button className="cl-ghost" onClick={fillSample}>Fill sample solution</button>
              <button className="cl-ghost" onClick={reset}>Reset</button>
              <button className="cl-run" disabled={running} onClick={run}>{running ? "Running…" : "Run code"}</button>
            </div>
          </div>

          <div className="cl-body" ref={bodyRef}>
            <section className="cl-left" style={{ "--w": `${split}%` }}>
              <h2>{problem.t}</h2>
              <p>{problem.d}</p>
              <h4>Constraints</h4>
              <ul>{problem.c.map((x) => <li key={x}>{x}</li>)}</ul>
              <h4>Examples</h4>
              {problem.tests.slice(0, 2).map(([i, o], k) => (
                <div className="cl-ex" key={k}>
                  <div><label>Input</label><pre>{i}</pre></div>
                  <div><label>Output</label><pre>{o}</pre></div>
                </div>
              ))}
            </section>

            <div className="cl-vs" onPointerDown={startDrag(bodyRef, "x", setSplit, 22, 70)} />

            <section className="cl-right" ref={rightRef}>
              <div className="cl-tab"><span>{course.file}</span><em>{course.lang}</em></div>
              <div style={{ height: `${editorH}%`, minHeight: 0 }}>
                <Editor
                  language={MONACO_LANG[course.id]}
                  theme="vs"
                  value={code}
                  onChange={setCode}
                  options={{
                    fontSize: 14, minimap: { enabled: false }, automaticLayout: true, tabSize: 4,
                    fontFamily: "'JetBrains Mono','Cascadia Code',Consolas,monospace",
                    scrollBeyondLastLine: false, padding: { top: 12 }, smoothScrolling: true,
                  }}
                />
              </div>

              <div className="cl-hs" onPointerDown={startDrag(rightRef, "y", setEditorH, 25, 80)} />

              <div className="cl-tests">
                <div className="cl-th">
                  <strong>Test cases</strong>
                  {res && <span className={passed === res.length ? "ok" : "bad"}>{passed}/{res.length} passed</span>}
                </div>
                <div className="cl-ct">
                  {problem.tests.map((_, i) => (
                    <button key={i} className={active === i ? "on" : ""} onClick={() => setActive(i)}>
                      <i className={res ? (res[i].pass ? "g" : "r") : ""} /> Case {i + 1}
                    </button>
                  ))}
                </div>
                <label>Input</label><pre>{problem.tests[active][0]}</pre>
                <label>Expected output</label><pre>{problem.tests[active][1]}</pre>
                {res ? (
                  <>
                    <label>Your output {res[active].ms ? `· ${res[active].ms} ms` : ""}</label>
                    <pre className={res[active].pass ? "pass" : "fail"}>{res[active].out || "(no output)"}</pre>
                  </>
                ) : (
                  <p className="cl-hint">Press Run code to check your solution against every case.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}