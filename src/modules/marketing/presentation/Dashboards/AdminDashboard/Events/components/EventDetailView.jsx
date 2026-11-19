import React from "react";
import { Download, Pencil, Trash2, UserPlus } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";
import { DetailField, InlineDetailView } from "../../common/DetailSection";

export function EventDetailView({
  event,
  onBack,
  onToggleStatus,
  onEdit,
  onAddAttendees,
  onExportRoster,
  onDelete,
  pctOf
}) {
  return (
    <InlineDetailView
      title={event.title}
      subtitle={`${event.type} · Hosted by ${event.organization}`}
      status={event.status}
      id={event.id}
      onBack={onBack}
      actions={
        <>
          <button className="secondary btn-sm" onClick={() => onToggleStatus(event)}>
            Toggle Status
          </button>
          <button className="secondary btn-sm" onClick={() => onEdit(event)}>
            <Pencil size={13} /> Edit
          </button>
          <button className="secondary btn-sm" onClick={() => onAddAttendees(event)}>
            <UserPlus size={13} /> Add Attendees
          </button>
          <button className="primary btn-sm" onClick={() => onExportRoster(event)}>
            <Download size={14} /> Download Attendee CSV
          </button>
          <button className="btn-danger btn-sm" onClick={() => onDelete(event)}>
            <Trash2 size={13} /> Delete
          </button>
        </>
      }
    >
      <div className="detail-grid">
        <div className="detail-col">
          <h3>Event Logistics & Venue</h3>
          <div className="detail-fields-list">
            <DetailField label="Event Title" value={event.title} />
            <DetailField label="Classification" value={event.type} />
            <DetailField label="Host Organization" value={event.organization} />
            <DetailField label="Date & Schedule" value={event.date} />
            <DetailField label="Delivery Mode" value={event.mode} />
            <DetailField label="Venue / Stream Link" value={event.venue} />
            <DetailField label="Ticket Price" value={event.ticketPrice} />
          </div>
        </div>

        <div className="detail-col">
          <h3>Capacity & Guest Speakers</h3>
          <div className="detail-fields-list">
            <DetailField label="Keynote Speakers" value={event.speakers} />
            <DetailField label="Prizes / Awards" value={event.prizes} />
            <DetailField label="Registration Status">
              <Badge tone={getStatusTone(event.status)}>{event.status}</Badge>
            </DetailField>
            <DetailField label="Capacity Utilization">
              <div className="progress-inline">
                <div className="progress">
                  <i style={{ width: `${pctOf(event)}%` }} />
                </div>
                <span>
                  {event.registrations} / {event.capacity} ({pctOf(event)}%)
                </span>
              </div>
            </DetailField>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Event Description & Agenda</h3>
        <p className="detail-prose">{event.description}</p>
      </div>
    </InlineDetailView>
  );
}
