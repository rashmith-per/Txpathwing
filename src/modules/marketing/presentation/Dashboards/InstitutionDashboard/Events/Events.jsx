import { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, Plus } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import EventRow from "./EventRow.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { initialEvents } from "./eventsData.js";
import { matchesSearch } from "../utils.js";
import AddEventModal from "./AddEventModal.jsx";
import "./Events.css";

function EventDetail({ event, onBack, onMarkReviewed, showMessage }) {
  const [isReviewed, setIsReviewed] = useState(event.reviewed || false);

  const handleReview = () => {
    setIsReviewed(true);
    if (onMarkReviewed) onMarkReviewed(event.id);
    showMessage(`Event "${event.title}" marked as reviewed.`);
  };

  return (
    <>
      <button className="back-link" type="button" onClick={onBack}>
        <ArrowLeft size={15} />All events
      </button>
      <PageHeading eyebrow={`${event.type.toUpperCase()} · EVENT DETAILS`} title={event.title} description={event.detail}>
        <StatusTag>{isReviewed ? "Reviewed" : event.urgent ? "Action needed" : "Scheduled"}</StatusTag>
      </PageHeading>
      <div className="event-detail-grid">
        <section className="panel detail-panel">
          <h2>Event information</h2>
          <dl className="detail-list">
            <div><dt>Date</dt><dd>{event.day} {event.month} 2026</dd></div>
            <div><dt>Time</dt><dd>{event.time}</dd></div>
            <div><dt>Location</dt><dd>{event.place}</dd></div>
            <div><dt>Responsible team</dt><dd>{event.owner}</dd></div>
            <div><dt>Audience</dt><dd>{event.detail}</dd></div>
          </dl>
        </section>
        <aside className="panel detail-aside">
          <CalendarDays size={20} />
          <h2>On the programme calendar</h2>
          <p>This event is included in the institution schedule for the 2026–27 term.</p>
          <button
            className="secondary-action"
            type="button"
            onClick={handleReview}
            disabled={isReviewed}
          >
            <CheckCircle2 size={15} /> {isReviewed ? "Reviewed" : "Mark reviewed"}
          </button>
        </aside>
      </div>
    </>
  );
}

export default function Events({ search, selectedEvent, onSelectEvent, onBack, showMessage }) {
  const [eventsList, setEventsList] = useState(() =>
    initialEvents.map((event, index) => ({ ...event, id: `event-${index}` }))
  );
  const [nextEventId, setNextEventId] = useState(initialEvents.length);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleAddEvent = (newEvent) => {
    setEventsList((prev) => [{ ...newEvent, id: `event-${nextEventId}` }, ...prev]);
    setNextEventId((id) => id + 1);
  };

  const handleUpdateEvent = (eventId, updatedEvent) => {
    setEventsList((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, ...updatedEvent } : event))
    );
    setEventToEdit(null);
  };

  const handleMarkReviewed = (eventId) => {
    setEventsList((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, reviewed: true, urgent: false } : e))
    );
  };

  if (selectedEvent) {
    // Find the latest state of selected event
    const current = eventsList.find((e) => e.title === selectedEvent.title) || selectedEvent;
    return (
      <EventDetail
        event={current}
        onBack={onBack}
        onMarkReviewed={handleMarkReviewed}
        showMessage={showMessage}
      />
    );
  }

  const visibleEvents = eventsList.filter((event) => matchesSearch(event, search));

  const urgentCount = eventsList.filter((e) => e.urgent && !e.reviewed).length;
  const placementCount = eventsList.filter((e) => e.type === "Placement").length;

  const summary = [
    { value: eventsList.length.toString(), label: "Upcoming events" },
    { value: "640", label: "Learners in assessments" },
    { value: placementCount.toString(), label: "Placement drives" },
    { value: urgentCount.toString(), label: "Needs attention" }
  ];

  return (
    <>
      <PageHeading
        eyebrow="SCHEDULE · EVENTS"
        title="Events"
        description="Browse upcoming academic, placement, and industry events for your institution."
      >
        <button className="primary-action" type="button" onClick={() => setIsAddOpen(true)}>
          <Plus size={16} />Add event
        </button>
      </PageHeading>

      <SummaryStrip items={summary} />

      <section className="panel events-panel">
        <div className="events-panel-heading">
          <div className="events-month-icon"><CalendarDays size={19} /></div>
          <div>
            <span className="events-kicker">EVENT CALENDAR</span>
            <h2>September 2026</h2>
            <p>Select an event to view its schedule and details.</p>
          </div>
          <span className="events-total">{visibleEvents.length} {visibleEvents.length === 1 ? "event" : "events"}</span>
        </div>
        <div className="event-list event-list-full" aria-label="Upcoming events">
          {visibleEvents.length
            ? visibleEvents.map((event) => (
                <EventRow
                  key={event.id || event.title}
                  event={event}
                  onSelect={onSelectEvent}
                  onEdit={setEventToEdit}
                />
              ))
            : <div className="events-empty-state">
                <CalendarDays size={24} />
                <strong>No events found</strong>
                <p>Try adjusting your search or add a new event to the calendar.</p>
              </div>}
        </div>
      </section>

      {(isAddOpen || eventToEdit) && (
        <AddEventModal
          key={eventToEdit?.id || "new-event"}
          isOpen
          eventToEdit={eventToEdit}
          onClose={() => {
            setIsAddOpen(false);
            setEventToEdit(null);
          }}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          showMessage={showMessage}
        />
      )}
    </>
  );
}
