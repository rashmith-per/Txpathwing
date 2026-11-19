import { useState, useEffect } from "react";

export const pick = (o, keys, fallback) => {
  for (const k of keys) if (o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  return fallback;
};

export const toNum = (v) => {
  const n = parseInt(String(v).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
};

export function parseUsage(r) {
  const raw = pick(r, ["redemptions", "used", "redeemed", "usage"], 0);
  const lim = pick(r, ["limit", "maxRedemptions", "usageLimit", "max", "total"], null);
  if (typeof raw === "string" && raw.includes("/")) {
    const [a, b] = raw.split("/");
    return [toNum(a), lim !== null ? toNum(lim) : toNum(b)];
  }
  return [toNum(raw), lim !== null ? toNum(lim) : 0];
}

export function normalize(r) {
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

export const discountLabel = (c) =>
  c.type === "Percentage" ? `${c.value}% off` : `₹${c.value.toLocaleString("en-IN")} off`;

export const fmt = (n) => n.toLocaleString("en-IN");

export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const toISO = (s) => {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export function useCountUp(target, ms = 1200) {
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
