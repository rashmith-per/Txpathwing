import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar, ChevronDown, Copy, Eye, GraduationCap, Pencil, Percent, Plus, Power,
  Search, SlidersHorizontal, Tag, Trash2, Users, X,
} from "lucide-react";
import "./Coupons.css";

/* ------------------------------------------------------------------
   Adapter: reads your existing coupon records even if the key names
   differ (discount / value, expiry / validUntil, redemptions "342 / 1,000" ...).
------------------------------------------------------------------- */
const pick = (o, keys, fallback) => {
  for (const k of keys) if (o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  return fallback;
};
const toNum = (v) => {
  const n = parseInt(String(v).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
};
function parseUsage(r) {
  const raw = pick(r, ["redemptions", "used", "redeemed", "usage"], 0);
  const lim = pick(r, ["limit", "maxRedemptions", "usageLimit", "max", "total"], null);
  if (typeof raw === "string" && raw.includes("/")) {
    const [a, b] = raw.split("/");
    return [toNum(a), lim !== null ? toNum(lim) : toNum(b)];
  }
  return [toNum(raw), lim !== null ? toNum(lim) : 0];
}
function normalize(r) {
  const rawVal = pick(r, ["value", "discount", "amount", "discountValue"], 0);
  let type = pick(r, ["type", "discountType"], null);
  if (!type) type = String(rawVal).includes("%") ? "Percentage" : "Fixed";
  type = /fix|flat/i.test(type) ? "Fixed" : "Percentage";
  const [used, limit] = parseUsage(r);
  return {
    id: r.id ?? r.code,
    code: pick(r, ["code", "name"], "—"),
    type,
    value: toNum(rawVal),
    scope: pick(r, ["scope", "appliesTo", "applicableTo", "applicable"], "All courses"),
    valid: pick(r, ["validUntil", "expiry", "expiresOn", "validTill", "valid"], "—"),
    used,
    limit,
    status: pick(r, ["status"], "Active"),
    desc: pick(r, ["desc", "description"], "Discount coupon"),
  };
}
const discountLabel = (c) =>
  c.type === "Percentage" ? `${c.value}% off` : `₹${c.value.toLocaleString("en-IN")} off`;
const fmt = (n) => n.toLocaleString("en-IN");
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const toISO = (s) => {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

function useCountUp(target, ms = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof target !== "number") return;
    let raf, t0;
    const step = (t) => {
      t0 = t0 ?? t;
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return typeof target === "number" ? n : target;
}

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

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="cp-overlay" onMouseDown={onClose}>
      <div className="cp-modal" role="dialog" aria-label={title} onMouseDown={(e) => e.stopPropagation()}>
        <div className="cp-modal-head">
          <h3>{title}</h3>
          <button className="cp-icon" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Card({ c, index, menuOpen, setMenu, onView, onCopy, onEdit, onToggle, onDuplicate, onDelete }) {
  const pct = c.limit ? Math.min(100, Math.round((c.used / c.limit) * 100)) : 0;
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article className={`cp-card${menuOpen ? " cp-open" : ""}`} style={{ "--i": index }} onMouseMove={spotlight}>
      <div className="cp-top">
        <span className="cp-tag">{c.type}</span>
        <span className={`cp-pill cp-${c.status}`}>{c.status}</span>
      </div>
      <div className="cp-coderow">
        <h3>{c.code}</h3>
        <button className="cp-icon" aria-label="Copy code" onClick={() => onCopy(c)}><Copy size={15} /></button>
      </div>
      <p className="cp-desc">{c.desc} · {c.scope}</p>
      <ul className="cp-facts">
        <li className="cp-hl"><Tag size={15} />{discountLabel(c)}</li>
        <li><GraduationCap size={15} />{c.scope}</li>
        <li><Calendar size={15} />Valid until {c.valid}</li>
      </ul>
      <div className="cp-use">
        <div><span>Redemptions</span><b>{fmt(c.used)} / {fmt(c.limit)}</b></div>
        <div className="cp-track"><div className={`cp-fill${pct >= 100 ? " cp-full" : ""}`} style={{ "--w": `${pct}%` }} /></div>
      </div>
      <div className="cp-actions">
        <button className="cp-btn cp-ghost" onClick={() => onView(c)}><Eye size={15} /> View Coupon</button>
        <button className="cp-btn" onClick={(e) => { e.stopPropagation(); setMenu(menuOpen ? null : c.id); }}>
          <SlidersHorizontal size={15} /> Manage <ChevronDown size={14} />
        </button>
        {menuOpen && (
          <div className="cp-menu" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onEdit(c)}><Pencil size={15} /> Edit</button>
            {c.status !== "Expired" && (
              <button onClick={() => onToggle(c)}>
                <Power size={15} /> {c.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            )}
            <button onClick={() => onDuplicate(c)}><Copy size={15} /> Duplicate</button>
            <hr />
            <button className="cp-del" onClick={() => onDelete(c)}><Trash2 size={15} /> Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}

function CouponForm({ existing, initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { code: initial.code, type: initial.type, value: String(initial.value), scope: initial.scope, date: toISO(initial.valid), limit: String(initial.limit) }
      : { code: "", type: "Percentage", value: "", scope: "All courses", date: "", limit: "" }
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
    onSave({ code, type: f.type, value, scope: f.scope.trim() || "All courses", valid: fmtDate(f.date), limit });
  };

  return (
    <div className="cp-form">
      <label>Coupon code<input value={f.code} onChange={set("code")} placeholder="e.g. NEWYEAR25" /></label>
      <div className="cp-two">
        <label>Discount type
          <select value={f.type} onChange={set("type")}><option>Percentage</option><option>Fixed</option></select>
        </label>
        <label>{f.type === "Percentage" ? "Percent off" : "Amount off (₹)"}
          <input type="number" min="1" value={f.value} onChange={set("value")} />
        </label>
      </div>
      <label>Applies to<input value={f.scope} onChange={set("scope")} placeholder="All courses" /></label>
      <div className="cp-two">
        <label>Valid until<input type="date" value={f.date} onChange={set("date")} /></label>
        <label>Redemption limit<input type="number" min="1" value={f.limit} onChange={set("limit")} /></label>
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
            <Card key={c.id} c={c} index={i} menuOpen={menu === c.id} setMenu={setMenu}
              onView={setViewing} onCopy={copy} onEdit={(x) => { setMenu(null); setEditing(x); }}
              onToggle={toggle} onDuplicate={duplicate} onDelete={(x) => { setMenu(null); setDeleting(x); }} />
          ))
        ) : (
          <div className="cp-empty">No coupons match your search.</div>
        )}
      </div>

      {creating && (
        <Modal title="Create coupon" onClose={() => setCreating(false)}>
          <CouponForm existing={items.map((c) => c.code)} onSave={create} onCancel={() => setCreating(false)} />
        </Modal>
      )}

      {editing && (
        <Modal title={`Edit ${editing.code}`} onClose={() => setEditing(null)}>
          <CouponForm
            initial={editing}
            existing={items.filter((c) => c.id !== editing.id).map((c) => c.code)}
            onSave={saveEdit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete coupon?" onClose={() => setDeleting(null)}>
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
        </Modal>
      )}

      {viewing && (() => {
        const c = items.find((x) => x.id === viewing.id) || viewing;
        const pct = c.limit ? Math.min(100, Math.round((c.used / c.limit) * 100)) : 0;
        return (
          <Modal title={c.code} onClose={() => setViewing(null)}>
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
          </Modal>
        );
      })()}
    </div>
  );
}

export default Coupons;