import React from "react";
import { FolderKanban, Grid, Search } from "lucide-react";
import { CATEGORY_META } from "../batchUtils.js";

export function BatchFilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory,
  categoriesList,
  processedBatches
}) {
  return (
    <div className="batches-filter-wrapper">
      <div className="filter-top-row">
        <div className="batches-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search batch title, code, course, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-controls-right">
          <div className="status-chips-group">
            {["All", "Active", "Upcoming"].map((st) => (
              <button
                key={st}
                type="button"
                className={`status-btn ${statusFilter === st ? "active" : ""}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="view-mode-toggle" title="Switch layout format">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "grouped" ? "active" : ""}`}
              onClick={() => setViewMode("grouped")}
            >
              <FolderKanban size={13} />
              <span>By Category</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={13} />
              <span>All Grid</span>
            </button>
          </div>
        </div>
      </div>

      <div className="category-filter-row" aria-label="Filter batches by category">
        <button
          type="button"
          className={`category-filter-chip ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => setSelectedCategory("All")}
        >
          <span>All Disciplines</span>
          <span className="category-chip-count">{processedBatches.length}</span>
        </button>
        {categoriesList.map((cat) => {
          const count = processedBatches.filter((b) => b.category === cat).length;
          const meta = CATEGORY_META[cat] || CATEGORY_META["General"];
          return (
            <button
              key={cat}
              type="button"
              className={`category-filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{meta.icon}</span>
              <span>{cat}</span>
              <span className="category-chip-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
