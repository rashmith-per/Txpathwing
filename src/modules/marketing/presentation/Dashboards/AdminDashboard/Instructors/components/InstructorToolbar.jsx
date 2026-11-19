import React from "react";
import { Search, ChevronDown, LayoutGrid, List, Plus, X } from "lucide-react";

export function InstructorToolbar({
  search,
  setSearch,
  domainFilter,
  setDomainFilter,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  onOpenAddForm
}) {
  return (
    <div className="inst-toolbar">
      <div className="inst-filters-left">
        {/* Search Bar */}
        <div className="inst-search-wrap">
          <Search size={16} className="inst-search-icon" />
          <input
            type="text"
            className="inst-search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search instructors, domain, academy, city..."
          />
          {search && (
            <button className="inst-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Domain Dropdown */}
        <div className="inst-select-box">
          <select
            className="inst-dropdown-select"
            value={domainFilter}
            onChange={e => setDomainFilter(e.target.value)}
          >
            <option value="All">All Domains</option>
            <option value="Software Development">Software Development</option>
            <option value="Web Development">Web Development</option>
            <option value="Cloud & DevOps">Cloud & DevOps</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Data Science & AI">Data Science & AI</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
          <ChevronDown size={14} className="inst-chevron" />
        </div>

        {/* Status Dropdown */}
        <div className="inst-select-box">
          <select
            className="inst-dropdown-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown size={14} className="inst-chevron" />
        </div>
      </div>

      {/* Toolbar Right: View Switcher & Add Button */}
      <div className="inst-toolbar-right">
        <div className="inst-view-switch">
          <button
            type="button"
            className={`inst-view-btn-icon ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Design Box View"
            aria-label="Design Box View"
          >
            <LayoutGrid size={17} />
          </button>
          <button
            type="button"
            className={`inst-view-btn-icon ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="Table View"
            aria-label="Table View"
          >
            <List size={17} />
          </button>
        </div>

        <button className="inst-add-btn" onClick={onOpenAddForm}>
          <Plus size={16} />
          <span>Add Instructor</span>
        </button>
      </div>
    </div>
  );
}
