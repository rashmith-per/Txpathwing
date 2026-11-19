import React from "react";
import { Eye, Pencil, Star, Trash2 } from "lucide-react";
import { CourseBanner } from "../CourseBanners";

export function CourseTableView({
  courses,
  onSelect,
  onEdit,
  onDelete
}) {
  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Category</th>
            <th>Instructor & Organization</th>
            <th>Duration</th>
            <th>Enrollments</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              className="adm-table-row"
              onClick={() => onSelect(course)}
            >
              <td>
                <div className="adm-table-cell-course">
                  <div className="adm-table-thumb">
                    <CourseBanner
                      type={course.imageType}
                      title={course.title}
                      category={course.category}
                      imageUrl={course.imageUrl || course.image}
                    />
                  </div>
                  <div>
                    <strong>{course.title}</strong>
                    <div className="adm-table-sub">{course.level || "Certificate Track"}</div>
                  </div>
                </div>
              </td>
              <td>{course.category}</td>
              <td>
                <strong>{course.instructor}</strong>
                <div className="adm-table-sub">{course.organization}</div>
              </td>
              <td>{course.duration}</td>
              <td>{course.enrollments?.toLocaleString() || 0}</td>
              <td>
                <span className="rating-pill">
                  <Star size={12} className="adm-star-filled" /> {course.rating}
                </span>
              </td>
              <td>
                <div className={`adm-card-badge status-${(course.status || "").toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="adm-badge-dot" />
                  <span>{course.status}</span>
                </div>
              </td>
              <td>
                <div className="adm-table-actions">
                  <button
                    className="adm-view-btn adm-view-btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(course);
                    }}
                    title="View details"
                  >
                    <Eye size={13} />
                    <span>View</span>
                  </button>
                  <button
                    className="adm-table-action-icon edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(course);
                    }}
                    title="Edit course"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="adm-table-action-icon delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(course);
                    }}
                    title="Delete course"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
