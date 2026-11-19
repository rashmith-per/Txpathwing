import React from "react";
import { Eye, Search, SearchX, UserPlus, X } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";

export function UserTableView({
  filtered,
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onOpenAddUser,
  onSelectUser
}) {
  return (
    <section className="card">
      <div className="table-heading">
        <div className="heading-left">
          <h2>All User Accounts</h2>
          <Badge>{filtered.length} shown</Badge>
        </div>
        <button className="primary btn-sm" onClick={onOpenAddUser}>
          <UserPlus size={15} /> Add User
        </button>
      </div>

      <div className="filter-toolbar">
        <div className="search-field">
          <Search size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search user by name, email, tenant, role..."
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch("")}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <label>Role:</label>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
            <option value="Org Admin">Org Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Tenant / Organization</th>
              <th>Last Active</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr
                key={u.id}
                className="hoverable-row"
                onClick={() => onSelectUser(u)}
              >
                <td>
                  <strong>{u.name}</strong>
                  <small className="row-sub font-mono">{u.email}</small>
                </td>
                <td>
                  <Badge
                    tone={
                      u.role === "Super Admin"
                        ? "purple"
                        : u.role === "Org Admin"
                        ? "blue"
                        : u.role === "Mentor"
                        ? "warning"
                        : "neutral"
                    }
                  >
                    {u.role}
                  </Badge>
                </td>
                <td>{u.tenant}</td>
                <td><small>{u.lastActive}</small></td>
                <td><Badge tone={getStatusTone(u.status)}>{u.status}</Badge></td>
                <td>
                  <button
                    className="secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      onSelectUser(u);
                    }}
                  >
                    <Eye size={13} /> View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="empty">
          <SearchX size={28} />
          <p>No user accounts found matching your filters.</p>
        </div>
      )}
    </section>
  );
}
