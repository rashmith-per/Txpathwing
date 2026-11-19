import React, { useState } from "react";
import "./Subscriptions.css";
import {
  CheckCircle2, Layers, Shield, SlidersHorizontal, Sparkles, Trash2, Zap
} from "lucide-react";
import { Badge, getStatusTone } from "../common/Badge";
import { Metric } from "../common/Metric";
import { DetailField, InlineDetailView } from "../common/DetailSection";
import { EditSubscriptionModal } from "./components/EditSubscriptionModal";
import { DeleteSubscriptionModal } from "./components/DeleteSubscriptionModal";
import { SubscriptionPlansGrid } from "./components/SubscriptionPlansGrid";

export function Subscriptions({
  subscriptions,
  tenants,
  setTenants,
  setNotice
}) {
  const [selectedSubTenant, setSelectedSubTenant] = useState(null);
  const [editingTenant, setEditingTenant] = useState(null);
  const [deletingTenant, setDeletingTenant] = useState(null);

  function handleUpgrade(tenantId, newPlan) {
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === tenantId) {
          const updated = { ...t, plan: newPlan };
          if (selectedSubTenant && selectedSubTenant.id === tenantId) {
            setSelectedSubTenant(updated);
          }
          return updated;
        }
        return t;
      })
    );
    setNotice(`Tenant "${selectedSubTenant?.name}" upgraded to ${newPlan}.`);
  }

  function handleRenewContract(tenantId) {
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === tenantId) {
          const updated = { ...t, contract: "Nov 26 – Nov 27", status: "Active" };
          if (selectedSubTenant && selectedSubTenant.id === tenantId) {
            setSelectedSubTenant(updated);
          }
          return updated;
        }
        return t;
      })
    );
    setNotice(`Contract renewed for 12 months for ${selectedSubTenant?.name}.`);
  }

  function handleSaveEdit(data) {
    const id = editingTenant.id;
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
    if (selectedSubTenant && selectedSubTenant.id === id) {
      setSelectedSubTenant((prev) => ({ ...prev, ...data }));
    }
    setNotice(`Subscription for "${editingTenant.name}" updated.`);
    setEditingTenant(null);
  }

  function handleDelete() {
    const { id, name } = deletingTenant;
    setTenants((prev) => prev.filter((t) => t.id !== id));
    if (selectedSubTenant && selectedSubTenant.id === id) {
      setSelectedSubTenant(null);
    }
    setNotice(`Subscription for "${name}" deleted.`);
    setDeletingTenant(null);
  }

  const enterpriseCount = tenants.filter((t) => t.plan === "Enterprise LMS").length;
  const proCount = tenants.filter((t) => t.plan === "Professional").length;
  const basicCount = tenants.filter((t) => t.plan === "Basic").length;

  return (
    <>
      <div className="metrics-grid four">
        <Metric label="ACTIVE CONTRACTS" value={String(tenants.length + 25)} foot="Across all organizations" icon={Layers} />
        <Metric label="ENTERPRISE TIERS" value={String(enterpriseCount + 2)} foot="Dedicated boundaries" icon={Sparkles} />
        <Metric label="PROFESSIONAL TIERS" value={String(proCount + 13)} foot="Growth LMS plans" icon={Zap} />
        <Metric label="BASIC TIERS" value={String(basicCount + 10)} foot="Essential features" icon={Shield} />
      </div>

      <SubscriptionPlansGrid subscriptions={subscriptions} />

      {selectedSubTenant ? (
        <InlineDetailView
          title={`Subscription: ${selectedSubTenant.name}`}
          subtitle={`Current Plan: ${selectedSubTenant.plan} · Domain: ${selectedSubTenant.domain}`}
          status={selectedSubTenant.status}
          id={selectedSubTenant.id}
          onBack={() => setSelectedSubTenant(null)}
          actions={
            <>
              {selectedSubTenant.plan !== "Enterprise LMS" && (
                <button
                  className="primary btn-sm"
                  onClick={() => handleUpgrade(selectedSubTenant.id, "Enterprise LMS")}
                >
                  <Sparkles size={14} /> Upgrade to Enterprise
                </button>
              )}
              <button
                className="secondary btn-sm"
                onClick={() => handleRenewContract(selectedSubTenant.id)}
              >
                <CheckCircle2 size={14} /> Renew for 1 Year
              </button>
            </>
          }
        >
          <div className="detail-grid">
            <div className="detail-col">
              <h3>Plan & Licensing Terms</h3>
              <div className="detail-fields-list">
                <DetailField label="Organization" value={selectedSubTenant.name} />
                <DetailField label="Active Plan Tier" value={selectedSubTenant.plan} />
                <DetailField label="Contract Window" value={selectedSubTenant.contract} />
                <DetailField label="Billing Frequency" value="Annual Enterprise Invoicing" />
                <DetailField label="Tenant Status">
                  <Badge tone={getStatusTone(selectedSubTenant.status)}>{selectedSubTenant.status}</Badge>
                </DetailField>
              </div>
            </div>

            <div className="detail-col">
              <h3>Capacity & Seat Allocation</h3>
              <div className="detail-fields-list">
                <DetailField label="Contracted Limit" value={`${selectedSubTenant.seats.toLocaleString("en-IN")} Seats`} />
                <DetailField label="Active Learners" value={`${selectedSubTenant.used.toLocaleString("en-IN")} Enrolled`} />
                <DetailField label="Available Seats" value={`${(selectedSubTenant.seats - selectedSubTenant.used).toLocaleString("en-IN")} Seats Remaining`} />
                <DetailField label="Utilization Rate">
                  <div className="progress-inline">
                    <div className="progress">
                      <i style={{ width: `${Math.round((selectedSubTenant.used / selectedSubTenant.seats) * 100)}%` }} />
                    </div>
                    <span>{Math.round((selectedSubTenant.used / selectedSubTenant.seats) * 100)}%</span>
                  </div>
                </DetailField>
              </div>
            </div>
          </div>
        </InlineDetailView>
      ) : (
        <section className="card mt-3">
          <div className="table-heading">
            <div className="heading-left">
              <h2>Tenant Subscriptions & SLA Entitlements</h2>
              <Badge>{tenants.length} tenants</Badge>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Type</th>
                  <th>Current Plan</th>
                  <th>Contracted Seats</th>
                  <th>Used Seats</th>
                  <th>Contract Term</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr
                    key={t.id || t.name}
                    className="hoverable-row"
                    onClick={() => setSelectedSubTenant(t)}
                  >
                    <td><strong>{t.name}</strong></td>
                    <td>{t.type}</td>
                    <td><Badge tone="blue">{t.plan}</Badge></td>
                    <td>{t.seats.toLocaleString("en-IN")}</td>
                    <td>{t.used.toLocaleString("en-IN")}</td>
                    <td>{t.contract}</td>
                    <td><Badge tone={getStatusTone(t.status)}>{t.status}</Badge></td>
                    <td>
                      <div className="sub-action-group">
                        <button
                          className="sub-icon-btn"
                          title="Manage subscription"
                          aria-label="Manage subscription"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTenant(t);
                          }}
                        >
                          <SlidersHorizontal size={15} />
                        </button>
                        <button
                          className="sub-icon-btn sub-icon-danger"
                          title="Delete subscription"
                          aria-label="Delete subscription"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingTenant(t);
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {editingTenant && (
        <EditSubscriptionModal
          key={editingTenant.id}
          tenant={editingTenant}
          onClose={() => setEditingTenant(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deletingTenant && (
        <DeleteSubscriptionModal
          tenant={deletingTenant}
          onClose={() => setDeletingTenant(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
