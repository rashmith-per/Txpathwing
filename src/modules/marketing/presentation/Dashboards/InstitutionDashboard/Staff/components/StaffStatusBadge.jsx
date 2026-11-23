export default function StaffStatusBadge({ status }) {
  const normalized = (status || "Active").trim();
  const slug = normalized.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`staff-status-pill status-pill-${slug}`}>
      <span className="status-dot" aria-hidden="true" />
      <span>{normalized}</span>
    </span>
  );
}
