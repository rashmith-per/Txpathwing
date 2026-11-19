import { ArrowLeft, CalendarDays, CheckCircle2, Plus } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StatusTag from "../Layout/StatusTag.jsx";
import EventRow from "./EventRow.jsx";
import SummaryStrip from "../Layout/SummaryStrip.jsx";
import { initialEvents } from "./eventsData.js";
import { matchesSearch } from "../utils.js";
import "./Events.css";

const SUMMARY = [
  { value: "4", label: "Upcoming events" },
  { value: "640", label: "Learners in assessments" },
  { value: "1", label: "Placement drives" },
  { value: "1", label: "Needs attention" }
];

function EventDetail({ event, onBack, showMessage }) {
  return (
    <>
      <button className="back-link" type="button" onClick={onBack}>
        <ArrowLeft size={15} />All events
      </button>
      <PageHeading eyebrow={`${event.type.toUpperCase()} · EVENT DETAILS`} title={event.title} description={event.detail}>
        <StatusTag>{event.urgent ? "Action needed" : "Scheduled"}</StatusTag>
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
          <button className="secondary-action" type="button" onClick={() => showMessage("Event details are up to date.")}>
            <CheckCircle2 size={15} />Mark reviewed
          </button>
        </aside>
      </div>
    </>
  );
}

export default function Events({ search, selectedEvent, onSelectEvent, onBack, showMessage }) {
  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={onBack} showMessage={showMessage} />;
  }

  const visibleEvents = initialEvents.filter((event) => matchesSearch(event, search));

  return (
    <>
      <PageHeading
        eyebrow="SCHEDULE · EVENTS"
        title="Events"
        description="Browse upcoming academic, placement, and industry events for your institution."
      >
        <button className="primary-action" type="button" onClick={() => showMessage("New event draft created.")}>
          <Plus size={16} />Add event
        </button>
      </PageHeading>

      <SummaryStrip items={SUMMARY} />

      <section className="panel page-panel">
        <div className="table-toolbar">
          <div>
            <h2>September 2026</h2>
            <p>Select an event to view its schedule and details.</p>
          </div>
          <CalendarDays size={18} />
        </div>
        <div className="event-list event-list-full">
          {visibleEvents.length
            ? visibleEvents.map((event) => <EventRow key={event.title} event={event} onSelect={onSelectEvent} />)
            : <p className="empty-events">No matching events.</p>}
        </div>
      </section>
    </>
  );
}
