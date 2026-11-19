import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Pencil, Settings2, Trash2, UserPlus } from "lucide-react";

export function ManageMenu({ onEdit, onAddAttendees, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (fn) => () => {
    setOpen(false);
    fn();
  };

  return (
    <div className="manage-wrap" ref={ref}>
      <button
        className="primary btn-sm manage-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <Settings2 size={14} /> Manage
        <ChevronDown size={14} className={`chev ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="manage-menu" role="menu">
          <button role="menuitem" className="manage-item" onClick={pick(onEdit)}>
            <Pencil size={14} /> Edit event
          </button>
          <button role="menuitem" className="manage-item" onClick={pick(onAddAttendees)}>
            <UserPlus size={14} /> Add attendees
          </button>
          <div className="manage-divider" />
          <button role="menuitem" className="manage-item danger" onClick={pick(onDelete)}>
            <Trash2 size={14} /> Delete event
          </button>
        </div>
      )}
    </div>
  );
}
