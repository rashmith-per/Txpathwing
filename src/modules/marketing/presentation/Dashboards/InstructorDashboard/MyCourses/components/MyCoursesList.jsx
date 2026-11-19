import React from "react";
import { BookOpen, Users, Star, Search, X } from "lucide-react";
import { IconButton } from "../../common/ActionButton.jsx";
import { MyCoursesCard } from "./MyCoursesCard.jsx";

export function MyCoursesList({
  activeCoursesCount,
  totalEnrolled,
  averageRating,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  statusCounts,
  filteredCourses,
  getStatusTone,
  isSubmitting,
  setViewingCourseId,
  setEditingCourse,
  setSelectedSyllabusCourseId,
  handleRestoreCourseClick,
  handleRequestDeleteOrArchive,
  handleTogglePublishCourse,
  handleOpenStudioForCourse,
  onNavigate,
}) {
  return (
    <>
      {/* Summary Metrics Row */}
      <div className="inst-mc-stats-grid">
        <div className="inst-mc-stat-card">
          <div className="inst-mc-stat-icon">
            <BookOpen size={20} />
          </div>
          <div className="inst-mc-stat-info">
            <strong>{activeCoursesCount}</strong>
            <small>Active Courses</small>
          </div>
        </div>

        <div className="inst-mc-stat-card">
          <div className="inst-mc-stat-icon">
            <Users size={20} />
          </div>
          <div className="inst-mc-stat-info">
            <strong>{totalEnrolled.toLocaleString("en-IN")}</strong>
            <small>Total Enrolled</small>
          </div>
        </div>

        <div className="inst-mc-stat-card">
          <div className="inst-mc-stat-icon warning">
            <Star size={20} />
          </div>
          <div className="inst-mc-stat-info">
            <strong>{averageRating} ★</strong>
            <small>Average Rating</small>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="inst-mc-filter-row">
        <div className="inst-mc-search-box">
          <Search size={16} className="inst-mc-search-icon" />
          <input
            type="text"
            className="inst-mc-search-input"
            placeholder="Search courses by title, code, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <IconButton
              icon={X}
              size="xs"
              variant="ghost"
              onClick={() => setSearch("")}
              tooltip="Clear search"
              ariaLabel="Clear search input"
            />
          )}
        </div>

        <div className="inst-mc-filter-chips">
          {[
            { id: "all", label: "All Courses", count: statusCounts.all },
            { id: "published", label: "Published", count: statusCounts.published },
            { id: "draft", label: "Drafts", count: statusCounts.draft },
            { id: "ai", label: "AI Generated", count: statusCounts.ai },
            { id: "archived", label: "Archived", count: statusCounts.archived }
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={`inst-mc-chip ${statusFilter === chip.id ? "active" : ""}`}
              onClick={() => setStatusFilter(chip.id)}
            >
              {chip.label}
              <span className="inst-mc-chip-count">{chip.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="inst-mc-grid">
        {filteredCourses.length === 0 ? (
          <div className="inst-mc-empty-state">
            <BookOpen size={36} className="text-muted" />
            <h3>
              {statusFilter === "archived" ? "No archived courses" : "No courses found"}
            </h3>
            <p>
              {statusFilter === "archived"
                ? "Courses with enrolled students appear here when archived."
                : "Try adjusting your filters or create a new course directly in My Courses."}
            </p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <MyCoursesCard
              key={course.id}
              course={course}
              getStatusTone={getStatusTone}
              isSubmitting={isSubmitting}
              setViewingCourseId={setViewingCourseId}
              setEditingCourse={setEditingCourse}
              setSelectedSyllabusCourseId={setSelectedSyllabusCourseId}
              handleRestoreCourseClick={handleRestoreCourseClick}
              handleRequestDeleteOrArchive={handleRequestDeleteOrArchive}
              handleTogglePublishCourse={handleTogglePublishCourse}
              handleOpenStudioForCourse={handleOpenStudioForCourse}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </>
  );
}
