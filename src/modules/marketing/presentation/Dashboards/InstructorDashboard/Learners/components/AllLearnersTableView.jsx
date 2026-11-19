import React, { useState, useMemo } from "react";
import { Search, Mail, RotateCcw, SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge, getStatusTone } from "../../common/Badge";
import { ActionButton, IconButton } from "../../common/ActionButton.jsx";

export function AllLearnersTableView({ learners = [], onContact, onProfile }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cohortFilter, setCohortFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const cohorts = useMemo(() => {
    const set = new Set();
    learners.forEach((l) => {
      if (l.cohort) set.add(l.cohort);
    });
    return ["all", ...Array.from(set)];
  }, [learners]);

  const filteredLearners = useMemo(() => {
    const q = search.trim().toLowerCase();
    return learners.filter((lrn) => {
      const matchSearch =
        !q ||
        (lrn.name || "").toLowerCase().includes(q) ||
        (lrn.email || "").toLowerCase().includes(q) ||
        (lrn.courseName || "").toLowerCase().includes(q);

      const stLower = (lrn.status || "").toLowerCase();
      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "needs support"
          ? stLower.includes("support")
          : stLower === statusFilter;

      const matchCohort = cohortFilter === "all" || lrn.cohort === cohortFilter;

      return matchSearch && matchStatus && matchCohort;
    });
  }, [learners, search, statusFilter, cohortFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLearners.length / ITEMS_PER_PAGE));
  const paginatedLearners = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLearners.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLearners, currentPage]);

  const clearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="learners-all-table-container">
      {/* Search and Filter Bar */}
      <div className="card learners-filter-card">
        <div className="learners-search-wrap">
          <Search size={16} className="learners-search-icon" />
          <input
            type="text"
            className="learners-search-input"
            placeholder="Search learners by name, email, or course..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          {search && (
            <IconButton
              icon={X}
              size="xs"
              variant="ghost"
              className="learners-search-clear"
              onClick={clearSearch}
              tooltip="Clear search"
              ariaLabel="Clear search"
            />
          )}
        </div>

        <div className="learners-filter-controls">
          <div className="learners-status-pills">
            {["all", "active", "needs support", "completed"].map((st) => (
              <button
                key={st}
                type="button"
                className={`learners-status-pill ${statusFilter === st ? "active" : ""}`}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
              >
                {st === "all" ? "All" : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>

          <div className="learners-cohort-dropdown">
            <SlidersHorizontal size={14} className="filter-icon" />
            <select
              value={cohortFilter}
              onChange={(e) => {
                setCohortFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by cohort"
            >
              {cohorts.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Cohorts" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Search & Filter Banner */}
      {(search.trim() !== "" || cohortFilter !== "all" || statusFilter !== "all") && (
        <div className="learners-active-filter-bar">
          <div className="active-filter-info">
            <span>
              Showing <strong>{filteredLearners.length}</strong> matching results
              {search && <> for "<strong>{search}</strong>"</>}
              {cohortFilter !== "all" && <> in <strong>{cohortFilter}</strong></>}
              {statusFilter !== "all" && <> with status <strong>{statusFilter}</strong></>}
            </span>
          </div>
          <ActionButton
            icon={RotateCcw}
            variant="secondary"
            size="sm"
            className="btn-reset-filters"
            onClick={() => {
              setSearch("");
              setCohortFilter("all");
              setStatusFilter("all");
              setCurrentPage(1);
            }}
            tooltip="Reset all search & filters"
          >
            Reset Filters
          </ActionButton>
        </div>
      )}

      {/* Learners Table */}
      <div className="card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Enrolled Course</th>
                <th>Cohort</th>
                <th>Progress</th>
                <th>Quiz Avg</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLearners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="learners-empty-cell">
                    <div className="learners-empty-state">
                      <Search size={32} className="text-muted" />
                      <h4>No learners match your criteria</h4>
                      <p>Try refining your search keyword or clearing active cohort filters.</p>
                      <button
                        type="button"
                        className="btn-clear-empty"
                        onClick={() => {
                          setSearch("");
                          setCohortFilter("all");
                          setStatusFilter("all");
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedLearners.map((lrn) => {
                  const tone = getStatusTone(lrn.status);
                  return (
                    <tr key={lrn.id}>
                      <td>
                        <div
                          className="learner-user-cell"
                          style={{ cursor: "pointer" }}
                          onClick={() => onProfile?.(lrn)}
                        >
                          <div className="learner-avatar">
                            {(lrn.name || "").split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <strong>{lrn.name}</strong>
                            <small>{lrn.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="course-name-tag">{lrn.courseName}</span>
                      </td>
                      <td>
                        <span className="cohort-badge">{lrn.cohort}</span>
                      </td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${lrn.progress}%` }}
                            />
                          </div>
                          <span>{lrn.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <strong className="quiz-score">{lrn.quizScore || lrn.quiz || 85}%</strong>
                      </td>
                      <td>
                        <Badge tone={tone}>{lrn.status}</Badge>
                      </td>
                      <td>
                        <small className="last-active">{lrn.lastActive || "Recently"}</small>
                      </td>
                      <td>
                        <IconButton
                          icon={Mail}
                          size="sm"
                          variant="edit"
                          tooltip={`Send message to ${lrn.name}`}
                          ariaLabel={`Send message to ${lrn.name}`}
                          onClick={() => onContact?.(lrn)}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-bar">
          <small>
            Showing {paginatedLearners.length} of {filteredLearners.length} learners
          </small>

          <div className="pagination-buttons">
            <button
              type="button"
              className="page-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              className="page-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
