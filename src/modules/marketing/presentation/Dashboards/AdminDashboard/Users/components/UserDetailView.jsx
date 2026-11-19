import React from "react";
import { Mail } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";
import { DetailField, InlineDetailView } from "../../common/DetailSection";

export function UserDetailView({
  user,
  onBack,
  onToggleStatus,
  onResetPassword,
  onRoleChange
}) {
  if (!user) return null;

  return (
    <InlineDetailView
      title={user.name}
      subtitle={`${user.role} · ${user.tenant}`}
      status={user.status}
      id={user.id}
      onBack={onBack}
      actions={
        <>
          <button
            className={`secondary btn-sm ${user.status === "Active" ? "btn-danger" : "btn-success"}`}
            onClick={() => onToggleStatus(user.id)}
          >
            {user.status === "Active" ? "Deactivate Account" : "Activate Account"}
          </button>
          <button
            className="secondary btn-sm"
            onClick={() => onResetPassword(user.email)}
          >
            <Mail size={14} /> Send Password Reset
          </button>
        </>
      }
    >
      <div className="detail-grid">
        <div className="detail-col">
          <h3>Account Profile</h3>
          <div className="detail-fields-list">
            <DetailField label="Full Name" value={user.name} />
            <DetailField label="Email Address" value={user.email} mono />
            <DetailField label="Role" value={user.role} />
            <DetailField label="Assigned Tenant" value={user.tenant} />
            <DetailField label="Account Status">
              <Badge tone={getStatusTone(user.status)}>{user.status}</Badge>
            </DetailField>
            <DetailField label="Registered On" value={user.joinedDate} />
          </div>
        </div>

        <div className="detail-col">
          <h3>Contact & Activity Details</h3>
          <div className="detail-fields-list">
            <DetailField label="Phone" value={user.phone} />
            <DetailField label="Location" value={user.city} />
            <DetailField label="Last Active" value={user.lastActive} />
            {user.role === "Student" && (
              <>
                <DetailField label="Courses Enrolled" value={`${user.coursesEnrolled || 0} Courses`} />
                <DetailField label="Certificates Earned" value={`${user.coursesCompleted || 0} Certificates`} />
              </>
            )}
            {user.role === "Mentor" && (
              <DetailField label="Courses Mentored" value={`${user.coursesMentored || 0} Active Tracks`} />
            )}
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Role Management & Access Scope</h3>
        <div className="role-switch-row">
          <span className="text-muted">Change Role:</span>
          {["Student", "Mentor", "Org Admin", "Super Admin"].map(role => (
            <button
              key={role}
              className={`btn-sm ${user.role === role ? "primary" : "secondary"}`}
              onClick={() => onRoleChange(user.id, role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </InlineDetailView>
  );
}
