import React from "react";
import { BookOpen, Calendar, ChevronRight, Clock, Trash2, Users, Briefcase } from "lucide-react";
import { parseSchedule } from "../batchUtils.js";

export function BatchCard({ batch, onSelect, onDelete }) {
  const capacityNum = Number(batch.capacity) || 120;
  const enrolledNum = Number(batch.enrolled) || 0;

  const { days, time } = parseSchedule(batch.schedule);

  const startText = batch.startDate
    ? batch.startDate.toLowerCase().startsWith("starts")
      ? `${batch.startDate} –`
      : `Starts ${batch.startDate} –`
    : "Starts Nov 2026 –";
  const endText = batch.endDate
    ? batch.endDate.toLowerCase().startsWith("ends")
      ? batch.endDate
      : `Ends ${batch.endDate}`
    : "Ends Feb 2027";

  return (
    <div key={batch.id} className="batch-modern-card">
      {/* Top Header Row */}
      <div className="batch-card-top">
        <div className="batch-card-left-header">
          <div className="batch-card-title-col">
            <div className="batch-card-badges">
              <span className="batch-badge-category">
                <Briefcase size={14} />
                <span>{batch.category || "Software Development"}</span>
              </span>
              <span className="batch-badge-code">
                {batch.code || "JFS-27A"}
              </span>
              <span className="batch-badge-status">
                <span className="batch-status-dot green"></span>
                <span>{(batch.status || "ACTIVE").toUpperCase()}</span>
              </span>
            </div>

            <h3 className="batch-card-name">{batch.name}</h3>

            <div className="batch-card-course">
              <BookOpen size={16} />
              <span>{batch.courseName}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-batch-delete"
          title="Delete this batch"
          aria-label="Delete this batch"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(batch.id, batch.name);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="batch-card-divider" />

      {/* 3-Column Info Row */}
      <div className="batch-card-info-grid">
        <div className="batch-info-col batch-info-col-schedule">
          <div className="batch-info-circle-icon blue">
            <Clock size={20} />
          </div>
          <div className="batch-info-text">
            <span className="batch-info-primary">{days}</span>
            <span className="batch-info-secondary">{time}</span>
          </div>
        </div>

        <div className="batch-info-col">
          <div className="batch-info-circle-icon purple">
            <Calendar size={20} />
          </div>
          <div className="batch-info-text">
            <span className="batch-info-primary">{startText}</span>
            <span className="batch-info-secondary">{endText}</span>
          </div>
        </div>

        <div className="batch-info-pill-box">
          <Users size={22} className="batch-pill-icon" />
          <div className="batch-pill-text">
            <strong className="batch-pill-primary">
              {enrolledNum} / {capacityNum} seats
            </strong>
            <span className="batch-pill-secondary">
              {batch.completion || 0}% syllabus covered
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="batch-card-manage-btn"
        onClick={() => onSelect(batch)}
      >
        <span>Manage Batch</span>
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
