import React from "react";
import { CheckCircle2, Star, ArrowRight, Trash2 } from "lucide-react";
import { DetailField, InlineDetailView } from "../../common/DetailSection";

export function InstructorDetailView({
  instructor,
  onBack,
  onToggleStatus,
  onDelete,
  onNavigateCourses
}) {
  if (!instructor) return null;

  return (
    <InlineDetailView
      title={instructor.name}
      subtitle={`${instructor.role} · ${instructor.organization}`}
      status={instructor.status}
      id={instructor.id}
      onBack={onBack}
      actions={
        <>
          <button
            className="secondary btn-sm"
            onClick={() => onToggleStatus(instructor.id)}
          >
            {instructor.status === "Active" ? "Suspend Account" : "Activate Account"}
          </button>
          <button
            className="secondary btn-sm"
            style={{ color: "#dc2626", borderColor: "#fecaca" }}
            onClick={() => onDelete(instructor.id)}
          >
            <Trash2 size={14} /> Delete Instructor
          </button>
          <button
            className="primary btn-sm"
            onClick={onNavigateCourses}
          >
            View Assigned Courses <ArrowRight size={14} />
          </button>
        </>
      }
    >
      <div className="detail-grid">
        <div className="detail-col">
          <h3>Faculty Profile & Qualifications</h3>
          <div className="detail-fields-list">
            <DetailField label="Full Name" value={instructor.name} />
            <DetailField label="Academic / Industry Role" value={instructor.role} />
            <DetailField label="Affiliated Organization" value={instructor.organization} />
            <DetailField label="Subject Domain" value={instructor.domain} />
            <DetailField label="Specialization" value={instructor.specialization} />
            <DetailField label="Date Onboarded" value={instructor.joinedDate} />
          </div>
        </div>

        <div className="detail-col">
          <h3>Contact & Campus Location</h3>
          <div className="detail-fields-list">
            <DetailField label="Email Address" value={instructor.email} mono />
            <DetailField label="Phone Number" value={instructor.phone} />
            <DetailField label="Location" value={instructor.city} />
            <DetailField label="Active Courses" value={`${instructor.coursesCount || 0} Courses`} />
            <DetailField
              label="Total Students Mentored"
              value={`${(instructor.studentsCount || 0).toLocaleString("en-IN")} Learners`}
            />
            <DetailField label="Student Satisfaction Rating">
              <span className="rating-pill">
                <Star size={13} className="text-warning fill-warning" /> {instructor.rating || 4.8} / 5.0
              </span>
            </DetailField>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Professional Biography</h3>
        <p className="detail-prose">{instructor.bio}</p>
      </div>

      <div className="detail-section">
        <h3>Verified Academic Credentials & Certifications</h3>
        {instructor.qualifications && instructor.qualifications.length > 0 ? (
          <div className="doc-pills">
            {instructor.qualifications.map((q, idx) => (
              <span className="doc-pill" key={idx}>
                <CheckCircle2 size={13} className="text-success" /> {q}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted italic">No certificates attached.</p>
        )}
      </div>
    </InlineDetailView>
  );
}
