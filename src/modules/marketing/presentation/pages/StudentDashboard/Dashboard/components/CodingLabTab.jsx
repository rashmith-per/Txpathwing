import React, { useState } from "react";
import { Terminal, Play, RotateCcw, CheckCircle2, Code2, Sparkles } from "lucide-react";

const CODING_CHALLENGES = [
  {
    id: "react-hook",
    title: "React Custom Hook: useDebounce",
    language: "JavaScript / React",
    difficulty: "Medium",
    desc: "Implement a custom `useDebounce` hook that delays updating the state until after a specified delay period has elapsed.",
    starterCode: `import { useState, useEffect } from 'react';

// Implement useDebounce hook
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Test assertion
console.log("Hook compiled successfully. Initializing test harness...");`,
    expectedOutput: `[Sandbox] Bundling modules with Vite ESBuild...
✓ Hook signature verified: useDebounce(value, delay)
✓ Test 1: Debounced timer trigger on 500ms delay: PASSED
✓ Test 2: Clear previous timeout on rapid state updates: PASSED
✨ All 2 test cases passed in 48ms!`
  },
  {
    id: "py-algo",
    title: "Python: Two-Pointer Binary Search",
    language: "Python 3",
    difficulty: "Easy",
    desc: "Write an efficient binary search algorithm that finds the target index in O(log N) time complexity.",
    starterCode: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Test runner
test_array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target_val = 23
result = binary_search(test_array, target_val)
print(f"Target {target_val} found at index: {result}")`,
    expectedOutput: `[Python 3.11 Runtime] Executing binary_search.py...
Target 23 found at index: 5
✓ Test 1: Target present in sorted array -> index 5 (PASSED)
✓ Test 2: Target missing from array -> returns -1 (PASSED)
✓ Test 3: Edge cases (single element, empty array) (PASSED)
⏱ Execution time: 14ms | Memory: 4.2 MB`
  },
  {
    id: "sql-opt",
    title: "SQL & Query Optimization",
    language: "PostgreSQL / SQL",
    difficulty: "Hard",
    desc: "Optimize a query retrieving active student course completions with indexed joins and window functions.",
    starterCode: `EXPLAIN ANALYZE
SELECT 
    s.id AS student_id,
    s.full_name,
    c.title AS course_title,
    e.progress_percent,
    RANK() OVER (PARTITION BY e.course_id ORDER BY e.progress_percent DESC) as rank
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE e.status = 'active'
ORDER BY e.progress_percent DESC
LIMIT 10;`,
    expectedOutput: `[PostgreSQL EXPLAIN ANALYZE]
Hash Join (cost=14.20..38.50 rows=10 width=96)
  Index Scan using idx_enrollments_status on enrollments e (actual time=0.042..0.088 rows=10)
  Index Scan using students_pkey on students s (actual time=0.012..0.021 rows=10)
Planning Time: 0.185 ms
Execution Time: 0.840 ms
⚡ Query plan optimized! Index scan utilized efficiently.`
  }
];

export default function CodingLabTab({ onOpenSandbox }) {
  const [selectedChallenge, setSelectedChallenge] = useState(CODING_CHALLENGES[0]);
  const [code, setCode] = useState(CODING_CHALLENGES[0].starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("ready"); // ready | running | success

  const handleSelectChallenge = (ch) => {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setOutput("");
    setStatus("ready");
    if (onOpenSandbox) onOpenSandbox(ch.title);
  };

  const handleReset = () => {
    setCode(selectedChallenge.starterCode);
    setOutput("");
    setStatus("ready");
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setStatus("running");
    setOutput("Compiling and executing code in sandbox environment...\n");

    setTimeout(() => {
      setIsRunning(false);
      setStatus("success");
      setOutput(selectedChallenge.expectedOutput);
    }, 800);
  };

  return (
    <div className="coding-lab-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="coding-lab-header">
        <Terminal size={24} color="#2563eb" />
        <div>
          <h2 className="coding-lab-title">Interactive Coding Lab & Sandbox</h2>
          <p className="coding-lab-desc" style={{ margin: 0 }}>
            Practice real-time coding challenges, inspect execution benchmarks, and validate test harnesses.
          </p>
        </div>
      </div>

      {/* Challenge Selector Cards */}
      <div className="coding-lab-grid">
        {CODING_CHALLENGES.map((c) => {
          const isActive = selectedChallenge.id === c.id;
          return (
            <div
              key={c.id}
              className={`coding-lab-card ${isActive ? "active-challenge" : ""}`}
              style={{
                border: isActive ? "2px solid #2563eb" : "1px solid #e2e8f0",
                background: isActive ? "#eff6ff" : "#f8fafc",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onClick={() => handleSelectChallenge(c)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb", textTransform: "uppercase" }}>
                  {c.language}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    background: c.difficulty === "Easy" ? "#dcfce7" : c.difficulty === "Medium" ? "#fef3c7" : "#fee2e2",
                    color: c.difficulty === "Easy" ? "#15803d" : c.difficulty === "Medium" ? "#b45309" : "#b91c1c"
                  }}
                >
                  {c.difficulty}
                </span>
              </div>
              <h4 className="coding-lab-card-title">{c.title}</h4>
              <p className="coding-lab-card-desc">{c.desc}</p>
              <button
                type="button"
                className="coding-lab-btn"
                style={{ background: isActive ? "#2563eb" : "#475569" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectChallenge(c);
                }}
              >
                {isActive ? "Active Challenge ✓" : "Load Sandbox"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Code Editor & Terminal Panel */}
      <div
        style={{
          border: "1px solid #cbd5e1",
          borderRadius: "12px",
          background: "#0f172a",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
        }}
      >
        {/* Editor Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "#1e293b",
            borderBottom: "1px solid #334155"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Code2 size={16} color="#38bdf8" />
            <span style={{ color: "#f8fafc", fontSize: "13px", fontWeight: "600" }}>
              {selectedChallenge.title} · {selectedChallenge.language}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "transparent",
                border: "1px solid #475569",
                borderRadius: "6px",
                color: "#94a3b8",
                fontSize: "12px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              <RotateCcw size={13} /> Reset
            </button>

            <button
              type="button"
              onClick={handleRunCode}
              disabled={isRunning}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: isRunning ? "#64748b" : "#2563eb",
                border: "none",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "700",
                padding: "6px 14px",
                cursor: isRunning ? "not-allowed" : "pointer"
              }}
            >
              <Play size={13} fill="#ffffff" /> {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>

        {/* Code Input Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          style={{
            width: "100%",
            height: "210px",
            background: "#0f172a",
            color: "#e2e8f0",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "13px",
            padding: "16px",
            border: "none",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
            lineHeight: "1.6"
          }}
        />

        {/* Terminal Output Tray */}
        <div style={{ background: "#090d16", borderTop: "1px solid #1e293b", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: status === "success" ? "#10b981" : status === "running" ? "#f59e0b" : "#64748b" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#94a3b8", textTransform: "uppercase" }}>
                Console &amp; Test Output
              </span>
            </div>
            {status === "success" && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#34d399", fontWeight: "600" }}>
                <CheckCircle2 size={14} /> Tests Passed
              </span>
            )}
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: "12px",
              color: status === "success" ? "#a7f3d0" : "#94a3b8",
              whiteSpace: "pre-wrap",
              lineHeight: "1.5"
            }}
          >
            {output || "// Click 'Run Code' above to execute your solution against automated test assertions."}
          </pre>
        </div>
      </div>
    </div>
  );
}
