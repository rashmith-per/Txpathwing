import React, { useMemo, useState } from "react";
import "./Events.css";
import "./EventModals.css";
import {
  Activity, Calendar, CheckCircle2, Plus,
  Search, SearchX, X, Users
} from "lucide-react";
import { Badge } from "../common/Badge";
import { Metric } from "../common/Metric";
import { EventCard } from "./components/EventCard";
import { EventModal } from "./components/EventModal";
import { EventEditForm } from "./components/EventEditForm";
import { AddAttendeesForm } from "./components/AddAttendeesForm";
import { EventDetailView } from "./components/EventDetailView";

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

export function Events({ events, setEvents, setNotice }) {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modal, setModal] = useState(null);

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
        <EventDetailView
          event={selectedEvent}
          onBack={() => setSelectedId(null)}
          onToggleStatus={handleToggleStatus}
          onEdit={openModal("edit")}
          onAddAttendees={openModal("attendees")}
          onExportRoster={handleExportRoster}
          onDelete={openModal("delete")}
          pctOf={pctOf}
        />
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
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="events-grid">
            {filtered.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                pctOf={pctOf}
                onView={() => setSelectedId(e.id)}
                onSelect={() => setSelectedId(e.id)}
                onEdit={openModal("edit")}
                onAddAttendees={openModal("attendees")}
                onExportRoster={handleExportRoster}
                onToggleStatus={handleToggleStatus}
                onDelete={openModal("delete")}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty">
              <SearchX size={28} />
              <p>No events found matching your filter criteria.</p>
              <button
                className="secondary btn-sm"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      )}

      {modal && modal.mode === "create" && (
        <EventModal title="Add New Event" onClose={closeModal}>
          <EventEditForm initial={BLANK_EVENT} onSave={handleCreateEvent} onCancel={closeModal} />
        </EventModal>
      )}

      {modal && modal.mode === "edit" && modalEvent && (
        <EventModal title={`Edit — ${modalEvent.title}`} onClose={closeModal}>
          <EventEditForm initial={modalEvent} onSave={handleSaveEvent} onCancel={closeModal} />
        </EventModal>
      )}

      {modal && modal.mode === "attendees" && modalEvent && (
        <EventModal title={`Add Attendees — ${modalEvent.title}`} onClose={closeModal}>
          <AddAttendeesForm event={modalEvent} onAdd={handleAddAttendees} onCancel={closeModal} />
        </EventModal>
      )}

      {modal && modal.mode === "delete" && modalEvent && (
        <EventModal title="Delete Event" onClose={closeModal}>
          <p>
            Are you sure you want to delete <strong>"{modalEvent.title}"</strong>? This will permanently remove all registration and roster records.
          </p>
          <div className="modal-actions">
            <button className="secondary" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-danger" onClick={() => handleDelete(modalEvent)}>
              Delete Event
            </button>
          </div>
        </EventModal>
      )}
    </>
  );
}
