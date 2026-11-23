import { useState } from "react";
import { X, CalendarPlus, CheckCircle2 } from "lucide-react";

export default function AddEventModal({ isOpen, onClose, onAddEvent, showMessage }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "Assessment",
    day: "15",
    month: "Sep",
    time: "10:00 – 13:00",
    place: "Campus Auditorium",
    owner: "Academic Office",
    detail: "All departments · registered learners",
    urgent: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddEvent(formData);
    showMessage(`Event "${formData.title}" scheduled successfully.`);
    onClose();
  };

  return (
    <div className="staff-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="staff-modal-card" style={{ maxWidth: "540px" }} onClick={(e) => e.stopPropagation()}>
        <div className="staff-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-header-icon"><CalendarPlus size={18} /></span>
            <div>
              <h2>Schedule New Event</h2>
              <p>Add an academic, placement, or guest module event to the calendar.</p>
            </div>
          </div>
          <button className="icon-button modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="staff-modal-body">
            <div className="form-field">
              <label>Event Title <span className="req-star">*</span></label>
              <input
                type="text"
                placeholder="e.g. Mid-term Assessment Window"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Event Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Assessment">Assessment</option>
                  <option value="Placement">Placement</option>
                  <option value="Guest module">Guest module</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <div className="form-field">
                <label>Date (Day & Month)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    style={{ width: "70px" }}
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  />
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  >
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Time Window</label>
                <input
                  type="text"
                  placeholder="e.g. 09:00 – 17:00"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Location / Venue</label>
                <input
                  type="text"
                  placeholder="e.g. Main Auditorium"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Responsible Team / Owner</label>
                <input
                  type="text"
                  placeholder="e.g. Career services"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Priority</label>
                <select
                  value={formData.urgent ? "urgent" : "normal"}
                  onChange={(e) => setFormData({ ...formData, urgent: e.target.value === "urgent" })}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Action needed (Urgent)</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Audience / Description</label>
              <input
                type="text"
                placeholder="e.g. CSE & IT · 640 learners"
                value={formData.detail}
                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
              />
            </div>
          </div>

          <div className="staff-modal-footer">
            <button type="button" className="secondary-action" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-action btn-submit">
              <CheckCircle2 size={16} /> Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
