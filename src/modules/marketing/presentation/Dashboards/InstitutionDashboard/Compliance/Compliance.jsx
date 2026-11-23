import { useState } from "react";
import { Activity, ArrowDownToLine, ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import DataTable from "../Layout/DataTable.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { requirements as initialReqs } from "./complianceData.js";
import { downloadCsv, matchesSearch } from "../utils.js";
import ComplianceReviewModal from "./ComplianceReviewModal.jsx";
import "./Compliance.css";

export default function Compliance({ search, showMessage }) {
  const [reqsList, setReqsList] = useState(initialReqs);
  const [selectedReqForReview, setSelectedReqForReview] = useState(null);

  const handleSaveReview = (name, status, remarks) => {
    setReqsList((prev) =>
      prev.map((r) => (r.name === name ? { ...r, state: status, remarks } : r))
    );
  };

  const completeCount = reqsList.filter((r) => r.state === "Complete").length;
  const inReviewCount = reqsList.filter((r) => r.state === "In review").length;
  const actionNeededCount = reqsList.filter((r) => r.state === "Action needed").length;

  const summary = [
    { value: reqsList.length.toString(), label: "Requirements" },
    { value: completeCount.toString(), label: "Complete" },
    { value: inReviewCount.toString(), label: "In review" },
    { value: actionNeededCount.toString(), label: "Action needed" }
  ];

  const rows = reqsList
    .filter((requirement) => matchesSearch(requirement, search))
    .map((requirement) => ({
      key: requirement.name,
      cells: [
        <span><strong>{requirement.name}</strong><small className="cell-subtext">{requirement.category}</small></span>,
        requirement.due,
        requirement.owner,
        <StatusTag>{requirement.state}</StatusTag>,
        <button
          className="table-action"
          type="button"
          onClick={() => setSelectedReqForReview(requirement)}
        >
          Review <ArrowRight size={13} />
        </button>
      ]
    }));

  const exportRegister = () => {
    downloadCsv("kits-compliance.csv", [
      ["Requirement", "Category", "Due", "Owner", "Status"],
      ...reqsList.map((item) => [item.name, item.category, item.due, item.owner, item.state])
    ]);
    showMessage("Compliance register exported to CSV.");
  };

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

      <SummaryStrip items={summary} />

      <section className="panel page-panel">
        <div className="table-toolbar">
          <div>
            <h2>Compliance register</h2>
            <p>Current term · 2026–27</p>
          </div>
          <div className="compliance-callout"><Clock3 size={15} />Next deadline: 12 Sep 2026</div>
        </div>
        <DataTable columns={["REQUIREMENT", "DUE DATE", "OWNER", "STATUS", "ACTIONS"]} rows={rows} />
      </section>

      <section className="panel compliance-note">
        <ShieldCheck size={18} />
        <div>
          <strong>Institutional data is up to date</strong>
          <p>Last register update: 08 Sep 2026 · 09:40 IST</p>
        </div>
        <button
          className="text-action"
          type="button"
          onClick={() => showMessage("Compliance register checked and refreshed.")}
        >
          Refresh <Activity size={14} />
        </button>
      </section>

      <ComplianceReviewModal
        key={selectedReqForReview?.name}
        isOpen={Boolean(selectedReqForReview)}
        requirement={selectedReqForReview}
        onClose={() => setSelectedReqForReview(null)}
        onSave={handleSaveReview}
        showMessage={showMessage}
      />
    </>
  );
}
