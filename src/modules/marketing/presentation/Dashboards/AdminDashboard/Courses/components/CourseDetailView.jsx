import React from "react";
import { CheckCircle2, Pencil, Star, Trash2 } from "lucide-react";
import { Badge } from "../../common/Badge";
import { DetailField, InlineDetailView } from "../../common/DetailSection";

export function CourseDetailView({
  course,
  onBack,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onOpenModeration,
  onAssignReviewer
}) {
  if (!course) return null;

  return (
    <InlineDetailView
      title={course.title}
      subtitle={`${course.category} · ${course.organization}`}
      status={course.status}
      id={course.id}
      onBack={onBack}
      actions={
        <>
          <button className="secondary btn-sm" onClick={() => onEdit(course)}>
            <Pencil size={14} /> Edit Course
          </button>
          <button
            className="secondary btn-sm"
            style={{ color: "#dc2626", borderColor: "#fecaca" }}
            onClick={() => onDelete(course)}
          >
            <Trash2 size={14} /> Delete Course
          </button>
          {course.status !== "Published" ? (
            <button className="primary btn-sm" onClick={() => onPublish(course.id)}>
              <CheckCircle2 size={14} /> Approve & Publish Course
            </button>
          ) : (
            <button className="secondary btn-sm" onClick={() => onUnpublish(course.id)}>
              Unpublish to Upcoming
            </button>
          )}
          {(course.status === "Overdue" || course.status === "Pending Review") && (
            <button className="secondary btn-sm" onClick={onOpenModeration}>
              Open in Moderation Queue
            </button>
          )}
        </>
      }
    >
      <div className="detail-grid">
        <div className="detail-col">
          <h3>Course Meta & Overview</h3>
          <div className="detail-fields-list">
            <DetailField label="Course Title" value={course.title} />
            <DetailField label="Lead Instructor" value={course.instructor} />
            <DetailField label="Host Organization" value={course.organization} />
            <DetailField label="Subject Domain" value={course.category} />
            <DetailField label="Complexity Level" value={course.level} />
            <DetailField label="Course Duration" value={course.duration} />
            <DetailField label="Retail Price" value={course.price} />
          </div>
        </div>

        <div className="detail-col">
          <h3>Enrollment & SLA Moderation</h3>
          <div className="detail-fields-list">
            <DetailField
              label="Total Enrollments"
              value={course.enrollments ? `${course.enrollments.toLocaleString()} Students` : "None"}
            />
            <DetailField label="Average Student Rating">
              <span className="rating-pill">
                <Star size={13} className="text-warning fill-warning" /> {course.rating || "Not rated"}
              </span>
            </DetailField>
            <DetailField label="Submission Date" value={course.submittedDate} />
            <DetailField label="SLA Window" value={course.slaWindow} />
            <DetailField label="SLA Health">
              <Badge
                tone={
                  course.status === "Overdue"
                    ? "danger"
                    : course.status === "Published"
                    ? "success"
                    : "warning"
                }
              >
                {course.slaStatus || course.status}
              </Badge>
            </DetailField>
            <DetailField label="Assigned Reviewer">
              <select
                className="select-inline"
                value={course.assignedReviewer || "Unassigned"}
                onChange={(e) => onAssignReviewer(course.id, e.target.value)}
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Sunil Nambiar">Sunil Nambiar (Platform Admin)</option>
                <option value="Vikram Patel">Vikram Patel (Senior Faculty)</option>
                <option value="Platform Review Team">Platform Review Team</option>
              </select>
            </DetailField>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Course Description & Learning Outcomes</h3>
        <p className="detail-prose">{course.description}</p>
        <DetailField label="Prerequisites" value={course.prerequisites} />
      </div>

      {course.syllabus && course.syllabus.length > 0 && (
        <div className="detail-section">
          <h3>Curriculum Modules & Syllabus</h3>
          <div className="syllabus-list">
            {course.syllabus.map((item, index) => (
              <div className="syllabus-item" key={index}>
                <span className="syllabus-idx">{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </InlineDetailView>
  );
}
