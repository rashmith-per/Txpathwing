import React from "react";
import { ChevronDown, GraduationCap, LayoutGrid, List, Plus, Search, X } from "lucide-react";

export function CoursesToolbar({
  search,
  setSearch,
  selectedOrg,
  setSelectedOrg,
  organizations,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  openAddModal
}) {
  return (
    <>
      <div className="adm-courses-header">
        <div className="adm-header-left">
          <div className="adm-icon-bubble">
            <GraduationCap className="adm-icon-grad" size={28} />
          </div>
          <div className="adm-header-text">
            <h1 className="adm-title">Courses</h1>
            <p className="adm-subtitle">Explore our courses and start learning today</p>
          </div>
        </div>

        <div className="adm-header-right">
          <div className="adm-search-container">
            <Search size={18} className="adm-search-icon" />
            <input
              type="text"
              className="adm-search-input"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="adm-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <button className="adm-add-course-btn" onClick={openAddModal}>
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-filters-left">
          <div className="adm-select-box">
            <select
              className="adm-dropdown-select"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
            >
              <option value="all">All Organizations</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="adm-chevron" />
          </div>

          <div className="adm-select-box">
            <select
              className="adm-dropdown-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
            </select>
            <ChevronDown size={14} className="adm-chevron" />
          </div>

          <div className="adm-select-box">
            <select
              className="adm-dropdown-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Sort By: Popular</option>
              <option value="rating">Sort By: Highest Rated</option>
              <option value="duration">Sort By: Duration</option>
              <option value="title">Sort By: Title</option>
            </select>
            <ChevronDown size={14} className="adm-chevron" />
          </div>
        </div>

        <div className="adm-view-switch">
          <button
            className={`adm-view-btn-icon ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={`adm-view-btn-icon ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List view"
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
