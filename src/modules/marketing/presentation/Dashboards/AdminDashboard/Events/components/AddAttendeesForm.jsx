import React, { useState } from "react";

export function AddAttendeesForm({ event, onSave }) {
  const remaining = Math.max(0, event.capacity - event.registrations);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (remaining === 0) return setError("This event is full.");
    if (!Number.isInteger(count) || count < 1 || count > remaining)
      return setError(`Enter a number between 1 and ${remaining}.`);
    setError("");
    onSave(count);
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
    </form>
  );
}
