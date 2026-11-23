import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";
import StaffStatusBadge from "./StaffStatusBadge.jsx";
import { STAFF_PERMISSIONS, StaffRoleModel } from "../backend/models/StaffRoleModel.js";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function StaffTable({
  staffList,
  sortField,
  sortDirection,
  onSort,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
  currentUserRole,
}) {
  const canEdit = () =>
    StaffRoleModel.hasPermission(currentUserRole, STAFF_PERMISSIONS.STAFF_EDIT);
  const canDelete = () =>
    StaffRoleModel.hasPermission(currentUserRole, STAFF_PERMISSIONS.STAFF_DELETE);
  const canChangeStatus = () =>
    StaffRoleModel.hasPermission(currentUserRole, STAFF_PERMISSIONS.STAFF_CHANGE_STATUS);

  const columns = [
    { key: "staffId", label: "STAFF ID", sortable: true },
    { key: "name", label: "STAFF NAME", sortable: true },
    { key: "email", label: "EMAIL", sortable: true },
    { key: "phone", label: "PHONE", sortable: false },
    { key: "department", label: "DEPARTMENT", sortable: true },
    { key: "designation", label: "DESIGNATION", sortable: true },
    { key: "employmentType", label: "EMPLOYMENT", sortable: true },
    { key: "joiningDate", label: "JOINING DATE", sortable: true },
    { key: "status", label: "STATUS", sortable: true },
    { key: "actions", label: "ACTIONS", sortable: false, align: "right" },
  ];

  return (
    <div className="staff-table-container">
      <table className="staff-data-table" role="table">
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortField === col.key;
              return (
                <th
                  key={col.key}
                  className={`${col.align === "right" ? "text-right" : ""} ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => col.sortable && onSort(col.key)}
                  aria-sort={
                    isSorted
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <div
                    className={`th-content ${
                      col.align === "right" ? "justify-end" : ""
                    }`}
                  >
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span className="sort-icon-box">
                        {isSorted ? (
                          sortDirection === "asc" ? (
                            <ArrowUp size={13} className="sort-active" />
                          ) : (
                            <ArrowDown size={13} className="sort-active" />
                          )
                        ) : (
                          <ArrowUpDown size={12} className="sort-idle" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className="staff-table-row">
              {/* Staff ID */}
              <td className="staff-id-cell">
                <span className="staff-id-tag">{staff.staffId}</span>
              </td>

              {/* Staff Name & Category */}
              <td className="profile-cell">
                <div className="profile-text-identity">
                  <span className="profile-name" title={staff.name}>
                    {staff.name}
                  </span>
                  <span className="profile-category-tag">
                    {staff.category || "Teaching"}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="email-cell">
                <a
                  href={`mailto:${staff.email}`}
                  className="staff-email-link"
                  title={staff.email}
                >
                  {staff.email}
                </a>
              </td>

              {/* Phone */}
              <td className="phone-cell">
                <span className="staff-phone">{staff.phone || "—"}</span>
              </td>

              {/* Department */}
              <td className="department-cell">
                <span className={`dept-badge dept-${(staff.department || "").toLowerCase()}`}>
                  {staff.department}
                </span>
              </td>

              {/* Designation */}
              <td className="designation-cell">
                <span className="staff-designation" title={staff.designation}>
                  {staff.designation}
                </span>
              </td>

              {/* Employment Type */}
              <td className="employment-cell">
                <span className={`emp-pill emp-${(staff.employmentType || "").toLowerCase().replace(/[\s-]/g, "")}`}>
                  {staff.employmentType}
                </span>
              </td>

              {/* Joining Date */}
              <td className="date-cell">
                <span className="staff-date">{formatDate(staff.joiningDate)}</span>
              </td>

              {/* Status */}
              <td className="status-cell">
                <StaffStatusBadge status={staff.status} />
              </td>

              {/* Actions */}
              <td className="actions-cell text-right">
                <div className="action-buttons-group">
                  <button
                    type="button"
                    className="btn-action btn-view"
                    onClick={() => onView(staff)}
                    title="View Detailed Profile"
                    aria-label={`View ${staff.name}`}
                  >
                    <Eye size={15} />
                  </button>

                  {canEdit(staff) && (
                    <button
                      type="button"
                      className="btn-action btn-edit"
                      onClick={() => onEdit(staff)}
                      title="Edit Staff Information"
                      aria-label={`Edit ${staff.name}`}
                    >
                      <Pencil size={15} />
                    </button>
                  )}

                  {canChangeStatus() && (
                    <button
                      type="button"
                      className="btn-action btn-status"
                      onClick={() => onStatusChange(staff)}
                      title="Update Employment Status"
                      aria-label={`Change Status for ${staff.name}`}
                    >
                      <RefreshCw size={14} />
                    </button>
                  )}

                  {canDelete() && (
                    <button
                      type="button"
                      className="btn-action btn-delete"
                      onClick={() => onDelete(staff)}
                      title="Delete Staff Record"
                      aria-label={`Delete ${staff.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
