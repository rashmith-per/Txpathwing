import React from "react";
import { Eye, Plus, Search, SearchX, X } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";

export function TenantTableView({
  filtered,
  tenants,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  onOpenOnboard,
  onSelectTenant
}) {
  return (
    <section className="card tenant-card">
      <div className="table-heading">
        <div className="heading-left">
          <h2>All Organizations</h2>
          <Badge>{filtered.length} of {tenants.length} shown</Badge>
        </div>
        <button className="primary btn-sm" onClick={onOpenOnboard}>
          <Plus size={15} /> Add Organization
        </button>
      </div>

      <div className="filter-toolbar">
        <div className="search-field">
          <Search size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search organization name, type, domain, contact..."
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Institution">Institution</option>
            <option value="Corporate">Corporate</option>
            <option value="Training provider">Training provider</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Seats near cap">Seats near cap</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Type</th>
              <th>Domain</th>
              <th>Seats</th>
              <th>Used</th>
              <th>Contract</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const usagePct = Math.min(100, Math.round((t.used / t.seats) * 100));
              return (
                <tr
                  key={t.id || t.name}
                  className="hoverable-row"
                  onClick={() => onSelectTenant(t)}
                >
                  <td className="tenant-name">
                    <strong>{t.name}</strong>
                    {t.city && <small className="row-sub">{t.city}</small>}
                  </td>
                  <td>{t.type}</td>
                  <td className="domain">{t.domain}</td>
                  <td>{t.seats.toLocaleString("en-IN")}</td>
                  <td>{t.used.toLocaleString("en-IN")}</td>
                  <td>{t.contract}</td>
                  <td>
                    <Badge tone={getStatusTone(t.status)}>{t.status}</Badge>
                    <div className="usage">
                      <span
                        style={{
                          width: `${usagePct}%`,
                          background: usagePct >= 95 ? "#d34f42" : undefined
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      className="secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        onSelectTenant(t);
                      }}
                    >
                      <Eye size={13} /> View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="empty">
          <SearchX size={28} />
          <p>No tenant records match your search and filter criteria.</p>
          <button
            className="secondary btn-sm"
            onClick={() => {
              setSearch("");
              setTypeFilter("All");
              setStatusFilter("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
