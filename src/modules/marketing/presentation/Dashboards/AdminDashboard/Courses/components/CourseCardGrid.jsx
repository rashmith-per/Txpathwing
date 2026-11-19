import React from "react";
import { ArrowRight, Clock, Pencil, Star, Trash2, Users } from "lucide-react";
import { CourseBanner } from "../CourseBanners";

export function CourseCardGrid({
  courses,
  onSelect,
  onEdit,
  onDelete
}) {
  return (
    <div className="adm-courses-grid">
      {courses.map((course) => {
        const statusKey = (course.status || "").toLowerCase().replace(/\s+/g, "-");
        return (
          <div
            key={course.id}
            className="adm-course-card"
            onClick={() => onSelect(course)}
          >
            {/* Banner Area (Height: 160px) */}
            <div className="adm-card-banner">
              <div className={`adm-card-badge status-${statusKey}`}>
                <span className="adm-badge-dot" />
                <span>{course.status}</span>
              </div>

              <CourseBanner
                type={course.imageType}
                title={course.title}
                category={course.category}
                imageUrl={course.imageUrl || course.image}
              />
            </div>

            {/* Card Body Area */}
            <div className="adm-card-body">
              <h3 className="adm-card-title" title={course.title}>
                {course.title}
              </h3>
              <p className="adm-card-subtitle">
                By {course.instructor} • {course.organization}
              </p>

              {/* Card Meta Items (Duration, Enrollments, Rating) */}
              <div className="adm-card-meta-row">
                <div className="adm-meta-item">
                  <Clock size={14} className="adm-meta-icon" />
                  <span>{course.duration}</span>
                </div>
                <div className="adm-meta-item">
                  <Users size={14} className="adm-meta-icon" />
                  <span>{course.enrollments ? course.enrollments.toLocaleString() : 0}</span>
                </div>
                <div className="adm-meta-item rating">
                  <Star size={14} className="adm-star-filled" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Card Footer: Action Buttons (Edit, Delete) & View Details */}
              <div className="adm-card-footer">
                <div className="adm-card-actions-left">
                  <button
                    type="button"
                    className="adm-card-action-btn edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(course);
                    }}
                    title="Edit course"
                    aria-label="Edit course"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="adm-card-action-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(course);
                    }}
                    title="Delete course"
                    aria-label="Delete course"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="adm-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(course);
                  }}
                >
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
