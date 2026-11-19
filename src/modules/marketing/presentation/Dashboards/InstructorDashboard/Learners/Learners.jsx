import React, { useState } from "react";
import { LayoutGrid, Table } from "lucide-react";
import { initialLearners } from "../data/mockData";
import { Portal } from "./learnersConstants.jsx";
import { LearnerEmailComposer } from "./components/LearnerEmailComposer.jsx";
import { LearnerProfileModal } from "./components/LearnerProfileModal.jsx";
import { BatchGrid } from "./components/BatchGrid.jsx";
import { BatchDetail } from "./components/BatchDetail.jsx";
import { AllLearnersTableView } from "./components/AllLearnersTableView.jsx";
import "./Learners.css";

export default function Learners({ learners: propLearners = [] }) {
  const effectiveLearners = propLearners && propLearners.length > 0 ? propLearners : initialLearners;
  const [viewMode, setViewMode] = useState("batch"); // "batch" | "table"
  const [batch, setBatch] = useState(null);
  const [mail, setMail] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    <div className="lx">
      {/* Top Navigation & View Switcher */}
      <div
        className="lx-top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <nav className="lx-crumbs" style={{ margin: 0 }}>
          <span>TX Pathwing</span>/<span>Instructor</span>/
          <button
            onClick={() => {
              setViewMode("batch");
              setBatch(null);
            }}
            className={viewMode === "batch" && !batch ? "cur" : ""}
          >
            Learners
          </button>
          {viewMode === "batch" && batch && (
            <>
              <span>/</span>
              <span className="cur">{batch.tag === "Py" ? "Python" : batch.tag}</span>
            </>
          )}
          {viewMode === "table" && (
            <>
              <span>/</span>
              <span className="cur">All Enrolled</span>
            </>
          )}
        </nav>

        <div
          className="lx-view-toggle"
          style={{
            display: "inline-flex",
            background: "#f1f5f9",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0"
          }}
        >
          <button
            type="button"
            onClick={() => {
              setViewMode("batch");
              setBatch(null);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              background: viewMode === "batch" ? "#fff" : "transparent",
              color: viewMode === "batch" ? "#2563eb" : "#64748b",
              boxShadow: viewMode === "batch" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            <LayoutGrid size={15} />
            <span>By Cohort / Batch</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              background: viewMode === "table" ? "#fff" : "transparent",
              color: viewMode === "table" ? "#2563eb" : "#64748b",
              boxShadow: viewMode === "table" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            <Table size={15} />
            <span>All Enrolled Learners ({effectiveLearners.length})</span>
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <AllLearnersTableView
          learners={effectiveLearners}
          onContact={(lrn) => setMail({ l: lrn, mode: "email" })}
          onProfile={(lrn) => setProfile(lrn)}
        />
      ) : (
        <div key={batch ? batch.id : "home"} className="lx-view">
          {batch ? (
            <BatchDetail
              batch={batch}
              onBack={() => setBatch(null)}
              onContact={(l, mode) => setMail({ l, mode })}
              onProfile={setProfile}
            />
          ) : (
            <BatchGrid onOpen={setBatch} />
          )}
        </div>
      )}

      {profile && (
        <Portal>
          <LearnerProfileModal
            learner={profile}
            batch={
              batch || {
                name: profile.courseName || "Course",
                cohort: profile.cohort || "Active Cohort",
                start: "Jan 2026"
              }
            }
            onClose={() => setProfile(null)}
            onContact={(l, mode) => setMail({ l, mode })}
          />
        </Portal>
      )}
      {mail && (
        <Portal>
          <LearnerEmailComposer
            learner={mail.l}
            mode={mail.mode}
            batch={batch || { name: mail.l?.courseName || "General Course", tag: "General" }}
            onClose={() => setMail(null)}
          />
        </Portal>
      )}
    </div>
  );
}

export { Learners, Learners as LearnersPage };
