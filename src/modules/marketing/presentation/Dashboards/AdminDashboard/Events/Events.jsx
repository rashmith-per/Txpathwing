import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Events.css";
import {
  Activity, Calendar, CheckCircle2, ChevronDown, Download, Eye, MapPin,
  Pencil, Plus, Search, SearchX, Settings2, Trash2, UserPlus, Users, X
} from "lucide-react";
import { Badge, getStatusTone } from "../common/Badge";
import { Metric } from "../common/Metric";
import { DetailField, InlineDetailView } from "../common/DetailSection";

const MODE_OPTIONS = ["Online", "Onsite", "Hybrid"];
const TYPE_OPTIONS = ["Hackathon", "Workshop", "Bootcamp", "Webinar"];
const STATUS_OPTIONS = ["Upcoming", "Registration open", "Draft"];

const BLANK_EVENT = {
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

const pctOf = (e) =>
  e.capacity ? Math.min(100, Math.round((e.registrations / e.capacity) * 100)) : 0;

/* ---------- Manage dropdown on each card ---------- */
function ManageMenu({ onEdit, onAddAttendees, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (fn) => () => {
    setOpen(false);
    fn();
  };

  return (
    <div className="manage-wrap" ref={ref}>
      <button
        className="primary btn-sm manage-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <Settings2 size={14} /> Manage
        <ChevronDown size={14} className={`chev ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="manage-menu" role="menu">
          <button role="menuitem" className="manage-item" onClick={pick(onEdit)}>
            <Pencil size={14} /> Edit event
          </button>
          <button role="menuitem" className="manage-item" onClick={pick(onAddAttendees)}>
            <UserPlus size={14} /> Add attendees
          </button>
          <div className="manage-divider" />
          <button role="menuitem" className="manage-item danger" onClick={pick(onDelete)}>
            <Trash2 size={14} /> Delete event
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Event card ---------- */
function EventCard({ event, onView, onEdit, onAddAttendees, onDelete }) {
  return (
    <article className="card event-card">
      <div className="event-card-top">
        <Badge tone="blue">{event.type}</Badge>
        <Badge tone={getStatusTone(event.status)}>{event.status}</Badge>
      </div>

      <div className="event-card-title">
        <h3>{event.title}</h3>
        <small className="row-sub">{event.venue}</small>
      </div>

      <dl className="event-card-meta">
        <div>
          <Users size={13} />
          <span>{event.organization}</span>
        </div>
        <div>
          <MapPin size={13} />
          <span>{event.mode}</span>
        </div>
        <div>
          <Calendar size={13} />
          <span>{event.date}</span>
        </div>
      </dl>

      <div className="event-card-progress">
        <div className="event-card-progress-head">
          <span>Registrations</span>
          <strong>
            {event.registrations} / {event.capacity}
          </strong>
        </div>
        <div className="progress">
          <i style={{ width: `${pctOf(event)}%` }} />
        </div>
      </div>

      <div className="event-card-footer">
        <button className="secondary btn-sm" onClick={() => onView(event)}>
          <Eye size={13} /> View Event
        </button>
        <ManageMenu
          onEdit={() => onEdit(event)}
          onAddAttendees={() => onAddAttendees(event)}
          onDelete={() => onDelete(event)}
        />
      </div>
    </article>
  );
}

/* ---------- Generic modal ---------- */
function Modal({ title, subtitle, onClose, footer, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="clear-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-actions">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Event form (used for both Add and Edit) ---------- */
function EventEditForm({ event, onSave }) {
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

/* ---------- Add attendees form ---------- */
function AddAttendeesForm({ event, onSave }) {
  const remaining = Math.max(0, event.capacity - event.registrations);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (remaining === 0) return setError("This event is full.");
    if (!Number.isInteger(count) || count < 1 || count > remaining)
      return setError(`Enter a number between 1 and ${remaining}.`);
    setError("");
    onSave(count);
  }

  return (
    <form id="attendees-form" className="form-stack" onSubmit={submit}>
      <p className="modal-message">
        <strong>{remaining}</strong> seats are still open for this event.
      </p>
      {error && <p className="form-error">{error}</p>}
      <label className="form-field">
        Number of attendees to add
        <input
          type="number"
          min="1"
          max={remaining}
          value={count}
          disabled={remaining === 0}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </label>
    </form>
  );
}

/* ---------- Main page ---------- */
export function Events({ events, setEvents, setNotice }) {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modal, setModal] = useState(null); // { mode: "create" | "edit" | "attendees" | "delete", id }

  const selectedEvent = events.find((e) => e.id === selectedId) || null;
  const modalEvent = modal && modal.id !== null ? events.find((e) => e.id === modal.id) : null;
  const closeModal = () => setModal(null);

  const typeOptions = useMemo(
    () => ["All", ...new Set(events.map((e) => e.type))],
    [events]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      const haystack = `${e.title} ${e.organization} ${e.venue || ""}`.toLowerCase();
      return (!q || haystack.includes(q)) && (typeFilter === "All" || e.type === typeFilter);
    });
  }, [events, search, typeFilter]);

  const totalRegistrations = events.reduce((sum, e) => sum + (e.registrations || 0), 0);
  const upcomingCount = events.filter((e) => e.status !== "Draft").length;

  const updateEvent = (id, patch) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  /* Actions */
  function handleToggleStatus(event) {
    const next = event.status === "Upcoming" ? "Registration open" : "Upcoming";
    updateEvent(event.id, { status: next });
    setNotice(`"${event.title}" is now ${next.toLowerCase()}.`);
  }

  function handleCreateEvent(data) {
    const nextId = Math.max(0, ...events.map((e) => e.id)) + 1;
    setEvents((prev) => [...prev, { ...data, id: nextId, registrations: 0 }]);
    closeModal();
    setNotice(`"${data.title}" was created.`);
  }

  function handleSaveEvent(updated) {
    updateEvent(updated.id, updated);
    closeModal();
    setNotice(`"${updated.title}" was updated.`);
  }

  function handleAddAttendees(count) {
    updateEvent(modalEvent.id, { registrations: modalEvent.registrations + count });
    closeModal();
    setNotice(`Added ${count} attendee${count > 1 ? "s" : ""} to "${modalEvent.title}".`);
  }

  function handleDelete(event) {
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
    if (selectedId === event.id) setSelectedId(null);
    closeModal();
    setNotice(`"${event.title}" was deleted.`);
  }

  function handleExportRoster(event) {
    const headers = ["Event Title", "Type", "Date", "Venue", "Registrations", "Capacity"];
    const row = [event.title, event.type, event.date, event.venue, event.registrations, event.capacity];
    const csv = [headers, row]
      .map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, "_")}_roster.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setNotice(`Attendee roster for "${event.title}" downloaded as CSV.`);
  }

  const openModal = (mode) => (event) => setModal({ mode, id: event.id });

  return (
    <>
      <div className="metrics-grid four">
        <Metric label="UPCOMING EVENTS" value={String(upcomingCount)} foot="Hackathons & workshops" icon={Calendar} />
        <Metric label="REGISTRATIONS" value={totalRegistrations.toLocaleString("en-IN")} foot="Student attendees" icon={Users} />
        <Metric label="DELIVERY MODES" value="Online & Onsite" foot="Hybrid infrastructure" icon={Activity} />
        <Metric label="CERTIFICATES" value="428" foot="Participation credentials" icon={CheckCircle2} />
      </div>

      {selectedEvent ? (
        <InlineDetailView
          title={selectedEvent.title}
          subtitle={`${selectedEvent.type} · Hosted by ${selectedEvent.organization}`}
          status={selectedEvent.status}
          id={selectedEvent.id}
          onBack={() => setSelectedId(null)}
          actions={
            <>
              <button className="secondary btn-sm" onClick={() => handleToggleStatus(selectedEvent)}>
                Toggle Status
              </button>
              <button className="secondary btn-sm" onClick={() => openModal("edit")(selectedEvent)}>
                <Pencil size={13} /> Edit
              </button>
              <button className="secondary btn-sm" onClick={() => openModal("attendees")(selectedEvent)}>
                <UserPlus size={13} /> Add Attendees
              </button>
              <button className="primary btn-sm" onClick={() => handleExportRoster(selectedEvent)}>
                <Download size={14} /> Download Attendee CSV
              </button>
              <button className="btn-danger btn-sm" onClick={() => openModal("delete")(selectedEvent)}>
                <Trash2 size={13} /> Delete
              </button>
            </>
          }
        >
          <div className="detail-grid">
            <div className="detail-col">
              <h3>Event Logistics & Venue</h3>
              <div className="detail-fields-list">
                <DetailField label="Event Title" value={selectedEvent.title} />
                <DetailField label="Classification" value={selectedEvent.type} />
                <DetailField label="Host Organization" value={selectedEvent.organization} />
                <DetailField label="Date & Schedule" value={selectedEvent.date} />
                <DetailField label="Delivery Mode" value={selectedEvent.mode} />
                <DetailField label="Venue / Stream Link" value={selectedEvent.venue} />
                <DetailField label="Ticket Price" value={selectedEvent.ticketPrice} />
              </div>
            </div>

            <div className="detail-col">
              <h3>Capacity & Guest Speakers</h3>
              <div className="detail-fields-list">
                <DetailField label="Keynote Speakers" value={selectedEvent.speakers} />
                <DetailField label="Prizes / Awards" value={selectedEvent.prizes} />
                <DetailField label="Registration Status">
                  <Badge tone={getStatusTone(selectedEvent.status)}>{selectedEvent.status}</Badge>
                </DetailField>
                <DetailField label="Capacity Utilization">
                  <div className="progress-inline">
                    <div className="progress">
                      <i style={{ width: `${pctOf(selectedEvent)}%` }} />
                    </div>
                    <span>
                      {selectedEvent.registrations} / {selectedEvent.capacity} ({pctOf(selectedEvent)}%)
                    </span>
                  </div>
                </DetailField>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Event Description & Agenda</h3>
            <p className="detail-prose">{selectedEvent.description}</p>
          </div>
        </InlineDetailView>
      ) : (
        <section className="card">
          <div className="table-heading">
            <div className="heading-left">
              <h2>All Events & Hackathons</h2>
              <Badge>{filtered.length} shown</Badge>
            </div>
            <button className="primary btn-sm" onClick={() => setModal({ mode: "create", id: null })}>
              <Plus size={14} /> Add event
            </button>
          </div>

          <div className="filter-toolbar">
            <div className="search-field">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search event title, host, venue..."
              />
              {search && (
                <button className="clear-btn" onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="filter-group">
              <label htmlFor="event-type-filter">Event Type:</label>
              <select
                id="event-type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t === "All" ? "All Types" : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="events-card-grid">
              {filtered.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onView={(e) => setSelectedId(e.id)}
                  onEdit={openModal("edit")}
                  onAddAttendees={openModal("attendees")}
                  onDelete={openModal("delete")}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <SearchX size={28} />
              <p>No events match the search filter.</p>
            </div>
          )}
        </section>
      )}

      {modal?.mode === "create" && (
        <Modal
          title="Add event"
          subtitle="Fill in the details for the new event"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="secondary btn-sm" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" form="event-edit-form" className="primary btn-sm">
                Create event
              </button>
            </>
          }
        >
          <EventEditForm event={BLANK_EVENT} onSave={handleCreateEvent} />
        </Modal>
      )}

      {modal && modalEvent && modal.mode === "edit" && (
        <Modal
          title="Edit event"
          subtitle={modalEvent.title}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="secondary btn-sm" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" form="event-edit-form" className="primary btn-sm">
                Save changes
              </button>
            </>
          }
        >
          <EventEditForm key={modalEvent.id} event={modalEvent} onSave={handleSaveEvent} />
        </Modal>
      )}

      {modal && modalEvent && modal.mode === "attendees" && (
        <Modal
          title="Add attendees"
          subtitle={modalEvent.title}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="secondary btn-sm" onClick={closeModal}>
                Cancel
              </button>
              <button
                type="submit"
                form="attendees-form"
                className="primary btn-sm"
                disabled={modalEvent.registrations >= modalEvent.capacity}
              >
                Add attendees
              </button>
            </>
          }
        >
          <AddAttendeesForm event={modalEvent} onSave={handleAddAttendees} />
        </Modal>
      )}

      {modal && modalEvent && modal.mode === "delete" && (
        <Modal
          title="Delete event"
          subtitle={modalEvent.title}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="secondary btn-sm" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btn-danger btn-sm" onClick={() => handleDelete(modalEvent)}>
                <Trash2 size={13} /> Delete event
              </button>
            </>
          }
        >
          <p className="modal-message">
            This removes <strong>{modalEvent.title}</strong> and its{" "}
            {modalEvent.registrations} registrations from the console. This can't be undone.
          </p>
        </Modal>
      )}
    </>
  );
}