import { ArrowRight } from "lucide-react";

export default function EventRow({ event, onSelect }) {
  return (
    <button className="event-row event-row-button" type="button" onClick={() => onSelect(event)}>
      <div className={`event-date${event.urgent ? " event-date-urgent" : ""}`}>
        <strong>{event.day}</strong>
        <span>{event.month}</span>
      </div>
      <div className="event-copy">
        <h3>{event.title}</h3>
        <p>{event.detail}</p>
      </div>
      <ArrowRight className="event-arrow" size={15} />
    </button>
  );
}
