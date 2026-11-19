import { Activity, ArrowDownToLine, ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import DataTable from "../Layout/DataTable.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { requirements } from "./complianceData.js";
import { downloadCsv, matchesSearch } from "../utils.js";
import "./Compliance.css";

const SUMMARY = [
  { value: "5", label: "Requirements" },
  { value: "1", label: "Complete" },
  { value: "2", label: "In review" },
  { value: "2", label: "Action needed" }
];

export default function Compliance({ search, showMessage }) {
  const rows = requirements
    .filter((requirement) => matchesSearch(requirement, search))
    .map((requirement) => ({
      key: requirement.name,
      cells: [
        <span><strong>{requirement.name}</strong><small className="cell-subtext">{requirement.category}</small></span>,
        requirement.due,
        requirement.owner,
        <StatusTag>{requirement.state}</StatusTag>,
        <button className="table-action" type="button" onClick={() => showMessage(`${requirement.name} opened for review.`)}>
          Review <ArrowRight size={13} />
        </button>
      ]
    }));

  const exportRegister = () =>
    downloadCsv("kits-compliance.csv", [
      ["Requirement", "Category", "Due", "Owner", "Status"],
      ...requirements.map((item) => [item.name, item.category, item.due, item.owner, item.state])
    ]);

  return (
    <>
      <PageHeading
        eyebrow="GOVERNANCE · COMPLIANCE"
        title="Compliance"
        description="Track institutional requirements, owners, due dates, and review status."
      >
        <button className="secondary-action" type="button" onClick={exportRegister}>
          <ArrowDownToLine size={16} />Export register
        </button>
      </PageHeading>

      <SummaryStrip items={SUMMARY} />

      <section className="panel page-panel">
        <div className="table-toolbar">
          <div>
            <h2>Compliance register</h2>
            <p>Current term · 2026–27</p>
          </div>
          <div className="compliance-callout"><Clock3 size={15} />Next deadline: 12 Sep 2026</div>
        </div>
        <DataTable columns={["REQUIREMENT", "DUE DATE", "OWNER", "STATUS", ""]} rows={rows} />
      </section>

      <section className="panel compliance-note">
        <ShieldCheck size={18} />
        <div>
          <strong>Institutional data is up to date</strong>
          <p>Last register update: 08 Sep 2026 · 09:40 IST</p>
        </div>
        <button className="text-action" type="button" onClick={() => showMessage("Register refreshed.")}>
          Refresh <Activity size={14} />
        </button>
      </section>
    </>
  );
}
