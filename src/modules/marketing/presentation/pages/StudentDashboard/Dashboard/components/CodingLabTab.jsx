import React from "react";
import { Terminal } from "lucide-react";

export default function CodingLabTab({ onOpenSandbox }) {
  const challenges = [
    {
      title: "React Hooks Sandbox",
      desc: "Build custom stateful hooks and test re-render lifecycles with hot module reloading.",
    },
    {
      title: "Python Algorithm Challenges",
      desc: "Solve binary search, graph traversal, and dynamic programming challenges with instant test runners.",
    },
    {
      title: "SQL & Query Optimizer",
      desc: "Analyze execution plans, index usage, and write performant relational database queries.",
    },
  ];

  return (
    <div className="coding-lab-container">
      <div className="coding-lab-header">
        <Terminal size={24} color="#2563eb" />
        <h2 className="coding-lab-title">Interactive Coding Lab</h2>
      </div>
      <p className="coding-lab-desc">
        Practice coding exercises in real-time with automatic test validation, browser sandboxes, and step-by-step guidance.
      </p>
      <div className="coding-lab-grid">
        {challenges.map((c, i) => (
          <div key={i} className="coding-lab-card">
            <h4 className="coding-lab-card-title">{c.title}</h4>
            <p className="coding-lab-card-desc">{c.desc}</p>
            <button
              type="button"
              className="coding-lab-btn"
              onClick={() => onOpenSandbox && onOpenSandbox(c.title)}
            >
              Open Sandbox
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
