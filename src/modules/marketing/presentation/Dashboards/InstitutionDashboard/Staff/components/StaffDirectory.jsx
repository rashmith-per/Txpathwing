import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle,
  RotateCcw,
  Users,
} from "lucide-react";
import StaffTable from "./StaffTable.jsx";
import { departments } from "../../Overview/overviewData.js";
import { EMPLOYMENT_TYPES, STAFF_STATUSES } from "../backend/models/StaffModel.js";

const DESIGNATION_OPTIONS = [
  "All designations",
  "Professor & Head of Dept",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Senior Lab Instructor",
  "HR & Recruitment Manager",
  "Tenant Administrator & Dean",
  "Visiting Industry Fellow",
];

export default function StaffDirectory({
  staffList,
  loading,
  error,
  pagination,
  filters,
  sortField,
  sortDirection,
  onFilterChange,
  onResetFilters,
  onSort,
  onPageChange,
  onLimitChange,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
  onExportCsv,
  onRetry,
  currentUserRole,
}) {
  const hasActiveFilters =
    Boolean(filters.search) ||
    (filters.department && filters.department !== "All") ||
    (filters.designation && filters.designation !== "All") ||
    (filters.employmentType && filters.employmentType !== "All") ||
    (filters.status && filters.status !== "All") ||
    (filters.category && filters.category !== "All");

  return (
    <section className="panel page-panel staff-directory-panel" aria-label="Staff Directory">
      {/* Table Toolbar */}
      <div className="staff-toolbar-wrapper">
        <div className="toolbar-header">
          <div>
            <h2 className="toolbar-title">Staff Directory</h2>
            <p className="toolbar-subtitle">
              {pagination
                ? `Showing ${staffList.length} of ${pagination.total} staff members in registry`
                : "Manage faculty, researchers, and administrative personnel"}
            </p>
          </div>

          <div className="toolbar-quick-actions">
            <button
              type="button"
              className="secondary-action btn-export"
              onClick={onExportCsv}
              title="Export staff records to CSV file"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="toolbar-controls-grid">
          {/* Search box */}
          <div className="search-input-wrapper">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              className="staff-search-input"
              placeholder="Search by name, email, or staff ID..."
              value={filters.search || ""}
              onChange={(e) => onFilterChange("search", e.target.value)}
              aria-label="Search staff"
            />
            {filters.search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onFilterChange("search", "")}
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="filter-select-wrapper">
            <span className="filter-label">Dept</span>
            <select
              className="staff-filter-select"
              value={filters.department || "All"}
              onChange={(e) => onFilterChange("department", e.target.value)}
              aria-label="Filter by department"
            >
              <option value="All">All departments</option>
              {departments.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation Filter */}
          <div className="filter-select-wrapper">
            <span className="filter-label">Role</span>
            <select
              className="staff-filter-select"
              value={filters.designation || "All"}
              onChange={(e) => onFilterChange("designation", e.target.value)}
              aria-label="Filter by designation"
            >
              {DESIGNATION_OPTIONS.map((desig) => (
                <option key={desig} value={desig === "All designations" ? "All" : desig}>
                  {desig}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type Filter */}
          <div className="filter-select-wrapper">
            <span className="filter-label">Type</span>
            <select
              className="staff-filter-select"
              value={filters.employmentType || "All"}
              onChange={(e) => onFilterChange("employmentType", e.target.value)}
              aria-label="Filter by employment type"
            >
              <option value="All">All types</option>
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-select-wrapper">
            <span className="filter-label">Status</span>
            <select
              className="staff-filter-select"
              value={filters.status || "All"}
              onChange={(e) => onFilterChange("status", e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              {STAFF_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={onResetFilters}
              title="Reset all search and filter parameters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Table Content States */}
      <div className="table-content-area">
        {loading && (
          <div className="table-state-box table-loading-state" role="status">
            <div className="loading-spinner" />
            <p>Loading staff directory...</p>
          </div>
        )}

        {!loading && error && (
          <div className="table-state-box table-error-state" role="alert">
            <AlertCircle size={28} className="text-red-500" />
            <h3>Unable to load staff records</h3>
            <p>{error}</p>
            <button type="button" className="primary-action" onClick={onRetry}>
              <RotateCcw size={14} /> Retry
            </button>
          </div>
        )}

        {!loading && !error && staffList.length === 0 && (
          <div className="table-state-box table-empty-state">
            <div className="empty-icon-circle">
              <Users size={32} />
            </div>
            <h3>No staff members found</h3>
            <p>
              {hasActiveFilters
                ? "No records matched your active search query or filter criteria."
                : "No staff members are currently registered in this institution."}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                className="secondary-action"
                onClick={onResetFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {!loading && !error && staffList.length > 0 && (
          <StaffTable
            staffList={staffList}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            onView={onView}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            currentUserRole={currentUserRole}
          />
        )}
      </div>

      {/* Pagination Bar */}
      {!loading && !error && pagination && pagination.total > 0 && (
        <div className="staff-pagination-bar">
          <div className="pagination-info">
            <span>
              Showing{" "}
              <strong>
                {Math.min(
                  pagination.total,
                  (pagination.page - 1) * pagination.limit + 1
                )}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(pagination.total, pagination.page * pagination.limit)}
              </strong>{" "}
              of <strong>{pagination.total}</strong> records
            </span>

            <label className="limit-selector-label">
              <span>Rows per page:</span>
              <select
                value={pagination.limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="limit-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-btn"
              disabled={!pagination.hasPrevPage}
              onClick={() => onPageChange(pagination.page - 1)}
              title="Previous Page"
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>

            <div className="page-numbers-list">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`page-number-btn ${
                      pageNum === pagination.page ? "active-page" : ""
                    }`}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              className="pagination-btn"
              disabled={!pagination.hasNextPage}
              onClick={() => onPageChange(pagination.page + 1)}
              title="Next Page"
              aria-label="Next Page"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
