import React, { useState } from "react";
import { X } from "lucide-react";

const PLANS = ["Basic", "Professional", "Enterprise LMS"];
const STATUSES = ["Active", "Suspended", "Expired"];

export function EditSubscriptionModal({ tenant, onClose, onSave }) {
  const [form, setForm] = useState({
    plan: tenant.plan,
    seats: String(tenant.seats),
    contract: tenant.contract,
    status: tenant.status,
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const seats = Number(form.seats);
    if (!Number.isFinite(seats) || seats < tenant.used) {
      setError(`Seats can't be below used seats (${tenant.used.toLocaleString("en-IN")}).`);
      return;
    }
    if (!form.contract.trim()) {
      setError("Contract term is required.");
      return;
    }
    onSave({ plan: form.plan, seats, contract: form.contract.trim(), status: form.status });
  }

  return (
    <div className="sub-modal-backdrop" onClick={onClose}>
      <form className="sub-modal" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="sub-modal-header">
          <div>
            <h2>Edit subscription</h2>
            <p>{tenant.name}</p>
          </div>
          <button type="button" className="sub-icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <label className="sub-field">
          Plan
          <select value={form.plan} onChange={set("plan")}>
            {PLANS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <label className="sub-field">
          Contracted seats
          <input type="number" min={0} value={form.seats} onChange={set("seats")} />
          <span className="sub-hint">Used: {tenant.used.toLocaleString("en-IN")}</span>
        </label>

        <label className="sub-field">
          Contract term
          <input
            type="text"
            value={form.contract}
            onChange={set("contract")}
            placeholder="e.g. Jun 26 – May 27"
          />
        </label>

        <label className="sub-field">
          Status
          <select value={form.status} onChange={set("status")}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        {error && <p className="sub-error">{error}</p>}

        <div className="sub-modal-actions">
          <button type="button" className="secondary btn-sm" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary btn-sm">Save changes</button>
        </div>
      </form>
    </div>
  );
}
