import React, { useState } from "react";

const MODE_OPTIONS = ["Online", "Onsite", "Hybrid"];
const TYPE_OPTIONS = ["Hackathon", "Workshop", "Bootcamp", "Webinar"];
const STATUS_OPTIONS = ["Upcoming", "Registration open", "Draft"];

export function EventEditForm({ event, onSave }) {
  const [form, setForm] = useState({
    ...event,
    capacity: String(event.capacity),
    description: event.description || "",
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setError("Event title is required.");
    const capacity = Number(form.capacity);
    if (!Number.isInteger(capacity) || capacity < 1)
      return setError("Capacity must be a whole number greater than 0.");
    if (capacity < event.registrations)
      return setError(
        `Capacity cannot be lower than the ${event.registrations} current registrations.`
      );
    setError("");
    onSave({ ...form, title: form.title.trim(), capacity });
  }

  return (
    <form id="event-edit-form" className="form-grid-2" onSubmit={submit}>
      {error && <p className="form-error">{error}</p>}

      <label className="form-field span-full">
        Event title
        <input value={form.title} onChange={set("title")} />
      </label>
      <label className="form-field">
        Host organization
        <input value={form.organization} onChange={set("organization")} />
      </label>
      <label className="form-field">
        Venue / stream link
        <input value={form.venue} onChange={set("venue")} />
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
        <input value={form.date} onChange={set("date")} />
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
        <textarea value={form.description} onChange={set("description")} />
      </label>
    </form>
  );
}
