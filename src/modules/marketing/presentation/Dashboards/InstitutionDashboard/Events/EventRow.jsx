import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarCheck2,
  Clock3,
  MapPin,
  Pencil,
  Presentation
} from "lucide-react";
import "./Events.css";

const eventTypeIcons = {
  Assessment: CalendarCheck2,
  Placement: BriefcaseBusiness,
  "Guest module": Presentation,
  Compliance: CalendarCheck2,
  Workshop: Presentation
};

export default function EventRow({ event, onSelect, onEdit }) {
  const TypeIcon = eventTypeIcons[event.type] || CalendarCheck2;

  return (
    <article className="event-row">
      <button className="event-card-main" type="button" onClick={() => onSelect(event)}>
        <div className={`event-date${event.urgent ? " event-date-urgent" : ""}`} aria-label={`${event.month} ${event.day}`}>
          <span>{event.month}</span>
          <strong>{event.day}</strong>
        </div>
        <div className="event-copy">
          <div className="event-copy-heading">
            <div className="event-type">
              <TypeIcon size={13} />
              <span>{event.type}</span>
            </div>
            {event.urgent && <span className="event-priority">Action needed</span>}
          </div>
          <h3>{event.title}</h3>
          <p className="event-description">{event.detail}</p>
          <div className="event-meta">
            <span><Clock3 size={13} />{event.time}</span>
            <span><MapPin size={13} />{event.place}</span>
          </div>
        </div>
        <ArrowUpRight className="event-arrow" size={17} />
      </button>
      <div className="event-card-actions">
        <button
          className="event-edit-button"
          type="button"
          onClick={() => onEdit(event)}
          aria-label={`Edit ${event.title}`}
        >
          <Pencil size={13} />Edit event
        </button>
      </div>
    </article>
  );
}
