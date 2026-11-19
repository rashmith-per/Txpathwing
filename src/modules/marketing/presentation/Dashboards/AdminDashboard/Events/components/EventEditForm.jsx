import React, { useState } from "react";

const MODE_OPTIONS = ["Online", "Onsite", "Hybrid"];
const TYPE_OPTIONS = ["Hackathon", "Workshop", "Bootcamp", "Webinar"];
const STATUS_OPTIONS = ["Upcoming", "Registration open", "Draft"];

export function EventEditForm({ event, initial, onSave, onCancel }) {
  const base = event || initial || {
    id: null,
    title: "",
    organization: "",
    venue: "",
    type: "Hackathon",
    mode: "Online",
    date: "",
    capacity: 100,
    registrations: 0,
    status: "Upcoming",
    description: "",
  };

  const [form, setForm] = useState({
    ...base,
    capacity: String(base.capacity ?? 100),
    description: base.description || "",
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setError("Event title is required.");
    const capacity = Number(form.capacity);
    if (!Number.isInteger(capacity) || capacity < 1)
      return setError("Capacity must be a whole number greater than 0.");
    if (capacity < (base.registrations || 0))
      return setError(
        `Capacity cannot be lower than the ${base.registrations} current registrations.`
      );
    setError("");
    if (onSave) {
      onSave({ ...form, title: form.title.trim(), capacity });
    }
  }

  return (
    <form id="event-edit-form" className="form-grid-2" onSubmit={submit}>
      {error && <p className="form-error">{error}</p>}

      <label className="form-field span-full">
        Event title
        <input value={form.title} onChange={set("title")} placeholder="e.g. AI Hackathon 2026" />
      </label>
      <label className="form-field">
        Host organization
        <input value={form.organization} onChange={set("organization")} placeholder="e.g. Tech Academy" />
      </label>
      <label className="form-field">
        Venue / stream link
        <input value={form.venue} onChange={set("venue")} placeholder="e.g. Auditorium / Zoom" />
      </label>
      <label className="form-field">
        Type
        <select value={form.type} onChange={set("type")}>
          {TYPE_OPTIONS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="form-field">
        Delivery mode
        <select value={form.mode} onChange={set("mode")}>
          {MODE_OPTIONS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className="form-field">
        Date & schedule
        <input value={form.date} onChange={set("date")} placeholder="e.g. 25 Nov 2026, 10:00 AM" />
      </label>
      <label className="form-field">
        Capacity
        <input type="number" min="1" value={form.capacity} onChange={set("capacity")} />
      </label>
      <label className="form-field span-full">
        Status
        <select value={form.status} onChange={set("status")}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="form-field span-full">
        Description
        <textarea
          value={form.description}
          onChange={set("description")}
          placeholder="Describe the event agenda, requirements..."
        />
      </label>

      <div className="modal-actions span-full">
        <button type="button" className="secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary btn-sm">
          Save Event
        </button>
      </div>
    </form>
  );
}
