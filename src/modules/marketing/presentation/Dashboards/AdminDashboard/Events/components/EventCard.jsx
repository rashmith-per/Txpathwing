import React from "react";
import { Calendar, Eye, MapPin, Users } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";
import { ManageMenu } from "./ManageMenu";

const pctOf = (e) =>
  e.capacity ? Math.min(100, Math.round((e.registrations / e.capacity) * 100)) : 0;

export function EventCard({ event, onView, onEdit, onAddAttendees, onDelete }) {
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
