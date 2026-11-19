import React, { useState } from "react";

export function AddAttendeesForm({ event, onSave, onAdd, onCancel }) {
  const handleSave = onSave || onAdd;
  const remaining = Math.max(0, (event?.capacity || 0) - (event?.registrations || 0));
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (remaining === 0) return setError("This event is full.");
    if (!Number.isInteger(count) || count < 1 || count > remaining)
      return setError(`Enter a number between 1 and ${remaining}.`);
    setError("");
    if (handleSave) handleSave(count);
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
      <div className="modal-actions">
        <button type="button" className="secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary btn-sm" disabled={remaining === 0}>
          Add Attendees
        </button>
      </div>
    </form>
  );
}
