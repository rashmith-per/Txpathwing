import React from "react";
import {
  Calendar, ChevronDown, Copy, Eye, GraduationCap,
  Pencil, Power, SlidersHorizontal, Tag, Trash2
} from "lucide-react";
import { discountLabel, fmt } from "../couponUtils";

export function CouponCard({
  c,
  index,
  menuOpen,
  setMenu,
  onView,
  onCopy,
  onEdit,
  onToggle,
  onDuplicate,
  onDelete
}) {
  const pct = c.limit ? Math.min(100, Math.round((c.used / c.limit) * 100)) : 0;
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      className={`cp-card${menuOpen ? " cp-open" : ""}`}
      style={{ "--i": index }}
      onMouseMove={spotlight}
    >
      <div className="cp-top">
        <span className="cp-tag">{c.type}</span>
        <span className={`cp-pill cp-${c.status}`}>{c.status}</span>
      </div>
      <div className="cp-coderow">
        <h3>{c.code}</h3>
        <button className="cp-icon" aria-label="Copy code" onClick={() => onCopy(c)}>
          <Copy size={15} />
        </button>
      </div>
      <p className="cp-desc">{c.desc} · {c.scope}</p>
      <ul className="cp-facts">
        <li className="cp-hl"><Tag size={15} />{discountLabel(c)}</li>
        <li><GraduationCap size={15} />{c.scope}</li>
        <li><Calendar size={15} />Valid until {c.valid}</li>
      </ul>
      <div className="cp-use">
        <div><span>Redemptions</span><b>{fmt(c.used)} / {fmt(c.limit)}</b></div>
        <div className="cp-track">
          <div className={`cp-fill${pct >= 100 ? " cp-full" : ""}`} style={{ "--w": `${pct}%` }} />
        </div>
      </div>
      <div className="cp-actions">
        <button className="cp-btn cp-ghost" onClick={() => onView(c)}>
          <Eye size={15} /> View Coupon
        </button>
        <button
          className="cp-btn"
          onClick={(e) => {
            e.stopPropagation();
            setMenu(menuOpen ? null : c.id);
          }}
        >
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
