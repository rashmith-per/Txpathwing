import React from "react";
import { Building2, CheckCircle2, ShieldAlert } from "lucide-react";
import { Metric } from "../../common/Metric";

export function TenantMetrics({ tenants = [] }) {
  const activeCount = tenants.filter(t => t.status === "Active").length;
  const onboardingCount = tenants.filter(t => t.status === "Onboarding").length;
  const totalSeats = tenants.reduce((acc, t) => acc + (Number(t.seats) || 0), 0);

  return (
    <div className="metrics-grid four">
      <Metric
        label="TOTAL ORGANIZATIONS"
        value={String(tenants.length)}
        foot="Configured data boundaries"
        icon={Building2}
      />
      <Metric
        label="ACTIVE ORGANIZATIONS"
        value={String(activeCount)}
        foot="Operational instances"
        icon={CheckCircle2}
      />
      <Metric
        label="IN ONBOARDING"
        value={String(onboardingCount)}
        foot="Awaiting verification"
        icon={ShieldAlert}
        tone={onboardingCount > 0 ? "warning" : "positive"}
      />
      <Metric
        label="CONTRACTED SEATS"
        value={totalSeats.toLocaleString("en-IN")}
        foot="Platform aggregate"
        icon={Building2}
      />
    </div>
  );
}
