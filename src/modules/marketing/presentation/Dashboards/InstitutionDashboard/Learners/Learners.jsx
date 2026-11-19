import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import DataTable from "../Layout/DataTable.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { departments } from "../Overview/overviewData.js";
import { learners } from "./learnersData.js";
import { matchesSearch } from "../utils.js";
import "./Learner.css";

const SUMMARY = [
  { value: "2,140", label: "Total learners" },
  { value: "1,986", label: "Active this term" },
  { value: "418", label: "Placement ready" },
  { value: "23", label: "Need support" }
];

export default function Learners({ search, showMessage }) {
  const [departmentFilter, setDepartmentFilter] = useState("All departments");
  const fileInputRef = useRef(null);

  const filtered = learners.filter(
    (learner) =>
      matchesSearch(learner, search) &&
      (departmentFilter === "All departments" || learner.department === departmentFilter)
  );

  const rows = filtered.map((learner) => ({
    key: learner.email,
    cells: [
      <div className="person-cell">
        <span className="table-avatar">{learner.name.split(" ").map((part) => part[0]).join("")}</span>
        <span><strong>{learner.name}</strong><small>{learner.email}</small></span>
      </div>,
      learner.department,
      learner.programme,
      <div className="table-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${learner.progress}%` }} />
        </div>
        <span>{learner.progress}%</span>
      </div>,
      <StatusTag>{learner.status}</StatusTag>
    ]
  }));

  return (
    <>
      <PageHeading
        eyebrow="PEOPLE · LEARNERS"
        title="Learners"
        description="Monitor learner progress, programme enrollment, and support needs."
      >
        <input
          ref={fileInputRef}
          className="visually-hidden"
          type="file"
          accept=".csv"
          onChange={(event) =>
            event.target.files?.[0] &&
            showMessage(`${event.target.files[0].name} selected. CSV import is ready for review.`)
          }
        />
        <button className="primary-action" type="button" onClick={() => fileInputRef.current?.click()}>
          <FileUp size={16} />Import CSV
        </button>
      </PageHeading>

      <SummaryStrip items={SUMMARY} />

      <section className="panel page-panel">
        <div className="table-toolbar">
          <div>
            <h2>Learner directory</h2>
            <p>Showing sample records from 2,140 enrolled learners</p>
          </div>
          <label className="filter-control">
            <span>Department</span>
            <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
              <option>All departments</option>
              {departments.map((department) => <option key={department.name}>{department.name}</option>)}
            </select>
          </label>
        </div>
        <DataTable columns={["LEARNER", "DEPT.", "PROGRAMME", "PROGRESS", "STATUS"]} rows={rows} />
      </section>
    </>
  );
}
