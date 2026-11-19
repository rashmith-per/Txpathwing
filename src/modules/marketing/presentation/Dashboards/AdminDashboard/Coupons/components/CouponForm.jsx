import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { fmtDate, toISO } from "../couponUtils";

export function CouponForm({ existing, initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? {
          code: initial.code,
          type: initial.type,
          value: String(initial.value),
          scope: initial.scope,
          date: toISO(initial.valid),
          limit: String(initial.limit)
        }
      : {
          code: "",
          type: "Percentage",
          value: "",
          scope: "All courses",
          date: "",
          limit: ""
        }
  );
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = () => {
    const code = f.code.trim().toUpperCase();
    const value = Number(f.value), limit = Number(f.limit);
    if (!code) return setErr("Enter a coupon code.");
    if (existing.includes(code)) return setErr("That code already exists.");
    if (!(value > 0) || (f.type === "Percentage" && value > 100)) return setErr("Enter a valid discount value.");
    if (!f.date) return setErr("Choose a validity date.");
    if (!(limit > 0)) return setErr("Enter a redemption limit.");
    onSave({
      code,
      type: f.type,
      value,
      scope: f.scope.trim() || "All courses",
      valid: fmtDate(f.date),
      limit
    });
  };

  return (
    <div className="cp-form">
      <label>
        Coupon code
        <input value={f.code} onChange={set("code")} placeholder="e.g. NEWYEAR25" />
      </label>
      <div className="cp-two">
        <label>
          Discount type
          <select value={f.type} onChange={set("type")}>
            <option>Percentage</option>
            <option>Fixed</option>
          </select>
        </label>
        <label>
          {f.type === "Percentage" ? "Percent off" : "Amount off (₹)"}
          <input type="number" min="1" value={f.value} onChange={set("value")} />
        </label>
      </div>
      <label>
        Applies to
        <input value={f.scope} onChange={set("scope")} placeholder="All courses" />
      </label>
      <div className="cp-two">
        <label>
          Valid until
          <input type="date" value={f.date} onChange={set("date")} />
        </label>
        <label>
          Redemption limit
          <input type="number" min="1" value={f.limit} onChange={set("limit")} />
        </label>
      </div>
      {err && <div className="cp-err">{err}</div>}
      <div className="cp-form-actions">
        <button className="cp-btn cp-ghost" onClick={onCancel}>Cancel</button>
        <button className="cp-btn" onClick={submit}>
          {initial ? <><Pencil size={15} /> Save changes</> : <><Plus size={16} /> Create Coupon</>}
        </button>
      </div>
    </div>
  );
}
