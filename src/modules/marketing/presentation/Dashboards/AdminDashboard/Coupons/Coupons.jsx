import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar, Copy, Percent, Plus, Search, Tag, Trash2, Users
} from "lucide-react";
import "./Coupons.css";
import {
  discountLabel, fmt, normalize, useCountUp
} from "./couponUtils";
import { CouponCard } from "./components/CouponCard";
import { CouponModal } from "./components/CouponModal";
import { CouponForm } from "./components/CouponForm";

function Stat({ icon: Icon, label, value, note }) {
  const v = useCountUp(value);
  return (
    <div className="cp-stat">
      <div className="cp-stat-top">
        <small>{label}</small>
        <span className="cp-stat-ico"><Icon size={18} /></span>
      </div>
      <strong>{typeof v === "number" ? v.toLocaleString("en-IN") : v}</strong>
      <em>{note}</em>
    </div>
  );
}

export function Coupons({ coupons = [], setCoupons, setNotice }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [animKey, setAnimKey] = useState(0);
  const [menu, setMenu] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const items = useMemo(() => coupons.map(normalize), [coupons]);
  const notify = (m) => setNotice && setNotice(m);
  const filters = useMemo(() => ["All", ...new Set(items.map((i) => i.status))], [items]);

  useEffect(() => {
    const close = () => setMenu(null);
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("click", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const visible = items.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      `${c.code} ${c.desc} ${c.scope}`.toLowerCase().includes(query.toLowerCase())
  );

  const now = Date.now();
  const expiring = items.filter((c) => {
    const t = Date.parse(c.valid);
    return c.status === "Active" && !Number.isNaN(t) && t >= now - 864e5 && t - now <= 30 * 864e5;
  }).length;
  const types = [items.some((c) => c.type === "Fixed") && "Fixed", items.some((c) => c.type === "Percentage") && "%"]
    .filter(Boolean).join(" & ") || "—";

  const idOf = (r) => r.id ?? r.code;
  const update = (id, patch) => setCoupons((l) => l.map((r) => (idOf(r) === id ? { ...r, ...patch } : r)));

  const copy = (c) => {
    navigator.clipboard?.writeText(c.code);
    notify(`Copied ${c.code} to clipboard`);
  };
  const toggle = (c) => {
    const next = c.status === "Active" ? "Inactive" : "Active";
    update(c.id, { status: next });
    setMenu(null);
    notify(`${c.code} is now ${next}`);
  };
  const duplicate = (c) => {
    const code = `${c.code}-COPY`;
    setCoupons((l) => [{ id: `cpn-${Date.now()}`, code, type: c.type, value: c.value, scope: c.scope, validUntil: c.valid, used: 0, limit: c.limit, status: "Inactive", desc: c.desc }, ...l]);
    setMenu(null);
    notify(`Duplicated ${c.code} as ${code}`);
  };
  const remove = (c) => {
    setCoupons((l) => l.filter((r) => idOf(r) !== c.id));
    setMenu(null);
    notify(`Deleted coupon ${c.code}`);
  };
  const saveEdit = (n) => {
    update(editing.id, { code: n.code, type: n.type, value: n.value, scope: n.scope, validUntil: n.valid, limit: n.limit });
    setEditing(null);
    notify(`Updated coupon ${n.code}`);
  };
  const create = (n) => {
    setCoupons((l) => [{ id: `cpn-${Date.now()}`, code: n.code, type: n.type, value: n.value, scope: n.scope, validUntil: n.valid, used: 0, limit: n.limit, status: "Active", desc: "Discount coupon" }, ...l]);
    setCreating(false);
    setAnimKey((k) => k + 1);
    notify(`Created coupon ${n.code}`);
  };

  return (
    <div className="cp-page">
      <div className="cp-stats">
        <Stat icon={Tag} label="Active coupons" value={items.filter((c) => c.status === "Active").length} note="Platform promotions" />
        <Stat icon={Users} label="Redemptions" value={items.reduce((s, c) => s + c.used, 0)} note="Applied at checkout" />
        <Stat icon={Calendar} label="Expiring soon" value={expiring} note="Review validity" />
        <Stat icon={Percent} label="Discount types" value={types} note="Course & subscription" />
      </div>

      <div className="cp-head">
        <div className="cp-head-l">
          <h2>Discount Coupons &amp; Promotions</h2>
          <span className="cp-count">{visible.length} shown</span>
        </div>
        <button className="cp-btn" onClick={() => setCreating(true)}><Plus size={16} /> Create Coupon</button>
      </div>

      <div className="cp-bar">
        <label className="cp-search">
          <Search size={18} />
          <input type="search" placeholder="Search coupon code or description…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="cp-chips">
          {filters.map((f) => (
            <button key={f} className={`cp-chip${filter === f ? " cp-on" : ""}`} onClick={() => { setFilter(f); setAnimKey((k) => k + 1); }}>
              {f === "All" ? "All statuses" : f}
            </button>
          ))}
        </div>
      </div>

      <div key={animKey} className="cp-grid cp-anim">
        {visible.length ? (
          visible.map((c, i) => (
            <CouponCard
              key={c.id}
              c={c}
              index={i}
              menuOpen={menu === c.id}
              setMenu={setMenu}
              onView={setViewing}
              onCopy={copy}
              onEdit={(x) => { setMenu(null); setEditing(x); }}
              onToggle={toggle}
              onDuplicate={duplicate}
              onDelete={(x) => { setMenu(null); setDeleting(x); }}
            />
          ))
        ) : (
          <div className="cp-empty">No coupons match your search.</div>
        )}
      </div>

      {creating && (
        <CouponModal title="Create coupon" onClose={() => setCreating(false)}>
          <CouponForm existing={items.map((c) => c.code)} onSave={create} onCancel={() => setCreating(false)} />
        </CouponModal>
      )}

      {editing && (
        <CouponModal title={`Edit ${editing.code}`} onClose={() => setEditing(null)}>
          <CouponForm
            initial={editing}
            existing={items.filter((c) => c.id !== editing.id).map((c) => c.code)}
            onSave={saveEdit}
            onCancel={() => setEditing(null)}
          />
        </CouponModal>
      )}

      {deleting && (
        <CouponModal title="Delete coupon?" onClose={() => setDeleting(null)}>
          <p className="cp-confirm">
            <b>{deleting.code}</b> will be removed permanently
            {deleting.used > 0 ? ` (it has ${fmt(deleting.used)} redemptions)` : ""}. This can’t be undone.
          </p>
          <div className="cp-form-actions">
            <button className="cp-btn cp-ghost" onClick={() => setDeleting(null)}>Cancel</button>
            <button className="cp-btn cp-danger" onClick={() => { remove(deleting); setDeleting(null); }}>
              <Trash2 size={15} /> Delete coupon
            </button>
          </div>
        </CouponModal>
      )}

      {viewing && (() => {
        const c = items.find((x) => x.id === viewing.id) || viewing;
        const pct = c.limit ? Math.min(100, Math.round((c.used / c.limit) * 100)) : 0;
        return (
          <CouponModal title={c.code} onClose={() => setViewing(null)}>
            <div className="cp-view">
              <div className="cp-view-top">
                <span className="cp-tag">{c.type}</span>
                <span className={`cp-pill cp-${c.status}`}>{c.status}</span>
              </div>
              {[
                ["Coupon code", c.code], ["Discount", discountLabel(c)], ["Applies to", c.scope],
                ["Valid until", c.valid], ["Redemptions", `${fmt(c.used)} of ${fmt(c.limit)}`],
                ["Remaining", fmt(Math.max(0, c.limit - c.used))],
              ].map(([l, v]) => (
                <div className="cp-row" key={l}><span>{l}</span><b>{v}</b></div>
              ))}
              <div className="cp-track cp-big"><div className="cp-fill" style={{ "--w": `${pct}%` }} /></div>
              <div className="cp-form-actions">
                <button className="cp-btn cp-ghost" onClick={() => copy(c)}><Copy size={15} /> Copy code</button>
                <button className="cp-btn" onClick={() => setViewing(null)}>Done</button>
              </div>
            </div>
          </CouponModal>
        );
      })()}
    </div>
  );
}

export default Coupons;
