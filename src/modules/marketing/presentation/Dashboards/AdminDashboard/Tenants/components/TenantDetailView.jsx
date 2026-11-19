import React from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { DetailField, InlineDetailView } from "../../common/DetailSection";

export function TenantDetailView({
  tenant,
  onBack,
  onApproveOnboarding,
  onExpandSeats,
  onToggleStatus
}) {
  if (!tenant) return null;

  return (
    <InlineDetailView
      title={tenant.name}
      subtitle={`${tenant.type} · Domain: ${tenant.domain}`}
      status={tenant.status}
      id={tenant.id}
      onBack={onBack}
      actions={
        <>
          {tenant.status === "Onboarding" && (
            <button
              className="primary btn-sm"
              onClick={() => onApproveOnboarding(tenant.id)}
            >
              <CheckCircle2 size={14} /> Approve Onboarding
            </button>
          )}
          <button
            className="secondary btn-sm"
            onClick={() => onExpandSeats(tenant.id)}
          >
            <Plus size={14} /> Add 500 Seats
          </button>
          <button
            className={`secondary btn-sm ${tenant.status === "Suspended" ? "btn-success" : "btn-danger"}`}
            onClick={() => onToggleStatus(tenant.id)}
          >
            {tenant.status === "Suspended" ? "Activate Organization" : "Suspend Organization"}
          </button>
        </>
      }
    >
      <div className="detail-grid">
        <div className="detail-col">
          <h3>Organization & Contract Information</h3>
          <div className="detail-fields-list">
            <DetailField label="Organization Type" value={tenant.type} />
            <DetailField label="Dedicated Domain" value={tenant.domain} mono />
            <DetailField label="Subscription Plan" value={tenant.plan} />
            <DetailField label="Contract Term" value={tenant.contract} />
            <DetailField label="Onboarding Progress">
              <div className="progress-inline">
                <div className="progress">
                  <i style={{ width: `${tenant.onboardingProgress || 0}%` }} />
                </div>
                <span>{tenant.onboardingProgress || 0}%</span>
              </div>
            </DetailField>
            <DetailField label="Date Created" value={tenant.createdAt} />
          </div>
        </div>

        <div className="detail-col">
          <h3>Primary Contact & Location</h3>
          <div className="detail-fields-list">
            <DetailField label="Contact Person" value={tenant.contactName} />
            <DetailField label="Official Email" value={tenant.contactEmail} mono />
            <DetailField label="Phone Number" value={tenant.phone} />
            <DetailField label="Location / Campus" value={tenant.city} />
            <DetailField
              label="Offered Courses"
              value={tenant.coursesOffered ? `${tenant.coursesOffered} Courses` : "None configured"}
            />
            <DetailField
              label="Active Cohorts"
              value={tenant.activeBatches ? `${tenant.activeBatches} Batches` : "None"}
            />
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Seat Utilization & License Capacity</h3>
        <div className="capacity-card">
          <div className="capacity-stat">
            <strong>{tenant.used.toLocaleString("en-IN")}</strong>
            <span>Learners Enrolled</span>
          </div>
          <div className="capacity-bar-container">
            <div className="capacity-bar-header">
              <span>Usage: {Math.round((tenant.used / tenant.seats) * 100)}%</span>
              <span>Cap: {tenant.seats.toLocaleString("en-IN")} Seats</span>
            </div>
            <div className="progress">
              <i
                style={{
                  width: `${Math.min(100, (tenant.used / tenant.seats) * 100)}%`,
                  background: (tenant.used / tenant.seats) >= 0.9 ? "#d34f42" : "#2850d9"
                }}
              />
            </div>
          </div>
          <div className="capacity-stat">
            <strong>{(tenant.seats - tenant.used).toLocaleString("en-IN")}</strong>
            <span>Available Seats</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Submitted Compliance & Verification Documents</h3>
        {tenant.documentsSubmitted && tenant.documentsSubmitted.length > 0 ? (
          <div className="doc-pills">
            {tenant.documentsSubmitted.map((doc, idx) => (
              <span className="doc-pill" key={idx}>
                <CheckCircle2 size={13} className="text-success" /> {doc}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted italic">No compliance documents submitted yet.</p>
        )}
      </div>
    </InlineDetailView>
  );
}
