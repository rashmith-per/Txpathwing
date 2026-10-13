import React from "react";
import { Calendar } from "lucide-react";

export default function ComingUpSection() {
  const events = [
    {
      title: "Live Workshop: Agentic AI",
      date: "Saturday, 4:00 PM",
      type: "Workshop",
      color: "#f5f3ff",
      iconColor: "#7c3aed",
    },
    {
      title: "Microservices Capstone Due",
      date: "In 5 days",
      type: "Assignment",
      color: "#ecfdf5",
      iconColor: "#059669",
    },
  ];

  return (
    <section className="dash-card-section">
      <div className="section-head-row">
        <div className="section-title-wrap">
          <h3>Coming Up</h3>
          <p>Workshops & deadlines</p>
        </div>
      </div>

      <div className="events-timeline-list">
        {events.map((item, idx) => (
          <div key={idx} className="event-timeline-item">
            <div
              className="event-icon-badge"
              style={{ background: item.color, color: item.iconColor }}
            >
              <Calendar size={16} />
            </div>
            <div className="event-details">
              <h5 className="event-title">{item.title}</h5>
              <div className="event-date-row">
                <span>⏱ {item.date}</span>
                <span>•</span>
                <span>{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
