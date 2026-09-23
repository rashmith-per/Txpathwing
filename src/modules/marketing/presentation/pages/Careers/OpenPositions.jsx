import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, Briefcase, MapPin, Check } from "lucide-react";
import JobCard from "./JobCard";
import JobDetailsModal from "./JobDetailsModal";
import "./OpenPositions.css";

const OpenPositions = ({
  jobs,
  onApplyJob,
  selectedDepartment,
  setSelectedDepartment,
  onOpenResumeModal
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [modalJob, setModalJob] = useState(null);

  // Departments list derived or static
  const departments = ["All", "Technology", "Training", "Sales & Marketing", "Student Success", "Design", "Operations"];
  const experiences = ["All", "Fresher / Student", "1-3 Years", "2-4 Years", "2-5 Years"];
  const locations = ["All", "Hyderabad", "Remote", "Hybrid"];

  // Filtered jobs logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search matching title, description, or skills
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));

      // Department filter
      const matchesDept =
        !selectedDepartment ||
        selectedDepartment === "All" ||
        job.department.toLowerCase() === selectedDepartment.toLowerCase();

      // Experience filter
      const matchesExp =
        selectedExperience === "All" ||
        job.experience.toLowerCase().includes(selectedExperience.toLowerCase()) ||
        (selectedExperience === "Fresher / Student" && job.employmentType === "Internship");

      // Location filter
      const matchesLoc =
        selectedLocation === "All" ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesDept && matchesExp && matchesLoc;
    });
  }, [jobs, searchQuery, selectedDepartment, selectedExperience, selectedLocation]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("All");
    setSelectedExperience("All");
    setSelectedLocation("All");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (selectedDepartment && selectedDepartment !== "All") ||
    selectedExperience !== "All" ||
    selectedLocation !== "All";

  return (
    <section id="open-positions" className="open-positions-section" aria-labelledby="positions-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">CAREER OPPORTUNITIES</span>
          <h2 id="positions-heading" className="section-title">
            Explore Open Positions
          </h2>
          <p className="section-subtitle">
            Find the right role and take the next step in your career.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="positions-controls">
          <div className="positions-search-wrapper">
            <Search size={18} className="positions-search-icon" />
            <input
              type="text"
              className="positions-search-input"
              placeholder="Search jobs by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search jobs by title or keyword"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search text"
              >
                ×
              </button>
            )}
          </div>

          <div className="positions-dropdowns">
            {/* Experience Filter */}
            <div className="filter-select-wrapper">
              <label htmlFor="filter-exp" className="filter-label">Experience:</label>
              <select
                id="filter-exp"
                className="filter-select"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                {experiences.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp === "All" ? "All Experiences" : exp}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="filter-select-wrapper">
              <label htmlFor="filter-loc" className="filter-label">Location:</label>
              <select
                id="filter-loc"
                className="filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                className="positions-reset-btn"
                onClick={handleResetFilters}
                title="Reset all filters"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="dept-pills-row" role="tablist" aria-label="Filter by department">
          {departments.map((dept) => {
            const isActive = (!selectedDepartment && dept === "All") || selectedDepartment === dept;
            return (
              <button
                key={dept}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`dept-pill ${isActive ? "active" : ""}`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="positions-results-bar">
          <span className="results-count">
            Showing <strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? "opening" : "openings"}
          </span>
          {selectedDepartment && selectedDepartment !== "All" && (
            <span className="active-dept-tag">
              in {selectedDepartment}
            </span>
          )}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={(jobData) => setModalJob(jobData)}
                onApplyNow={(jobData) => onApplyJob(jobData)}
              />
            ))}
          </div>
        ) : (
          <div className="no-jobs-card">
            <div className="no-jobs-icon-wrap">
              <Briefcase size={36} />
            </div>
            <h3 className="no-jobs-title">No matching positions found</h3>
            <p className="no-jobs-text">
              We couldn't find any openings matching your current search or filter criteria. Try adjusting your filters or send us an open resume.
            </p>
            <div className="no-jobs-actions">
              <button
                type="button"
                className="btn-reset-filters"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
              <button
                type="button"
                className="btn-open-submit"
                onClick={onOpenResumeModal}
              >
                Submit Open Resume
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Details */}
      <JobDetailsModal
        isOpen={Boolean(modalJob)}
        job={modalJob}
        onClose={() => setModalJob(null)}
        onApply={(jobData) => onApplyJob(jobData)}
      />
    </section>
  );
};

export default OpenPositions;
